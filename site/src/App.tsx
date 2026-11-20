import { useRef, useState, type FormEvent, type ReactNode } from 'react'
import { ArrowRight, Heart, Mail, MapPin, Phone as PhoneIcon, Menu, X, Play, ShieldCheck, Leaf, BadgeCheck, BookOpen, Plus, Users, Sprout, CirclePlus, Target, Eye, Coins, ClipboardCheck, Search, Check, Package, BarChart3, FileText, Wallet, CalendarDays } from 'lucide-react'
import { GiftDemo } from './components/GiftDemo'
import { ThankYou } from './components/ThankYou'
import { useActiveSection, useParallax, useReveal, useScrolled } from './hooks'

const SECTIONS = ['home', 'about', 'work', 'donate', 'events', 'involved', 'contact'] as const
const NAV: [string, string][] = [
  ['home', 'Home'],
  ['about', 'About Us'],
  ['work', 'Our Work'],
  ['involved', 'Get Involved'],
  ['events', 'Events'],
  ['contact', 'Contact'],
]

const PHONE = '+91 98380 11223'
const EMAIL = 'info@adishaktisevatrust.org'

function Trident({ size = 28 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M16 4v24M8 8v7c0 3.2 3.6 5.2 8 5.2s8-2 8-5.2V8M8 8 6 11M24 8l2 3M16 4l-2 3M16 4l2 3" />
    </svg>
  )
}

function Logo({ light }: { light?: boolean }) {
  return (
    <a href="#home" className={`logo${light ? ' logo--light' : ''}`} aria-label="Adishakti Seva Trust, home">
      <span className="logo__mark" aria-hidden />
      <span className="logo__rule" />
      <span className="logo__text">
        <b>Adishakti<br />Seva Trust</b>
        <i>Vindhyachal</i>
      </span>
    </a>
  )
}

function Reveal({ children, d = 0, as: Tag = 'div', className = '' }: { children: ReactNode; d?: number; as?: 'div' | 'li' | 'p' | 'h2'; className?: string }) {
  return (
    <Tag data-reveal className={className} style={{ ['--d' as string]: `${d}ms` }}>
      {children}
    </Tag>
  )
}

/* ---------------------------------------------------------------- header */

function Header() {
  const [open, setOpen] = useState(false)
  const scrolled = useScrolled()
  const active = useActiveSection([...SECTIONS])
  const link = (id: string, label: string) => (
    <a key={id} href={`#${id}`} className={active === id ? 'is-active' : ''} onClick={() => setOpen(false)}>
      {label}
    </a>
  )
  return (
    <>
      <div className="topbar">
        <a href={`tel:${PHONE.replace(/\s/g, '')}`}><PhoneIcon size={14} /> {PHONE}</a>
        <a href={`mailto:${EMAIL}`}><Mail size={14} /> {EMAIL}</a>
        <span><MapPin size={14} /> Vindhyachal, Uttar Pradesh</span>
      </div>
      <header className={`header${scrolled ? ' header--scrolled' : ''}`}>
        <Logo />
        <nav className="nav" aria-label="Primary">{NAV.map(([id, l]) => link(id, l))}</nav>
        <a href="#donate" className="btn btn--solid header__cta"><Heart size={16} /> Donate Now</a>
        <button className="burger" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} onClick={() => setOpen((o) => !o)}>
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </header>
      <div className={`drawer${open ? ' drawer--open' : ''}`} aria-hidden={!open}>
        <nav>{NAV.map(([id, l]) => link(id, l))}</nav>
        <a href="#donate" className="btn btn--solid" onClick={() => setOpen(false)}><Heart size={16} /> Donate Now</a>
      </div>
    </>
  )
}

/* ------------------------------------------------------------------ hero */

