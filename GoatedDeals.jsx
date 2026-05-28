import { useState, useEffect } from "react";

const ADMIN = { user: "HAREESHTECH", pass: "0987654321" };

const DEAL_TAGS = [
  "🔥 Top Deal", "⚡ Flash Deal", "💎 Best Value", "🎵 Editor's Pick",
  "🖥️ Hot Pick", "🆕 Just In", "💰 Budget Pick", "👑 Premium Deal",
];

const DEMO_PRODUCTS = [
  {
    id: "d1", title: "boAt Airdopes 141 Truly Wireless Earbuds 42H Playtime",
    price: "₹1,299", originalPrice: "₹4,990", discount: "74% off",
    mainImage: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=600&q=80",
    additionalImages: [
      "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=600&q=80",
      "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=600&q=80",
    ],
    description: "42H total playtime with IPX4 water resistance, ENx™ technology for HD calls, and BEAST™ mode for gaming.",
    store: "amazon", storeUrl: "https://www.amazon.in",
    rating: 4.2, reviews: 12843, dealTag: "🔥 Top Deal", isNew: false, addedAt: Date.now() - 172800000,
  },
  {
    id: "d2", title: "5G Smartphone 6GB RAM 128GB Storage 5000mAh Battery",
    price: "₹9,999", originalPrice: "₹15,999", discount: "37% off",
    mainImage: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&q=80",
    additionalImages: [
      "https://images.unsplash.com/photo-1565849904461-04a58ad377e0?w=600&q=80",
      "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=600&q=80",
    ],
    description: "5G ready with 50MP AI triple camera, 5000mAh battery, and 33W fast charging — flagship features at budget price.",
    store: "flipkart", storeUrl: "https://www.flipkart.com",
    rating: 4.1, reviews: 15234, dealTag: "⚡ Flash Deal", isNew: true, addedAt: Date.now() - 3600000,
  },
  {
    id: "d3", title: "Smart Watch Health Monitor SpO2 Heart Rate GPS",
    price: "₹1,799", originalPrice: "₹5,499", discount: "67% off",
    mainImage: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&q=80",
    additionalImages: [
      "https://images.unsplash.com/photo-1434493651957-4ec10a8a1be8?w=600&q=80",
      "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=600&q=80",
    ],
    description: "100+ sport modes, blood oxygen & stress monitoring, 7-day battery life, and always-on display.",
    store: "amazon", storeUrl: "https://www.amazon.in",
    rating: 4.0, reviews: 6721, dealTag: "💎 Best Value", isNew: false, addedAt: Date.now() - 259200000,
  },
  {
    id: "d4", title: "Portable Bluetooth Speaker 360° Sound IPX5 Waterproof",
    price: "₹899", originalPrice: "₹2,999", discount: "70% off",
    mainImage: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=600&q=80",
    additionalImages: [
      "https://images.unsplash.com/photo-1545454675-3531b543be5d?w=600&q=80",
      "https://images.unsplash.com/photo-1524678606370-a47ad25cb82a?w=600&q=80",
    ],
    description: "12H playtime with IPX5 waterproof rating, 360° surround sound, and TWS stereo pairing support.",
    store: "amazon", storeUrl: "https://www.amazon.in",
    rating: 4.4, reviews: 3190, dealTag: "🎵 Editor's Pick", isNew: false, addedAt: Date.now() - 345600000,
  },
  {
    id: "d5", title: "Ultra-slim Laptop 15.6\" Intel i5 16GB RAM 512GB SSD",
    price: "₹34,990", originalPrice: "₹55,000", discount: "36% off",
    mainImage: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600&q=80",
    additionalImages: [
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&q=80",
      "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=600&q=80",
    ],
    description: "Full HD IPS display, 8-hour battery, backlit keyboard, and Windows 11 — work and entertainment powerhouse.",
    store: "flipkart", storeUrl: "https://www.flipkart.com",
    rating: 4.2, reviews: 2445, dealTag: "🖥️ Hot Pick", isNew: false, addedAt: Date.now() - 432000000,
  },
  {
    id: "d6", title: "65W GaN Fast Charger USB-C Multi-port PD Charger",
    price: "₹549", originalPrice: "₹1,999", discount: "72% off",
    mainImage: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=600&q=80",
    additionalImages: [
      "https://images.unsplash.com/photo-1601524909162-ae8725290836?w=600&q=80",
    ],
    description: "65W Power Delivery with 3-port simultaneous charging — compatible with laptops, phones, and tablets.",
    store: "amazon", storeUrl: "https://www.amazon.in",
    rating: 4.3, reviews: 5821, dealTag: "⚡ Flash Deal", isNew: true, addedAt: Date.now() - 7200000,
  },
];

const EMPTY_FORM = {
  title: "", storeUrl: "", store: "amazon",
  price: "", originalPrice: "", discount: "",
  mainImage: "", additionalImages: ["", "", ""],
  description: "", rating: "4.2", reviews: "1000",
  dealTag: "🔥 Top Deal",
};

