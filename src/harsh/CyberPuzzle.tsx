"use client";

import React, { useState, useRef, useCallback, useEffect, CSSProperties } from "react";

/* ═══════════════════════════════════════════════
    TYPES & INTERFACES
═══════════════════════════════════════════════ */

type NodeType = "attack" | "defense" | "concept";
type LineType = "solid" | "dotted";

interface CyberNode {
  id: string;
  label: string;
  icon: string;
  type: NodeType;
  x: number;
  y: number;
  desc: string;
}

interface Connection {
  from: string;
  to: string;
  lineType: LineType;
}

interface DrawnConnection extends Connection {
  key: string;
}

interface FlashMessage {
  msg: string;
  ok: boolean;
}

/* ═══════════════════════════════════════════════
    DATA
═══════════════════════════════════════════════ */

const NODES: CyberNode[] = [
  { id: "phishing",   label: "Phishing Attack",    icon: "🎣", type: "attack",   x: 6,   y: 8,   desc: "Deceptive emails/links to steal credentials" },
  { id: "ransomware",  label: "Ransomware",         icon: "🔒", type: "attack",   x: 4,   y: 28,  desc: "Encrypts victim files and demands payment" },
  { id: "ddos",        label: "DDoS Attack",        icon: "💥", type: "attack",   x: 8,   y: 50,  desc: "Floods servers to cause service outage" },
  { id: "sqli",        label: "SQL Injection",      icon: "💉", type: "attack",   x: 5,   y: 70,  desc: "Malicious SQL queries targeting databases" },
  { id: "mitm",        label: "Man-in-the-Middle",  icon: "👁", type: "attack",   x: 7,   y: 88,  desc: "Intercepts communication between two parties" },
  { id: "bruteforce",  label: "Brute Force",        icon: "🔨", type: "attack",   x: 22,  y: 18,  desc: "Systematically tries all password combinations" },
  { id: "zerodayx",    label: "Zero-Day Exploit",   icon: "⚡", type: "attack",   x: 20,  y: 62,  desc: "Targets unknown/unpatched vulnerabilities" },
  { id: "mfa",         label: "Multi-Factor Auth",  icon: "🛡", type: "defense",  x: 72,  y: 8,   desc: "Requires multiple verification steps to access" },
  { id: "av_edr",      label: "Antivirus / EDR",    icon: "🦠", type: "defense",  x: 75,  y: 28,  desc: "Detects and removes malicious software" },
  { id: "fw_cdn",      label: "Firewall / CDN",     icon: "🧱", type: "defense",  x: 71,  y: 50,  desc: "Filters traffic and absorbs volumetric attacks" },
  { id: "waf",         label: "WAF & Input Valid.",  icon: "🔍", type: "defense",  x: 73,  y: 70,  desc: "Sanitizes inputs and blocks injection attempts" },
  { id: "tls",         label: "TLS/SSL Encryption", icon: "🔐", type: "defense",  x: 74,  y: 88,  desc: "Encrypts data in transit end-to-end" },
  { id: "patch",       label: "Patch Management",   icon: "🩹", type: "defense",  x: 57,  y: 18,  desc: "Keeps software updated to fix known flaws" },
  { id: "pwpolicy",     label: "Password Policy",    icon: "🔑", type: "defense",  x: 60,  y: 62,  desc: "Enforces strong, unique password requirements" },
  { id: "awareness",   label: "Security Training",   icon: "📚", type: "concept",  x: 40,  y: 12,  desc: "Educating users to recognize threats" },
  { id: "backup",      label: "Backup Strategy",    icon: "💾", type: "concept",  x: 38,  y: 38,  desc: "Regular encrypted offsite data backups" },
  { id: "ids",         label: "IDS / IPS",          icon: "📡", type: "concept",  x: 42,  y: 62,  desc: "Monitors network for suspicious activity" },
  { id: "lockout",     label: "Account Lockout",    icon: "🚫", type: "concept",  x: 40,  y: 82,  desc: "Locks accounts after failed login attempts" },
];

