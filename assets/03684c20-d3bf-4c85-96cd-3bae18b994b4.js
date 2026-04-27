const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "primaryColor": "#533afd",
  "accentColor": "#00D4FF"
} /*EDITMODE-END*/;
function App() {
  const [tweaks, setTweak] = useTweaks(TWEAK_DEFAULTS);
  React.useEffect(() => {
    document.documentElement.style.setProperty('--brand-600', tweaks.primaryColor);
    document.documentElement.style.setProperty('--brand-400', tweaks.accentColor);
  }, [tweaks.primaryColor, tweaks.accentColor]);
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Nav, null), /*#__PURE__*/React.createElement(Hero, null), /*#__PURE__*/React.createElement(LogoCarousel, null), /*#__PURE__*/React.createElement(BentoSection, null), /*#__PURE__*/React.createElement(StatsSection, null), /*#__PURE__*/React.createElement(EnterpriseSection, null), /*#__PURE__*/React.createElement(DevSection, null), /*#__PURE__*/React.createElement(NewsSection, null), /*#__PURE__*/React.createElement(CTASection, null), /*#__PURE__*/React.createElement(FooterSection, null), /*#__PURE__*/React.createElement(TweaksPanel, {
    title: "Tweaks"
  }, /*#__PURE__*/React.createElement(TweakSection, {
    title: "Brand"
  }, /*#__PURE__*/React.createElement(TweakColor, {
    label: "Prim\xE4rfarbe",
    value: tweaks.primaryColor,
    onChange: v => setTweak('primaryColor', v)
  }), /*#__PURE__*/React.createElement(TweakColor, {
    label: "Akzentfarbe",
    value: tweaks.accentColor,
    onChange: v => setTweak('accentColor', v)
  }))));
}
ReactDOM.createRoot(document.getElementById('root')).render(/*#__PURE__*/React.createElement(App, null));