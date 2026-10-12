import { useEffect, useState } from 'react'
import { content, CONTACT } from './content.js'
import logoMark from './assets/logo-mark.png'
import logoFull from './assets/logo-full.png'

const ICONS = {
  person: <path d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm-7 8a7 7 0 0 1 14 0" />,
  briefcase: <path d="M4 8h16v11H4zM9 8V5h6v3M4 13h16" />,
  shield: <path d="M12 3 5 6v6c0 4.5 3 7.5 7 9 4-1.5 7-4.5 7-9V6l-7-3Zm-3 9 2 2 4-4" />,
  globe: <path d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm-9-9h18M12 3c2.5 2.5 3.5 5.5 3.5 9s-1 6.5-3.5 9c-2.5-2.5-3.5-5.5-3.5-9s1-6.5 3.5-9Z" />,
  check: <path d="m5 12 4 4 10-10" />,
}

function Icon({ name, size = 24 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {ICONS[name]}
    </svg>
  )
}

function getInitialLang() {
  try {
    const saved = localStorage.getItem('lang')
    if (saved === 'en' || saved === 'vi') return saved
  } catch (e) { /* storage unavailable */ }
  return navigator.language && navigator.language.startsWith('vi') ? 'vi' : 'en'
}

export default function App() {
  const [lang, setLang] = useState(getInitialLang)
  const [menuOpen, setMenuOpen] = useState(false)
  const [sent, setSent] = useState(false)
  const t = content[lang]

  useEffect(() => {
    document.documentElement.lang = lang
    try { localStorage.setItem('lang', lang) } catch (e) { /* ignore */ }
  }, [lang])

  function handleSubmit(e) {
    e.preventDefault()
    const f = new FormData(e.currentTarget)
    const body = [
      `${t.contact.name}: ${f.get('name')}`,
      `${t.contact.email}: ${f.get('email')}`,
      `${t.contact.phone}: ${f.get('phone')}`,
      `${t.contact.service}: ${f.get('service')}`,
      '',
      f.get('message'),
    ].join('\n')
    const subject = `Consultation request — ${f.get('name')}`
    window.location.href = `mailto:${CONTACT.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    setSent(true)
  }

  const navLinks = ['services', 'process', 'about', 'faq', 'contact']

  return (
    <>
      <header className="header">
        <div className="container header-inner">
          <a href="#top" className="brand" aria-label="Chloe Nguyen Tax Advisory">
            <img src={logoMark} alt="" className="brand-mark" width="40" height="42" />
            <span className="brand-text">
              <strong>Chloe Nguyen</strong>
              <small>Tax &amp; Advisory</small>
            </span>
          </a>

          <nav className={`nav ${menuOpen ? 'open' : ''}`} aria-label="Main">
            {navLinks.map((id) => (
              <a key={id} href={`#${id}`} onClick={() => setMenuOpen(false)}>{t.nav[id]}</a>
            ))}
          </nav>

          <div className="header-actions">
            <div className="lang-toggle" role="group" aria-label="Language">
              <button className={lang === 'en' ? 'active' : ''} onClick={() => setLang('en')}>EN</button>
              <button className={lang === 'vi' ? 'active' : ''} onClick={() => setLang('vi')}>VI</button>
            </div>
            <a href="#contact" className="btn btn-primary btn-sm hide-mobile">{t.nav.cta}</a>
            <button className="menu-btn" aria-label="Menu" aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>
              <span /><span /><span />
            </button>
          </div>
        </div>
      </header>

      <main id="top">
        <section className="hero">
          <div className="container hero-inner">
            <div className="hero-copy">
              <p className="eyebrow">{t.hero.eyebrow}</p>
              <h1>{t.hero.title}</h1>
              <p className="lead">{t.hero.sub}</p>
              <div className="hero-ctas">
                <a href="#contact" className="btn btn-primary">{t.hero.primary}</a>
                <a href="#services" className="btn btn-ghost">{t.hero.secondary}</a>
              </div>
            </div>
            <div className="hero-card" aria-hidden="true">
              <div className="hero-card-top">
                <span className="dot" /><span className="dot" /><span className="dot" />
              </div>
              <div className="hero-card-body">
                {t.services.items.map((s) => (
                  <div key={s.title} className="mini-row">
                    <span className="mini-icon"><Icon name={s.icon} size={18} /></span>
                    <span>{s.title}</span>
                    <span className="mini-check"><Icon name="check" size={16} /></span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="container stats">
            {t.hero.stats.map((s) => (
              <div key={s.v} className="stat"><strong>{s.k}</strong><span>{s.v}</span></div>
            ))}
          </div>
        </section>

        <section id="services" className="section">
          <div className="container">
            <div className="section-head">
              <h2>{t.services.title}</h2>
              <p>{t.services.sub}</p>
            </div>
            <div className="grid-services">
              {t.services.items.map((s) => (
                <article key={s.title} className="card">
                  <div className="card-icon"><Icon name={s.icon} /></div>
                  <h3>{s.title}</h3>
                  <p>{s.body}</p>
                  <ul className="checklist">
                    {s.points.map((p) => (
                      <li key={p}><Icon name="check" size={16} />{p}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
            <p className="disclaimer">{t.services.disclaimer}</p>
          </div>
        </section>

        <section id="process" className="section section-alt">
          <div className="container">
            <div className="section-head"><h2>{t.process.title}</h2></div>
            <ol className="steps">
              {t.process.steps.map((s, i) => (
                <li key={s.t} className="step">
                  <span className="step-num">{i + 1}</span>
                  <h3>{s.t}</h3>
                  <p>{s.d}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section id="about" className="section">
          <div className="container about">
            <div>
              <h2>{t.about.title}</h2>
              {t.about.body.map((p) => <p key={p} className="about-p">{p}</p>)}
            </div>
            <ul className="values">
              {t.about.values.map((v) => (
                <li key={v}><span className="value-icon"><Icon name="check" size={18} /></span>{v}</li>
              ))}
            </ul>
          </div>
        </section>

        <section id="faq" className="section section-alt">
          <div className="container narrow">
            <div className="section-head"><h2>{t.faq.title}</h2></div>
            <div className="faq">
              {t.faq.items.map((f) => (
                <details key={f.q}>
                  <summary>{f.q}</summary>
                  <p>{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="section contact-section">
          <div className="container contact">
            <div className="contact-info">
              <h2>{t.contact.title}</h2>
              <p className="lead">{t.contact.sub}</p>
              <dl>
                <div><dt>{t.contact.phone}</dt><dd><a href={`tel:${CONTACT.phone.replace(/\D/g, '')}`}>{CONTACT.phone}</a></dd></div>
                <div><dt>{t.contact.email}</dt><dd><a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a></dd></div>
                <div><dt>{t.contact.area}</dt><dd>{CONTACT.area}</dd></div>
                <div><dt>&nbsp;</dt><dd className="muted">{t.contact.hours}</dd></div>
              </dl>
            </div>

            <form className="form" onSubmit={handleSubmit}>
              {sent ? (
                <p className="form-sent">{t.contact.sent}</p>
              ) : (
                <>
                  <label>{t.contact.name}<input name="name" required autoComplete="name" /></label>
                  <div className="form-row">
                    <label>{t.contact.email}<input name="email" type="email" required autoComplete="email" /></label>
                    <label>{t.contact.phone}<input name="phone" type="tel" autoComplete="tel" /></label>
                  </div>
                  <label>{t.contact.service}
                    <select name="service" required defaultValue="">
                      <option value="" disabled>{t.contact.choose}</option>
                      {t.services.items.map((s) => <option key={s.title}>{s.title}</option>)}
                      <option>{t.contact.other}</option>
                    </select>
                  </label>
                  <label>{t.contact.message}<textarea name="message" rows="4" /></label>
                  <button type="submit" className="btn btn-primary btn-block">{t.contact.send}</button>
                </>
              )}
            </form>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container footer-inner">
          <img src={logoFull} alt="Chloe Nguyen Tax & Advisory" className="footer-logo" width="220" />
          <span>© {new Date().getFullYear()} Chloe Nguyen Tax LLC. {t.footer.rights}</span>
          <span className="muted">{t.footer.note}</span>
        </div>
      </footer>
    </>
  )
}
