import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { X } from 'lucide-react'
import './thankyou.css'

// What a gift does, drawn by hand. Below ₹2,500 a hungry child is served a meal;
// from ₹2,500 a student receives books for school. Both play the same story:
// a quiet, slightly sad scene -> the gift travels in as a heart -> it becomes
// the thing itself -> the face changes -> marigold petals fall.

export type Scene = 'meal' | 'books'
export const sceneFor = (amount: number): Scene => (amount >= 2500 ? 'books' : 'meal')

const inr = (n: number) => `₹${n.toLocaleString('en-IN')}`

const SKIN = '#b9794a'
const HAIR = '#2a1710'

function Heart() {
  return (
    <g className="ty-heart" opacity="0">
      <path d="M0 11C-20 -4 -15 -20 -7 -20C-2 -20 0 -15 0 -13C0 -15 2 -20 7 -20C15 -20 20 -4 0 11Z" fill="#c2271d" />
      <path d="M-9 -12C-12 -10 -12 -6 -9 -3" stroke="#ff9b8c" strokeWidth="2.4" strokeLinecap="round" fill="none" />
      <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.12;0.86;1" dur="1.5s" begin="0.9s" fill="freeze" />
      <animateMotion path="M430 24C410 140 300 110 240 238" dur="1.5s" begin="0.9s" fill="freeze" calcMode="spline" keyTimes="0;1" keySplines="0.45 0 0.2 1" />
    </g>
  )
}

function Petals() {
  const petals = [
    [40, 7.5, 0], [110, 9, 1.2], [180, 8, 2.6], [250, 10, 0.6], [320, 8.5, 3.4], [390, 9.5, 1.9], [440, 7, 4.2], [75, 10.5, 5], [350, 11, 2.2],
  ]
  return (
    <g aria-hidden>
      {petals.map(([x, dur, delay], i) => (
        <g key={i} className="ty-petal" style={{ ['--x' as string]: `${x}px`, ['--dur' as string]: `${dur}s`, ['--dl' as string]: `${3.3 + (delay as number)}s`, ['--sway' as string]: `${i % 2 ? 26 : -26}px` }}>
          <ellipse rx="5" ry="3" fill={i % 3 === 0 ? '#e8780f' : '#f2a516'} transform={`rotate(${i * 40})`} />
        </g>
      ))}
    </g>
  )
}

function Burst({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <circle className="ty-ring" r="40" fill="none" stroke="#e6a23a" strokeWidth="3" />
      <circle className="ty-ring ty-ring--2" r="40" fill="none" stroke="#c2271d" strokeWidth="2" />
    </g>
  )
}

/* ------------------------------------------------------------- meal */

