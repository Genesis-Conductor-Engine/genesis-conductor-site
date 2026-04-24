// Surface 03 — Type specimen / field manual. Barcelona-Extropic maximalist.

const SpecimenSurface = () => {
  const { state } = useTweaks();
  const accent = accentColor(state.accent);
  return (
    <main id="main" style={{ background:'var(--bg)', color:'var(--fg-1)' }}>
      <SpecHero accent={accent}/>
      <SpecMarquee accent={accent} kinetic={state.kinetic}/>
      <SpecAxes accent={accent}/>
      <SpecChirality accent={accent}/>
      <SpecContrast accent={accent}/>
      <SpecCompare accent={accent}/>
      <SpecColophon accent={accent}/>
    </main>
  );
};

const BE = "'BarcelonaExtropic','Playfair Display',Georgia,serif";

const SpecHero = ({ accent }) => (
  <section style={{ padding:'64px 32px 40px', borderBottom:'1px solid var(--border)', position:'relative' }}>
    <div style={{ maxWidth:1360, margin:'0 auto' }}>
      <div style={{ display:'grid', gridTemplateColumns:'auto 1fr auto', gap:24, alignItems:'baseline', fontFamily:'var(--font-mono)', fontSize:11, color:'var(--fg-3)', letterSpacing:'0.08em', textTransform:'uppercase', paddingBottom:16, borderBottom:'1px solid var(--border)', marginBottom:48 }}>
        <span>§ 03 · Type specimen</span>
        <span style={{ color:'var(--fg-2)', justifySelf:'center' }}>Barcelona-Extropic · Didone-class · Seismic Baseline v1.0</span>
        <span>SHA: 3f8b…a219</span>
      </div>
      <div style={{ fontFamily:BE, fontSize:'clamp(100px, 18vw, 260px)', fontWeight:700, letterSpacing:'-0.01em', lineHeight:0.88, color:'var(--fg-0)' }}>
        Barcelona
      </div>
      <div style={{ fontFamily:BE, fontSize:'clamp(100px, 18vw, 260px)', fontStyle:'italic', fontWeight:400, letterSpacing:'-0.005em', lineHeight:0.88, color:accent, marginTop:-8 }}>
        Extropic.
      </div>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(4, 1fr)', gap:24, marginTop:48, paddingTop:24, borderTop:'1px solid var(--border)' }}>
        {[
          { k:'stem',      v:'12px' },
          { k:'contrast',  v:'12 : 1' },
          { k:'tracking',  v:'0.25em' },
          { k:'weights',   v:'100–900' },
        ].map(m => (
          <div key={m.k}>
            <div style={{ fontFamily:'var(--font-mono)', fontSize:10, color:'var(--fg-3)', letterSpacing:'0.08em', textTransform:'uppercase' }}>{m.k}</div>
            <div style={{ fontFamily:BE, fontSize:36, fontWeight:700, color:'var(--fg-0)', marginTop:4, lineHeight:1 }}>{m.v}</div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const SpecMarquee = ({ accent, kinetic }) => {
  const phrase = 'Didone · Seismic · Chiral · Kinetic · Ambigraph · ';
  const strip = Array(8).fill(phrase).join('');
  return (
    <section style={{ borderBottom:'1px solid var(--border)', overflow:'hidden', padding:'32px 0', background:'var(--bg-1)' }}>
      <div style={{ whiteSpace:'nowrap', animation:'marquee 40s linear infinite', width:'fit-content', display:'flex' }}>
        <span style={{ fontFamily:BE, fontSize:64, fontWeight:700, letterSpacing:'0.12em', textTransform:'uppercase', color:'var(--fg-0)', transform: kinetic ? 'skewX(-12deg)' : 'none', display:'inline-block' }}>{strip}</span>
        <span aria-hidden="true" style={{ fontFamily:BE, fontSize:64, fontWeight:700, letterSpacing:'0.12em', textTransform:'uppercase', color:accent, transform: kinetic ? 'skewX(-12deg)' : 'none', display:'inline-block' }}>{strip}</span>
      </div>
    </section>
  );
};

const SpecAxes = ({ accent }) => (
  <section style={{ padding:'80px 32px', borderBottom:'1px solid var(--border)' }}>
    <div style={{ maxWidth:1360, margin:'0 auto' }}>
      <SpecLabel title="§ Axes" caption="Weight · Italic · Tracking"/>
      <div style={{ display:'grid', gridTemplateColumns:'1fr', gap:32 }}>
        {[
          { w:300, label:'LIGHT · 300',  tr:'0.25em' },
          { w:400, label:'REGULAR · 400', tr:'0.15em' },
          { w:700, label:'MEDIUM · 700',  tr:'0.10em' },
          { w:900, label:'HEAVY · 900',   tr:'0.04em' },
        ].map((a,i) => (
          <div key={i} style={{ display:'grid', gridTemplateColumns:'180px 1fr', gap:32, alignItems:'baseline', paddingBottom:24, borderBottom:'1px solid var(--border)' }}>
            <div style={{ fontFamily:'var(--font-mono)', fontSize:11, color:'var(--fg-3)', letterSpacing:'0.08em' }}>{a.label}<br/><span style={{ color:'var(--fg-2)' }}>tracking {a.tr}</span></div>
            <div style={{ fontFamily:BE, fontWeight:a.w, fontSize:92, letterSpacing:a.tr, color:'var(--fg-0)', lineHeight:1, textTransform:'uppercase' }}>
              Orchestrate
            </div>
          </div>
        ))}
        <div style={{ display:'grid', gridTemplateColumns:'180px 1fr', gap:32, alignItems:'baseline' }}>
          <div style={{ fontFamily:'var(--font-mono)', fontSize:11, color:'var(--fg-3)', letterSpacing:'0.08em' }}>ITALIC · 400<br/><span style={{ color:accent }}>optical</span></div>
          <div style={{ fontFamily:BE, fontWeight:400, fontStyle:'italic', fontSize:92, letterSpacing:'0.01em', color:accent, lineHeight:1 }}>
            Conductor.
          </div>
        </div>
      </div>
    </div>
  </section>
);

const SpecChirality = ({ accent }) => (
  <section style={{ padding:'80px 32px', borderBottom:'1px solid var(--border)', background:'var(--bg-1)' }}>
    <div style={{ maxWidth:1360, margin:'0 auto' }}>
      <SpecLabel title="§ Chirality" caption="GPU-optimized sign-flip. Zero texture re-upload."/>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(4, 1fr)', gap:16 }}>
        {[
          { l:'CANONICAL', t:'none' },
          { l:'HORIZONTAL · −1,0', t:'scaleX(-1)' },
          { l:'VERTICAL · 1,−1',   t:'scaleY(-1)' },
          { l:'ROTATION · 180°',   t:'rotate(180deg)' },
        ].map((c,i) => (
          <div key={i} style={{ background:'var(--bg)', border:'1px solid var(--border)', borderRadius:8, padding:32, textAlign:'center' }}>
            <div style={{ fontFamily:BE, fontWeight:700, fontSize:120, color: i===0 ? 'var(--fg-0)' : accent, lineHeight:1, display:'inline-block', transform:c.t }}>
              A
            </div>
            <div style={{ fontFamily:'var(--font-mono)', fontSize:10, color:'var(--fg-3)', letterSpacing:'0.08em', marginTop:16, textTransform:'uppercase' }}>{c.l}</div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const SpecContrast = ({ accent }) => (
  <section style={{ padding:'80px 32px', borderBottom:'1px solid var(--border)' }}>
    <div style={{ maxWidth:1360, margin:'0 auto' }}>
      <SpecLabel title="§ Stem : Serif" caption="Mathematically verified 12:1 contrast."/>
      <div style={{ display:'grid', gridTemplateColumns:'1.2fr 1fr', gap:48, alignItems:'center' }}>
        <svg viewBox="0 0 400 300" style={{ width:'100%', background:'var(--bg-1)', border:'1px solid var(--border)', borderRadius:8 }} aria-hidden="true">
          <g stroke="var(--fg-3)" strokeWidth="0.5" strokeDasharray="2 4" fill="none">
            <line x1="80" y1="40" x2="80" y2="260"/>
            <line x1="320" y1="40" x2="320" y2="260"/>
            <line x1="60" y1="40" x2="340" y2="40"/>
            <line x1="60" y1="260" x2="340" y2="260"/>
          </g>
          <path d="M90,260 L200,40 L310,260" stroke="var(--fg-0)" strokeWidth="24" fill="none" strokeLinejoin="miter"/>
          <path d="M130,180 L270,180" stroke="var(--fg-0)" strokeWidth="2" fill="none"/>
          <path d="M70,40 L330,40" stroke="var(--fg-0)" strokeWidth="2" fill="none"/>
          <g fontFamily="JetBrains Mono" fontSize="10" fill={accent}>
            <text x="214" y="155">stem 12px</text>
            <text x="214" y="35">serif 1px</text>
          </g>
          <g stroke={accent} strokeWidth="0.8" fill="none">
            <path d="M200 90 L 245 130"/>
            <path d="M250 30 L 270 50"/>
          </g>
        </svg>
        <div>
          <p style={{ fontFamily:BE, fontSize:28, lineHeight:1.35, color:'var(--fg-0)', fontWeight:400, letterSpacing:'0.005em', fontStyle:'italic', marginBottom:16, textWrap:'balance' }}>
            "The stem bears weight; the serif bears witness."
          </p>
          <p style={{ fontFamily:'var(--font-body)', color:'var(--fg-2)', fontSize:14, lineHeight:1.65, marginBottom:12 }}>
            Barcelona-Extropic enforces a strict 12:1 stem-to-serif ratio, locking the typeface into Didone territory without the brittleness of Bodoni or Didot at body sizes.
          </p>
          <p style={{ fontFamily:'var(--font-mono)', fontSize:12, color:'var(--fg-3)', lineHeight:1.65 }}>
            CONTRAST_RATIO: f32 = 12.0<br/>
            STEM_WIDTH:     f32 = 12.0<br/>
            GRID_SNAP:      f32 = 4.0
          </p>
        </div>
      </div>
    </div>
  </section>
);

const SpecCompare = ({ accent }) => (
  <section style={{ padding:'80px 32px', borderBottom:'1px solid var(--border)', background:'var(--bg-1)' }}>
    <div style={{ maxWidth:1360, margin:'0 auto' }}>
      <SpecLabel title="§ In context" caption="Specimen set against ConductorKit body type."/>
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:1, background:'var(--border)', border:'1px solid var(--border)', borderRadius:8, overflow:'hidden' }}>
        <div style={{ background:'var(--bg)', padding:40 }}>
          <div style={{ fontFamily:'var(--font-mono)', fontSize:10, color:'var(--fg-3)', letterSpacing:'0.08em', textTransform:'uppercase', marginBottom:16 }}>B-E · display</div>
          <h3 style={{ fontFamily:BE, fontSize:48, fontWeight:700, lineHeight:1.05, color:'var(--fg-0)', marginBottom:16, letterSpacing:'0.005em' }}>
            Ship pipelines that <em style={{fontStyle:'italic', fontWeight:400, color:accent}}>survive</em> production.
          </h3>
          <p style={{ fontFamily:'var(--font-body)', fontSize:15, color:'var(--fg-2)', lineHeight:1.6 }}>
            Use Barcelona-Extropic for titles, metrics, hero statements, and anywhere the brand needs to feel decisive. The Didone contrast carries weight at large sizes and vanishes gracefully at body sizes where Inter should run.
          </p>
        </div>
        <div style={{ background:'var(--bg)', padding:40 }}>
          <div style={{ fontFamily:'var(--font-mono)', fontSize:10, color:'var(--fg-3)', letterSpacing:'0.08em', textTransform:'uppercase', marginBottom:16 }}>CK · Inter Tight</div>
          <h3 style={{ fontFamily:'var(--font-display)', fontSize:48, fontWeight:600, lineHeight:1.05, letterSpacing:'-0.02em', color:'var(--fg-0)', marginBottom:16 }}>
            Ship pipelines that survive production.
          </h3>
          <p style={{ fontFamily:'var(--font-body)', fontSize:15, color:'var(--fg-2)', lineHeight:1.6 }}>
            Inter Tight carries the product UI. It's the workhorse for dashboards, tables, run IDs, and data-dense views. B-E and CK coexist: B-E for display, CK for operator surfaces.
          </p>
        </div>
      </div>
    </div>
  </section>
);

const SpecColophon = ({ accent }) => (
  <section style={{ padding:'80px 32px' }}>
    <div style={{ maxWidth:1360, margin:'0 auto' }}>
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:48 }}>
        <div>
          <div style={{ fontFamily:'var(--font-mono)', fontSize:10, color:'var(--fg-3)', letterSpacing:'0.08em', textTransform:'uppercase', marginBottom:10 }}>Colophon</div>
          <p style={{ fontFamily:BE, fontSize:22, lineHeight:1.4, color:'var(--fg-0)', fontStyle:'italic', marginBottom:10 }}>Engineered in Rust, delivered at the edge.</p>
          <p style={{ fontFamily:'var(--font-body)', fontSize:13, color:'var(--fg-2)', lineHeight:1.7 }}>
            Barcelona-Extropic renders via a 791-line Rust WASM engine with SHA-256 proof-of-render hashing. Served from Cloudflare Workers + R2 with immutable caching. 34-test invariant coverage.
          </p>
        </div>
        <div>
          <div style={{ fontFamily:'var(--font-mono)', fontSize:10, color:'var(--fg-3)', letterSpacing:'0.08em', textTransform:'uppercase', marginBottom:10 }}>Fallback tier</div>
          <ol style={{ fontFamily:'var(--font-mono)', fontSize:12, color:'var(--fg-1)', lineHeight:1.8, paddingLeft:20, margin:0 }}>
            <li>BarcelonaExtropic WOFF2 <span style={{color:'var(--fg-3)'}}>(self-hosted)</span></li>
            <li>Playfair Display <span style={{color:'var(--fg-3)'}}>(Google CDN)</span></li>
            <li>Cormorant Garamond <span style={{color:'var(--fg-3)'}}>(Google CDN)</span></li>
            <li>Georgia <span style={{color:'var(--fg-3)'}}>(system)</span></li>
            <li>serif <span style={{color:'var(--fg-3)'}}>(default)</span></li>
          </ol>
        </div>
        <div>
          <div style={{ fontFamily:'var(--font-mono)', fontSize:10, color:'var(--fg-3)', letterSpacing:'0.08em', textTransform:'uppercase', marginBottom:10 }}>Integration</div>
          <pre style={{ fontFamily:'var(--font-mono)', fontSize:11, color:'var(--fg-1)', background:'var(--bg-inset)', border:'1px solid var(--border)', borderRadius:6, padding:12, margin:0, lineHeight:1.65, overflow:'auto' }}>
{`<link rel="stylesheet"
  href="/fonts/be/
    barcelona-extropic.css">

<h1 class="be-display">
  Genesis Conductor
</h1>`}
          </pre>
        </div>
      </div>
    </div>
  </section>
);

const SpecLabel = ({ title, caption }) => (
  <div style={{ display:'flex', alignItems:'baseline', justifyContent:'space-between', paddingBottom:16, borderBottom:'1px solid var(--border)', marginBottom:40 }}>
    <div style={{ fontFamily:'var(--font-mono)', fontSize:12, color:'var(--fg-2)', letterSpacing:'0.08em', textTransform:'uppercase' }}>{title}</div>
    <div style={{ fontFamily:BE, fontSize:16, fontStyle:'italic', color:'var(--fg-3)' }}>{caption}</div>
  </div>
);

Object.assign(window, { SpecimenSurface });
