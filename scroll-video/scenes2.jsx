// scenes2.jsx — scenes 04-07 for Adam Marra hero video.

// ── Scene 04 — Bar chart: Reach / Engagement / Conversion ────────────
// 19.0 → 26.0
function Scene04_BarChart() {
  const { localTime, duration } = useSprite();

  // Header slides in
  const headOp = clamp(localTime / 0.6, 0, 1);
  const headY = (1 - EASE(headOp)) * 20;

  const bars = [
    { label: 'Reach organico', target: 68,  suffix: '%', start: 0.6 },
    { label: 'Engagement rate', target: 142, suffix: '%', start: 0.9 },
    { label: 'Conversione', target: 247, suffix: '%', start: 1.2, hero: true },
  ];

  const capStart = 5.0;
  const capOp = clamp((localTime - capStart) / 0.8, 0, 1);

  const exitOp = localTime > duration - 0.5
    ? 1 - clamp((localTime - (duration - 0.5)) / 0.5, 0, 1)
    : 1;

  return (
    <div style={{
      position: 'absolute', inset: 0,
      opacity: exitOp,
      display: 'flex', flexDirection: 'column',
      justifyContent: 'center', alignItems: 'center',
      padding: '0 120px',
    }}>
      {/* Header */}
      <div style={{
        width: '100%', maxWidth: 1400,
        opacity: headOp,
        transform: `translateY(${headY}px)`,
        display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end',
        marginBottom: 56,
        paddingBottom: 24,
        borderBottom: `1px solid ${BORDER}`,
      }}>
        <div>
          <div style={{
            fontFamily: MONO, fontSize: 12,
            letterSpacing: '0.24em', textTransform: 'uppercase',
            color: GOLD, marginBottom: 16,
          }}>03 — Performance</div>
          <div style={{
            fontFamily: SERIF, fontSize: 72,
            color: CREAM, lineHeight: 1, fontWeight: 700,
            letterSpacing: '-0.02em',
          }}>
            Dati <span style={{ color: GOLD_LIGHT, fontStyle: 'italic', fontWeight: 400 }}>reali</span>.
          </div>
        </div>
        <div style={{
          fontFamily: MONO, fontSize: 12,
          color: CREAM_MUTED, letterSpacing: '0.2em', textTransform: 'uppercase',
          textAlign: 'right', lineHeight: 1.6,
        }}>
          Variazione %<br/>vs. trimestre precedente
        </div>
      </div>

      {/* Bars */}
      <div style={{
        width: '100%', maxWidth: 1400,
        display: 'flex', flexDirection: 'column', gap: 32,
      }}>
        {bars.map((b, i) => {
          const t = clamp((localTime - b.start) / 1.8, 0, 1);
          const eased = Easing.easeOutExpo(t);
          const currentVal = Math.round(b.target * eased);
          return (
            <div key={i} style={{
              display: 'flex', alignItems: 'center',
              gap: 32,
              opacity: clamp(localTime - b.start + 0.3, 0, 1),
            }}>
              <div style={{
                width: 280,
                fontFamily: MONO, fontSize: 14,
                color: b.hero ? CREAM : CREAM_MUTED,
                letterSpacing: '0.12em', textTransform: 'uppercase',
              }}>{b.label}</div>

              <div style={{
                flex: 1,
                height: b.hero ? 18 : 10,
                background: CREAM_FAINT,
                borderRadius: b.hero ? 9 : 5,
                overflow: 'hidden',
                position: 'relative',
              }}>
                <div style={{
                  width: `${(currentVal / 300) * 100}%`,
                  height: '100%',
                  background: b.hero
                    ? `linear-gradient(90deg, ${GOLD}, ${GOLD_LIGHT})`
                    : `linear-gradient(90deg, ${GOLD_DARK}, ${GOLD})`,
                  boxShadow: b.hero
                    ? `0 0 20px ${GOLD}, 0 0 40px rgba(201,168,76,0.4)`
                    : 'none',
                  borderRadius: b.hero ? 9 : 5,
                }} />
              </div>

              <div style={{
                width: 200,
                fontFamily: SERIF,
                fontSize: b.hero ? 96 : 56,
                color: b.hero ? GOLD_LIGHT : CREAM,
                fontWeight: b.hero ? 700 : 500,
                lineHeight: 1,
                letterSpacing: '-0.02em',
                fontVariantNumeric: 'tabular-nums',
                textAlign: 'right',
              }}>
                +{currentVal}<span style={{ fontSize: b.hero ? 48 : 28, color: GOLD }}>{b.suffix}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom caption */}
      <div style={{
        marginTop: 48, width: '100%', maxWidth: 1400,
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        opacity: capOp,
      }}>
        <div style={{
          fontFamily: MONO, fontSize: 12, color: CREAM_MUTED,
          letterSpacing: '0.18em', textTransform: 'uppercase',
        }}>Media portfolio · 2025</div>
        <div style={{
          fontFamily: SANS, fontSize: 15, color: CREAM_MUTED,
          letterSpacing: '0.05em',
        }}>
          Metodologia verificata · 38 clienti 1:1
        </div>
      </div>
    </div>
  );
}

// ── Scene 05 — Revenue counter ────────────────────────────────────────
// 26.0 → 33.0
function Scene05_Revenue({ target = 340000 }) {
  const { localTime, duration, progress } = useSprite();

  // Push-in
  const scale = 1 + 0.03 * EASE(progress);

  // Label fades in
  const labelOp = clamp(localTime / 0.8, 0, 1);

  // Counter ramps
  const countT = clamp((localTime - 0.8) / 4.2, 0, 1);
  const eased = Easing.easeOutExpo(countT);
  const current = target * eased;

  // Sub row
  const subStart = 5.0;
  const subOp = clamp((localTime - subStart) / 0.8, 0, 1);

  const exitOp = localTime > duration - 0.5
    ? 1 - clamp((localTime - (duration - 0.5)) / 0.5, 0, 1)
    : 1;

  return (
    <div style={{
      position: 'absolute', inset: 0,
      opacity: exitOp,
      transform: `scale(${scale})`,
      transformOrigin: 'center',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
    }}>
      <div style={{
        fontFamily: MONO, fontSize: 13,
        letterSpacing: '0.32em', textTransform: 'uppercase',
        color: GOLD, opacity: labelOp, marginBottom: 40,
      }}>04 — Fatturato generato per i clienti</div>

      <div style={{
        display: 'flex', alignItems: 'baseline', gap: 12,
        fontFamily: SERIF,
        fontSize: 280,
        fontWeight: 700,
        color: CREAM,
        letterSpacing: '-0.04em',
        lineHeight: 1,
        fontVariantNumeric: 'tabular-nums',
      }}>
        <span style={{
          fontSize: 160,
          color: GOLD,
          fontWeight: 400,
          fontStyle: 'italic',
          transform: 'translateY(-0.1em)',
        }}>€</span>
        <span>{fmtEU(current)}</span>
      </div>

      <div style={{
        marginTop: 32,
        width: 240 * eased, height: 1,
        background: `linear-gradient(90deg, transparent, ${GOLD}, transparent)`,
        opacity: 0.7,
      }} />

      <div style={{
        marginTop: 32,
        opacity: subOp,
        fontFamily: SERIF, fontStyle: 'italic',
        fontSize: 36, color: CREAM_MUTED,
        fontWeight: 400,
      }}>
        Un asset di business — non un hobby.
      </div>
    </div>
  );
}

// ── Scene 06 — Three-up metric wall ───────────────────────────────────
// 33.0 → 40.0
function Scene06_ThreeUp() {
  const { localTime, duration, progress } = useSprite();

  // Gentle parallax zoom
  const scale = 1 + 0.025 * EASE(progress);

  const metrics = [
    { label: 'Followers', target: 184000, suffix: 'K', divisor: 1000, start: 0.4 },
    { label: 'Engagement', target: 12.4, suffix: '%', decimals: 1, start: 0.7 },
    { label: 'Fatturato', target: 340, suffix: 'K€', start: 1.0 },
  ];

  const headOp = clamp(localTime / 0.5, 0, 1);

  const exitOp = localTime > duration - 0.6
    ? 1 - clamp((localTime - (duration - 0.6)) / 0.6, 0, 1)
    : 1;

  return (
    <div style={{
      position: 'absolute', inset: 0,
      opacity: exitOp,
      transform: `scale(${scale})`,
      transformOrigin: 'center',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      padding: '0 120px',
    }}>
      {/* Header */}
      <div style={{
        opacity: headOp,
        marginBottom: 80,
        textAlign: 'center',
      }}>
        <div style={{
          fontFamily: MONO, fontSize: 12,
          letterSpacing: '0.24em', textTransform: 'uppercase',
          color: GOLD, marginBottom: 24,
        }}>05 — Risultati cumulativi</div>
        <div style={{
          fontFamily: SERIF, fontSize: 56,
          color: CREAM, lineHeight: 1.15, fontWeight: 500,
          letterSpacing: '-0.02em',
        }}>
          Quando la strategia incontra<br/>
          <span style={{ color: GOLD_LIGHT, fontStyle: 'italic', fontWeight: 400 }}>l'esecuzione quotidiana.</span>
        </div>
      </div>

      {/* 3-up grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: 1,
        width: '100%', maxWidth: 1500,
        background: BORDER,
        border: `1px solid ${BORDER}`,
        borderRadius: 16,
        overflow: 'hidden',
      }}>
        {metrics.map((m, i) => {
          const t = clamp((localTime - m.start) / 2.5, 0, 1);
          const eased = Easing.easeOutExpo(t);
          let val = m.target * eased;
          let display;
          if (m.divisor) {
            display = (val / m.divisor).toFixed(0) + m.suffix;
          } else if (m.decimals) {
            display = val.toFixed(m.decimals) + m.suffix;
          } else {
            display = Math.round(val) + m.suffix;
          }
          const cardOp = clamp(localTime - m.start + 0.2, 0, 1);

          return (
            <div key={i} style={{
              background: BG,
              padding: '64px 48px',
              opacity: cardOp,
              display: 'flex', flexDirection: 'column', gap: 24,
              minHeight: 320,
              justifyContent: 'space-between',
            }}>
              <div style={{
                fontFamily: MONO, fontSize: 12,
                letterSpacing: '0.2em', textTransform: 'uppercase',
                color: CREAM_MUTED,
                display: 'flex', justifyContent: 'space-between',
              }}>
                <span>{m.label}</span>
                <span style={{ color: GOLD }}>0{i + 1}</span>
              </div>
              <div style={{
                fontFamily: SERIF,
                fontSize: 128,
                fontWeight: 700,
                color: CREAM,
                letterSpacing: '-0.03em',
                lineHeight: 1,
                fontVariantNumeric: 'tabular-nums',
              }}>
                {display}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ── Scene 07 — Logo lockup ────────────────────────────────────────────
// 40.0 → 45.0
function Scene07_Lockup() {
  const { localTime, duration, progress } = useSprite();

  // Ultra slow zoom out (1.08 → 1.0) for reveal feeling
  const scale = 1.08 - 0.08 * EASE(progress);

  // "Adam" fades first
  const adamOp = clamp(localTime / 1.0, 0, 1);
  const adamY = (1 - EASE(adamOp)) * 20;

  // "Marra" slides in after
  const marraStart = 0.8;
  const marraOp = clamp((localTime - marraStart) / 1.0, 0, 1);
  const marraX = (1 - EASE(marraOp)) * 40;

  // Rule
  const ruleStart = 2.0;
  const ruleP = clamp((localTime - ruleStart) / 1.5, 0, 1);

  // Tagline
  const tagStart = 2.6;
  const tagOp = clamp((localTime - tagStart) / 1.0, 0, 1);

  // URL
  const urlStart = 3.4;
  const urlOp = clamp((localTime - urlStart) / 0.8, 0, 1);

  return (
    <div style={{
      position: 'absolute', inset: 0,
      transform: `scale(${scale})`,
      transformOrigin: 'center',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
    }}>
      {/* Main logo */}
      <div style={{
        fontFamily: SERIF,
        fontSize: 220,
        fontWeight: 700,
        letterSpacing: '-0.03em',
        lineHeight: 1,
        display: 'flex', alignItems: 'baseline', gap: 24,
      }}>
        <span style={{
          color: CREAM,
          opacity: adamOp,
          transform: `translateY(${adamY}px)`,
          display: 'inline-block',
        }}>Adam</span>
        <span style={{
          color: GOLD,
          fontStyle: 'italic',
          fontWeight: 400,
          opacity: marraOp,
          transform: `translateX(${marraX}px)`,
          display: 'inline-block',
        }}>Marra</span>
      </div>

      {/* Rule */}
      <div style={{
        marginTop: 48,
        width: 320 * ruleP, height: 1,
        background: `linear-gradient(90deg, transparent, ${GOLD}, transparent)`,
      }} />

      {/* Tagline */}
      <div style={{
        marginTop: 48,
        opacity: tagOp,
        fontFamily: MONO,
        fontSize: 16,
        letterSpacing: '0.3em',
        textTransform: 'uppercase',
        color: CREAM_MUTED,
      }}>
        Content Marketing · Brand Strategy
      </div>

      {/* Bottom URL / status */}
      <div style={{
        position: 'absolute',
        bottom: 100,
        display: 'flex', alignItems: 'center', gap: 16,
        opacity: urlOp,
        fontFamily: MONO, fontSize: 13,
        letterSpacing: '0.2em', textTransform: 'uppercase',
        color: CREAM_MUTED,
      }}>
        <span style={{
          width: 7, height: 7, borderRadius: '50%',
          background: GOLD,
          boxShadow: `0 0 10px ${GOLD}`,
        }} />
        adamarraconsulting.it
      </div>
    </div>
  );
}

// ── Scene transition: gold light sweep ───────────────────────────────
// Used between pause points if needed. Not currently rendered.

// ── Root composition ─────────────────────────────────────────────────
function VideoRoot({ config }) {
  const { time, duration } = useTimeline();
  const ref = React.useRef(null);

  // Update data-screen-label every second for comment context
  React.useEffect(() => {
    if (ref.current) {
      const s = Math.floor(time);
      ref.current.setAttribute(
        'data-screen-label',
        `t=${String(s).padStart(2,'0')}s`
      );
    }
  });

  // Scene boundaries
  const scenes = [
    { start: 0.0,  end: 5.0,  comp: <Scene01_Title /> },
    { start: 5.0,  end: 12.0, comp: <Scene02_Followers fromN={config.fromN} toN={config.toN} /> },
    { start: 12.0, end: 19.0, comp: <Scene03_DMs /> },
    { start: 19.0, end: 26.0, comp: <Scene04_BarChart /> },
    { start: 26.0, end: 33.0, comp: <Scene05_Revenue target={config.revenue} /> },
    { start: 33.0, end: 40.0, comp: <Scene06_ThreeUp /> },
    { start: 40.0, end: 45.0, comp: <Scene07_Lockup /> },
  ];

  return (
    <div ref={ref} style={{ position: 'absolute', inset: 0, background: BG }}>
      {/* BrandMark + StatusPill suppressed in the embed:
         the host landing already renders its own fixed nav with the
         Adam Marra logo and primary nav items, so showing them inside
         the scene would duplicate and collide visually. */}

      {scenes.map((s, i) => (
        <Sprite key={i} start={s.start} end={s.end}>
          {s.comp}
        </Sprite>
      ))}

      <Vignette />
      <FilmGrain />
    </div>
  );
}

Object.assign(window, {
  Scene04_BarChart, Scene05_Revenue, Scene06_ThreeUp, Scene07_Lockup,
  VideoRoot,
});