function Hero() {
  const art = useRef<HTMLDivElement>(null)
  useParallax(art)
  return (
    <section id="home" className="hero">
      <div className="hero__copy">
        <p className="eyebrow hero__in" style={{ ['--i' as string]: 0 }}>A charitable trust at Vindhyachal</p>
        <h1 className="hero__title" aria-label="Serving Society in the Blessings of Maa Adishakti">
          <span className="line"><span style={{ ['--i' as string]: 1 }}>Serving Society</span></span>
          <span className="line"><span style={{ ['--i' as string]: 2 }}>in the Blessings of</span></span>
          <span className="line"><span style={{ ['--i' as string]: 3 }}><em>Maa Adishakti</em></span></span>
        </h1>
        <svg className="stroke" viewBox="0 0 260 14" preserveAspectRatio="none" aria-hidden>
          <path d="M3 9c40-6 90-7 130-5s85 2 124 0" pathLength={1} />
        </svg>
        <p className="hero__lede hero__in m-hide" style={{ ['--i' as string]: 5 }}>
          Adishakti Seva Trust is a non-profit organization based in Vindhyachal, dedicated to the service of society through education, healthcare, social welfare, and support for the needy.
        </p>
        <div className="hero__actions hero__in m-hide" style={{ ['--i' as string]: 6 }}>
          <a href="#donate" className="btn btn--solid btn--lg"><Heart size={18} /> Support Our Work <ArrowRight size={18} /></a>
          <a href="#about" className="btn btn--ghost btn--lg"><Play size={16} /> Watch Our Story</a>
        </div>
        <p className="hero__lede hero__in m-only" style={{ ['--i' as string]: 5 }}>Dedicated to education, healthcare, and community welfare in Vindhyachal.</p>
        <div className="hero__actions hero__in m-only" style={{ ['--i' as string]: 6 }}>
          <a href="#donate" className="btn btn--solid"><Heart size={18} /> Donate Now</a>
          <a href="#about" className="btn btn--ghost"><Play size={16} /> Our Mission</a>
        </div>
      </div>

      <div className="mhero m-only">
        <div className="mhero__photo">
          <img draggable={false} src="/img/riverside.jpg" alt="Evening light over the ghats and temple at Vindhyachal, a lit diya in the foreground" />
        </div>
        <div className="mhero__band">
          <svg className="mhero__wave" viewBox="0 0 390 40" preserveAspectRatio="none" aria-hidden>
            <path d="M0 40V24C60 8 120 36 190 26C260 16 320 0 390 8V40Z" fill="#701313" />
            <path d="M0 24C60 8 120 36 190 26C260 16 320 0 390 8" fill="none" stroke="#e8c07a" strokeOpacity=".7" strokeWidth="1.2" />
          </svg>
          <ul className="mhero__pillars">
            <li><BookOpen size={44} strokeWidth={1.1} /><b>Education</b><span>for a brighter future</span></li>
            <li><CirclePlus size={44} strokeWidth={1.1} /><b>Healthcare</b><span>for the underserved</span></li>
            <li><Users size={44} strokeWidth={1.1} /><b>Community</b><span>for stronger society</span></li>
          </ul>
          <a href="#about" className="mhero__card">
            <span className="mhero__crest"><Trident size={34} /></span>
            <span><b>Our Mission</b>To serve society with compassion, faith, and action.</span>
            <span className="mhero__go"><ArrowRight size={20} /></span>
          </a>
        </div>
      </div>

      <div className="hero__art" ref={art}>
        <div className="map">
          <div className="map__shape"><img draggable={false} src="/img/hero-map.jpg" alt="Children smiling in front of the ghats and temple at Vindhyachal" /></div>
          <svg className="map__line" viewBox="0 0 830 640" aria-hidden>
            <path d="M574 148C548 160 530 182 512 208" pathLength={1} />
          </svg>
          <div className="map__label hero__in" style={{ ['--i' as string]: 7 }}>
            <MapPin size={34} strokeWidth={0} fill="currentColor" />
            <span><b>Vindhyachal</b><i>(Uttar Pradesh)</i></span>
          </div>
        </div>
      </div>

      <ul className="hero__facts">
        {[
          [BookOpen, 'Education', 'for a better tomorrow'],
          [Plus, 'Healthcare', 'for the underserved'],
          [Users, 'Social Welfare', '& community support'],
          [Sprout, 'Support', 'for the needy'],
        ].map(([Icon, t, s], i) => {
          const I = Icon as typeof BookOpen
          return (
            <li key={t as string} className="hero__in" style={{ ['--i' as string]: 8 + i }}>
              <I size={26} strokeWidth={1.4} />
              <span><b>{t as string}</b>{s as string}</span>
            </li>
          )
        })}
      </ul>
    <svg className="fabric" viewBox="0 0 560 200" preserveAspectRatio="none" aria-hidden>
      <defs><linearGradient id="fb" x1="0" y1="1" x2="1" y2="0"><stop offset="0" stopColor="#c23a1c" /><stop offset="1" stopColor="#8e1414" /></linearGradient></defs>
      <path d="M560 36C500 40 430 80 370 130C330 162 290 186 250 200H560Z" fill="url(#fb)" />
      <path d="M560 6C528 40 480 84 420 128C386 152 360 176 336 200H392C440 176 500 136 560 96Z" fill="#e0501f" opacity=".92" />
    </svg>
    </section>
  )
}

