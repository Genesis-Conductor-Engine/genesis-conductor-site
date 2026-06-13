// Surface 01 — Marketing landing. B-E leads display, CK underneath.

const MarketingSurface = () => {
  const { state } = useTweaks();
  const beHeadline = state.displayFont !== 'ck'; // hybrid + be both use B-E for hero
  const accent = accentColor(state.accent);
  const kinetic = state.kinetic;

  const dense = state.density === 'dense' ? 0.8 : state.density === 'loose' ? 1.2 : 1;

  return (
    <main id="main" style={{ background:'var(--bg)', color:'var(--fg-1)' }}>
      <Hero beHeadline={beHeadline} accent={accent} kinetic={kinetic} dense={dense} gridBg={state.gridBg}/>
      <LogoStrip/>
      <MetricsBand accent={accent}/>
      <FeatureGrid beHeadline={beHeadline} accent={accent}/>
      <CodeSplit accent={accent}/>
      <Testimonial beHeadline={beHeadline}/>
      <PricingStrip accent={accent}/>
      <FinalCTA beHeadline={beHeadline} accent={accent} kinetic={kinetic}/>
      <MarketingFooter/>
    </main>
  );
};

const Hero = ({ beHeadline, accent, kinetic, dense, gridBg }) => (
  <section className={gridBg ? 'grid-bg' : ''} style={{ position:'relative', padding:`${96*dense}px 32px ${64*dense}px`, borderBottom:'1px solid var(--border)', overflow:'hidden' }}>
    <div aria-hidden="true" style={{ position:'absolute', top:-240, left:'50%', transform:'translateX(-50%)', width:900, height:900, pointerEvents:'none', background:`radial-gradient(circle, ${accent}22 0%, transparent 60%)` }}/>
    <div style={{ maxWidth:1100, margin:'0 auto', position:'relative' }}>
      <div style={{ display:'inline-flex', alignItems:'center', gap:8, border:'1px solid var(--border)', borderRadius:999, padding:'4px 12px', fontFamily:'var(--font-mono)', fontSize:12, color:'var(--fg-2)', marginBottom:24 }}>
        <span style={{ width:6, height:6, borderRadius:99, background:accent, animation:'ck-pulse 2s ease-in-out infinite' }}/>
        v2.3 · structured evals · replay from any step
      </div>
      <h1 style={{
        fontFamily: beHeadline ? "'BarcelonaExtropic','Playfair Display',Georgia,serif" : 'var(--font-display)',
        fontSize: beHeadline ? 88 : 76,
        fontWeight: beHeadline ? 700 : 600,
        letterSpacing: beHeadline ? '0.01em' : '-0.03em',
        textTransform: beHeadline ? 'none' : 'none',
        lineHeight: beHeadline ? 0.98 : 0.96,
        color:'var(--fg-0)', marginBottom:24, maxWidth:980, textWrap:'balance',
      }}>
        {beHeadline ? <>
          <em style={{ fontStyle:'italic', fontWeight:400, color:'var(--fg-1)' }}>Orchestrate</em> generative AI <br/>
          at <span style={{ color:'var(--fg-2)', fontWeight:700 }}>production scale</span>.
        </> : <>
          Orchestrate generative AI <br/>
          <span style={{ color:'var(--fg-2)' }}>at production scale.</span>
        </>}
      </h1>
      {kinetic && beHeadline && (
        <div aria-hidden="true" style={{ fontFamily:"'BarcelonaExtropic','Playfair Display',serif", fontSize:14, letterSpacing:'0.4em', textTransform:'uppercase', color:accent, fontWeight:700, transform:'skewX(-12deg)', display:'inline-block', marginBottom:16 }}>
          ── KINETIC · v2.3 · SEISMIC BASELINE
        </div>
      )}
      <p style={{ fontSize:20, color:'var(--fg-2)', lineHeight:1.5, maxWidth:640, marginBottom:32 }}>
        Run agent graphs, batch jobs, and data pipelines across OpenAI, Anthropic, Google, and local models — with reproducible runs, fine-grained traces, and replay from any step.
      </p>
      <div style={{ display:'flex', gap:12, marginBottom:56, flexWrap:'wrap' }}>
        <Button variant="primary" size="lg" icon="arrow" accent={accent}>Start free</Button>
        <Button variant="secondary" size="lg" icon="play">Watch demo · 2 min</Button>
      </div>

      <HeroGraph accent={accent}/>
    </div>
  </section>
);

