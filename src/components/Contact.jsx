import React from 'react';
import { FiMail, FiGithub, FiTwitter, FiLinkedin, FiAlertTriangle } from 'react-icons/fi';

const Contact = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted');
    // Add form submission logic here (e.g., send data to an API)
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center">
        {/* Maintenance Message */}
        <div className="bg-yellow-900/30 backdrop-blur-sm border border-yellow-600/30 rounded-xl p-6 mb-8">
          <div className="flex flex-col items-center">
            <FiAlertTriangle className="text-yellow-400 text-4xl mb-4" />
            <h2 className="text-2xl font-bold text-white mb-2">Under Maintenance</h2>
            <p className="text-yellow-200 max-w-lg">
              Our contact system is currently being upgraded. We'll be back soon with an improved way to reach us!
            </p>
          </div>
        </div>

        {/* About Me Section */}
        <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10 mb-8">
          <h3 className="text-2xl font-bold text-white mb-6">Who Am I?</h3>
          <p className="text-gray-300 mb-4">
            Hi, I'm <span className="text-indigo-400 font-semibold">Vikas Pal</span>, a passionate full-stack developer with expertise in building scalable web applications and AI-powered platforms. I specialize in technologies like React, Node.js, and Python (AI & ML).
          </p>
          <p className="text-gray-300">
            Some of the projects I've built include:
          </p>
          <ul className="list-disc list-inside text-gray-300 mt-4">
            <li>
              <span className="text-indigo-400 font-semibold">DevMatch</span>: An AI-powered platform for developer matchmaking and project collaboration.
            </li>
            
          </ul>
        </div>

        {/* Contact Form */}
        <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10">
          <h3 className="text-2xl font-bold text-white mb-6">Contact Me</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                type="text"
                placeholder="Your Name"
                className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>
            <div>
              <input
                type="email"
                placeholder="Your Email"
                className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>
            <div>
              <textarea
                placeholder="Your Message"
                rows="4"
                className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition"
            >
              Send Message
            </button>
          </form>
        </div>

        {/* Alternative Contact Options */}
        <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10 mt-8">
          <h3 className="text-xl font-semibold text-white mb-6">
            Alternatively, you can reach me through:
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <a
              href="mailto:support@devmatch.com"
              className="bg-gray-800/50 hover:bg-gray-700/50 p-4 rounded-lg border border-gray-700 transition flex flex-col items-center"
            >
              <FiMail className="text-indigo-400 text-3xl mb-3" />
              <span className="text-white">Email Support</span>
              <span className="text-gray-400 text-sm mt-1">support@devmatch.com</span>
            </a>
            <a
              href="https://github.com/vikas83pal"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gray-800/50 hover:bg-gray-700/50 p-4 rounded-lg border border-gray-700 transition flex flex-col items-center"
            >
              <FiGithub className="text-indigo-400 text-3xl mb-3" />
              <span className="text-white">GitHub</span>
              <span className="text-gray-400 text-sm mt-1">https://github.com/vikas83pal</span>
            </a>
            <a
              href="https://www.linkedin.com/in/vikas-pal-b91067254/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gray-800/50 hover:bg-gray-700/50 p-4 rounded-lg border border-gray-700 transition flex flex-col items-center"
            >
              <FiLinkedin className="text-indigo-400 text-3xl mb-3" />
              <span className="text-white">LinkedIn</span>
              <span className="text-gray-400 text-sm mt-1">linkedin.com/in/vikas-pal</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;