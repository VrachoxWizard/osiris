import { useEffect, useRef, useState } from "react";
import { ArrowDownRight, ArrowUpRight, Check, Menu, Minus, Plus, X } from "lucide-react";
import { siteContent as content } from "./content";
import heroBust from "./assets/hero-bust.webp";
import studioPortrait from "./assets/studio-portrait.webp";
import dolceTorte from "./assets/projects/dolce-torte.webp";
import atasol from "./assets/projects/atasol.webp";
import produktAuto from "./assets/projects/produkt-auto.webp";
import tinaSport from "./assets/projects/tina-sport.webp";
import doganSeptem from "./assets/projects/dogan-septem.webp";

const projectImages = {
  dolceTorte,
  atasol,
  produktAuto,
  tinaSport,
  doganSeptem,
};

function Wordmark() {
  return (
    <span className="wordmark" aria-label={content.brand.name}>
      OSIRIS<span aria-hidden="true">.</span>
    </span>
  );
}

function Header() {
  const dialogRef = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (menuOpen && !dialog.open) {
      if (typeof dialog.showModal === "function") dialog.showModal();
      else dialog.setAttribute("open", "");
    }

    if (!menuOpen && dialog.open) {
      if (typeof dialog.close === "function") dialog.close();
      else dialog.removeAttribute("open");
    }
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <header className="site-header shell">
        <a className="brand-link" href="#top" aria-label="OSIRIS home">
          <Wordmark />
        </a>
        <div className="header-actions">
          <a className="header-cta" href="#contact">
            Let’s talk <ArrowDownRight size={16} aria-hidden="true" />
          </a>
          <button
            className="icon-button menu-button"
            type="button"
            aria-label="Open navigation"
            aria-haspopup="dialog"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(true)}
          >
            <Menu size={18} aria-hidden="true" />
          </button>
        </div>
      </header>

      <dialog
        ref={dialogRef}
        className="menu-dialog"
        aria-label="Site navigation"
        onClose={() => setMenuOpen(false)}
        onClick={(event) => {
          if (event.target === event.currentTarget) closeMenu();
        }}
      >
        <div className="menu-dialog__panel">
          <div className="menu-dialog__top">
            <Wordmark />
            <button className="icon-button" type="button" aria-label="Close navigation" onClick={closeMenu}>
              <X size={18} aria-hidden="true" />
            </button>
          </div>
          <nav aria-label="Primary navigation">
            {content.navigation.map((item, index) => (
              <a href={item.href} onClick={closeMenu} key={item.href}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                {item.label}
                <ArrowUpRight size={20} aria-hidden="true" />
              </a>
            ))}
          </nav>
        </div>
      </dialog>
    </>
  );
}

function OrbitBadge({ label, href, className = "" }) {
  return (
    <a className={`orbit-badge ${className}`.trim()} href={href} aria-label={label}>
      <span>{label}</span>
      <ArrowDownRight size={14} aria-hidden="true" />
    </a>
  );
}

function Hero() {
  return (
    <section className="hero shell" id="top" aria-labelledby="hero-title">
      <div className="hero__rings" aria-hidden="true" />
      <div className="hero__copy">
        <p className="availability hero-reveal" style={{ "--i": 0 }}>
          <span aria-hidden="true" />
          {content.brand.availability}
        </p>
        <h1 id="hero-title" className="hero__title hero-reveal" style={{ "--i": 1 }}>
          <span>{content.hero.title[0]}</span>
          <span className="hero__title-outline">{content.hero.title[1]}</span>
        </h1>
        <p className="hero__description hero-reveal" style={{ "--i": 2 }}>
          {content.hero.description}
        </p>
      </div>
      <figure className="hero__figure hero-reveal" style={{ "--i": 3 }}>
        <img
          src={heroBust}
          width="1024"
          height="1536"
          alt="Monochrome sculptural bust representing OSIRIS creative direction"
          fetchPriority="high"
        />
      </figure>
      <OrbitBadge label="See work" href="#work" className="hero__orbit" />
    </section>
  );
}

