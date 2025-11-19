import React, { useState, useEffect } from "react";
import ReactFlow from "reactflow";
import "reactflow/dist/style.css";
import { FaCheckCircle, FaCode, FaCogs, FaProjectDiagram, FaPuzzlePiece, FaRocket } from "react-icons/fa";
import { FiX, FiTrash2, FiFilter, FiThumbsUp, FiDownload, FiPlus, FiSearch, FiAward, FiTrendingUp, FiCalendar } from "react-icons/fi";

// Roadmap descriptions
const roadmapDescriptions = {
  JavaScript: "JavaScript is the language of the web. Master the basics, then move to advanced topics and frameworks.",
  Python: "Python is versatile and beginner-friendly. Great for data science, web, automation, and more.",
  Java: "Java is robust and widely used in enterprise, Android, and backend development.",
  "C++": "C++ is powerful for system programming, game development, and performance-critical applications.",
  React: "React is a JavaScript library for building fast, interactive user interfaces with reusable components.",
  SQL: "SQL is essential for database management and querying data efficiently.",
};

// Step icons
const stepIcons = [
  <FaCode className="text-indigo-400" />,
  <FaCogs className="text-green-400" />,
  <FaPuzzlePiece className="text-yellow-400" />,
  <FaProjectDiagram className="text-pink-400" />,
  <FaRocket className="text-blue-400" />,
  <FaCheckCircle className="text-green-500" />,
];

// Roadmaps
const roadmaps = {
  JavaScript: ["Variables & Data Types","Control Structures","Functions","Objects & Arrays","ES6+ Features","DOM Manipulation","Async JS"],
  Python: ["Syntax & Variables","Data Structures","Control Flow","Functions & Modules","OOP Concepts","Popular Libraries","Web Frameworks"],
  Java: ["Syntax & Variables","Control Flow","OOP Concepts","Collections","Exception Handling","File I/O","Frameworks"],
  "C++": ["Syntax & Variables","Control Flow","Functions","Pointers & References","OOP Concepts","STL","Templates"],
  React: ["JSX Basics","Components","Props","State Management","Hooks","Context API","Performance Optimization"],
  SQL: ["SELECT & WHERE","Joins","Aggregations","Subqueries","Indexes","Transactions","Stored Procedures"],
};

