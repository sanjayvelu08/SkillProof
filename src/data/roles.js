export const ROLES = {
  frontend: {
    id: "frontend",
    title: "Frontend Developer",
    icon: "💻",
    description: "Build beautiful, interactive user interfaces for web applications",
    skills: [
      { name: "HTML", weight: 0.15, difficulty: "beginner" },
      { name: "CSS", weight: 0.15, difficulty: "beginner" },
      { name: "JavaScript", weight: 0.2, difficulty: "intermediate" },
      { name: "React", weight: 0.2, difficulty: "intermediate" },
      { name: "Responsive Design", weight: 0.1, difficulty: "beginner" },
      { name: "Git", weight: 0.1, difficulty: "beginner" },
      { name: "API Integration", weight: 0.1, difficulty: "intermediate" },
    ],
  },
  dataAnalyst: {
    id: "dataAnalyst",
    title: "Data Analyst",
    icon: "📊",
    description: "Turn raw data into actionable insights that drive decisions",
    skills: [
      { name: "Python", weight: 0.2, difficulty: "intermediate" },
      { name: "SQL", weight: 0.2, difficulty: "intermediate" },
      { name: "Excel / Spreadsheets", weight: 0.1, difficulty: "beginner" },
      { name: "Data Visualization", weight: 0.15, difficulty: "intermediate" },
      { name: "Statistics", weight: 0.15, difficulty: "intermediate" },
      { name: "Pandas", weight: 0.1, difficulty: "intermediate" },
      { name: "Critical Thinking", weight: 0.1, difficulty: "beginner" },
    ],
  },
  uiux: {
    id: "uiux",
    title: "UI/UX Designer",
    icon: "🎨",
    description: "Design intuitive, beautiful digital experiences users love",
    skills: [
      { name: "Figma", weight: 0.2, difficulty: "intermediate" },
      { name: "User Research", weight: 0.15, difficulty: "intermediate" },
      { name: "Wireframing", weight: 0.15, difficulty: "beginner" },
      { name: "Prototyping", weight: 0.15, difficulty: "intermediate" },
      { name: "Visual Design", weight: 0.15, difficulty: "intermediate" },
      { name: "HTML/CSS Basics", weight: 0.1, difficulty: "beginner" },
      { name: "Design Thinking", weight: 0.1, difficulty: "beginner" },
    ],
  },
};

export const ROLE_LIST = Object.values(ROLES);
