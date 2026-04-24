// Surface 02 — Product dashboard. CK leads, B-E for display-only accents.

const DashboardSurface = () => {
  const { state } = useTweaks();
  const [screen, setScreen] = useState('overview');
  const [pipelineName, setPipelineName] = useState('ingest-prod');
  const [runId, setRunId] = useState('#4,219');
  const accent = accentColor(state.accent);

  return (
    <div style={{ display:'grid', gridTemplateColumns:'220px 1fr', minHeight:'calc(100vh - 56px)', background:'var(--bg)' }}>
      <Sidebar screen={screen} setScreen={setScreen} accent={accent}/>
      <div id="main" style={{ background:'var(--bg)', minWidth:0 }}>
        {screen === 'overview' && <Overview onOpenPipeline={(n) => { setPipelineName(n); setScreen('pipeline'); }} accent={accent}/>}
        {screen === 'pipeline' && <PipelineDetail name={pipelineName} onOpenRun={(id) => { setRunId(id); setScreen('run'); }} onBack={() => setScreen('overview')} accent={accent}/>}
        {screen === 'run' && <RunDetail id={runId} onBack={() => setScreen('pipeline')} accent={accent}/>}
        {screen === 'jobs' && <Jobs accent={accent}/>}
        {screen === 'evals' && <Evals accent={accent}/>}
      </div>
    </div>
  );
};

const Sidebar = ({ screen, setScreen, accent }) => {
  const items = [
    { id:'overview', l:'Overview', i:'zap' },
    { id:'pipeline', l:'Pipelines', i:'git' },
    { id:'run',      l:'Runs',       i:'play' },
    { id:'jobs',     l:'Jobs',       i:'bell' },
    { id:'evals',    l:'Evals',      i:'check' },
  ];
  return (
    <aside style={{ borderRight:'1px solid var(--border)', background:'var(--bg-1)', padding:'16px 12px', position:'sticky', top:56, alignSelf:'start', height:'calc(100vh - 56px)' }}>
      <div style={{ fontFamily:'var(--font-mono)', fontSize:10, letterSpacing:'0.1em', textTransform:'uppercase', color:'var(--fg-3)', padding:'6px 10px', marginBottom:4 }}>Workspace · prod</div>
      {items.map(it => {
        const active = screen === it.id || (it.id === 'pipeline' && screen === 'run');
        return (
          <button key={it.id} onClick={() => setScreen(it.id)}
            style={{ display:'flex', alignItems:'center', gap:10, width:'100%', padding:'8px 10px', borderRadius:4, background: active ? 'var(--bg-2)' : 'transparent', border:0, color: active ? 'var(--fg-0)' : 'var(--fg-2)', cursor:'pointer', fontFamily:'var(--font-body)', fontSize:13, fontWeight: active?500:400 }}>
            <span style={{ color: active ? accent : 'var(--fg-3)' }}><Icon name={it.i} size={14}/></span>
            {it.l}
          </button>
        );
      })}
      <div style={{ height:24 }}/>
      <div style={{ fontFamily:'var(--font-mono)', fontSize:10, letterSpacing:'0.1em', textTransform:'uppercase', color:'var(--fg-3)', padding:'6px 10px', marginBottom:4 }}>Pinned pipelines</div>
      {['ingest-prod','eval-nightly','agent-router','embed-docs'].map(p => (
        <button key={p} onClick={() => setScreen('pipeline')}
          style={{ display:'flex', alignItems:'center', gap:8, width:'100%', padding:'6px 10px', borderRadius:4, background:'transparent', border:0, color:'var(--fg-2)', cursor:'pointer', fontFamily:'var(--font-mono)', fontSize:12 }}>
          <span style={{ width:6, height:6, borderRadius:99, background: p==='ingest-prod' ? accent : 'var(--fg-3)', animation: p==='ingest-prod' ? 'ck-pulse 2s ease-in-out infinite' : 'none' }}/>
          {p}
        </button>
      ))}
    </aside>
  );
};

