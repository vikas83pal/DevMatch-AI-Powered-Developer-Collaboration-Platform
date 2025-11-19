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
  FiTrendingUp,
  FiAward,
  FiShield,
  FiArrowRight,
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
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
            <Link to="/match"
            className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition duration-300 flex items-center justify-center gap-2">
              <FiCode className="w-5 h-5" /> Start Matching
            </Link>
            <a href="#how-works" className="px-8 py-3 bg-white/10 hover:bg-white/20 text-white font-medium rounded-lg backdrop-blur-sm transition duration-300 flex items-center justify-center gap-2">
              Learn More <FiArrowRight className="w-4 h-4" />
            </a>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 max-w-3xl mx-auto">
            <div className="bg-white/5 backdrop-blur-sm p-6 rounded-lg border border-white/10">
              <div className="text-3xl font-bold text-indigo-400 mb-2">10K+</div>
              <p className="text-gray-300">Active Developers</p>
            </div>
            <div className="bg-white/5 backdrop-blur-sm p-6 rounded-lg border border-white/10">
              <div className="text-3xl font-bold text-purple-400 mb-2">95%</div>
              <p className="text-gray-300">Match Accuracy</p>
            </div>
            <div className="bg-white/5 backdrop-blur-sm p-6 rounded-lg border border-white/10">
              <div className="text-3xl font-bold text-pink-400 mb-2">5K+</div>
              <p className="text-gray-300">Projects Completed</p>
            </div>
          </div>
        </div>

        {/* Floating code elements with glass effect */}
      </section>

      {/* How It Works Section */}
      <section id="how-works" className="py-20 px-4 sm:px-6 lg:px-8 bg-white/5 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
              How DevMatch Works
            </span>
          </h2>
          <p className="text-center text-gray-300 mb-16 max-w-2xl mx-auto">
            Our intelligent platform uses advanced algorithms to match developers based on skills, experience, preferences, and project requirements.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "AI Matchmaking",
                description:
                  "Our advanced algorithm analyzes technical skills, experience level, coding style, and project preferences to find your perfect teammates with 95% accuracy.",
                icon: <FiCpu className="text-indigo-400 text-3xl" />,
                color: "from-indigo-500/20 to-indigo-600/20",
                details: ["Skill compatibility", "Experience matching", "Timezone alignment", "Work style preference"]
              },
              {
                title: "Real-Time Collaboration",
                description:
                  "Stay connected with integrated messaging, video calls, and code sharing. Discuss ideas instantly and make decisions faster with your matched team.",
                icon: <FiMessageSquare className="text-purple-400 text-3xl" />,
                color: "from-purple-500/20 to-purple-600/20",
                details: ["Live chat", "Video meetings", "Code snippets", "Screen sharing"]
              },
              {
                title: "Project Management",
                description:
                  "Manage projects collaboratively with Git integration, task tracking, sprint planning, and real-time progress monitoring all in one place.",
                icon: <FiUsers className="text-pink-400 text-3xl" />,
                color: "from-pink-500/20 to-pink-600/20",
                details: ["Task board", "Git integration", "Sprint planning", "Progress tracking"]
              },
            ].map((feature, index) => (
              <div
                key={index}
                className={`p-8 rounded-xl backdrop-blur-md border border-white/10 hover:border-white/30 transition duration-300 bg-gradient-to-br ${feature.color} group hover:shadow-lg hover:shadow-indigo-500/10`}
              >
                <div className="w-14 h-14 flex items-center justify-center rounded-lg bg-white/10 mb-6 group-hover:bg-white/20 transition">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-300 mb-5">{feature.description}</p>
                <ul className="space-y-2">
                  {feature.details.map((detail, i) => (
                    <li key={i} className="text-sm text-gray-400 flex items-center">
                      <span className="w-2 h-2 rounded-full bg-indigo-400 mr-2"></span>
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Developer Profiles Showcase */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-4">
            Meet Your Next <span className="text-indigo-300">Teammates</span>
          </h2>
          <p className="text-center text-gray-300 mb-16 max-w-2xl mx-auto">
            Discover talented developers with complementary skills ready to build amazing projects.
          </p>

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
                className="p-6 bg-gradient-to-br from-white/5 to-white/10 rounded-xl backdrop-blur-sm border border-white/10 hover:border-indigo-400/50 transition duration-300 group hover:shadow-lg hover:shadow-indigo-500/10"
              >
                <div className="flex items-center mb-4">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-indigo-500/40 to-purple-500/40 flex items-center justify-center text-white font-bold mr-4 text-lg group-hover:scale-110 transition">
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
                      className="inline-block bg-indigo-900/40 text-indigo-200 text-xs px-3 py-1 rounded-full mr-2 mb-2 border border-indigo-700/30"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">Match score</span>
                  <span className="text-white font-bold text-lg">{dev.match}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/match" className="inline-flex items-center gap-2 px-8 py-3 bg-white/10 hover:bg-white/20 border border-white/20 text-white rounded-lg transition">
              View All Developers <FiArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose DevMatch */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-indigo-900/20 to-purple-900/20">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-16">
            Why Choose DevMatch?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                icon: <FiAward className="w-8 h-8 text-yellow-400" />,
                title: "Verified Profiles",
                description: "All developers are verified for skills and experience through our rigorous vetting process."
              },
              {
                icon: <FiShield className="w-8 h-8 text-green-400" />,
                title: "Secure Collaboration",
                description: "End-to-end encrypted messaging and secure project repositories keep your work private."
              },
              {
                icon: <FiTrendingUp className="w-8 h-8 text-blue-400" />,
                title: "Success Stories",
                description: "Join thousands of successful projects launched by teams matched on DevMatch."
              },
              {
                icon: <FiZap className="w-8 h-8 text-orange-400" />,
                title: "Quick Onboarding",
                description: "Start collaborating within minutes. Our platform is designed for immediate productivity."
              },
            ].map((benefit, index) => (
              <div
                key={index}
                className="flex gap-6 p-6 bg-white/5 rounded-lg border border-white/10 hover:border-white/20 transition"
              >
                <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-lg bg-white/10">
                  {benefit.icon}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">{benefit.title}</h3>
                  <p className="text-gray-300">{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-indigo-600/30 to-purple-600/30 p-8 md:p-12 rounded-2xl backdrop-blur-md border border-indigo-400/30 hover:border-indigo-400/60 transition">
            <div className="text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Ready to Find Your Perfect Development Team?
              </h2>
              <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
                Join thousands of developers building innovative projects together. Get matched with developers who complement your skills and share your vision.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/signup"
                  className="px-8 py-4 bg-white text-indigo-900 hover:bg-gray-100 font-bold rounded-lg transition duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
                >
                  <FiUsers className="w-5 h-5" /> Get Started Free
                </Link>
                <Link
                  to="/match"
                  className="px-8 py-4 bg-indigo-600/50 hover:bg-indigo-600 text-white font-bold rounded-lg transition duration-300 flex items-center justify-center gap-2 border border-indigo-400"
                >
                  <FiCode className="w-5 h-5" /> Explore Developers
                </Link>
              </div>

              <p className="text-gray-400 text-sm mt-8">
                No credit card required • Free forever plan available • Join in seconds
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
