import { useState, useEffect, useRef, useCallback } from "react";

/* ═══════════════════════════════════════════════════
   DATA
   ═══════════════════════════════════════════════════ */
const PROFILE = {
  name: "Ayat Mohamed",
  role: "Software Engineer",
  org: "e& Egypt",
  email: "Ayatmohamed2372002@gmail.com",
  phone: "+201011639551",
  github: "https://github.com/Ayat237",
  linkedin: "https://linkedin.com/in/ayat-mohamed-35214221b/",
  resume: "https://drive.google.com/file/d/17xmbpwzMqqLgAv9yWeov3vTOXc-MRgwc/view?usp=sharing",
  tagline: "Building systems, and exploring how technology works from the inside out while continuously learning and evolving.",
  bio: "Java Software Engineer specialized in backend and microservices development using Spring Boot, Spring Cloud, and Spring Security. Focused on building secure, scalable, cloud-ready systems using Docker and Kubernetes, with hands-on experience in authentication, authorization, and distributed system design. Experienced in applying CI/CD practices and modern containerization workflows.",
  bio2: "I believe great software starts with a deep understanding of the problem — not the framework. I'm passionate about clean code, resilience patterns, and modern Java frameworks, and about building things teams can confidently maintain years after the initial commit.",
  principles: [
    "Understand the problem deeply before writing any code.",
    "Write clear requirements and technical understanding first.",
    "Design for scalability and resilience from the start.",
    "Prioritize security at every layer.",
    "Build maintainable systems with clean abstractions.",
    "Ship iteratively, measure results, then improve.",
  ],
  focusAreas: [
    "Security-first backend architecture",
    "Scalable system design patterns",
    "Distributed systems observability",
    "Clean APIs and integration contracts",
    "Production-grade reliability",
  ],
  interests: ["Distributed Systems", "System Design", "API Design", "Open Source Systems (SSO)", "Cloud Architecture", "AI / LLM Integration", "System Security", "Integration Tools"],
  location: "Cairo, Egypt",
  languages: ["Arabic (Native)", "English (Conversational)"],
};

const BOOT_LINES = [
  "[ OK ] kernel: initializing core systems",
  "[ OK ] mount: /home/ayat ready",
  "[ OK ] service: software-engineer.service started",
  "[ OK ] profile: Ayat Mohamed loaded",
  "[ OK ] status: all systems operational",
];

const EXPERIENCE = [
  {
    company: "e& (Etisalat) Egypt", role: "Software Engineer",
    period: "Apr 2026 – Present", type: "Hybrid", current: true, hash: "f8a3c21", branch: "main",
    bullets: [
      "Backend development and system enhancements for enterprise-scale applications.",
      "Developing and integrating a chatbot system for automated customer interactions.",
      "Collaborating with cross-functional teams on scalable system architecture.",
      "Contributing to system integration, performance tuning, and reliability improvements.",
    ],
    tech: ["Java", "Spring Boot", "Chatbot", "System Integration", "Agile"],
  },
  {
    company: "Freelance — Khamsat & Mostaql", role: "Software Engineer",
    period: "Apr 2026 – Present", type: "Remote", current: true, hash: "b3d9a72", branch: "feat/freelance",
    bullets: [
      "Scoped, priced, and delivered client projects end-to-end — proposals, schema design, and API planning.",
      "Built a full-stack CRM system for an eyewear retail client with AI-powered features, from proposal through architecture.",
      "Designed a Node.js chat backend with real-time messaging via Socket.io, a MySQL data layer, and an admin dashboard.",
    ],
    tech: ["Node.js", "Express.js", "Socket.io", "MySQL", "MongoDB", "PostgreSQL", "HTML", "CSS", "JavaScript", "React", "API Integration"],
  },
  {
    company: "Darkmon", role: "Java Software Engineer — Backend",
    period: "Dec 2025 – Apr 2026", type: "Remote", current: false, hash: "e7b4d09", branch: "main",
    bullets: [
      "Designed the system architecture and data model of a Threat Intelligence Platform for tracking ransomware attacks.",
      "Built backend features for processing, managing, and analyzing threat intelligence data.",
      "Integrated OpenAI, Google Gemini, and CompanyEnrich APIs to enrich and enhance security intelligence data.",
      "Developed graph-based relationships between entities and implemented a geospatial mapping feature for visual data representation.",
      "Implemented full-text search using Elasticsearch and supported multi-format data export (JSON, PDF, CSV, XLSX).",
      "Contributed to writing high-level and low-level requirement documents and collaborated in an Agile environment with cross-functional teams."

    ],
    tech: ["Java", "Spring Boot", "REST APIs", "Elasticsearch", "PostgreSQL", "OpenAI", "Gemini", "API Integrations", "Agile"],
  },
];

const PROJECTS = [
  {
    id: "zencare", num: "01", cat: "Graduation Project", name: "ZenCare", type: "AI-Powered Healthcare Platform", period: "Aug 2024 – Jul 2025",
    desc: "Full-stack healthcare app with telemedicine, prescription management, and medication tracking. Real-time video consultations via Jitsi Meet, an AI-powered chatbot for symptom analysis and lab results, and secure patient data handling with encryption and doctor verification.",
    tech: ["React Native", "TypeScript", "Node.js", "MongoDB", "Redis", "JWT", "Docker", "Cloudinary", "OpenStreetMap API", "Stripe", "Webhook", "AES-CBC256"],
    github: "https://github.com/Ayat237/FS_ZenCare",
  },
  {
    id: "banking", num: "02", cat: "Microservices", name: "Banking System", type: "Distributed Microservices Architecture", period: "Nov 2025",
    desc: "Distributed banking system with independent services for Accounts, Loans, and Cards using RESTful communication. Eureka service discovery, centralized Config Server, Spring Security (JWT & OAuth2), Resilience4j fault tolerance, deployed on Docker and Kubernetes.",
    tech: ["Java", "Spring Boot", "Spring Cloud", "Spring Security", "Eureka", "Config Server", "API Gateway", "Resilience4j", "Docker", "Kubernetes"],
    github: "https://github.com/Ayat237/Banking-System",
  },
  {
    id: "atm", num: "03", cat: "Backend", name: "ATM Simulator", type: "Spring Boot Application", period: "Jul 2025",
    desc: "Role-based ATM application for Admin and User roles with secure authentication and registration. Supports deposits, withdrawals, fund transfers, transaction history, and account logs — admins can create, update, and delete accounts and monitor all users and transactions.",
    tech: ["Java", "Spring Boot", "Spring Security (JWT)", "Liquibase", "MySQL", "JPA/Hibernate", "OOP", "Java Streams & Lambdas"],
    github: "https://github.com/Ayat237/ATM-Simulator",
  },
  {
    id: "jobportal", num: "04", cat: "Full Stack", name: "Job Portal", type: "Full-Stack Java Web Application", period: "Oct 2025",
    desc: "Connecting recruiters and job seekers with role-based access. Features job posting, job search, application tracking, resume upload for candidates, and resume download for recruiters, with secure authentication.",
    tech: ["Java", "Spring Boot", "Spring Security", "JPA/Hibernate", "Thymeleaf", "HTML/CSS", "MySQL", "Maven"],
    github: "https://github.com/Ayat237/Job-portal",
  },
];

const SKILL_GROUPS = [
  { title: "Core Java Stack", icon: "◆", items: ["Java 8+", "Spring Boot", "Spring Security", "Spring Cloud", "Spring MVC", "JPA / Hibernate", "RESTful APIs", "Maven", "Thymeleaf", "JDBC", "AOP"] },
  { title: "Microservices & Cloud", icon: "◇", items: ["Spring Cloud (Eureka)", "Config Server", "API Gateway", "Resilience4j", "Docker", "Kubernetes", "Helm", "RabbitMQ", "Kafka", "Prometheus", "Grafana"] },
  { title: "Security & Auth", icon: "▲", items: ["JWT", "OAuth2", "OpenID Connect", "Keycloak", "CSRF / CORS", "Password Encoders", "Method-Level Security", "Custom Filters"] },
  { title: "Databases", icon: "▣", items: ["MySQL", "PostgreSQL", "MongoDB", "SQLite", "Liquibase", "Elasticsearch"] },
  { title: "DevOps & Tools", icon: "⚒", items: ["Git / GitHub", "Docker", "CI/CD", "GCP / Kubernetes", "Postman", "Apidog", "IntelliJ IDEA", "VS Code", "Jira"] },
  { title: "Architecture & Principles", icon: "▦", items: ["Microservices Architecture", "Service Discovery", "Containerization", "API Gateway", "OOP", "SOLID", "Design Patterns"] },
  { title: "Other Languages", icon: "⌥", items: ["Python", "JavaScript", "TypeScript", "C", "C++", "Go"] },
  { title: "Methodologies", icon: "◎", items: ["Agile / Scrum", "Data Structures & Algorithms", "Prompt Engineering"] },
];

