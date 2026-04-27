const {
  useState,
  useEffect,
  useRef
} = React;

// ===== RIBBON CANVAS (flowing colorful ribbons top-right like Stripe) =====
window.RibbonCanvas = function RibbonCanvas() {
  const ref = useRef(null);
  const anim = useRef(null);
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let w, h;
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio, 2);
      w = canvas.offsetWidth;
      h = canvas.offsetHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.scale(dpr, dpr);
    };
    resize();
    window.addEventListener('resize', resize);
    const ribbons = [{
      color: 'rgba(83,58,253,0.6)',
      offset: 0,
      width: 180,
      speed: 0.0004,
      amp: 60
    }, {
      color: 'rgba(168,100,255,0.5)',
      offset: 40,
      width: 150,
      speed: 0.00035,
      amp: 70
    }, {
      color: 'rgba(255,100,180,0.5)',
      offset: 80,
      width: 160,
      speed: 0.0005,
      amp: 55
    }, {
      color: 'rgba(255,140,100,0.45)',
      offset: 120,
      width: 140,
      speed: 0.00045,
      amp: 65
    }, {
      color: 'rgba(255,180,50,0.35)',
      offset: 160,
      width: 130,
      speed: 0.00038,
      amp: 50
    }, {
      color: 'rgba(0,210,255,0.3)',
      offset: 200,
      width: 120,
      speed: 0.00042,
      amp: 45
    }];
    const draw = t => {
      ctx.clearRect(0, 0, w, h);
      for (const r of ribbons) {
        ctx.beginPath();
        const startX = w * 0.35 + r.offset;
        const startY = -50 - r.offset * 0.5;
        ctx.moveTo(startX, startY);
        const steps = 60;
        const pts = [];
        for (let i = 0; i <= steps; i++) {
          const p = i / steps;
          const baseX = startX + (w * 0.8 - startX) * p;
          const baseY = startY + (h * 1.1 - startY) * p;
          const wave = Math.sin(p * 4 + t * r.speed) * r.amp * (1 - p * 0.3) + Math.cos(p * 2.5 + t * r.speed * 1.3 + r.offset * 0.02) * r.amp * 0.5;
          const perpX = -Math.sin(Math.atan2(h * 1.1 - startY, w * 0.8 - startX));
          const perpY = Math.cos(Math.atan2(h * 1.1 - startY, w * 0.8 - startX));
          pts.push({
            x: baseX + perpX * wave,
            y: baseY + perpY * wave
          });
        }
        // Draw ribbon as thick curved path
        for (let i = 0; i < pts.length; i++) {
          if (i === 0) ctx.moveTo(pts[i].x, pts[i].y);else ctx.lineTo(pts[i].x, pts[i].y);
        }
        // Return path offset for width
        for (let i = pts.length - 1; i >= 0; i--) {
          const p = i / steps;
          const widthMod = r.width * (0.6 + 0.4 * Math.sin(p * Math.PI));
          const angle = Math.atan2(h * 1.1 - startY, w * 0.8 - startX) + Math.PI / 2;
          ctx.lineTo(pts[i].x + Math.cos(angle) * widthMod, pts[i].y + Math.sin(angle) * widthMod);
        }
        ctx.closePath();
        const grad = ctx.createLinearGradient(startX, startY, w * 0.8, h);
        const baseColor = r.color;
        grad.addColorStop(0, baseColor.replace(/[\d.]+\)$/, '0.7)'));
        grad.addColorStop(0.5, baseColor);
        grad.addColorStop(1, baseColor.replace(/[\d.]+\)$/, '0.2)'));
        ctx.fillStyle = grad;
        ctx.fill();
      }
      anim.current = requestAnimationFrame(draw);
    };
    anim.current = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(anim.current);
      window.removeEventListener('resize', resize);
    };
  }, []);
  return /*#__PURE__*/React.createElement("canvas", {
    ref: ref,
    style: {
      position: 'absolute',
      top: 0,
      right: 0,
      width: '65%',
      height: '100%',
      pointerEvents: 'none'
    }
  });
};

// ===== NAV =====
window.Nav = function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', fn, {
      passive: true
    });
    return () => window.removeEventListener('scroll', fn);
  }, []);
  const Arrow = () => /*#__PURE__*/React.createElement("svg", {
    width: "10",
    height: "10",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M0.5 5.5h7"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M4.5 1.5l4 4-4 4"
  }));
  const Chevron = () => /*#__PURE__*/React.createElement("svg", {
    width: "10",
    height: "10",
    viewBox: "0 0 16 16",
    fill: "none",
    style: {
      marginLeft: 2,
      opacity: .5
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M4.67 6L9.3 10.6",
    stroke: "currentColor",
    strokeWidth: "1.75"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M12.67 6L8.67 10",
    stroke: "currentColor",
    strokeWidth: "1.75"
  }));
  return /*#__PURE__*/React.createElement("nav", {
    className: `nav ${scrolled ? 'nav--scrolled' : ''}`
  }, /*#__PURE__*/React.createElement("a", {
    className: "nav__logo",
    href: "#"
  }, /*#__PURE__*/React.createElement("svg", {
    width: "60",
    height: "25",
    viewBox: "0 0 60 25",
    fill: "none"
  }, /*#__PURE__*/React.createElement("text", {
    x: "0",
    y: "19",
    fill: "var(--text-solid)",
    fontFamily: "var(--font)",
    fontSize: "20",
    fontWeight: "600",
    letterSpacing: "-0.5"
  }, "payflow"))), /*#__PURE__*/React.createElement("div", {
    className: "nav__links"
  }, /*#__PURE__*/React.createElement("a", {
    className: "nav__link"
  }, "Produkte ", /*#__PURE__*/React.createElement(Chevron, null)), /*#__PURE__*/React.createElement("a", {
    className: "nav__link"
  }, "L\xF6sungen ", /*#__PURE__*/React.createElement(Chevron, null)), /*#__PURE__*/React.createElement("a", {
    className: "nav__link"
  }, "Entwickler ", /*#__PURE__*/React.createElement(Chevron, null)), /*#__PURE__*/React.createElement("a", {
    className: "nav__link"
  }, "Ressourcen ", /*#__PURE__*/React.createElement(Chevron, null)), /*#__PURE__*/React.createElement("a", {
    className: "nav__link"
  }, "Preise"), /*#__PURE__*/React.createElement("a", {
    className: "nav__signin",
    href: "#"
  }, "Anmelden"), /*#__PURE__*/React.createElement("button", {
    className: "nav__cta"
  }, "Sales kontaktieren ", /*#__PURE__*/React.createElement(Arrow, null))));
};

