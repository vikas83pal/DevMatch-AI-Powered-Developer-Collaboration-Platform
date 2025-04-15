import React from 'react';
import { FiMail, FiGithub, FiTwitter, FiLinkedin, FiAlertTriangle } from 'react-icons/fi';

const Contact = () => {
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

        {/* Alternative Contact Options */}
        <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10">
          <h3 className="text-xl font-semibold text-white mb-6">
            In the meantime, you can reach us through:
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
              href="https://twitter.com/devmatch" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-gray-800/50 hover:bg-gray-700/50 p-4 rounded-lg border border-gray-700 transition flex flex-col items-center"
            >
              <FiTwitter className="text-indigo-400 text-3xl mb-3" />
              <span className="text-white">Twitter</span>
              <span className="text-gray-400 text-sm mt-1">@devmatch</span>
            </a>
          </div>
        </div>

        {/* Hidden Contact Form (for future use) */}
        {false && (
          <div className="mt-12 bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-6">Contact Us</h3>
            <form className="space-y-4">
              <div>
                <input 
                  type="text" 
                  placeholder="Your Name" 
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <input 
                  type="email" 
                  placeholder="Your Email" 
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <textarea 
                  placeholder="Your Message" 
                  rows="4"
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
        )}
      </div>
    </div>
  );
};

export default Contact;