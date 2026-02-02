import { useState, useEffect } from "react";

const projectsData = [
  {
    id: "whb-companies",
    name: "William Henry / WHB Companies",
    status: "active",
    priority: "high",
    category: "Platform",
    icon: "🏢",
    summary: "Unified platform consolidating Forest, Vish, Netsuite & Zipper (Pilates). Improve client app experience.",
    requirements: [
      { text: "Build a platform handling all needs from one source", done: false, tags: ["platform"] },
      { text: "Integrate Forest, Vish, Netsuite, Zipper (Pilates)", done: false, tags: ["integration"] },
      { text: "Pull the websites together", done: false, tags: ["web"] },
      { text: "Create better app experience for clients to schedule", done: false, tags: ["app", "scheduling"] },
    ],
    notes: "This is the parent company — the central hub everything flows through.",
  },
  {
    id: "spa-wilson-house",
    name: "Spa / Wilson House",
    status: "active",
    priority: "high",
    category: "Hospitality",
    icon: "🧖",
    summary: "Ready to scale. Great campus experience in place. Sky is the limit.",
    requirements: [
      { text: "Think about ways to blow this one up — we're in a good place", done: false, tags: ["growth"] },
      { text: "Leverage the campus experience for marketing", done: false, tags: ["marketing"] },
      { text: "Site visit needed to understand and dream on it", done: false, tags: ["planning"] },
    ],
    notes: "The campus is a great experience. Need to get there to understand it and dream a little.",
  },
  {
    id: "wilson-house",
    name: "Wilson House",
    status: "active",
    priority: "medium",
    category: "Hospitality",
    icon: "🏠",
    summary: "Enhance exposure. Currently on Evolve platform. Needs simple accounting.",
    requirements: [
      { text: "Enhance exposure", done: false, tags: ["marketing"] },
      { text: "Evolve platform — currently pleased with it", done: true, tags: ["platform"] },
      { text: "Evolve handles insurance claims", done: true, tags: ["insurance"] },
      { text: "Simple accounting needed", done: false, tags: ["accounting"] },
    ],
    notes: "Evolve is working well — handles platform + insurance claims.",
  },
  {
    id: "whb-hospitality",
    name: "WHB Hospitality",
    status: "active",
    priority: "high",
    category: "Services",
    icon: "🧹",
    summary: "Cleaning, maintenance & landscaping services platform with bilingual support.",
    requirements: [
      { text: "Client platform for easy maintenance requests", done: false, tags: ["platform", "app"] },
      { text: "Tech receives requests & tracks time for billing", done: false, tags: ["time-tracking", "billing"] },
      { text: "English/Spanish translation built in", done: false, tags: ["i18n"] },
      { text: "Photo capture for receipts (materials)", done: false, tags: ["app"] },
      { text: "Overall schedule view", done: false, tags: ["scheduling"] },
      { text: "Weekly recurring tasks set by administrator", done: false, tags: ["scheduling"] },
      { text: "Simple accounting needed", done: false, tags: ["accounting"] },
    ],
    notes: "Cleaning, maintenance, and lawn/landscaping services for businesses.",
  },
  {
    id: "bowertraust",
    name: "BowerTraust",
    status: "active",
    priority: "high",
    category: "Construction",
    icon: "🏗️",
    summary: "Construction/development company. Needs scheduling, accounting, invoicing & timesheets.",
    requirements: [
      { text: "Easy job schedule builder that dumps into one overall schedule", done: false, tags: ["scheduling"] },
      { text: "Super easy navigation for project managers", done: false, tags: ["ux"] },
      { text: "Sub contractor app with schedule tracking & change notifications", done: false, tags: ["app", "scheduling"] },
      { text: "Simple accounting with budgeting", done: false, tags: ["accounting"] },
      { text: "Invoice loading by sub — remote approval & coding by PMs", done: false, tags: ["invoicing"] },
      { text: "Simple accounting with direct deposit", done: false, tags: ["accounting", "payroll"] },
      { text: "Hourly timesheet submissions with location/task tracking", done: false, tags: ["time-tracking"] },
    ],
    notes: "Does all building and developing. Used BuilderTrend before but too many features. Avid Bill (used by Elevation) is too complicated. No client-facing exposure needed.",
  },
  {
    id: "r-alexander",
    name: "R Alexander",
    status: "active",
    priority: "medium",
    category: "Creative",
    icon: "🎨",
    summary: "New creative company — brand design & creative builds. Needs scheduling, invoicing & accounting.",
    requirements: [
      { text: "Scheduling features for the barn guys to track", done: false, tags: ["scheduling"] },
      { text: "Invoice approval system (same as BowerTraust)", done: false, tags: ["invoicing"] },
      { text: "Simple accounting", done: false, tags: ["accounting"] },
      { text: "Hourly timesheet submissions with location/task tracking", done: false, tags: ["time-tracking"] },
      { text: "PO system (future phase — Brian's request)", done: false, tags: ["purchasing"] },
    ],
    notes: "New creative company doing brand design and creative builds. PO system can be down the road.",
  },
  {
    id: "piedmont-deli",
    name: "Piedmont Delicatessen",
    status: "active",
    priority: "medium",
    category: "Food & Bev",
    icon: "🥪",
    summary: "Deli + speakeasy concept. Needs accounting, scheduling, invoicing & a secretive website.",
    requirements: [
      { text: "Accounting system", done: false, tags: ["accounting"] },
      { text: "Employee scheduling", done: false, tags: ["scheduling"] },
      { text: "Invoice approval system", done: false, tags: ["invoicing"] },
      { text: "Website with reservation options", done: false, tags: ["web"] },
      { text: "Speakeasy section — secretive feel, nightly password system", done: false, tags: ["web", "app"] },
    ],
    notes: "Deli by day, speakeasy by evening. Guests need the password for the speakeasy each night. Pretty cool concept — need background info.",
  },
  {
    id: "community-charter",
    name: "Community Charter",
    status: "active",
    priority: "high",
    category: "Education",
    icon: "📚",
    summary: "Big project — needs full discussion.",
    requirements: [
      { text: "Full scoping discussion needed", done: false, tags: ["planning"] },
    ],
    notes: "This is a huge one — will have to discuss in depth.",
  },
  {
    id: "paramount",
    name: "Paramount",
    status: "active",
    priority: "high",
    category: "Education",
    icon: "💇",
    summary: "Cosmetology school with large expanding campus. Needs full discussion.",
    requirements: [
      { text: "Full scoping discussion needed", done: false, tags: ["planning"] },
    ],
    notes: "Cosmetology school. Large expanding campus. Another big one to discuss.",
  },
  {
    id: "whb-consulting",
    name: "WHB Consulting",
    status: "not-launched",
    priority: "low",
    category: "Consulting",
    icon: "💼",
    summary: "Not yet launched.",
    requirements: [],
    notes: "Hasn't been launched yet.",
  },
  {
    id: "smith-ballard",
    name: "Smith & Ballard Salon Collective",
    status: "not-launched",
    priority: "low",
    category: "Beauty",
    icon: "💈",
    summary: "Not yet launched.",
    requirements: [],
    notes: "Hasn't been launched yet.",
  },
  {
    id: "j-rockwell",
    name: "J Rockwell Provisions",
    status: "not-launched",
    priority: "low",
    category: "Food & Bev",
    icon: "🍽️",
    summary: "Not yet launched.",
    requirements: [],
    notes: "Hasn't been launched yet.",
  },
  {
    id: "downstairs-icecream",
    name: "Downstairs Ice Cream",
    status: "not-launched",
    priority: "low",
    category: "Food & Bev",
    icon: "🍦",
    summary: "Not yet launched.",
    requirements: [],
    notes: "Hasn't been launched yet.",
  },
  {
    id: "hooraws",
    name: "Hooraws",
    status: "not-launched",
    priority: "low",
    category: "TBD",
    icon: "🎉",
    summary: "Not yet launched.",
    requirements: [],
    notes: "Hasn't been launched yet.",
  },
  {
    id: "nellos",
    name: "Nello's Pizzaria",
    status: "not-launched",
    priority: "low",
    category: "Food & Bev",
    icon: "🍕",
    summary: "Not yet launched.",
    requirements: [],
    notes: "Hasn't been launched yet.",
  },
  {
    id: "garibaldi",
    name: "Garibaldi Club",
    status: "not-launched",
    priority: "low",
    category: "TBD",
    icon: "🏛️",
    summary: "Not yet launched.",
    requirements: [],
    notes: "Hasn't been launched yet.",
  },
];

