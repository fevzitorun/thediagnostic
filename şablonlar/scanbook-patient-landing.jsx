import { useState } from "react";

const SCANS = [
  { icon: "🧲", label: "MRI", from: 199, desc: "Brain, spine, joints & more", tag: "Most Popular" },
  { icon: "🔬", label: "CT Scan", from: 249, desc: "Chest, abdomen & full body", tag: "" },
  { icon: "〰", label: "Ultrasound", from: 99, desc: "Organs, pregnancy & baby scans", tag: "Baby Scans" },
  { icon: "⚡", label: "X-Ray", from: 75, desc: "Bones, chest & joints", tag: "Same Day" },
  { icon: "🎯", label: "PET-CT", from: 850, desc: "Cancer detection & staging", tag: "" },
  { icon: "🧬", label: "Health Checks", from: 299, desc: "Executive & full body packages", tag: "New" },
];

const CITIES = ["London", "Manchester", "Birmingham", "Leeds", "Bristol", "Edinburgh", "Glasgow", "Liverpool"];

const REVIEWS = [
  { name: "Sarah M.", city: "London", scan: "MRI Knee", stars: 5, text: "Booked my MRI within 2 hours. Was seen the next morning. After 14 weeks on the NHS list, this was life-changing.", time: "2 days ago" },
  { name: "James O.", city: "Manchester", scan: "CT Chest", stars: 5, text: "Incredibly smooth process. Got my results in 36 hours. The radiologist report was detailed and my GP was impressed.", time: "1 week ago" },
  { name: "Priya K.", city: "Birmingham", scan: "Baby 4D Scan", stars: 5, text: "We saw our baby's face for the first time. The clinic was warm and professional. Already recommended to 3 friends.", time: "3 days ago" },
];

const STEPS = [
  { n: "01", icon: "🔍", title: "Choose your scan", desc: "Select scan type, body part and preferred city" },
  { n: "02", icon: "🏥", title: "Pick a centre", desc: "Compare prices, ratings and availability in real time" },
  { n: "03", icon: "💳", title: "Book & pay online", desc: "Instant confirmation. No referral needed." },
  { n: "04", icon: "📋", title: "Get your results", desc: "Radiologist report delivered within 24–48 hours" },
];

const TRUST = [
  { icon: "✓", label: "CQC Verified Centres Only" },
  { icon: "🔒", label: "Secure Payment via Stripe" },
  { icon: "📋", label: "Radiologist Report Included" },
  { icon: "↩", label: "Free Cancellation 24h Prior" },
];

