import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FiCode,
  FiUsers,
  FiMessageSquare,
  FiCpu,
  FiGitBranch,
  FiZap,
  FiMenu,
  FiX,
} from "react-icons/fi";

const Home = () => {
  // Beta badge states
  const [isBetaHovered, setIsBetaHovered] = useState(false);
  const [isBetaClicked, setIsBetaClicked] = useState(false);

  // Mobile menu states
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check if mobile view
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    

    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);

    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  // Handle beta badge click
  const handleBetaClick = () => {
    setIsBetaClicked(true);
    setTimeout(() => {
      window.open(
        "https://forms.office.com/r/VHbTwYRwa6",
        "_blank",
        "noopener,noreferrer"
      );
    }, 500);
  };

  // Toggle mobile menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    document.body.style.overflow = isMenuOpen ? "auto" : "hidden";
  };

  // Mobile menu items
  const mobileMenuItems = [
    { name: "Home", icon: <FiCode />, path: "/" },
    { name: "Projects", icon: <FiGitBranch />, path: "/projects" },
    { name: "Match", icon: <FiUsers />, path: "/match" },
    { name: "Contact", icon: <FiMessageSquare />, path: "/contact" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Mobile Menu */}
      {isMobile && (
        <div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-gray-900/90 backdrop-blur-sm p-4">
          <div className="flex justify-between items-center">
            <span className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
              DevMatch
            </span>
            <button
              onClick={toggleMenu}
              className="text-white focus:outline-none"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <FiX className="h-6 w-6" />
              ) : (
                <FiMenu className="h-6 w-6" />
              )}
            </button>
          </div>

          {/* Mobile Menu Content */}
          <div
            className={`
            fixed inset-0 bg-gray-900/95 backdrop-blur-sm z-40 pt-16
            transition-all duration-300 ease-in-out
            ${isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"}
          `}
          >
            <div className="flex flex-col items-center justify-center h-full space-y-8">
              {mobileMenuItems.map((item, index) => (
                <a
                  key={index}
                  href={item.path}
                  className="text-white text-2xl flex items-center space-x-3"
                  onClick={toggleMenu}
                >
                  <span className="text-indigo-400">{item.icon}</span>
                  <span>{item.name}</span>
                </a>
              ))}
              <button
                className="px-6 py-3 bg-indigo-600 text-white rounded-lg mt-8"
                onClick={handleBetaClick}
              >
                Upgrade to Pro
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section
        className={`relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden ${
          isMobile ? "mt-16" : ""
        }`}
      >
        <div className="max-w-7xl mx-auto text-center">
          <button
            onClick={handleBetaClick}
            onMouseEnter={() => setIsBetaHovered(true)}
            onMouseLeave={() => setIsBetaHovered(false)}
            className={`
              inline-flex items-center 
              ${isBetaHovered ? "bg-indigo-800/50" : "bg-indigo-900/30"} 
              ${isBetaClicked ? "animate-pulse bg-indigo-700/50" : ""}
              text-indigo-300 px-4 py-2 rounded-full mb-6 
              border ${
                isBetaHovered ? "border-indigo-300" : "border-indigo-400/30"
              } 
              backdrop-blur-sm transition-all duration-300
              transform ${isBetaHovered ? "scale-105" : "scale-100"}
              active:scale-95
            `}
            disabled={isBetaClicked}
          >
            <FiZap className={`mr-2 ${isBetaClicked ? "animate-spin" : ""}`} />
           {isBetaClicked ? "Beta now live!" : "Join Beta"}
          </button>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
              DevMatch
            </span>{" "}
            — Find Your Perfect Dev Team
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-10">
            AI-powered matchmaking connects you with ideal teammates.
            Collaborate in real-time, build faster, and create amazing projects
            together.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/match"
            className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition duration-300 flex items-center justify-center">
              <FiCode className="mr-2" /> Start Matching
            </Link>
            <a href="#how-works" className="px-8 py-3 bg-white/10 hover:bg-white/20 text-white font-medium rounded-lg backdrop-blur-sm transition duration-300">
              See How It Works
            </a>
          </div>
        </div>

        {/* Floating code elements with glass effect */}
      </section>

      {/* How It Works Section */}
      <section id="how-works" className="py-20 px-4 sm:px-6 lg:px-8 bg-white/5 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-white mb-12">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
              How DevMatch Works
            </span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "AI Matchmaking",
                description:
                  "Our algorithm analyzes skills, experience, and project needs to find your perfect teammates",
                icon: <FiCpu className="text-indigo-400 text-3xl" />,
                color: "from-indigo-500/20 to-indigo-600/20",
              },
              {
                title: "Real-Time Chat",
                description:
                  "Integrated messaging with code snippets and project sharing to start collaborating immediately",
                icon: <FiMessageSquare className="text-purple-400 text-3xl" />,
                color: "from-purple-500/20 to-purple-600/20",
              },
              {
                title: "Project Collaboration",
                description:
                  "Shared workspaces with Git integration, task management, and live coding",
                icon: <FiUsers className="text-pink-400 text-3xl" />,
                color: "from-pink-500/20 to-pink-600/20",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className={`p-6 rounded-xl backdrop-blur-md border border-white/10 hover:border-white/20 transition duration-300 bg-gradient-to-br ${feature.color}`}
              >
                <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-white/10 mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-300">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Developer Profiles Showcase */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-white mb-12">
            Meet Your Next <span className="text-indigo-300">Teammates</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                name: "Alex",
                role: "React Specialist",
                skills: ["TypeScript", "Next.js", "UI/UX"],
                match: "92%",
              },
              {
                name: "Killy",
                role: "Backend Engineer",
                skills: ["Node.js", "Python", "Spring boot"],
                match: "89%",
              },
              {
                name: "Jordan",
                role: "Full Stack Dev",
                skills: ["React", "GraphQL", "Docker"],
                match: "95%",
              },
              {
                name: "Taylor",
                role: "DevOps Engineer",
                skills: ["Kubernetes", "CI/CD", "Terraform"],
                match: "87%",
              },
            ].map((dev, index) => (
              <div
                key={index}
                className="p-6 bg-white/5 rounded-xl backdrop-blur-sm border border-white/10 hover:border-indigo-400/50 transition duration-300 group"
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-indigo-500/20 flex items-center justify-center text-white font-bold mr-4">
                    {dev.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">
                      {dev.name}
                    </h3>
                    <p className="text-indigo-300 text-sm">{dev.role}</p>
                  </div>
                </div>
                <div className="mb-4">
                  {dev.skills.map((skill, i) => (
                    <span
                      key={i}
                      className="inline-block bg-indigo-900/30 text-indigo-300 text-xs px-2 py-1 rounded mr-2 mb-2"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">Match score</span>
                  <span className="text-white font-bold">{dev.match}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center bg-gradient-to-r from-indigo-500/20 to-purple-500/20 p-8 rounded-2xl backdrop-blur-md border border-indigo-400/20">
          <h2 className="text-3xl font-bold text-white mb-6">
            Ready to Find Your Dream Team?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Join thousands of developers already building amazing projects
            together on DevMatch.
          </p>
          <Link
            to="/signup"
            className="w-full max-w-xs px-6 py-3 bg-white text-indigo-900 hover:bg-gray-100 font-bold rounded-lg transition duration-300 flex items-center justify-center mx-auto"
          >
            <FiUsers className="mr-2" /> Sign Up Free
          </Link>
        </div>
      </section>

      {/* Footer */}
      {/* <footer className="bg-black/30 backdrop-blur-md py-8 px-4 sm:px-6 lg:px-8 border-t border-gray-800">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">DevMatch</h3>
            <p className="text-gray-400 text-sm">
              AI-powered developer matchmaking for perfect project teams.
            </p>
          </div>  
          <div>
            <h4 className="text-white font-medium mb-4">Product</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white transition text-sm">Features</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition text-sm">Pricing</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition text-sm">API</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-medium mb-4">Resources</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white transition text-sm">Documentation</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition text-sm">Blog</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition text-sm">Community</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-medium mb-4">Company</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white transition text-sm">About</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition text-sm">Careers</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition text-sm">Contact</a></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto pt-8 mt-8 border-t border-gray-800 text-center text-gray-500 text-sm">
          © {new Date().getFullYear()} DevMatch. All rights reserved.
        </div>
      </footer> */}
    </div>
  );
};

export default Home;