/* ----------------------------------------------------------------- about */

function Lotus({ size = 56 }: { size?: number }) {
  const petal = 'M0 0C-9-9-9-21 0-32C9-21 9-9 0 0Z'
  return (
    <svg width={size} height={size} viewBox="-40 -40 80 56" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" aria-hidden>
      {[-62, -32, 32, 62].map((r) => <path key={r} d={petal} transform={`rotate(${r}) scale(.92)`} />)}
      <path d={petal} transform="scale(1.1)" />
      <path d="M-24 6C-10 12 10 12 24 6" strokeLinecap="round" />
    </svg>
  )
}

function About() {
  const pillars = [
    [BookOpen, 'Education', 'Learning for', 'a brighter tomorrow'],
    [CirclePlus, 'Healthcare', 'Access to', 'essential care'],
    [Users, 'Social Welfare', 'Support for the', 'underserved'],
    [Sprout, 'Community Development', 'Stronger, self-reliant', 'local communities'],
  ] as const
  return (
    <section id="about" className="about">
      <div className="about__a" data-reveal><img draggable={false} src="/img/about-a.jpg" alt="Collage: a schoolgirl, the temple at Vindhyachal, children, a doctor with an elderly patient, and a woman receiving food" /></div>
      <img draggable={false} className="about__b" src="/img/about-b.jpg" alt="" aria-hidden />
      <img draggable={false} className="about__c" src="/img/about-c.jpg" alt="" aria-hidden />
      <img draggable={false} className="about__d" src="/img/about-d.jpg" alt="" aria-hidden />

      <div className="about__copy">
        <Reveal className="eyebrow eyebrow--rule">About us</Reveal>
        <Reveal as="h2" className="about__title" d={80}>Adishakti<br />Seva Trust</Reveal>
        <Reveal d={140}>
          <svg className="about__brush" viewBox="0 0 180 10" preserveAspectRatio="none" aria-hidden><path d="M2 6C40 2 100 1 178 4" pathLength={1} /></svg>
        </Reveal>
        <Reveal as="p" className="about__lede" d={200}>
          A people-driven, non-profit trust from Vindhyachal, dedicated to the service of Maa Adishakti and the well-being of society through education, healthcare, and community support.
        </Reveal>
        <Reveal d={280}><a href="#work" className="btn btn--solid btn--lg">Our Journey <ArrowRight size={18} /></a></Reveal>
      </div>

      <Reveal className="panel" d={160}>
        <svg className="panel__bg" viewBox="0 0 347 601" preserveAspectRatio="none" aria-hidden>
          <defs><linearGradient id="pg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#8c1818" /><stop offset="1" stopColor="#5d0f0f" /></linearGradient></defs>
          <path d="M0 601V150C0 105 40 80 80 62C115 46 150 28 173 0C196 28 232 46 267 62C307 80 347 105 347 150V601Z" fill="url(#pg)" />
        </svg>
        <span className="pl pl-lotus"><Lotus size={56} /></span>
        <h3 className="pl pl-title">Our Purpose</h3>
        <span className="pl pl-orn" aria-hidden><i /><b /><i /></span>
        <p className="pl pl-item pl-i1"><Target size={40} strokeWidth={1.3} /><span>To serve society with compassion, faith, and action.</span></p>
        <hr className="pl pl-rule" />
        <p className="pl pl-item pl-i2"><Eye size={40} strokeWidth={1.3} /><span>To build a healthier, more educated, and empowered Vindhyachal.</span></p>
      </Reveal>

      <ul className="pillars">
        {pillars.map(([I, t, l1, l2], i) => (
          <Reveal as="li" key={t} d={200 + i * 90}>
            <I size={46} strokeWidth={1.3} />
            <b>{t}</b>
            <span>{l1}<br />{l2}</span>
          </Reveal>
        ))}
      </ul>
    </section>
  )
}

