import "@testing-library/jest-dom/vitest";
import { cleanup, fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeAll, describe, expect, test } from "vitest";
import App from "./App";

beforeAll(() => {
  HTMLDialogElement.prototype.showModal = function showModal() {
    this.setAttribute("open", "");
  };
  HTMLDialogElement.prototype.close = function close() {
    this.removeAttribute("open");
    this.dispatchEvent(new Event("close"));
  };
});

afterEach(() => cleanup());

describe("OSIRIS portfolio", () => {
  test("showcases the five live websites", () => {
    render(<App />);

    const projects = [
      ["Visit Dolce Torte website", "https://dolcetorte.hr/"],
      ["Visit SOL website", "https://www.atasol.hr/"],
      ["Visit Produkt Auto website", "https://produktauto.com/"],
      ["Visit Tina Šport–Pia website", "https://mnk-tinasport.hr/"],
      ["Visit Dogan Septem Interijeri website", "https://www.doganseptem-interijeri.hr/"],
    ];

    projects.forEach(([name, href]) => {
      const link = screen.getByRole("link", { name });
      expect(link).toHaveAttribute("href", href);
      expect(link).toHaveAttribute("target", "_blank");
    });
  });

  test("opens the menu and exposes the section navigation", async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole("button", { name: "Open navigation" }));
    const dialog = screen.getByRole("dialog", { name: "Site navigation" });
    expect(dialog).toHaveAttribute("open");
    expect(within(dialog).getByRole("link", { name: /Selected work/i })).toBeVisible();

    await user.click(within(dialog).getByRole("button", { name: "Close navigation" }));
    expect(dialog).not.toHaveAttribute("open");
  });

  test("keeps one service and one FAQ answer open at a time", async () => {
    const user = userEvent.setup();
    render(<App />);

    const brandButton = screen.getByRole("button", { name: /Brand systems/i });
    const digitalButton = screen.getByRole("button", { name: /Digital products/i });
    expect(brandButton).toHaveAttribute("aria-expanded", "true");

    await user.click(digitalButton);
    expect(digitalButton).toHaveAttribute("aria-expanded", "true");
    expect(brandButton).toHaveAttribute("aria-expanded", "false");

    const fitButton = screen.getByRole("button", { name: /Which projects fit best/i });
    const processButton = screen.getByRole("button", { name: /How does a project begin/i });
    await user.click(processButton);
    expect(processButton).toHaveAttribute("aria-expanded", "true");
    expect(fitButton).toHaveAttribute("aria-expanded", "false");
  });

  test("shows actionable validation messages and reaches the local success state", async () => {
    const user = userEvent.setup();
    render(<App />);

    const submit = screen.getByRole("button", { name: "Prepare inquiry" });
    await user.click(submit);
    expect(screen.getByText("Add the name we should use in our reply.")).toBeVisible();
    expect(screen.getByText("Add a complete email address, such as name@studio.com.")).toBeVisible();

    await user.type(screen.getByLabelText(/Your name/i), "Mara Vale");
    await user.type(screen.getByLabelText(/Email address/i), "mara@example.com");
    await user.selectOptions(screen.getByLabelText(/Primary need/i), "Brand systems");
    await user.selectOptions(screen.getByLabelText(/Ideal timing/i), "Within 1–2 months");
    await user.type(
      screen.getByLabelText(/Project brief/i),
      "We are launching a new cultural platform and need a coherent identity and website.",
    );

    fireEvent.submit(submit.closest("form"));
    expect(screen.getByRole("button", { name: "Preparing brief…" })).toBeDisabled();
    await waitFor(() => expect(screen.getByRole("status")).toHaveTextContent("Your brief is ready."), {
      timeout: 1500,
    });
  });
});