const CORRECT_CONNECTIONS: Connection[] = [
  { from: "phishing",   to: "mfa",        lineType: "solid"  },
  { from: "phishing",   to: "awareness",  lineType: "solid"  },
  { from: "phishing",   to: "av_edr",     lineType: "dotted" },
  { from: "ransomware", to: "av_edr",     lineType: "solid"  },
  { from: "ransomware", to: "backup",     lineType: "solid"  },
  { from: "ransomware", to: "patch",      lineType: "dotted" },
  { from: "ddos",       to: "fw_cdn",     lineType: "solid"  },
  { from: "ddos",       to: "ids",        lineType: "dotted" },
  { from: "sqli",       to: "waf",        lineType: "solid"  },
  { from: "sqli",       to: "fw_cdn",     lineType: "dotted" },
  { from: "mitm",       to: "tls",        lineType: "solid"  },
  { from: "mitm",       to: "mfa",        lineType: "dotted" },
  { from: "bruteforce", to: "pwpolicy",   lineType: "solid"  },
  { from: "bruteforce", to: "lockout",    lineType: "solid"  },
  { from: "bruteforce", to: "mfa",        lineType: "dotted" },
  { from: "zerodayx",   to: "patch",      lineType: "solid"  },
  { from: "zerodayx",   to: "ids",        lineType: "dotted" },
  { from: "zerodayx",   to: "fw_cdn",     lineType: "dotted" },
];

const TOTAL = CORRECT_CONNECTIONS.length;

/* ═══════════════════════════════════════════════
    HELPERS
═══════════════════════════════════════════════ */
const nodeById = (id: string) => NODES.find((n) => n.id === id)!;
const connKey  = (a: string, b: string) => [a, b].sort().join("||");

function isCorrect(from: string, to: string, lineType: LineType): boolean {
  return CORRECT_CONNECTIONS.some(
    (c) =>
      ((c.from === from && c.to === to) || (c.from === to && c.to === from)) &&
      c.lineType === lineType
  );
}

function relationshipExists(from: string, to: string): boolean {
  return CORRECT_CONNECTIONS.some(
    (c) => (c.from === from && c.to === to) || (c.from === to && c.to === from)
  );
}

