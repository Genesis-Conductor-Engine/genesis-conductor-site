// Shared primitives, logo, navigator, theme toggle, tweaks panel.

const { useState, useEffect, useRef, useMemo, createContext, useContext } = React;

/* ── Tweaks context ── */
const TweaksCtx = createContext(null);
const useTweaks = () => useContext(TweaksCtx);

const TweaksProvider = ({ children }) => {
  const defaults = window.__TWEAKS__;
  const [state, setState] = useState(defaults);
  const set = (patch) => {
    const next = { ...state, ...patch };
    setState(next);
    try {
      window.parent.postMessage({ type: '__edit_mode_set_keys', edits: patch }, '*');
    } catch {}
  };
  // Apply theme to <html data-theme>
  useEffect(() => {
    document.documentElement.dataset.theme = state.theme;
  }, [state.theme]);
  return <TweaksCtx.Provider value={{ state, set }}>{children}</TweaksCtx.Provider>;
};

/* ── Logo ── */
const LogoMark = ({ size = 28, accent }) => (
  <svg width={size * 48/28} height={size} viewBox="0 0 48 48" fill="none" aria-label="Genesis Conductor mark" role="img">
    <rect x="3"  y="20" width="3" height="8"  rx="1.5" fill="currentColor" opacity="0.55"/>
    <rect x="10" y="16" width="3" height="16" rx="1.5" fill="currentColor" opacity="0.75"/>
    <rect x="17" y="10" width="3" height="28" rx="1.5" fill="currentColor"/>
    <rect x="24" y="4"  width="3" height="40" rx="1.5" fill={accent || 'var(--signal)'}/>
    <rect x="31" y="10" width="3" height="28" rx="1.5" fill="currentColor"/>
    <rect x="38" y="16" width="3" height="16" rx="1.5" fill="currentColor" opacity="0.75"/>
    <rect x="45" y="20" width="3" height="8"  rx="1.5" fill="currentColor" opacity="0.55"/>
  </svg>
);

const Wordmark = ({ beFont }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 10, color: 'var(--fg-0)' }}>
    <LogoMark size={22}/>
    <span style={{
      fontFamily: beFont ? "'BarcelonaExtropic','Playfair Display',Georgia,serif" : 'var(--font-display)',
      fontSize: beFont ? 17 : 16,
      fontWeight: beFont ? 700 : 600,
      letterSpacing: beFont ? '0.12em' : '-0.01em',
      textTransform: beFont ? 'uppercase' : 'none',
    }}>Genesis Conductor</span>
  </div>
);

/* ── Icons (subset, thin stroke) ── */
const Icon = ({ name, size = 16, stroke = 1.6 }) => {
  const p = { width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: stroke, strokeLinecap: "round", strokeLinejoin: "round" };
  const glyphs = {
    sun:  <><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/></>,
    moon: <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/>,
    play: <polygon points="5 3 19 12 5 21 5 3"/>,
    pause: <><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></>,
    plus: <><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></>,
    code: <><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></>,
    sliders: <><line x1="4" y1="21" x2="4" y2="14"/><line x1="4" y1="10" x2="4" y2="3"/><line x1="12" y1="21" x2="12" y2="12"/><line x1="12" y1="8" x2="12" y2="3"/><line x1="20" y1="21" x2="20" y2="16"/><line x1="20" y1="12" x2="20" y2="3"/><line x1="1" y1="14" x2="7" y2="14"/><line x1="9" y1="8" x2="15" y2="8"/><line x1="17" y1="16" x2="23" y2="16"/></>,
    arrow: <><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></>,
    check: <polyline points="20 6 9 17 4 12"/>,
    x: <><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></>,
    search: <><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></>,
    bell: <><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></>,
    git: <><circle cx="5" cy="12" r="2"/><circle cx="19" cy="6" r="2"/><circle cx="19" cy="18" r="2"/><path d="M7 12h10"/><path d="M17 6H9a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h8"/></>,
    shield: <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>,
    zap: <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>,
    mirror: <><line x1="12" y1="2" x2="12" y2="22"/><path d="M8 6L4 12l4 6"/><path d="M16 6l4 6-4 6"/></>,
  };
  return <svg {...p} aria-hidden="true">{glyphs[name]}</svg>;
};