function StudioIntro() {
  return (
    <section className="studio shell" id="studio" aria-labelledby="studio-title">
      <div className="studio__statement">
        <p>{content.hero.lead}</p>
        <h2 id="studio-title">{content.introduction.title}</h2>
        <p>{content.introduction.copy}</p>
      </div>
      <div className="studio__portrait-wrap">
        <figure className="studio__portrait">
          <img
            src={studioPortrait}
            width="1024"
            height="1536"
            alt="Monochrome studio portrait of the OSIRIS portfolio owner"
            loading="lazy"
          />
        </figure>
        <p className="studio__note">{content.introduction.note}</p>
        <OrbitBadge label="Our approach" href="#services" className="studio__orbit" />
      </div>
      <div className="discipline-strip" aria-label="Studio structure">
        {content.disciplines.map((item) => (
          <article key={item.label}>
            <span>{item.value}</span>
            <h3>{item.label}</h3>
            <p>{item.detail}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function Accordion({ items, openId, onToggle, variant = "default" }) {
  return (
    <div className={`accordion accordion--${variant}`}>
      {items.map((item, index) => {
        const isOpen = item.id === openId;
        const panelId = `${variant}-${item.id}-panel`;
        const buttonId = `${variant}-${item.id}-button`;
        return (
          <article className={`accordion__item${isOpen ? " is-open" : ""}`} key={item.id}>
            <h3>
              <button
                id={buttonId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => onToggle(isOpen ? null : item.id)}
              >
                <span className="accordion__index">{String(index + 1).padStart(2, "0")}</span>
                <span className="accordion__label">{item.title || item.question}</span>
                <span className="accordion__icon" aria-hidden="true">
                  {isOpen ? <Minus size={17} /> : <Plus size={17} />}
                </span>
              </button>
            </h3>
            <div
              className="accordion__panel"
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              aria-hidden={!isOpen}
              inert={!isOpen ? true : undefined}
            >
              <div className="accordion__content">
                <p>{item.summary || item.answer}</p>
                {item.deliverables && (
                  <ul>
                    {item.deliverables.map((deliverable) => (
                      <li key={deliverable}>{deliverable}</li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}

function Services() {
  const [openService, setOpenService] = useState(content.services[0].id);

  return (
    <section className="services shell section-gap" id="services" aria-labelledby="services-title">
      <div className="section-heading">
        <h2 id="services-title">What we do</h2>
        <p>Three connected disciplines, shaped around the problem rather than a package.</p>
      </div>
      <Accordion items={content.services} openId={openService} onToggle={setOpenService} variant="services" />
    </section>
  );
}

function SelectedWork() {
  return (
    <section className="work-wrap" id="work" aria-labelledby="work-title">
      <div className="work shell">
        <header className="work__header">
          <h2 id="work-title">Our selected work</h2>
          <p>Five live websites designed and built across food, wellness, automotive, sport, and interiors.</p>
        </header>
        <div className="project-list">
          {content.projects.map((project, index) => (
            <article className={`project project--${index + 1}`} key={project.id}>
              <a
                className="project__link"
                href={project.url}
                target="_blank"
                rel="noreferrer"
                aria-label={`Visit ${project.title} website`}
              >
                <figure className="project__figure">
                  <img
                    src={projectImages[project.image]}
                    width="1440"
                    height="1000"
                    alt={`${project.title} website homepage`}
                    loading="lazy"
                  />
                  <span className="project__visit">
                    Live site
                    <ArrowUpRight size={16} aria-hidden="true" />
                  </span>
                </figure>
                <div className="project__copy">
                  <div className="project__meta">
                    <span className="project__number" aria-hidden="true">
                      {project.number}
                    </span>
                    <p>{project.category}</p>
                  </div>
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <div className="project__foot">
                    <ul aria-label={`${project.title} disciplines`}>
                      {project.tags.map((tag) => (
                        <li key={tag}>{tag}</li>
                      ))}
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

function Toolkit() {
  return (
    <section className="toolkit shell" aria-labelledby="toolkit-title">
      <div className="section-heading section-heading--centered">
        <h2 id="toolkit-title">One thought, carried through</h2>
        <p>OSIRIS brings the right disciplines together without turning the work into a relay race.</p>
      </div>
      <ul>
        {content.toolkit.map((item, index) => (
          <li key={item}>
            <span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
            {item}
          </li>
        ))}
      </ul>
    </section>
  );
}

function Principle() {
  return (
    <section className="principle shell section-gap" aria-labelledby="principle-title">
      <div>
        <h2 id="principle-title">{content.principle.title}</h2>
        <ArrowDownRight size={30} aria-hidden="true" />
      </div>
      <blockquote>
        <p>“{content.principle.quote}”</p>
        <footer>{content.principle.attribution}</footer>
      </blockquote>
    </section>
  );
}

const requiredFields = ["name", "email", "service", "timeline", "brief"];

function validateField(name, value) {
  const trimmed = value.trim();
  if (name === "name" && trimmed.length < 2) return "Add the name we should use in our reply.";
  if (name === "email" && !/^\S+@\S+\.\S+$/.test(trimmed)) return "Add a complete email address, such as name@studio.com.";
  if (name === "service" && !trimmed) return "Choose the discipline closest to your project.";
  if (name === "timeline" && !trimmed) return "Choose the timing that best describes the project.";
  if (name === "brief" && trimmed.length < 20) return "Share at least 20 characters so we understand what needs to change.";
  return "";
}

function Field({ label, name, error, touched, optional = false, children, ...props }) {
  const helperId = `${name}-helper`;
  return (
    <label className={`field${error ? " field--error" : ""}`} htmlFor={name}>
      <span className="field__label">
        {label} {optional ? <small>Optional</small> : <small>Required</small>}
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
        {touched && error ? error : " "}
      </span>
    </label>
  );
}

function ContactForm() {
  const initialForm = {
    name: "",
    email: "",
    company: "",
    service: "",
    budget: "",
    timeline: "",
    brief: "",
  };
  const [form, setForm] = useState(initialForm);
  const [touched, setTouched] = useState({});
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");
  const timerRef = useRef(null);

  useEffect(() => () => window.clearTimeout(timerRef.current), []);

  const updateField = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
    if (touched[name]) {
      setErrors((current) => ({ ...current, [name]: validateField(name, value) }));
    }
  };

  const blurField = (event) => {
    const { name, value } = event.target;
    setTouched((current) => ({ ...current, [name]: true }));
    setErrors((current) => ({ ...current, [name]: validateField(name, value) }));
  };

  const submitForm = (event) => {
    event.preventDefault();
    const nextErrors = Object.fromEntries(requiredFields.map((name) => [name, validateField(name, form[name])]));
    const hasErrors = Object.values(nextErrors).some(Boolean);
    setTouched(Object.fromEntries(requiredFields.map((name) => [name, true])));
    setErrors(nextErrors);

    if (hasErrors) {
      const firstError = requiredFields.find((name) => nextErrors[name]);
      document.getElementById(firstError)?.focus();
      return;
    }

    setStatus("loading");
    timerRef.current = window.setTimeout(() => setStatus("success"), 550);
  };

  if (status === "success") {
    return (
      <div className="form-success" role="status" aria-live="polite">
        <span><Check size={24} aria-hidden="true" /></span>
        <h3>Your brief is ready.</h3>
        <p>This is a front-end demonstration, so nothing was sent or stored.</p>
        <button
          className="button button--outline"
          type="button"
          onClick={() => {
            setForm(initialForm);
            setTouched({});
            setErrors({});
            setStatus("idle");
          }}
        >
          Start another inquiry
        </button>
      </div>
    );
  }

  return (
    <form className="contact-form" noValidate onSubmit={submitForm}>
      <div className="form-grid">
        <Field label="Your name" name="name" value={form.name} onChange={updateField} onBlur={blurField} error={errors.name} touched={touched.name} autoComplete="name" />
        <Field label="Email address" name="email" value={form.email} onChange={updateField} onBlur={blurField} error={errors.email} touched={touched.email} autoComplete="email" inputMode="email" />
        <Field label="Company or team" name="company" value={form.company} onChange={updateField} onBlur={blurField} error={errors.company} touched={touched.company} optional autoComplete="organization" />
        <Field label="Primary need" name="service" error={errors.service} touched={touched.service}>
          <select id="service" name="service" value={form.service} onChange={updateField} onBlur={blurField} aria-required="true" aria-invalid={Boolean(errors.service)} aria-describedby="service-helper">
            <option value="">Choose one</option>
            {content.contact.services.map((option) => <option key={option}>{option}</option>)}
          </select>
        </Field>
        <Field label="Working budget" name="budget" error={errors.budget} touched={touched.budget} optional>
          <select id="budget" name="budget" value={form.budget} onChange={updateField} onBlur={blurField} aria-describedby="budget-helper">
            <option value="">Choose one</option>
            {content.contact.budgets.map((option) => <option key={option}>{option}</option>)}
          </select>
        </Field>
        <Field label="Ideal timing" name="timeline" error={errors.timeline} touched={touched.timeline}>
          <select id="timeline" name="timeline" value={form.timeline} onChange={updateField} onBlur={blurField} aria-required="true" aria-invalid={Boolean(errors.timeline)} aria-describedby="timeline-helper">
            <option value="">Choose one</option>
            {content.contact.timelines.map((option) => <option key={option}>{option}</option>)}
          </select>
        </Field>
      </div>
      <Field label="Project brief" name="brief" error={errors.brief} touched={touched.brief}>
        <textarea id="brief" name="brief" value={form.brief} onChange={updateField} onBlur={blurField} aria-required="true" aria-invalid={Boolean(errors.brief)} aria-describedby="brief-helper" placeholder="What needs to change, and why now?" />
      </Field>
      <button className="button button--accent" type="submit" disabled={status === "loading"} data-state={status}>
        {status === "loading" ? "Preparing brief…" : "Prepare inquiry"}
        {status !== "loading" && <ArrowUpRight size={17} aria-hidden="true" />}
      </button>
    </form>
  );
}

function Contact() {
  return (
    <section className="contact-wrap" id="contact" aria-labelledby="contact-title">
      <div className="contact shell">
        <div className="contact__copy">
          <h2 id="contact-title">{content.contact.title}</h2>
          <p>{content.contact.copy}</p>
          <div className="contact__signal" aria-hidden="true">
            <span />
            <span />
            <span />
          </div>
        </div>
        <ContactForm />
      </div>
    </section>
  );
}

function FAQ() {
  const [openFaq, setOpenFaq] = useState(content.faqs[0].id);
  return (
    <section className="faq shell section-gap" aria-labelledby="faq-title">
      <div className="section-heading section-heading--centered">
        <h2 id="faq-title">Your questions, answered.</h2>
        <p>The practical details before a first conversation.</p>
      </div>
      <Accordion items={content.faqs} openId={openFaq} onToggle={setOpenFaq} variant="faq" />
    </section>
  );
}

function Insights() {
  const [openInsight, setOpenInsight] = useState(null);
  return (
    <section className="insights shell section-gap" id="insights" aria-labelledby="insights-title">
      <div className="section-heading">
        <h2 id="insights-title">Read our thinking</h2>
        <p>Short field notes on making brands and digital products more recognizable.</p>
      </div>
      <div className="insight-grid">
        {content.insights.map((insight) => {
          const isOpen = openInsight === insight.id;
          return (
            <article className="insight-card" key={insight.id}>
              <div className="insight-card__meta">
                <span>{insight.category}</span>
                <span>{insight.date}</span>
              </div>
              <h3>{insight.title}</h3>
              <div className={`insight-card__excerpt${isOpen ? " is-open" : ""}`} aria-hidden={!isOpen}>
                <p>{insight.excerpt}</p>
              </div>
              <button type="button" aria-expanded={isOpen} onClick={() => setOpenInsight(isOpen ? null : insight.id)}>
                {isOpen ? "Close note" : "Read note"}
                {isOpen ? <Minus size={16} aria-hidden="true" /> : <Plus size={16} aria-hidden="true" />}
              </button>
            </article>
          );
        })}
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="site-footer shell">
      <a className="footer-email" href="#contact">
        <span>Start an inquiry</span>
        {content.brand.contactLabel}
        <ArrowUpRight size={22} aria-hidden="true" />
      </a>
      <p className="site-footer__statement">{content.footer.statement}</p>
      <div className="site-footer__meta">
        <Wordmark />
        <span>{content.footer.location}</span>
        <span>© {new Date().getFullYear()} OSIRIS</span>
      </div>
      <span className="site-footer__ghost" aria-hidden="true">OSIRIS</span>
    </footer>
  );
}

export default function App() {
  return (
    <div className="site-frame">
      <a className="skip-link" href="#main">Skip to content</a>
      <Header />
      <main id="main">
        <Hero />
        <StudioIntro />
        <Services />
        <SelectedWork />
        <Toolkit />
        <Principle />
        <Contact />
        <FAQ />
        <Insights />
      </main>
      <Footer />
    </div>
  );
}
