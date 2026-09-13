import "@testing-library/jest-dom/vitest";
import { cleanup, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeAll, beforeEach, describe, expect, test, vi } from "vitest";
import App, { buildMailtoUri, INQUIRY_EMAIL } from "./App";
import { getSiteContent } from "./content";

const storedValues = new Map();

beforeAll(() => {
  Object.defineProperty(window, "localStorage", {
    configurable: true,
    value: {
      clear: () => storedValues.clear(),
      getItem: (key) => storedValues.get(key) ?? null,
      removeItem: (key) => storedValues.delete(key),
      setItem: (key, value) => storedValues.set(key, String(value)),
    },
  });
  HTMLDialogElement.prototype.showModal = function showModal() {
    this.setAttribute("open", "");
  };
  HTMLDialogElement.prototype.close = function close() {
    this.removeAttribute("open");
    this.dispatchEvent(new Event("close"));
  };
});

beforeEach(() => {
  window.localStorage.clear();
  document.documentElement.lang = "hr";
});

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});

describe("OSIRIS bilingual portfolio", () => {
  test("defaults to Croatian metadata and manifesto copy", () => {
    render(<App />);

    expect(document.documentElement).toHaveAttribute("lang", "hr");
    expect(document.title).toBe("OSIRIS — Nezavisni kreativni studio");
    expect(document.querySelector('meta[name="description"]')).toHaveAttribute(
      "content",
      expect.stringContaining("strategiju, identitet"),
    );
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "PRVO IDEJA. ONDA SVE OSTALO.",
    );
  });

  test("showcases the five unchanged live websites", () => {
    render(<App />);

    const projects = [
      ["Otvorite web-stranicu projekta Dolce Torte", "https://dolcetorte.hr/"],
      ["Otvorite web-stranicu projekta SOL", "https://www.atasol.hr/"],
      ["Otvorite web-stranicu projekta Produkt Auto", "https://produktauto.com/"],
      ["Otvorite web-stranicu projekta Tina Šport–Pia", "https://mnk-tinasport.hr/"],
      ["Otvorite web-stranicu projekta Dogan Septem Interijeri", "https://www.doganseptem-interijeri.hr/"],
    ];

    projects.forEach(([name, href]) => {
      const link = screen.getByRole("link", { name });
      expect(link).toHaveAttribute("href", href);
      expect(link).toHaveAttribute("target", "_blank");
      expect(link).toHaveAttribute("rel", "noreferrer");
    });
  });

  test("switches every interface layer to English and stores the preference", async () => {
    const user = userEvent.setup();
    render(<App />);

    const english = screen.getByRole("button", { name: "English" });
    expect(english).toHaveAttribute("aria-pressed", "false");
    await user.click(english);

    expect(english).toHaveAttribute("aria-pressed", "true");
    expect(document.documentElement).toHaveAttribute("lang", "en");
    expect(document.title).toBe("OSIRIS — Independent creative studio");
    expect(window.localStorage.getItem("osiris-locale")).toBe("en");
    expect(screen.getByRole("heading", { name: "Selected work" })).toBeVisible();
    expect(screen.getByRole("heading", { name: "What we do" })).toBeVisible();
    expect(screen.getByRole("heading", { name: "Notes from the work" })).toBeVisible();
    expect(screen.getByLabelText(/Your name/i)).toBeVisible();
    expect(screen.getByRole("button", { name: "Prepare inquiry" })).toBeVisible();
  });

  test("restores a valid saved locale and falls back from invalid or blocked storage", () => {
    window.localStorage.setItem("osiris-locale", "en");
    const first = render(<App />);
    expect(screen.getByRole("heading", { name: "Selected work" })).toBeVisible();
    first.unmount();

    window.localStorage.setItem("osiris-locale", "xx");
    const second = render(<App />);
    expect(screen.getByRole("heading", { name: "Odabrani radovi" })).toBeVisible();
    second.unmount();

    vi.spyOn(window.localStorage, "getItem").mockImplementation(() => {
      throw new Error("storage blocked");
    });
    render(<App />);
    expect(screen.getByRole("heading", { name: "Odabrani radovi" })).toBeVisible();
  });

  test("preserves form values and stable option IDs while changing language", async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.type(screen.getByLabelText(/Vaše ime/i), "Mara Vale");
    await user.type(screen.getByLabelText(/Adresa e-pošte/i), "mara@example.com");
    await user.selectOptions(screen.getByLabelText(/Primarna potreba/i), "brand-systems");
    await user.selectOptions(screen.getByLabelText(/Željeni termin/i), "one-two");

    await user.click(screen.getByRole("button", { name: "English" }));

    expect(screen.getByLabelText(/Your name/i)).toHaveValue("Mara Vale");
    expect(screen.getByLabelText(/Email address/i)).toHaveValue("mara@example.com");
    expect(screen.getByLabelText(/Primary need/i)).toHaveValue("brand-systems");
    expect(screen.getByLabelText(/Ideal timing/i)).toHaveValue("one-two");
  });

  test("opens the mobile menu and keeps FAQ and insight disclosures accessible", async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole("button", { name: "Otvorite navigaciju" }));
    const dialog = screen.getByRole("dialog", { name: "Navigacija stranice" });
    expect(dialog).toHaveAttribute("open");
    expect(within(dialog).getByRole("link", { name: "Radovi" })).toBeVisible();
    await user.click(within(dialog).getByRole("button", { name: "Zatvorite navigaciju" }));
    expect(dialog).not.toHaveAttribute("open");

    const process = screen.getByRole("button", { name: "Kako projekt počinje?" });
    await user.click(process);
    expect(process).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByText(/Prvo mapiramo odluku/)).toBeVisible();

    const note = screen.getAllByRole("button", { name: "Pročitajte bilješku" })[0];
    await user.click(note);
    expect(note).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByText(/Dosljednost ponavlja isti odgovor/)).toBeVisible();
  });

  test("builds a localised, encoded mailto draft with every form field", () => {
    const form = {
      name: "Mara Šarić",
      email: "mara@example.com",
      company: "Studio Žar",
      service: "brand-systems",
      budget: "15-35",
      timeline: "one-two",
      brief: "Trebamo jasniji identitet i web za novo izdanje.",
    };

    const uri = buildMailtoUri(form, getSiteContent("hr"));
    const decoded = decodeURIComponent(uri);

    expect(uri).toMatch(new RegExp(`^mailto:${INQUIRY_EMAIL}\\?`));
    expect(decoded).toContain("subject=OSIRIS — projektni upit — Studio Žar");
    expect(decoded).toContain("Primarna potreba: Sustavi brenda");
    expect(decoded).toContain("Radni budžet: 15.000–35.000 €");
    expect(decoded).toContain("Sažetak projekta:\nTrebamo jasniji identitet");
  });

  test("shows actionable validation and only launches a draft for a valid inquiry", async () => {
    const user = userEvent.setup();
    const anchorClick = vi.spyOn(HTMLAnchorElement.prototype, "click").mockImplementation(() => {});
    render(<App />);

    await user.click(screen.getByRole("button", { name: "Pripremite upit" }));
    expect(anchorClick).not.toHaveBeenCalled();
    expect(screen.getByText(/Ime je prekratko/)).toBeVisible();
    expect(screen.getByText(/Adresa e-pošte nije potpuna/)).toBeVisible();

    await user.type(screen.getByLabelText(/Vaše ime/i), "Mara Vale");
    await user.type(screen.getByLabelText(/Adresa e-pošte/i), "mara@example.com");
    await user.selectOptions(screen.getByLabelText(/Primarna potreba/i), "brand-systems");
    await user.selectOptions(screen.getByLabelText(/Željeni termin/i), "one-two");
    await user.type(
      screen.getByLabelText(/Sažetak projekta/i),
      "Pokrećemo kulturnu platformu i trebamo povezani identitet i web.",
    );
    await user.click(screen.getByRole("button", { name: "Pripremite upit" }));

    expect(anchorClick).toHaveBeenCalledTimes(1);
    expect(screen.getByRole("status")).toHaveTextContent("Poruka je pripremljena");
    const fallback = screen.getByRole("link", { name: "Otvorite pripremljenu poruku" });
    expect(fallback.getAttribute("href")).toContain(`mailto:${INQUIRY_EMAIL}`);
    expect(screen.getByLabelText(/Vaše ime/i)).toHaveValue("Mara Vale");
  });
});