/* ── StatusPill / Tag / Button (re-usable primitives) ── */
const StatusPill = ({ status, pulse }) => {
  const map = {
    running:   { bg: 'var(--signal-weak)', fg: 'var(--signal)', border: 'rgba(39,224,112,0.30)' },
    queued:    { bg: 'var(--warn-weak)',   fg: 'var(--warn)',   border: 'rgba(245,181,68,0.30)' },
    failed:    { bg: 'var(--danger-weak)', fg: 'var(--danger)', border: 'rgba(255,93,93,0.30)' },
    succeeded: { bg: 'var(--bg-2)',        fg: 'var(--fg-2)',   border: 'var(--border)' },
    retrying:  { bg: 'var(--info-weak)',   fg: 'var(--info)',   border: 'rgba(106,163,255,0.30)' },
  };
  const c = map[status] || map.succeeded;
  return (
    <span style={{ display:'inline-flex', alignItems:'center', gap:6, background:c.bg, color:c.fg, border:`1px solid ${c.border}`, borderRadius:999, padding:'2px 9px', fontFamily:'var(--font-mono)', fontSize:11, fontVariantNumeric:'tabular-nums' }}>
      <span style={{ width:6, height:6, borderRadius:99, background:c.fg, animation: pulse ? 'ck-pulse 2s ease-in-out infinite' : 'none' }}/>
      {status}
    </span>
  );
};

const Tag = ({ tone = 'neutral', children }) => {
  const tones = {
    neutral: { c: 'var(--fg-2)', b: 'var(--border)' },
    agent:   { c: 'var(--purple-500)', b: 'rgba(176,125,255,0.30)' },
    data:    { c: 'var(--teal-500)', b: 'rgba(69,214,196,0.30)' },
    signal:  { c: 'var(--signal)', b: 'rgba(39,224,112,0.30)' },
  };
  const t = tones[tone];
  return <span style={{ background:'var(--bg-2)', color:t.c, border:`1px solid ${t.b}`, borderRadius:4, padding:'1px 7px', fontFamily:'var(--font-mono)', fontSize:11 }}>{children}</span>;
};

const Button = ({ variant = 'secondary', size = 'md', icon, children, onClick, accent, ...rest }) => {
  const base = { fontFamily:'var(--font-body)', fontWeight:500, cursor:'pointer', borderRadius:4, display:'inline-flex', alignItems:'center', gap:6, transition:'all var(--dur-1) var(--ease-out)', whiteSpace:'nowrap' };
  const sizes = { sm:{padding:'4px 10px',fontSize:12}, md:{padding:'8px 14px',fontSize:13}, lg:{padding:'11px 18px',fontSize:14} };
  const variants = {
    primary:   { background: accent || 'var(--signal)', color:'var(--n-0)', border:0 },
    secondary: { background:'var(--bg-1)', color:'var(--fg-1)', border:'1px solid var(--border-strong)' },
    ghost:     { background:'transparent', color:'var(--fg-2)', border:0 },
    outline:   { background:'transparent', color:'var(--fg-0)', border:'1px solid var(--border-strong)' },
  };
  return <button onClick={onClick} style={{...base,...sizes[size],...variants[variant]}} {...rest}>{icon && <Icon name={icon} size={size==='sm'?13:15}/>}{children}</button>;
};

