// scenes.jsx — Adam Marra hero video scenes.
// All scenes live inside a 1920x1080 Stage. Palette locked to gold/cream/black.

const GOLD = '#C9A84C';
const GOLD_LIGHT = '#E2C878';
const GOLD_DARK = '#9A7E2F';
const CREAM = '#F5EBD6';
const CREAM_MUTED = 'rgba(245, 235, 214, 0.72)';
const CREAM_FAINT = 'rgba(245, 235, 214, 0.08)';
const BG = '#0A0A0A';
const BG_CARD = '#141414';
const BORDER = 'rgba(201, 168, 76, 0.12)';
const BORDER_STRONG = 'rgba(201, 168, 76, 0.28)';

const SERIF = "'Playfair Display', Georgia, serif";
const SANS = "'Inter', system-ui, sans-serif";
const MONO = "'JetBrains Mono', ui-monospace, monospace";

const EASE = Easing.easeOutQuart; // close to cubic-bezier(0.16,1,0.3,1)

// ── Helpers ───────────────────────────────────────────────────────────────

// Smooth 0→1 fade-in over `dur` seconds starting at localTime 0, plus fade-out at end.
function useInOut(dur, entry = 0.5, exit = 0.5, localTime, total) {
  const fadeIn = clamp(localTime / entry, 0, 1);
  const fadeOut = total
    ? clamp((total - localTime) / exit, 0, 1)
    : 1;
  return Math.min(EASE(fadeIn), EASE(fadeOut));
}

// Format number with thousands separator (European: dot)
function fmtEU(n) {
  return Math.round(n).toLocaleString('it-IT');
}

// Film grain overlay matching landing page
function FilmGrain() {
  return (
    <div style={{
      position: 'absolute', inset: 0,
      pointerEvents: 'none',
      opacity: 0.035,
      mixBlendMode: 'overlay',
      background: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23g)'/%3E%3C/svg%3E")`,
      zIndex: 100,
    }} />
  );
}

// Subtle radial vignette
function Vignette() {
  return (
    <div style={{
      position: 'absolute', inset: 0,
      pointerEvents: 'none',
      background: 'radial-gradient(ellipse 90% 70% at 50% 50%, transparent 40%, rgba(0,0,0,0.55) 100%)',
      zIndex: 90,
    }} />
  );
}

// Scene caption — small mono label at bottom of frame, consistent across scenes
function SceneCaption({ text, num, total }) {
  const { localTime, duration } = useSprite();
  const op = useInOut(duration, 0.6, 0.5, localTime, duration);
  return (
    <div style={{
      position: 'absolute',
      left: 80, bottom: 72,
      opacity: op,
      fontFamily: MONO,
      fontSize: 14,
      letterSpacing: '0.2em',
      textTransform: 'uppercase',
      color: CREAM_MUTED,
      display: 'flex', alignItems: 'center', gap: 20,
      zIndex: 50,
    }}>
      <span style={{ color: GOLD, fontVariantNumeric: 'tabular-nums' }}>
        {String(num).padStart(2, '0')} / {String(total).padStart(2, '0')}
      </span>
      <span style={{ width: 40, height: 1, background: CREAM_FAINT }} />
      <span>{text}</span>
    </div>
  );
}

// Persistent top-left brand mark
function BrandMark({ visible = true }) {
  const { time } = useTimeline();
  // appear after first second, stay
  const op = time < 0.8 ? 0 : clamp((time - 0.8) / 0.6, 0, 1);
  if (!visible) return null;
  return (
    <div style={{
      position: 'absolute',
      left: 80, top: 72,
      opacity: op,
      fontFamily: SERIF,
      fontSize: 26,
      fontWeight: 500,
      letterSpacing: '0.01em',
      color: CREAM,
      zIndex: 60,
    }}>
      Adam <span style={{ color: GOLD, fontStyle: 'italic', fontWeight: 400 }}>Marra</span>
    </div>
  );
}

// Live status pill top-right
function StatusPill() {
  const { time } = useTimeline();
  const op = time < 0.8 ? 0 : clamp((time - 0.8) / 0.6, 0, 1);
  return (
    <div style={{
      position: 'absolute',
      right: 80, top: 72,
      opacity: op,
      fontFamily: MONO,
      fontSize: 12,
      letterSpacing: '0.2em',
      textTransform: 'uppercase',
      color: CREAM_MUTED,
      display: 'flex', alignItems: 'center', gap: 10,
      zIndex: 60,
    }}>
      <span style={{
        width: 7, height: 7, borderRadius: '50%',
        background: '#4ade80',
        boxShadow: '0 0 8px rgba(74,222,128,0.6)',
      }} />
      Risultati reali
    </div>
  );
}

