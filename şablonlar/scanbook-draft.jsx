import { useState } from "react";

const SCANS = [
  { id: "mri", label: "MRI", icon: "🧲", desc: "Full body & targeted MRI" },
  { id: "ct", label: "CT Scan", icon: "🔬", desc: "Computed Tomography" },
  { id: "ultrasound", label: "Ultrasound", icon: "〰️", desc: "Including 4D baby scans" },
  { id: "xray", label: "X-Ray", icon: "⚡", desc: "Digital radiography" },
  { id: "petct", label: "PET-CT", icon: "🎯", desc: "Cancer detection & staging" },
  { id: "dexa", label: "DEXA", icon: "🦴", desc: "Bone density scan" },
];

const CENTRES = [
  {
    name: "London Diagnostics Hub",
    location: "Harley Street, London",
    rating: 4.9,
    reviews: 312,
    price: 299,
    wait: "Today",
    distance: "0.4 mi",
    accredited: true,
    scans: ["MRI", "CT", "X-Ray", "Ultrasound"],
    img: "🏥",
  },
  {
    name: "Manchester Scan Centre",
    location: "Deansgate, Manchester",
    rating: 4.8,
    reviews: 187,
    price: 219,
    wait: "Tomorrow",
    distance: "1.2 mi",
    accredited: true,
    scans: ["MRI", "CT", "PET-CT"],
    img: "🏨",
  },
  {
    name: "Birmingham Imaging",
    location: "Edgbaston, Birmingham",
    rating: 4.7,
    reviews: 94,
    price: 189,
    wait: "2 days",
    distance: "2.1 mi",
    accredited: false,
    scans: ["MRI", "Ultrasound", "X-Ray"],
    img: "🏪",
  },
];

const STATS = [
  { val: "600+", label: "Partner Centres" },
  { val: "48h", label: "Avg. Wait Time" },
  { val: "£189", label: "From" },
  { val: "98%", label: "Patient Satisfaction" },
];

const FLOW_STEPS = [
  { n: "01", title: "Choose Your Scan", desc: "Select scan type, body part & preferred location" },
  { n: "02", title: "Compare Centres", desc: "View prices, availability & patient reviews" },
  { n: "03", title: "Book Instantly", desc: "Confirm online, pay securely — no referral needed" },
  { n: "04", title: "Get Results", desc: "Radiologist report delivered within 24–48 hours" },
];