/* ── Top navigator ── */
const TopNav = ({ surface, setSurface, theme, setTheme, beFont }) => {
  const items = [
    { id: 'marketing', label: 'Marketing', sub: '01' },
    { id: 'dashboard', label: 'Dashboard', sub: '02' },
    { id: 'specimen',  label: 'Specimen',  sub: '03' },
  ];
  return (
    <header style={{
      position:'sticky', top:0, zIndex:20,
      background:'color-mix(in srgb, var(--bg) 78%, transparent)',
      backdropFilter:'blur(12px)', WebkitBackdropFilter:'blur(12px)',
      borderBottom:'1px solid var(--border)',
    }}>
      <div style={{ maxWidth:1360, margin:'0 auto', padding:'0 24px', height:56, display:'flex', alignItems:'center', gap:24 }}>
        <Wordmark beFont={beFont}/>
        <div style={{ width:1, height:20, background:'var(--border)' }}/>
        <nav style={{ display:'flex', gap:2 }} aria-label="Surfaces">
          {items.map(it => (
            <button key={it.id} onClick={() => setSurface(it.id)}
              aria-current={surface === it.id ? 'page' : undefined}
              style={{
                display:'inline-flex', alignItems:'baseline', gap:8,
                padding:'6px 12px', borderRadius:4,
                border:0, cursor:'pointer',
                background: surface===it.id ? 'var(--bg-2)' : 'transparent',
                color: surface===it.id ? 'var(--fg-0)' : 'var(--fg-2)',
                fontFamily:'var(--font-body)', fontSize:13, fontWeight:500,
                transition:'all var(--dur-1) var(--ease-out)',
              }}>
              <span style={{ fontFamily:'var(--font-mono)', fontSize:10, color: surface===it.id ? 'var(--signal)' : 'var(--fg-3)' }}>{it.sub}</span>
              {it.label}
            </button>
          ))}
        </nav>
        <div style={{ flex:1 }}/>
        <div style={{ display:'flex', alignItems:'center', gap:12, fontFamily:'var(--font-mono)', fontSize:11, color:'var(--fg-3)' }}>
          <span style={{ display:'inline-flex', alignItems:'center', gap:6 }}>
            <span style={{ width:6, height:6, borderRadius:99, background:'var(--signal)', animation:'ck-pulse 2s ease-in-out infinite' }}/>
            us-east-1
          </span>
          <span>·</span>
          <LiveClock/>
        </div>
        <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          aria-label="Toggle theme"
          style={{ background:'var(--bg-1)', border:'1px solid var(--border-strong)', color:'var(--fg-1)', width:32, height:32, borderRadius:4, display:'grid', placeItems:'center', cursor:'pointer' }}>
          <Icon name={theme === 'dark' ? 'sun' : 'moon'} size={15}/>
        </button>
        <Button variant="primary" size="sm" icon="arrow">Start free</Button>
      </div>
    </header>
  );
};

const LiveClock = () => {
  const [t, setT] = useState(() => new Date());
  useEffect(() => { const i = setInterval(() => setT(new Date()), 1000); return () => clearInterval(i); }, []);
  return <span style={{ fontVariantNumeric:'tabular-nums' }}>{t.toISOString().slice(11,19)}Z</span>;
};