function MealScene() {
  return (
    <svg viewBox="0 0 480 320" role="img" aria-label="A hungry child sits with an empty plate. A heart arrives, the plate fills with a hot meal, and the child smiles.">
      <circle cx="240" cy="178" r="150" fill="#f7dfba" opacity=".75" />
      <path d="M0 266H480V320H0Z" fill="#ecd3ab" />
      <ellipse cx="240" cy="276" rx="176" ry="22" fill="#c98f4a" />
      <ellipse cx="240" cy="276" rx="154" ry="16" fill="none" stroke="#e1b574" strokeWidth="2" strokeDasharray="3 6" />

      <g className="ty-child ty-bob">
        {/* legs, crossed */}
        <ellipse cx="240" cy="252" rx="86" ry="22" fill="#f1e4cf" stroke="#d6c3a3" />
        <path d="M168 254C190 238 214 246 240 252" stroke="#d6c3a3" strokeWidth="2" fill="none" />
        {/* torso */}
        <path d="M194 242C192 192 206 168 240 168C274 168 288 192 286 242Z" fill="#d98a2b" />
        <path d="M240 168V206" stroke="#b9701a" strokeWidth="2" />
        {/* arms */}
        <path d="M204 184C186 212 192 238 216 250" stroke="#d98a2b" strokeWidth="17" strokeLinecap="round" fill="none" />
        <path d="M276 184C294 212 288 238 264 250" stroke="#d98a2b" strokeWidth="17" strokeLinecap="round" fill="none" />
        <circle cx="217" cy="252" r="8" fill={SKIN} />
        <circle cx="263" cy="252" r="8" fill={SKIN} />
        {/* head */}
        <rect x="232" y="150" width="16" height="24" rx="6" fill={SKIN} />
        <circle cx="206" cy="132" r="6.5" fill={SKIN} />
        <circle cx="274" cy="132" r="6.5" fill={SKIN} />
        <circle cx="240" cy="128" r="34" fill={SKIN} />
        <path d="M206 124C203 90 277 86 274 124C267 108 248 103 240 105C230 103 213 108 206 124Z" fill={HAIR} />
        {/* sad */}
        <g className="ty-sad">
          <circle cx="226" cy="132" r="3.2" fill={HAIR} />
          <circle cx="254" cy="132" r="3.2" fill={HAIR} />
          <path d="M217 128L232 121M263 128L248 121" stroke={HAIR} strokeWidth="2.2" strokeLinecap="round" />
          <path d="M230 150Q240 142 250 150" stroke={HAIR} strokeWidth="2.6" strokeLinecap="round" fill="none" />
          <path className="ty-rumble" d="M296 214q6-6 12 0q6 6 12 0q6-6 12 0" stroke="#a5683a" strokeWidth="2.4" strokeLinecap="round" fill="none" />
          <path className="ty-rumble ty-rumble--2" d="M158 208q-6-6-12 0q-6 6-12 0" stroke="#a5683a" strokeWidth="2.4" strokeLinecap="round" fill="none" />
        </g>
        {/* happy */}
        <g className="ty-happy">
          <path d="M220 132Q226 124 232 132M248 132Q254 124 260 132" stroke={HAIR} strokeWidth="2.8" strokeLinecap="round" fill="none" />
          <path d="M225 141Q240 162 255 141Z" fill="#7a1414" />
          <path d="M229 142Q240 146 251 142" stroke="#fff" strokeWidth="3" strokeLinecap="round" fill="none" />
          <circle cx="213" cy="144" r="6.5" fill="#e0705a" opacity=".5" />
          <circle cx="267" cy="144" r="6.5" fill="#e0705a" opacity=".5" />
        </g>
      </g>

      {/* the plate and what arrives on it */}
      <ellipse cx="240" cy="274" rx="74" ry="14" fill="#eef0f2" stroke="#b8c0c6" />
      <ellipse cx="240" cy="274" rx="57" ry="9" fill="#dfe4e8" />
      <g className="ty-pop ty-pop--1"><path d="M212 272C214 248 266 248 268 272C258 278 222 278 212 272Z" fill="#fffaf0" stroke="#e6dcc6" /></g>
      <g className="ty-pop ty-pop--2">
        <ellipse cx="184" cy="276" rx="17" ry="6.5" fill="#e6b422" stroke="#b78a12" />
        <ellipse cx="184" cy="273" rx="13" ry="4" fill="#f2cd4a" />
      </g>
      <g className="ty-pop ty-pop--3">
        <ellipse cx="296" cy="276" rx="17" ry="6.5" fill="#7aa53a" stroke="#4f7424" />
        <ellipse cx="296" cy="273" rx="13" ry="4" fill="#98c04e" />
      </g>
      <g className="ty-steam" fill="none" stroke="#fff" strokeWidth="3.4" strokeLinecap="round" opacity="0">
        <path className="ty-steam__a" d="M228 246q-7-10 0-20q7-10 0-20" />
        <path className="ty-steam__b" d="M242 244q-7-10 0-20q7-10 0-20" />
        <path className="ty-steam__c" d="M256 246q-7-10 0-20q7-10 0-20" />
      </g>

      <Burst x={240} y={268} />
      <Heart />
      <Petals />
    </svg>
  )
}

/* ------------------------------------------------------------ books */