// Draws a thin gold rule that animates in width
function GoldRule({ x, y, width = 120, progress = 1 }) {
  return (
    <div style={{
      position: 'absolute',
      left: x, top: y,
      width: width * progress,
      height: 1,
      background: `linear-gradient(90deg, transparent, ${GOLD}, transparent)`,
      opacity: 0.8,
    }} />
  );
}

// ── Scene 01 — Cold open title ────────────────────────────────────────────
// 0.0 → 5.0
function Scene01_Title() {
  const { localTime, duration, progress } = useSprite();

  // Ultra-slow zoom: 1.0 → 1.05
  const scale = 1 + 0.05 * EASE(progress);

  // "Content Marketing" fades in over first 1.2s
  const l1Op = clamp(localTime / 1.2, 0, 1);
  const l1Y = (1 - EASE(l1Op)) * 30;

  // "che converte" slides up starting at 1.2s
  const l2Start = 1.4;
  const l2Op = clamp((localTime - l2Start) / 1.0, 0, 1);
  const l2Y = (1 - EASE(l2Op)) * 40;

  // Rule draws in starting at 2.8s
  const ruleStart = 2.8;
  const ruleP = clamp((localTime - ruleStart) / 1.2, 0, 1);

  // Exit fade
  const exitOp = localTime > duration - 0.6
    ? 1 - clamp((localTime - (duration - 0.6)) / 0.6, 0, 1)
    : 1;

  return (
    <div style={{
      position: 'absolute', inset: 0,
      transform: `scale(${scale})`,
      transformOrigin: 'center',
      opacity: exitOp,
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
    }}>
      <div style={{
        fontFamily: MONO,
        fontSize: 13,
        letterSpacing: '0.32em',
        textTransform: 'uppercase',
        color: GOLD,
        opacity: l1Op * 0.9,
        marginBottom: 48,
      }}>
        — Adam Marra Consulting —
      </div>

      <div style={{
        fontFamily: SERIF,
        fontSize: 128,
        fontWeight: 700,
        color: CREAM,
        letterSpacing: '-0.02em',
        lineHeight: 1,
        opacity: l1Op,
        transform: `translateY(${l1Y}px)`,
        textAlign: 'center',
      }}>
        Content Marketing
      </div>

      <div style={{
        fontFamily: SERIF,
        fontSize: 128,
        fontWeight: 400,
        fontStyle: 'italic',
        color: GOLD_LIGHT,
        letterSpacing: '-0.01em',
        lineHeight: 1,
        opacity: l2Op,
        transform: `translateY(${l2Y}px)`,
        marginTop: 8,
        textAlign: 'center',
      }}>
        che converte.
      </div>

      <div style={{
        marginTop: 56,
        width: 200 * ruleP,
        height: 1,
        background: `linear-gradient(90deg, transparent, ${GOLD}, transparent)`,
      }} />
    </div>
  );
}