/* ── Tweaks panel ── */
const TweaksPanel = () => {
  const { state, set } = useTweaks();
  const [open, setOpen] = useState(false);
  const [available, setAvailable] = useState(false);

  useEffect(() => {
    const onMsg = (e) => {
      const d = e.data;
      if (!d || typeof d !== 'object') return;
      if (d.type === '__activate_edit_mode') setOpen(true);
      if (d.type === '__deactivate_edit_mode') setOpen(false);
    };
    window.addEventListener('message', onMsg);
    setAvailable(true);
    try { window.parent.postMessage({ type: '__edit_mode_available' }, '*'); } catch {}
    return () => window.removeEventListener('message', onMsg);
  }, []);

  const close = () => {
    setOpen(false);
    try { window.parent.postMessage({ type: '__edit_mode_dismissed' }, '*'); } catch {}
  };

  if (!open) return null;
  return (
    <aside className="tweaks-panel" style={{
      position:'fixed', right:20, bottom:20, width:300, zIndex:50,
      background:'var(--bg-1)', border:'1px solid var(--border-strong)', borderRadius:8,
      boxShadow:'var(--shadow-pop)', padding:16, fontFamily:'var(--font-body)',
    }}>
      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:14 }}>
        <div style={{ display:'flex', alignItems:'center', gap:8 }}>
          <Icon name="sliders" size={14}/>
          <span style={{ fontFamily:'var(--font-mono)', fontSize:11, letterSpacing:'0.1em', textTransform:'uppercase', color:'var(--fg-2)' }}>Tweaks</span>
        </div>
        <button onClick={close} aria-label="Close tweaks" style={{ background:'transparent', border:0, color:'var(--fg-3)', cursor:'pointer', display:'grid', placeItems:'center' }}>
          <Icon name="x" size={14}/>
        </button>
      </div>

      <TweakRadio label="Display font" value={state.displayFont} onChange={v => set({ displayFont: v })}
        options={[{v:'hybrid',l:'Hybrid'},{v:'be',l:'B-E'},{v:'ck',l:'Inter'}]}/>
      <TweakRadio label="Accent" value={state.accent} onChange={v => set({ accent: v })}
        options={[{v:'signal',l:'Signal'},{v:'arc',l:'Arc'},{v:'ember',l:'Ember'}]}/>
      <TweakRadio label="Density" value={state.density} onChange={v => set({ density: v })}
        options={[{v:'loose',l:'Loose'},{v:'medium',l:'Med'},{v:'dense',l:'Dense'}]}/>
      <TweakToggle label="Kinetic display type" value={state.kinetic} onChange={v => set({ kinetic: v })}/>
      <TweakToggle label="Grid background" value={state.gridBg} onChange={v => set({ gridBg: v })}/>
    </aside>
  );
};

const TweakRadio = ({ label, value, onChange, options }) => (
  <div style={{ marginBottom:12 }}>
    <div style={{ fontFamily:'var(--font-mono)', fontSize:10, letterSpacing:'0.08em', textTransform:'uppercase', color:'var(--fg-3)', marginBottom:6 }}>{label}</div>
    <div style={{ display:'flex', gap:4, background:'var(--bg-inset)', border:'1px solid var(--border)', borderRadius:4, padding:2 }}>
      {options.map(o => (
        <button key={o.v} onClick={() => onChange(o.v)}
          style={{
            flex:1, border:0, padding:'6px 8px', borderRadius:3, cursor:'pointer',
            background: value===o.v ? 'var(--bg-2)' : 'transparent',
            color: value===o.v ? 'var(--fg-0)' : 'var(--fg-2)',
            fontFamily:'var(--font-body)', fontSize:12, fontWeight: value===o.v?500:400,
          }}>{o.l}</button>
      ))}
    </div>
  </div>
);

const TweakToggle = ({ label, value, onChange }) => (
  <label style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:10, cursor:'pointer' }}>
    <span style={{ fontSize:12, color:'var(--fg-1)' }}>{label}</span>
    <button type="button" onClick={() => onChange(!value)} aria-pressed={value}
      style={{ width:32, height:18, borderRadius:999, border:0, padding:2, background: value ? 'var(--signal)' : 'var(--bg-hover)', cursor:'pointer', position:'relative' }}>
      <span style={{ display:'block', width:14, height:14, borderRadius:99, background: value ? 'var(--n-0)' : 'var(--fg-2)', transform: value ? 'translateX(14px)' : 'translateX(0)', transition:'transform var(--dur-2) var(--ease-out)' }}/>
    </button>
  </label>
);

/* ── Accent mapping ── */
const accentColor = (accent) => {
  const map = {
    signal: '#27e070',
    arc:    '#b4c8f0',
    ember:  '#d4a853',
  };
  return map[accent] || map.signal;
};

/* ── Display font stack resolver ── */
const displayStack = (mode) => {
  if (mode === 'be')  return "'BarcelonaExtropic','Playfair Display',Georgia,serif";
  if (mode === 'ck')  return "'Inter Tight', ui-sans-serif, system-ui, sans-serif";
  return "'Inter Tight', ui-sans-serif, system-ui, sans-serif"; // hybrid = CK default; specific sections override with B-E
};

Object.assign(window, {
  TweaksProvider, TweaksCtx, useTweaks,
  LogoMark, Wordmark, Icon, StatusPill, Tag, Button, TopNav, TweaksPanel,
  accentColor, displayStack,
});
