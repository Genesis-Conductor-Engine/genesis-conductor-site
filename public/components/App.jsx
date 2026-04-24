// App root: wires tweaks, surfaces, and renders.

const App = () => {
  const { state, set } = useTweaks();
  const surface = state.surface;
  const setSurface = (s) => set({ surface: s });
  const beInWordmark = state.displayFont === 'be';
  return (
    <>
      <TopNav
        surface={surface}
        setSurface={setSurface}
        theme={state.theme}
        setTheme={t => set({ theme: t })}
        beFont={beInWordmark}
      />
      {surface === 'marketing' && <MarketingSurface/>}
      {surface === 'dashboard' && <DashboardSurface/>}
      {surface === 'specimen'  && <SpecimenSurface/>}
      <TweaksPanel/>
    </>
  );
};

const Root = () => (
  <TweaksProvider>
    <App/>
  </TweaksProvider>
);

const rootEl = document.getElementById('app');
rootEl.innerHTML = '';
ReactDOM.createRoot(rootEl).render(<Root/>);
