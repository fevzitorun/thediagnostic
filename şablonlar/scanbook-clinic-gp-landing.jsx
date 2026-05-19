import { useState } from "react";

const BENEFITS = [
  { icon: "📈", title: "Fill Empty Slots", desc: "Your unused scanner time is revenue walking out the door. ScanBook connects you with self-pay patients ready to book today." },
  { icon: "£0", title: "Zero Upfront Cost", desc: "No software fees, no setup charges. We only earn when you earn — 12–15% commission on completed bookings only." },
  { icon: "⚡", title: "Live in 24 Hours", desc: "Our partner portal takes under a day to set up. Manual slot management or full API integration — you choose." },
  { icon: "🤝", title: "We Handle the Admin", desc: "Patient communications, payment processing, reminders and cancellations — all managed by ScanBook." },
];

const STATS = [
  { val: "600+", label: "Partner Centres" },
  { val: "£0", label: "Upfront Cost" },
  { val: "24h", label: "Go-Live Time" },
  { val: "£48k", label: "Avg Monthly Revenue Added" },
];

const HOW = [
  { n: "01", title: "Apply & Onboard", desc: "Submit your centre details. CQC verification check. Partner agreement signed digitally in hours." },
  { n: "02", title: "Add Your Availability", desc: "Use our Partner Portal to set slots — or connect via API for real-time sync with your existing system." },
  { n: "03", title: "Patients Book & Pay", desc: "ScanBook handles marketing, booking and payment. Funds reach your account within 14 days." },
  { n: "04", title: "Grow Together", desc: "Monthly performance reports. Dedicated partner manager. Scale as fast as you want." },
];

const TIERS = [
  { name: "Standard Partner", color: "#64748b", badge: "Most Common", commission: "15%", setup: "Free", features: ["Manual slot management portal", "Listing on ScanBook.uk", "Patient messaging", "Monthly payouts", "Email support"] },
  { name: "API Partner", color: "#00c896", badge: "Recommended", commission: "12%", setup: "Free", features: ["Real-time slot sync via API", "Priority listing placement", "Dedicated partner manager", "Weekly payouts", "Priority support", "Analytics dashboard"] },
  { name: "Enterprise", color: "#1e3a5f", badge: "Chains & Groups", commission: "Custom", setup: "Bespoke", features: ["Multi-site management", "White-label option", "Custom integrations", "Revenue share model", "Executive reporting", "SLA guarantee"] },
];

const FAQS = [
  { q: "Do we need CQC registration?", a: "Yes — all ScanBook partner centres must hold current CQC registration. This protects both patients and your centre." },
  { q: "What happens if a patient doesn't show?", a: "Payment is collected upfront. Patients who cancel within 24 hours receive a full refund. Late cancellations — the centre retains 50%." },
  { q: "Can we control which slots are available?", a: "Completely. You decide exactly which slots appear on ScanBook. Your existing patients and direct bookings always take priority." },
  { q: "How quickly do we receive payment?", a: "Standard partners: 14-day net. API partners: weekly payouts. Enterprise: bespoke schedule." },
  { q: "Can we set our own prices?", a: "Yes. You control your pricing. ScanBook displays your prices transparently — this builds patient trust and increases conversion." },
];

const GP_BENEFITS = [
  { icon: "💷", title: "Earn Per Referral", desc: "Receive £15–25 for every patient scan completed through your unique referral link. Paid monthly, automatically." },
  { icon: "⏱", title: "Cut Your Admin", desc: "No more chasing imaging referrals. Send patients directly to verified private centres. Same-day appointments available." },
  { icon: "📋", title: "Results Visibility", desc: "With patient consent, access scan reports directly through your GP dashboard. Faster clinical decision-making." },
  { icon: "🏆", title: "Reward Your Patients", desc: "Give patients stuck on NHS waiting lists a fast, affordable alternative. 600+ CQC centres, from £75." },
];

