import { createContext, useContext, useEffect, useMemo, useRef, useState } from "react";
import { ArrowDownRight, ArrowUpRight, Menu, Minus, Plus, X } from "lucide-react";
import {
  DEFAULT_LOCALE,
  FORM_OPTIONS,
  getSiteContent,
  normaliseLocale,
} from "./content";
import studioPortrait from "./assets/studio-portrait.webp";
import dolceTorte from "./assets/projects/dolce-torte.webp";
import atasol from "./assets/projects/atasol.webp";
import produktAuto from "./assets/projects/produkt-auto.webp";
import tinaSport from "./assets/projects/tina-sport.webp";
import doganSeptem from "./assets/projects/dogan-septem.webp";

export const INQUIRY_EMAIL = "mvukusic67@gmail.com";
const LOCALE_STORAGE_KEY = "osiris-locale";

const projectImages = {
  dolceTorte,
  atasol,
  produktAuto,
  tinaSport,
  doganSeptem,
};

const initialForm = {
  name: "",
  email: "",
  company: "",
  service: "",
  budget: "",
  timeline: "",
  brief: "",
};

const requiredFields = ["name", "email", "service", "timeline", "brief"];
const LocaleContext = createContext(null);

export function readStoredLocale() {
  if (typeof window === "undefined") return DEFAULT_LOCALE;

  try {
    return normaliseLocale(window.localStorage.getItem(LOCALE_STORAGE_KEY));
  } catch {
    return DEFAULT_LOCALE;
  }
}