const tagColors = {
  platform: { bg: "#1a2f4a", text: "#5b9bd5" },
  integration: { bg: "#2a1f3d", text: "#b39ddb" },
  web: { bg: "#1a3a2a", text: "#66bb6a" },
  app: { bg: "#3d2a1a", text: "#ffb74d" },
  scheduling: { bg: "#1a3a3a", text: "#4dd0e1" },
  accounting: { bg: "#2d2d1a", text: "#dce775" },
  marketing: { bg: "#3d1a2a", text: "#f06292" },
  growth: { bg: "#1a3d1a", text: "#81c784" },
  planning: { bg: "#2a2a3d", text: "#9fa8da" },
  insurance: { bg: "#3d3d1a", text: "#fff176" },
  billing: { bg: "#2d1a3d", text: "#ce93d8" },
  "time-tracking": { bg: "#1a2d3d", text: "#4fc3f7" },
  i18n: { bg: "#3d1a1a", text: "#ef5350" },
  ux: { bg: "#1a3d2d", text: "#69f0ae" },
  invoicing: { bg: "#3d2d1a", text: "#ffa726" },
  payroll: { bg: "#1a1a3d", text: "#7986cb" },
  purchasing: { bg: "#2d3d1a", text: "#aed581" },
};

const priorityConfig = {
  high: { label: "High", color: "#ef5350", bg: "rgba(239,83,80,0.12)" },
  medium: { label: "Medium", color: "#ffb74d", bg: "rgba(255,183,77,0.12)" },
  low: { label: "Low", color: "#66bb6a", bg: "rgba(102,187,106,0.12)" },
};