/* ------------------------------------------------------------------ work */

const WORK = [
  ['Education', 'Learning for a brighter tomorrow'],
  ['Healthcare', 'Access to essential care'],
  ['Social Welfare', 'Support for the underserved'],
  ['Community Development', 'Stronger, self-reliant local communities'],
]

function Work() {
  return (
    <section id="work" className="work">
      <div className="work__head">
        <Reveal className="eyebrow">Our work</Reveal>
        <Reveal as="h2" className="display display--sm" d={80}>Four ways we <em>serve</em></Reveal>
      </div>
      <ol className="work__list">
        {WORK.map(([t, s], i) => (
          <Reveal as="li" key={t} d={i * 90} className="work__row">
            <span className="work__n">0{i + 1}</span>
            <span className="work__t">{t}</span>
            <span className="work__s">{s}</span>
            <ArrowRight className="work__a" size={22} />
          </Reveal>
        ))}
      </ol>
    </section>
  )
}

/* ---------------------------------------------------------------- donate */

const AMOUNTS = [500, 1000, 2500, 5000]
const inr = (n: number) => `₹${n.toLocaleString('en-IN')}`

function CoinBox() {
  return (
    <svg viewBox="0 0 96 96" className="j-art" aria-hidden>
      <rect x="14" y="48" width="68" height="40" rx="6" fill="#9c2a22" />
      <rect x="14" y="48" width="68" height="10" rx="4" fill="#7a1414" />
      <path d="M48 62v18M41 66c0 4 3 6 7 6s7-2 7-6M48 62l-4 5M48 62l4 5" stroke="#f0cf94" strokeWidth="2.4" strokeLinecap="round" fill="none" />
      <rect x="36" y="44" width="24" height="5" rx="2.5" fill="#4f0c0c" />
      <g className="j-coin"><circle cx="48" cy="22" r="13" fill="#e8a317" stroke="#b9770d" strokeWidth="2" /><text x="48" y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="#7a4a06" fontFamily="Figtree, sans-serif">₹</text></g>
    </svg>
  )
}

function Growth() {
  return (
    <svg viewBox="0 0 100 90" className="j-art" aria-hidden>
      <path d="M50 54V34" stroke="#5d8a35" strokeWidth="3" strokeLinecap="round" />
      <path className="j-leaf" d="M50 38C40 38 33 30 35 20C46 20 52 27 50 38Z" fill="#6a9a3a" />
      <path className="j-leaf j-leaf--2" d="M50 34C59 34 68 27 66 16C55 16 48 23 50 34Z" fill="#82b44a" />
      {[70, 62, 54].map((y, i) => <g key={y}><ellipse cx="50" cy={y} rx="28" ry="8" fill="#e8a317" stroke="#b9770d" strokeWidth="1.8" /><ellipse cx="50" cy={y - 1.5} rx="20" ry="4" fill="#f4c24b" opacity={i === 2 ? 1 : 0.0} /></g>)}
    </svg>
  )
}