function LocaleProvider({ children }) {
  const [locale, setLocale] = useState(readStoredLocale);
  const content = useMemo(() => getSiteContent(locale), [locale]);

  useEffect(() => {
    document.documentElement.lang = locale;
    document.title = content.meta.title;
    let description = document.querySelector('meta[name="description"]');
    if (!description) {
      description = document.createElement("meta");
      description.setAttribute("name", "description");
      document.head.append(description);
    }
    description.setAttribute("content", content.meta.description);

    try {
      window.localStorage.setItem(LOCALE_STORAGE_KEY, locale);
    } catch {
      // A blocked storage API must not block language selection.
    }
  }, [content.meta.description, content.meta.title, locale]);

  const value = useMemo(
    () => ({
      locale,
      content,
      setLocale: (nextLocale) => setLocale(normaliseLocale(nextLocale)),
    }),
    [content, locale],
  );

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

function useLocale() {
  const context = useContext(LocaleContext);
  if (!context) throw new Error("useLocale must be used inside LocaleProvider");
  return context;
}

function optionLabel(content, group, value) {
  if (!value) return "—";
  return content.contact.form.options[group][value] || value;
}

export function buildMailtoUri(form, content) {
  const labels = content.contact.form.labels;
  const subjectPrefix = content.locale === "hr" ? "OSIRIS — projektni upit" : "OSIRIS — project inquiry";
  const sender = form.company.trim() || form.name.trim();
  const subject = `${subjectPrefix} — ${sender}`;
  const body = [
    `${labels.name}: ${form.name.trim()}`,
    `${labels.email}: ${form.email.trim()}`,
    `${labels.company}: ${form.company.trim() || "—"}`,
    `${labels.service}: ${optionLabel(content, "services", form.service)}`,
    `${labels.budget}: ${optionLabel(content, "budgets", form.budget)}`,
    `${labels.timeline}: ${optionLabel(content, "timelines", form.timeline)}`,
    "",
    `${labels.brief}:`,
    form.brief.trim(),
  ].join("\n");

  return `mailto:${INQUIRY_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

function launchMailto(uri) {
  const anchor = document.createElement("a");
  anchor.href = uri;
  anchor.setAttribute("data-mailto-launch", "true");
  anchor.click();
}

function Wordmark() {
  const { content } = useLocale();

  return (
    <span className="wordmark" aria-label={content.brand.name}>
      <span aria-hidden="true">OSIRIS</span>
      <span className="wordmark__signal" aria-hidden="true" />
    </span>
  );
}

function LocaleSwitcher() {
  const { locale, setLocale, content } = useLocale();

  return (
    <div className="locale-switcher" role="group" aria-label={content.a11y.language}>
      <button
        type="button"
        aria-label={content.a11y.croatian}
        aria-pressed={locale === "hr"}
        onClick={() => setLocale("hr")}
      >
        HR
      </button>
      <button
        type="button"
        aria-label={content.a11y.english}
        aria-pressed={locale === "en"}
        onClick={() => setLocale("en")}
      >
        EN
      </button>
    </div>
  );
}

function Header() {
  const { content } = useLocale();
  const dialogRef = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (menuOpen && !dialog.open) {
      if (typeof dialog.showModal === "function") dialog.showModal();
      else dialog.setAttribute("open", "");
      queueMicrotask(() => dialog.querySelector(".menu-dialog__nav a")?.focus());
    }

    if (!menuOpen && dialog.open) {
      if (typeof dialog.close === "function") dialog.close();
      else dialog.removeAttribute("open");
    }
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <header className="nav-mast">
        <div className="mast-line shell">
          <p>{content.brand.descriptor}</p>
          <LocaleSwitcher />
          <p className="mast-line__edition">{content.brand.edition}</p>
        </div>
        <div className="mast-brand shell">
          <a href="#top" aria-label={content.a11y.home}>
            <Wordmark />
          </a>
        </div>
        <div className="mast-nav-row shell">
          <nav className="mast-nav" aria-label={content.a11y.primaryNavigation}>
            <ul>
              {content.navigation.map((item) => (
                <li key={item.href}>
                  <a href={item.href}>{item.label}</a>
                </li>
              ))}
            </ul>
          </nav>
          <a className="mast-cta" href="#contact">
            {content.brand.contactLabel}
            <ArrowDownRight size={17} aria-hidden="true" />
          </a>
          <button
            className="menu-trigger"
            type="button"
            aria-label={content.a11y.openNavigation}
            aria-haspopup="dialog"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(true)}
          >
            <Menu size={20} aria-hidden="true" />
          </button>
        </div>
        <div className="mast-rule shell" aria-hidden="true" />
      </header>

      <dialog
        ref={dialogRef}
        className="menu-dialog"
        aria-label={content.a11y.navigationDialog}
        onClose={() => setMenuOpen(false)}
        onClick={(event) => {
          if (event.target === event.currentTarget) closeMenu();
        }}
      >
        <div className="menu-dialog__panel">
          <div className="menu-dialog__top">
            <Wordmark />
            <button type="button" aria-label={content.a11y.closeNavigation} onClick={closeMenu}>
              <X size={21} aria-hidden="true" />
            </button>
          </div>
          <nav className="menu-dialog__nav" aria-label={content.a11y.primaryNavigation}>
            {content.navigation.map((item, index) => (
              <a href={item.href} onClick={closeMenu} key={item.href}>
                <span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                <strong>{item.label}</strong>
                <ArrowUpRight size={22} aria-hidden="true" />
              </a>
            ))}
          </nav>
        </div>
      </dialog>
    </>
  );
}

function SectionHeading({ id, title, intro }) {
  return (
    <header className="section-heading">
      <h2 id={id}>{title}</h2>
      <p>{intro}</p>
    </header>
  );
}

function Hero() {
  const { content } = useLocale();

  return (
    <section className="manifesto-hero shell" id="top" aria-labelledby="hero-title">
      <h1 id="hero-title" className="manifesto-hero__title hero-reveal">
        <span>{content.hero.title[0]}</span>
        {" "}
        <span>{content.hero.title[1]}</span>
      </h1>
      <div className="manifesto-hero__footer hero-reveal">
        <p>{content.hero.description}</p>
        <span>{content.hero.note}</span>
      </div>
    </section>
  );
}

function SelectedWork() {
  const { content } = useLocale();

  return (
    <section className="work-section" id="work" aria-labelledby="work-title">
      <div className="shell">
        <SectionHeading id="work-title" title={content.work.title} intro={content.work.intro} />
        <div className="project-grid">
          {content.projects.map((project, index) => (
            <article className={`project project--${index + 1}`} key={project.id}>
              <a
                className="project__link"
                href={project.url}
                target="_blank"
                rel="noreferrer"
                aria-label={content.a11y.visitProject(project.title)}
              >
                <figure className="project__figure">
                  <img
                    src={projectImages[project.image]}
                    width="1440"
                    height="1000"
                    alt={content.a11y.projectImage(project.title)}
                    loading="lazy"
                  />
                  <span className="project__visit">
                    {content.work.liveSite}
                    <ArrowUpRight size={16} aria-hidden="true" />
                  </span>
                </figure>
                <div className="project__copy">
                  <div className="project__meta">
                    <span>{project.number}</span>
                    <span>{project.category}</span>
                  </div>
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <div className="project__foot">
                    <ul aria-label={content.a11y.projectDisciplines(project.title)}>
                      {project.tags.map((tag) => <li key={tag}>{tag}</li>)}
                    </ul>
                    <span>{project.domain}</span>
                  </div>
                </div>
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Services() {
  const { content } = useLocale();

  return (
    <section className="services-section shell" id="services" aria-labelledby="services-title">
      <SectionHeading id="services-title" title={content.services.title} intro={content.services.intro} />
      <div className="service-ledger">
        {content.services.items.map((service, index) => (
          <article className="service-row" key={service.id}>
            <span className="service-row__index" aria-hidden="true">
              {String(index + 1).padStart(2, "0")}
            </span>
            <h3>{service.title}</h3>
            <p>{service.summary}</p>
            <ul>
              {service.deliverables.map((deliverable) => <li key={deliverable}>{deliverable}</li>)}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}

function Studio() {
  const { content } = useLocale();

  return (
    <section className="studio-section" id="studio" aria-labelledby="studio-title">
      <div className="studio-grid shell">
        <figure className="studio-portrait">
          <img
            src={studioPortrait}
            width="1024"
            height="1536"
            alt={content.a11y.portrait}
            loading="lazy"
          />
          <figcaption>{content.studio.note}</figcaption>
        </figure>
        <div className="studio-copy">
          <h2 id="studio-title">{content.studio.title}</h2>
          <p className="studio-copy__lead">{content.studio.lead}</p>
          <p>{content.studio.copy}</p>
          <div className="capabilities">
            <h3>{content.studio.capabilitiesTitle}</h3>
            <ul>
              {content.studio.capabilities.map((capability, index) => (
                <li key={capability}>
                  <span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                  {capability}
                </li>
              ))}
            </ul>
          </div>
          <blockquote>
            <p>“{content.studio.principle}”</p>
            <footer>{content.studio.attribution}</footer>
          </blockquote>
        </div>
      </div>
    </section>
  );
}

function Insights() {
  const { content } = useLocale();
  const [openInsight, setOpenInsight] = useState(null);

  return (
    <section className="insights-section shell" id="insights" aria-labelledby="insights-title">
      <SectionHeading id="insights-title" title={content.insights.title} intro={content.insights.intro} />
      <div className="insight-ledger">
        {content.insights.items.map((insight) => {
          const isOpen = openInsight === insight.id;
          const panelId = `insight-${insight.id}`;
          return (
            <article className="insight-row" key={insight.id}>
              <div className="insight-row__meta">
                <span>{insight.date}</span>
                <span>{insight.category}</span>
              </div>
              <h3>{insight.title}</h3>
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpenInsight(isOpen ? null : insight.id)}
              >
                {isOpen ? content.a11y.closeNote : content.a11y.readNote}
                {isOpen ? <Minus size={17} aria-hidden="true" /> : <Plus size={17} aria-hidden="true" />}
              </button>
              <div
                className={`insight-row__excerpt${isOpen ? " is-open" : ""}`}
                id={panelId}
                hidden={!isOpen}
              >
                <p>{insight.excerpt}</p>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

function Accordion({ items, openId, onToggle }) {
  return (
    <div className="accordion">
      {items.map((item) => {
        const isOpen = item.id === openId;
        const panelId = `faq-${item.id}-panel`;
        const buttonId = `faq-${item.id}-button`;
        return (
          <article className="accordion__item" key={item.id}>
            <h3>
              <button
                id={buttonId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => onToggle(isOpen ? null : item.id)}
              >
                <span>{item.question}</span>
                {isOpen ? <Minus size={18} aria-hidden="true" /> : <Plus size={18} aria-hidden="true" />}
              </button>
            </h3>
            <div
              className={`accordion__panel${isOpen ? " is-open" : ""}`}
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              hidden={!isOpen}
            >
              <p>{item.answer}</p>
            </div>
          </article>
        );
      })}
    </div>
  );
}

function FAQ() {
  const { content } = useLocale();
  const [openFaq, setOpenFaq] = useState(content.faq.items[0].id);

  return (
    <section className="faq-section shell" aria-labelledby="faq-title">
      <SectionHeading id="faq-title" title={content.faq.title} intro={content.faq.intro} />
      <Accordion items={content.faq.items} openId={openFaq} onToggle={setOpenFaq} />
    </section>
  );
}

function validateField(name, value, messages) {
  const trimmed = value.trim();
  if (name === "name" && trimmed.length < 2) return messages.name;
  if (name === "email" && !/^\S+@\S+\.\S+$/.test(trimmed)) return messages.email;
  if (name === "service" && !trimmed) return messages.service;
  if (name === "timeline" && !trimmed) return messages.timeline;
  if (name === "brief" && trimmed.length < 20) return messages.brief;
  return "";
}

function Field({ label, name, error, touched, optional = false, children, ...props }) {
  const { content } = useLocale();
  const helperId = `${name}-helper`;
  const stateLabel = optional ? content.contact.form.optional : content.contact.form.required;

  return (
    <label className={`field${error ? " field--error" : ""}`} htmlFor={name}>
      <span className="field__label">
        <span>{label}</span>
        <small>{stateLabel}</small>
      </span>
      {children || (
        <input
          id={name}
          name={name}
          aria-required={!optional}
          aria-invalid={Boolean(error)}
          aria-describedby={helperId}
          {...props}
        />
      )}
      <span className="field__helper" id={helperId} aria-live="polite">
        {touched && error ? (
          <>
            <strong aria-hidden="true">!</strong>
            {error}
          </>
        ) : " "}
      </span>
    </label>
  );
}

function ContactForm() {
  const { content } = useLocale();
  const [form, setForm] = useState(initialForm);
  const [touched, setTouched] = useState({});
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");
  const [draftUri, setDraftUri] = useState("");
  const formCopy = content.contact.form;

  const updateField = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
    setStatus("idle");
    setDraftUri("");
    if (touched[name]) {
      setErrors((current) => ({
        ...current,
        [name]: validateField(name, value, formCopy.validation),
      }));
    }
  };

  const blurField = (event) => {
    const { name, value } = event.target;
    setTouched((current) => ({ ...current, [name]: true }));
    setErrors((current) => ({
      ...current,
      [name]: validateField(name, value, formCopy.validation),
    }));
  };

  const submitForm = (event) => {
    event.preventDefault();
    const nextErrors = Object.fromEntries(
      requiredFields.map((name) => [name, validateField(name, form[name], formCopy.validation)]),
    );
    const firstError = requiredFields.find((name) => nextErrors[name]);

    setTouched(Object.fromEntries(requiredFields.map((name) => [name, true])));
    setErrors(nextErrors);

    if (firstError) {
      setStatus("error");
      document.getElementById(firstError)?.focus();
      return;
    }

    const uri = buildMailtoUri(form, content);
    setDraftUri(uri);
    setStatus("success");
    launchMailto(uri);
  };

  return (
    <form className="contact-form" noValidate onSubmit={submitForm}>
      <div className="form-grid">
        <Field label={formCopy.labels.name} name="name" value={form.name} onChange={updateField} onBlur={blurField} error={errors.name} touched={touched.name} autoComplete="name" />
        <Field label={formCopy.labels.email} name="email" value={form.email} onChange={updateField} onBlur={blurField} error={errors.email} touched={touched.email} autoComplete="email" inputMode="email" />
        <Field label={formCopy.labels.company} name="company" value={form.company} onChange={updateField} onBlur={blurField} error={errors.company} touched={touched.company} optional autoComplete="organization" />
        <Field label={formCopy.labels.service} name="service" error={errors.service} touched={touched.service}>
          <select id="service" name="service" value={form.service} onChange={updateField} onBlur={blurField} aria-required="true" aria-invalid={Boolean(errors.service)} aria-describedby="service-helper">
            <option value="">{formCopy.choose}</option>
            {FORM_OPTIONS.services.map((value) => <option value={value} key={value}>{formCopy.options.services[value]}</option>)}
          </select>
        </Field>
        <Field label={formCopy.labels.budget} name="budget" error={errors.budget} touched={touched.budget} optional>
          <select id="budget" name="budget" value={form.budget} onChange={updateField} onBlur={blurField} aria-describedby="budget-helper">
            <option value="">{formCopy.choose}</option>
            {FORM_OPTIONS.budgets.map((value) => <option value={value} key={value}>{formCopy.options.budgets[value]}</option>)}
          </select>
        </Field>
        <Field label={formCopy.labels.timeline} name="timeline" error={errors.timeline} touched={touched.timeline}>
          <select id="timeline" name="timeline" value={form.timeline} onChange={updateField} onBlur={blurField} aria-required="true" aria-invalid={Boolean(errors.timeline)} aria-describedby="timeline-helper">
            <option value="">{formCopy.choose}</option>
            {FORM_OPTIONS.timelines.map((value) => <option value={value} key={value}>{formCopy.options.timelines[value]}</option>)}
          </select>
        </Field>
      </div>
      <Field label={formCopy.labels.brief} name="brief" error={errors.brief} touched={touched.brief}>
        <textarea id="brief" name="brief" value={form.brief} onChange={updateField} onBlur={blurField} aria-required="true" aria-invalid={Boolean(errors.brief)} aria-describedby="brief-helper" placeholder={formCopy.placeholder} />
      </Field>
      <div className="form-actions">
        <button className="submit-button" type="submit" data-state={status}>
          {formCopy.submit}
          <ArrowUpRight size={18} aria-hidden="true" />
        </button>
        <p className="form-status" role="status" aria-live="polite">
          {status === "success" ? formCopy.prepared : ""}
        </p>
        {draftUri && <a className="draft-fallback" href={draftUri}>{formCopy.fallback}</a>}
      </div>
    </form>
  );
}

function Contact() {
  const { content } = useLocale();

  return (
    <section className="contact-section" id="contact" aria-labelledby="contact-title">
      <div className="contact-grid shell">
        <div className="contact-copy">
          <h2 id="contact-title">{content.contact.title}</h2>
          <p>{content.contact.copy}</p>
          <p className="contact-copy__direct">
            {content.contact.directEmail}
            <a href={`mailto:${INQUIRY_EMAIL}`}>{INQUIRY_EMAIL}</a>
          </p>
        </div>
        <div>
          <ContactForm />
          <p className="contact-privacy">{content.contact.privacy}</p>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  const { content } = useLocale();
  const footerLinks = [content.navigation[0], content.navigation[2], content.navigation[4]];

  return (
    <footer className="site-footer shell">
      <div className="site-footer__brand">
        <Wordmark />
        <p>{content.footer.statement}</p>
      </div>
      <nav aria-label={content.a11y.primaryNavigation}>
        {footerLinks.map((item) => <a href={item.href} key={item.href}>{item.label}</a>)}
      </nav>
      <div className="site-footer__meta">
        <span>{content.footer.meta}</span>
        <a href={`mailto:${INQUIRY_EMAIL}`}>{INQUIRY_EMAIL}</a>
        <span>© {new Date().getFullYear()} OSIRIS</span>
      </div>
    </footer>
  );
}

function Site() {
  const { content } = useLocale();

  return (
    <div className="site-frame">
      <a className="skip-link" href="#main">{content.a11y.skip}</a>
      <Header />
      <main id="main">
        <Hero />
        <SelectedWork />
        <Services />
        <Studio />
        <Insights />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <LocaleProvider>
      <Site />
    </LocaleProvider>
  );
}