// Step details
const stepDetails = {
  JavaScript: [
    { title: "Variables & Data Types", description: "Learn how to declare variables and use different data types in JavaScript.", example: `let name = "Alice";\nlet age = 25;\nlet isActive = true;\nconst PI = 3.14159;` },
    { title: "Control Structures", description: "Use if, else, for, and while to control the flow of your program.", example: `for(let i=0; i<5; i++) {\n  if(i % 2 === 0) console.log(i);\n}` },
    { title: "Functions", description: "Write reusable blocks of code using functions.", example: `function greet(name) {\n  return "Hello, " + name;\n}\nconsole.log(greet("Alice"));` },
    { title: "Objects & Arrays", description: "Store and organize data using objects and arrays.", example: `const user = { name: "Alice", age: 25 };\nconst numbers = [1,2,3,4];\nconsole.log(user.name, numbers[0]);` },
    { title: "ES6+ Features", description: "Modern JS features like arrow functions, destructuring, and more.", example: `const add = (a,b) => a+b;\nconst [x, y] = [1, 2];\nconst {...rest} = {a:1, b:2};` },
    { title: "DOM Manipulation", description: "Interact with the page using the Document Object Model.", example: `const elem = document.getElementById("demo");\nelem.textContent = "Hello!";\nelem.classList.add("active");` },
    { title: "Async JS", description: "Handle async operations with callbacks, promises, and async/await.", example: `async function getData() {\n  const res = await fetch('/api');\n  const data = await res.json();\n  return data;\n}` }
  ],
  Python: [
    { title: "Syntax & Variables", description: "Python basics including variables, types, and operations.", example: `name = "Alice"\nage = 25\nheight = 5.6\nprint(f"{name} is {age} years old")` },
    { title: "Data Structures", description: "Lists, tuples, sets, and dictionaries for storing data.", example: `numbers = [1, 2, 3, 4]\nuser = {"name": "Alice", "age": 25}\nset_nums = {1, 2, 3}` },
    { title: "Control Flow", description: "If-else, loops, and break/continue statements.", example: `for i in range(5):\n  if i % 2 == 0:\n    print(i)\n  else:\n    continue` },
    { title: "Functions & Modules", description: "Create reusable functions and organize code into modules.", example: `def add(a, b):\n  return a + b\n\nresult = add(5, 3)\nprint(result)` },
    { title: "OOP Concepts", description: "Classes, objects, inheritance, and polymorphism.", example: `class Animal:\n  def __init__(self, name):\n    self.name = name\n\ndog = Animal("Buddy")` },
    { title: "Popular Libraries", description: "NumPy, Pandas, and Matplotlib for data processing.", example: `import pandas as pd\nimport numpy as np\ndf = pd.read_csv('data.csv')` },
    { title: "Web Frameworks", description: "Flask and Django for building web applications.", example: `from flask import Flask\napp = Flask(__name__)\n@app.route('/')\ndef hello():\n  return 'Hello World'` }
  ],
  React: [
    { title: "JSX Basics", description: "Learn to write JSX syntax to create UI elements.", example: `const element = (\n  <div>\n    <h1>Hello, {name}!</h1>\n    <p>Welcome to React</p>\n  </div>\n);` },
    { title: "Components", description: "Create functional and class components.", example: `function Welcome(props) {\n  return <h1>Hello, {props.name}</h1>;\n}\n\nconst root = ReactDOM.createRoot(document.getElementById('root'));\nroot.render(<Welcome name="Alice" />);` },
    { title: "Props", description: "Pass data from parent to child components.", example: `function User({name, age}) {\n  return <div>{name} is {age} years old</div>;\n}\n\n<User name="Alice" age={25} />` },
    { title: "State Management", description: "Manage component state with useState hook.", example: `const [count, setCount] = useState(0);\n\nreturn (\n  <div>\n    <p>Count: {count}</p>\n    <button onClick={() => setCount(count + 1)}>+</button>\n  </div>\n);` },
    { title: "Hooks", description: "Use React hooks like useEffect, useContext, useReducer.", example: `useEffect(() => {\n  console.log('Component mounted');\n  return () => console.log('Cleanup');\n}, []);` },
    { title: "Context API", description: "Manage global state without prop drilling.", example: `const ThemeContext = createContext();\n<ThemeContext.Provider value={theme}>\n  <App />\n</ThemeContext.Provider>` },
    { title: "Performance Optimization", description: "Use memo, useMemo, useCallback for optimization.", example: `const MemoComponent = memo(({data}) => {\n  return <div>{data}</div>;\n});\n\nconst memoValue = useMemo(() => expensiveCalc(), []);` }
  ],
  SQL: [
    { title: "SELECT & WHERE", description: "Query data from tables with conditions.", example: `SELECT name, email FROM users WHERE age > 18;` },
    { title: "Joins", description: "Combine data from multiple tables.", example: `SELECT users.name, orders.order_id\nFROM users\nINNER JOIN orders ON users.id = orders.user_id;` },
    { title: "Aggregations", description: "Count, sum, average, and group results.", example: `SELECT COUNT(*), AVG(salary)\nFROM employees\nGROUP BY department;` },
    { title: "Subqueries", description: "Nested queries for complex operations.", example: `SELECT name FROM users\nWHERE id IN (SELECT user_id FROM orders);` },
    { title: "Indexes", description: "Create indexes for faster queries.", example: `CREATE INDEX idx_email ON users(email);\nCREATE UNIQUE INDEX idx_username ON users(username);` },
    { title: "Transactions", description: "ACID transactions for data consistency.", example: `BEGIN TRANSACTION;\nUPDATE accounts SET balance = balance - 100;\nCOMMIT;` },
    { title: "Stored Procedures", description: "Create reusable database procedures.", example: `CREATE PROCEDURE GetUserById(IN user_id INT)\nBEGIN\n  SELECT * FROM users WHERE id = user_id;\nEND;` }
  ],
};