/* ═══════════════════════════════════════════════
    COMPONENT
═══════════════════════════════════════════════ */
export default function CyberPuzzle() {
  const svgRef = useRef<SVGSVGElement>(null);
  const boardRef = useRef<HTMLDivElement>(null);

  const [boardSize, setBoardSize] = useState({ w: 1200, h: 700 });
  const [drawn, setDrawn] = useState<DrawnConnection[]>([]);
  const [selecting, setSelecting] = useState<string | null>(null);
  const [lineType, setLineType] = useState<LineType>("solid");
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [flash, setFlash] = useState<FlashMessage | null>(null);
  const [hoverId, setHoverId] = useState<string | null>(null);
  const [tooltip, setTooltip] = useState<CyberNode | null>(null);
  const [completed, setCompleted] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);

  useEffect(() => {
    const measure = () => {
      if (boardRef.current) {
        const r = boardRef.current.getBoundingClientRect();
        setBoardSize({ w: r.width, h: r.height });
      }
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  useEffect(() => {
    if (drawn.length === TOTAL && !completed) setCompleted(true);
  }, [drawn, completed]);

  const nodePos = useCallback(
    (node: CyberNode) => ({
      x: (node.x / 100) * boardSize.w,
      y: (node.y / 100) * boardSize.h,
    }),
    [boardSize]
  );

  const getSVGMouse = useCallback((e: React.MouseEvent | MouseEvent) => {
    const rect = svgRef.current?.getBoundingClientRect();
    if (!rect) return { x: 0, y: 0 };
    return { x: e.clientX - rect.left, y: e.clientY - rect.top };
  }, []);

  const triggerFlash = (msg: string, ok: boolean) => {
    setFlash({ msg, ok });
    setTimeout(() => setFlash(null), 2200);
  };

  const handleNodeClick = useCallback(
    (e: React.MouseEvent, id: string) => {
      e.stopPropagation();
      if (!selecting) {
        setSelecting(id);
        return;
      }
      if (selecting === id) {
        setSelecting(null);
        return;
      }

      const from = selecting;
      const to = id;
      setSelecting(null);

      const key = connKey(from, to);

      if (drawn.find((d) => d.key === key)) {
        triggerFlash("⚠ Connection already exists!", false);
        return;
      }

      if (!relationshipExists(from, to)) {
        triggerFlash("✗ No relationship between these nodes.", false);
        return;
      }

      if (!isCorrect(from, to, lineType)) {
        const rightType = CORRECT_CONNECTIONS.find(
          (c) => (c.from === from && c.to === to) || (c.from === to && c.to === from)
        )?.lineType;
        triggerFlash(
          `✗ Wrong line type! Use ${rightType === "solid" ? "─── Solid" : "··· Dotted"} for this link.`,
          false
        );
        return;
      }

      setDrawn((prev) => [...prev, { key, from, to, lineType }]);
      triggerFlash(
        lineType === "solid" ? "✔ Direct relationship connected!" : "✔ Indirect relationship connected!",
        true
      );
    },
    [selecting, drawn, lineType]
  );

  const removeDrawn = (key: string) => setDrawn((prev) => prev.filter((d) => d.key !== key));

  const reset = () => {
    setDrawn([]);
    setSelecting(null);
    setCompleted(false);
    setShowAnswer(false);
  };

  const revealAnswer = () => {
    const allDrawn: DrawnConnection[] = CORRECT_CONNECTIONS.map((c) => ({
      key: connKey(c.from, c.to),
      from: c.from,
      to: c.to,
      lineType: c.lineType,
    }));
    setDrawn(allDrawn);
    setShowAnswer(true);
    setCompleted(true);
  };

  const score = drawn.length;
  const pct = Math.round((score / TOTAL) * 100);

  const typeStyle: Record<NodeType, { border: string; bg: string; glow: string; text: string; badge: string }> = {
    attack: { border: "#ff4060", bg: "rgba(255,64,96,0.12)", glow: "#ff406066", text: "#ff7090", badge: "#ff4060" },
    defense: { border: "#00e87a", bg: "rgba(0,232,122,0.10)", glow: "#00e87a66", text: "#00e87a", badge: "#00e87a" },
    concept: { border: "#f5c518", bg: "rgba(245,197,24,0.10)", glow: "#f5c51866", text: "#f5c518", badge: "#f5c518" },
  };

  return (
    <div style={styles.root}>
      <div style={styles.gridBg} />
      <div style={styles.vignette} />

      <header style={styles.header}>
        <div>
          <div style={styles.headerEyebrow}>CYBERSECURITY RELATIONSHIP PUZZLE</div>
          <div style={styles.headerTitle}>CONNECT THE THREATS</div>
        </div>
        <div style={styles.headerRight}>
          <Legend />
          <div style={styles.scoreBox}>
            <div style={styles.scoreNum}>
              {score}
              <span style={{ fontSize: 14, color: "#aaa" }}>/{TOTAL}</span>
            </div>
            <div style={styles.scoreBar}>
              <div style={{ ...styles.scoreBarFill, width: `${pct}%` }} />
            </div>
            <div style={{ fontSize: 10, color: "#888", letterSpacing: "0.1em" }}>{pct}% COMPLETE</div>
          </div>
        </div>
      </header>

      <div style={styles.toolbar}>
        <div style={styles.toolbarSection}>
          <span style={styles.toolLabel}>LINE TYPE:</span>
          <button style={toolBtn(lineType === "solid", "#00e87a")} onClick={() => setLineType("solid")}>
            <svg width="28" height="4">
              <line x1="0" y1="2" x2="28" y2="2" stroke="currentColor" strokeWidth="2.5" />
            </svg>
            SOLID — Direct
          </button>
          <button style={toolBtn(lineType === "dotted", "#f5c518")} onClick={() => setLineType("dotted")}>
            <svg width="28" height="4">
              <line x1="0" y1="2" x2="28" y2="2" stroke="currentColor" strokeWidth="2.5" strokeDasharray="4 3" />
            </svg>
            DOTTED — Indirect
          </button>
        </div>
        <div style={styles.toolbarSection}>
          <button style={toolBtn(false, "#ff4060")} onClick={reset}>↺ RESET</button>
          <button style={toolBtn(false, "#aaa")} onClick={revealAnswer}>⚑ SHOW ANSWERS</button>
        </div>
      </div>

      {flash && (
        <div
          style={{
            ...styles.flash,
            background: flash.ok ? "rgba(0,232,122,0.18)" : "rgba(255,64,96,0.18)",
            borderColor: flash.ok ? "#00e87a" : "#ff4060",
            color: flash.ok ? "#00e87a" : "#ff4060",
          }}
        >
          {flash.msg}
        </div>
      )}

      {completed && (
        <div style={styles.completeBanner}>
          🎉 All relationships mapped correctly! Score: {score}/{TOTAL}
          <button style={{ marginLeft: 16, ...toolBtn(false, "#fff") }} onClick={reset}>
            Play Again
          </button>
        </div>
      )}

      <div ref={boardRef} style={styles.board}>
        <svg
          ref={svgRef}
          style={styles.svg}
          onMouseMove={(e) => setMouse(getSVGMouse(e))}
          onClick={() => { if (selecting) setSelecting(null); }}
        >
          <defs>
            {(["attack", "defense", "concept"] as NodeType[]).map((t) => (
              <filter key={t} id={`glow-${t}`}>
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            ))}
            <marker id="arr-solid" markerWidth="7" markerHeight="7" refX="5" refY="3.5" orient="auto">
              <path d="M0,0 L7,3.5 L0,7 Z" fill="#00e87a" opacity="0.8" />
            </marker>
            <marker id="arr-dotted" markerWidth="7" markerHeight="7" refX="5" refY="3.5" orient="auto">
              <path d="M0,0 L7,3.5 L0,7 Z" fill="#f5c518" opacity="0.8" />
            </marker>
          </defs>

          {showAnswer &&
            CORRECT_CONNECTIONS.map((c) => {
              const A = nodePos(nodeById(c.from));
              const B = nodePos(nodeById(c.to));
              return (
                <line
                  key={`ghost-${c.from}-${c.to}`}
                  x1={A.x} y1={A.y} x2={B.x} y2={B.y}
                  stroke={c.lineType === "solid" ? "#00e87a" : "#f5c518"}
                  strokeWidth={1.5}
                  strokeDasharray={c.lineType === "dotted" ? "6 4" : "none"}
                  opacity={0.2}
                />
              );
            })}

          {drawn.map(({ key, from, to, lineType: lt }) => {
            const A = nodePos(nodeById(from));
            const B = nodePos(nodeById(to));
            const isSolid = lt === "solid";
            const mx = (A.x + B.x) / 2;
            const my = (A.y + B.y) / 2;
            return (
              <g key={key} onClick={(e) => { e.stopPropagation(); removeDrawn(key); }} style={{ cursor: "pointer" }}>
                <line x1={A.x} y1={A.y} x2={B.x} y2={B.y} stroke="transparent" strokeWidth={18} />
                <line
                  x1={A.x} y1={A.y} x2={B.x} y2={B.y}
                  stroke={isSolid ? "#00e87a" : "#f5c518"}
                  strokeWidth={isSolid ? 2.5 : 2}
                  strokeDasharray={isSolid ? "none" : "7 5"}
                  opacity={0.85}
                  filter={`url(#glow-defense)`}
                  markerEnd={isSolid ? "url(#arr-solid)" : "url(#arr-dotted)"}
                />
                <circle cx={mx} cy={my} r={6} fill="#0d1117" stroke={isSolid ? "#00e87a" : "#f5c518"} strokeWidth={1.5} opacity={0.9} />
                <text x={mx} y={my + 1} textAnchor="middle" dominantBaseline="middle" fontSize={8} fill={isSolid ? "#00e87a" : "#f5c518"} style={{ pointerEvents: "none" }}>✕</text>
              </g>
            );
          })}

          {selecting && (() => {
            const srcNode = nodeById(selecting);
            const A = nodePos(srcNode);
            return (
              <line
                x1={A.x} y1={A.y} x2={mouse.x} y2={mouse.y}
                stroke={lineType === "solid" ? "#00e87a" : "#f5c518"}
                strokeWidth={2}
                strokeDasharray={lineType === "dotted" ? "7 5" : "none"}
                opacity={0.5}
                style={{ pointerEvents: "none" }}
              />
            );
          })()}
        </svg>

        {NODES.map((node) => {
          const pos = nodePos(node);
          const ts = typeStyle[node.type];
          const isSel = selecting === node.id;
          const isHov = hoverId === node.id;
          const connCount = drawn.filter((d) => d.from === node.id || d.to === node.id).length;
          return (
            <div
              key={node.id}
              onClick={(e) => handleNodeClick(e, node.id)}
              onMouseEnter={() => { setHoverId(node.id); setTooltip(node); }}
              onMouseLeave={() => { setHoverId(null); setTooltip(null); }}
              style={{
                ...styles.nodeCard,
                left: pos.x,
                top: pos.y,
                transform: "translate(-50%,-50%)",
                background: isSel ? `${ts.bg.replace("0.1", "0.25")}` : ts.bg,
                border: `1.5px solid ${isSel ? ts.border : isHov ? ts.border : ts.border + "88"}`,
                boxShadow: isSel
                  ? `0 0 0 3px ${ts.border}55, 0 0 20px ${ts.border}44, 0 4px 20px rgba(0,0,0,0.5)`
                  : isHov
                  ? `0 0 12px ${ts.glow}, 0 4px 20px rgba(0,0,0,0.5)`
                  : `0 4px 16px rgba(0,0,0,0.4)`,
                cursor: selecting && selecting !== node.id ? "crosshair" : "pointer",
                zIndex: isSel || isHov ? 20 : 10,
              }}
            >
              <div style={{ ...styles.typeBadge, background: `${ts.badge}22`, color: ts.badge, borderColor: `${ts.badge}55` }}>
                {node.type.toUpperCase()}
              </div>
              <div style={styles.nodeIcon}>{node.icon}</div>
              <div style={{ ...styles.nodeLabel, color: ts.text }}>{node.label}</div>
              {connCount > 0 && (
                <div style={{ ...styles.connDot, background: ts.badge }}>
                  {connCount}
                </div>
              )}
              {isSel && (
                <div style={{ ...styles.selRing, borderColor: ts.border, boxShadow: `0 0 0 4px ${ts.border}33` }} />
              )}
            </div>
          );
        })}

        {tooltip && (() => {
          const pos = nodePos(tooltip);
          const ts = typeStyle[tooltip.type];
          return (
            <div style={{ ...styles.tooltip, left: pos.x + 90, top: pos.y - 10, borderColor: ts.border + "66" }}>
              <div style={{ color: ts.text, fontSize: 12, fontWeight: "bold", marginBottom: 4 }}>
                {tooltip.icon} {tooltip.label}
              </div>
              <div style={{ color: "#aaa", fontSize: 11, lineHeight: 1.5 }}>{tooltip.desc}</div>
            </div>
          );
        })()}
      </div>

      <footer style={styles.footer}>
        <span style={{ color: "#555" }}>①</span> Select line type &nbsp;·&nbsp;
        <span style={{ color: "#555" }}>②</span> Click source node &nbsp;·&nbsp;
        <span style={{ color: "#555" }}>③</span> Click target node &nbsp;·&nbsp;
        <span style={{ color: "#555" }}>④</span> Click a drawn line to remove it
      </footer>

      <style>{globalCSS}</style>
    </div>
  );
}

function Legend() {
  return (
    <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
      {(["attack", "defense", "concept"] as const).map((type) => {
        const colors: Record<string, string> = { attack: "#ff4060", defense: "#00e87a", concept: "#f5c518" };
        return (
          <div key={type} style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <div style={{ width: 10, height: 10, borderRadius: 2, background: colors[type], boxShadow: `0 0 6px ${colors[type]}` }} />
            <span style={{ color: "#888", fontSize: 11, letterSpacing: "0.08em" }}>{type.charAt(0).toUpperCase() + type.slice(1)}</span>
          </div>
        );
      })}
      <div style={{ borderLeft: "1px solid #333", paddingLeft: 16, display: "flex", gap: 14 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <svg width="24" height="4"><line x1="0" y1="2" x2="24" y2="2" stroke="#00e87a" strokeWidth="2" /></svg>
          <span style={{ color: "#888", fontSize: 11 }}>Direct</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <svg width="24" height="4"><line x1="0" y1="2" x2="24" y2="2" stroke="#f5c518" strokeWidth="2" strokeDasharray="4 3" /></svg>
          <span style={{ color: "#888", fontSize: 11 }}>Indirect</span>
        </div>
      </div>
    </div>
  );
}

const toolBtn = (active: boolean, color: string): CSSProperties => ({
  display: "flex", alignItems: "center", gap: 8,
  padding: "6px 14px", borderRadius: 4,
  border: `1.5px solid ${active ? color : color + "44"}`,
  background: active ? `${color}1a` : "transparent",
  color: active ? color : color + "99",
  fontFamily: "'Courier New', monospace",
  fontSize: 11, letterSpacing: "0.1em",
  cursor: "pointer",
  transition: "all 0.15s",
  whiteSpace: "nowrap",
});

const styles: Record<string, CSSProperties> = {
  root: { minHeight: "100vh", background: "#060b12", fontFamily: "'Courier New', monospace", display: "flex", flexDirection: "column", overflow: "hidden", position: "relative" },
  gridBg: { position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0, backgroundImage: `linear-gradient(rgba(0,232,122,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(0,232,122,0.025) 1px, transparent 1px)`, backgroundSize: "48px 48px" },
  vignette: { position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0, background: "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.7) 100%)" },
  header: { position: "relative", zIndex: 10, display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 28px 10px", borderBottom: "1px solid #1a2a1a", background: "rgba(6,11,18,0.9)", backdropFilter: "blur(8px)", flexShrink: 0 },
  headerEyebrow: { fontSize: 9, letterSpacing: "0.35em", color: "#00e87a99", textTransform: "uppercase", marginBottom: 2 },
  headerTitle: { fontSize: 20, fontWeight: "bold", color: "#e8e8e8", letterSpacing: "0.06em", textShadow: "0 0 30px rgba(0,232,122,0.2)" },
  headerRight: { display: "flex", alignItems: "center", gap: 24 },
  scoreBox: { display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 4 },
  scoreNum: { fontSize: 22, fontWeight: "bold", color: "#00e87a", fontVariantNumeric: "tabular-nums" },
  scoreBar: { width: 120, height: 4, background: "#1a2a1a", borderRadius: 2, overflow: "hidden" },
  scoreBarFill: { height: "100%", background: "linear-gradient(90deg, #00e87a, #00ff99)", borderRadius: 2, transition: "width 0.4s ease", boxShadow: "0 0 8px #00e87a" },
  toolbar: { position: "relative", zIndex: 10, display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 28px", background: "rgba(6,11,18,0.8)", borderBottom: "1px solid #111d11", flexShrink: 0, gap: 12 },
  toolbarSection: { display: "flex", alignItems: "center", gap: 10 },
  toolLabel: { fontSize: 10, letterSpacing: "0.2em", color: "#445", marginRight: 4 },
  flash: { position: "fixed", top: 90, left: "50%", transform: "translateX(-50%)", zIndex: 100, border: "1px solid", borderRadius: 6, padding: "10px 24px", fontSize: 13, letterSpacing: "0.05em", backdropFilter: "blur(8px)", animation: "fadeInOut 2.2s ease forwards", whiteSpace: "nowrap" },
  completeBanner: { position: "fixed", top: 0, left: 0, right: 0, zIndex: 200, background: "linear-gradient(90deg, #003322, #004433, #003322)", borderBottom: "2px solid #00e87a", color: "#00e87a", fontSize: 16, letterSpacing: "0.08em", padding: "12px 28px", display: "flex", alignItems: "center", animation: "slideDown 0.4s ease", boxShadow: "0 4px 30px rgba(0,232,122,0.2)" },
  board: { flex: 1, position: "relative", overflow: "hidden", cursor: "default" },
  svg: { position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "all" },
  nodeCard: { position: "absolute", width: 138, borderRadius: 7, padding: "10px 12px 9px", backdropFilter: "blur(6px)", transition: "box-shadow 0.15s, border-color 0.15s, background 0.15s", userSelect: "none" },
  typeBadge: { display: "inline-block", fontSize: 8, letterSpacing: "0.15em", padding: "1px 5px", borderRadius: 3, border: "1px solid", marginBottom: 6 },
  nodeIcon: { fontSize: 18, marginBottom: 4, lineHeight: 1 },
  nodeLabel: { fontSize: 11, fontWeight: "bold", letterSpacing: "0.04em", lineHeight: 1.35 },
  connDot: { position: "absolute", top: -7, right: -7, width: 18, height: 18, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: "bold", color: "#000" },
  selRing: { position: "absolute", inset: -5, borderRadius: 10, border: "2px dashed", pointerEvents: "none", animation: "spinRing 3s linear infinite" },
  tooltip: { position: "absolute", zIndex: 50, background: "rgba(8,14,24,0.97)", border: "1px solid", borderRadius: 6, padding: "10px 14px", maxWidth: 210, pointerEvents: "none", boxShadow: "0 4px 24px rgba(0,0,0,0.6)" },
  footer: { position: "relative", zIndex: 10, padding: "8px 28px", borderTop: "1px solid #111d11", fontSize: 11, color: "#444", letterSpacing: "0.08em", background: "rgba(6,11,18,0.9)", flexShrink: 0 },
};

const globalCSS = `
  @keyframes fadeInOut {
    0%   { opacity: 0; transform: translateX(-50%) translateY(-8px); }
    15%  { opacity: 1; transform: translateX(-50%) translateY(0); }
    75%  { opacity: 1; }
    100% { opacity: 0; transform: translateX(-50%) translateY(-4px); }
  }
  @keyframes spinRing {
    from { transform: rotate(0deg); }
    to   { transform: rotate(360deg); }
  }
  @keyframes slideDown {
    from { transform: translateY(-100%); }
    to   { transform: translateY(0); }
  }
`;