const HeroGraph = ({ accent }) => (
  <div style={{ background:'var(--bg-1)', border:'1px solid var(--border)', borderRadius:8, padding:16, boxShadow:'var(--shadow-pop)' }}>
    <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:10, fontFamily:'var(--font-mono)', fontSize:11, color:'var(--fg-3)' }}>
      <span>● live · ingest-prod · run #4,219</span>
      <span>842ms elapsed</span>
    </div>
    <svg viewBox="0 0 960 180" style={{ width:'100%', height:160 }} aria-label="Pipeline schematic">
      <defs>
        <marker id="arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M0,0 L10,5 L0,10 z" fill="#5a647a"/>
        </marker>
        <marker id="arrg" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M0,0 L10,5 L0,10 z" fill={accent}/>
        </marker>
      </defs>
      <g stroke="var(--border-strong)" strokeWidth="1.25" fill="none">
        <path d="M 140,90 C 220,90 220,90 280,90" markerEnd="url(#arr)"/>
        <path d="M 420,90 C 480,90 480,30 560,30"  markerEnd="url(#arr)"/>
        <path d="M 420,90 C 480,90 480,150 560,150" markerEnd="url(#arr)"/>
        <path d="M 700,30  C 760,30 760,90 820,90" markerEnd="url(#arr)"/>
        <path d="M 700,150 C 760,150 760,90 820,90" markerEnd="url(#arr)"/>
      </g>
      <path d="M 420,90 C 480,90 480,90 560,90" stroke={accent} strokeWidth="1.6" fill="none" markerEnd="url(#arrg)" strokeDasharray="4 4">
        <animate attributeName="stroke-dashoffset" from="0" to="-16" dur="1.2s" repeatCount="indefinite"/>
      </path>
      {[
        { x:40,  y:70, w:100, h:40, l:'ingest',    s:true  },
        { x:280, y:70, w:140, h:40, l:'route',     s:true  },
        { x:560, y:10, w:140, h:40, l:'gpt-4o',    s:false },
        { x:560, y:70, w:140, h:40, l:'claude-3.7',s:true  },
        { x:560, y:130,w:140, h:40, l:'llama-3',   s:false },
        { x:820, y:70, w:100, h:40, l:'store',     s:false },
      ].map((n,i) => (
        <g key={i}>
          <rect x={n.x} y={n.y} width={n.w} height={n.h} rx="6" fill="var(--bg-2)" stroke={n.s ? accent : 'var(--border)'} strokeWidth="1"/>
          <circle cx={n.x + 14} cy={n.y + n.h/2} r="3" fill={n.s ? accent : 'var(--fg-3)'}/>
          <text x={n.x + 26} y={n.y + n.h/2 + 4} fontFamily="JetBrains Mono" fontSize="12" fill="var(--fg-1)">{n.l}</text>
        </g>
      ))}
    </svg>
  </div>
);

const LogoStrip = () => (
  <section style={{ padding:'32px 32px', borderBottom:'1px solid var(--border)' }}>
    <div style={{ maxWidth:1200, margin:'0 auto', display:'flex', alignItems:'center', justifyContent:'space-between', flexWrap:'wrap', gap:24 }}>
      <span style={{ fontFamily:'var(--font-mono)', fontSize:11, color:'var(--fg-3)', letterSpacing:'0.1em', textTransform:'uppercase' }}>Trusted by platform teams at</span>
      <div style={{ display:'flex', gap:40, alignItems:'center', flexWrap:'wrap' }}>
        {['NOVA','HELIOS','AXON','RIFT LABS','MERIDIAN','KOVACH','CINDER'].map(x => (
          <span key={x} style={{ fontFamily:'var(--font-display)', fontSize:15, fontWeight:600, letterSpacing:'0.18em', color:'var(--fg-2)' }}>{x}</span>
        ))}
      </div>
    </div>
  </section>
);

