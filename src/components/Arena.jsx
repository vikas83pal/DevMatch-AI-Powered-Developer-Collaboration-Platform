import React, { useState } from "react";
import ReactFlow from "reactflow";
import "reactflow/dist/style.css";
import { FaCheckCircle, FaCode, FaCogs, FaProjectDiagram, FaPuzzlePiece, FaRocket } from "react-icons/fa";

// Roadmap descriptions
const roadmapDescriptions = {
  JavaScript:
    "JavaScript is the language of the web. Master the basics, then move to advanced topics and frameworks.",
  Python:
    "Python is versatile and beginner-friendly. Great for data science, web, automation, and more.",
  Java:
    "Java is robust and widely used in enterprise, Android, and backend development.",
  "C++":
    "C++ is powerful for system programming, game development, and performance-critical applications.",
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
  JavaScript: [
    "Variables & Data Types",
    "Control Structures",
    "Functions",
    "Objects & Arrays",
    "ES6+ Features",
    "DOM Manipulation",
    "Async JS",
  ],
  Python: [
    "Syntax & Variables",
    "Data Structures",
    "Control Flow",
    "Functions & Modules",
    "OOP Concepts",
    "Popular Libraries",
    "Web Frameworks",
  ],
  Java: [
    "Syntax & Variables",
    "Control Flow",
    "OOP Concepts",
    "Collections",
    "Exception Handling",
    "File I/O",
    "Frameworks",
  ],
  "C++": [
    "Syntax & Variables",
    "Control Flow",
    "Functions",
    "Pointers & References",
    "OOP Concepts",
    "STL",
    "Templates",
  ],
};

// Step details for each language and step
const stepDetails = {
  JavaScript: [
    {
      title: "Variables & Data Types",
      description: "Learn how to declare variables and use different data types in JavaScript.",
      example: `let name = "Alice"; // string
let age = 25; // number
let isActive = true; // boolean`
    },
    {
      title: "Control Structures",
      description: "Use if, else, for, and while to control the flow of your program.",
      example: `for(let i=0; i<5; i++) {
  console.log(i);
}`
    },
    {
      title: "Functions",
      description: "Write reusable blocks of code using functions.",
      example: `function greet(name) {
  return "Hello, " + name;
}`
    },
    {
      title: "Objects & Arrays",
      description: "Store and organize data using objects and arrays.",
      example: `const user = { name: "Alice", age: 25 };
const numbers = [1, 2, 3, 4];`
    },
    {
      title: "ES6+ Features",
      description: "Modern JavaScript features like arrow functions, destructuring, and more.",
      example: `const add = (a, b) => a + b;
const { name } = user;`
    },
    {
      title: "DOM Manipulation",
      description: "Interact with the web page using the Document Object Model.",
      example: `document.getElementById("demo").textContent = "Hello!";`
    },
    {
      title: "Async JS",
      description: "Handle asynchronous operations with callbacks, promises, and async/await.",
      example: `fetch('/api/data')
  .then(res => res.json())
  .then(data => console.log(data));`
    }
  ],
  // Add similar arrays for Python, Java, C++ if you want step details for them
};

function RoadmapNode({ data, isStart, isEnd, step, selected, onClick }) {
  const icon = stepIcons[(step - 1) % stepIcons.length];
  return (
    <div
      onClick={onClick}
      className={`cursor-pointer rounded-xl shadow-xl px-6 py-4 text-left font-semibold transition-all duration-200 border-l-8
        ${selected ? "ring-4 ring-indigo-400 scale-105" : ""}
        ${isStart ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white border-indigo-400"
        : isEnd ? "bg-gradient-to-r from-green-400 to-blue-500 text-white border-green-400"
        : "bg-gray-800 text-indigo-100 border-indigo-700 hover:scale-105 hover:bg-indigo-700"}
      `}
      style={{
        minWidth: 260,
        fontSize: 18,
        margin: "0 auto",
        boxShadow: "0 4px 24px 0 rgba(0,0,0,0.15)",
        display: "flex",
        alignItems: "center",
        gap: 16,
      }}
    >
      <span className="text-2xl">{icon}</span>
      <span>
        <span className="font-bold text-indigo-200 mr-2">{step}.</span>
        {data.label}
      </span>
    </div>
  );
}

const nodeTypes = {
  roadmap: RoadmapNode,
};

const getNodesAndEdges = (steps, selectedStep, setSelectedStep) => {
  const nodes = steps.map((label, idx) => ({
    id: `${idx + 1}`,
    position: { x: (idx % 2 === 0 ? 0 : 180), y: idx * 120 },
    data: {
      label,
      step: idx + 1,
      isStart: idx === 0,
      isEnd: idx === steps.length - 1,
      selected: selectedStep === idx,
      onClick: () => setSelectedStep(idx),
    },
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

const Arena = () => {
  const [selectedLang, setSelectedLang] = useState("JavaScript");
  const [search, setSearch] = useState("");
  const [selectedStep, setSelectedStep] = useState(null);

  const filteredLangs = Object.keys(roadmaps).filter((lang) =>
    lang.toLowerCase().includes(search.toLowerCase())
  );

  // Reset selected step when language changes
  React.useEffect(() => setSelectedStep(null), [selectedLang]);

  const { nodes, edges } = getNodesAndEdges(
    roadmaps[selectedLang],
    selectedStep,
    setSelectedStep
  );

  const stepInfo =
    selectedStep !== null && stepDetails[selectedLang]
      ? stepDetails[selectedLang][selectedStep]
      : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      <div className="pt-16 max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-4">
          Programming Roadmap <span className="text-indigo-400">(Flowchart)</span>
        </h1>
        <div className="text-center mb-8 text-indigo-200 text-lg">
          {roadmapDescriptions[selectedLang]}
        </div>
        <div className="flex flex-col md:flex-row items-center justify-between mb-6 gap-4">
          <input
            type="text"
            placeholder="Search language..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="px-3 py-2 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            style={{ minWidth: 180 }}
          />
          <div className="flex flex-wrap gap-2 mt-2 md:mt-0">
            {filteredLangs.map((lang) => (
              <button
                key={lang}
                onClick={() => setSelectedLang(lang)}
                className={`px-4 py-2 rounded-lg font-semibold transition-all duration-200 shadow ${
                  selectedLang === lang
                    ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white scale-105"
                    : "bg-gray-700 hover:bg-indigo-400 hover:text-white text-gray-200"
                }`}
              >
                {lang}
              </button>
            ))}
          </div>
        </div>
        <div style={{ height: 700, background: "#23272f", borderRadius: 12, padding: 8 }}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            fitView
            panOnDrag
            zoomOnScroll
            zoomOnPinch
            nodeTypes={nodeTypes}
            defaultViewport={{ x: 120, y: 0, zoom: 1 }}
          />
        </div>
        {stepInfo && (
          <div className="mt-8 bg-gray-800 rounded-xl p-6 shadow-lg border-l-4 border-indigo-400">
            <h2 className="text-2xl font-bold mb-2 text-indigo-300">{stepInfo.title}</h2>
            <p className="mb-4 text-gray-200">{stepInfo.description}</p>
            <pre className="bg-gray-900 rounded p-4 text-green-300 overflow-x-auto">
              {stepInfo.example}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
};

export default Arena;