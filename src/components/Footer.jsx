import React from 'react';
import { FiGithub, FiTwitter, FiLinkedin, FiMail, FiRss } from 'react-icons/fi';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black backdrop-blur-md border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand Column */}
          <div className="space-y-4">
            <div className="flex items-center">
              <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
                DevMatch
              </span>
            </div>
            <p className="text-gray-400 text-sm">
              AI-powered developer matchmaking for perfect project teams.
            </p>
            <div className="flex space-x-4">
              <a href="https://github.com/vikas83pal" className="text-gray-400 hover:text-indigo-400 transition">
                <FiGithub className="h-5 w-5" />
              </a>
              {/* <a href="#" className="text-gray-400 hover:text-indigo-400 transition">
                <FiTwitter className="h-5 w-5" />
              </a> */}
              <a href="https://www.linkedin.com/in/vikas-pal-b91067254/" className="text-gray-400 hover:text-indigo-400 transition">
                <FiLinkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="text-white font-medium mb-4">Product</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white transition text-sm">Features</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition text-sm">Pricing</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition text-sm">API</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition text-sm">Changelog</a></li>
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h3 className="text-white font-medium mb-4">Resources</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white transition text-sm">Documentation</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition text-sm">Blog</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition text-sm">Community</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition text-sm">Tutorials</a></li>
            </ul>
          </div>

          {/* Contact/Newsletter */}
          <div>
            <h3 className="text-white font-medium mb-4">Stay Updated</h3>
            <p className="text-gray-400 text-sm mb-4">
              Subscribe to our newsletter for the latest updates.
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="px-4 py-2 bg-gray-800/50 text-white rounded-l-lg border border-gray-700 focus:outline-none focus:ring-1 focus:ring-indigo-500 w-full"
              />
              <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-r-lg transition">
                <FiMail className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-500 text-sm mb-4 md:mb-0">
            © {currentYear} DevMatch. All rights reserved.
          </div>
          <div className="flex space-x-6">
            <a href="#" className="text-gray-500 hover:text-gray-300 text-sm">Privacy</a>
            <a href="#" className="text-gray-500 hover:text-gray-300 text-sm">Terms</a>
            <a href="#" className="text-gray-500 hover:text-gray-300 text-sm">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;