function BooksScene() {
  const letters = [
    ['अ', 168, 0], ['A', 318, 0.7], ['1', 196, 1.4], ['आ', 292, 2.1], ['B', 150, 2.8], ['2', 340, 3.2],
  ] as const
  return (
    <svg viewBox="0 0 480 320" role="img" aria-label="A student stands at an empty desk. A heart arrives, a stack of books appears, and she smiles and holds them close.">
      <circle cx="240" cy="178" r="150" fill="#f7dfba" opacity=".75" />
      <path d="M0 272H480V320H0Z" fill="#ecd3ab" />
      <ellipse cx="240" cy="276" rx="150" ry="8" fill="#d7b985" />

      <g className="ty-girl ty-bob">
        {/* braids */}
        <path d="M209 118C196 150 202 176 206 184" stroke={HAIR} strokeWidth="13" strokeLinecap="round" fill="none" />
        <path d="M271 118C284 150 278 176 274 184" stroke={HAIR} strokeWidth="13" strokeLinecap="round" fill="none" />
        <circle cx="206" cy="188" r="6" fill="#c2271d" />
        <circle cx="274" cy="188" r="6" fill="#c2271d" />
        {/* torso */}
        <path d="M194 232C192 168 208 140 240 140C272 140 288 168 286 232Z" fill="#f7efe4" />
        <path d="M204 232C204 190 214 164 240 164C266 164 276 190 276 232Z" fill="#7a1414" />
        <path d="M222 144L226 166M258 144L254 166" stroke="#7a1414" strokeWidth="6" strokeLinecap="round" />
        {/* head */}
        <rect x="232" y="124" width="16" height="22" rx="6" fill="#c08050" />
        <circle cx="240" cy="104" r="32" fill="#c08050" />
        <path d="M207 100C205 68 275 66 273 100C268 86 252 80 240 82C228 80 212 86 207 100Z" fill={HAIR} />
        <g className="ty-sad">
          <circle cx="227" cy="110" r="3" fill={HAIR} />
          <circle cx="253" cy="110" r="3" fill={HAIR} />
          <path d="M219 106L232 99M261 106L248 99" stroke={HAIR} strokeWidth="2.2" strokeLinecap="round" />
          <path d="M231 127Q240 120 249 127" stroke={HAIR} strokeWidth="2.6" strokeLinecap="round" fill="none" />
        </g>
        <g className="ty-happy">
          <path d="M221 110Q227 102 233 110M247 110Q253 102 259 110" stroke={HAIR} strokeWidth="2.8" strokeLinecap="round" fill="none" />
          <path d="M226 119Q240 140 254 119Z" fill="#7a1414" />
          <path d="M230 120Q240 124 250 120" stroke="#fff" strokeWidth="3" strokeLinecap="round" fill="none" />
          <circle cx="214" cy="122" r="6.5" fill="#e0705a" opacity=".5" />
          <circle cx="266" cy="122" r="6.5" fill="#e0705a" opacity=".5" />
        </g>
        {/* arms: resting, then holding the books */}
        <g className="ty-arms-rest">
          <path d="M200 160C190 190 196 214 214 228" stroke="#f7efe4" strokeWidth="15" strokeLinecap="round" fill="none" />
          <path d="M280 160C290 190 284 214 266 228" stroke="#f7efe4" strokeWidth="15" strokeLinecap="round" fill="none" />
          <circle cx="216" cy="231" r="7.5" fill="#c08050" />
          <circle cx="264" cy="231" r="7.5" fill="#c08050" />
        </g>
        <g className="ty-arms-hold">
          <path d="M200 160C192 190 204 206 222 214" stroke="#f7efe4" strokeWidth="15" strokeLinecap="round" fill="none" />
          <path d="M280 160C288 190 276 206 258 214" stroke="#f7efe4" strokeWidth="15" strokeLinecap="round" fill="none" />
        </g>
      </g>

      {/* desk, empty but for a worn-down pencil */}
      <rect x="128" y="236" width="224" height="14" rx="4" fill="#a9743c" />
      <rect x="144" y="250" width="10" height="26" fill="#8d5f2f" />
      <rect x="326" y="250" width="10" height="26" fill="#8d5f2f" />
      <g className="ty-sad"><rect x="156" y="230" width="26" height="5" rx="2" fill="#e6b422" /><path d="M156 230l-6 2.5l6 2.5Z" fill="#e8c9a0" /></g>

      {/* the books arrive on the desk, then rise into her arms */}
      <g className="ty-books">
        <g className="ty-pop ty-pop--1"><rect x="208" y="222" width="64" height="14" rx="2" fill="#c8761f" /><rect x="264" y="224" width="6" height="10" fill="#f6e7c8" /></g>
        <g className="ty-pop ty-pop--2"><rect x="214" y="208" width="54" height="14" rx="2" fill="#2f6f6a" /><rect x="260" y="210" width="6" height="10" fill="#f6e7c8" /></g>
        <g className="ty-pop ty-pop--3"><rect x="210" y="194" width="58" height="14" rx="2" fill="#8c1818" /><rect x="260" y="196" width="6" height="10" fill="#f6e7c8" /></g>
      </g>
      <g className="ty-letters" fill="#7a1414" fontFamily="'Newsreader', Georgia, serif" fontSize="24" fontWeight="600" aria-hidden>
        {letters.map(([ch, x, d], i) => (
          <text key={i} x={x} y={190} textAnchor="middle" style={{ ['--ld' as string]: `${4.2 + d}s` }} fill={i % 2 ? '#c8761f' : '#7a1414'}>{ch}</text>
        ))}
      </g>

      <Burst x={240} y={226} />
      <Heart />
      <Petals />
    </svg>
  )
}

/* ---------------------------------------------------------- overlay */

export function ThankYou({ amount, monthly, onClose }: { amount: number; monthly: boolean; onClose: () => void }) {
  const scene = sceneFor(amount)
  const closeRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()
    const key = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', key)
    return () => { document.body.style.overflow = prev; window.removeEventListener('keydown', key) }
  }, [onClose])

  const copy =
    scene === 'meal'
      ? { title: 'A meal, served.', body: `Your ${inr(amount)}${monthly ? ' every month' : ''} puts a hot meal in front of someone who has gone without. Thank you.` }
      : { title: 'Books, in small hands.', body: `Your ${inr(amount)}${monthly ? ' every month' : ''} helps a child begin the school year with books of their own. Thank you.` }

  return createPortal(
    <div className="ty" role="dialog" aria-modal="true" aria-labelledby="ty-title" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div className="ty__card">
        <button ref={closeRef} className="ty__x" onClick={onClose} aria-label="Close"><X size={20} /></button>
        <div className="ty__scene">{scene === 'meal' ? <MealScene /> : <BooksScene />}</div>
        <div className="ty__text">
          <h2 id="ty-title" className="ty__title">{copy.title}</h2>
          <p className="ty__body">{copy.body}</p>
          <div className="ty__actions">
            <button className="btn btn--solid" onClick={onClose}>Done</button>
            <p className="ty__fine">Your 80G receipt will be sent to you.</p>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  )
}