const RADAR_SKILLS = [
  { name: "Java", ring: 0 }, { name: "Spring Boot", ring: 0 }, { name: "Microservices", ring: 0 },
  { name: "REST APIs", ring: 0 }, { name: "Spring Security", ring: 0 }, { name: "JPA/Hibernate", ring: 0 }, { name: "Docker", ring: 0 },
  { name: "Kubernetes", ring: 1 }, { name: "PostgreSQL", ring: 1 }, { name: "MySQL", ring: 1 },
  { name: "MongoDB", ring: 1 }, { name: "Redis", ring: 1 }, { name: "JWT", ring: 1 }, { name: "Elasticsearch", ring: 1 },
  { name: "Kafka", ring: 2 }, { name: "Prometheus", ring: 2 }, { name: "Grafana", ring: 2 },
  { name: "Go", ring: 2 }, { name: "Python", ring: 2 }, { name: "RabbitMQ", ring: 2 }, { name: "Helm", ring: 2 },
].map((s, i, arr) => {
  const ringItems = arr.filter(x => x.ring === s.ring);
  const idxInRing = ringItems.findIndex(x => x.name === s.name);
  return { ...s, angle: (360 / ringItems.length) * idxInRing + s.ring * 17 };
});

const EDUCATION = [
  { school: "Helwan University", faculty: "Faculty of Engineering", degree: "M.Sc. Software Engineering", period: "Oct 2025 – Present", note: null, current: true },
  { school: "Helwan University", faculty: "Faculty of Engineering", degree: "B.Sc. Computer and Systems Engineering", period: "Oct 2020 – Jun 2025", note: "Grade: Excellent (85.4%) · Graduation Project: Excellent", current: false },
];

const CERTIFICATIONS = [
  { name: "Master Microservices with Spring Boot, Docker, Kubernetes", issuer: "Udemy", date: "May 2026" },
  { name: "Spring Boot 3, Spring 6 & Hibernate", issuer: "Udemy", date: "Sep 2025" },
  { name: "Java Programming", issuer: "Udemy", date: "Jul 2025" },
  { name: "Backend Node.js", issuer: "Route Academy", date: "Aug 2024" },
  { name: "Web Development Challenger Track", issuer: "Udacity", date: "Aug 2022" },
];

const VOLUNTEER = [
  { org: "Pixels Egypt", role: "Vice Head — Academic Instructor", period: "Aug 2023 – Jul 2024 · Helwan University", initial: "P", bullets: ["Supervised Embedded Systems, Web, Arduino, and Network teams.", "Instructed Embedded Systems programming with team members.", "Contributed to developing the team's skills, and acquired leadership and organizational skills."] },
  { org: "GDSC — Google Developer Student Clubs", role: "Co-Lead & Technical Head", period: "Aug 2022 – Sep 2023 · Helwan University", initial: "G", bullets: ["Gained professional experience in software development and a deep understanding of technology.", "Supervised 5 heads of core members, and managed time efficiently to complete all tasks within deadlines.", "Gained leadership skills by managing the team and their projects from start to end."] },
];

const TERMINAL_COMMANDS = {
  help: () => `Available commands:\n  about          — who I am\n  skills         — tech stack overview\n  projects       — what I've built\n  experience     — work history\n  education      — academic background\n  certifications — what I've earned\n  volunteer      — community roles\n  contact        — reach me\n  interests      — what excites me\n  whoami         — quick identity check\n  banner         — print name banner\n  sudo           — try it\n  clear          — clear terminal`,
  about: () => `${PROFILE.name} — ${PROFILE.role} @ ${PROFILE.org}\n\n${PROFILE.bio}\n\n${PROFILE.bio2}`,
  skills: () => SKILL_GROUPS.map(g => `${g.icon} ${g.title}\n  ${g.items.join(" · ")}`).join("\n\n"),
  projects: () => PROJECTS.map(p => `[${p.num}] ${p.name} — ${p.type}\n  ${p.desc.slice(0, 90)}...`).join("\n\n"),
  experience: () => EXPERIENCE.map(e => `${e.hash} (${e.branch}) ${e.company} — ${e.role}\n  ${e.period} · ${e.type}\n  ${e.bullets[0]}`).join("\n\n"),
  education: () => EDUCATION.map(e => `${e.degree}\n  ${e.school} · ${e.period}${e.note ? `\n  ${e.note}` : ""}`).join("\n\n"),
  certifications: () => CERTIFICATIONS.map(c => `✓ ${c.name}\n  ${c.issuer} · ${c.date}`).join("\n\n"),
  volunteer: () => VOLUNTEER.map(v => `${v.initial} ${v.org}\n  ${v.role}\n  ${v.period}`).join("\n\n"),
  contact: () => `Email:    ${PROFILE.email}\nPhone:    ${PROFILE.phone}\nGitHub:   ${PROFILE.github}\nLinkedIn: ${PROFILE.linkedin}`,
  interests: () => `Current focus areas:\n${PROFILE.interests.map(i => `  → ${i}`).join("\n")}`,
  whoami: () => `ayat — backend engineer who thinks in systems, not just code.`,
  banner: () => `┌──────────────────────────────┐\n│        AYAT MOHAMED           │\n│     SOFTWARE ENGINEER         │\n└──────────────────────────────┘`,
  sudo: () => `User ayat is not in the sudoers file. This incident will be reported. (not really — but nice try)`,
};

/* ═══════════════════════════════════════════════════
   THEME — muted, quieter caramel/sand on near-black
   ═══════════════════════════════════════════════════ */
const T = {
  accent: "#ffb454", accentSec: "#e2933f", accentMuted: "#6b4423",
  accentDim: "rgba(255,180,84,0.10)", accentGlow: "rgba(255,180,84,0.06)",
  bg: "#0a0908", surface: "#141210", elevated: "#1c1814", border: "#2a241f",
  text: "#ece4d8", textSoft: "rgba(236,228,216,0.66)", textDim: "rgba(236,228,216,0.36)",
  danger: "#c4715a",
  font: "'Space Grotesk', sans-serif", mono: "'JetBrains Mono', monospace",
};

/* ═══════════════════════════════════════════════════
   ICONS — minimal inline SVGs
   ═══════════════════════════════════════════════════ */
