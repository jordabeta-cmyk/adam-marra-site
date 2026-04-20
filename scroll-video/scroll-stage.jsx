// scroll-stage.jsx — scroll-driven version of Stage.
// Reads scroll position on the root scroll container, maps to a virtual
// time 0..duration, and feeds that into TimelineContext so existing
// Sprite/scene components work unchanged.

function ScrollStage({
  width = 1920,
  height = 1080,
  duration = 45,
  background = '#0A0A0A',
  scrollContainerId = 'scroll-root',
  children,
}) {
  const [time, setTime] = React.useState(0);
  const [scale, setScale] = React.useState(1);
  const stageRef = React.useRef(null);
  const rafRef = React.useRef(null);
  const targetTimeRef = React.useRef(0);

  // Fit-to-viewport scale
  React.useEffect(() => {
    const measure = () => {
      const s = Math.min(
        window.innerWidth / width,
        window.innerHeight / height
      );
      setScale(Math.max(0.05, s));
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, [width, height]);

  // Scroll → virtual time (with rAF smoothing)
  React.useEffect(() => {
    const root = document.getElementById(scrollContainerId) || document.documentElement;

    const computeTarget = () => {
      // For window scrolling
      const total = document.documentElement.scrollHeight - window.innerHeight;
      const y = window.scrollY || document.documentElement.scrollTop;
      const p = total > 0 ? clamp(y / total, 0, 1) : 0;
      targetTimeRef.current = p * duration;
    };

    const tick = () => {
      // Smooth toward target
      setTime((t) => {
        const target = targetTimeRef.current;
        const diff = target - t;
        if (Math.abs(diff) < 0.002) return target;
        return t + diff * 0.18; // lerp factor — feels responsive but silky
      });
      rafRef.current = requestAnimationFrame(tick);
    };

    computeTarget();
    window.addEventListener('scroll', computeTarget, { passive: true });
    window.addEventListener('resize', computeTarget);
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('scroll', computeTarget);
      window.removeEventListener('resize', computeTarget);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [duration, scrollContainerId]);

  const ctxValue = React.useMemo(
    () => ({ time, duration, playing: false, setTime: () => {}, setPlaying: () => {} }),
    [time, duration]
  );

  return (
    <div
      ref={stageRef}
      style={{
        position: 'fixed',
        inset: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#000',
        overflow: 'hidden',
        zIndex: 1,
      }}
    >
      <div style={{
        width, height,
        background,
        position: 'relative',
        transform: `scale(${scale})`,
        transformOrigin: 'center',
        flexShrink: 0,
        overflow: 'hidden',
      }}>
        <TimelineContext.Provider value={ctxValue}>
          {children}
        </TimelineContext.Provider>
      </div>
    </div>
  );
}

Object.assign(window, { ScrollStage });
