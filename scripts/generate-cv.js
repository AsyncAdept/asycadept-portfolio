const { jsPDF } = require("jspdf");

const doc = new jsPDF();

const margin = 20;
const pageWidth = doc.internal.pageSize.getWidth();
const contentWidth = pageWidth - margin * 2;
let y = margin;

function addHeader() {
  doc.setFillColor(6, 182, 212);
  doc.rect(0, 0, pageWidth, 35, "F");
  
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(24);
  doc.setFont("helvetica", "bold");
  doc.text("ASYCADEPT", margin, 18);
  
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.text("Full Stack TypeScript Engineer", margin, 26);
  
  doc.text("contact@asycadept.com | Available Remote", pageWidth - margin, 18, { align: "right" });
  doc.text("asycadept.com", pageWidth - margin, 26, { align: "right" });
  
  y = 45;
}

function addSection(title) {
  y += 8;
  doc.setFillColor(6, 182, 212);
  doc.rect(margin, y - 3, 4, 8, "F");
  
  doc.setTextColor(6, 182, 212);
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.text(title.toUpperCase(), margin + 8, y + 2);
  
  doc.setDrawColor(200, 200, 200);
  doc.line(margin + 8, y + 6, pageWidth - margin, y + 6);
  
  y += 12;
}

function addText(text, options = {}) {
  const { fontSize = 10, color = [60, 60, 60], bold = false, indent = 0 } = options;
  
  doc.setFontSize(fontSize);
  doc.setTextColor(...color);
  doc.setFont("helvetica", bold ? "bold" : "normal");
  
  const lines = doc.splitTextToSize(text, contentWidth - indent);
  doc.text(lines, margin + indent, y);
  y += lines.length * (fontSize * 0.5) + 2;
}

function addJob(title, company, period, description) {
  doc.setTextColor(40, 40, 40);
  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");
  doc.text(title, margin, y);
  
  doc.setTextColor(6, 182, 212);
  doc.setFont("helvetica", "normal");
  doc.text(company, pageWidth - margin, y, { align: "right" });
  y += 5;
  
  doc.setTextColor(120, 120, 120);
  doc.setFontSize(9);
  doc.text(period, margin, y);
  y += 5;
  
  addText(description);
  y += 3;
}

function addSkillCategory(category, skills) {
  doc.setTextColor(40, 40, 40);
  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");
  doc.text(category, margin, y);
  y += 5;
  
  doc.setTextColor(80, 80, 80);
  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  doc.text(skills.join(" • "), margin, y);
  y += 8;
}

function addProject(title, description, impact) {
  doc.setTextColor(40, 40, 40);
  doc.setFontSize(10);
  doc.setFont("helvetica", "bold");
  doc.text(title, margin, y);
  y += 4;
  
  addText(description, { indent: 5 });
  
  doc.setTextColor(6, 182, 212);
  doc.setFontSize(9);
  impact.forEach((item) => {
    doc.text("• " + item, margin + 5, y);
    y += 4;
  });
  y += 3;
}

addHeader();

addSection("Summary");
addText("Full Stack TypeScript Engineer specializing in scalable systems, real-time data, and cross-platform applications. Frontend specialist turned end-to-end engineer (2012→present). I architect production-grade web apps, mobile experiences, and data-intensive platforms.");

addSection("Experience");

addJob(
  "Engineer",
  "Balena",
  "2020 — Present",
  "Working on an IoT platform focused on container-based deployment and fleet management at scale. Containerized workloads (Docker), device fleet orchestration, deployment tooling, Electron-based desktop tooling for IoT management."
);

addJob(
  "Consultant / Tech Lead",
  "Liknme",
  "2017 — 2020",
  "Led and delivered multiple projects across domains, often defining initial architecture and technical direction. Citizen services platforms, tax and operational systems, internal enterprise tools, first mobile projects (Ionic/Cordova)."
);

addJob(
  "Full Stack Developer",
  "Reputation Manager",
  "2015 — 2017",
  "Worked on a platform aggregating large volumes of social data to generate sentiment and reputation insights. Data ingestion from multiple external APIs, real-time analytics dashboards, high-volume data processing in browser."
);

addJob(
  "Frontend Developer",
  "FWR / Snappin",
  "2012 — 2015",
  "Co-built a digital signage product using Raspberry Pi devices and a custom CMS platform. UI architecture for embedded displays, device-to-server communication, CMS tooling for non-technical users."
);

addSection("Skills");

addSkillCategory("Frontend", ["JavaScript/TypeScript", "React/Next.js", "Angular/RxJS", "Vue/Nuxt", "Design Systems", "Performance Optimization"]);
addSkillCategory("Mobile", ["React Native", "Ionic/Capacitor", "Mobile Architecture", "Biometric Auth", "Offline-First", "App Store Deployment"]);
addSkillCategory("Cross-Platform", ["Electron", "Tauri (Rust)", "Native Integrations", "Shared Architecture", "Desktop Tooling", "System Tray & IPC"]);
addSkillCategory("Backend", ["Node.js/REST APIs", "Event-Driven Patterns", "Queue-Based Systems", "API Design", "Auth Patterns (OAuth/JWT)", "Webhooks & Integrations"]);
addSkillCategory("Data Systems", ["PostgreSQL/MySQL", "MongoDB", "Streaming Ingestion", "Real-time Pipelines", "IndexedDB", "WebSockets/SSE"]);

addSection("Projects");

addProject(
  "Targeted Messaging Platform",
  "Designed and implemented a system capable of ingesting large contact datasets and orchestrating multi-channel communication campaigns.",
  ["10K+ messages/minute throughput", "40% processing time reduction", "Scalable campaign execution"]
);

addProject(
  "Real-Time Social Firehose",
  "Optimized a browser-based dashboard handling extremely high message rates during peak global events.",
  ["50K+ messages/sec handled", "60% memory footprint reduction", "60fps maintained"]
);

addProject(
  "AutoUI Generator",
  "Designed and prototyped a system that automatically generated UI screens from API-defined JSON Schema models.",
  ["70% faster CRUD development", "Model-driven generation", "Web + mobile output"]
);

addProject(
  "Cross-Platform Mobile Banking",
  "Led frontend architecture for a hybrid mobile banking application serving 50K+ users.",
  ["40% faster time-to-market", "50K+ users served", "4.6★ app store rating"]
);

doc.save("public/cv.pdf");
console.log("CV PDF generated successfully!");