const Stars = ({ rating }) => {
  const full = Math.round(rating);
  return (
    <span style={{ color: "#F5A623", fontSize: "12px", letterSpacing: "1px" }}>
      {"★".repeat(Math.max(0, full))}{"☆".repeat(Math.max(0, 5 - full))}
    </span>
  );
};

const ProductCard = ({ product, onClick }) => {
  const [imgErr, setImgErr] = useState(false);
  const [hovered, setHovered] = useState(false);
  const fallback = "https://placehold.co/400x400/13131E/F54F1E?text=Product";
  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "#13131E",
        border: `1px solid ${hovered ? "#F54F1E" : "#1E1E2E"}`,
        borderRadius: "16px", overflow: "hidden", cursor: "pointer",
        transform: hovered ? "translateY(-5px)" : "translateY(0)",
        boxShadow: hovered ? "0 18px 50px rgba(245,79,30,0.18)" : "none",
        transition: "all 0.28s cubic-bezier(0.4,0,0.2,1)",
      }}
    >
      <div style={{ position: "relative", overflow: "hidden", aspectRatio: "1" }}>
        <img
          src={imgErr ? fallback : product.mainImage}
          alt={product.title}
          onError={() => setImgErr(true)}
          style={{
            width: "100%", height: "100%", objectFit: "cover", display: "block",
            transform: hovered ? "scale(1.06)" : "scale(1)",
            transition: "transform 0.4s ease",
          }}
        />
        {product.discount && (
          <div style={{
            position: "absolute", top: "10px", left: "10px",
            background: "#F54F1E", color: "white",
            fontSize: "11px", fontWeight: 700, padding: "3px 8px", borderRadius: "6px",
          }}>{product.discount}</div>
        )}
        {product.isNew && (
          <div style={{
            position: "absolute", top: "10px", right: "10px",
            background: "#22C55E", color: "#003300",
            fontSize: "10px", fontWeight: 700, padding: "3px 8px", borderRadius: "6px",
          }}>NEW</div>
        )}
        <div style={{
          position: "absolute", bottom: 0, left: 0, right: 0,
          background: "linear-gradient(to top,rgba(11,11,18,0.85),transparent)",
          padding: "16px 12px 10px",
          opacity: hovered ? 1 : 0, transition: "opacity 0.3s",
          display: "flex", justifyContent: "center",
        }}>
          <span style={{ background: "#F54F1E", color: "white", fontSize: "12px", fontWeight: 600, padding: "6px 14px", borderRadius: "8px" }}>
            👁 Quick Preview
          </span>
        </div>
      </div>
      <div style={{ padding: "14px" }}>
        {product.dealTag && (
          <div style={{
            display: "inline-block", background: "rgba(245,166,35,0.1)", color: "#F5A623",
            fontSize: "11px", fontWeight: 600, padding: "2px 8px", borderRadius: "4px",
            border: "1px solid rgba(245,166,35,0.2)", marginBottom: "6px",
          }}>{product.dealTag}</div>
        )}
        <h3 style={{
          fontSize: "13px", fontWeight: 600, color: "#E8E8F0", marginBottom: "6px", lineHeight: 1.4,
          display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden",
        }}>{product.title}</h3>
        <div style={{ display: "flex", alignItems: "center", gap: "4px", marginBottom: "10px" }}>
          <Stars rating={product.rating} />
          <span style={{ fontSize: "11px", color: "#5E5E78" }}>({Number(product.reviews).toLocaleString()})</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <span style={{ fontSize: "20px", fontWeight: 800, color: "#F54F1E" }}>{product.price}</span>
            {product.originalPrice && (
              <span style={{ fontSize: "11px", color: "#5E5E78", textDecoration: "line-through", marginLeft: "6px" }}>{product.originalPrice}</span>
            )}
          </div>
          <span style={{
            fontSize: "10px", fontWeight: 700,
            color: product.store === "flipkart" ? "#4D8EF7" : "#FF9900",
            background: product.store === "flipkart" ? "rgba(40,116,240,0.12)" : "rgba(255,153,0,0.12)",
            padding: "3px 7px", borderRadius: "4px",
          }}>
            {product.store === "flipkart" ? "Flipkart" : product.store === "amazon" ? "Amazon" : "Store"}
          </span>
        </div>
      </div>
    </div>
  );
};

const ModalOverlay = ({ children, onClose }) => (
  <div
    onClick={onClose}
    style={{
      position: "fixed", inset: 0,
      background: "rgba(0,0,0,0.82)", backdropFilter: "blur(6px)",
      zIndex: 9999, display: "flex", alignItems: "center", justifyContent: "center", padding: "16px",
    }}
  >
    <div onClick={e => e.stopPropagation()}>{children}</div>
  </div>
);

const Field = ({ label, required, children }) => (
  <div>
    <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "#9999B0", marginBottom: "5px", textTransform: "uppercase", letterSpacing: "0.5px" }}>
      {label}{required && <span style={{ color: "#F54F1E" }}> *</span>}
    </label>
    {children}
  </div>
);