const MetricsBand = ({ accent }) => (
  <section style={{ padding:'56px 32px', borderBottom:'1px solid var(--border)' }}>
    <div style={{ maxWidth:1200, margin:'0 auto', display:'grid', gridTemplateColumns:'repeat(4, 1fr)', gap:24 }}>
      {[
        { n:'2.4B',    l:'Calls orchestrated / week', k:'n01' },
        { n:'99.98%',  l:'Uptime, last 90 days',       k:'n02' },
        { n:'842ms',   l:'Median p95 across the fleet',k:'n03' },
        { n:'≥70%',    l:'Thermodynamic waste reduced',k:'n04' },
      ].map((m) => (
        <div key={m.k} style={{ borderLeft:`2px solid ${accent}`, paddingLeft:16 }}>
          <div style={{ fontFamily:'var(--font-mono)', fontSize:10, color:'var(--fg-3)', letterSpacing:'0.08em', textTransform:'uppercase', marginBottom:6 }}>{m.k}</div>
          <div style={{ fontFamily:"'BarcelonaExtropic','Playfair Display',serif", fontSize:52, fontWeight:700, letterSpacing:'-0.01em', color:'var(--fg-0)', fontVariantNumeric:'tabular-nums', lineHeight:1 }}>{m.n}</div>
          <div style={{ color:'var(--fg-2)', fontSize:13, marginTop:8 }}>{m.l}</div>
        </div>
      ))}
    </div>
  </section>
);