const IconMail = (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...p}><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,12 2,6" /></svg>;
const IconGithub = (p) => <svg viewBox="0 0 24 24" fill="currentColor" {...p}><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22" /></svg>;
const IconLinkedin = (p) => <svg viewBox="0 0 24 24" fill="currentColor" {...p}><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" /><circle cx="4" cy="4" r="2" /></svg>;
const IconDoc = (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...p}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14,2 14,8 20,8" /></svg>;
const IconShield = (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" {...p}><path d="M12 2l8 4v6c0 5-3.5 7.5-8 9-4.5-1.5-8-4-8-9V6l8-4z" /></svg>;
const IconLayers = (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" {...p}><path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 12l10 5 10-5" /><path d="M2 17l10 5 10-5" /></svg>;
const IconEye = (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" {...p}><path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7z" /><circle cx="12" cy="12" r="3" /></svg>;
const IconLink = (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" {...p}><path d="M10 13a5 5 0 0 0 7.07 0l3-3a5 5 0 0 0-7.07-7.07l-1.5 1.5" /><path d="M14 11a5 5 0 0 0-7.07 0l-3 3a5 5 0 0 0 7.07 7.07l1.5-1.5" /></svg>;
const IconCheckShield = (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" {...p}><path d="M12 2l8 4v6c0 5-3.5 7.5-8 9-4.5-1.5-8-4-8-9V6l8-4z" /><path d="M9 12l2 2 4-4" /></svg>;
const FOCUS_ICONS = [IconShield, IconLayers, IconEye, IconLink, IconCheckShield];

/* ═══════════════════════════════════════════════════
   SKILL ↔ USAGE CROSS-REFERENCE
   ═══════════════════════════════════════════════════ */
function normalize(s) { return s.toLowerCase().replace(/\(.*?\)/g, "").replace(/[^a-z0-9+. ]/g, "").replace(/\s+/g, " ").trim(); }
function matches(a, b) { const na = normalize(a), nb = normalize(b); if (!na || !nb) return false; return na.includes(nb) || nb.includes(na); }
function getUsage(skillName) {
  const expHits = EXPERIENCE.filter(e => e.tech.some(t => matches(t, skillName))).map(e => ({ label: e.company, type: "role" }));
  const projHits = PROJECTS.filter(p => p.tech.some(t => matches(t, skillName))).map(p => ({ label: p.name, type: "project" }));
  return [...expHits, ...projHits];
}
function findSkillCategory(skillName) { const g = SKILL_GROUPS.find(g => g.items.some(i => matches(i, skillName))); return g ? g.title : "General"; }

/* ═══════════════════════════════════════════════════
   HOOKS
   ═══════════════════════════════════════════════════ */
function useInView(threshold = 0.1) {
  const ref = useRef(null);
  const [v, setV] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setV(true); }, { threshold });
    obs.observe(el); return () => obs.disconnect();
  }, [threshold]);
  return [ref, v];
}


/* ═══════════════════════════════════════════════════
   PARTICLES
   ═══════════════════════════════════════════════════ */
function Particles() {
  const ref = useRef(null);
  useEffect(() => {
    const c = ref.current; if (!c) return;
    const ctx = c.getContext("2d"); let id;
    const resize = () => { c.width = window.innerWidth; c.height = window.innerHeight; };
    resize(); window.addEventListener("resize", resize);
    const N = Math.min(44, Math.floor(window.innerWidth / 34));
    const pts = Array.from({ length: N }, () => ({ x: Math.random() * c.width, y: Math.random() * c.height, vx: (Math.random() - 0.5) * 0.2, vy: (Math.random() - 0.5) * 0.2, r: Math.random() * 1.0 + 0.4 }));
    const draw = () => {
      ctx.clearRect(0, 0, c.width, c.height);
      pts.forEach((p, i) => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > c.width) p.vx *= -1;
        if (p.y < 0 || p.y > c.height) p.vy *= -1;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255,180,84,0.15)"; ctx.fill();
        for (let j = i + 1; j < pts.length; j++) {
          const q = pts[j], dx = p.x - q.x, dy = p.y - q.y, d = Math.sqrt(dx * dx + dy * dy);
          if (d < 125) { ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y); ctx.strokeStyle = `rgba(255,180,84,${0.04 * (1 - d / 125)})`; ctx.lineWidth = 0.5; ctx.stroke(); }
        }
      });
      id = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(id); window.removeEventListener("resize", resize); };
  }, []);
  return <canvas ref={ref} style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none" }} />;
}

/* ═══════════════════════════════════════════════════
   SHARED UI
   ═══════════════════════════════════════════════════ */