const SI = ({ value, onChange, placeholder, type = "text", style = {} }) => (
  <input
    type={type} value={value} onChange={onChange} placeholder={placeholder}
    style={{
      background: "#0B0B12", border: "1.5px solid #1E1E2E", borderRadius: "9px",
      color: "#E8E8F0", padding: "10px 13px", fontSize: "13px",
      outline: "none", width: "100%", fontFamily: "inherit", ...style,
    }}
    onFocus={e => e.target.style.borderColor = "#F54F1E"}
    onBlur={e => e.target.style.borderColor = "#1E1E2E"}
  />
);

export default function App() {
  const [products, setProducts] = useState(DEMO_PRODUCTS);
  const [selected, setSelected] = useState(null);
  const [imgIdx, setImgIdx] = useState(0);
  const [filter, setFilter] = useState("all");

  const [showLogin, setShowLogin] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showAdminPanel, setShowAdminPanel] = useState(false);
  const [adminUser, setAdminUser] = useState("");
  const [adminPass, setAdminPass] = useState("");
  const [loginErr, setLoginErr] = useState("");

  const [form, setForm] = useState(EMPTY_FORM);
  const [formMsg, setFormMsg] = useState({ text: "", type: "" });
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://fonts.googleapis.com/css2?family=Rajdhani:wght@600;700&family=DM+Sans:wght@300;400;500;600;700&display=swap";
    document.head.appendChild(link);
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const res = await window.storage.get("goateddeals_products");
        if (res) {
          const custom = JSON.parse(res.value);
          if (custom.length) setProducts([...custom, ...DEMO_PRODUCTS]);
        }
      } catch (e) {}
    })();
  }, []);

  const handleLogin = () => {
    if (adminUser === ADMIN.user && adminPass === ADMIN.pass) {
      setIsAdmin(true); setShowLogin(false); setShowAdminPanel(true);
      setLoginErr(""); setAdminUser(""); setAdminPass("");
    } else {
      setLoginErr("❌ Invalid credentials. Access denied.");
    }
  };

  const setF = (key, val) => setForm(f => ({ ...f, [key]: val }));
  const setImg = (i, val) => setForm(f => {
    const imgs = [...f.additionalImages];
    imgs[i] = val;
    return { ...f, additionalImages: imgs };
  });

  const validateForm = () => {
    const errs = {};
    if (!form.title.trim()) errs.title = "Title is required";
    if (!form.storeUrl.trim()) errs.storeUrl = "Store link is required";
    if (!form.price.trim()) errs.price = "Price is required";
    if (!form.mainImage.trim()) errs.mainImage = "Main image URL is required";
    if (!form.description.trim()) errs.description = "Description is required";
    return errs;
  };

  const handleAddProduct = async () => {
    const errs = validateForm();
    if (Object.keys(errs).length > 0) { setFormErrors(errs); return; }
    setFormErrors({});

    const newProduct = {
      id: `c-${Date.now()}`,
      title: form.title.trim(),
      storeUrl: form.storeUrl.trim(),
      store: form.store,
      price: form.price.trim(),
      originalPrice: form.originalPrice.trim() || null,
      discount: form.discount.trim() || null,
      mainImage: form.mainImage.trim(),
      additionalImages: form.additionalImages.map(u => u.trim()).filter(Boolean),
      description: form.description.trim(),
      rating: parseFloat(form.rating) || 4.0,
      reviews: parseInt(form.reviews) || 0,
      dealTag: form.dealTag,
      isNew: true,
      addedAt: Date.now(),
    };

    let custom = [];
    try {
      const stored = await window.storage.get("goateddeals_products");
      if (stored) custom = JSON.parse(stored.value);
    } catch (e) {}

    const updated = [newProduct, ...custom];
    try {
      await window.storage.set("goateddeals_products", JSON.stringify(updated));
    } catch (e) {}

    setProducts(prev => [newProduct, ...prev]);
    setForm(EMPTY_FORM);
    setFormMsg({ text: "✅ Product posted! It's now live at the top as a new deal.", type: "success" });
    setTimeout(() => setFormMsg({ text: "", type: "" }), 5000);
  };

  const filtered = products.filter(p => {
    if (filter === "amazon") return p.store === "amazon";
    if (filter === "flipkart") return p.store === "flipkart";
    if (filter === "new") return p.isNew;
    return true;
  });

  const recentDeals = products.filter(p => p.isNew).slice(0, 4);
  const allImgs = selected ? [selected.mainImage, ...(selected.additionalImages || [])].filter(Boolean) : [];

  const errStyle = { fontSize: "11px", color: "#F54F1E", marginTop: "4px" };

  return (
    <div style={{ fontFamily: "'DM Sans',sans-serif", background: "#0B0B12", minHeight: "100vh", color: "#E8E8F0" }}>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 5px; }
        ::-webkit-scrollbar-track { background: #0B0B12; }
        ::-webkit-scrollbar-thumb { background: #F54F1E; border-radius: 3px; }
        input, button, a, select, textarea { font-family: 'DM Sans', sans-serif; }
        select option { background: #13131E; }
        @media (max-width: 640px) {
          .pgrid { grid-template-columns: repeat(2,1fr) !important; gap: 10px !important; }
          .mgrid { flex-direction: column !important; }
          .mgrid .mleft { border-right: none !important; border-bottom: 1px solid #1E1E2E; }
          .hero-h { font-size: 38px !important; }
          .nav-tagline { display: none; }
          .trust-g { grid-template-columns: repeat(2,1fr) !important; }
          .formrow { grid-template-columns: 1fr !important; }
        }
      `}</style>

      {/* ── NAVBAR ── */}
      <nav style={{
        padding: "0 24px", height: "62px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        borderBottom: "1px solid #181824",
        background: "rgba(11,11,18,0.96)",
        position: "sticky", top: 0, zIndex: 100,
        backdropFilter: "blur(12px)",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div style={{
            width: "34px", height: "34px",
            background: "linear-gradient(135deg,#F54F1E,#F5A623)",
            borderRadius: "9px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "18px",
          }}>🐐</div>
          <span style={{ fontFamily: "'Rajdhani',sans-serif", fontSize: "21px", fontWeight: 700, letterSpacing: "1.5px" }}>
            GOATED<span style={{ color: "#F54F1E" }}>DEALS</span>
          </span>
        </div>
        <div className="nav-tagline" style={{ display: "flex", alignItems: "center", gap: "16px", fontSize: "13px", color: "#5E5E78" }}>
          <span>Amazon &amp; Flipkart</span>
          <span>|</span>
          <span style={{ display: "flex", alignItems: "center", gap: "5px" }}>
            <span style={{ color: "#22C55E", fontSize: "8px" }}>●</span> Live Deals
          </span>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section style={{
        padding: "72px 24px 60px", textAlign: "center",
        background: "radial-gradient(ellipse 70% 60% at 30% 50%,rgba(245,79,30,0.08) 0%,transparent 70%),radial-gradient(ellipse 60% 50% at 75% 25%,rgba(245,166,35,0.05) 0%,transparent 70%)",
      }}>
        <div style={{
          display: "inline-flex", alignItems: "center", gap: "8px",
          background: "rgba(245,79,30,0.1)", border: "1px solid rgba(245,79,30,0.28)",
          borderRadius: "50px", padding: "6px 18px", marginBottom: "28px",
          fontSize: "13px", color: "#F07A5A", fontWeight: 600,
        }}>✦ Handpicked · Quality Assured · Best Price Guaranteed</div>

        <h1 className="hero-h" style={{
          fontFamily: "'Rajdhani',sans-serif",
          fontSize: "clamp(42px,9vw,76px)",
          fontWeight: 700, lineHeight: 1.05, marginBottom: "18px", letterSpacing: "2px",
        }}>
          LOW PRICE.<br />
          <span style={{ color: "#F54F1E" }}>ZERO COMPROMISE.</span>
        </h1>

        <p style={{ fontSize: "clamp(15px,2vw,18px)", color: "#5E5E78", maxWidth: "460px", margin: "0 auto 38px", lineHeight: 1.7 }}>
          Every deal on Amazon &amp; Flipkart — tracked, verified, and posted so you always get the best price.
        </p>

        <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
          {[
            { icon: "🏷️", val: "50–70% OFF", sub: "Avg. Discount", c: "#F54F1E" },
            { icon: "⭐", val: "4.0+ RATED", sub: "All Products", c: "#F5A623" },
            { icon: "🔄", val: "DAILY DEALS", sub: "Always Fresh", c: "#22C55E" },
          ].map(b => (
            <div key={b.val} style={{
              background: "rgba(255,255,255,0.025)", border: "1px solid #1E1E2E",
              borderRadius: "14px", padding: "14px 20px",
              display: "flex", alignItems: "center", gap: "10px",
            }}>
              <span style={{ fontSize: "26px" }}>{b.icon}</span>
              <div style={{ textAlign: "left" }}>
                <div style={{ fontSize: "17px", fontWeight: 800, color: b.c }}>{b.val}</div>
                <div style={{ fontSize: "11px", color: "#5E5E78" }}>{b.sub}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div style={{ maxWidth: "1220px", margin: "0 auto", padding: "0 20px" }}>

        {/* ── RECENT TOP DEALS ── */}
        {recentDeals.length > 0 && (
          <section style={{ paddingBottom: "52px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "22px" }}>
              <div style={{ width: "4px", height: "30px", background: "#F54F1E", borderRadius: "2px" }} />
              <h2 style={{ fontFamily: "'Rajdhani',sans-serif", fontSize: "28px", fontWeight: 700, letterSpacing: "1px" }}>
                🔥 Recent Top Deals
              </h2>
              <span style={{
                background: "rgba(245,79,30,0.1)", color: "#F54F1E",
                fontSize: "11px", fontWeight: 700, padding: "3px 10px",
                borderRadius: "50px", border: "1px solid rgba(245,79,30,0.25)",
              }}>JUST ADDED</span>
            </div>
            <div className="pgrid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(240px,1fr))", gap: "18px" }}>
              {recentDeals.map(p => (
                <ProductCard key={p.id} product={p} onClick={() => { setSelected(p); setImgIdx(0); }} />
              ))}
            </div>
          </section>
        )}

        {/* ── ALL PRODUCTS ── */}
        <section style={{ paddingBottom: "60px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "24px", flexWrap: "wrap", gap: "12px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <div style={{ width: "4px", height: "30px", background: "#F54F1E", borderRadius: "2px" }} />
              <h2 style={{ fontFamily: "'Rajdhani',sans-serif", fontSize: "28px", fontWeight: 700, letterSpacing: "1px" }}>All Products</h2>
            </div>
            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
              {[
                { key: "all", label: "All Deals" },
                { key: "new", label: "🆕 New" },
                { key: "amazon", label: "🟠 Amazon" },
                { key: "flipkart", label: "🔵 Flipkart" },
              ].map(f => (
                <button key={f.key} onClick={() => setFilter(f.key)} style={{
                  padding: "7px 16px", borderRadius: "50px",
                  border: `1.5px solid ${filter === f.key ? "#F54F1E" : "#1E1E2E"}`,
                  background: filter === f.key ? "rgba(245,79,30,0.1)" : "transparent",
                  color: filter === f.key ? "#F54F1E" : "#5E5E78",
                  fontSize: "13px", fontWeight: 500, cursor: "pointer", transition: "all 0.18s",
                }}>{f.label}</button>
              ))}
            </div>
          </div>

          {filtered.length > 0 ? (
            <div className="pgrid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(240px,1fr))", gap: "18px" }}>
              {filtered.map(p => (
                <ProductCard key={p.id} product={p} onClick={() => { setSelected(p); setImgIdx(0); }} />
              ))}
            </div>
          ) : (
            <div style={{ textAlign: "center", padding: "60px 20px", color: "#5E5E78" }}>
              <div style={{ fontSize: "48px", marginBottom: "12px" }}>🔍</div>
              <p>No products found for this filter.</p>
            </div>
          )}
        </section>

        {/* ── TRUST SECTION ── */}
        <section style={{ paddingBottom: "60px" }}>
          <h2 style={{ fontFamily: "'Rajdhani',sans-serif", fontSize: "28px", fontWeight: 700, textAlign: "center", marginBottom: "28px", letterSpacing: "1px" }}>
            Why GoatedDeals?
          </h2>
          <div className="trust-g" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: "14px" }}>
            {[
              { icon: "🎯", t: "Handpicked Deals", d: "Every product personally verified for quality and genuine value." },
              { icon: "💰", t: "Lowest Prices", d: "We track & compare discounts across Amazon & Flipkart daily." },
              { icon: "⚡", t: "Daily Updates", d: "New deals discovered and posted every single day — never stale." },
              { icon: "🛡️", t: "Quality First", d: "Only products with 4.0+ star ratings make it to this page." },
            ].map(b => (
              <div key={b.t} style={{
                background: "#13131E", border: "1px solid #1E1E2E",
                borderRadius: "16px", padding: "24px", textAlign: "center", transition: "border-color 0.2s",
              }}
              onMouseEnter={e => e.currentTarget.style.borderColor = "rgba(245,79,30,0.3)"}
              onMouseLeave={e => e.currentTarget.style.borderColor = "#1E1E2E"}
              >
                <div style={{ fontSize: "36px", marginBottom: "12px" }}>{b.icon}</div>
                <div style={{ fontWeight: 700, marginBottom: "6px", fontSize: "16px" }}>{b.t}</div>
                <div style={{ color: "#5E5E78", fontSize: "13px", lineHeight: 1.6 }}>{b.d}</div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* ── FOOTER ── */}
      <footer style={{
        borderTop: "1px solid #181824", padding: "36px 24px",
        textAlign: "center", color: "#5E5E78", fontSize: "13px", lineHeight: 1.85,
      }}>
        <div style={{ fontFamily: "'Rajdhani',sans-serif", fontSize: "22px", fontWeight: 700, marginBottom: "10px", color: "#E8E8F0" }}>
          GOATED<span style={{ color: "#F54F1E" }}>DEALS</span>
        </div>
        <p style={{ maxWidth: "600px", margin: "0 auto 10px" }}>
          <strong style={{ color: "#9999B0" }}>Affiliate Disclosure:</strong> GoatedDeals participates in the Amazon Associates Programme and Flipkart Affiliate Programme. Purchases made through our links may earn us a commission at no extra cost to you. All prices and availability are subject to change by the respective stores.
        </p>
        <p>© 2025 GoatedDeals · Built to help you shop smarter.</p>
      </footer>

      {/* ── ADMIN FAB ── */}
      <button
        onClick={() => isAdmin ? setShowAdminPanel(true) : setShowLogin(true)}
        title="Admin Panel"
        style={{
          position: "fixed", bottom: "24px", right: "24px",
          width: "50px", height: "50px", borderRadius: "50%",
          background: "#13131E", border: "1.5px solid #2A2A3A",
          color: "#5E5E78", fontSize: "20px",
          cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
          transition: "all 0.2s", zIndex: 500,
          boxShadow: "0 4px 24px rgba(0,0,0,0.5)",
        }}
        onMouseEnter={e => { e.currentTarget.style.borderColor = "#F54F1E"; e.currentTarget.style.color = "#F54F1E"; }}
        onMouseLeave={e => { e.currentTarget.style.borderColor = "#2A2A3A"; e.currentTarget.style.color = "#5E5E78"; }}
      >⚙</button>

      {/* ── PRODUCT PREVIEW MODAL ── */}
      {selected && (
        <ModalOverlay onClose={() => setSelected(null)}>
          <div style={{
            background: "#13131E", border: "1px solid #222232",
            borderRadius: "20px", width: "min(820px,96vw)",
            maxHeight: "92vh", overflowY: "auto", position: "relative",
          }}>
            <button onClick={() => setSelected(null)} style={{
              position: "absolute", top: "14px", right: "14px",
              background: "rgba(255,255,255,0.08)", border: "none", borderRadius: "50%",
              width: "34px", height: "34px", color: "#E8E8F0", fontSize: "18px",
              cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 2,
            }}>×</button>

            <div className="mgrid" style={{ display: "flex" }}>
              <div className="mleft" style={{ flex: "0 0 50%", padding: "24px", borderRight: "1px solid #1E1E2E" }}>
                <div style={{ borderRadius: "14px", overflow: "hidden", background: "#0B0B12", marginBottom: "12px", aspectRatio: "1" }}>
                  <img
                    src={allImgs[imgIdx] || "https://placehold.co/500x500/0B0B12/F54F1E?text=No+Image"}
                    alt={selected.title}
                    style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                    onError={e => { e.target.src = "https://placehold.co/500x500/0B0B12/F54F1E?text=No+Image"; }}
                  />
                </div>
                {allImgs.length > 1 && (
                  <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                    {allImgs.map((img, i) => (
                      <img key={i} src={img} alt=""
                        onClick={() => setImgIdx(i)}
                        style={{
                          width: "58px", height: "58px", objectFit: "cover",
                          borderRadius: "9px", cursor: "pointer",
                          border: `2px solid ${i === imgIdx ? "#F54F1E" : "#1E1E2E"}`,
                          transition: "border-color 0.2s",
                        }}
                        onError={e => { e.target.src = "https://placehold.co/60x60/0B0B12/F54F1E?text=IMG"; }}
                      />
                    ))}
                  </div>
                )}
              </div>

              <div style={{ flex: 1, padding: "24px", minWidth: 0 }}>
                {selected.dealTag && (
                  <div style={{
                    display: "inline-block", background: "rgba(245,166,35,0.1)", color: "#F5A623",
                    fontSize: "12px", fontWeight: 600, padding: "3px 10px",
                    borderRadius: "5px", border: "1px solid rgba(245,166,35,0.2)", marginBottom: "12px",
                  }}>{selected.dealTag}</div>
                )}
                <h3 style={{ fontSize: "17px", fontWeight: 700, marginBottom: "12px", lineHeight: 1.45 }}>
                  {selected.title}
                </h3>
                <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "14px" }}>
                  <Stars rating={selected.rating} />
                  <span style={{ fontSize: "13px", color: "#5E5E78" }}>{selected.rating} ({Number(selected.reviews).toLocaleString()} reviews)</span>
                </div>
                <div style={{ marginBottom: "16px" }}>
                  <div style={{ fontSize: "34px", fontWeight: 800, color: "#F54F1E", lineHeight: 1 }}>{selected.price}</div>
                  {selected.originalPrice && (
                    <span style={{ fontSize: "15px", color: "#5E5E78", textDecoration: "line-through" }}>{selected.originalPrice}</span>
                  )}
                  {selected.discount && (
                    <span style={{ fontSize: "13px", color: "#22C55E", fontWeight: 600, marginLeft: "8px" }}>You save {selected.discount}</span>
                  )}
                </div>
                <p style={{ fontSize: "14px", color: "#8888A0", lineHeight: 1.7, marginBottom: "16px" }}>
                  {selected.description}
                </p>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "20px", fontSize: "13px" }}>
                  <span style={{ color: "#22C55E" }}>✅</span>
                  <span style={{ color: "#6E6E88" }}>Quality verified · Lowest price tracked</span>
                </div>
                <a
                  href={selected.storeUrl} target="_blank" rel="noopener noreferrer"
                  style={{
                    display: "flex", alignItems: "center", justifyContent: "center", gap: "10px",
                    width: "100%",
                    background: selected.store === "flipkart"
                      ? "linear-gradient(135deg,#2874F0,#4D8EF7)"
                      : "linear-gradient(135deg,#FF9900,#FFB300)",
                    color: selected.store === "flipkart" ? "white" : "#111",
                    border: "none", borderRadius: "12px", padding: "15px 24px",
                    fontSize: "16px", fontWeight: 700, cursor: "pointer", textDecoration: "none",
                  }}
                >
                  {selected.store === "flipkart" ? "🔵 Buy on Flipkart" : "🟠 Buy on Amazon"}
                </a>
                <p style={{ fontSize: "11px", color: "#5E5E78", textAlign: "center", marginTop: "10px" }}>
                  Affiliate link · Price may vary on store · Opens in new tab
                </p>
              </div>
            </div>
          </div>
        </ModalOverlay>
      )}

      {/* ── ADMIN LOGIN ── */}
      {showLogin && (
        <ModalOverlay onClose={() => { setShowLogin(false); setLoginErr(""); }}>
          <div style={{
            background: "#13131E", border: "1px solid #222232",
            borderRadius: "20px", padding: "36px", width: "min(380px,96vw)",
          }}>
            <h3 style={{ fontFamily: "'Rajdhani',sans-serif", fontSize: "26px", fontWeight: 700, textAlign: "center", marginBottom: "8px" }}>
              🔐 Admin Access
            </h3>
            <p style={{ fontSize: "13px", color: "#5E5E78", textAlign: "center", marginBottom: "24px" }}>
              Enter your credentials to manage deals
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              <SI value={adminUser} onChange={e => setAdminUser(e.target.value)} placeholder="Username" />
              <SI type="password" value={adminPass} onChange={e => setAdminPass(e.target.value)} placeholder="Password"
                onFocus={e => e.target.style.borderColor = "#F54F1E"}
                onBlur={e => e.target.style.borderColor = "#1E1E2E"}
                style={{ background: "#0B0B12", border: "1.5px solid #1E1E2E", borderRadius: "9px", color: "#E8E8F0", padding: "10px 13px", fontSize: "13px", outline: "none", width: "100%", fontFamily: "inherit" }}
              />
              {loginErr && <p style={{ color: "#F54F1E", fontSize: "13px" }}>{loginErr}</p>}
              <button onClick={handleLogin} style={{
                background: "linear-gradient(135deg,#F54F1E,#F07052)",
                color: "white", border: "none", borderRadius: "10px",
                padding: "13px", fontSize: "15px", fontWeight: 700, cursor: "pointer", marginTop: "4px",
              }}>Login</button>
            </div>
          </div>
        </ModalOverlay>
      )}

      {/* ── ADMIN PANEL ── */}
      {showAdminPanel && isAdmin && (
        <ModalOverlay onClose={() => setShowAdminPanel(false)}>
          <div style={{
            background: "#13131E", border: "1px solid #222232",
            borderRadius: "20px", width: "min(620px,96vw)",
            maxHeight: "92vh", overflowY: "auto",
          }}>
            <div style={{ padding: "28px 28px 0", display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
              <h3 style={{ fontFamily: "'Rajdhani',sans-serif", fontSize: "26px", fontWeight: 700 }}>⚙️ Admin Panel</h3>
              <button onClick={() => setShowAdminPanel(false)} style={{ background: "none", border: "none", color: "#5E5E78", fontSize: "24px", cursor: "pointer" }}>×</button>
            </div>

            {/* STATS */}
            <div style={{ padding: "0 28px", marginBottom: "20px" }}>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "10px" }}>
                {[
                  { val: products.length, label: "Total Products", c: "#F54F1E" },
                  { val: products.filter(p => p.isNew).length, label: "New Deals", c: "#22C55E" },
                  { val: products.filter(p => p.store === "flipkart").length, label: "Flipkart", c: "#4D8EF7" },
                ].map(s => (
                  <div key={s.label} style={{ background: "#0B0B12", borderRadius: "10px", padding: "14px", textAlign: "center" }}>
                    <div style={{ fontSize: "26px", fontWeight: 800, color: s.c }}>{s.val}</div>
                    <div style={{ fontSize: "11px", color: "#5E5E78", marginTop: "2px" }}>{s.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* POST PRODUCT FORM */}
            <div style={{ padding: "0 28px 28px" }}>
              <div style={{ background: "#0B0B12", borderRadius: "14px", padding: "22px" }}>
                <h4 style={{ color: "#F5A623", fontSize: "16px", fontWeight: 700, marginBottom: "18px" }}>
                  📦 Post New Product
                </h4>

                <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>

                  {/* Title */}
                  <Field label="Product Title" required>
                    <SI value={form.title} onChange={e => setF("title", e.target.value)} placeholder="e.g. boAt Airdopes 141 Truly Wireless Earbuds" />
                    {formErrors.title && <p style={errStyle}>{formErrors.title}</p>}
                  </Field>

                  {/* Store URL + Store type */}
                  <div className="formrow" style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: "10px", alignItems: "start" }}>
                    <Field label="Product / Store Link" required>
                      <SI value={form.storeUrl} onChange={e => setF("storeUrl", e.target.value)} placeholder="https://www.amazon.in/dp/..." />
                      {formErrors.storeUrl && <p style={errStyle}>{formErrors.storeUrl}</p>}
                    </Field>
                    <Field label="Store">
                      <select value={form.store} onChange={e => setF("store", e.target.value)} style={{
                        background: "#0B0B12", border: "1.5px solid #1E1E2E", borderRadius: "9px",
                        color: "#E8E8F0", padding: "10px 13px", fontSize: "13px", outline: "none", cursor: "pointer",
                      }}>
                        <option value="amazon">🟠 Amazon</option>
                        <option value="flipkart">🔵 Flipkart</option>
                        <option value="other">🔗 Other</option>
                      </select>
                    </Field>
                  </div>

                  {/* Price row */}
                  <div className="formrow" style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "10px" }}>
                    <Field label="Current Price" required>
                      <SI value={form.price} onChange={e => setF("price", e.target.value)} placeholder="₹1,299" />
                      {formErrors.price && <p style={errStyle}>{formErrors.price}</p>}
                    </Field>
                    <Field label="Original Price">
                      <SI value={form.originalPrice} onChange={e => setF("originalPrice", e.target.value)} placeholder="₹4,990" />
                    </Field>
                    <Field label="Discount">
                      <SI value={form.discount} onChange={e => setF("discount", e.target.value)} placeholder="74% off" />
                    </Field>
                  </div>

                  {/* Main image */}
                  <Field label="Main Image URL" required>
                    <SI value={form.mainImage} onChange={e => setF("mainImage", e.target.value)} placeholder="https://images.example.com/product.jpg" />
                    {formErrors.mainImage && <p style={errStyle}>{formErrors.mainImage}</p>}
                    {form.mainImage && (
                      <img src={form.mainImage} alt="preview"
                        style={{ marginTop: "8px", width: "70px", height: "70px", objectFit: "cover", borderRadius: "8px", border: "1px solid #1E1E2E" }}
                        onError={e => { e.target.style.display = "none"; }}
                      />
                    )}
                  </Field>

                  {/* Additional images */}
                  <Field label="Additional Images (up to 3)">
                    <div style={{ display: "flex", flexDirection: "column", gap: "7px" }}>
                      {form.additionalImages.map((img, i) => (
                        <div key={i} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                          <SI value={img} onChange={e => setImg(i, e.target.value)} placeholder={`Extra image ${i + 1} URL (optional)`} />
                          {img && (
                            <img src={img} alt=""
                              style={{ width: "36px", height: "36px", objectFit: "cover", borderRadius: "6px", border: "1px solid #1E1E2E", flexShrink: 0 }}
                              onError={e => { e.target.style.display = "none"; }}
                            />
                          )}
                        </div>
                      ))}
                    </div>
                  </Field>

                  {/* Description */}
                  <Field label="Description" required>
                    <textarea
                      value={form.description}
                      onChange={e => setF("description", e.target.value)}
                      placeholder="2–3 sentences describing key features and why it's a great deal..."
                      rows={3}
                      style={{
                        background: "#0B0B12", border: "1.5px solid #1E1E2E", borderRadius: "9px",
                        color: "#E8E8F0", padding: "10px 13px", fontSize: "13px",
                        outline: "none", width: "100%", resize: "vertical", lineHeight: 1.6,
                      }}
                      onFocus={e => e.target.style.borderColor = "#F54F1E"}
                      onBlur={e => e.target.style.borderColor = "#1E1E2E"}
                    />
                    {formErrors.description && <p style={errStyle}>{formErrors.description}</p>}
                  </Field>

                  {/* Rating / Reviews / Deal tag */}
                  <div className="formrow" style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "10px" }}>
                    <Field label="Rating (1–5)">
                      <SI type="number" value={form.rating} onChange={e => setF("rating", e.target.value)} placeholder="4.2"
                        style={{ background: "#0B0B12", border: "1.5px solid #1E1E2E", borderRadius: "9px", color: "#E8E8F0", padding: "10px 13px", fontSize: "13px", outline: "none", width: "100%" }}
                      />
                    </Field>
                    <Field label="Reviews Count">
                      <SI type="number" value={form.reviews} onChange={e => setF("reviews", e.target.value)} placeholder="1000" />
                    </Field>
                    <Field label="Deal Tag">
                      <select value={form.dealTag} onChange={e => setF("dealTag", e.target.value)} style={{
                        background: "#0B0B12", border: "1.5px solid #1E1E2E", borderRadius: "9px",
                        color: "#E8E8F0", padding: "10px 13px", fontSize: "13px", outline: "none", cursor: "pointer", width: "100%",
                      }}>
                        {DEAL_TAGS.map(t => <option key={t} value={t}>{t}</option>)}
                      </select>
                    </Field>
                  </div>

                  {/* Submit */}
                  {formMsg.text && (
                    <p style={{ fontSize: "13px", color: formMsg.type === "success" ? "#22C55E" : "#F54F1E", lineHeight: 1.5 }}>
                      {formMsg.text}
                    </p>
                  )}
                  <button onClick={handleAddProduct} style={{
                    background: "linear-gradient(135deg,#F54F1E,#F07052)",
                    color: "white", border: "none", borderRadius: "10px",
                    padding: "14px", fontSize: "15px", fontWeight: 700,
                    cursor: "pointer", marginTop: "4px",
                  }}>
                    🚀 Post Product as Top Deal
                  </button>
                </div>
              </div>
            </div>
          </div>
        </ModalOverlay>
      )}
    </div>
  );
}