function Crowd() {
  return (
    <svg viewBox="0 0 120 90" className="j-art" aria-hidden>
      <g className="j-rays" stroke="#e8a317" strokeWidth="3" strokeLinecap="round">
        {[-50, -25, 0, 25, 50].map((r) => <line key={r} x1="60" y1="20" x2="60" y2="9" transform={`rotate(${r} 60 38)`} />)}
      </g>
      <circle cx="26" cy="48" r="9" fill="#c98d5f" /><path d="M8 86C8 64 44 64 44 86Z" fill="#9c2a22" />
      <circle cx="94" cy="48" r="9" fill="#c98d5f" /><path d="M76 86C76 64 112 64 112 86Z" fill="#6b8f3a" />
      <circle cx="60" cy="42" r="12" fill="#d9a070" /><path d="M36 86C36 56 84 56 84 86Z" fill="#e0a04a" />
    </svg>
  )
}

const STEPS = [
  { t: 'You Donate', d: 'Make a secure contribution in minutes.', art: <CoinBox /> },
  { t: 'We Allocate', d: 'Funds are routed to verified programs (school, healthcare, community care).', art: <BadgeCheck className="j-art" strokeWidth={1.2} color="#9c2a22" /> },
  { t: 'We Execute', d: 'On-ground teams run the programs with local partners in Vindhyachal.', art: <Growth /> },
  { t: 'We Track', d: 'Progress is monitored, audited, and documented with real updates.', art: <span className="j-duo j-duo--lens"><ClipboardCheck strokeWidth={1.3} color="#9c2a22" /><Search strokeWidth={1.8} color="#c8861a" /></span> },
  { t: 'You See the Impact', d: 'Get reports, photos, and outcomes of your contribution.', art: <Crowd /> },
]

const AFTER = [
  [Check, 'Payment Confirmed', "You'll receive an instant receipt."],
  [Package, 'Allocation in Progress', 'Your donation is assigned to a program.'],
  [Users, 'On-ground Execution', 'Our team carries out the identified work.'],
  [BarChart3, 'Impact Update', "You'll get a report with real outcomes & photos."],
] as const