export default function ClinicLanding() {
  const [activeTab, setActiveTab] = useState("clinic");
  const [openFaq, setOpenFaq] = useState(null);
  const [activeTier, setActiveTier] = useState(1);

  const isClinic = activeTab === "clinic";

  return (
    <div style={{
      fontFamily: "'Georgia', 'Times New Roman', serif",
      background: "#f8f9fc",
      color: "#0f1f2e",
      minHeight: "100vh",
      overflowX: "hidden",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=DM+Mono:wght@400;500&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .sans { font-family: 'DM Sans', sans-serif; }
        .mono { font-family: 'DM Mono', monospace; }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        .fade-up { animation: fadeUp 0.6s ease both; }
        .benefit-card:hover { transform: translateY(-3px); box-shadow: 0 12px 32px rgba(0,0,0,0.08); border-color: #00c896 !important; }
        .benefit-card { transition: all 0.2s; }
        .faq-item:hover { background: #f0f9f6 !important; }
        .faq-item { transition: all 0.15s; }
        .nav-link:hover { color: #00c896; }
        .nav-link { transition: color 0.15s; }
        .tab-active { border-bottom: 2px solid #00c896 !important; color: #00c896 !important; }
      `}</style>

      {/* NAVBAR */}
      <nav style={{
        position: "sticky", top: 0, zIndex: 100,
        background: "#fff",
        borderBottom: "1px solid #e8edf2",
        padding: "0 40px", height: 64,
        display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ width: 32, height: 32, borderRadius: 8, background: "linear-gradient(135deg, #1e3a5f, #0f2d4a)", display: "flex", alignItems: "center", justifyContent: "center", color: "#00c896", fontWeight: 700, fontSize: 16 }}>P</div>
            <div>
              <div className="sans" style={{ fontSize: 14, fontWeight: 700, color: "#1e3a5f", lineHeight: 1 }}>PlanB Health Technology</div>
              <div className="sans" style={{ fontSize: 10, color: "#aaa", lineHeight: 1 }}>powered by The Connective UK · ScanBook Partner Programme</div>
            </div>
          </div>
        </div>

        <div className="sans" style={{ display: "flex", gap: 28, fontSize: 14 }}>
          {["For Imaging Centres", "For GP Practices", "Partner Portal", "Case Studies", "Contact"].map(l => (
            <span key={l} className="nav-link" style={{ cursor: "pointer", color: "#555" }}>{l}</span>
          ))}
        </div>

        <div style={{ display: "flex", gap: 10 }}>
          <button className="sans" style={{ padding: "8px 18px", border: "1px solid #e0e0e0", borderRadius: 8, background: "#fff", color: "#333", cursor: "pointer", fontSize: 13 }}>Partner Login</button>
          <button className="sans" style={{ padding: "8px 20px", border: "none", borderRadius: 8, background: "#1e3a5f", color: "#fff", cursor: "pointer", fontSize: 13, fontWeight: 600 }}>Apply to Partner →</button>
        </div>
      </nav>

      {/* TAB SWITCHER */}
      <div style={{ background: "#fff", borderBottom: "1px solid #e8edf2", padding: "0 40px" }}>
        <div className="sans" style={{ display: "flex", gap: 0, maxWidth: 400 }}>
          {[
            { id: "clinic", label: "🏥 For Imaging Centres" },
            { id: "gp", label: "🩺 For GP Practices" },
          ].map(t => (
            <button key={t.id} onClick={() => setActiveTab(t.id)}
              className={activeTab === t.id ? "tab-active" : ""}
              style={{ padding: "14px 24px", border: "none", borderBottom: "2px solid transparent", background: "transparent", color: activeTab === t.id ? "#00c896" : "#888", cursor: "pointer", fontSize: 14, fontWeight: activeTab === t.id ? 600 : 400, transition: "all 0.15s" }}>
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* HERO */}
      <section style={{
        background: isClinic
          ? "linear-gradient(160deg, #0f1f2e 0%, #1e3a5f 60%, #0f2d4a 100%)"
          : "linear-gradient(160deg, #1a0f2e 0%, #2d1e5f 60%, #1a0f4a 100%)",
        padding: "80px 40px 100px",
        position: "relative", overflow: "hidden",
      }}>
        {/* grid pattern overlay */}
        <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)", backgroundSize: "40px 40px", pointerEvents: "none" }} />

        <div style={{ maxWidth: 860, margin: "0 auto", position: "relative" }}>
          <div className="sans fade-up" style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            background: "rgba(0,200,150,0.12)", border: "1px solid rgba(0,200,150,0.25)",
            borderRadius: 4, padding: "6px 14px", fontSize: 12,
            color: "#00c896", marginBottom: 28, letterSpacing: 1,
            fontWeight: 600,
          }}>
            SCANBOOK PARTNER PROGRAMME · {isClinic ? "IMAGING CENTRES" : "GP PRACTICES"}
          </div>

          <h1 className="fade-up" style={{
            fontSize: 54, fontWeight: 400, lineHeight: 1.1,
            color: "#fff", marginBottom: 20, letterSpacing: "-1px",
          }}>
            {isClinic ? (
              <>Your scanner runs 8 hours.<br /><em style={{ color: "#00c896" }}>Fill every hour.</em></>
            ) : (
              <>Your patients can't wait<br /><em style={{ color: "#a78bfa" }}>14 weeks for a scan.</em></>
            )}
          </h1>

          <p className="sans fade-up" style={{
            fontSize: 17, color: "rgba(255,255,255,0.65)", lineHeight: 1.8,
            marginBottom: 44, maxWidth: 580,
          }}>
            {isClinic
              ? "Join 600+ UK imaging centres already using ScanBook to fill empty slots and generate new self-pay revenue — with zero upfront cost and zero commitment."
              : "Join the ScanBook GP Referral Network. Give your patients fast access to private imaging. Earn per referral. See results faster."
            }
          </p>

          <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
            <button className="sans" style={{ padding: "15px 32px", border: "none", borderRadius: 10, background: "#00c896", color: "#0a1f14", fontSize: 15, fontWeight: 700, cursor: "pointer" }}>
              {isClinic ? "Apply as Partner Centre →" : "Join GP Network →"}
            </button>
            <button className="sans" style={{ padding: "15px 24px", border: "1px solid rgba(255,255,255,0.2)", borderRadius: 10, background: "transparent", color: "rgba(255,255,255,0.8)", fontSize: 15, cursor: "pointer" }}>
              {isClinic ? "See How It Works" : "Learn More"}
            </button>
          </div>

          {/* Trust indicators */}
          <div className="sans" style={{ marginTop: 52, display: "flex", gap: 32, flexWrap: "wrap" }}>
            {(isClinic
              ? ["✓ CQC Verified Partners Only", "✓ No Exclusivity Required", "✓ GDPR Compliant", "✓ Stripe Payments"]
              : ["✓ Private GPs only", "✓ £15–25 per referral", "✓ Patient result visibility", "✓ GMC compliant"]
            ).map((t, i) => (
              <span key={i} style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", display: "flex", alignItems: "center", gap: 6 }}>{t}</span>
            ))}
          </div>
        </div>
      </section>

      {/* STATS */}
      <div style={{ background: "#fff", borderBottom: "1px solid #e8edf2" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(4, 1fr)" }}>
          {STATS.map((s, i) => (
            <div key={i} style={{ padding: "32px 24px", textAlign: "center", borderRight: i < 3 ? "1px solid #e8edf2" : "none" }}>
              <div style={{ fontSize: 36, fontWeight: 700, color: "#1e3a5f", letterSpacing: "-1px" }}>{s.val}</div>
              <div className="sans" style={{ fontSize: 13, color: "#888", marginTop: 4 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* CLINIC CONTENT */}
      {isClinic && (
        <>
          {/* Benefits */}
          <div style={{ padding: "72px 40px", background: "#f8f9fc" }}>
            <div style={{ maxWidth: 1000, margin: "0 auto" }}>
              <p className="sans" style={{ fontSize: 11, color: "#aaa", letterSpacing: 3, marginBottom: 12 }}>WHY PARTNER WITH SCANBOOK</p>
              <h2 style={{ fontSize: 34, fontWeight: 400, marginBottom: 48, letterSpacing: "-0.5px" }}>
                Empty slots cost you money.<br /><em style={{ color: "#00c896" }}>We fill them.</em>
              </h2>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 20 }}>
                {BENEFITS.map((b, i) => (
                  <div key={i} className="benefit-card" style={{ background: "#fff", borderRadius: 14, padding: 28, border: "1.5px solid #f0f0f0", display: "flex", gap: 20 }}>
                    <div style={{ fontSize: 32, flexShrink: 0, width: 52, height: 52, background: "#f0fdf9", borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center" }}>{b.icon}</div>
                    <div>
                      <h3 style={{ fontSize: 17, fontWeight: 600, marginBottom: 8 }}>{b.title}</h3>
                      <p className="sans" style={{ fontSize: 14, color: "#666", lineHeight: 1.7 }}>{b.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* How it works */}
          <div style={{ padding: "72px 40px", background: "#fff" }}>
            <div style={{ maxWidth: 960, margin: "0 auto" }}>
              <p className="sans" style={{ fontSize: 11, color: "#aaa", letterSpacing: 3, marginBottom: 12 }}>THE PROCESS</p>
              <h2 style={{ fontSize: 34, fontWeight: 400, marginBottom: 52, letterSpacing: "-0.5px" }}>Live in <em style={{ color: "#00c896" }}>24 hours.</em></h2>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 24 }}>
                {HOW.map((s, i) => (
                  <div key={i} style={{ position: "relative" }}>
                    {i < HOW.length - 1 && (
                      <div style={{ position: "absolute", top: 16, left: "calc(100% - 12px)", width: "24px", height: "1px", background: "#e0e0e0" }} />
                    )}
                    <div className="mono" style={{ fontSize: 11, color: "#00c896", marginBottom: 16, letterSpacing: 1 }}>{s.n}</div>
                    <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 10 }}>{s.title}</h3>
                    <p className="sans" style={{ fontSize: 13, color: "#777", lineHeight: 1.7 }}>{s.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Partnership tiers */}
          <div style={{ padding: "72px 40px", background: "#f8f9fc" }}>
            <div style={{ maxWidth: 1000, margin: "0 auto" }}>
              <p className="sans" style={{ fontSize: 11, color: "#aaa", letterSpacing: 3, marginBottom: 12 }}>PARTNERSHIP OPTIONS</p>
              <h2 style={{ fontSize: 34, fontWeight: 400, marginBottom: 48, letterSpacing: "-0.5px" }}>Choose your <em style={{ color: "#00c896" }}>integration level.</em></h2>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
                {TIERS.map((t, i) => (
                  <div key={i} onClick={() => setActiveTier(i)}
                    style={{
                      background: activeTier === i ? "linear-gradient(160deg, #0f2d4a, #1e3a5f)" : "#fff",
                      borderRadius: 16, padding: 28, cursor: "pointer",
                      border: `1.5px solid ${activeTier === i ? "#00c896" : "#e8edf2"}`,
                      transition: "all 0.2s",
                    }}>
                    <div className="sans" style={{ display: "flex", justifyContent: "space-between", marginBottom: 16, alignItems: "flex-start" }}>
                      <span style={{ fontSize: 15, fontWeight: 700, color: activeTier === i ? "#fff" : "#1e3a5f" }}>{t.name}</span>
                      <span style={{ fontSize: 10, padding: "3px 8px", borderRadius: 4, background: activeTier === i ? "rgba(0,200,150,0.2)" : "#f0fdf9", color: "#00c896", fontWeight: 600 }}>{t.badge}</span>
                    </div>
                    <div style={{ marginBottom: 20 }}>
                      <span style={{ fontSize: 28, fontWeight: 700, color: activeTier === i ? "#00c896" : "#1e3a5f" }}>{t.commission}</span>
                      <span className="sans" style={{ fontSize: 13, color: activeTier === i ? "rgba(255,255,255,0.5)" : "#aaa" }}> commission</span>
                      <div className="sans" style={{ fontSize: 12, color: activeTier === i ? "rgba(255,255,255,0.4)" : "#ccc", marginTop: 2 }}>Setup: {t.setup}</div>
                    </div>
                    {t.features.map((f, j) => (
                      <div key={j} className="sans" style={{ display: "flex", gap: 8, fontSize: 13, color: activeTier === i ? "rgba(255,255,255,0.7)" : "#555", marginBottom: 8 }}>
                        <span style={{ color: "#00c896", flexShrink: 0 }}>✓</span> {f}
                      </div>
                    ))}
                    <button className="sans" style={{ marginTop: 20, width: "100%", padding: "11px", border: activeTier === i ? "none" : "1.5px solid #1e3a5f", borderRadius: 8, background: activeTier === i ? "#00c896" : "transparent", color: activeTier === i ? "#0a1f14" : "#1e3a5f", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>
                      Apply for This Tier
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}

      {/* GP CONTENT */}
      {!isClinic && (
        <div style={{ padding: "72px 40px", background: "#f8f9fc" }}>
          <div style={{ maxWidth: 1000, margin: "0 auto" }}>
            <p className="sans" style={{ fontSize: 11, color: "#aaa", letterSpacing: 3, marginBottom: 12 }}>GP REFERRAL NETWORK</p>
            <h2 style={{ fontSize: 34, fontWeight: 400, marginBottom: 48, letterSpacing: "-0.5px" }}>
              Better outcomes for patients.<br /><em style={{ color: "#a78bfa" }}>Revenue for your practice.</em>
            </h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 20, marginBottom: 40 }}>
              {GP_BENEFITS.map((b, i) => (
                <div key={i} className="benefit-card" style={{ background: "#fff", borderRadius: 14, padding: 28, border: "1.5px solid #f0f0f0", display: "flex", gap: 20 }}>
                  <div style={{ fontSize: 32, flexShrink: 0, width: 52, height: 52, background: "#f5f0ff", borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center" }}>{b.icon}</div>
                  <div>
                    <h3 style={{ fontSize: 17, fontWeight: 600, marginBottom: 8 }}>{b.title}</h3>
                    <p className="sans" style={{ fontSize: 14, color: "#666", lineHeight: 1.7 }}>{b.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Revenue calculator */}
            <div style={{ background: "linear-gradient(135deg, #1a0f2e, #2d1e5f)", borderRadius: 16, padding: 36 }}>
              <h3 style={{ fontSize: 22, fontWeight: 400, color: "#fff", marginBottom: 24 }}>
                Your potential <em style={{ color: "#a78bfa" }}>monthly earnings</em>
              </h3>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
                {[
                  { patients: 10, earn: "£150–250", note: "Small practice" },
                  { patients: 25, earn: "£375–625", note: "Medium practice" },
                  { patients: 50, earn: "£750–1,250", note: "Busy practice" },
                ].map((c, i) => (
                  <div key={i} style={{ textAlign: "center", padding: 20, background: "rgba(255,255,255,0.06)", borderRadius: 12 }}>
                    <div className="sans" style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", marginBottom: 8 }}>{c.patients} referrals/month</div>
                    <div style={{ fontSize: 28, fontWeight: 700, color: "#a78bfa" }}>{c.earn}</div>
                    <div className="sans" style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", marginTop: 4 }}>{c.note}</div>
                  </div>
                ))}
              </div>
              <div className="sans" style={{ marginTop: 20, fontSize: 12, color: "rgba(255,255,255,0.3)", textAlign: "center" }}>
                Based on £15–25 per completed referral. Private GP practices only. NHS compliance requirements apply.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* FAQ */}
      <div style={{ padding: "72px 40px", background: "#fff" }}>
        <div style={{ maxWidth: 720, margin: "0 auto" }}>
          <p className="sans" style={{ fontSize: 11, color: "#aaa", letterSpacing: 3, marginBottom: 12 }}>COMMON QUESTIONS</p>
          <h2 style={{ fontSize: 32, fontWeight: 400, marginBottom: 40, letterSpacing: "-0.5px" }}>
            Questions <em style={{ color: "#00c896" }}>answered.</em>
          </h2>
          {FAQS.map((f, i) => (
            <div key={i} className="faq-item" onClick={() => setOpenFaq(openFaq === i ? null : i)}
              style={{ padding: "20px 0", borderBottom: "1px solid #f0f0f0", cursor: "pointer", borderRadius: 4 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span className="sans" style={{ fontSize: 15, fontWeight: 600, color: "#1e3a5f", paddingRight: 20 }}>{f.q}</span>
                <span style={{ color: "#00c896", fontSize: 20, flexShrink: 0 }}>{openFaq === i ? "−" : "+"}</span>
              </div>
              {openFaq === i && (
                <p className="sans" style={{ fontSize: 14, color: "#666", lineHeight: 1.8, marginTop: 14 }}>{f.a}</p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div style={{ padding: "80px 40px", background: isClinic ? "linear-gradient(135deg, #0f2d4a, #1e3a5f)" : "linear-gradient(135deg, #1a0f2e, #2d1e5f)" }}>
        <div style={{ maxWidth: 640, margin: "0 auto", textAlign: "center" }}>
          <p className="sans" style={{ fontSize: 11, color: isClinic ? "#00c896" : "#a78bfa", letterSpacing: 3, marginBottom: 16 }}>
            {isClinic ? "JOIN THE NETWORK" : "GP REFERRAL PROGRAMME"}
          </p>
          <h2 style={{ fontSize: 38, fontWeight: 400, color: "#fff", marginBottom: 16, letterSpacing: "-0.5px" }}>
            {isClinic
              ? <>Ready to fill<br /><em style={{ color: "#00c896" }}>your empty slots?</em></>
              : <>Ready to help your<br /><em style={{ color: "#a78bfa" }}>patients scan faster?</em></>
            }
          </h2>
          <p className="sans" style={{ fontSize: 16, color: "rgba(255,255,255,0.6)", lineHeight: 1.7, marginBottom: 36 }}>
            {isClinic
              ? "Apply today. Our team will review your application within 24 hours. Go live in as little as one business day."
              : "Join hundreds of private GPs already in the ScanBook referral network. Setup takes minutes."
            }
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <button className="sans" style={{ padding: "16px 36px", border: "none", borderRadius: 10, background: isClinic ? "#00c896" : "#a78bfa", color: "#fff", fontSize: 15, fontWeight: 700, cursor: "pointer" }}>
              {isClinic ? "Apply as Partner →" : "Register as GP Partner →"}
            </button>
            <button className="sans" style={{ padding: "16px 24px", border: "1px solid rgba(255,255,255,0.2)", borderRadius: 10, background: "transparent", color: "rgba(255,255,255,0.7)", fontSize: 15, cursor: "pointer" }}>
              Book a Demo Call
            </button>
          </div>
          <p className="sans" style={{ fontSize: 12, color: "rgba(255,255,255,0.3)", marginTop: 20 }}>
            PlanB Health Technology Services · Powered by The Connective UK Ltd
          </p>
        </div>
      </div>

      {/* FOOTER */}
      <footer style={{ background: "#060e18", padding: "40px", textAlign: "center" }}>
        <div className="sans" style={{ fontSize: 12, color: "rgba(255,255,255,0.25)" }}>
          © 2025 The Connective UK Ltd · PlanB Health Technology Services · ScanBook Partner Programme<br />
          <span style={{ marginTop: 6, display: "block" }}>Registered in England & Wales · ICO Registered · CQC Partner Network</span>
        </div>
      </footer>
    </div>
  );
}