// Node component with better styling
function RoadmapNode({ data }) {
  return (
    <div
      className={`cursor-pointer rounded-xl p-4 flex items-center gap-4 font-semibold transition-all duration-300 border-l-8 transform hover:scale-110 hover:shadow-2xl
      ${data.isStart 
        ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white border-indigo-400 shadow-lg shadow-indigo-500/50" 
        : data.isEnd 
        ? "bg-gradient-to-r from-green-400 to-emerald-500 text-white border-green-400 shadow-lg shadow-green-500/50"
        : data.selected
        ? "bg-gradient-to-r from-yellow-400 to-orange-500 text-white border-yellow-400 scale-105 shadow-2xl shadow-yellow-500/50"
        : "bg-gradient-to-br from-gray-700 to-gray-800 text-indigo-100 border-indigo-500 hover:from-indigo-700/80 hover:to-indigo-600/80 hover:text-white hover:border-indigo-400"
      }`}
      onClick={data.onClick}
      style={{
        boxShadow: data.isStart || data.isEnd || data.selected ? `0 0 30px ${data.isStart ? '#818cf8' : data.isEnd ? '#10b981' : '#fbbf24'}` : 'none'
      }}
    >
      <span className="text-2xl animate-pulse" style={{ animationDelay: `${(data.step - 1) * 0.1}s` }}>
        {stepIcons[(data.step - 1) % stepIcons.length]}
      </span>
      <span>
        <span className="font-bold text-indigo-200 mr-2">{data.step}.</span>
        {data.label}
      </span>
    </div>
  );
}

const nodeTypes = { roadmap: RoadmapNode };

const getNodesAndEdges = (steps, selectedStep, setSelectedStep) => {
  const nodes = steps.map((label, idx) => ({
    id: `${idx + 1}`,
    position: { x: 0, y: idx * 150 },
    data: { label, step: idx + 1, isStart: idx === 0, isEnd: idx === steps.length - 1, selected: selectedStep === idx, onClick: () => setSelectedStep(idx) },
    type: "roadmap",
    selected: selectedStep === idx,
  }));
  const edges = steps.slice(1).map((_, idx) => ({
    id: `e${idx + 1}-${idx + 2}`,
    source: `${idx + 1}`,
    target: `${idx + 2}`,
    type: "smoothstep",
    animated: true,
    style: { stroke: "#818cf8", strokeWidth: 3 },
  }));
  return { nodes, edges };
};

const defaultProfiles = [
  { name: "Vikas Pal", platform: "LeetCode", handle: "vikas83pal", score: 1500, problemsSolved: 300 },
  { name: "Anita Sharma", platform: "Codeforces", handle: "anita123", score: 1800, problemsSolved: 750 },
  { name: "Rohit Kumar", platform: "GitHub", handle: "rohitdev", score: 2800, problemsSolved: 400 },
];