function Donate() {
  const [freq, setFreq] = useState<'once' | 'monthly'>('once')
  const [amount, setAmount] = useState<number | null>(1000)
  const [custom, setCustom] = useState('')
  const [thanks, setThanks] = useState<{ amount: number; monthly: boolean } | null>(null)
  const value = custom ? Number(custom) : amount
  const valid = !!value && value >= 1

  // Until a payment gateway is connected, a valid submit stands in for "payment succeeded".
  const submit = (e: FormEvent) => {
    e.preventDefault()
    if (valid) setThanks({ amount: value!, monthly: freq === 'monthly' })
  }

  return (
    <section id="donate" className="donate">
      <div className="donate__bg" aria-hidden />
      <div className="donate__temple" aria-hidden />

      <div className="donate__main">
        <Reveal className="eyebrow eyebrow--both">From your donation to real impact</Reveal>
        <Reveal as="h2" className="display donate__title" d={80}>See How Your Contribution <em>Creates Change</em></Reveal>
        <Reveal as="p" className="lede" d={160}>A transparent, end-to-end journey of your donation, from contribution to meaningful impact in and around Vindhyachal.</Reveal>

        <div className="journey">
          <svg className="journey__path" viewBox="0 0 1130 440" aria-hidden>
            <defs>
              <linearGradient id="jg1" x1="0" x2="1"><stop offset="0" stopColor="#b5483a" /><stop offset="1" stopColor="#8c1818" /></linearGradient>
              <linearGradient id="jg2" x1="0" x2="1"><stop offset="0" stopColor="#f0a24a" /><stop offset="1" stopColor="#d9792a" /></linearGradient>
            </defs>
            <path d="M138 96C176 100 214 128 238 178" stroke="url(#jg1)" pathLength={1} />
            <path d="M370 172C396 140 420 114 452 106" stroke="url(#jg2)" pathLength={1} />
            <path d="M588 104C626 108 660 136 680 180" stroke="url(#jg2)" pathLength={1} />
            <path d="M806 172C830 130 852 92 884 72" stroke="url(#jg1)" pathLength={1} />
          </svg>
          {STEPS.map((st, i) => (
            <Reveal key={st.t} d={240 + i * 130} className={`step step--${i + 1}`}>
              <div className="step__art">{st.art}</div>
              <span className="step__n">{i + 1}</span>
              <h3>{st.t}</h3>
              <p>{st.d}</p>
            </Reveal>
          ))}
        </div>

        <ul className="trust">
          <li><ShieldCheck size={38} strokeWidth={1.3} /><span><b>100% Transparency</b>Track how your donation is used.</span></li>
          <li><FileText size={38} strokeWidth={1.3} /><span><b>Audited &amp; Compliant</b>Regular financial reports.</span></li>
          <li><MapPin size={38} strokeWidth={1.3} /><span><b>Local Impact</b>Focused on Vindhyachal &amp; nearby areas.</span></li>
        </ul>
      </div>

      <aside className="donate__side">
        <Reveal className="give" d={120}>
          <form onSubmit={submit} noValidate>
            <header className="give__head">
              <Trident size={34} />
              <div><h3>Make a Donation</h3><p>Support our ongoing initiatives in Vindhyachal.</p></div>
            </header>
            <div className="give__body">
              <div className="seg" role="radiogroup" aria-label="Frequency" data-i={freq === 'once' ? 0 : 1}>
                <span className="seg__thumb" />
                <button type="button" role="radio" aria-checked={freq === 'once'} onClick={() => setFreq('once')}><Wallet size={16} /> One-time</button>
                <button type="button" role="radio" aria-checked={freq === 'monthly'} onClick={() => setFreq('monthly')}><CalendarDays size={16} /> Monthly</button>
              </div>
              <div className="amounts" role="group" aria-label="Choose an amount">
                {AMOUNTS.map((a) => (
                  <button type="button" key={a} aria-pressed={!custom && amount === a} onClick={() => { setAmount(a); setCustom('') }}>{inr(a)}</button>
                ))}
              </div>
              <label className="custom">
                <span>₹</span>
                <input inputMode="numeric" placeholder="Enter custom amount" value={custom} onChange={(e) => setCustom(e.target.value.replace(/\D/g, '').slice(0, 8))} aria-label="Custom amount in rupees" />
              </label>
              <button type="submit" className="btn btn--solid btn--lg btn--block" disabled={!valid}>
                <Heart size={18} />
                <span className="swap" key={`${value}-${freq}`}>{valid ? `Donate ${inr(value!)}${freq === 'monthly' ? ' monthly' : ''} securely` : 'Donate Securely'}</span>
                <ArrowRight size={18} />
              </button>
            </div>
          </form>
        </Reveal>

        <Reveal className="after" d={260}>
          <h3>After You Donate</h3>
          <ol>
            {AFTER.map(([I, t, d], i) => (
              <li key={t} className={i === 0 ? 'is-done' : ''}>
                <span className="after__dot"><I size={i === 0 ? 16 : 18} strokeWidth={i === 0 ? 2.6 : 1.5} /></span>
                <span><b>{t}</b>{d}</span>
              </li>
            ))}
          </ol>
        </Reveal>
      </aside>

      {thanks && <ThankYou amount={thanks.amount} monthly={thanks.monthly} onClose={() => setThanks(null)} />}
    </section>
  )
}

/* ----------------------------------------------------------------- trace */