const statusConfig = {
  active: { label: "Active", color: "#4dd0e1" },
  "not-launched": { label: "Not Launched", color: "#78909c" },
};

export default function WHBProjectTracker() {
  const [projects, setProjects] = useState(projectsData);
  const [selectedId, setSelectedId] = useState("whb-companies");
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [editingNote, setEditingNote] = useState(false);
  const [noteText, setNoteText] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const selected = projects.find((p) => p.id === selectedId);

  const filteredProjects = projects.filter((p) => {
    const matchesFilter = filter === "all" || p.status === filter;
    const matchesSearch =
      searchTerm === "" ||
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.category.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const activeCount = projects.filter((p) => p.status === "active").length;
  const notLaunchedCount = projects.filter((p) => p.status === "not-launched").length;
  const totalReqs = projects.reduce((sum, p) => sum + p.requirements.length, 0);
  const doneReqs = projects.reduce(
    (sum, p) => sum + p.requirements.filter((r) => r.done).length,
    0
  );

  const toggleRequirement = (projId, reqIndex) => {
    setProjects((prev) =>
      prev.map((p) => {
        if (p.id === projId) {
          const newReqs = [...p.requirements];
          newReqs[reqIndex] = { ...newReqs[reqIndex], done: !newReqs[reqIndex].done };
          return { ...p, requirements: newReqs };
        }
        return p;
      })
    );
  };

  const saveNote = () => {
    setProjects((prev) =>
      prev.map((p) => (p.id === selectedId ? { ...p, notes: noteText } : p))
    );
    setEditingNote(false);
  };

  const getProgress = (proj) => {
    if (proj.requirements.length === 0) return 0;
    return Math.round(
      (proj.requirements.filter((r) => r.done).length / proj.requirements.length) * 100
    );
  };

  // Collect all unique tags across all projects
  const allTags = [...new Set(projects.flatMap((p) => p.requirements.flatMap((r) => r.tags || [])))];

  // Find shared needs across active projects
  const sharedNeeds = allTags
    .map((tag) => ({
      tag,
      count: projects.filter(
        (p) => p.status === "active" && p.requirements.some((r) => r.tags?.includes(tag))
      ).length,
    }))
    .filter((t) => t.count > 1)
    .sort((a, b) => b.count - a.count);

  return (
    <div
      style={{
        fontFamily: "'Cormorant Garamond', 'Georgia', serif",
        background: "#0a0b0e",
        color: "#e8e6e1",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      <link
        href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500;600;700&family=DM+Sans:wght@300;400;500;600;700&display=swap"
        rel="stylesheet"
      />

      {/* Header */}
      <div
        style={{
          background: "linear-gradient(135deg, #0f1117 0%, #151820 50%, #0f1117 100%)",
          borderBottom: "1px solid rgba(212,175,55,0.15)",
          padding: "16px 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexShrink: 0,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            style={{
              background: "none",
              border: "1px solid rgba(212,175,55,0.25)",
              color: "#d4af37",
              cursor: "pointer",
              padding: "6px 10px",
              borderRadius: 6,
              fontSize: 16,
              fontFamily: "'DM Sans', sans-serif",
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => (e.target.style.background = "rgba(212,175,55,0.1)")}
            onMouseLeave={(e) => (e.target.style.background = "none")}
          >
            {sidebarOpen ? "◂" : "▸"}
          </button>
          <div>
            <h1
              style={{
                margin: 0,
                fontSize: 22,
                fontWeight: 300,
                letterSpacing: 3,
                color: "#d4af37",
                textTransform: "uppercase",
              }}
            >
              WHB Companies
            </h1>
            <p
              style={{
                margin: 0,
                fontSize: 11,
                fontFamily: "'DM Sans', sans-serif",
                color: "rgba(232,230,225,0.4)",
                letterSpacing: 2,
                textTransform: "uppercase",
                marginTop: 2,
              }}
            >
              Project Portfolio Tracker
            </p>
          </div>
        </div>

        {/* Stats */}
        <div style={{ display: "flex", gap: 28, alignItems: "center" }}>
          {[
            { label: "Active", value: activeCount, color: "#4dd0e1" },
            { label: "Pipeline", value: notLaunchedCount, color: "#78909c" },
            { label: "Requirements", value: `${doneReqs}/${totalReqs}`, color: "#d4af37" },
          ].map((stat) => (
            <div key={stat.label} style={{ textAlign: "center" }}>
              <div
                style={{
                  fontSize: 20,
                  fontWeight: 600,
                  color: stat.color,
                  fontFamily: "'DM Sans', sans-serif",
                }}
              >
                {stat.value}
              </div>
              <div
                style={{
                  fontSize: 9,
                  textTransform: "uppercase",
                  letterSpacing: 1.5,
                  color: "rgba(232,230,225,0.35)",
                  fontFamily: "'DM Sans', sans-serif",
                }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>
        {/* Sidebar */}
        <div
          style={{
            width: sidebarOpen ? 280 : 0,
            minWidth: sidebarOpen ? 280 : 0,
            background: "#0e0f14",
            borderRight: sidebarOpen ? "1px solid rgba(212,175,55,0.08)" : "none",
            transition: "all 0.3s ease",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* Search */}
          <div style={{ padding: "14px 16px 8px" }}>
            <input
              type="text"
              placeholder="Search projects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: "100%",
                padding: "8px 12px",
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(212,175,55,0.12)",
                borderRadius: 6,
                color: "#e8e6e1",
                fontSize: 12,
                fontFamily: "'DM Sans', sans-serif",
                outline: "none",
                boxSizing: "border-box",
              }}
            />
          </div>

          {/* Filters */}
          <div style={{ padding: "4px 16px 10px", display: "flex", gap: 6 }}>
            {[
              { key: "all", label: "All" },
              { key: "active", label: "Active" },
              { key: "not-launched", label: "Pipeline" },
            ].map((f) => (
              <button
                key={f.key}
                onClick={() => setFilter(f.key)}
                style={{
                  padding: "4px 10px",
                  fontSize: 10,
                  fontFamily: "'DM Sans', sans-serif",
                  fontWeight: 500,
                  border:
                    filter === f.key
                      ? "1px solid rgba(212,175,55,0.4)"
                      : "1px solid rgba(255,255,255,0.08)",
                  borderRadius: 4,
                  background:
                    filter === f.key ? "rgba(212,175,55,0.12)" : "rgba(255,255,255,0.02)",
                  color: filter === f.key ? "#d4af37" : "rgba(232,230,225,0.5)",
                  cursor: "pointer",
                  transition: "all 0.2s",
                  textTransform: "uppercase",
                  letterSpacing: 1,
                }}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* Project List */}
          <div style={{ flex: 1, overflow: "auto", padding: "0 8px 16px" }}>
            {filteredProjects.map((proj) => {
              const isSelected = proj.id === selectedId;
              const progress = getProgress(proj);
              return (
                <button
                  key={proj.id}
                  onClick={() => setSelectedId(proj.id)}
                  style={{
                    width: "100%",
                    padding: "12px 12px",
                    background: isSelected
                      ? "rgba(212,175,55,0.08)"
                      : "transparent",
                    border: isSelected
                      ? "1px solid rgba(212,175,55,0.2)"
                      : "1px solid transparent",
                    borderRadius: 8,
                    cursor: "pointer",
                    textAlign: "left",
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 10,
                    transition: "all 0.2s",
                    marginBottom: 2,
                    boxSizing: "border-box",
                  }}
                  onMouseEnter={(e) => {
                    if (!isSelected) e.currentTarget.style.background = "rgba(255,255,255,0.03)";
                  }}
                  onMouseLeave={(e) => {
                    if (!isSelected) e.currentTarget.style.background = "transparent";
                  }}
                >
                  <span style={{ fontSize: 20, lineHeight: 1, flexShrink: 0, marginTop: 1 }}>
                    {proj.icon}
                  </span>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div
                      style={{
                        fontSize: 13,
                        fontFamily: "'DM Sans', sans-serif",
                        fontWeight: isSelected ? 600 : 400,
                        color: isSelected ? "#e8e6e1" : "rgba(232,230,225,0.7)",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {proj.name}
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 4 }}>
                      <span
                        style={{
                          fontSize: 9,
                          fontFamily: "'DM Sans', sans-serif",
                          textTransform: "uppercase",
                          letterSpacing: 1,
                          color: statusConfig[proj.status].color,
                          opacity: 0.7,
                        }}
                      >
                        {proj.category}
                      </span>
                      {proj.requirements.length > 0 && (
                        <div
                          style={{
                            flex: 1,
                            height: 2,
                            background: "rgba(255,255,255,0.06)",
                            borderRadius: 1,
                            overflow: "hidden",
                            minWidth: 30,
                          }}
                        >
                          <div
                            style={{
                              height: "100%",
                              width: `${progress}%`,
                              background:
                                progress === 100
                                  ? "#66bb6a"
                                  : progress > 0
                                  ? "#d4af37"
                                  : "transparent",
                              borderRadius: 1,
                              transition: "width 0.4s ease",
                            }}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                  <span
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: "50%",
                      background: priorityConfig[proj.priority].color,
                      flexShrink: 0,
                      marginTop: 5,
                      opacity: 0.7,
                    }}
                  />
                </button>
              );
            })}
          </div>
        </div>

        {/* Detail Panel */}
        {selected && (
          <div
            style={{
              flex: 1,
              overflow: "auto",
              padding: "28px 36px",
              background: "linear-gradient(180deg, #0c0d11 0%, #0a0b0e 100%)",
            }}
          >
            {/* Project Header */}
            <div style={{ marginBottom: 28 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 8 }}>
                <span style={{ fontSize: 36 }}>{selected.icon}</span>
                <div>
                  <h2
                    style={{
                      margin: 0,
                      fontSize: 28,
                      fontWeight: 300,
                      letterSpacing: 1,
                      color: "#e8e6e1",
                    }}
                  >
                    {selected.name}
                  </h2>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 12,
                      marginTop: 6,
                    }}
                  >
                    <span
                      style={{
                        fontSize: 10,
                        fontFamily: "'DM Sans', sans-serif",
                        fontWeight: 500,
                        textTransform: "uppercase",
                        letterSpacing: 1.5,
                        color: statusConfig[selected.status].color,
                        background: `${statusConfig[selected.status].color}15`,
                        padding: "3px 10px",
                        borderRadius: 4,
                        border: `1px solid ${statusConfig[selected.status].color}30`,
                      }}
                    >
                      {statusConfig[selected.status].label}
                    </span>
                    <span
                      style={{
                        fontSize: 10,
                        fontFamily: "'DM Sans', sans-serif",
                        fontWeight: 500,
                        textTransform: "uppercase",
                        letterSpacing: 1.5,
                        color: priorityConfig[selected.priority].color,
                        background: priorityConfig[selected.priority].bg,
                        padding: "3px 10px",
                        borderRadius: 4,
                        border: `1px solid ${priorityConfig[selected.priority].color}30`,
                      }}
                    >
                      {priorityConfig[selected.priority].label} Priority
                    </span>
                    <span
                      style={{
                        fontSize: 10,
                        fontFamily: "'DM Sans', sans-serif",
                        color: "rgba(232,230,225,0.35)",
                        letterSpacing: 1,
                        textTransform: "uppercase",
                      }}
                    >
                      {selected.category}
                    </span>
                  </div>
                </div>
              </div>

              <p
                style={{
                  fontSize: 15,
                  color: "rgba(232,230,225,0.6)",
                  fontFamily: "'DM Sans', sans-serif",
                  fontWeight: 300,
                  lineHeight: 1.6,
                  margin: "16px 0 0",
                  maxWidth: 700,
                }}
              >
                {selected.summary}
              </p>
            </div>

            {/* Progress Bar */}
            {selected.requirements.length > 0 && (
              <div style={{ marginBottom: 28 }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: 8,
                  }}
                >
                  <span
                    style={{
                      fontSize: 10,
                      fontFamily: "'DM Sans', sans-serif",
                      textTransform: "uppercase",
                      letterSpacing: 2,
                      color: "rgba(232,230,225,0.35)",
                    }}
                  >
                    Progress
                  </span>
                  <span
                    style={{
                      fontSize: 13,
                      fontFamily: "'DM Sans', sans-serif",
                      fontWeight: 600,
                      color: "#d4af37",
                    }}
                  >
                    {getProgress(selected)}%
                  </span>
                </div>
                <div
                  style={{
                    height: 4,
                    background: "rgba(255,255,255,0.06)",
                    borderRadius: 2,
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      height: "100%",
                      width: `${getProgress(selected)}%`,
                      background:
                        getProgress(selected) === 100
                          ? "linear-gradient(90deg, #66bb6a, #81c784)"
                          : "linear-gradient(90deg, #d4af37, #f0d060)",
                      borderRadius: 2,
                      transition: "width 0.5s ease",
                    }}
                  />
                </div>
              </div>
            )}

            {/* Requirements */}
            {selected.requirements.length > 0 && (
              <div style={{ marginBottom: 28 }}>
                <h3
                  style={{
                    fontSize: 10,
                    fontFamily: "'DM Sans', sans-serif",
                    textTransform: "uppercase",
                    letterSpacing: 2,
                    color: "rgba(232,230,225,0.35)",
                    marginBottom: 14,
                    fontWeight: 500,
                  }}
                >
                  Requirements ({selected.requirements.filter((r) => r.done).length}/
                  {selected.requirements.length})
                </h3>

                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  {selected.requirements.map((req, i) => (
                    <div
                      key={i}
                      onClick={() => toggleRequirement(selected.id, i)}
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: 12,
                        padding: "12px 16px",
                        background: req.done
                          ? "rgba(102,187,106,0.05)"
                          : "rgba(255,255,255,0.02)",
                        border: req.done
                          ? "1px solid rgba(102,187,106,0.15)"
                          : "1px solid rgba(255,255,255,0.05)",
                        borderRadius: 8,
                        cursor: "pointer",
                        transition: "all 0.2s",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = req.done
                          ? "rgba(102,187,106,0.08)"
                          : "rgba(255,255,255,0.04)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = req.done
                          ? "rgba(102,187,106,0.05)"
                          : "rgba(255,255,255,0.02)";
                      }}
                    >
                      <div
                        style={{
                          width: 20,
                          height: 20,
                          borderRadius: 5,
                          border: req.done
                            ? "2px solid #66bb6a"
                            : "2px solid rgba(255,255,255,0.15)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                          marginTop: 1,
                          background: req.done ? "rgba(102,187,106,0.2)" : "transparent",
                          transition: "all 0.2s",
                        }}
                      >
                        {req.done && (
                          <span style={{ color: "#66bb6a", fontSize: 13, fontWeight: 700 }}>
                            ✓
                          </span>
                        )}
                      </div>
                      <div style={{ flex: 1 }}>
                        <span
                          style={{
                            fontSize: 14,
                            fontFamily: "'DM Sans', sans-serif",
                            color: req.done ? "rgba(232,230,225,0.4)" : "rgba(232,230,225,0.85)",
                            textDecoration: req.done ? "line-through" : "none",
                            lineHeight: 1.5,
                          }}
                        >
                          {req.text}
                        </span>
                        {req.tags && req.tags.length > 0 && (
                          <div style={{ display: "flex", gap: 4, marginTop: 6, flexWrap: "wrap" }}>
                            {req.tags.map((tag) => (
                              <span
                                key={tag}
                                style={{
                                  fontSize: 9,
                                  fontFamily: "'DM Sans', sans-serif",
                                  fontWeight: 500,
                                  textTransform: "uppercase",
                                  letterSpacing: 0.8,
                                  padding: "2px 7px",
                                  borderRadius: 3,
                                  background: tagColors[tag]?.bg || "#1a1a2e",
                                  color: tagColors[tag]?.text || "#888",
                                }}
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Notes */}
            <div style={{ marginBottom: 28 }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: 10,
                }}
              >
                <h3
                  style={{
                    fontSize: 10,
                    fontFamily: "'DM Sans', sans-serif",
                    textTransform: "uppercase",
                    letterSpacing: 2,
                    color: "rgba(232,230,225,0.35)",
                    margin: 0,
                    fontWeight: 500,
                  }}
                >
                  Notes
                </h3>
                <button
                  onClick={() => {
                    if (editingNote) {
                      saveNote();
                    } else {
                      setNoteText(selected.notes);
                      setEditingNote(true);
                    }
                  }}
                  style={{
                    fontSize: 10,
                    fontFamily: "'DM Sans', sans-serif",
                    fontWeight: 500,
                    textTransform: "uppercase",
                    letterSpacing: 1,
                    padding: "4px 12px",
                    borderRadius: 4,
                    border: "1px solid rgba(212,175,55,0.25)",
                    background: editingNote ? "rgba(212,175,55,0.15)" : "transparent",
                    color: "#d4af37",
                    cursor: "pointer",
                    transition: "all 0.2s",
                  }}
                >
                  {editingNote ? "Save" : "Edit"}
                </button>
              </div>

              {editingNote ? (
                <textarea
                  value={noteText}
                  onChange={(e) => setNoteText(e.target.value)}
                  style={{
                    width: "100%",
                    minHeight: 100,
                    padding: 14,
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(212,175,55,0.2)",
                    borderRadius: 8,
                    color: "#e8e6e1",
                    fontSize: 13,
                    fontFamily: "'DM Sans', sans-serif",
                    lineHeight: 1.7,
                    outline: "none",
                    resize: "vertical",
                    boxSizing: "border-box",
                  }}
                />
              ) : (
                <div
                  style={{
                    padding: 14,
                    background: "rgba(255,255,255,0.02)",
                    border: "1px solid rgba(255,255,255,0.05)",
                    borderRadius: 8,
                    fontSize: 13,
                    fontFamily: "'DM Sans', sans-serif",
                    color: "rgba(232,230,225,0.6)",
                    lineHeight: 1.7,
                  }}
                >
                  {selected.notes || "No notes yet."}
                </div>
              )}
            </div>

            {/* Shared Needs Section — only show on main project */}
            {selected.id === "whb-companies" && (
              <div>
                <h3
                  style={{
                    fontSize: 10,
                    fontFamily: "'DM Sans', sans-serif",
                    textTransform: "uppercase",
                    letterSpacing: 2,
                    color: "rgba(232,230,225,0.35)",
                    marginBottom: 14,
                    fontWeight: 500,
                  }}
                >
                  Shared Needs Across Companies
                </h3>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {sharedNeeds.map(({ tag, count }) => (
                    <div
                      key={tag}
                      style={{
                        padding: "8px 14px",
                        background: tagColors[tag]?.bg || "#1a1a2e",
                        border: `1px solid ${tagColors[tag]?.text || "#888"}25`,
                        borderRadius: 8,
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                      }}
                    >
                      <span
                        style={{
                          fontSize: 12,
                          fontFamily: "'DM Sans', sans-serif",
                          fontWeight: 500,
                          color: tagColors[tag]?.text || "#888",
                          textTransform: "capitalize",
                        }}
                      >
                        {tag.replace("-", " ")}
                      </span>
                      <span
                        style={{
                          fontSize: 10,
                          fontFamily: "'DM Sans', sans-serif",
                          fontWeight: 700,
                          color: tagColors[tag]?.text || "#888",
                          opacity: 0.6,
                          background: "rgba(255,255,255,0.08)",
                          padding: "1px 6px",
                          borderRadius: 3,
                        }}
                      >
                        {count}
                      </span>
                    </div>
                  ))}
                </div>
                <p
                  style={{
                    fontSize: 11,
                    fontFamily: "'DM Sans', sans-serif",
                    color: "rgba(232,230,225,0.3)",
                    marginTop: 10,
                    fontStyle: "italic",
                  }}
                >
                  Number indicates how many active companies share this need — opportunity for
                  shared solutions.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}