export default function ScanBookDraft() {
  const [activeScan, setActiveScan] = useState("mri");
  const [location, setLocation] = useState("");
  const [activeTab, setActiveTab] = useState("home");

  return (
    <div style={{ fontFamily: "'Georgia', serif", background: "#f8f6f1", minHeight: "100vh", color: "#1a1a2e" }}>
      {/* NAVBAR */}
      <nav style={{
        background: "#fff",
        borderBottom: "1px solid #e8e3d8",
        padding: "0 40px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        height: 64,
        position: "sticky",
        top: 0,
        zIndex: 100,
        boxShadow: "0 2px 12px rgba(0,0,0,0.04)"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{
            width: 36, height: 36, borderRadius: 10,
            background: "linear-gradient(135deg, #1a6b5c, #2d9e8a)",
            display: "flex", alignItems: "center", justifyContent: "center",
            color: "#fff", fontWeight: 700, fontSize: 18
          }}>S</div>
          <span style={{ fontSize: 20, fontWeight: 700, letterSpacing: "-0.5px" }}>
            Scan<span style={{ color: "#1a6b5c" }}>Book</span>
          </span>
          <span style={{
            fontSize: 10, background: "#e8f5f2", color: "#1a6b5c",
            padding: "2px 6px", borderRadius: 4, fontFamily: "monospace", marginLeft: 2
          }}>UK</span>
        </div>

        <div style={{ display: "flex", gap: 28, fontSize: 14 }}>
          {["Scan Types", "Find a Centre", "International", "For Clinics", "How It Works"].map(item => (
            <span key={item} style={{ cursor: "pointer", color: "#444", fontFamily: "sans-serif" }}
              onMouseEnter={e => e.target.style.color = "#1a6b5c"}
              onMouseLeave={e => e.target.style.color = "#444"}>
              {item}
            </span>
          ))}
        </div>

        <div style={{ display: "flex", gap: 12 }}>
          <button style={{
            padding: "8px 18px", border: "1px solid #1a6b5c",
            background: "transparent", color: "#1a6b5c", borderRadius: 8,
            cursor: "pointer", fontSize: 13, fontFamily: "sans-serif"
          }}>Sign In</button>
          <button style={{
            padding: "8px 18px", border: "none",
            background: "#1a6b5c", color: "#fff", borderRadius: 8,
            cursor: "pointer", fontSize: 13, fontWeight: 600, fontFamily: "sans-serif"
          }}>Book a Scan</button>
        </div>
      </nav>

      {/* HERO */}
      <div style={{
        background: "linear-gradient(160deg, #0f3d33 0%, #1a6b5c 50%, #2d9e8a 100%)",
        padding: "80px 40px 120px",
        position: "relative",
        overflow: "hidden"
      }}>
        {/* decorative circles */}
        {[...Array(3)].map((_, i) => (
          <div key={i} style={{
            position: "absolute",
            width: [600, 400, 250][i], height: [600, 400, 250][i],
            borderRadius: "50%",
            border: "1px solid rgba(255,255,255,0.08)",
            top: [-200, -100, 50][i], right: [-100, 50, 200][i],
            pointerEvents: "none"
          }} />
        ))}

        <div style={{ maxWidth: 900, margin: "0 auto", textAlign: "center", position: "relative" }}>
          <div style={{
            display: "inline-block",
            background: "rgba(255,255,255,0.12)",
            border: "1px solid rgba(255,255,255,0.2)",
            borderRadius: 20, padding: "6px 16px", fontSize: 13,
            color: "rgba(255,255,255,0.9)", marginBottom: 24,
            fontFamily: "sans-serif", backdropFilter: "blur(8px)"
          }}>
            ⏱ NHS wait: 6–18 weeks · ScanBook wait: <strong>48 hours</strong>
          </div>

          <h1 style={{
            fontSize: 56, fontWeight: 400, color: "#fff",
            lineHeight: 1.15, marginBottom: 16, letterSpacing: "-1px"
          }}>
            Private Diagnostic Scans,<br />
            <em style={{ fontStyle: "italic", color: "#a8e6da" }}>Booked in Minutes.</em>
          </h1>

          <p style={{
            fontSize: 18, color: "rgba(255,255,255,0.75)",
            marginBottom: 48, fontFamily: "sans-serif", lineHeight: 1.7
          }}>
            Connect with 600+ accredited imaging centres across the UK.<br />
            MRI, CT, Ultrasound, X-Ray, PET-CT — no referral, no wait list.
          </p>

          {/* SEARCH WIDGET */}
          <div style={{
            background: "#fff",
            borderRadius: 20,
            padding: 28,
            boxShadow: "0 24px 64px rgba(0,0,0,0.2)",
            textAlign: "left"
          }}>
            {/* Scan type selector */}
            <div style={{ display: "flex", gap: 10, marginBottom: 20, flexWrap: "wrap" }}>
              {SCANS.map(s => (
                <button key={s.id} onClick={() => setActiveScan(s.id)}
                  style={{
                    padding: "8px 16px",
                    border: activeScan === s.id ? "2px solid #1a6b5c" : "2px solid #e8e3d8",
                    borderRadius: 10, background: activeScan === s.id ? "#e8f5f2" : "#fff",
                    color: activeScan === s.id ? "#1a6b5c" : "#555",
                    cursor: "pointer", fontSize: 13, fontFamily: "sans-serif",
                    fontWeight: activeScan === s.id ? 600 : 400,
                    transition: "all 0.15s"
                  }}>
                  {s.icon} {s.label}
                </button>
              ))}
            </div>

            {/* Location + Body Part + CTA */}
            <div style={{ display: "flex", gap: 12, alignItems: "stretch" }}>
              <div style={{ flex: 2, position: "relative" }}>
                <span style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", fontSize: 16 }}>📍</span>
                <input
                  value={location}
                  onChange={e => setLocation(e.target.value)}
                  placeholder="City, postcode or hospital name..."
                  style={{
                    width: "100%", padding: "14px 14px 14px 40px",
                    border: "2px solid #e8e3d8", borderRadius: 10,
                    fontSize: 14, fontFamily: "sans-serif",
                    outline: "none", boxSizing: "border-box"
                  }}
                />
              </div>
              <select style={{
                flex: 1, padding: "14px 16px",
                border: "2px solid #e8e3d8", borderRadius: 10,
                fontSize: 14, fontFamily: "sans-serif",
                background: "#fff", outline: "none"
              }}>
                <option>Any body part</option>
                <option>Head & Brain</option>
                <option>Spine & Back</option>
                <option>Knee & Joints</option>
                <option>Abdomen</option>
                <option>Chest & Lung</option>
                <option>Pelvis</option>
              </select>
              <button style={{
                padding: "14px 32px",
                background: "linear-gradient(135deg, #1a6b5c, #2d9e8a)",
                color: "#fff", border: "none", borderRadius: 10,
                fontSize: 15, fontWeight: 700, cursor: "pointer",
                fontFamily: "sans-serif", whiteSpace: "nowrap"
              }}>
                Search Centres →
              </button>
            </div>

            <div style={{ marginTop: 14, fontSize: 12, color: "#888", fontFamily: "sans-serif" }}>
              Popular: <span style={{ color: "#1a6b5c", cursor: "pointer" }}>MRI Knee London</span> ·{" "}
              <span style={{ color: "#1a6b5c", cursor: "pointer" }}>Brain MRI Manchester</span> ·{" "}
              <span style={{ color: "#1a6b5c", cursor: "pointer" }}>CT Abdomen Birmingham</span> ·{" "}
              <span style={{ color: "#1a6b5c", cursor: "pointer" }}>Baby Ultrasound Edinburgh</span>
            </div>
          </div>
        </div>
      </div>

      {/* STATS STRIP */}
      <div style={{
        background: "#1a1a2e",
        display: "flex",
        justifyContent: "center",
        gap: 0,
        padding: "0"
      }}>
        {STATS.map((s, i) => (
          <div key={i} style={{
            padding: "24px 60px",
            borderRight: i < STATS.length - 1 ? "1px solid rgba(255,255,255,0.1)" : "none",
            textAlign: "center"
          }}>
            <div style={{ fontSize: 28, fontWeight: 700, color: "#a8e6da", lineHeight: 1 }}>{s.val}</div>
            <div style={{ fontSize: 12, color: "rgba(255,255,255,0.5)", marginTop: 4, fontFamily: "sans-serif" }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* RESULTS SECTION */}
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "60px 24px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 28 }}>
          <div>
            <p style={{ fontSize: 12, color: "#888", fontFamily: "sans-serif", marginBottom: 4 }}>FEATURED CENTRES · LONDON</p>
            <h2 style={{ fontSize: 28, fontWeight: 600, letterSpacing: "-0.5px" }}>Available Today Near You</h2>
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            {["Price ↑", "Nearest", "Top Rated"].map(f => (
              <button key={f} style={{
                padding: "7px 14px", border: "1px solid #ddd",
                borderRadius: 20, background: "#fff", fontSize: 12,
                cursor: "pointer", fontFamily: "sans-serif"
              }}>{f}</button>
            ))}
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
          {CENTRES.map((c, i) => (
            <div key={i} style={{
              background: "#fff",
              borderRadius: 16,
              padding: 24,
              border: "1px solid #e8e3d8",
              transition: "all 0.2s",
              cursor: "pointer",
              boxShadow: "0 2px 12px rgba(0,0,0,0.04)"
            }}
              onMouseEnter={e => e.currentTarget.style.transform = "translateY(-4px)"}
              onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}>

              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
                <div style={{
                  width: 52, height: 52, borderRadius: 12,
                  background: "#e8f5f2", display: "flex",
                  alignItems: "center", justifyContent: "center", fontSize: 24
                }}>{c.img}</div>
                {c.accredited && (
                  <span style={{
                    fontSize: 10, background: "#e8f5f2", color: "#1a6b5c",
                    padding: "3px 8px", borderRadius: 20, height: "fit-content",
                    fontFamily: "sans-serif", fontWeight: 600
                  }}>✓ CQC Accredited</span>
                )}
              </div>

              <h3 style={{ fontSize: 17, fontWeight: 600, marginBottom: 4 }}>{c.name}</h3>
              <p style={{ fontSize: 13, color: "#888", fontFamily: "sans-serif", marginBottom: 14 }}>📍 {c.location} · {c.distance}</p>

              <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 16 }}>
                {c.scans.map(s => (
                  <span key={s} style={{
                    fontSize: 11, background: "#f4f4f4", padding: "3px 8px",
                    borderRadius: 6, fontFamily: "sans-serif", color: "#555"
                  }}>{s}</span>
                ))}
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: 16, borderTop: "1px solid #f0ebe0" }}>
                <div>
                  <span style={{ fontSize: 20, fontWeight: 700, color: "#1a1a2e" }}>£{c.price}</span>
                  <span style={{ fontSize: 12, color: "#888", fontFamily: "sans-serif" }}> from</span>
                  <div style={{ fontSize: 12, color: "#1a6b5c", fontFamily: "sans-serif", marginTop: 2 }}>⚡ {c.wait}</div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontSize: 13, fontWeight: 600, fontFamily: "sans-serif" }}>★ {c.rating}</div>
                  <div style={{ fontSize: 11, color: "#888", fontFamily: "sans-serif" }}>{c.reviews} reviews</div>
                </div>
              </div>

              <button style={{
                width: "100%", marginTop: 14, padding: "11px",
                background: "#1a6b5c", color: "#fff", border: "none",
                borderRadius: 10, fontSize: 14, fontWeight: 600,
                cursor: "pointer", fontFamily: "sans-serif"
              }}>Book Appointment →</button>
            </div>
          ))}
        </div>
      </div>

      {/* HOW IT WORKS */}
      <div style={{ background: "#1a1a2e", padding: "72px 40px" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <p style={{ textAlign: "center", fontSize: 12, color: "#a8e6da", letterSpacing: 2, fontFamily: "sans-serif", marginBottom: 12 }}>THE PROCESS</p>
          <h2 style={{ textAlign: "center", fontSize: 36, color: "#fff", fontWeight: 400, marginBottom: 60 }}>
            From search to scan in <em style={{ color: "#a8e6da" }}>minutes.</em>
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 32 }}>
            {FLOW_STEPS.map((s, i) => (
              <div key={i} style={{ textAlign: "center" }}>
                <div style={{
                  fontSize: 48, fontWeight: 700,
                  color: "rgba(168,230,218,0.15)", marginBottom: 16,
                  fontFamily: "monospace"
                }}>{s.n}</div>
                <h3 style={{ fontSize: 17, color: "#fff", marginBottom: 10 }}>{s.title}</h3>
                <p style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", lineHeight: 1.7, fontFamily: "sans-serif" }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ARCHITECTURE OVERVIEW */}
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "72px 24px" }}>
        <p style={{ fontSize: 12, color: "#888", letterSpacing: 2, fontFamily: "sans-serif", marginBottom: 12 }}>PLATFORM BLUEPRINT</p>
        <h2 style={{ fontSize: 32, fontWeight: 600, marginBottom: 40, letterSpacing: "-0.5px" }}>ScanBook Architecture Overview</h2>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
          {[
            {
              layer: "Patient Side",
              color: "#1a6b5c",
              modules: [
                "🔍 Smart Search (scan type + location + body part)",
                "📅 Real-time availability calendar",
                "💳 Secure online payment (Stripe)",
                "📋 Symptom checker / scan recommender",
                "📄 Results portal (PDF reports)",
                "🔔 Reminders & appointment management",
              ]
            },
            {
              layer: "Core Platform",
              color: "#1a1a2e",
              modules: [
                "🗂 Centre CMS (profiles, services, pricing)",
                "📍 Geo-location & radius search",
                "🔗 Booking engine (slot management)",
                "⭐ Review & rating system",
                "🤖 AI scan recommender",
                "📊 Analytics dashboard",
              ]
            },
            {
              layer: "Partner Clinics",
              color: "#8b4513",
              modules: [
                "🏥 Clinic onboarding portal",
                "🗓 Calendar integration (NHS/private)",
                "📤 Results upload system",
                "💰 Revenue dashboard",
                "📞 Patient communication tools",
                "🌍 International centre support",
              ]
            },
          ].map((col, i) => (
            <div key={i} style={{
              background: "#fff",
              borderRadius: 16,
              overflow: "hidden",
              border: "1px solid #e8e3d8",
            }}>
              <div style={{
                background: col.color,
                padding: "16px 20px",
                color: "#fff",
                fontSize: 15,
                fontWeight: 600
              }}>{col.layer}</div>
              <div style={{ padding: 20 }}>
                {col.modules.map((m, j) => (
                  <div key={j} style={{
                    padding: "10px 0",
                    borderBottom: j < col.modules.length - 1 ? "1px solid #f0ebe0" : "none",
                    fontSize: 13, fontFamily: "sans-serif", color: "#333", lineHeight: 1.5
                  }}>{m}</div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Data model hint */}
        <div style={{ marginTop: 32, background: "#f0f9f6", border: "1px solid #c8e6de", borderRadius: 16, padding: 28 }}>
          <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 16 }}>📦 Core Data Entities</h3>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            {[
              "📍 Centre (name, address, lat/lng, CQC, images, facilities)",
              "🩻 ScanType (MRI/CT/etc, bodyParts[], typical price)",
              "🕐 Slot (centreId, scanId, datetime, available, price)",
              "👤 Patient (profile, history, documents)",
              "📋 Booking (patientId, slotId, status, payment)",
              "📄 Report (bookingId, radiologistId, PDF, delivered_at)",
            ].map((e, i) => (
              <div key={i} style={{
                background: "#fff", border: "1px solid #c8e6de",
                borderRadius: 8, padding: "8px 14px",
                fontSize: 12, fontFamily: "monospace", color: "#1a6b5c"
              }}>{e}</div>
            ))}
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <div style={{ background: "#1a1a2e", padding: "40px", textAlign: "center" }}>
        <div style={{ fontSize: 22, fontWeight: 700, color: "#fff", marginBottom: 8 }}>
          Scan<span style={{ color: "#a8e6da" }}>Book</span>
          <span style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", marginLeft: 8, fontFamily: "sans-serif" }}>scanbook.uk — draft v0.1</span>
        </div>
        <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 12, fontFamily: "sans-serif" }}>Platform architecture & homepage draft · Not for production use</p>
      </div>
    </div>
  );
}