function Trace() {
  const steps = [
    ['Choose', 'Pick an amount, once or every month. There is no account to create.'],
    ['Give', 'Pay by UPI, card or net banking on a secure page.'],
    ['Receive', 'Your 80G receipt reaches your phone and inbox straight away.'],
  ]
  return (
    <section className="trace">
      <div className="trace__copy">
        <Reveal className="eyebrow">How giving works</Reveal>
        <Reveal as="h2" className="display display--sm" d={80}>Your gift, then <em>your receipt</em></Reveal>
        <ol className="steps">
          {steps.map(([t, s], i) => (
            <Reveal as="li" key={t} d={160 + i * 100}>
              <span>{i + 1}</span>
              <p><b>{t}</b>{s}</p>
            </Reveal>
          ))}
        </ol>
      </div>
      <Reveal className="trace__demo" d={140}><GiftDemo /></Reveal>
    </section>
  )
}

/* ---------------------------------------------------------------- events */

function Events() {
  const [done, setDone] = useState(false)
  return (
    <section id="events" className="events">
      <div>
        <Reveal className="eyebrow">Events</Reveal>
        <Reveal as="h2" className="display display--sm" d={80}>Seva programmes, <em>as they are announced</em></Reveal>
      </div>
      <Reveal className="events__body" d={140}>
        <p>No programmes are listed at the moment. Leave your number and we will message you when the next seva is announced.</p>
        <form onSubmit={(e) => { e.preventDefault(); setDone(true) }} className="notify">
          <input type="tel" required placeholder="Mobile number" aria-label="Mobile number" />
          <button className="btn btn--solid" type="submit">{done ? 'Noted, thank you' : 'Notify me'}</button>
        </form>
      </Reveal>
    </section>
  )
}

/* -------------------------------------------------------------- involved */

const WAYS = [
  ['Volunteer your time', 'Teach, assist at health camps, or help on the ground.', `mailto:${EMAIL}?subject=Volunteering`],
  ['Give every month', 'A steady gift lets us plan services further ahead.', '#donate'],
  ['Partner with us', 'Schools, clinics and local businesses working alongside the trust.', `mailto:${EMAIL}?subject=Partnership`],
]

function Involved() {
  return (
    <section id="involved" className="involved">
      <Reveal className="eyebrow">Get involved</Reveal>
      <Reveal as="h2" className="display display--sm" d={80}>There is a place for <em>everyone</em></Reveal>
      <div className="ways">
        {WAYS.map(([t, s, h], i) => (
          <Reveal key={t} d={i * 100}>
            <a href={h} className="way">
              <b>{t}</b>
              <span>{s}</span>
              <ArrowRight size={20} />
            </a>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

/* ---------------------------------------------------------------- footer */

function Footer() {
  return (
    <footer id="contact" className="footer">
      <div className="footer__top">
        <Logo light />
        <p>Serving society in the blessings of Maa Adishakti.</p>
      </div>
      <div className="footer__cols">
        <div>
          <h4>Contact</h4>
          <a href={`tel:${PHONE.replace(/\s/g, '')}`}>{PHONE}</a>
          <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
          <span>Vindhyachal, Uttar Pradesh</span>
        </div>
        <div>
          <h4>Explore</h4>
          {NAV.slice(1, 5).map(([id, l]) => <a key={id} href={`#${id}`}>{l}</a>)}
        </div>
        <div>
          <h4>Follow</h4>
          <a href="#">YouTube</a>
          <a href="#">Instagram</a>
          <a href="#">Facebook</a>
          <a href="#">LinkedIn</a>
        </div>
      </div>
      <p className="footer__fine">© {new Date().getFullYear()} Adishakti Seva Trust, Vindhyachal. All rights reserved.</p>
    </footer>
  )
}

export default function App() {
  useReveal()
  return (
    <>
      <Header />
      <main>
        <Hero />
        <About />
        <Work />
        <Donate />
        <Trace />
        <Events />
        <Involved />
      </main>
      <Footer />
    </>
  )
}
