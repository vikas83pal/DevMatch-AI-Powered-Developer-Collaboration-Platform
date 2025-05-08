import React, { useState } from 'react';
import { FiMail, FiGithub, FiLinkedin } from 'react-icons/fi';
import emailjs from 'emailjs-com';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    emailjs
      .send(
        'YOUR_SERVICE_ID', // Replace with your EmailJS service ID
        'YOUR_TEMPLATE_ID', // Replace with your EmailJS template ID
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
        },
        'YOUR_USER_ID' // Replace with your EmailJS user ID
      )
      .then(
        (response) => {
          console.log('SUCCESS!', response.status, response.text);
          setSuccessMessage('Your message has been sent successfully!');
          setFormData({ name: '', email: '', message: '' });
          setIsSubmitting(false);
        },
        (error) => {
          console.error('FAILED...', error);
          setSuccessMessage('Failed to send your message. Please try again.');
          setIsSubmitting(false);
        }
      );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center">
        {/* Contact Form */}
        <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10">
          <h3 className="text-2xl font-bold text-white mb-6">Contact Me</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>
            <div>
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>
            <div>
              <textarea
                name="message"
                placeholder="Your Message"
                rows="4"
                value={formData.message}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              ></textarea>
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-3 px-4 ${
                isSubmitting ? 'bg-gray-600' : 'bg-indigo-600 hover:bg-indigo-700'
              } text-white font-medium rounded-lg transition`}
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>
          </form>
          {successMessage && (
            <p className="mt-4 text-indigo-400">{successMessage}</p>
          )}
        </div>

        {/* Alternative Contact Options */}
        <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10 mt-8">
          <h3 className="text-xl font-semibold text-white mb-6">
            Alternatively, you can reach me through:
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <a
              href="mailto:vikas83pal@gmail.com"
              className="bg-gray-800/50 hover:bg-gray-700/50 p-4 rounded-lg border border-gray-700 transition flex flex-col items-center"
            >
              <FiMail className="text-indigo-400 text-3xl mb-3" />
              <span className="text-white">Email</span>
              <span className="text-gray-400 text-sm mt-1">vikas83pal@gmail.com</span>
            </a>
            <a
              href="https://github.com/vikas83pal"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gray-800/50 hover:bg-gray-700/50 p-4 rounded-lg border border-gray-700 transition flex flex-col items-center"
            >
              <FiGithub className="text-indigo-400 text-3xl mb-3" />
              <span className="text-white">GitHub</span>
              <span className="text-gray-400 text-sm mt-1">github.com/vikas83pal</span>
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