// ── Scene 02 — Follower counter ───────────────────────────────────────────
// 5.0 → 12.0
function Scene02_Followers({ fromN = 12400, toN = 184000 }) {
  const { localTime, duration, progress } = useSprite();

  // Card slides in over first 0.8s
  const cardOp = clamp(localTime / 0.8, 0, 1);
  const cardY = (1 - EASE(cardOp)) * 40;

  // Counter ramps 0.8 → 5.0, tight ease-out
  const countStart = 0.8;
  const countEnd = 5.0;
  const countT = clamp((localTime - countStart) / (countEnd - countStart), 0, 1);
  const countEased = Easing.easeOutExpo(countT);
  const current = fromN + (toN - fromN) * countEased;

  // +X new arrow pulses in around 3s
  const deltaStart = 3.0;
  const deltaOp = clamp((localTime - deltaStart) / 0.6, 0, 1);

  // Caption appears late
  const capStart = 5.2;
  const capOp = clamp((localTime - capStart) / 0.8, 0, 1);

  // Exit
  const exitOp = localTime > duration - 0.5
    ? 1 - clamp((localTime - (duration - 0.5)) / 0.5, 0, 1)
    : 1;

  // Slow push-in on the card
  const cardScale = 1 + 0.04 * EASE(progress);

  return (
    <div style={{
      position: 'absolute', inset: 0,
      opacity: exitOp,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      <div style={{
        width: 920,
        background: BG_CARD,
        border: `1px solid ${BORDER_STRONG}`,
        borderRadius: 20,
        padding: '56px 72px',
        opacity: cardOp,
        transform: `translateY(${cardY}px) scale(${cardScale})`,
        boxShadow: '0 20px 60px -10px rgba(201,168,76,0.12), 0 8px 32px rgba(0,0,0,0.5)',
        position: 'relative',
      }}>
        {/* Header row */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          marginBottom: 40,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, minWidth: 0 }}>
            <div style={{
              width: 52, height: 52, minWidth: 52, minHeight: 52, flexShrink: 0,
              borderRadius: '50%',
              backgroundColor: GOLD_DARK,
              backgroundImage: `linear-gradient(135deg, ${GOLD_DARK}, ${GOLD_LIGHT})`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: SERIF, fontSize: 24, color: BG, fontWeight: 700,
              lineHeight: 1,
              boxShadow: `inset 0 0 0 1px ${GOLD_LIGHT}`,
            }}>A</div>
            <div>
              <div style={{
                fontFamily: SANS, fontSize: 16, color: CREAM, fontWeight: 500,
              }}>@adamarra.consulting</div>
              <div style={{
                fontFamily: MONO, fontSize: 11, color: CREAM_MUTED,
                letterSpacing: '0.15em', textTransform: 'uppercase', marginTop: 2,
              }}>Profilo verificato</div>
            </div>
          </div>
          <div style={{
            fontFamily: MONO, fontSize: 11,
            color: CREAM_MUTED, letterSpacing: '0.2em', textTransform: 'uppercase',
          }}>Followers</div>
        </div>

        {/* Big counter */}
        <div style={{
          fontFamily: SERIF,
          fontSize: 148,
          fontWeight: 700,
          color: CREAM,
          letterSpacing: '-0.03em',
          lineHeight: 1,
          fontVariantNumeric: 'tabular-nums',
          display: 'flex', alignItems: 'baseline', gap: 20,
          whiteSpace: 'nowrap',
        }}>
          <span>{fmtEU(current)}</span>
          <span style={{
            fontSize: 30,
            color: GOLD,
            fontFamily: MONO,
            fontWeight: 400,
            letterSpacing: '0.04em',
            opacity: deltaOp,
            transform: `translateY(${(1 - deltaOp) * 8}px)`,
            transition: 'none',
          }}>
            +{fmtEU(Math.max(0, current - fromN))}
          </span>
        </div>

        {/* Progress bar */}
        <div style={{
          marginTop: 36,
          height: 4, background: CREAM_FAINT,
          borderRadius: 2, overflow: 'hidden', position: 'relative',
        }}>
          <div style={{
            width: `${countEased * 100}%`,
            height: '100%',
            background: `linear-gradient(90deg, ${GOLD_DARK}, ${GOLD_LIGHT})`,
            boxShadow: `0 0 12px ${GOLD}`,
          }} />
        </div>

        {/* Footer meta */}
        <div style={{
          marginTop: 28,
          display: 'flex', justifyContent: 'space-between',
          fontFamily: MONO, fontSize: 12,
          color: CREAM_MUTED, letterSpacing: '0.12em', textTransform: 'uppercase',
        }}>
          <span>Inizio · Gen 2025</span>
          <span style={{ color: GOLD, opacity: capOp }}>+ 1,384% crescita</span>
        </div>
      </div>

      {/* Side caption */}
      <div style={{
        position: 'absolute',
        left: 80,
        top: '50%',
        transform: `translateY(-50%) translateX(${(1 - capOp) * -20}px)`,
        opacity: capOp,
        fontFamily: SERIF,
        fontSize: 56,
        fontStyle: 'italic',
        color: GOLD_LIGHT,
        lineHeight: 1.05,
      }}>
        In 9<br/>mesi.
      </div>
    </div>
  );
}

// ── Scene 03 — DM pile-up ─────────────────────────────────────────────────
// 12.0 → 19.0
const DM_MESSAGES = [
  { name: 'Marco R.', text: 'Ciao Adam, vorrei prenotare una call per la mia azienda…' },
  { name: 'Giulia F.', text: 'Seguo da mesi, finalmente mi decido. Come funziona il 1:1?' },
  { name: 'Lorenzo B.', text: 'Abbiamo bisogno di ristrutturare il brand. Sei disponibile?' },
  { name: 'Sara M.', text: 'I tuoi contenuti mi hanno convinta. Posso candidarmi?' },
  { name: 'Tommaso V.', text: 'Complimenti, risultati incredibili. Mi mandi info?' },
  { name: 'Elena D.', text: 'Ho visto il tuo ultimo video, pazzesco. Prezzi?' },
  { name: 'Andrea C.', text: 'Vogliamo scalare il mio studio, mi aiuti?' },
];

function Scene03_DMs() {
  const { localTime, duration, progress } = useSprite();

  // Each DM appears in sequence every 0.55s starting at 0.3s
  const baseDelay = 0.3;
  const step = 0.55;

  const counterStart = 0.5;
  const counterEnd = 5.5;
  const counterT = clamp((localTime - counterStart) / (counterEnd - counterStart), 0, 1);
  const counterVal = Math.round(Easing.easeOutExpo(counterT) * 847);

  // Caption
  const capStart = 5.4;
  const capOp = clamp((localTime - capStart) / 0.8, 0, 1);

  // Exit
  const exitOp = localTime > duration - 0.5
    ? 1 - clamp((localTime - (duration - 0.5)) / 0.5, 0, 1)
    : 1;

  return (
    <div style={{
      position: 'absolute', inset: 0,
      opacity: exitOp,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      gap: 80,
    }}>
      {/* Stacked messages column */}
      <div style={{
        width: 560,
        position: 'relative',
        height: 700,
      }}>
        {/* Inbox header */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          paddingBottom: 20,
          borderBottom: `1px solid ${BORDER}`,
          marginBottom: 24,
        }}>
          <div style={{
            fontFamily: MONO, fontSize: 12, color: CREAM_MUTED,
            letterSpacing: '0.2em', textTransform: 'uppercase',
          }}>Messaggi diretti</div>
          <div style={{
            fontFamily: SERIF, fontSize: 32, color: GOLD_LIGHT,
            fontVariantNumeric: 'tabular-nums',
          }}>
            {counterVal}
            <span style={{ color: GOLD, fontSize: 14, marginLeft: 6, fontFamily: MONO }}>nuovi</span>
          </div>
        </div>

        {/* DM cards */}
        {DM_MESSAGES.map((dm, i) => {
          const appearAt = baseDelay + i * step;
          const t = clamp((localTime - appearAt) / 0.6, 0, 1);
          const op = EASE(t);
          const ty = (1 - EASE(t)) * 24;
          return (
            <div key={i} style={{
              background: BG_CARD,
              border: `1px solid ${BORDER}`,
              borderRadius: 12,
              padding: '16px 20px',
              marginBottom: 10,
              opacity: op,
              transform: `translateY(${ty}px)`,
              display: 'flex', alignItems: 'center', gap: 14,
            }}>
              <div style={{
                width: 36, height: 36, borderRadius: '50%',
                background: `oklch(45% 0.06 ${40 + i * 30})`,
                flexShrink: 0,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: SANS, fontSize: 14, color: CREAM, fontWeight: 500,
              }}>{dm.name[0]}</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{
                  fontFamily: SANS, fontSize: 14, color: CREAM, fontWeight: 500,
                  marginBottom: 3,
                }}>{dm.name}</div>
                <div style={{
                  fontFamily: SANS, fontSize: 13, color: CREAM_MUTED,
                  whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                }}>{dm.text}</div>
              </div>
              <div style={{
                fontFamily: MONO, fontSize: 10, color: GOLD,
                letterSpacing: '0.1em',
              }}>{i < 2 ? '· ORA' : i < 4 ? '· 2m' : `· ${i}m`}</div>
            </div>
          );
        })}
      </div>

      {/* Caption */}
      <div style={{
        width: 380,
        opacity: capOp,
        transform: `translateX(${(1 - capOp) * 20}px)`,
      }}>
        <div style={{
          fontFamily: MONO, fontSize: 12,
          letterSpacing: '0.24em', textTransform: 'uppercase',
          color: GOLD, marginBottom: 20,
        }}>02 — Richieste qualificate</div>
        <div style={{
          fontFamily: SERIF, fontSize: 72,
          color: CREAM, lineHeight: 1.05, fontWeight: 700,
          letterSpacing: '-0.02em',
        }}>
          Ogni<br/>
          <span style={{ color: GOLD_LIGHT, fontStyle: 'italic', fontWeight: 400 }}>giorno.</span>
        </div>
        <div style={{
          marginTop: 28,
          width: 80, height: 1, background: GOLD, opacity: 0.5,
        }} />
        <div style={{
          marginTop: 24,
          fontFamily: SANS, fontSize: 16,
          color: CREAM_MUTED, lineHeight: 1.6, maxWidth: 320,
        }}>
          Il personal brand che lavora per te — anche mentre dormi.
        </div>
      </div>
    </div>
  );
}

Object.assign(window, {
  Scene01_Title,
  Scene02_Followers,
  Scene03_DMs,
  FilmGrain, Vignette, BrandMark, StatusPill, SceneCaption, GoldRule,
  GOLD, GOLD_LIGHT, GOLD_DARK, CREAM, CREAM_MUTED, CREAM_FAINT,
  BG, BG_CARD, BORDER, BORDER_STRONG,
  SERIF, SANS, MONO, EASE, fmtEU,
});
