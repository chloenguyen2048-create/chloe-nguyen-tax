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
  mail: <path d="M4 6h16v12H4zM4 7l8 6 8-6" />,
  pin: <path d="M12 21s-6-5.5-6-11a6 6 0 0 1 12 0c0 5.5-6 11-6 11Zm0-8.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />,
  clock: <path d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm0-13v4.5l3 2" />,
  phone: <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a1 1 0 0 1-1 1A16 16 0 0 1 4 5a1 1 0 0 1 1-1Z" />,
  arrow: <path d="M5 12h14m-5-5 5 5-5 5" />,
}

function Icon({ name, size = 24, stroke = 1.6 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
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

function SectionHead({ kicker, title, center = false }) {
  return (
    <div className={`section-head ${center ? 'center' : ''}`}>
      <p className="kicker">{kicker}</p>
      <h2>{title}</h2>
    </div>
  )
}

const tel = (p) => `tel:${p.replace(/\D/g, '')}`

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
      <div className="topbar">
        <div className="container topbar-inner">
          <span className="topbar-item"><Icon name="clock" size={14} />{t.topbar.hours}</span>
          <span className="topbar-right">
            {CONTACT.phone && (
              <a className="topbar-item" href={tel(CONTACT.phone)}><Icon name="phone" size={14} />{CONTACT.phone}</a>
            )}
            <a className="topbar-item" href={`mailto:${CONTACT.email}`}><Icon name="mail" size={14} />{CONTACT.email}</a>
          </span>
        </div>
      </div>

      <header className="header">
        <div className="container header-inner">
          <a href="#top" className="brand" aria-label="Chloe Nguyen Tax & Advisory">
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
              <button className={lang === 'en' ? 'active' : ''} aria-pressed={lang === 'en'} onClick={() => setLang('en')}>EN</button>
              <button className={lang === 'vi' ? 'active' : ''} aria-pressed={lang === 'vi'} onClick={() => setLang('vi')}>VI</button>
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
              <p className="hero-lead">{t.hero.sub}</p>
              <div className="hero-ctas">
                <a href="#contact" className="btn btn-gold">{t.hero.primary}<Icon name="arrow" size={18} stroke={2} /></a>
                <a href="#services" className="btn btn-outline-light">{t.hero.secondary}</a>
              </div>
            </div>
            <aside className="hero-panel">
              <p className="panel-title">{t.hero.serveTitle}</p>
              <ul>
                {t.hero.serve.map((s) => (
                  <li key={s}><Icon name="check" size={16} stroke={2} />{s}</li>
                ))}
              </ul>
              <p className="panel-note"><Icon name="pin" size={15} />{t.hero.serveNote}</p>
            </aside>
          </div>
        </section>

        <section className="assurances" aria-label="Our standards">
          <div className="container assurances-inner">
            {t.assurances.map((a) => (
              <div key={a} className="assurance">
                <span className="assurance-icon"><Icon name="check" size={15} stroke={2.2} /></span>
                <span>{a}</span>
              </div>
            ))}
          </div>
        </section>

        <section id="services" className="section">
          <div className="container">
            <SectionHead kicker={t.services.kicker} title={t.services.title} />
            <div className="grid-services">
              {t.services.items.map((s, i) => (
                <article key={s.title} className="card">
                  <div className="card-top">
                    <span className="card-icon"><Icon name={s.icon} size={22} /></span>
                    <span className="card-num">{String(i + 1).padStart(2, '0')}</span>
                  </div>
                  <h3>{s.title}</h3>
                  <p>{s.body}</p>
                  <ul className="checklist">
                    {s.points.map((p) => (
                      <li key={p}><Icon name="check" size={15} stroke={2} />{p}</li>
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
            <SectionHead kicker={t.process.kicker} title={t.process.title} />
            <ol className="steps">
              {t.process.steps.map((s, i) => (
                <li key={s.t} className="step">
                  <span className="step-num">{String(i + 1).padStart(2, '0')}</span>
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
              <SectionHead kicker={t.about.kicker} title={t.about.title} />
              {t.about.body.map((p) => <p key={p} className="about-p">{p}</p>)}
            </div>
            <aside className="values">
              <p className="panel-title">{t.about.valuesTitle}</p>
              <ul>
                {t.about.values.map((v) => (
                  <li key={v}><span className="value-icon"><Icon name="check" size={15} stroke={2} /></span>{v}</li>
                ))}
              </ul>
            </aside>
          </div>
        </section>

        <section id="faq" className="section section-alt">
          <div className="container narrow">
            <SectionHead kicker={t.faq.kicker} title={t.faq.title} center />
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

        <section id="contact" className="section">
          <div className="container contact">
            <div className="contact-info">
              <SectionHead kicker={t.contact.kicker} title={t.contact.title} />
              <p className="lead">{t.contact.sub}</p>
              <dl>
                {CONTACT.phone && (
                  <div><dt><Icon name="phone" size={18} /></dt><dd><span>{t.contact.phone}</span><a href={tel(CONTACT.phone)}>{CONTACT.phone}</a></dd></div>
                )}
                <div><dt><Icon name="mail" size={18} /></dt><dd><span>{t.contact.email}</span><a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a></dd></div>
                <div><dt><Icon name="pin" size={18} /></dt><dd><span>{t.contact.areaLabel}</span>{t.contact.area}</dd></div>
                <div><dt><Icon name="clock" size={18} /></dt><dd><span>{t.contact.hoursLabel}</span>{t.contact.hours}</dd></div>
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
        <div className="container footer-grid">
          <div className="footer-brand">
            <img src={logoFull} alt="Chloe Nguyen Tax & Advisory" className="footer-logo" width="170" />
            <p>{t.footer.tagline}</p>
          </div>
          <div>
            <p className="footer-head">{t.footer.explore}</p>
            <ul className="footer-links">
              {navLinks.map((id) => <li key={id}><a href={`#${id}`}>{t.nav[id]}</a></li>)}
            </ul>
          </div>
          <div>
            <p className="footer-head">{t.footer.contact}</p>
            <ul className="footer-links">
              {CONTACT.phone && <li><a href={tel(CONTACT.phone)}>{CONTACT.phone}</a></li>}
              <li><a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a></li>
              <li>{t.contact.area}</li>
              <li>{t.topbar.hours}</li>
            </ul>
          </div>
        </div>
        <div className="container footer-bottom">
          <span>© {new Date().getFullYear()} Chloe Nguyen Tax LLC. {t.footer.rights}</span>
          <span>{t.footer.note}</span>
        </div>
      </footer>
    </>
  )
}