function Section({ children, id, style }) {
  const [ref, v] = useInView(0.06);
  return (
    <section id={id} ref={ref} style={{ position: "relative", zIndex: 1, maxWidth: 1100, margin: "0 auto", padding: "90px 24px", opacity: v ? 1 : 0, transform: v ? "none" : "translateY(24px)", transition: "opacity 0.7s ease, transform 0.7s ease", ...style }}>
      {children}
    </section>
  );
}
function SLabel({ command }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14, fontFamily: T.mono, fontSize: 12 }}>
      <span style={{ color: T.textDim }}>$</span>
      <span style={{ color: T.accentSec, letterSpacing: 0.4 }}>{command}</span>
    </div>
  );
}
function STitle({ children }) { return <h2 style={{ fontFamily: T.font, fontSize: "clamp(1.7rem, 4vw, 2.4rem)", fontWeight: 700, color: T.text, margin: "0 0 12px", letterSpacing: -0.5 }}>{children}</h2>; }
function SDesc({ children }) { return <p style={{ fontFamily: T.font, fontSize: 15, color: T.textSoft, lineHeight: 1.8, maxWidth: 560, marginBottom: 36 }}>{children}</p>; }
function Divider() { return <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px" }}><div style={{ height: 1, background: T.border }} /></div>; }

function ViewToggle({ value, onChange, options }) {
  return (
    <div style={{ display: "inline-flex", border: `1px solid ${T.border}`, borderRadius: 8, padding: 3, background: T.surface, marginBottom: 28, fontFamily: T.mono }}>
      {options.map(opt => (
        <button key={opt.value} onClick={() => onChange(opt.value)} style={{
          fontFamily: T.mono, fontSize: 12, padding: "7px 16px", borderRadius: 6, border: "none", cursor: "pointer",
          background: value === opt.value ? T.accentDim : "transparent",
          color: value === opt.value ? T.accent : T.textDim, transition: "all 0.2s", letterSpacing: 0.5,
        }}>{opt.label}</button>
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   DETAIL MODAL
   ═══════════════════════════════════════════════════ */
function DetailModal({ modal, onClose, onSelectSkill }) {
  useEffect(() => {
    const onKey = e => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  if (!modal) return null;

  return (
    <div onClick={onClose} style={{ position: "fixed", inset: 0, zIndex: 1000, background: "rgba(0,0,0,0.72)", backdropFilter: "blur(6px)", display: "flex", alignItems: "center", justifyContent: "center", padding: 20, animation: "modalBgIn 0.25s ease" }}>
      <div onClick={e => e.stopPropagation()} style={{ width: "100%", maxWidth: 520, maxHeight: "82vh", overflowY: "auto", background: T.elevated, border: `1px solid ${T.border}`, borderRadius: 18, padding: "28px 30px", boxShadow: `0 30px 80px rgba(0,0,0,0.55), 0 0 0 1px ${T.accentDim}`, animation: "modalIn 0.3s cubic-bezier(0.16,1,0.3,1)" }}>
        <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: -8 }}>
          <button onClick={onClose} aria-label="Close" style={{ background: "transparent", border: `1px solid ${T.border}`, borderRadius: 8, width: 28, height: 28, color: T.textDim, cursor: "pointer", fontFamily: T.mono, fontSize: 14 }}>×</button>
        </div>

        {modal.type === "project" && (() => {
          const p = modal.data;
          return (
            <div>
              <div style={{ fontFamily: T.mono, fontSize: 11, color: T.accentSec, letterSpacing: 1.5, marginBottom: 8 }}>{p.num} · {p.cat.toUpperCase()} · {p.period}</div>
              <h3 style={{ fontFamily: T.font, fontSize: 26, fontWeight: 700, color: T.text, margin: "0 0 4px" }}>{p.name}</h3>
              <div style={{ fontFamily: T.font, fontSize: 14, color: T.accent, marginBottom: 18 }}>{p.type}</div>
              <p style={{ fontFamily: T.font, fontSize: 15, color: T.textSoft, lineHeight: 1.8, marginBottom: 20 }}>{p.desc}</p>
              <div style={{ fontFamily: T.mono, fontSize: 11, color: T.textDim, letterSpacing: 1.5, marginBottom: 10, textTransform: "uppercase" }}>Tech stack — click any to trace usage</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 22 }}>
                {p.tech.map(t => (
                  <button key={t} onClick={() => onSelectSkill(t)} style={{ fontFamily: T.mono, fontSize: 11, color: T.accent, background: T.accentDim, border: `1px solid ${T.accentMuted}`, borderRadius: 6, padding: "5px 10px", cursor: "pointer", transition: "all 0.15s" }}
                    onMouseEnter={e => { e.currentTarget.style.background = T.accentMuted; e.currentTarget.style.color = T.text; }}
                    onMouseLeave={e => { e.currentTarget.style.background = T.accentDim; e.currentTarget.style.color = T.accent; }}
                  >{t}</button>
                ))}
              </div>
              <a href={p.github} target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: 8, fontFamily: T.font, fontSize: 14, fontWeight: 500, color: T.bg, background: T.accent, textDecoration: "none", padding: "10px 20px", borderRadius: 50, transition: "opacity 0.2s" }}
                onMouseEnter={e => e.currentTarget.style.opacity = "0.85"}
                onMouseLeave={e => e.currentTarget.style.opacity = "1"}
              >View on GitHub →</a>
            </div>
          );
        })()}

        {modal.type === "skill" && (() => {
          const name = modal.data.name;
          const usage = getUsage(name);
          const category = findSkillCategory(name);
          return (
            <div>
              <div style={{ fontFamily: T.mono, fontSize: 11, color: T.accentSec, letterSpacing: 1.5, marginBottom: 8, textTransform: "uppercase" }}>{category}</div>
              <h3 style={{ fontFamily: T.font, fontSize: 26, fontWeight: 700, color: T.text, margin: "0 0 18px" }}>{name}</h3>
              <div style={{ fontFamily: T.mono, fontSize: 11, color: T.textDim, letterSpacing: 1.5, marginBottom: 12, textTransform: "uppercase" }}>
                {usage.length > 0 ? `Depended on by ${usage.length} service${usage.length > 1 ? "s" : ""}` : "Core toolkit skill"}
              </div>
              {usage.length > 0 ? (
                <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 8 }}>
                  {usage.map((u, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 14px", background: T.surface, border: `1px solid ${T.border}`, borderRadius: 10 }}>
                      <span style={{ width: 7, height: 7, borderRadius: "50%", background: T.accent, flexShrink: 0 }} />
                      <span style={{ fontFamily: T.font, fontSize: 14, color: T.text, fontWeight: 500 }}>{u.label}</span>
                      <span style={{ fontFamily: T.mono, fontSize: 10, color: T.textDim, marginLeft: "auto", textTransform: "uppercase", letterSpacing: 1 }}>{u.type}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p style={{ fontFamily: T.font, fontSize: 14, color: T.textSoft, lineHeight: 1.7 }}>Part of my growing toolkit — not yet tied to a featured project, but actively used in day-to-day engineering work.</p>
              )}
            </div>
          );
        })()}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   NAV — floating pill, scroll-spy enhanced
   ═══════════════════════════════════════════════════ */
const NAV_LINKS = ["About", "Experience", "Skills", "Projects", "Education"];

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");
  const [pulse, setPulse] = useState(true);

  useEffect(() => { const h = () => setScrolled(window.scrollY > 60); window.addEventListener("scroll", h); return () => window.removeEventListener("scroll", h); }, []);
  useEffect(() => { const t = setInterval(() => setPulse(p => !p), 1500); return () => clearInterval(t); }, []);
  useEffect(() => {
    const observers = NAV_LINKS.map(l => {
      const id = l.toLowerCase();
      const el = document.getElementById(id);
      if (!el) return null;
      const obs = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) setActive(id); }, { rootMargin: "-45% 0px -50% 0px", threshold: 0 });
      obs.observe(el);
      return obs;
    });
    return () => observers.forEach(o => o && o.disconnect());
  }, []);

  return (
    <nav style={{
      position: "fixed", top: 18, left: "50%", transform: "translateX(-50%)", zIndex: 100,
      display: "flex", alignItems: "center", gap: 4, padding: "8px 10px 8px 16px",
      background: scrolled ? "rgba(20,18,16,0.78)" : "rgba(20,18,16,0.32)",
      backdropFilter: "blur(16px)",
      border: `1px solid ${scrolled ? T.border : "rgba(42,36,31,0.6)"}`,
      borderRadius: 50,
      boxShadow: scrolled ? `0 8px 30px rgba(0,0,0,0.35)` : "none",
      transition: "all 0.4s ease",
    }}>
      <a href="#hero" style={{ display: "flex", alignItems: "center", gap: 7, fontFamily: T.font, fontWeight: 800, fontSize: 15, color: T.accent, textDecoration: "none", marginRight: 8 }}>
        <span style={{ width: 6, height: 6, borderRadius: "50%", background: T.accent, boxShadow: `0 0 ${pulse ? 7 : 3}px ${T.accentGlow}`, transition: "box-shadow 0.8s" }} />
        ~/AM
      </a>
      <div className="desk-nav" style={{ display: "flex", gap: 2 }}>
        {NAV_LINKS.map(l => {
          const id = l.toLowerCase();
          const isActive = active === id;
          return (
            <a key={l} href={`#${id}`} style={{
              fontFamily: T.mono, fontSize: 12, fontWeight: 500,
              color: isActive ? T.accent : T.textSoft,
              background: isActive ? T.accentDim : "transparent",
              textDecoration: "none", padding: "6px 13px", borderRadius: 50, transition: "all 0.2s",
            }}
              onMouseEnter={e => { if (!isActive) e.currentTarget.style.color = T.accent; }}
              onMouseLeave={e => { if (!isActive) e.currentTarget.style.color = T.textSoft; }}
            >{l}</a>
          );
        })}
      </div>
    </nav>
  );
}

/* ═══════════════════════════════════════════════════
   HERO — design 1 system-status header
   ═══════════════════════════════════════════════════ */
function Hero() {
  const [pulse, setPulse] = useState(true);
  const [time, setTime] = useState(new Date());
  const [revealed, setRevealed] = useState(0);
  const [booted, setBooted] = useState(false);
  const [termLines, setTermLines] = useState([]);
  const [input, setInput] = useState("");
  const outputRef = useRef(null);

  useEffect(() => { const t = setInterval(() => setPulse(p => !p), 1500); return () => clearInterval(t); }, []);
  useEffect(() => { const t = setInterval(() => setTime(new Date()), 1000); return () => clearInterval(t); }, []);
  useEffect(() => {
    if (revealed >= BOOT_LINES.length) { const t = setTimeout(() => setBooted(true), 300); return () => clearTimeout(t); }
    const t = setTimeout(() => setRevealed(r => r + 1), 280);
    return () => clearTimeout(t);
  }, [revealed]);
  useEffect(() => { if (outputRef.current) outputRef.current.scrollTop = outputRef.current.scrollHeight; }, [termLines, booted]);

  const exec = useCallback(() => {
    const cmd = input.trim().toLowerCase(); if (!cmd) return;
    const nl = [...termLines, { type: "in", text: `ayat@portfolio:~$ ${cmd}` }];
    if (cmd === "clear") { setTermLines([{ type: "sys", text: "Terminal cleared." }]); setInput(""); return; }
    if (TERMINAL_COMMANDS[cmd]) nl.push({ type: "out", text: TERMINAL_COMMANDS[cmd]() });
    else nl.push({ type: "err", text: `command not found: ${cmd}. Type "help" for available commands.` });
    setTermLines(nl);
    setInput("");
  }, [input, termLines]);

  return (
    <section id="hero" style={{ position: "relative", zIndex: 1, minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", padding: "120px 24px 60px", maxWidth: 1100, margin: "0 auto" }}>
      <div className="hero-grid" style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: "3rem", alignItems: "center" }}>
        {/* Left — main content, fades in once booted */}
        <div style={{ opacity: booted ? 1 : 0.35, transition: "opacity 0.6s ease" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 28, fontFamily: T.mono, fontSize: 13, flexWrap: "wrap" }}>
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: T.accent, boxShadow: `0 0 ${pulse ? 8 : 4}px ${T.accentGlow}`, transition: "box-shadow 0.8s" }} />
            <span style={{ color: T.accent, letterSpacing: 1 }}>ALL SYSTEMS OPERATIONAL</span>
            <span style={{ color: T.textDim, marginLeft: "auto" }}>{time.toLocaleTimeString("en-GB")}</span>
          </div>

          <h1 style={{ fontFamily: T.font, fontSize: "clamp(38px, 6.5vw, 68px)", fontWeight: 700, color: T.text, margin: 0, lineHeight: 1.05, letterSpacing: -2 }}>
            Ayat Mohamed<span style={{ color: T.accent }}>.</span>
          </h1>
          <p style={{ fontFamily: T.mono, fontSize: 15, color: T.accentSec, fontWeight: 500, margin: "12px 0 0" }}>{PROFILE.role}</p>

          <p style={{ fontFamily: T.font, fontSize: "clamp(15.5px, 2vw, 18px)", color: T.textSoft, margin: "16px 0 0", maxWidth: 480, lineHeight: 1.55 }}>{PROFILE.tagline}</p>

          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 24 }}>
            {[{ label: "Resume", href: PROFILE.resume }, { label: "LinkedIn", href: PROFILE.linkedin }, { label: "GitHub", href: PROFILE.github }, { label: "Email", href: `mailto:${PROFILE.email}` }].map(l => (
              <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer" style={{ fontSize: 12.5, fontWeight: 500, padding: "7px 13px", border: `1px solid ${T.border}`, borderRadius: 50, color: T.textSoft, textDecoration: "none", background: T.surface, transition: "all 0.2s", fontFamily: T.font }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = T.accent; e.currentTarget.style.color = T.accent; e.currentTarget.style.background = T.accentGlow; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = T.border; e.currentTarget.style.color = T.textSoft; e.currentTarget.style.background = T.surface; }}
              >{l.label}</a>
            ))}
          </div>

          <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginTop: 28 }}>
            {[
              { label: "CURRENT WORK", value: PROFILE.org },
              { label: "ROLE", value: PROFILE.role },
              { label: "STATUS", value: "Available" },
            ].map((c, i) => (
              <div key={i} style={{ padding: "13px 18px", background: T.surface, border: `1px solid ${T.border}`, borderRadius: 10, minWidth: 170, flex: "1 1 170px" }}>
                <div style={{ fontFamily: T.mono, fontSize: 9.5, color: T.textDim, letterSpacing: 1.3, marginBottom: 7 }}>{c.label}</div>
                <div style={{ fontFamily: T.font, fontSize: 14.5, fontWeight: 600, color: T.text, display: "flex", alignItems: "center", gap: 7 }}>
                  <span style={{ width: 6, height: 6, borderRadius: "50%", background: T.accent }} />
                  {c.value}
                </div>
              </div>
            ))}
          </div>

          <a href="#projects" style={{ fontFamily: T.font, fontSize: 14, fontWeight: 500, padding: "11px 26px", background: "transparent", color: T.accent, border: `1px solid ${T.accentMuted}`, borderRadius: 50, textDecoration: "none", transition: "all 0.2s", display: "inline-block", marginTop: 28 }}
            onMouseEnter={e => e.currentTarget.style.background = T.accentGlow}
            onMouseLeave={e => e.currentTarget.style.background = "transparent"}
          >View Projects</a>
        </div>

        {/* Right — boot log that becomes a live mini-terminal */}
        <div style={{ background: "#070604", border: `1px solid ${T.border}`, borderRadius: 12, overflow: "hidden", boxShadow: "0 20px 50px rgba(0,0,0,0.4)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 7, padding: "9px 14px", background: "#141210", borderBottom: `1px solid ${T.border}` }}>
            <span style={{ width: 10, height: 10, borderRadius: "50%", background: T.danger }} />
            <span style={{ width: 10, height: 10, borderRadius: "50%", background: T.accentSec }} />
            <span style={{ width: 10, height: 10, borderRadius: "50%", background: T.accent }} />
            <span style={{ fontFamily: T.mono, fontSize: 10.5, color: T.textDim, marginLeft: 8 }}>ayat@portfolio — bash</span>
          </div>
          <div ref={outputRef} style={{ padding: "14px 16px", height: 240, overflowY: "auto", fontFamily: T.mono, fontSize: 12.5, lineHeight: 1.7 }}>
            {BOOT_LINES.slice(0, revealed).map((l, i) => (
              <div key={`b${i}`} style={{ color: T.accentSec, marginBottom: 4 }}>{l}</div>
            ))}
            {booted && <div style={{ color: T.text, marginBottom: 4 }}>{"> profile ready"}<span style={{ opacity: pulse ? 1 : 0 }}>_</span></div>}
            {booted && <div style={{ color: T.textDim, marginBottom: 6 }}>{'Type "help" to explore.'}</div>}
            {termLines.map((l, i) => (
              <div key={i} style={{ color: l.type === "in" ? T.accent : l.type === "err" ? T.danger : l.type === "sys" ? T.textDim : T.textSoft, whiteSpace: "pre-wrap", marginBottom: 3 }}>{l.text}</div>
            ))}
          </div>
          {booted && (
            <div style={{ display: "flex", alignItems: "center", padding: "11px 16px", borderTop: `1px solid ${T.border}`, background: "#050403" }}>
              <span style={{ color: T.accent, fontFamily: T.mono, fontSize: 13, marginRight: 8 }}>$</span>
              <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === "Enter" && exec()} placeholder="type a command..."
                style={{ flex: 1, background: "transparent", border: "none", outline: "none", color: T.text, fontFamily: T.mono, fontSize: 13, caretColor: T.accent }} />
            </div>
          )}
        </div>

        <div className="hero-mobile-cue" style={{ display: "none", alignItems: "center", justifyContent: "center", gap: 8, marginTop: 14 }}>
          <span style={{ fontFamily: T.mono, fontSize: 11, color: T.textDim }}>scroll to explore</span>
          <div style={{ width: 1, height: 22, background: `linear-gradient(to bottom, ${T.accentMuted}, transparent)` }} />
        </div>
      </div>

      <div className="hero-scroll-cue" style={{ position: "absolute", bottom: 24, left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
        <span style={{ fontFamily: T.mono, fontSize: 11, color: T.textDim }}>scroll to explore</span>
        <div style={{ width: 1, height: 28, background: `linear-gradient(to bottom, ${T.accentMuted}, transparent)` }} />
      </div>
    </section>
  );
}


/* ═══════════════════════════════════════════════════
   ABOUT — enhanced
   ═══════════════════════════════════════════════════ */
function About() {
  return (
    <Section id="about" style={{ position: "relative" }}>
      {/* decorative faint rings */}
      <svg style={{ position: "absolute", top: 10, right: -40, width: 260, height: 260, opacity: 0.5, pointerEvents: "none" }} viewBox="0 0 260 260">
        <circle cx="130" cy="130" r="120" fill="none" stroke={T.border} strokeWidth="1" />
        <circle cx="130" cy="130" r="86" fill="none" stroke={T.border} strokeWidth="1" />
        <circle cx="130" cy="130" r="52" fill="none" stroke={T.border} strokeWidth="1" />
      </svg>

      <SLabel command="whoami" />
      <STitle>About</STitle>

      <div style={{ display: "flex", alignItems: "center", gap: 18, marginBottom: 34, flexWrap: "wrap", position: "relative" }}>
        <div style={{ width: 60, height: 60, borderRadius: "50%", border: `1.5px solid ${T.accentMuted}`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: T.font, fontSize: 19, fontWeight: 700, color: T.accent, background: T.surface, flexShrink: 0 }}>AM</div>
        <div>
          <div style={{ fontFamily: T.font, fontSize: 16, fontWeight: 700, color: T.text }}>{PROFILE.name}</div>
          <div style={{ fontFamily: T.mono, fontSize: 12, color: T.accentSec, marginTop: 2 }}>{PROFILE.role} · {PROFILE.org}</div>
          <div style={{ display: "flex", gap: 8, marginTop: 9, flexWrap: "wrap" }}>
            <span style={{ fontFamily: T.mono, fontSize: 11, color: T.textDim, border: `1px solid ${T.border}`, borderRadius: 50, padding: "3px 10px" }}>{PROFILE.location}</span>
            {PROFILE.languages.map(l => (
              <span key={l} style={{ fontFamily: T.mono, fontSize: 11, color: T.textDim, border: `1px solid ${T.border}`, borderRadius: 50, padding: "3px 10px" }}>{l}</span>
            ))}
          </div>
        </div>
      </div>

      <div style={{ background: "#0c0a08", border: `1px solid ${T.border}`, borderRadius: 14, overflow: "hidden", marginBottom: 44, position: "relative", boxShadow: "0 16px 40px rgba(0,0,0,0.3)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 7, padding: "9px 16px", background: "#141210", borderBottom: `1px solid ${T.border}` }}>
          <span style={{ width: 10, height: 10, borderRadius: "50%", background: T.danger }} />
          <span style={{ width: 10, height: 10, borderRadius: "50%", background: T.accentSec }} />
          <span style={{ width: 10, height: 10, borderRadius: "50%", background: T.accent }} />
          <span style={{ fontFamily: T.mono, fontSize: 11, color: T.textDim, marginLeft: 8 }}>cat summary.txt</span>
        </div>
        <p style={{ fontFamily: T.font, fontSize: "clamp(16px, 2vw, 19px)", color: T.text, lineHeight: 1.7, margin: 0, padding: "22px 26px", fontWeight: 450 }}>
          {PROFILE.bio}
        </p>
      </div>

      <div style={{ position: "relative", marginBottom: 40 }}>
        <span style={{ position: "absolute", left: -8, top: -26, fontFamily: T.font, fontSize: 64, color: T.accentDim, lineHeight: 1, userSelect: "none", pointerEvents: "none" }}>"</span>
        <p style={{ fontFamily: T.font, fontSize: 16, color: T.text, lineHeight: 1.8, borderLeft: `3px solid ${T.accentMuted}`, paddingLeft: 22, margin: 0, position: "relative" }}>
          {PROFILE.bio2}
        </p>
      </div>

      <h4 style={{ fontFamily: T.mono, fontSize: 11, letterSpacing: 2, textTransform: "uppercase", color: T.accentSec, marginBottom: 16 }}>Engineering Approach</h4>
      <div className="approach-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, marginBottom: 40 }}>
        {PROFILE.principles.map((p, i) => (
          <div key={i} style={{ background: T.surface, border: `1px solid ${T.border}`, borderRadius: 12, padding: "18px 16px", transition: "all 0.25s" }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = T.accentMuted; e.currentTarget.style.transform = "translateY(-2px)"; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = T.border; e.currentTarget.style.transform = "none"; }}
          >
            <div style={{ width: 26, height: 26, borderRadius: "50%", background: T.accentDim, color: T.accent, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: T.mono, fontSize: 11, fontWeight: 600, marginBottom: 12 }}>{i + 1}</div>
            <div style={{ fontFamily: T.font, fontSize: 13.5, color: T.textSoft, lineHeight: 1.6 }}>{p}</div>
          </div>
        ))}
      </div>

      <div className="focus-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <div style={{ background: T.surface, border: `1px solid ${T.border}`, borderRadius: 14, padding: "22px 24px" }}>
          <h4 style={{ fontFamily: T.mono, fontSize: 11, letterSpacing: 2, textTransform: "uppercase", color: T.accentSec, marginBottom: 16 }}>Focus Highlights</h4>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {PROFILE.focusAreas.map((f, i) => {
              const Icon = FOCUS_ICONS[i];
              return (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 12px", background: T.elevated, borderRadius: 8, borderLeft: `2px solid ${T.accentMuted}`, transition: "border-color 0.2s" }}
                  onMouseEnter={e => e.currentTarget.style.borderLeftColor = T.accent}
                  onMouseLeave={e => e.currentTarget.style.borderLeftColor = T.accentMuted}
                >
                  <span style={{ width: 26, height: 26, borderRadius: "50%", background: T.accentDim, color: T.accent, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <Icon style={{ width: 13, height: 13 }} />
                  </span>
                  <span style={{ fontFamily: T.font, fontSize: 13.5, color: T.textSoft }}>{f}</span>
                </div>
              );
            })}
          </div>
        </div>

        <div style={{ background: T.surface, border: `1px solid ${T.border}`, borderRadius: 14, padding: "22px 24px" }}>
          <h4 style={{ fontFamily: T.mono, fontSize: 11, letterSpacing: 2, textTransform: "uppercase", color: T.accentSec, marginBottom: 16 }}>Interest Areas</h4>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {PROFILE.interests.map(i => (
              <span key={i} style={{ fontFamily: T.mono, fontSize: 11, background: T.elevated, border: `1px solid ${T.border}`, borderRadius: 50, padding: "6px 12px", color: T.textSoft, transition: "all 0.2s", cursor: "default" }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = T.accentMuted; e.currentTarget.style.color = T.accent; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = T.border; e.currentTarget.style.color = T.textSoft; }}
              >{i}</span>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}

/* ═══════════════════════════════════════════════════
   SKILLS — Radar / List
   ═══════════════════════════════════════════════════ */
function SkillsSection({ onSelectSkill }) {
  const [view, setView] = useState("radar");
  const [hovered, setHovered] = useState(null);
  const ringRadii = [85, 145, 205];
  const ringLabels = ["Core", "Proficient", "Exploring"];
  const cx = 280, cy = 250;

  return (
    <Section id="skills">
      <SLabel command="ls ~/skills --tree" />
      <STitle>Skills</STitle>
      <SDesc>Positioned by depth of expertise, or browsed by category — click any skill to trace which roles and projects depend on it.</SDesc>
      <ViewToggle value={view} onChange={setView} options={[{ value: "radar", label: "Radar View" }, { value: "list", label: "List View" }]} />

      {view === "radar" ? (
        <div style={{ display: "flex", justifyContent: "center", overflow: "hidden" }}>
          <svg viewBox="0 0 560 500" style={{ width: "100%", maxWidth: 560 }}>
            {ringRadii.map((r, i) => (
              <g key={i}>
                <circle cx={cx} cy={cy} r={r} fill="none" stroke={T.border} strokeWidth={1} strokeDasharray="4 4" />
                <text x={cx + r - 4} y={cy - 6} fill={T.textDim} fontSize={10} fontFamily={T.mono} textAnchor="end">{ringLabels[i]}</text>
              </g>
            ))}
            <line x1={cx} y1={cy - 220} x2={cx} y2={cy + 220} stroke={T.border} strokeWidth={0.5} />
            <line x1={cx - 220} y1={cy} x2={cx + 220} y2={cy} stroke={T.border} strokeWidth={0.5} />
            {RADAR_SKILLS.map((s, i) => {
              const r = ringRadii[s.ring] * 0.82;
              const rad = (s.angle * Math.PI) / 180;
              const sx = cx + r * Math.cos(rad);
              const sy = cy + r * Math.sin(rad);
              const isH = hovered === i;
              return (
                <g key={i} onMouseEnter={() => setHovered(i)} onMouseLeave={() => setHovered(null)} onClick={() => onSelectSkill(s.name)} style={{ cursor: "pointer" }}>
                  <circle cx={sx} cy={sy} r={isH ? 22 : 16} fill={isH ? T.accentDim : "transparent"} />
                  <circle cx={sx} cy={sy} r={s.ring === 0 ? 5 : s.ring === 1 ? 4 : 3} fill={s.ring === 0 ? T.accent : s.ring === 1 ? T.accentSec : T.accentMuted} />
                  <text x={sx} y={sy + (isH ? -14 : 16)} textAnchor="middle" fill={isH ? T.text : T.textDim} fontSize={isH ? 12 : 10} fontFamily={T.mono} style={{ transition: "all 0.2s" }}>{s.name}</text>
                </g>
              );
            })}
            <circle cx={cx} cy={cy} r={3} fill={T.accent} />
          </svg>
        </div>
      ) : (
        <div className="skills-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14 }}>
          {SKILL_GROUPS.map((g, i) => (
            <div key={i} style={{ background: T.surface, border: `1px solid ${T.border}`, borderRadius: 12, padding: 18 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, fontFamily: T.mono, fontSize: 12, color: T.accent, letterSpacing: 1, textTransform: "uppercase", paddingBottom: 10, borderBottom: `1px solid ${T.border}`, marginBottom: 12 }}>
                <span>{g.icon}</span> {g.title}
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
                {g.items.map(s => (
                  <button key={s} onClick={() => onSelectSkill(s)} style={{ fontFamily: T.mono, fontSize: 11, color: T.textSoft, background: T.elevated, border: `1px solid ${T.border}`, borderRadius: 4, padding: "4px 8px", cursor: "pointer", transition: "all 0.2s" }}
                    onMouseEnter={e => { e.currentTarget.style.color = T.accent; e.currentTarget.style.borderColor = T.accentMuted; }}
                    onMouseLeave={e => { e.currentTarget.style.color = T.textSoft; e.currentTarget.style.borderColor = T.border; }}
                  >{s}</button>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </Section>
  );
}

/* ═══════════════════════════════════════════════════
   PROJECTS — Mesh / Grid
   ═══════════════════════════════════════════════════ */
function ProjectsSection({ onOpenProject }) {
  const [view, setView] = useState("mesh");
  const [hovered, setHovered] = useState(null);
  const positions = [{ x: 18, y: 26 }, { x: 72, y: 20 }, { x: 22, y: 74 }, { x: 76, y: 70 }];
  const connections = [[0, 1], [1, 3], [2, 3], [0, 2], [1, 2]];

  return (
    <Section id="projects">
      <SLabel command="docker ps --services" />
      <STitle>Projects</STitle>
      <SDesc>Each project is a service node in my engineering ecosystem. Switch views, then click a node or card for full details.</SDesc>
      <ViewToggle value={view} onChange={setView} options={[{ value: "mesh", label: "Mesh View" }, { value: "grid", label: "Grid View" }]} />

      {view === "mesh" ? (
        <div style={{ position: "relative", width: "100%", aspectRatio: "2.1/1", minHeight: 300, background: T.surface, borderRadius: 16, border: `1px solid ${T.border}`, overflow: "hidden" }}>
          <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.1 }}>
            <defs><pattern id="g3" width="40" height="40" patternUnits="userSpaceOnUse"><path d="M 40 0 L 0 0 0 40" fill="none" stroke={T.border} strokeWidth="0.5" /></pattern></defs>
            <rect width="100%" height="100%" fill="url(#g3)" />
          </svg>
          <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}>
            {connections.map(([a, b], i) => (
              <line key={i} x1={`${positions[a].x}%`} y1={`${positions[a].y}%`} x2={`${positions[b].x}%`} y2={`${positions[b].y}%`} stroke={T.accent} strokeWidth={1.5} strokeDasharray="8 6" opacity={0.16}>
                <animate attributeName="stroke-dashoffset" from="0" to="-28" dur="4s" repeatCount="indefinite" />
              </line>
            ))}
          </svg>
          {PROJECTS.map((p, i) => {
            const pos = positions[i]; const isH = hovered === i;
            return (
              <div key={p.id} onClick={() => onOpenProject(p)} onMouseEnter={() => setHovered(i)} onMouseLeave={() => setHovered(null)}
                style={{ position: "absolute", left: `${pos.x}%`, top: `${pos.y}%`, transform: "translate(-50%, -50%)", cursor: "pointer" }}>
                <div style={{ position: "absolute", inset: -10, borderRadius: "50%", border: `1.5px solid ${T.accent}`, opacity: 0.16, animation: "meshPulse 3s ease-in-out infinite" }} />
                <div style={{ width: isH ? 64 : 52, height: isH ? 64 : 52, borderRadius: "50%", background: isH ? T.elevated : T.surface, border: `2px solid ${T.accent}`, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: isH ? `0 0 20px ${T.accentDim}` : "none", transition: "all 0.25s" }}>
                  <span style={{ fontFamily: T.font, fontSize: 14, color: T.text, fontWeight: 700 }}>{p.num}</span>
                </div>
                <div style={{ position: "absolute", top: "calc(100% + 10px)", left: "50%", transform: "translateX(-50%)", whiteSpace: "nowrap", textAlign: "center" }}>
                  <div style={{ fontFamily: T.font, fontSize: 13, color: isH ? T.accent : T.textSoft, fontWeight: 600, transition: "color 0.25s" }}>{p.name}</div>
                  <div style={{ fontFamily: T.mono, fontSize: 10, color: T.textDim }}>{p.cat}</div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="proj-grid" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 16 }}>
          {PROJECTS.map(p => (
            <div key={p.id} onClick={() => onOpenProject(p)} style={{ background: T.elevated, border: `1px solid ${T.border}`, borderRadius: 16, overflow: "hidden", cursor: "pointer", transition: "transform 0.25s, border-color 0.25s" }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.borderColor = T.accentMuted; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.borderColor = T.border; }}>
              <div style={{ padding: "16px 20px 12px", borderBottom: `1px solid ${T.border}` }}>
                <div style={{ fontFamily: T.mono, fontSize: 11, color: T.textDim, letterSpacing: 1, marginBottom: 6 }}>{p.num} · {p.cat} · {p.period}</div>
                <div style={{ fontFamily: T.font, fontSize: 17, fontWeight: 700, color: T.text, marginBottom: 3 }}>{p.name}</div>
                <div style={{ fontFamily: T.font, fontSize: 13, color: T.accentSec }}>{p.type}</div>
              </div>
              <div style={{ padding: "14px 20px" }}>
                <p style={{ fontFamily: T.font, fontSize: 14, color: T.textSoft, lineHeight: 1.7, marginBottom: 12 }}>{p.desc.slice(0, 110)}...</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
                  {p.tech.slice(0, 5).map(t => <span key={t} style={{ fontFamily: T.mono, fontSize: 10, padding: "2px 7px", background: T.surface, border: `1px solid ${T.border}`, borderRadius: 4, color: T.textSoft }}>{t}</span>)}
                  {p.tech.length > 5 && <span style={{ fontFamily: T.mono, fontSize: 10, color: T.textDim }}>+{p.tech.length - 5}</span>}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </Section>
  );
}

/* ═══════════════════════════════════════════════════
   EXPERIENCE — git log
   ═══════════════════════════════════════════════════ */
function Exp() {
  const [expanded, setExpanded] = useState(0);
  return (
    <Section id="experience">
      <SLabel command="git log --oneline" />
      <STitle>Experience</STitle>
      <div style={{ position: "relative", paddingLeft: 28 }}>
        <div style={{ position: "absolute", left: 0, top: 8, bottom: 8, width: 1, background: T.border }} />
        {EXPERIENCE.map((e, i) => (
          <div key={i} style={{ position: "relative", marginBottom: 32, cursor: "pointer" }} onClick={() => setExpanded(expanded === i ? null : i)}>
            <div style={{ position: "absolute", left: -33, top: 8, width: 10, height: 10, borderRadius: "50%", background: T.accent, border: `2px solid ${T.bg}` }} />
            <div style={{ background: T.elevated, border: `1px solid ${T.border}`, borderRadius: 16, padding: "20px 24px", borderLeft: e.current ? `3px solid ${T.accent}` : undefined }}>
              <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12, flexWrap: "wrap", marginBottom: 10 }}>
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
                    <span style={{ fontFamily: T.mono, fontSize: 12, color: T.textDim }}>{e.hash}</span>
                    <span style={{ fontFamily: T.mono, fontSize: 11, color: T.accent, background: T.accentDim, padding: "2px 8px", borderRadius: 4 }}>{e.branch}</span>
                  </div>
                  <div style={{ fontFamily: T.font, fontWeight: 700, fontSize: 18, color: T.accent }}>{e.company}</div>
                  <div style={{ fontFamily: T.font, fontSize: 14, color: T.textSoft, marginTop: 2 }}>{e.role}</div>
                </div>
                <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
                  {e.current && (
                    <span style={{ display: "inline-flex", alignItems: "center", gap: 5, fontFamily: T.mono, fontSize: 11, color: T.accentSec, border: `1px solid ${T.border}`, padding: "3px 10px", borderRadius: 50, background: T.accentGlow }}>
                      <span style={{ width: 5, height: 5, borderRadius: "50%", background: T.accent }} />Current
                    </span>
                  )}
                  <span style={{ fontFamily: T.mono, fontSize: 11, padding: "3px 10px", border: `1px solid ${T.border}`, borderRadius: 50, color: T.textDim }}>{e.period}</span>
                </div>
              </div>
              {expanded === i ? (
                <div style={{ animation: "fadeIn 0.3s ease" }}>
                  <ul style={{ listStyle: "none", padding: 0, margin: "12px 0" }}>
                    {e.bullets.map((b, j) => (
                      <li key={j} style={{ fontSize: 14, color: T.textSoft, padding: "3px 0 3px 18px", position: "relative", lineHeight: 1.7, fontFamily: T.font }}>
                        <span style={{ position: "absolute", left: 0, color: T.accentSec, fontWeight: 700 }}>›</span>{b}
                      </li>
                    ))}
                  </ul>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 5, marginTop: 10 }}>
                    {e.tech.map(t => <span key={t} style={{ fontFamily: T.mono, fontSize: 11, padding: "3px 8px", background: T.accentDim, border: `1px solid ${T.accentMuted}`, borderRadius: 6, color: T.text }}>{t}</span>)}
                  </div>
                </div>
              ) : <p style={{ fontFamily: T.mono, fontSize: 12, color: T.textDim, margin: "8px 0 0" }}>click to expand →</p>}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}

/* ═══════════════════════════════════════════════════
   EDUCATION
   ═══════════════════════════════════════════════════ */
function EducationSection() {
  return (
    <Section id="education">
      <SLabel command="cat education.log" />
      <STitle>Education</STitle>
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        {EDUCATION.map((e, i) => (
          <div key={i} style={{ background: T.elevated, border: `1px solid ${T.border}`, borderRadius: 16, padding: "20px 24px", borderLeft: e.current ? `3px solid ${T.accent}` : undefined }}>
            <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 10, alignItems: "flex-start" }}>
              <div>
                <div style={{ fontFamily: T.font, fontWeight: 700, fontSize: 16.5, color: T.accent }}>{e.degree}</div>
                <div style={{ fontFamily: T.font, fontSize: 14, color: T.textSoft, marginTop: 3 }}>{e.school} · {e.faculty}</div>
              </div>
              <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
                {e.current && (
                  <span style={{ display: "inline-flex", alignItems: "center", gap: 5, fontFamily: T.mono, fontSize: 11, color: T.accentSec, border: `1px solid ${T.border}`, padding: "3px 10px", borderRadius: 50, background: T.accentGlow }}>
                    <span style={{ width: 5, height: 5, borderRadius: "50%", background: T.accent }} />In progress
                  </span>
                )}
                <span style={{ fontFamily: T.mono, fontSize: 11, padding: "3px 10px", border: `1px solid ${T.border}`, borderRadius: 50, color: T.textDim, whiteSpace: "nowrap" }}>{e.period}</span>
              </div>
            </div>
            {e.note && <div style={{ fontFamily: T.mono, fontSize: 11.5, color: T.textDim, marginTop: 10 }}>{e.note}</div>}
          </div>
        ))}
      </div>
    </Section>
  );
}

/* ═══════════════════════════════════════════════════
   CERTIFICATIONS
   ═══════════════════════════════════════════════════ */
function CertificationsSection() {
  return (
    <Section id="certifications">
      <SLabel command="ls ~/certifications" />
      <STitle>Certifications</STitle>
      <div className="cert-grid" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 14 }}>
        {CERTIFICATIONS.map((c, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 14, background: T.surface, border: `1px solid ${T.border}`, borderRadius: 12, padding: "16px 18px" }}>
            <div style={{ width: 36, height: 36, borderRadius: "50%", background: T.accentDim, color: T.accent, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontFamily: T.mono, fontSize: 14 }}>✓</div>
            <div>
              <div style={{ fontFamily: T.font, fontSize: 14, fontWeight: 600, color: T.text, lineHeight: 1.4 }}>{c.name}</div>
              <div style={{ fontFamily: T.mono, fontSize: 11, color: T.textDim, marginTop: 4 }}>{c.issuer} · {c.date}</div>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}

/* ═══════════════════════════════════════════════════
   VOLUNTEER
   ═══════════════════════════════════════════════════ */
function Vol() {
  return (
    <Section id="volunteer">
      <SLabel command="cat volunteer.log" />
      <STitle>Volunteer</STitle>
      <div className="vol-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        {VOLUNTEER.map((v, i) => (
          <div key={i} style={{ background: T.elevated, border: `1px solid ${T.border}`, borderRadius: 16, padding: "22px 24px", position: "relative", overflow: "hidden" }}>
            <span style={{ position: "absolute", top: -8, right: 16, fontFamily: T.font, fontSize: 72, fontWeight: 800, color: T.accentDim, lineHeight: 1, pointerEvents: "none", userSelect: "none" }}>{v.initial}</span>
            <div style={{ fontFamily: T.font, fontWeight: 700, fontSize: 16, color: T.accent, marginBottom: 4, position: "relative" }}>{v.org}</div>
            <div style={{ fontFamily: T.font, fontWeight: 500, fontSize: 14, color: T.text, marginBottom: 3 }}>{v.role}</div>
            <div style={{ fontFamily: T.mono, fontSize: 11, color: T.textDim, marginBottom: 14 }}>{v.period}</div>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {v.bullets.map((b, j) => (
                <li key={j} style={{ fontSize: 13, color: T.textSoft, padding: "2px 0 2px 14px", position: "relative", lineHeight: 1.6, fontFamily: T.font }}>
                  <span style={{ position: "absolute", left: 0, color: T.accentSec, fontSize: 16, lineHeight: 1.3 }}>·</span>{b}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
}

/* ═══════════════════════════════════════════════════
   CONTACT — enhanced
   ═══════════════════════════════════════════════════ */
function Contact() {
  const methods = [
    { label: "Email", href: `mailto:${PROFILE.email}`, Icon: IconMail, external: true },
    { label: "GitHub", href: PROFILE.github, Icon: IconGithub, external: true },
    { label: "LinkedIn", href: PROFILE.linkedin, Icon: IconLinkedin, external: true },
    { label: "CV", href: PROFILE.resume, Icon: IconDoc, external: true },
  ];

  return (
    <Section id="contact">
      <SLabel command="ping ayat --contact" />
      <STitle>Contact</STitle>
      <div style={{ textAlign: "center", padding: "16px 0 8px" }}>
        <h3 style={{ fontFamily: T.font, fontSize: "clamp(26px, 4vw, 34px)", fontWeight: 700, color: T.text, margin: "0 0 10px" }}>
          Let's build something remarkable<span style={{ color: T.accent }}>.</span>
        </h3>
        <p style={{ fontFamily: T.font, fontSize: 15, color: T.textDim, margin: "0 0 30px" }}>
          Available for collaboration, consulting, and full-time opportunities.
        </p>
        <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: 12 }}>
          {methods.map(({ label, href, Icon, external }) => (
            <a key={label} href={href} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})} style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 13.5, fontWeight: 500, padding: "10px 20px", border: `1px solid ${T.border}`, borderRadius: 50, color: T.textSoft, textDecoration: "none", background: T.surface, transition: "all 0.2s", fontFamily: T.font }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = T.accent; e.currentTarget.style.color = T.accent; e.currentTarget.style.background = T.accentGlow; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = T.border; e.currentTarget.style.color = T.textSoft; e.currentTarget.style.background = T.surface; }}
            >
              <Icon style={{ width: 14, height: 14 }} /> {label}
            </a>
          ))}
        </div>
      </div>
    </Section>
  );
}



function Footer() {
  return <div style={{ textAlign: "center", padding: "32px 0 40px", fontFamily: T.mono, fontSize: 11, color: T.textDim, position: "relative", zIndex: 1 }}>© 2026 Ayat Mohamed</div>;
}

/* ═══════════════════════════════════════════════════
   MAIN
   ═══════════════════════════════════════════════════ */
export default function Portfolio() {
  const [modal, setModal] = useState(null);
  const openSkill = useCallback(name => setModal({ type: "skill", data: { name } }), []);
  const openProject = useCallback(p => setModal({ type: "project", data: p }), []);
  const closeModal = useCallback(() => setModal(null), []);

  return (
    <div style={{ background: T.bg, minHeight: "100vh", color: T.text, overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { background: #0a0908; }
        ::selection { background: #ffb454; color: #0a0908; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #2a241f; border-radius: 4px; }
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.3; } }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes meshPulse { 0%, 100% { transform: scale(1); opacity: 0.16; } 50% { transform: scale(1.45); opacity: 0; } }
        @keyframes modalBgIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes modalIn { from { opacity: 0; transform: scale(0.94) translateY(10px); } to { opacity: 1; transform: scale(1) translateY(0); } }
        @media (max-width: 900px) { .desk-nav { display: none !important; } }
        @media (max-width: 768px) {
          .hero-grid { grid-template-columns: 1fr !important; }
          .approach-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .focus-grid { grid-template-columns: 1fr !important; }
          .skills-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .proj-grid { grid-template-columns: 1fr !important; }
          .vol-grid { grid-template-columns: 1fr !important; }
          .cert-grid { grid-template-columns: 1fr !important; }
          .hero-scroll-cue { display: none !important; }
          .hero-mobile-cue { display: flex !important; }
        }
        @media (max-width: 500px) {
          .approach-grid { grid-template-columns: 1fr !important; }
          .skills-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
      <Particles />
      <Nav />
      <Hero />
      <Divider />
      <About />
      <Divider />
      <Exp />
      <Divider />
      <SkillsSection onSelectSkill={openSkill} />
      <Divider />
      <ProjectsSection onOpenProject={openProject} />
      <Divider />
      <EducationSection />
      <Divider />
      <CertificationsSection />
      <Divider />
      <Vol />
      <Divider />
      <Contact />
      <Footer />
      <DetailModal modal={modal} onClose={closeModal} onSelectSkill={openSkill} />
    </div>
  );
}