// ===== HERO =====
window.Hero = function Hero() {
  const [pct, setPct] = useState(1.6435);
  useEffect(() => {
    let frame;
    const tick = () => {
      setPct(p => Math.max(1.6, Math.min(1.7, p + (Math.random() - 0.3) * 0.0001)));
      frame = setTimeout(tick, 2000 + Math.random() * 3000);
    };
    frame = setTimeout(tick, 3000);
    return () => clearTimeout(frame);
  }, []);
  const Arrow = () => /*#__PURE__*/React.createElement("svg", {
    width: "10",
    height: "10",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M0.5 5.5h7"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M4.5 1.5l4 4-4 4"
  }));
  return /*#__PURE__*/React.createElement("section", {
    className: "hero"
  }, /*#__PURE__*/React.createElement(RibbonCanvas, null), /*#__PURE__*/React.createElement("div", {
    className: "hero__content"
  }, /*#__PURE__*/React.createElement("div", {
    className: "hero__eyebrow"
  }, "Globales BIP, das \xFCber PayFlow abgewickelt wird: ", /*#__PURE__*/React.createElement("span", {
    className: "hero__eyebrow-val"
  }, pct.toFixed(7), " %")), /*#__PURE__*/React.createElement("h1", {
    className: "hero__title"
  }, /*#__PURE__*/React.createElement("em", null, "Die Finanzinfrastruktur f\xFCr mehr "), /*#__PURE__*/React.createElement("em", null, "Umsatz. "), /*#__PURE__*/React.createElement("span", {
    className: "hero__title-sub"
  }, "Akzeptieren Sie Zahlungen, bieten Sie Finanzdienstleistungen an und f\xFChren Sie individuelle Umsatzmodelle ein \u2013 vom ersten Bezahlvorgang bis zur milliardsten Transaktion.")), /*#__PURE__*/React.createElement("div", {
    className: "hero__actions"
  }, /*#__PURE__*/React.createElement("button", {
    className: "btn-primary"
  }, "Jetzt starten ", /*#__PURE__*/React.createElement(Arrow, null)), /*#__PURE__*/React.createElement("button", {
    className: "btn-secondary"
  }, /*#__PURE__*/React.createElement("svg", {
    width: "14",
    height: "14",
    viewBox: "0 0 14 14",
    fill: "none"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M12.24 5.86H7.14v2.47h2.93c-.13.7-.52 1.3-1.1 1.7l1.78.92c1.04-.78 1.64-1.93 1.64-3.3 0-.32-.03-.62-.1-.92z",
    fill: "#4285F4"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M7.14 12.5c1.53 0 2.82-.51 3.76-1.38l-1.78-.92c-.51.35-1.15.55-1.98.55-1.52 0-2.81-1.03-3.27-2.41l-1.84.95c.94 1.87 2.87 3.21 5.11 3.21z",
    fill: "#34A853"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M3.87 8.34a3.3 3.3 0 010-2.18l-1.84-.95A5.5 5.5 0 001.5 7c0 .89.21 1.73.53 2.49l1.84-.95z",
    fill: "#FBBC05"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M7.14 3.75c.86 0 1.63.3 2.24.87l1.67-1.67C9.96 1.96 8.67 1.5 7.14 1.5 4.9 1.5 2.97 2.84 2.03 4.71l1.84.95c.46-1.38 1.75-2.41 3.27-2.41z",
    fill: "#EA4335"
  })), "Bei Google anmelden"))));
};

// ===== LOGO CAROUSEL =====
window.LogoCarousel = function LogoCarousel() {
  const logos = ['OpenAI', 'Amazon', 'Nvidia', 'Shopify', 'Google', 'Coinbase', 'Uber', 'Figma', 'Anthropic', 'Vercel', 'Cursor', 'Ramp', 'Mindbody', 'MetLife', 'WooCommerce', 'Lightspeed'];
  const doubled = [...logos, ...logos];
  return /*#__PURE__*/React.createElement("div", {
    className: "logos"
  }, /*#__PURE__*/React.createElement("div", {
    className: "logos__track"
  }, doubled.map((l, i) => /*#__PURE__*/React.createElement("span", {
    className: "logos__item",
    key: i
  }, l))));
};

// ===== REVEAL WRAPPER =====
window.Reveal = function Reveal({
  children,
  delay = 0,
  style
}) {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        setVis(true);
        obs.disconnect();
      }
    }, {
      threshold: 0.12
    });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return /*#__PURE__*/React.createElement("div", {
    ref: ref,
    className: `reveal ${vis ? 'vis' : ''}`,
    style: {
      transitionDelay: `${delay}s`,
      ...style
    }
  }, children);
};