export default function PatientLanding() {
  const [activeScan, setActiveScan] = useState(0);
  const [location, setLocation] = useState("");
  const [hoveredCard, setHoveredCard] = useState(null);

  return (
    <div style={{
      fontFamily: "'Georgia', 'Times New Roman', serif",
      background: "#ffffff",
      color: "#0f1f2e",
      minHeight: "100vh",
      overflowX: "hidden",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .sans { font-family: 'DM Sans', sans-serif; }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes pulse { 0%,100% { opacity: 1; } 50% { opacity: 0.5; } }
        .fade-up { animation: fadeUp 0.7s ease forwards; }
        .fade-up-2 { animation: fadeUp 0.7s 0.15s ease both; }
        .fade-up-3 { animation: fadeUp 0.7s 0.3s ease both; }
        .fade-up-4 { animation: fadeUp 0.7s 0.45s ease both; }
        .scan-card:hover { transform: translateY(-4px); box-shadow: 0 20px 48px rgba(0,180,130,0.12); }
        .scan-card { transition: all 0.2s ease; }
        .city-btn:hover { background: #00c896 !important; color: #fff !important; }
        .city-btn { transition: all 0.15s; }
        .review-card:hover { transform: translateY(-2px); }
        .review-card { transition: all 0.2s; }
        .cta-main:hover { transform: translateY(-2px); box-shadow: 0 12px 32px rgba(0,200,150,0.35); }
        .cta-main { transition: all 0.2s; }
        .nav-link:hover { color: #00c896; }
        .nav-link { transition: color 0.15s; }
      `}</style>

      {/* NAVBAR */}
      <nav style={{
        position: "sticky", top: 0, zIndex: 100,
        background: "rgba(255,255,255,0.95)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid rgba(0,0,0,0.06)",
        padding: "0 40px", height: 64,
        display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{
            width: 34, height: 34, borderRadius: 10,
            background: "linear-gradient(135deg, #00c896, #00a878)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontFamily: "'Georgia', serif", fontWeight: 700, color: "#fff", fontSize: 18,
          }}>S</div>
          <span style={{ fontSize: 20, fontWeight: 700, letterSpacing: "-0.5px" }}>
            Scan<span style={{ color: "#00c896" }}>Book</span>
            <span className="sans" style={{ fontSize: 11, color: "#999", marginLeft: 6, fontWeight: 400 }}>.uk</span>
          </span>
        </div>

        <div className="sans" style={{ display: "flex", gap: 32, fontSize: 14 }}>
          {["Scan Types", "Find a Centre", "Baby Scans", "Corporate", "How It Works"].map(l => (
            <span key={l} className="nav-link" style={{ cursor: "pointer", color: "#555" }}>{l}</span>
          ))}
        </div>

        <div style={{ display: "flex", gap: 10 }}>
          <button className="sans" style={{ padding: "8px 18px", border: "1px solid #e0e0e0", borderRadius: 8, background: "#fff", color: "#333", cursor: "pointer", fontSize: 13 }}>Sign In</button>
          <button className="sans cta-main" style={{ padding: "8px 20px", border: "none", borderRadius: 8, background: "#00c896", color: "#fff", cursor: "pointer", fontSize: 13, fontWeight: 600 }}>Book a Scan</button>
        </div>
      </nav>

      {/* HERO */}
      <section style={{
        background: "linear-gradient(170deg, #f0fdf9 0%, #ffffff 60%)",
        padding: "80px 40px 100px",
        position: "relative", overflow: "hidden",
      }}>
        {/* decorative blobs */}
        <div style={{ position: "absolute", top: -120, right: -80, width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(0,200,150,0.08) 0%, transparent 70%)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: -60, left: -40, width: 300, height: 300, borderRadius: "50%", background: "radial-gradient(circle, rgba(0,150,200,0.06) 0%, transparent 70%)", pointerEvents: "none" }} />

        <div style={{ maxWidth: 860, margin: "0 auto", textAlign: "center", position: "relative" }}>
          {/* badge */}
          <div className="sans fade-up" style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            background: "#e8faf4", border: "1px solid #b2edd8",
            borderRadius: 20, padding: "6px 16px", fontSize: 13,
            color: "#00a878", marginBottom: 28,
          }}>
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#00c896", display: "inline-block", animation: "pulse 2s infinite" }} />
            NHS wait: 6–18 weeks · ScanBook: <strong style={{ marginLeft: 4 }}>Available Today</strong>
          </div>

          <h1 className="fade-up-2" style={{
            fontSize: 58, fontWeight: 400, lineHeight: 1.15,
            letterSpacing: "-1.5px", marginBottom: 20, color: "#0a1f14",
          }}>
            Private Diagnostic Scans,<br />
            <em style={{ color: "#00c896", fontStyle: "italic" }}>Booked in Minutes.</em>
          </h1>

          <p className="sans fade-up-3" style={{
            fontSize: 18, color: "#5a7a6a", lineHeight: 1.75,
            marginBottom: 44, maxWidth: 560, margin: "0 auto 44px",
          }}>
            Connect instantly with 600+ accredited imaging centres across the UK. MRI, CT, Ultrasound, X-Ray — no referral, no waiting list.
          </p>

          {/* SEARCH WIDGET */}
          <div className="fade-up-4" style={{
            background: "#fff",
            borderRadius: 20, padding: 24,
            boxShadow: "0 4px 6px rgba(0,0,0,0.04), 0 24px 64px rgba(0,0,0,0.08)",
            border: "1px solid rgba(0,0,0,0.06)",
            textAlign: "left",
          }}>
            {/* scan type pills */}
            <div className="sans" style={{ display: "flex", gap: 8, marginBottom: 18, flexWrap: "wrap" }}>
              {SCANS.map((s, i) => (
                <button key={i} onClick={() => setActiveScan(i)}
                  style={{
                    padding: "7px 14px", borderRadius: 8, cursor: "pointer",
                    border: activeScan === i ? "1.5px solid #00c896" : "1.5px solid #e8e8e8",
                    background: activeScan === i ? "#e8faf4" : "#fff",
                    color: activeScan === i ? "#00a878" : "#666",
                    fontSize: 13, fontWeight: activeScan === i ? 600 : 400,
                    transition: "all 0.15s",
                    display: "flex", alignItems: "center", gap: 6,
                  }}>
                  <span>{s.icon}</span> {s.label}
                  {s.tag && <span style={{ fontSize: 10, background: "#00c89622", color: "#00c896", padding: "1px 5px", borderRadius: 4 }}>{s.tag}</span>}
                </button>
              ))}
            </div>

            {/* inputs */}
            <div style={{ display: "flex", gap: 10 }}>
              <div style={{ flex: 2, position: "relative" }}>
                <span style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", fontSize: 16 }}>📍</span>
                <input className="sans"
                  placeholder="City, postcode or centre name..."
                  value={location} onChange={e => setLocation(e.target.value)}
                  style={{
                    width: "100%", padding: "14px 14px 14px 42px",
                    border: "1.5px solid #e0e0e0", borderRadius: 10,
                    fontSize: 14, outline: "none", color: "#333",
                    fontFamily: "'DM Sans', sans-serif",
                  }} />
              </div>
              <select className="sans" style={{ flex: 1, padding: "14px 16px", border: "1.5px solid #e0e0e0", borderRadius: 10, fontSize: 14, background: "#fff", color: "#333", outline: "none", cursor: "pointer" }}>
                <option>Any body part</option>
                <option>Head & Brain</option>
                <option>Spine & Back</option>
                <option>Knee & Joints</option>
                <option>Abdomen</option>
                <option>Chest & Lungs</option>
                <option>Pelvis</option>
                <option>Shoulder</option>
              </select>
              <button className="sans cta-main" style={{
                padding: "14px 28px", border: "none", borderRadius: 10,
                background: "linear-gradient(135deg, #00c896, #00a878)",
                color: "#fff", fontSize: 14, fontWeight: 700,
                cursor: "pointer", whiteSpace: "nowrap",
              }}>Find Centres →</button>
            </div>

            <div className="sans" style={{ marginTop: 12, fontSize: 12, color: "#aaa" }}>
              Popular: {["MRI Knee London", "Brain Scan Manchester", "Baby 4D Scan Birmingham", "CT Chest Bristol"].map((t, i) => (
                <span key={i} style={{ color: "#00a878", cursor: "pointer", marginLeft: i > 0 ? 0 : 0 }}>
                  {i > 0 && " · "}{t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* TRUST STRIP */}
      <div style={{ background: "#0a1f14", padding: "18px 40px" }}>
        <div className="sans" style={{ maxWidth: 900, margin: "0 auto", display: "flex", justifyContent: "center", gap: 48, flexWrap: "wrap" }}>
          {TRUST.map((t, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, color: "rgba(255,255,255,0.8)", fontSize: 13 }}>
              <span style={{ color: "#00c896", fontWeight: 700 }}>{t.icon}</span>
              {t.label}
            </div>
          ))}
        </div>
      </div>

      {/* STATS */}
      <div style={{ padding: "56px 40px", background: "#f8fffe" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 24 }}>
          {[
            { val: "600+", label: "Partner Centres", sub: "across the UK" },
            { val: "48h", label: "Average Wait", sub: "vs 14 weeks NHS" },
            { val: "£75", label: "Starting From", sub: "transparent pricing" },
            { val: "98%", label: "Patient Rating", sub: "4.9 stars average" },
          ].map((s, i) => (
            <div key={i} style={{ textAlign: "center" }}>
              <div style={{ fontSize: 40, fontWeight: 700, color: "#00c896", letterSpacing: "-1px", lineHeight: 1 }}>{s.val}</div>
              <div className="sans" style={{ fontSize: 15, fontWeight: 600, color: "#0a1f14", marginTop: 8 }}>{s.label}</div>
              <div className="sans" style={{ fontSize: 12, color: "#888", marginTop: 4 }}>{s.sub}</div>
            </div>
          ))}
        </div>
      </div>

      {/* SCAN TYPES */}
      <div style={{ padding: "72px 40px", background: "#fff" }}>
        <div style={{ maxWidth: 1080, margin: "0 auto" }}>
          <p className="sans" style={{ fontSize: 12, color: "#aaa", letterSpacing: 3, marginBottom: 12, textAlign: "center" }}>WHAT WE OFFER</p>
          <h2 style={{ fontSize: 36, fontWeight: 400, textAlign: "center", marginBottom: 8, letterSpacing: "-0.5px" }}>
            Every scan, <em style={{ color: "#00c896" }}>every city.</em>
          </h2>
          <p className="sans" style={{ fontSize: 16, color: "#777", textAlign: "center", marginBottom: 48 }}>No referral needed. Book any scan, anywhere in the UK.</p>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
            {SCANS.map((s, i) => (
              <div key={i} className="scan-card"
                style={{
                  padding: 28, borderRadius: 16,
                  border: "1.5px solid #f0f0f0",
                  background: "#fff", cursor: "pointer",
                }}>
                <div style={{ fontSize: 36, marginBottom: 16 }}>{s.icon}</div>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                  <span style={{ fontSize: 20, fontWeight: 600 }}>{s.label}</span>
                  {s.tag && <span className="sans" style={{ fontSize: 10, background: "#e8faf4", color: "#00a878", padding: "2px 7px", borderRadius: 20, fontWeight: 600 }}>{s.tag}</span>}
                </div>
                <p className="sans" style={{ fontSize: 14, color: "#888", lineHeight: 1.6, marginBottom: 20 }}>{s.desc}</p>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <span style={{ fontSize: 22, fontWeight: 700, color: "#0a1f14" }}>£{s.from}</span>
                    <span className="sans" style={{ fontSize: 12, color: "#aaa" }}> from</span>
                  </div>
                  <button className="sans" style={{ padding: "8px 16px", border: "1.5px solid #00c896", borderRadius: 8, background: "#fff", color: "#00a878", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>
                    Book →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* HOW IT WORKS */}
      <div style={{ padding: "80px 40px", background: "linear-gradient(170deg, #0a1f14 0%, #0f2d1e 100%)" }}>
        <div style={{ maxWidth: 960, margin: "0 auto" }}>
          <p className="sans" style={{ fontSize: 12, color: "#00c896", letterSpacing: 3, marginBottom: 12, textAlign: "center" }}>THE PROCESS</p>
          <h2 style={{ fontSize: 36, fontWeight: 400, color: "#fff", textAlign: "center", marginBottom: 60 }}>
            From search to scan <em style={{ color: "#00c896" }}>in minutes.</em>
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 32 }}>
            {STEPS.map((s, i) => (
              <div key={i} style={{ textAlign: "center" }}>
                <div style={{ fontSize: 48, fontWeight: 700, color: "rgba(0,200,150,0.12)", fontFamily: "monospace", marginBottom: 12 }}>{s.n}</div>
                <div style={{ fontSize: 28, marginBottom: 12 }}>{s.icon}</div>
                <h3 style={{ fontSize: 16, color: "#fff", marginBottom: 10, fontWeight: 500 }}>{s.title}</h3>
                <p className="sans" style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", lineHeight: 1.7 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* BABY SCAN FEATURE */}
      <div style={{ padding: "80px 40px", background: "#fff8fc" }}>
        <div style={{ maxWidth: 960, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "center" }}>
          <div>
            <span className="sans" style={{ fontSize: 11, background: "#ffe0f0", color: "#e84393", padding: "4px 12px", borderRadius: 20, fontWeight: 600 }}>NEW · BABY SCANS</span>
            <h2 style={{ fontSize: 40, fontWeight: 400, lineHeight: 1.2, letterSpacing: "-0.5px", marginTop: 16, marginBottom: 16 }}>
              See your baby's<br /><em style={{ color: "#e84393" }}>first smile.</em>
            </h2>
            <p className="sans" style={{ fontSize: 15, color: "#777", lineHeight: 1.8, marginBottom: 28 }}>
              Our partner centres offer 4D baby scans, gender scans, well-being checks and pregnancy packages — in a warm, welcoming environment.
            </p>
            <div className="sans" style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 32 }}>
              {["4D/3D Baby Scan (from £99)", "Gender Reveal Scan (from £79)", "Pregnancy Well-being Scan", "Anomaly Scan Package"].map((t, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 14, color: "#444" }}>
                  <span style={{ color: "#e84393", fontWeight: 700 }}>♥</span> {t}
                </div>
              ))}
            </div>
            <button className="sans" style={{ padding: "14px 28px", border: "none", borderRadius: 10, background: "#e84393", color: "#fff", fontSize: 15, fontWeight: 600, cursor: "pointer" }}>
              Book Baby Scan →
            </button>
          </div>
          <div style={{ background: "linear-gradient(135deg, #ffe0f0, #fff8fc)", borderRadius: 24, height: 380, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 100 }}>
            👶
          </div>
        </div>
      </div>

      {/* REVIEWS */}
      <div style={{ padding: "72px 40px", background: "#f9f9f7" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <p className="sans" style={{ fontSize: 12, color: "#aaa", letterSpacing: 3, marginBottom: 12, textAlign: "center" }}>PATIENT STORIES</p>
          <h2 style={{ fontSize: 36, fontWeight: 400, textAlign: "center", marginBottom: 48 }}>Real people, <em style={{ color: "#00c896" }}>real results.</em></h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
            {REVIEWS.map((r, i) => (
              <div key={i} className="review-card" style={{ background: "#fff", borderRadius: 16, padding: 24, border: "1px solid #f0f0f0" }}>
                <div className="sans" style={{ display: "flex", gap: 2, marginBottom: 16 }}>
                  {[...Array(r.stars)].map((_, j) => <span key={j} style={{ color: "#f59e0b", fontSize: 14 }}>★</span>)}
                </div>
                <p className="sans" style={{ fontSize: 14, color: "#444", lineHeight: 1.7, marginBottom: 20, fontStyle: "italic" }}>"{r.text}"</p>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <div className="sans" style={{ fontSize: 13, fontWeight: 600 }}>{r.name}</div>
                    <div className="sans" style={{ fontSize: 12, color: "#aaa" }}>{r.scan} · {r.city}</div>
                  </div>
                  <div className="sans" style={{ fontSize: 11, color: "#ccc" }}>{r.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CITIES */}
      <div style={{ padding: "60px 40px", background: "#fff" }}>
        <div style={{ maxWidth: 960, margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ fontSize: 28, fontWeight: 400, marginBottom: 32 }}>Available in <em style={{ color: "#00c896" }}>10 cities</em> across the UK</h2>
          <div className="sans" style={{ display: "flex", gap: 10, flexWrap: "wrap", justifyContent: "center" }}>
            {CITIES.map((c, i) => (
              <button key={i} className="city-btn" style={{ padding: "10px 22px", border: "1.5px solid #e0e0e0", borderRadius: 50, background: "#fff", color: "#444", fontSize: 14, cursor: "pointer" }}>{c}</button>
            ))}
            <button className="sans" style={{ padding: "10px 22px", border: "1.5px dashed #ccc", borderRadius: 50, background: "#fff", color: "#aaa", fontSize: 14, cursor: "pointer" }}>+ More coming soon</button>
          </div>
        </div>
      </div>

      {/* FINAL CTA */}
      <div style={{ padding: "80px 40px", background: "linear-gradient(135deg, #00c896, #00a878)" }}>
        <div style={{ maxWidth: 640, margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ fontSize: 40, fontWeight: 400, color: "#fff", marginBottom: 16, letterSpacing: "-0.5px" }}>
            Stop waiting.<br /><em>Start scanning.</em>
          </h2>
          <p className="sans" style={{ fontSize: 16, color: "rgba(255,255,255,0.8)", lineHeight: 1.7, marginBottom: 36 }}>
            Over 6 million people are waiting for NHS care. You don't have to be one of them.
          </p>
          <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
            <button className="sans" style={{ padding: "16px 36px", border: "none", borderRadius: 12, background: "#fff", color: "#00a878", fontSize: 16, fontWeight: 700, cursor: "pointer" }}>
              Book a Scan Today →
            </button>
            <button className="sans" style={{ padding: "16px 28px", border: "2px solid rgba(255,255,255,0.5)", borderRadius: 12, background: "transparent", color: "#fff", fontSize: 16, cursor: "pointer" }}>
              View All Centres
            </button>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <footer style={{ background: "#0a1f14", padding: "48px 40px" }}>
        <div style={{ maxWidth: 1080, margin: "0 auto", display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 40 }}>
          <div>
            <div style={{ fontSize: 20, fontWeight: 700, color: "#fff", marginBottom: 12 }}>Scan<span style={{ color: "#00c896" }}>Book</span></div>
            <p className="sans" style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", lineHeight: 1.8, maxWidth: 260 }}>
              UK's private diagnostic imaging marketplace. CQC verified centres. No referral needed.
            </p>
          </div>
          {[
            { title: "Scans", links: ["MRI Scans", "CT Scans", "Ultrasound", "Baby Scans", "X-Ray", "Executive Checks"] },
            { title: "Cities", links: ["London", "Manchester", "Birmingham", "Leeds", "Bristol", "Edinburgh"] },
            { title: "Company", links: ["About Us", "For Clinics", "For GPs", "Press", "Privacy", "Terms"] },
          ].map((col, i) => (
            <div key={i}>
              <div className="sans" style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", fontWeight: 600, marginBottom: 16, letterSpacing: 1 }}>{col.title.toUpperCase()}</div>
              {col.links.map((l, j) => (
                <div key={j} className="sans" style={{ fontSize: 13, color: "rgba(255,255,255,0.55)", marginBottom: 10, cursor: "pointer" }}>{l}</div>
              ))}
            </div>
          ))}
        </div>
        <div style={{ maxWidth: 1080, margin: "32px auto 0", paddingTop: 24, borderTop: "1px solid rgba(255,255,255,0.07)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span className="sans" style={{ fontSize: 12, color: "rgba(255,255,255,0.3)" }}>© 2025 ScanBook Ltd (The Connective UK Ltd) · All rights reserved</span>
          <div style={{ display: "flex", gap: 16 }}>
            {["🔒 SSL Secured", "⭐ Trustpilot", "✓ CQC Partner"].map((t, i) => (
              <span key={i} className="sans" style={{ fontSize: 11, color: "rgba(255,255,255,0.3)" }}>{t}</span>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
