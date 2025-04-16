import React, { useState, useEffect } from "react";
import problems from "../data/problems";

const Arena = () => {
  // State to track the selected problem
  const [selectedProblem, setSelectedProblem] = useState(problems[0]);

  // State to track solved problems
  const [solvedProblems, setSolvedProblems] = useState(() => {
    const saved = localStorage.getItem("solvedProblems");
    return saved ? JSON.parse(saved) : [];
  });

  // State to track notes for problems
  const [notes, setNotes] = useState(() => {
    const saved = localStorage.getItem("problemNotes");
    return saved ? JSON.parse(saved) : {};
  });

  // Save progress and notes to local storage whenever they change
  useEffect(() => {
    localStorage.setItem("solvedProblems", JSON.stringify(solvedProblems));
    localStorage.setItem("problemNotes", JSON.stringify(notes));
  }, [solvedProblems, notes]);

  // Mark a problem as solved
  const markAsSolved = (problemId) => {
    if (!solvedProblems.includes(problemId)) {
      setSolvedProblems([...solvedProblems, problemId]);
    }
  };

  // Handle note changes
  const handleNoteChange = (problemId, newNote) => {
    setNotes({ ...notes, [problemId]: newNote });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      {/* Add padding to prevent navbar overlap */}
      <div className="pt-16 max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8">
          Welcome to the <span className="text-indigo-400">DSA World</span>
        </h1>

        {/* Problem Selector */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Select a Problem</h3>
          <select
            value={selectedProblem.id}
            onChange={(e) =>
              setSelectedProblem(
                problems.find((problem) => problem.id === parseInt(e.target.value))
              )
            }
            className="w-full px-4 py-2 bg-gray-800 text-white rounded-lg"
          >
            {problems.map((problem) => (
              <option key={problem.id} value={problem.id}>
                {problem.title} {solvedProblems.includes(problem.id) ? "✔" : ""}
              </option>
            ))}
          </select>
        </div>

        {/* Problem Title */}
        <h2 className="text-2xl font-bold mb-4">{selectedProblem.title}</h2>

        {/* Problem Description */}
        <div className="bg-gray-800 p-4 rounded-lg mb-6">
          <h3 className="text-lg font-semibold mb-2">Problem Description</h3>
          <p className="text-gray-300 whitespace-pre-line">
            {selectedProblem.description}
          </p>
        </div>

        {/* Example */}
        <div className="bg-gray-800 p-4 rounded-lg mb-6">
          <h3 className="text-lg font-semibold mb-2">Example</h3>
          <pre className="text-gray-300 whitespace-pre-line">
            {selectedProblem.example}
          </pre>
        </div>

        {/* Notes Section */}
        <div className="bg-gray-800 p-4 rounded-lg mb-6">
          <h3 className="text-lg font-semibold mb-2">Your Notes</h3>
          <textarea
            value={notes[selectedProblem.id] || ""}
            onChange={(e) => handleNoteChange(selectedProblem.id, e.target.value)}
            className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg"
            placeholder="Write your notes here..."
          />
        </div>

        {/* Mark as Solved Button */}
        <div className="text-center mb-6">
          <button
            onClick={() => markAsSolved(selectedProblem.id)}
            className={`px-6 py-3 ${
              solvedProblems.includes(selectedProblem.id)
                ? "bg-green-600"
                : "bg-indigo-600 hover:bg-indigo-700"
            } text-white font-medium rounded-lg transition duration-300`}
          >
            {solvedProblems.includes(selectedProblem.id) ? "Solved" : "Mark as Solved"}
          </button>
        </div>

        {/* LeetCode Link */}
        <div className="text-center">
          <a
            href={selectedProblem.leetCodeLink}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition duration-300"
          >
            Solve on LeetCode
          </a>
        </div>
      </div>
    </div>
  );
};

export default Arena;