const FeatureGrid = ({ beHeadline, accent }) => (
  <section style={{ padding:'96px 32px', borderBottom:'1px solid var(--border)' }}>
    <div style={{ maxWidth:1200, margin:'0 auto' }}>
      <div style={{ maxWidth:720, marginBottom:48 }}>
        <div style={{ fontFamily:'var(--font-mono)', fontSize:12, letterSpacing:'0.08em', textTransform:'uppercase', color:accent, marginBottom:12 }}>§ What it does</div>
        <h2 style={{ fontFamily: beHeadline ? "'BarcelonaExtropic','Playfair Display',serif" : 'var(--font-display)', fontSize:48, fontWeight: beHeadline ? 700 : 600, letterSpacing: beHeadline ? '0.005em' : '-0.02em', lineHeight:1.05, color:'var(--fg-0)', textWrap:'balance' }}>
          One control plane for every agent, job, and pipeline you run.
        </h2>
      </div>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap:1, background:'var(--border)', border:'1px solid var(--border)', borderRadius:8, overflow:'hidden' }}>
        {[
          { t:'Pipeline orchestration', d:'Define agent graphs as code or YAML. Conductor schedules, retries, and replays deterministically.', i:'git' },
          { t:'Reproducible runs',      d:'Pin model versions, capture inputs, and replay any run from any step. Byte-for-byte.', i:'shield' },
          { t:'Fine-grained traces',    d:'Every step, every token, every tool call. Search, filter, and diff runs side-by-side.', i:'search' },
          { t:'Structured evals',       d:'Offline evals on every PR. Gate deploys on pass-rate, latency, and cost budgets.', i:'check' },
          { t:'Cost controls',          d:'Per-pipeline budgets, per-tenant quotas, and automatic routing to cheaper models on fallback.', i:'zap' },
          { t:'Multi-provider',         d:'OpenAI, Anthropic, Google, Mistral, local. One SDK, one observability surface.', i:'code' },
        ].map((f,i) => (
          <div key={i} style={{ background:'var(--bg)', padding:28 }}>
            <div style={{ display:'inline-flex', width:32, height:32, borderRadius:4, background:'var(--bg-2)', border:'1px solid var(--border)', alignItems:'center', justifyContent:'center', color:accent, marginBottom:14 }}>
              <Icon name={f.i} size={16}/>
            </div>
            <h3 style={{ fontSize:18, color:'var(--fg-0)', marginBottom:8 }}>{f.t}</h3>
            <p style={{ color:'var(--fg-2)', fontSize:14, lineHeight:1.55, margin:0, textWrap:'pretty' }}>{f.d}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const CodeSplit = ({ accent }) => (
  <section style={{ padding:'96px 32px', borderBottom:'1px solid var(--border)' }}>
    <div style={{ maxWidth:1200, margin:'0 auto', display:'grid', gridTemplateColumns:'5fr 7fr', gap:64, alignItems:'center' }}>
      <div>
        <div style={{ fontFamily:'var(--font-mono)', fontSize:12, letterSpacing:'0.08em', textTransform:'uppercase', color:accent, marginBottom:12 }}>§ Pipelines as code</div>
        <h2 style={{ fontFamily:"'BarcelonaExtropic','Playfair Display',serif", fontSize:42, fontWeight:700, letterSpacing:'0.005em', lineHeight:1.05, color:'var(--fg-0)', marginBottom:16 }}>
          <em style={{ fontStyle:'italic', fontWeight:400 }}>Declare</em>, don't orchestrate.
        </h2>
        <p style={{ color:'var(--fg-2)', fontSize:16, lineHeight:1.6, marginBottom:20 }}>
          Write your pipeline as a typed graph. Conductor handles retries, fan-out, cost caps, and routing. Run locally, push to prod, and get traces back for free.
        </p>
        <a href="/docs" style={{ color:accent, fontSize:14, fontFamily:'var(--font-mono)', textDecoration:'none' }}>Read the docs →</a>
      </div>
      <pre style={{ background:'var(--bg-inset)', border:'1px solid var(--border)', borderRadius:8, padding:24, fontSize:13, lineHeight:1.7, margin:0, fontFamily:'var(--font-mono)', color:'var(--fg-1)', overflow:'auto' }}>
<span style={{color:'var(--fg-3)'}}>// pipelines/ingest.ts</span>{'\n'}
<span style={{color:'var(--info)'}}>import</span> {'{'} pipeline, step {'}'} <span style={{color:'var(--info)'}}>from</span> <span style={{color:accent}}>'@conductor/sdk'</span>;{'\n\n'}
<span style={{color:'var(--info)'}}>export default</span> pipeline(<span style={{color:accent}}>'ingest-prod'</span>, () =&gt; {'{'}{'\n'}
{'  '}<span style={{color:'var(--purple-500)'}}>const</span> raw    = step.fetch(<span style={{color:accent}}>'s3://ingest/raw/*'</span>);{'\n'}
{'  '}<span style={{color:'var(--purple-500)'}}>const</span> parsed = step.parse(raw, {'{'} schema: v7 {'}'});{'\n'}
{'  '}<span style={{color:'var(--purple-500)'}}>const</span> routed = step.route(parsed);{'\n'}
{'  '}<span style={{color:'var(--purple-500)'}}>const</span> sum    = step.llm(routed, {'{'}{'\n'}
{'    '}model: <span style={{color:accent}}>'claude-3.7-sonnet'</span>,{'\n'}
{'    '}retries: 3, budget: <span style={{color:accent}}>'$0.01/call'</span>,{'\n'}
{'  '}{'}'});{'\n'}
{'  '}step.embed(sum);{'\n'}
{'  '}step.store(sum, {'{'} dest: <span style={{color:accent}}>'postgres://…'</span> {'}'});{'\n'}
{'}'});
      </pre>
    </div>
  </section>
);

const Testimonial = ({ beHeadline }) => (
  <section style={{ padding:'96px 32px', borderBottom:'1px solid var(--border)' }}>
    <div style={{ maxWidth:900, margin:'0 auto', textAlign:'center' }}>
      <div style={{ fontFamily:"'BarcelonaExtropic','Playfair Display',serif", fontSize:80, lineHeight:1, color:'var(--fg-3)', marginBottom:-20 }}>“</div>
      <blockquote style={{ fontFamily: beHeadline ? "'BarcelonaExtropic','Playfair Display',serif" : 'var(--font-display)', fontStyle: beHeadline ? 'italic' : 'normal', fontSize:32, fontWeight: beHeadline ? 400 : 500, lineHeight:1.3, color:'var(--fg-0)', margin:0, textWrap:'balance' }}>
          Conductor replaced six in-house schedulers. We deleted 14,000 lines of retry logic, and p95 dropped 40% the same week.
      </blockquote>
      <div style={{ marginTop:32, fontFamily:'var(--font-mono)', fontSize:12, color:'var(--fg-3)', letterSpacing:'0.08em', textTransform:'uppercase' }}>
        Priya Ramesh · Head of Platform · Helios
      </div>
    </div>
  </section>
);

const PricingStrip = ({ accent }) => (
  <section style={{ padding:'96px 32px', borderBottom:'1px solid var(--border)' }}>
    <div style={{ maxWidth:1200, margin:'0 auto' }}>
      <div style={{ marginBottom:40 }}>
        <div style={{ fontFamily:'var(--font-mono)', fontSize:12, letterSpacing:'0.08em', textTransform:'uppercase', color:accent, marginBottom:12 }}>§ Pricing</div>
        <h2 style={{ fontFamily:"'BarcelonaExtropic','Playfair Display',serif", fontSize:42, fontWeight:700, letterSpacing:'0.005em', lineHeight:1.05, color:'var(--fg-0)' }}>
          Start free. Pay as your runs scale.
        </h2>
      </div>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(4, 1fr)', gap:16 }}>
        {[
          { t:'Free',       p:'$0',      s:'/ month', items:['10k runs / mo','1 workspace','Community support'] },
          { t:'Team',       p:'$299',    s:'/ month', items:['500k runs / mo','5 workspaces','Email support','Shared evals'] },
          { t:'Business',   p:'$999',    s:'/ month', items:['2M runs / mo','Unlimited workspaces','SLA · 99.9%','Audit chains'], star:true },
          { t:'Enterprise', p:'$2,500+', s:'/ month', items:['Unlimited runs','VPC deploy','Custom SLA','STARK verifier'] },
        ].map((tier, i) => (
          <div key={i} style={{ background:'var(--bg-1)', border:`1px solid ${tier.star ? accent : 'var(--border)'}`, borderRadius:8, padding:24, position:'relative' }}>
            {tier.star && <span style={{ position:'absolute', top:-10, right:16, background:accent, color:'var(--n-0)', fontFamily:'var(--font-mono)', fontSize:10, letterSpacing:'0.08em', textTransform:'uppercase', padding:'2px 8px', borderRadius:3 }}>Most chosen</span>}
            <div style={{ fontFamily:'var(--font-mono)', fontSize:11, color:'var(--fg-3)', letterSpacing:'0.08em', textTransform:'uppercase' }}>{tier.t}</div>
            <div style={{ display:'flex', alignItems:'baseline', gap:4, margin:'12px 0 20px' }}>
              <span style={{ fontFamily:"'BarcelonaExtropic','Playfair Display',serif", fontSize:40, fontWeight:700, color:'var(--fg-0)', letterSpacing:'-0.01em' }}>{tier.p}</span>
              <span style={{ fontSize:13, color:'var(--fg-3)' }}>{tier.s}</span>
            </div>
            <ul style={{ listStyle:'none', padding:0, margin:'0 0 20px', display:'flex', flexDirection:'column', gap:8 }}>
              {tier.items.map(x => (
                <li key={x} style={{ display:'flex', gap:8, alignItems:'center', fontSize:13, color:'var(--fg-1)' }}>
                  <Icon name="check" size={13}/>{x}
                </li>
              ))}
            </ul>
            <Button variant={tier.star ? 'primary' : 'outline'} size="md" accent={accent}>
              {tier.t === 'Enterprise' ? 'Book a call' : 'Choose'}
            </Button>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const FinalCTA = ({ beHeadline, accent, kinetic }) => (
  <section style={{ padding:'120px 32px', borderBottom:'1px solid var(--border)', position:'relative', overflow:'hidden' }}>
    <div aria-hidden="true" style={{ position:'absolute', inset:0, background:`radial-gradient(ellipse at 50% 80%, ${accent}14 0%, transparent 60%)` }}/>
    <div style={{ maxWidth:1000, margin:'0 auto', position:'relative', textAlign:'center' }}>
      <h2 style={{
        fontFamily: beHeadline ? "'BarcelonaExtropic','Playfair Display',serif" : 'var(--font-display)',
        fontSize:72, fontWeight: beHeadline ? 700 : 600, letterSpacing:'0.005em', lineHeight:1, color:'var(--fg-0)', marginBottom:16, textWrap:'balance',
        transform: kinetic ? 'skewX(-6deg)' : 'none',
      }}>
        Ship pipelines that survive <em style={{fontStyle:'italic', fontWeight:400, color:'var(--fg-2)'}}>prod.</em>
      </h2>
      <p style={{ fontSize:18, color:'var(--fg-2)', marginBottom:32, maxWidth:600, margin:'0 auto 32px' }}>
        Free forever for the first 10k runs / mo. Bring your own models. Replay from day one.
      </p>
      <div style={{ display:'inline-flex', gap:12 }}>
        <Button variant="primary" size="lg" icon="arrow" accent={accent}>Start free</Button>
        <Button variant="outline" size="lg" icon="code">Read the docs</Button>
      </div>
    </div>
  </section>
);

const MarketingFooter = () => (
  <footer style={{ padding:'56px 32px 32px' }}>
    <div style={{ maxWidth:1200, margin:'0 auto' }}>
      <div style={{ display:'grid', gridTemplateColumns:'2fr 1fr 1fr 1fr 1fr', gap:32, paddingBottom:40, borderBottom:'1px solid var(--border)' }}>
        <div>
          <Wordmark/>
          <p style={{ color:'var(--fg-3)', fontSize:13, marginTop:14, maxWidth:280, lineHeight:1.55 }}>Enterprise orchestration for generative AI. Built by and for platform teams. © 2026 Kovach Enterprises.</p>
        </div>
        {[
          { h:'Product',    items:['Platform','Pipelines','Evals','Pricing','Changelog'] },
          { h:'Developers', items:['Docs','API reference','SDKs','Status','Open source'] },
          { h:'Company',    items:['About','Customers','Careers','Contact','Security'] },
          { h:'Legal',      items:['Terms','Privacy','DPA','SOC 2','Subprocessors'] },
        ].map((c,i) => (
          <div key={i}>
            <div style={{ fontFamily:'var(--font-mono)', fontSize:11, letterSpacing:'0.08em', textTransform:'uppercase', color:'var(--fg-3)', marginBottom:12 }}>{c.h}</div>
            {c.items.map(x => <a key={x} href="#" style={{ display:'block', color:'var(--fg-2)', fontSize:13, textDecoration:'none', marginBottom:6 }}>{x}</a>)}
          </div>
        ))}
      </div>
      <div style={{ paddingTop:20, display:'flex', justifyContent:'space-between', fontFamily:'var(--font-mono)', fontSize:11, color:'var(--fg-3)' }}>
        <span>● all systems normal · status.genesisconductor.io</span>
        <span>llms.txt · robots.txt · sitemap.xml</span>
      </div>
    </div>
  </footer>
);

Object.assign(window, { MarketingSurface });
