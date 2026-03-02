"use client";

import { useEffect, useRef, useState, forwardRef } from "react";
import type { ForwardedRef } from "react";

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Hanalei+Fill&family=Hanken+Grotesk:wght@400;500;600&display=swap');

  * { box-sizing: border-box; margin: 0; padding: 0; }

  body, html { overflow: hidden; height: 100%; }

  .font-hanalei { font-family: 'Hanalei Fill', cursive; }
  .font-hanken  { font-family: 'Hanken Grotesk', sans-serif; }

  .scroll-container {
    height: 100vh;
    overflow-y: scroll;
    scroll-snap-type: y mandatory;
    scroll-behavior: smooth;
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
  .scroll-container::-webkit-scrollbar { display: none; }

  .snap-section {
    scroll-snap-align: start;
    height: 100vh;
    min-height: 100vh;
    position: relative;
    overflow: hidden;
  }

  .section-content {
    transition: opacity 0.8s ease, transform 0.8s ease;
  }
  .section-content.hidden-below { opacity: 0; transform: translateY(60px); }
  .section-content.visible      { opacity: 1; transform: translateY(0); }

  .stagger-1 { transition-delay: 0.1s; }
  .stagger-2 { transition-delay: 0.25s; }
  .stagger-3 { transition-delay: 0.4s; }

  .nav-dot {
    width: 10px; height: 10px;
    border-radius: 50%;
    background: rgba(255,255,255,0.4);
    cursor: pointer;
    transition: all 0.3s ease;
    border: 2px solid rgba(255,255,255,0.6);
  }
  .nav-dot.active { background: white; transform: scale(1.3); }
`;

// ─── NavDots ──────────────────────────────────────────────────────────────────

interface NavDotsProps {
  total: number;
  active: number;
  onDotClick: (index: number) => void;
}

function NavDots({ total, active, onDotClick }: NavDotsProps) {
  return (
    <div style={{
      position: "fixed", right: 20, top: "50%",
      transform: "translateY(-50%)", zIndex: 50,
      display: "flex", flexDirection: "column", gap: 12,
    }}>
      {Array.from({ length: total }).map((_, i) => (
        <button
          key={i}
          onClick={() => onDotClick(i)}
          aria-label={`Go to section ${i + 1}`}
          className={`nav-dot${active === i ? " active" : ""}`}
        />
      ))}
    </div>
  );
}

// ─── HeroSection ─────────────────────────────────────────────────────────────

interface SectionProps {
  isVisible?: boolean;
}

const HeroSection = forwardRef<HTMLElement, SectionProps>(({ isVisible }, ref) => (
  <section ref={ref} className="snap-section">
    <img
      src="https://api.builder.io/api/v1/image/assets/TEMP/379010ace01054da8ec3008f1fb995ebb557c51b?width=2988"
      alt="Landscape background"
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
    />
    <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.1)" }} />
    <div style={{ position: "relative", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div className={`section-content${isVisible ? " visible" : " hidden-below"}`} style={{ textAlign: "center", padding: "0 1rem" }}>
        <h1
          className="font-hanalei"
          style={{
            color: "white", textAlign: "center", lineHeight: 1.1,
            fontSize: "clamp(3rem, 10vw, 9rem)",
            textShadow: "0px 16px 32px rgba(12,12,13,0.4)",
          }}
        >
          CYBERCLASH
        </h1>
      </div>
    </div>
  </section>
));
HeroSection.displayName = "HeroSection";

// ─── AboutSection ─────────────────────────────────────────────────────────────

const AboutSection = forwardRef<HTMLElement, SectionProps>(({ isVisible }, ref) => (
  <section ref={ref} className="snap-section">
    <img
      src="https://api.builder.io/api/v1/image/assets/TEMP/afaf63533bd05a808ad77a28f089c42318a5ace3?width=3980"
      alt="Castle and warrior background"
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
    />
    <div style={{ position: "relative", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "0 1.5rem" }}>
      <div className={`section-content stagger-1${isVisible ? " visible" : " hidden-below"}`}>
        <h2
          className="font-hanalei"
          style={{ color: "white", textAlign: "center", marginBottom: "clamp(2rem, 4vw, 4rem)", fontSize: "clamp(3rem, 8vw, 6.5rem)" }}
        >
          About
        </h2>
      </div>
      <div className={`section-content stagger-2${isVisible ? " visible" : " hidden-below"}`} style={{ maxWidth: "80rem" }}>
        <p
          className="font-hanalei"
          style={{ color: "white", textAlign: "center", lineHeight: 1.5, fontSize: "clamp(1.25rem, 3vw, 3rem)", letterSpacing: "0.1em" }}
        >
          An interactive cybersecurity game designed to help users recognize, resist, and respond
          to real-world digital threats through hands on learning and gamification.
        </p>
      </div>
    </div>
  </section>
));
AboutSection.displayName = "AboutSection";

// ─── GameplaySection ──────────────────────────────────────────────────────────

const GameplaySection = forwardRef<HTMLElement, SectionProps>(({ isVisible }, ref) => (
  <section ref={ref} className="snap-section">
    <img
      src="https://api.builder.io/api/v1/image/assets/TEMP/d71646a038378d56481ada335695819537f1aeb4?width=3806"
      alt="Forest night background"
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
    />
    <div style={{ position: "relative", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "clamp(2rem, 4vw, 3.5rem) clamp(2rem, 4vw, 4rem)" }}>

      {/* Header row */}
      <div
        className={`section-content stagger-1${isVisible ? " visible" : " hidden-below"}`}
        style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-start", gap: "clamp(1rem, 3vw, 3rem)" }}
      >
        <h2 className="font-hanalei" style={{ color: "white", lineHeight: 1.1, flexShrink: 0, fontSize: "clamp(2rem, 5vw, 4rem)" }}>
          Gameplay<br />Features
        </h2>
        <p className="font-hanken" style={{ color: "white", fontSize: "clamp(1rem, 2vw, 1.6rem)", letterSpacing: "0.14em", lineHeight: 1.4, paddingTop: "0.25rem" }}>
          Discover all that Cyberclash has to offer with your companion by your side.
        </p>
      </div>

      {/* Features row */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "clamp(2rem, 4vw, 4rem)" }}>
        <div className={`section-content stagger-2${isVisible ? " visible" : " hidden-below"}`} style={{ flex: 1, minWidth: 260 }}>
          <p className="font-hanalei" style={{ color: "white", marginBottom: 8, fontSize: "clamp(1rem, 2vw, 1.5rem)", letterSpacing: "0.1em" }}>
            Phishing emails :
          </p>
          <p className="font-hanken" style={{ color: "white", fontSize: "clamp(0.85rem, 1.6vw, 1.4rem)", letterSpacing: "0.1em", lineHeight: 1.5 }}>
            Phishing emails are fake messages designed to looks like they come from trusted sources
            such as banks or companies. They trick users into clicking malicious links or sharing
            sensitive information like passwords and OTPs.
          </p>
        </div>
        <div className={`section-content stagger-3${isVisible ? " visible" : " hidden-below"}`} style={{ flex: 1, minWidth: 260, alignSelf: "flex-end" }}>
          <p className="font-hanalei" style={{ color: "white", marginBottom: 8, fontSize: "clamp(1rem, 2vw, 1.5rem)", letterSpacing: "0.1em" }}>
            Smishing :
          </p>
          <p className="font-hanken" style={{ color: "white", fontSize: "clamp(0.85rem, 1.6vw, 1.4rem)", letterSpacing: "0.1em", lineHeight: 1.5 }}>
            Smishing is a phishing attack carried out through SMS messages. These messages often
            create urgency, claiming issues like blocked accounts or prize winnings, and include
            links or numbers that lead to scam.
          </p>
        </div>
      </div>
    </div>
  </section>
));
GameplaySection.displayName = "GameplaySection";

// ─── ThreatsSection1 ─────────────────────────────────────────────────────────

const ThreatsSection1 = forwardRef<HTMLElement, SectionProps>(({ isVisible }, ref) => (
  <section ref={ref} className="snap-section">
    <img
      src="https://api.builder.io/api/v1/image/assets/TEMP/6420bf7c036bf95b1dd41001f760898876dd5a31?width=4148"
      alt="Forest deer background"
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
    />
    <div style={{ position: "relative", height: "100%", display: "grid", gridTemplateRows: "1fr 1fr 1fr", padding: "clamp(2rem, 3vw, 3rem) clamp(1.5rem, 4vw, 3.5rem)", gap: 16 }}>

      {/* Top: Suspicious pop-ups (left) */}
      <div style={{ display: "flex", alignItems: "flex-start" }}>
        <div className={`section-content stagger-1${isVisible ? " visible" : " hidden-below"}`} style={{ maxWidth: "min(42rem, 60%)" }}>
          <p className="font-hanalei" style={{ color: "white", marginBottom: 4, fontSize: "clamp(0.9rem, 1.8vw, 1.4rem)", letterSpacing: "0.1em" }}>Suspicious pop-ups :</p>
          <p className="font-hanken" style={{ color: "white", fontSize: "clamp(0.8rem, 1.5vw, 1.25rem)", letterSpacing: "0.1em", lineHeight: 1.5 }}>
            Suspicious pop-ups appears while browsing and may warn users about fake virus infections
            or system errors. Clicking them can lead to malware installation or redirection to malicious websites.
          </p>
        </div>
      </div>

      {/* Middle: Fake login pages (right) */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end" }}>
        <div className={`section-content stagger-2${isVisible ? " visible" : " hidden-below"}`} style={{ maxWidth: "min(42rem, 60%)" }}>
          <p className="font-hanalei" style={{ color: "white", marginBottom: 4, fontSize: "clamp(0.9rem, 1.8vw, 1.4rem)", letterSpacing: "0.1em" }}>Fake login pages :</p>
          <p className="font-hanken" style={{ color: "white", fontSize: "clamp(0.8rem, 1.5vw, 1.25rem)", letterSpacing: "0.1em", lineHeight: 1.5 }}>
            Fake login pages closely mimic real websites. When users enter their credentials,
            attackers capture the information and use it for unauthorized access.
          </p>
        </div>
      </div>

      {/* Bottom: Fraudulent transaction prompt (left) */}
      <div style={{ display: "flex", alignItems: "flex-end", paddingBottom: 16 }}>
        <div className={`section-content stagger-3${isVisible ? " visible" : " hidden-below"}`} style={{ maxWidth: "min(42rem, 60%)" }}>
          <p className="font-hanalei" style={{ color: "white", marginBottom: 4, fontSize: "clamp(0.9rem, 1.8vw, 1.4rem)", letterSpacing: "0.1em" }}>Fraudulent transaction prompt :</p>
          <p className="font-hanken" style={{ color: "white", fontSize: "clamp(0.8rem, 1.5vw, 1.25rem)", letterSpacing: "0.1em", lineHeight: 1.5 }}>
            These scam tricks users into approving requests or entering PINs by pretending to send
            refunds, rewards, or payments. Legitimate services never ask users to approve unknown transactions.
          </p>
        </div>
      </div>
    </div>
  </section>
));
ThreatsSection1.displayName = "ThreatsSection1";

// ─── ThreatsSection2 ─────────────────────────────────────────────────────────

const ThreatsSection2 = forwardRef<HTMLElement, SectionProps>(({ isVisible }, ref) => (
  <section ref={ref} className="snap-section">
    <img
      src="https://api.builder.io/api/v1/image/assets/TEMP/864f9ffcc8880b79cc99371170ed4eb3e721fb76?width=3910"
      alt="Pine trees forest background"
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
    />
    <div style={{ position: "relative", height: "100%", display: "grid", gridTemplateRows: "1fr 1fr 1fr", padding: "clamp(2rem, 3vw, 3rem) clamp(1.5rem, 4vw, 3.5rem)", gap: 16 }}>

      {/* Top: Malware download links (right) */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "flex-end" }}>
        <div className={`section-content stagger-1${isVisible ? " visible" : " hidden-below"}`} style={{ maxWidth: "min(42rem, 60%)" }}>
          <p className="font-hanalei" style={{ color: "white", marginBottom: 4, fontSize: "clamp(0.9rem, 1.8vw, 1.4rem)", letterSpacing: "0.1em" }}>Malware download links :</p>
          <p className="font-hanken" style={{ color: "white", fontSize: "clamp(0.8rem, 1.5vw, 1.25rem)", letterSpacing: "0.1em", lineHeight: 1.5 }}>
            Malware links disguise themselves as software updates, cracked apps, or free tools.
            Once downloaded, they can steal data, monitor activity, or damage the system.
          </p>
        </div>
      </div>

      {/* Middle: Social engineering (left) */}
      <div style={{ display: "flex", alignItems: "center" }}>
        <div className={`section-content stagger-2${isVisible ? " visible" : " hidden-below"}`} style={{ maxWidth: "min(42rem, 60%)" }}>
          <p className="font-hanalei" style={{ color: "white", marginBottom: 4, fontSize: "clamp(0.9rem, 1.8vw, 1.4rem)", letterSpacing: "0.1em" }}>Social engineering attempts :</p>
          <p className="font-hanken" style={{ color: "white", fontSize: "clamp(0.8rem, 1.5vw, 1.25rem)", letterSpacing: "0.1em", lineHeight: 1.5 }}>
            Social engineering attacks manipulate human emotions like fear, trust, or urgency.
            Attackers may pose as colleagues, support staff or official to convince victims to share confidential information.
          </p>
        </div>
      </div>

      {/* Bottom: Tagline (center) */}
      <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "center", paddingBottom: 24 }}>
        <div className={`section-content stagger-3${isVisible ? " visible" : " hidden-below"}`} style={{ textAlign: "center" }}>
          <p className="font-hanalei" style={{ color: "white", fontSize: "clamp(1.25rem, 3vw, 2.5rem)", letterSpacing: "0.15em" }}>
            learn to spot scams before they spot you!
          </p>
        </div>
      </div>
    </div>
  </section>
));
ThreatsSection2.displayName = "ThreatsSection2";

// ─── Page ─────────────────────────────────────────────────────────────────────

const SECTION_COUNT = 5;

export default function Page() {
  const [activeSection, setActiveSection] = useState(0);
  const [visibleSections, setVisibleSections] = useState(Array(SECTION_COUNT).fill(false));
  const sectionRefs = useRef(Array(SECTION_COUNT).fill(null));
  const containerRef = useRef(null);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    sectionRefs.current.forEach((section, index) => {
      if (!section) return;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry?.isIntersecting) {
            setActiveSection(index);
            setVisibleSections((prev) => {
              const next = [...prev];
              next[index] = true;
              return next;
            });
          }
        },
        { threshold: 0.4, root: containerRef.current }
      );
      observer.observe(section);
      observers.push(observer);
    });
    return () => observers.forEach((obs) => obs.disconnect());
  }, []);

  const scrollToSection = (index: number) => {
    sectionRefs.current[index]?.scrollIntoView({ behavior: "smooth" });
  };

  const setRef = (index: number) => (el: HTMLElement | null) => {
    sectionRefs.current[index] = el;
  };

  return (
    <>
      <style>{styles}</style>
      <div ref={containerRef} className="scroll-container">
        <HeroSection      ref={setRef(0)} isVisible={visibleSections[0]} />
        <AboutSection     ref={setRef(1)} isVisible={visibleSections[1]} />
        <GameplaySection  ref={setRef(2)} isVisible={visibleSections[2]} />
        <ThreatsSection1  ref={setRef(3)} isVisible={visibleSections[3]} />
        <ThreatsSection2  ref={setRef(4)} isVisible={visibleSections[4]} />
        <NavDots total={SECTION_COUNT} active={activeSection} onDotClick={scrollToSection} />
      </div>
    </>
  );
}