const Arena = () => {
  const [selectedLang, setSelectedLang] = useState("JavaScript");
  const [search, setSearch] = useState("");
  const [selectedStep, setSelectedStep] = useState(null);
  
  // Load profiles from localStorage
  const [profiles, setProfiles] = useState(() => {
    const saved = localStorage.getItem("arena_profiles");
    return saved ? JSON.parse(saved) : defaultProfiles;
  });

  // Load ideas from localStorage
  const [ideasList, setIdeasList] = useState(() => {
    const saved = localStorage.getItem("arena_ideas");
    return saved ? JSON.parse(saved) : [];
  });

  // Load progress tracking from localStorage
  const [completedSteps, setCompletedSteps] = useState(() => {
    const saved = localStorage.getItem("arena_completed_steps");
    return saved ? JSON.parse(saved) : {};
  });

  const [selectedProfile, setSelectedProfile] = useState(null);
  const [idea, setIdea] = useState("");
  const [newProfile, setNewProfile] = useState(null);
  const [showProfileForm, setShowProfileForm] = useState(false);
  const [filterPlatform, setFilterPlatform] = useState("");
  const [ideaSortBy, setIdeaSortBy] = useState("recent");

  // Save profiles to localStorage
  useEffect(() => {
    localStorage.setItem("arena_profiles", JSON.stringify(profiles));
  }, [profiles]);

  // Save ideas to localStorage
  useEffect(() => {
    localStorage.setItem("arena_ideas", JSON.stringify(ideasList));
  }, [ideasList]);

  // Save completed steps to localStorage
  useEffect(() => {
    localStorage.setItem("arena_completed_steps", JSON.stringify(completedSteps));
  }, [completedSteps]);

  const filteredLangs = Object.keys(roadmaps).filter(lang => lang.toLowerCase().includes(search.toLowerCase()));

  useEffect(() => setSelectedStep(null), [selectedLang]);
  const { nodes, edges } = getNodesAndEdges(roadmaps[selectedLang], selectedStep, setSelectedStep);
  const stepInfo = selectedStep !== null && stepDetails[selectedLang] ? stepDetails[selectedLang][selectedStep] : null;

  const handleSubmitIdea = (e) => {
    e.preventDefault();
    if (!idea.trim()) {
      alert("Please enter an idea before submitting!");
      return;
    }
    setIdeasList([...ideasList, { text: idea, votes: 0, timestamp: new Date().toLocaleString(), author: "You" }]);
    setIdea("");
  };

  const handleVote = (index) => {
    const updatedIdeas = ideasList.map((item, idx) => 
      idx === index ? { ...item, votes: item.votes + 1 } : item
    );
    setIdeasList(updatedIdeas);
  };

  const handleDeleteIdea = (index) => {
    setIdeasList(ideasList.filter((_, idx) => idx !== index));
  };

  const handleDeleteProfile = (index) => {
    setProfiles(profiles.filter((_, idx) => idx !== index));
  };

  const handleAddProfile = (e) => {
    e.preventDefault();
    if (newProfile && newProfile.name && newProfile.platform && newProfile.handle && newProfile.score) {
      setProfiles([...profiles, { ...newProfile, problemsSolved: 0 }]);
      setNewProfile(null);
      setShowProfileForm(false);
    }
  };

  const handleToggleStep = (stepIndex) => {
    const key = `${selectedLang}_${stepIndex}`;
    setCompletedSteps((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const sortedIdeas = [...ideasList].sort((a, b) => {
    if (ideaSortBy === "votes") return b.votes - a.votes;
    return 0; // recent (default order)
  });

  const filteredProfiles = filterPlatform
    ? profiles.filter((p) => p.platform.toLowerCase().includes(filterPlatform.toLowerCase()))
    : profiles;

  const progressPercentage = selectedLang && completedSteps
    ? Math.round(
        (Object.keys(completedSteps).filter((k) => k.startsWith(selectedLang) && completedSteps[k]).length /
          roadmaps[selectedLang].length) *
          100
      )
    : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 space-y-12">

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
            Learning Arena
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">Master programming languages with interactive roadmaps, track your progress, and collaborate with the community</p>
        </div>

        {/* Roadmap Section */}
        <section className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/10">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold text-indigo-400 flex items-center gap-2">
              <FaCode className="text-indigo-500" /> Programming Roadmaps
            </h2>
            <div className="text-right bg-gradient-to-r from-indigo-500/20 to-purple-500/20 px-4 py-2 rounded-lg border border-indigo-400/30">
              <p className="text-sm text-gray-400">Progress</p>
              <p className="text-2xl font-bold text-indigo-400">{progressPercentage}%</p>
            </div>
          </div>
          
          <p className="text-center text-indigo-200 mb-6 text-lg">{roadmapDescriptions[selectedLang]}</p>

          <div className="mb-6">
            <div className="relative mb-4">
              <FiSearch className="absolute left-3 top-3 text-gray-500" />
              <input
                type="text"
                placeholder="Search language..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full px-10 py-2.5 rounded-lg bg-gray-800/50 text-white border border-gray-700/50 focus:border-indigo-400 focus:outline-none transition"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {filteredLangs.map((lang) => (
                <button
                  key={lang}
                  onClick={() => setSelectedLang(lang)}
                  className={`px-6 py-2.5 rounded-lg font-semibold transition-all duration-200 flex items-center gap-2 ${
                    selectedLang === lang
                      ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white scale-105 shadow-lg"
                      : "bg-gray-800 hover:bg-indigo-600/30 text-gray-300 border border-gray-700"
                  }`}
                >
                  <FaCode className="w-4 h-4" />
                  {lang}
                </button>
              ))}
            </div>
          </div>

          {/* Roadmap Flow */}
          <div style={{ height: 500, borderRadius: 12, padding: 8, marginBottom: 20 }} className="bg-gray-900/50 border border-gray-700/30">
            <ReactFlow nodes={nodes} edges={edges} fitView panOnDrag zoomOnScroll zoomOnPinch nodeTypes={nodeTypes} style={{ background: "transparent" }} />
          </div>

          {/* Step Details with Animation */}
          {stepInfo && (
            <div className="animate-fadeIn bg-gradient-to-br from-indigo-900/40 to-purple-900/40 rounded-2xl p-8 border-2 border-indigo-400/50 backdrop-blur-sm shadow-2xl shadow-indigo-500/20">
              <div className="flex items-start justify-between mb-6">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-xl">
                      {stepIcons[selectedStep % stepIcons.length]}
                    </div>
                    <div>
                      <h3 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-purple-300">{stepInfo.title}</h3>
                      <p className="text-indigo-200 text-sm">Step {selectedStep + 1} of {roadmaps[selectedLang].length}</p>
                    </div>
                  </div>
                  <p className="text-gray-200 text-lg leading-relaxed">{stepInfo.description}</p>
                </div>
                <button
                  onClick={() => handleToggleStep(selectedStep)}
                  className={`ml-4 px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition-all transform hover:scale-105 whitespace-nowrap ${
                    completedSteps[`${selectedLang}_${selectedStep}`]
                      ? "bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white shadow-lg shadow-green-500/50"
                      : "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-lg shadow-indigo-500/50"
                  }`}
                >
                  <FiCheckCircle className="w-5 h-5" />
                  {completedSteps[`${selectedLang}_${selectedStep}`] ? "✓ Completed" : "Mark Done"}
                </button>
              </div>

              {/* Code Example Section */}
              <div className="mt-6">
                <h4 className="text-lg font-bold text-indigo-300 mb-3 flex items-center gap-2">
                  <FaCode className="text-green-400" /> Example Code
                </h4>
                <div className="bg-gray-950 rounded-xl p-6 border border-gray-700/50 overflow-x-auto shadow-inner">
                  <pre className="text-green-400 font-mono text-sm leading-relaxed whitespace-pre-wrap break-words">
                    {stepInfo.example}
                  </pre>
                </div>
              </div>

              {/* Progress Indicator */}
              <div className="mt-6 pt-6 border-t border-gray-700/50">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-gray-300 font-semibold">Your Progress</p>
                  <p className="text-indigo-400 font-bold">{progressPercentage}%</p>
                </div>
                <div className="w-full bg-gray-800 rounded-full h-3 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-indigo-500 to-purple-500 h-full transition-all duration-500 rounded-full shadow-lg shadow-indigo-500/50"
                    style={{ width: `${progressPercentage}%` }}
                  />
                </div>
              </div>
            </div>
          )}
        </section>

        {/* Coding Profiles Section */}
        <section className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/10">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold text-indigo-400 flex items-center gap-2">
              <FiAward className="text-indigo-500" /> Coding Profiles
            </h2>
            <button
              onClick={() => setShowProfileForm(!showProfileForm)}
              className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 rounded-lg font-semibold flex items-center gap-2 transition"
            >
              <FiPlus className="w-5 h-5" />
              Add Profile
            </button>
          </div>

          {/* Add Profile Form */}
          {showProfileForm && (
            <form onSubmit={handleAddProfile} className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-6 mb-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Name"
                  value={newProfile?.name || ""}
                  onChange={(e) => setNewProfile({ ...newProfile, name: e.target.value })}
                  className="px-4 py-2 rounded-lg bg-gray-700 text-white border border-gray-600 focus:border-indigo-400 focus:outline-none"
                />
                <input
                  type="text"
                  placeholder="Platform (e.g., LeetCode)"
                  value={newProfile?.platform || ""}
                  onChange={(e) => setNewProfile({ ...newProfile, platform: e.target.value })}
                  className="px-4 py-2 rounded-lg bg-gray-700 text-white border border-gray-600 focus:border-indigo-400 focus:outline-none"
                />
                <input
                  type="text"
                  placeholder="Handle"
                  value={newProfile?.handle || ""}
                  onChange={(e) => setNewProfile({ ...newProfile, handle: e.target.value })}
                  className="px-4 py-2 rounded-lg bg-gray-700 text-white border border-gray-600 focus:border-indigo-400 focus:outline-none"
                />
                <input
                  type="number"
                  placeholder="Score"
                  value={newProfile?.score || ""}
                  onChange={(e) => setNewProfile({ ...newProfile, score: parseInt(e.target.value) })}
                  className="px-4 py-2 rounded-lg bg-gray-700 text-white border border-gray-600 focus:border-indigo-400 focus:outline-none"
                />
              </div>
              <div className="flex gap-2 mt-4">
                <button type="submit" className="flex-1 bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg font-semibold transition">
                  Add Profile
                </button>
                <button type="button" onClick={() => setShowProfileForm(false)} className="flex-1 bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-lg font-semibold transition">
                  Cancel
                </button>
              </div>
            </form>
          )}

          {/* Platform Filter */}
          <div className="mb-6 flex gap-2 flex-wrap">
            <button
              onClick={() => setFilterPlatform("")}
              className={`px-4 py-2 rounded-lg font-semibold transition ${
                filterPlatform === "" ? "bg-indigo-600 text-white" : "bg-gray-800 text-gray-300 hover:bg-gray-700"
              }`}
            >
              All Platforms
            </button>
            {["LeetCode", "Codeforces", "GitHub", "HackerRank"].map((platform) => (
              <button
                key={platform}
                onClick={() => setFilterPlatform(platform)}
                className={`px-4 py-2 rounded-lg font-semibold transition ${
                  filterPlatform === platform ? "bg-indigo-600 text-white" : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                }`}
              >
                {platform}
              </button>
            ))}
          </div>

          {/* Profiles Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProfiles.map((profile, idx) => (
              <div
                key={idx}
                onClick={() => setSelectedProfile(profile)}
                className="bg-gradient-to-br from-white/5 to-white/10 p-6 rounded-xl border border-white/10 hover:border-indigo-400/50 hover:shadow-lg hover:shadow-indigo-500/10 transition duration-300 cursor-pointer group"
              >
                <div className="flex justify-between items-start mb-3">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold group-hover:text-indigo-400 transition">{profile.name}</h3>
                    <p className="text-indigo-300 text-sm">{profile.platform}</p>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteProfile(idx);
                    }}
                    className="p-2 hover:bg-red-600/30 rounded-lg transition text-red-400"
                  >
                    <FiTrash2 className="w-5 h-5" />
                  </button>
                </div>
                <div className="space-y-2">
                  <p className="text-gray-300">Handle: <span className="text-indigo-300 font-semibold">{profile.handle}</span></p>
                  <div className="flex items-center justify-between">
                    <p className="text-gray-400">Score</p>
                    <p className="text-2xl font-bold text-green-400">{profile.score}</p>
                  </div>
                  {profile.problemsSolved > 0 && (
                    <p className="text-sm text-gray-400">✓ {profile.problemsSolved} problems solved</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Hackathon Ideas Section */}
        <section className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/10">
          <h2 className="text-3xl font-bold text-indigo-400 mb-6 flex items-center gap-2">
            <FiTrendingUp className="text-indigo-500" /> Hackathon Ideas
          </h2>

          {/* Submit Idea Form */}
          <form onSubmit={handleSubmitIdea} className="mb-8">
            <div className="flex flex-col md:flex-row gap-3">
              <input
                type="text"
                placeholder="Share your hackathon idea..."
                value={idea}
                onChange={(e) => setIdea(e.target.value)}
                className="flex-1 px-4 py-3 rounded-lg bg-gray-800/50 text-white border border-gray-700/50 focus:border-indigo-400 focus:outline-none transition"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 rounded-lg font-semibold flex items-center gap-2 transition"
              >
                <FiPlus className="w-5 h-5" />
                Post Idea
              </button>
            </div>
          </form>

          {/* Ideas Sorting */}
          <div className="mb-6 flex gap-2">
            <button
              onClick={() => setIdeaSortBy("recent")}
              className={`px-4 py-2 rounded-lg font-semibold transition ${
                ideaSortBy === "recent" ? "bg-indigo-600 text-white" : "bg-gray-800 text-gray-300"
              }`}
            >
              Recent
            </button>
            <button
              onClick={() => setIdeaSortBy("votes")}
              className={`px-4 py-2 rounded-lg font-semibold transition ${
                ideaSortBy === "votes" ? "bg-indigo-600 text-white" : "bg-gray-800 text-gray-300"
              }`}
            >
              Most Voted
            </button>
            <span className="ml-auto text-gray-400 text-sm py-2">Total Ideas: {sortedIdeas.length}</span>
          </div>

          {/* Ideas Grid */}
          {sortedIdeas.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {sortedIdeas.map((item, idx) => (
                <div key={idx} className="bg-gradient-to-br from-white/5 to-white/10 p-5 rounded-xl border border-white/10 hover:border-indigo-400/30 transition">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex-1">
                      <p className="text-white font-semibold mb-2">{item.text}</p>
                      <div className="flex gap-2 text-xs text-gray-400">
                        <span className="flex items-center gap-1">
                          <FiCalendar className="w-3 h-3" /> {item.timestamp}
                        </span>
                        {item.author && <span>by {item.author}</span>}
                      </div>
                    </div>
                    <button
                      onClick={() => handleDeleteIdea(idx)}
                      className="p-2 hover:bg-red-600/30 rounded-lg transition text-red-400 flex-shrink-0"
                    >
                      <FiTrash2 className="w-5 h-5" />
                    </button>
                  </div>
                  <button
                    onClick={() => handleVote(idx)}
                    className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-4 py-2 rounded-lg font-semibold flex items-center justify-center gap-2 transition"
                  >
                    <FiThumbsUp className="w-5 h-5" />
                    Vote ({item.votes})
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-gray-800/30 rounded-xl border border-gray-700/30">
              <FiSearch className="w-16 h-16 text-gray-500 mx-auto mb-4" />
              <p className="text-gray-400">No ideas yet. Be the first to share!</p>
            </div>
          )}
        </section>

      </div>

      {/* Profile Modal */}
      {selectedProfile && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-8 rounded-2xl max-w-md w-full relative border border-white/10 shadow-2xl">
            <button
              onClick={() => setSelectedProfile(null)}
              className="absolute top-4 right-4 p-2 hover:bg-white/10 rounded-lg transition"
            >
              <FiX size={24} className="text-gray-400 hover:text-white" />
            </button>

            <div className="mb-6">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-4xl font-bold mb-4">
                {selectedProfile.name.charAt(0)}
              </div>
              <h2 className="text-3xl font-bold text-white mb-1">{selectedProfile.name}</h2>
              <p className="text-indigo-400 font-semibold">{selectedProfile.platform}</p>
            </div>

            <div className="space-y-4 mb-6 pb-6 border-b border-gray-700/50">
              <div className="bg-white/5 p-4 rounded-lg">
                <p className="text-gray-400 text-sm mb-1">Handle</p>
                <p className="text-white font-semibold">{selectedProfile.handle}</p>
              </div>
              <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 p-4 rounded-lg border border-green-500/30">
                <p className="text-gray-400 text-sm mb-1">Score</p>
                <p className="text-3xl font-bold text-green-400">{selectedProfile.score}</p>
              </div>
              {selectedProfile.problemsSolved > 0 && (
                <div className="bg-gradient-to-br from-indigo-500/20 to-purple-500/20 p-4 rounded-lg border border-indigo-500/30">
                  <p className="text-gray-400 text-sm mb-1">Problems Solved</p>
                  <p className="text-2xl font-bold text-indigo-400">{selectedProfile.problemsSolved}</p>
                </div>
              )}
            </div>

            <button
              onClick={() => setSelectedProfile(null)}
              className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white py-3 rounded-lg font-semibold transition"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Arena;