const StatCard = ({ label, value, unit, delta, tone='neutral' }) => {
  const tc = tone === 'up' ? 'var(--signal)' : tone === 'down' ? 'var(--danger)' : 'var(--fg-3)';
  return (
    <div style={{ background:'var(--bg-1)', border:'1px solid var(--border)', borderRadius:6, padding:16, flex:1, minWidth:0 }}>
      <div style={{ fontFamily:'var(--font-mono)', fontSize:10, letterSpacing:'0.08em', textTransform:'uppercase', color:'var(--fg-3)' }}>{label}</div>
      <div style={{ fontFamily:"'BarcelonaExtropic','Playfair Display',serif", fontSize:34, fontWeight:700, letterSpacing:'-0.01em', color:'var(--fg-0)', fontVariantNumeric:'tabular-nums', marginTop:4, lineHeight:1 }}>
        {value}{unit && <span style={{ fontSize:15, color:'var(--fg-2)', marginLeft:4, fontFamily:'var(--font-mono)', fontWeight:400 }}>{unit}</span>}
      </div>
      {delta && <div style={{ marginTop:6, fontFamily:'var(--font-mono)', fontSize:11, color:tc }}>{delta}</div>}
    </div>
  );
};

const Overview = ({ onOpenPipeline, accent }) => (
  <div style={{ padding:24, display:'flex', flexDirection:'column', gap:20 }}>
    <div style={{ display:'flex', alignItems:'baseline', justifyContent:'space-between', flexWrap:'wrap', gap:12 }}>
      <div>
        <h1 style={{ fontFamily:"'BarcelonaExtropic','Playfair Display',serif", fontSize:36, fontWeight:700, letterSpacing:'0.005em', color:'var(--fg-0)', lineHeight:1 }}>Overview</h1>
        <div style={{ color:'var(--fg-2)', fontFamily:'var(--font-mono)', fontSize:12, marginTop:8 }}>
          cluster: us-east-1 · <span style={{ color:accent }}>● healthy</span> · 16 workers · last sync 12s ago
        </div>
      </div>
      <div style={{ display:'flex', gap:8 }}>
        <Button variant="secondary" size="sm">Range: 1h</Button>
        <Button variant="primary" size="sm" icon="plus" accent={accent}>New pipeline</Button>
      </div>
    </div>

    <div style={{ display:'flex', gap:14 }}>
      <StatCard label="Throughput" value="12,408" unit="/min" delta="↑ 8.2% vs 1h" tone="up"/>
      <StatCard label="p95 latency" value="1.2" unit="s" delta="↑ 14% vs 1h" tone="down"/>
      <StatCard label="Active pipelines" value="23" delta="— no change"/>
      <StatCard label="Cost / 1k" value="$3.10" delta="↓ 2% vs 1h" tone="up"/>
    </div>

    <div style={{ display:'grid', gridTemplateColumns:'1fr 380px', gap:16 }}>
      <div style={{ background:'var(--bg-1)', border:'1px solid var(--border)', borderRadius:6, padding:16 }}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'baseline', marginBottom:12 }}>
          <div style={{ fontFamily:'var(--font-mono)', fontSize:10, letterSpacing:'0.08em', textTransform:'uppercase', color:'var(--fg-3)' }}>Throughput · last 1h</div>
          <div style={{ fontFamily:'var(--font-mono)', fontSize:11, color:'var(--fg-2)' }}>calls / min</div>
        </div>
        <img src="assets/illustration-waveform.svg" style={{ width:'100%', display:'block' }} alt="" loading="lazy"/>
      </div>
      <div style={{ background:'var(--bg-1)', border:'1px solid var(--border)', borderRadius:6, padding:16 }}>
        <div style={{ fontFamily:'var(--font-mono)', fontSize:10, letterSpacing:'0.08em', textTransform:'uppercase', color:'var(--fg-3)', marginBottom:12 }}>Recent alerts</div>
        <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
          {[
            { sev:'failed',  title:'summarize-feed step 3 timeout', t:'1h ago' },
            { sev:'queued',  title:'eval-nightly backlog growing',   t:'22m ago' },
            { sev:'running', title:'ingest-prod p95 regression',     t:'4m ago' },
          ].map((a,i) => (
            <div key={i} style={{ display:'flex', gap:10, alignItems:'flex-start' }}>
              <StatusPill status={a.sev} pulse={a.sev==='running'}/>
              <div style={{ flex:1, minWidth:0 }}>
                <div style={{ fontSize:13, color:'var(--fg-1)' }}>{a.title}</div>
                <div style={{ fontSize:11, color:'var(--fg-3)', fontFamily:'var(--font-mono)', marginTop:2 }}>{a.t}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>

    <div>
      <div style={{ display:'flex', alignItems:'baseline', justifyContent:'space-between', marginBottom:12 }}>
        <h2 style={{ fontSize:18, color:'var(--fg-0)' }}>Active pipelines</h2>
        <Button variant="ghost" size="sm">View all →</Button>
      </div>
      <DataTable
        columns={[
          { key:'name',   label:'Pipeline', width:'2fr',   mono:true },
          { key:'status', label:'Status',   width:'1fr',   render:v => <StatusPill status={v} pulse={v==='running'}/> },
          { key:'model',  label:'Model',    width:'1.2fr', mono:true, muted:true },
          { key:'runs',   label:'Runs / h', width:'1fr',   mono:true },
          { key:'p95',    label:'p95',      width:'0.8fr', mono:true },
          { key:'cost',   label:'Cost / 1k',width:'0.8fr', mono:true },
          { key:'updated',label:'Updated',  width:'1fr',   mono:true, muted:true },
        ]}
        rows={[
          { name:'ingest-prod',    status:'running',   model:'gpt-4o',       runs:'4,219', p95:'1.2s',  cost:'$3.10', updated:'2m ago' },
          { name:'eval-nightly',   status:'queued',    model:'claude-3.7',   runs:'87',    p95:'4.8s',  cost:'$0.62', updated:'14m ago' },
          { name:'summarize-feed', status:'failed',    model:'claude-3.7',   runs:'1,208', p95:'942ms', cost:'$2.04', updated:'1h ago' },
          { name:'embed-docs',     status:'succeeded', model:'text-embed-3', runs:'284',   p95:'112ms', cost:'$0.02', updated:'3h ago' },
          { name:'agent-router',   status:'running',   model:'mixtral-8x22', runs:'914',   p95:'2.1s',  cost:'$1.88', updated:'30s ago' },
        ]}
        onRowClick={row => onOpenPipeline?.(row.name)}
      />
    </div>
  </div>
);

const DataTable = ({ columns, rows, onRowClick }) => (
  <div style={{ background:'var(--bg-1)', border:'1px solid var(--border)', borderRadius:6, overflow:'hidden' }}>
    <div style={{ display:'grid', gridTemplateColumns: columns.map(c => c.width || '1fr').join(' '), padding:'10px 16px', borderBottom:'1px solid var(--border)', fontFamily:'var(--font-mono)', fontSize:10, color:'var(--fg-3)', letterSpacing:'0.08em', textTransform:'uppercase' }}>
      {columns.map(c => <div key={c.key}>{c.label}</div>)}
    </div>
    {rows.map((row,i) => (
      <div key={i} onClick={() => onRowClick?.(row)}
        style={{ display:'grid', gridTemplateColumns: columns.map(c => c.width || '1fr').join(' '), padding:'11px 16px', borderBottom: i === rows.length - 1 ? 0 : '1px solid var(--border)', fontSize:13, cursor: onRowClick ? 'pointer' : 'default', transition:'background var(--dur-1) var(--ease-out)' }}
        onMouseEnter={e => e.currentTarget.style.background='var(--bg-hover)'}
        onMouseLeave={e => e.currentTarget.style.background='transparent'}>
        {columns.map(c => (
          <div key={c.key} style={{ fontFamily: c.mono ? 'var(--font-mono)' : 'var(--font-body)', color: c.muted ? 'var(--fg-2)' : 'var(--fg-1)', fontVariantNumeric:'tabular-nums', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>
            {c.render ? c.render(row[c.key], row) : row[c.key]}
          </div>
        ))}
      </div>
    ))}
  </div>
);

const PipelineGraph = ({ accent }) => (
  <div style={{ background:'var(--bg-1)', border:'1px solid var(--border)', borderRadius:6, padding:16, overflow:'hidden' }}>
    <svg viewBox="0 0 720 320" style={{ width:'100%', height:280 }}>
      <defs>
        <marker id="dash-a" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="#5a647a"/></marker>
        <marker id="dash-g" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill={accent}/></marker>
      </defs>
      <g stroke="var(--border-strong)" strokeWidth="1.25" fill="none">
        <path d="M 150,160 C 230,160 230,160 290,160" markerEnd="url(#dash-a)"/>
        <path d="M 410,160 C 470,160 470,80  540,80"  markerEnd="url(#dash-a)"/>
        <path d="M 410,160 C 470,160 470,240 540,240" markerEnd="url(#dash-a)"/>
      </g>
      <path d="M 410,160 C 470,160 470,160 540,160" stroke={accent} strokeWidth="1.5" fill="none" markerEnd="url(#dash-g)"/>
      {[
        { x:60,  y:140, w:90,  h:44, l:'ingest',     s:true  },
        { x:290, y:140, w:120, h:44, l:'route',      s:true  },
        { x:540, y:60,  w:140, h:44, l:'gpt-4o',     s:false },
        { x:540, y:140, w:140, h:44, l:'claude-3.7', s:true  },
        { x:540, y:220, w:140, h:44, l:'llama-3',    s:false },
      ].map((n,i) => (
        <g key={i}>
          <rect x={n.x} y={n.y} width={n.w} height={n.h} rx="6" fill="var(--bg-2)" stroke={n.s ? accent : 'var(--border)'} strokeWidth="1"/>
          <circle cx={n.x+14} cy={n.y+n.h/2} r="3" fill={n.s ? accent : 'var(--fg-3)'}/>
          <text x={n.x+26} y={n.y+n.h/2+4} fontFamily="JetBrains Mono" fontSize="12" fill="var(--fg-1)">{n.l}</text>
        </g>
      ))}
    </svg>
  </div>
);

const PipelineDetail = ({ name, onOpenRun, onBack, accent }) => (
  <div style={{ padding:24, display:'flex', flexDirection:'column', gap:20 }}>
    <div style={{ fontFamily:'var(--font-mono)', fontSize:11, color:'var(--fg-3)' }}>
      <button onClick={onBack} style={{ background:'transparent', border:0, color:'var(--fg-2)', cursor:'pointer', padding:0, fontFamily:'inherit', fontSize:'inherit' }}>← Overview</button>
    </div>
    <div style={{ display:'flex', alignItems:'baseline', justifyContent:'space-between', flexWrap:'wrap', gap:12 }}>
      <div>
        <div style={{ display:'flex', gap:10, alignItems:'center', marginBottom:8 }}>
          <h1 style={{ fontSize:30, fontFamily:'var(--font-mono)', fontWeight:500, color:'var(--fg-0)' }}>{name}</h1>
          <StatusPill status="running" pulse/>
          <Tag>v2.3.1</Tag>
          <Tag tone="agent">agent</Tag>
        </div>
        <div style={{ color:'var(--fg-2)', fontSize:13 }}>7 steps · gpt-4o · 4,219 runs in the last hour · $3.10 per 1k</div>
      </div>
      <div style={{ display:'flex', gap:8 }}>
        <Button variant="secondary" size="sm" icon="pause">Pause</Button>
        <Button variant="secondary" size="sm" icon="code">Edit YAML</Button>
        <Button variant="primary" size="sm" icon="play" accent={accent}>Trigger run</Button>
      </div>
    </div>

    <PipelineGraph accent={accent}/>

    <div>
      <div style={{ display:'flex', alignItems:'baseline', justifyContent:'space-between', marginBottom:12 }}>
        <h2 style={{ fontSize:18, color:'var(--fg-0)' }}>Recent runs</h2>
      </div>
      <DataTable
        columns={[
          { key:'id',       label:'Run',      width:'1fr',   mono:true },
          { key:'status',   label:'Status',   width:'1fr',   render:v => <StatusPill status={v} pulse={v==='running'}/> },
          { key:'started',  label:'Started',  width:'1.2fr', mono:true, muted:true },
          { key:'duration', label:'Duration', width:'1fr',   mono:true },
          { key:'steps',    label:'Steps',    width:'0.8fr', mono:true, muted:true },
          { key:'cost',     label:'Cost',     width:'0.8fr', mono:true },
        ]}
        rows={[
          { id:'#4,219', status:'running',   started:'2m ago',  duration:'842ms', steps:'4 / 7', cost:'$0.0031' },
          { id:'#4,218', status:'succeeded', started:'3m ago',  duration:'1.1s',  steps:'7 / 7', cost:'$0.0029' },
          { id:'#4,217', status:'succeeded', started:'5m ago',  duration:'928ms', steps:'7 / 7', cost:'$0.0028' },
          { id:'#4,216', status:'failed',    started:'7m ago',  duration:'5.4s',  steps:'3 / 7', cost:'$0.0012' },
          { id:'#4,215', status:'succeeded', started:'9m ago',  duration:'1.0s',  steps:'7 / 7', cost:'$0.0031' },
        ]}
        onRowClick={row => onOpenRun?.(row.id)}
      />
    </div>
  </div>
);

const RunDetail = ({ id, onBack, accent }) => (
  <div style={{ padding:24, display:'grid', gridTemplateColumns:'1fr 400px', gap:20 }}>
    <div style={{ display:'flex', flexDirection:'column', gap:20, minWidth:0 }}>
      <div style={{ fontFamily:'var(--font-mono)', fontSize:11, color:'var(--fg-3)' }}>
        <button onClick={onBack} style={{ background:'transparent', border:0, color:'var(--fg-2)', cursor:'pointer', padding:0, fontFamily:'inherit', fontSize:'inherit' }}>← ingest-prod</button>
      </div>
      <div>
        <div style={{ display:'flex', gap:10, alignItems:'center', marginBottom:8 }}>
          <h1 style={{ fontSize:28, fontFamily:'var(--font-mono)', fontWeight:500, color:'var(--fg-0)' }}>run {id}</h1>
          <StatusPill status="running" pulse/>
        </div>
        <div style={{ color:'var(--fg-2)', fontSize:13, fontFamily:'var(--font-mono)' }}>ingest-prod · started 2026-04-19 14:22:09 UTC · 842ms elapsed</div>
      </div>

      <div style={{ display:'flex', gap:14 }}>
        <StatCard label="Tokens in" value="14,802" delta="—"/>
        <StatCard label="Tokens out" value="2,194" delta="—"/>
        <StatCard label="Cost" value="$0.0031" delta="under budget" tone="up"/>
      </div>

      <div>
        <h3 style={{ fontSize:14, color:'var(--fg-0)', marginBottom:10 }}>Live logs</h3>
        <div style={{ background:'var(--bg-inset)', border:'1px solid var(--border)', borderRadius:6, padding:14, fontFamily:'var(--font-mono)', fontSize:12, lineHeight:1.7, maxHeight:320, overflow:'auto' }}>
          {[
            { t:'14:22:09.042', l:'info', m:'run #4,219 accepted, dispatching to cluster us-east-1' },
            { t:'14:22:09.051', l:'ok',   m:'step/fetch: 204 rows from s3://ingest/raw/2026-04-19/' },
            { t:'14:22:09.124', l:'info', m:'step/parse: schema version=7, strict=true' },
            { t:'14:22:09.188', l:'info', m:'step/route: classifier → summarize (conf 0.94)' },
            { t:'14:22:09.201', l:'warn', m:'step/summarize: retry 1/3 after upstream 429' },
            { t:'14:22:09.542', l:'ok',   m:'step/summarize: 204 items summarized, 12.4k tokens out' },
            { t:'14:22:09.843', l:'info', m:'step/embed: batching 204 → 4 × 51' },
          ].map((ln,i) => (
            <div key={i} style={{ display:'flex', gap:10 }}>
              <span style={{ color:'var(--fg-3)', flexShrink:0 }}>{ln.t}</span>
              <span style={{ width:42, flexShrink:0, color: ln.l==='warn' ? 'var(--warn)' : ln.l==='ok' ? accent : 'var(--fg-3)' }}>{ln.l}</span>
              <span style={{ color:'var(--fg-1)' }}>{ln.m}</span>
            </div>
          ))}
        </div>
      </div>
    </div>

    <StepTimeline accent={accent}/>
  </div>
);

const StepTimeline = ({ accent }) => {
  const steps = [
    { n:'fetch',     d:'9ms',   x:'204 rows from s3 ingest/raw', st:'done' },
    { n:'parse',     d:'73ms',  x:'schema v7',                    st:'done' },
    { n:'route',     d:'64ms',  x:'classifier conf 0.94',         st:'done' },
    { n:'summarize', d:'341ms', x:'running · retry 1/3',          st:'current' },
    { n:'embed',     d:'—',     x:'pending',                      st:'future' },
    { n:'store',     d:'—',     x:'pending',                      st:'future' },
    { n:'notify',    d:'—',     x:'pending',                      st:'future' },
  ];
  return (
    <div style={{ background:'var(--bg-1)', border:'1px solid var(--border)', borderRadius:6, padding:16, height:'fit-content' }}>
      <div style={{ fontFamily:'var(--font-mono)', fontSize:10, letterSpacing:'0.08em', textTransform:'uppercase', color:'var(--fg-3)', marginBottom:12 }}>Steps</div>
      {steps.map((s,i) => {
        const color = s.st === 'current' ? accent : s.st === 'done' ? 'var(--fg-2)' : 'var(--fg-3)';
        return (
          <div key={i} style={{ display:'flex', gap:12, padding:'8px 0', borderBottom: i === steps.length-1 ? 0 : '1px solid var(--border)' }}>
            <div style={{ width:18, display:'flex', flexDirection:'column', alignItems:'center' }}>
              <div style={{ width:8, height:8, borderRadius:99, background:color, animation: s.st==='current' ? 'ck-pulse 2s ease-in-out infinite' : 'none', marginTop:5 }}/>
              {i < steps.length-1 && <div style={{ flex:1, width:1, background:'var(--border)', marginTop:4 }}/>}
            </div>
            <div style={{ flex:1, minWidth:0 }}>
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'baseline' }}>
                <span style={{ fontFamily:'var(--font-mono)', fontSize:13, color: s.st==='future' ? 'var(--fg-3)' : 'var(--fg-0)' }}>{s.n}</span>
                <span style={{ fontFamily:'var(--font-mono)', fontSize:11, color:'var(--fg-3)' }}>{s.d}</span>
              </div>
              <div style={{ fontSize:12, color:'var(--fg-3)', marginTop:2 }}>{s.x}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

const Jobs = ({ accent }) => (
  <div style={{ padding:24, display:'flex', flexDirection:'column', gap:20 }}>
    <div style={{ display:'flex', alignItems:'baseline', justifyContent:'space-between' }}>
      <h1 style={{ fontFamily:"'BarcelonaExtropic','Playfair Display',serif", fontSize:36, fontWeight:700, color:'var(--fg-0)' }}>Jobs</h1>
      <div style={{ display:'flex', gap:8 }}>
        <Button variant="secondary" size="sm">Status: all</Button>
        <Button variant="primary" size="sm" icon="plus" accent={accent}>Enqueue</Button>
      </div>
    </div>
    <div style={{ display:'flex', gap:14 }}>
      <StatCard label="Running" value="42" delta="—"/>
      <StatCard label="Queued" value="1,204" delta="↑ 8 in last min" tone="down"/>
      <StatCard label="Succeeded / h" value="18,402" delta="↑ 4%" tone="up"/>
      <StatCard label="Failed / h" value="31" delta="↑ 2"/>
    </div>
    <DataTable
      columns={[
        { key:'id',      label:'Job',     width:'1.2fr', mono:true },
        { key:'type',    label:'Type',    width:'1fr',   render: v => <Tag tone={v==='agent'?'agent':v==='data'?'data':'neutral'}>{v}</Tag> },
        { key:'status',  label:'Status',  width:'1fr',   render: v => <StatusPill status={v} pulse={v==='running'}/> },
        { key:'queue',   label:'Queue',   width:'0.8fr', mono:true, muted:true },
        { key:'attempt', label:'Attempt', width:'0.6fr', mono:true },
        { key:'age',     label:'Age',     width:'0.8fr', mono:true, muted:true },
      ]}
      rows={[
        { id:'job_01HPXR2FK3', type:'agent', status:'running',   queue:'default', attempt:'1/3', age:'842ms' },
        { id:'job_01HPXR2FK4', type:'data',  status:'queued',    queue:'bulk',    attempt:'1/3', age:'12s' },
        { id:'job_01HPXR2FK5', type:'eval',  status:'queued',    queue:'default', attempt:'1/3', age:'14s' },
        { id:'job_01HPXR2FK6', type:'agent', status:'retrying',  queue:'default', attempt:'2/3', age:'48s' },
        { id:'job_01HPXR2FK7', type:'data',  status:'failed',    queue:'bulk',    attempt:'3/3', age:'2m' },
        { id:'job_01HPXR2FK8', type:'agent', status:'succeeded', queue:'default', attempt:'1/3', age:'2m' },
      ]}
    />
  </div>
);

const Evals = ({ accent }) => (
  <div style={{ padding:24, display:'flex', flexDirection:'column', gap:20 }}>
    <div>
      <h1 style={{ fontFamily:"'BarcelonaExtropic','Playfair Display',serif", fontSize:36, fontWeight:700, color:'var(--fg-0)' }}>Evals</h1>
      <div style={{ color:'var(--fg-2)', fontFamily:'var(--font-mono)', fontSize:12, marginTop:8 }}>CEBL gate ≥ 0.70 · last build · <span style={{ color:accent }}>PASS</span></div>
    </div>
    <div style={{ display:'flex', gap:14 }}>
      <StatCard label="Suites" value="12" delta="—"/>
      <StatCard label="Pass rate" value="97.4" unit="%" delta="↑ 0.8pp" tone="up"/>
      <StatCard label="Mean latency" value="1.8" unit="s" delta="↓ 120ms" tone="up"/>
      <StatCard label="Cost / suite" value="$2.14" delta="—"/>
    </div>
    <DataTable
      columns={[
        { key:'suite',   label:'Suite',    width:'2fr',   mono:true },
        { key:'status',  label:'Status',   width:'1fr',   render: v => <StatusPill status={v} pulse={v==='running'}/> },
        { key:'pass',    label:'Pass',     width:'0.8fr', mono:true },
        { key:'budget',  label:'Budget',   width:'0.8fr', mono:true, muted:true },
        { key:'updated', label:'Updated',  width:'1fr',   mono:true, muted:true },
      ]}
      rows={[
        { suite:'summarize.v3',    status:'succeeded', pass:'98.2%', budget:'$0.02', updated:'2m ago' },
        { suite:'agent-router.v1', status:'running',   pass:'—',     budget:'$0.04', updated:'now' },
        { suite:'classify.strict', status:'succeeded', pass:'99.1%', budget:'$0.01', updated:'18m ago' },
        { suite:'rag.hybrid',      status:'failed',    pass:'91.4%', budget:'$0.06', updated:'1h ago' },
      ]}
    />
  </div>
);

Object.assign(window, { DashboardSurface });
