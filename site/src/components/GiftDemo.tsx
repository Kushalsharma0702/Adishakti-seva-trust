import { Button, Icon, LockScreen, Notification, Phone, Segmented, Stage, Text, Window, WALLPAPER, type Act } from '../kit'
import './giftdemo.css'

// One gift, start to finish: a donor picks an amount on the donate page, pays,
// and the 80G receipt lands on their phone. Device pair: the browser is pinned
// top-left and runs off the bottom; the phone straddles its right edge over
// empty margin. Real words: the amount, the button, the receipt notification.

type S = { freq: number; amt: number; pay: 'idle' | 'busy' | 'done'; note: boolean }

const initial: S = { freq: 0, amt: 0, pay: 'idle', note: false }
const AMOUNTS = ['₹500', '₹1,000', '₹2,500', '₹5,000']
const POSTER: S = { freq: 0, amt: 1, pay: 'done', note: true }

async function script(a: Act<S>) {
  await a.wait(900)
  await a.move('amt-1')
  await a.wait(250)
  await a.click()
  await a.set({ amt: 1 })
  await a.wait(500)
  await a.move('pay')
  await a.wait(250)
  await a.click()
  await a.set({ pay: 'busy' })
  await a.wait(1100)
  await a.set({ pay: 'done' })
  await a.wait(700)
  await a.move('rest')
  await a.set({ note: true })
  await a.wait(3200)
  // Reverse order, last change first, so the frame rewinds as one motion
  await a.set({ note: false })
  await a.wait(350)
  await a.set({ pay: 'idle' })
  await a.wait(300)
  await a.set({ amt: 0 })
  await a.wait(400)
}

const REST = { wide: { x: 400, y: 330 }, compact: { x: 318, y: 300 } }

export function GiftDemo() {
  return (
    <Stage
      width={640}
      height={400}
      compact={{ below: 560, width: 358, height: 470 }}
      initial={initial}
      poster={POSTER}
      script={script}
      cursor={{ at: REST, style: 'arrow', ripple: true }}
      accent="#7a1414"
      tokens={{ '--ss-font': "'Figtree', system-ui, sans-serif", '--ss-radius-md': '10px' }}
      className="gd"
      fill
    >
      {(s, _rect, layout) => (
        <>
          <Window url="adishaktisevatrust.org/donate" className="gd-window">
            <div className="gd-page">
              <div className="gd-title">Make a donation</div>
              <Text className="gd-sub">Every rupee is accounted for.</Text>
              <Segmented items={['One-time', 'Monthly']} value={s.freq} targets={['freq-0', 'freq-1']} cursor="pointer" className="gd-seg" />
              <div className="gd-amounts">
                {AMOUNTS.map((x, i) => (
                  <Button key={x} size="large" variant={s.amt === i ? 'primary' : 'secondary'} data-target={`amt-${i}`} data-cursor="pointer">
                    {x}
                  </Button>
                ))}
              </div>
              <Button
                size="large"
                variant="primary"
                className="gd-pay"
                data-target="pay"
                data-cursor="pointer"
                icon={s.pay === 'done' ? <Icon name="check" filled size={14} /> : undefined}
              >
                {s.pay === 'idle' ? 'Donate securely' : s.pay === 'busy' ? 'Processing' : 'Thank you'}
              </Button>
              <div className="gd-fine">
                <Icon name="lock" size={12} /> 80G receipt sent by SMS and email
              </div>
            </div>
          </Window>

          <div className="gd-phonewrap" data-show={s.note}>
          <Phone width={236} frame="pro" dark wallpaper={WALLPAPER} className="gd-phone">
            <LockScreen size="satellite" stack="top">
              <div className="gd-note" data-show={s.note}>
                <Notification
                  icon={<span className="gd-glyph" aria-hidden>ॐ</span>}
                  title="Donation received"
                  body="₹1,000 to Adishakti Seva Trust. Your 80G receipt is attached."
                />
              </div>
            </LockScreen>
          </Phone>
          </div>
        </>
      )}
    </Stage>
  )
}
