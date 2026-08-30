export const PROJECTS = {
  frontend: [
    {
      id: "portfolio",
      title: "Personal Portfolio Website",
      description:
        "Build a responsive personal portfolio showcasing your projects and skills. A great first step to demonstrate your HTML, CSS, and responsive design abilities.",
      demonstrates: ["HTML", "CSS", "Responsive Design"],
      estimatedTime: "~1 week",
      difficulty: "beginner",
      deliverables: [
        "Responsive landing page with smooth navigation",
        "Project showcase section with interactive cards",
        "About me and contact section",
        "Mobile-friendly design that works on all screens",
      ],
    },
    {
      id: "dashboard",
      title: "Student Event Dashboard",
      description:
        "Build an interactive dashboard that fetches real event data from a public API and displays it dynamically with filtering and sorting.",
      demonstrates: ["JavaScript", "API Integration", "HTML"],
      estimatedTime: "~2 weeks",
      difficulty: "intermediate",
      deliverables: [
        "Fetch and display data from a public API (e.g., events, weather)",
        "Dynamic filtering and sorting controls",
        "Clean, responsive grid layout",
        "Loading states and error handling",
      ],
    },
    {
      id: "reactApp",
      title: "React Task Manager",
      description:
        "Build a full task management app with React — add, complete, and delete tasks with proper state management and component structure.",
      demonstrates: ["React", "JavaScript", "CSS", "Git"],
      estimatedTime: "~2 weeks",
      difficulty: "intermediate",
      deliverables: [
        "Functional React component architecture",
        "Add, complete, and delete tasks with state",
        "useState and useEffect hooks usage",
        "Pushed to a GitHub repository with README",
      ],
    },
  ],
  dataAnalyst: [
    {
      id: "csvAnalysis",
      title: "CSV Data Explorer",
      description:
        "Load a public dataset, clean it, and generate summary statistics using Python and Pandas. A foundational project for any data analyst.",
      demonstrates: ["Python", "Pandas", "Excel / Spreadsheets"],
      estimatedTime: "~1 week",
      difficulty: "beginner",
      deliverables: [
        "Load and clean a real CSV dataset",
        "Generate 5+ meaningful summary statistics",
        "Handle missing values and outliers",
        "Jupyter notebook with clear documentation",
      ],
    },
    {
      id: "salesDashboard",
      title: "Sales Data Dashboard",
      description:
        "Analyze a sales dataset and create an interactive visualization dashboard with charts that tell a story.",
      demonstrates: ["Data Visualization", "SQL", "Python"],
      estimatedTime: "~2 weeks",
      difficulty: "intermediate",
      deliverables: [
        "SQL queries to extract and aggregate data",
        "4+ visualizations (bar, line, pie, heatmap)",
        "Interactive filters or slicers",
        "Key insights written in a summary report",
      ],
    },
    {
      id: "abTest",
      title: "A/B Test Analysis Report",
      description:
        "Perform statistical analysis on A/B test data, apply hypothesis testing, and present actionable business conclusions.",
      demonstrates: ["Statistics", "Python", "Data Visualization"],
      estimatedTime: "~1.5 weeks",
      difficulty: "intermediate",
      deliverables: [
        "Clear hypothesis formulation",
        "Statistical test (t-test or chi-square)",
        "Visualization of test results",
        "Business recommendation based on findings",
      ],
    },
  ],
  uiux: [
    {
      id: "appRedesign",
      title: "Mobile App Redesign",
      description:
        "Pick a popular app you use daily, identify its UX problems, and redesign 3 key screens in Figma with a clear rationale.",
      demonstrates: ["Figma", "Visual Design", "User Research"],
      estimatedTime: "~1.5 weeks",
      difficulty: "beginner",
      deliverables: [
        "UX audit of 3 screens with identified issues",
        "Redesigned wireframes for each screen",
        "High-fidelity mockups in Figma",
        "Written rationale for every design decision",
      ],
    },
    {
      id: "userStudy",
      title: "User Research & Wireframe Sprint",
      description:
        "Conduct real user interviews, synthesize findings into personas, and wireframe a solution to the core problem you discover.",
      demonstrates: ["User Research", "Wireframing", "Design Thinking"],
      estimatedTime: "~2 weeks",
      difficulty: "intermediate",
      deliverables: [
        "Interview script and 5 real user interviews",
        "Affinity map of synthesized findings",
        "User persona document",
        "Low-fidelity wireframes of the core user flow",
      ],
    },
    {
      id: "prototype",
      title: "Interactive Prototype Challenge",
      description:
        "Design and prototype a complete user flow for a food delivery app — from browsing to checkout — with a clickable Figma prototype.",
      demonstrates: ["Prototyping", "Figma", "Wireframing", "Visual Design"],
      estimatedTime: "~2 weeks",
      difficulty: "intermediate",
      deliverables: [
        "User flow diagram mapping the entire journey",
        "5+ wireframed screens",
        "Clickable Figma prototype with transitions",
        "Usability test with 3 users and findings report",
      ],
    },
  ],
};
