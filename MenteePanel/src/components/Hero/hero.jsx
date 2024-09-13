import React, { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { Card } from 'react-bootstrap';
import { Facebook, Twitter, Instagram, Linkedin } from 'react-feather';

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const controls = useAnimation();

  useEffect(() => {
    controls.start({
      y: [0, -10, 0],
      transition: { repeat: Infinity, duration: 2 }
    });
  }, [controls]);

  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Search query:', searchQuery);
  };

  return (
    <div className="min-h-screen bg-white">
      

      <main className="pt-0">
        {/* Hero Section */}
        <section className="relative min-h-screen bg-white">
          <motion.div 
            initial={{ opacity: 0.1, y: 50 }}
            animate={{ opacity: 2, y: 0 }}
            transition={{ duration: 0.8 }}
            className="relative z-10 text-center text-indigo-900 max-w-4xl mx-auto px-4 py-16"
          >
            <h2 className="text-5xl font-bold mb-6 leading-tight">
              Unlock Your Potential with Expert Mentorship
            </h2>
            <p className="text-xl mb-8 text-indigo-600">
              Connect with industry leaders, accelerate your career growth, and achieve your professional goals through personalized mentoring.
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
              <button className="py-2 px-8 bg-indigo-600 text-white text-lg rounded-md shadow-lg hover:bg-indigo-700 transition-all duration-300">
                Get Started
              </button>
              <form onSubmit={handleSearch} className="flex w-full max-w-md">
                <input
                  type="text"
                  placeholder="Search for mentors or topics..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-grow bg-white border border-gray-300 rounded-l-md py-2 px-4"
                />
                <button type="submit" className="py-2 px-4 bg-indigo-600 text-white rounded-r-md hover:bg-indigo-700 transition-all duration-300">
                  Search
                </button>
              </form>
            </div>
          </motion.div>
          <motion.div
            animate={controls}
            className="absolute bottom-40 left-1/2 transform -translate-x-1/2"
          >
            <svg className="w-10 h-20 text-indigo-600 animate-bounce" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" viewBox="0 0 24 24" stroke="currentColor">
              <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
            </svg>
          </motion.div>
        </section>

        {/* Features Section */}
        <section className="py-10 bg-white">
          <div className="container mx-auto px-4">
            <h3 className="text-3xl font-bold text-center mb-12 text-indigo-800">Key Features</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="bg-white shadow-lg border border-gray-200 rounded-lg overflow-hidden">
                <Card.Body className="p-6">
                  <div className="text-center mb-4">
                    <svg className="w-12 h-12 text-indigo-600 mx-auto" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                      <path d="M9 5l7 7-7 7"></path>
                    </svg>
                  </div>
                  <h4 className="text-xl font-semibold mb-2 text-center text-indigo-800">1:1 Video Mentoring</h4>
                  <p className="text-center text-gray-700">High-quality, secure video conferencing for personalized mentoring sessions.</p>
                </Card.Body>
              </Card>
              <Card className="bg-white shadow-lg border border-gray-200 rounded-lg overflow-hidden">
                <Card.Body className="p-6">
                  <div className="text-center mb-4">
                    <svg className="w-12 h-12 text-indigo-600 mx-auto" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                      <path d="M5 10h14M5 15h14"></path>
                    </svg>
                  </div>
                  <h4 className="text-xl font-semibold mb-2 text-center text-indigo-800">Smart Scheduling</h4>
                  <p className="text-center text-gray-700">AI-powered scheduling to find the perfect time slot for both mentor and mentee.</p>
                </Card.Body>
              </Card>
              <Card className="bg-white shadow-lg border border-gray-200 rounded-lg overflow-hidden">
                <Card.Body className="p-6">
                  <div className="text-center mb-4">
                    <svg className="w-12 h-12 text-indigo-600 mx-auto" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                      <path d="M4 6h16M4 10h16M4 14h16M4 18h16"></path>
                    </svg>
                  </div>
                  <h4 className="text-xl font-semibold mb-2 text-center text-indigo-800">Real-time Chat</h4>
                  <p className="text-center text-gray-700">Instant messaging for quick questions and ongoing support between sessions.</p>
                </Card.Body>
              </Card>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="bg-white py-16">
  <div className="container mx-auto px-4">
    <h2 className="text-3xl font-bold text-center mb-12 text-indigo-800">How It Works</h2>
    <div className="flex flex-wrap justify-center gap-8">
      <div className="w-full sm:w-80 md:w-96 lg:w-1/4 bg-gray-100 p-6 rounded-lg shadow-lg text-center">
        <div className="mb-4">
          <svg className="w-16 h-16 mx-auto text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path d="M9 5l7 7-7 7"></path>
          </svg>
        </div>
        <h3 className="text-xl font-semibold mb-2">1. Sign Up</h3>
        <p className="text-gray-700">Create your profile as a mentor or mentee to get started. Fill out your expertise or interests to match with the right partner.</p>
      </div>

      <div className="w-full sm:w-80 md:w-96 lg:w-1/4 bg-gray-100 p-6 rounded-lg shadow-lg text-center">
        <div className="mb-4">
          <svg className="w-16 h-16 mx-auto text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path d="M12 4v16m8-8H4"></path>
          </svg>
        </div>
        <h3 className="text-xl font-semibold mb-2">2. Find a Match</h3>
        <p className="text-gray-700">Use our smart matching system to connect with mentors or mentees that fit your goals and expertise. Review profiles and select your match.</p>
      </div>

      <div className="w-full sm:w-80 md:w-96 lg:w-1/4 bg-gray-100 p-6 rounded-lg shadow-lg text-center">
        <div className="mb-4">
          <svg className="w-16 h-16 mx-auto text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path d="M12 8v4l2 2"></path>
          </svg>
        </div>
        <h3 className="text-xl font-semibold mb-2">3. Start Mentoring</h3>
        <p className="text-gray-700">Begin your mentoring journey with scheduled video calls, real-time chats, and smart scheduling to manage your sessions effectively.</p>
      </div>

      <div className="w-full sm:w-80 md:w-96 lg:w-1/4 bg-gray-100 p-6 rounded-lg shadow-lg text-center">
        <div className="mb-4">
          <svg className="w-16 h-16 mx-auto text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path d="M12 8v4l2 2"></path>
          </svg>
        </div>
        <h3 className="text-xl font-semibold mb-2">4. Share Feedback</h3>
        <p className="text-gray-700">After your sessions, provide feedback to help improve the experience and assist future users in their mentorship journey.</p>
      </div>
    </div>
  </div>
</section>





        {/* Success Stories Section */}
        <section className="bg-gradient-to-b from-indigo-50 to-purple-50 py-0">
  <div className="container mx-auto px-4">
    <h2 className="text-3xl font-bold text-center mb-12 text-indigo-800">Success Stories</h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80"
          alt="Success Story 1"
          className="w-full h-48 object-cover"
        />
        <div className="p-6">
          <h3 className="text-xl font-semibold mb-2">Alex Johnson</h3>
          <p className="text-sm text-gray-600 mb-4">Software Engineer</p>
          <p className="text-gray-700">Mentee turned mentor, now leading a team at a top tech company.</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80"
          alt="Success Story 2"
          className="w-full h-48 object-cover"
        />
        <div className="p-6">
          <h3 className="text-xl font-semibold mb-2">Jamie Lee</h3>
          <p className="text-sm text-gray-600 mb-4">Product Manager</p>
          <p className="text-gray-700">Advanced from a junior position to leading product innovation.</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80"
          alt="Success Story 3"
          className="w-full h-48 object-cover"
        />
        <div className="p-6">
          <h3 className="text-xl font-semibold mb-2">Jordan Smith</h3>
          <p className="text-sm text-gray-600 mb-4">UX Designer</p>
          <p className="text-gray-700">From an intern to a lead designer at a top design firm.</p>
        </div>
      </div>
    </div>
    <div className="text-center mt-12">
      <a href="#" className="py-2 px-6 bg-indigo-600 text-white text-lg rounded-md hover:bg-indigo-700 transition-all duration-300">
        View All Success Stories
      </a>
    </div>
  </div>
</section>

      </main>
      <section className="py-12 bg-white">
  <div className="container mx-auto px-4">
    <h3 className="text-3xl font-bold text-center mb-8 text-indigo-800">Get in Touch</h3>
    <div className="max-w-3xl mx-auto">
      <form className="bg-gray-100 p-6 rounded-lg shadow-lg">
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 text-sm font-semibold mb-2">Name</label>
          <input
            type="text"
            id="name"
            placeholder="Your Name"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 text-sm font-semibold mb-2">Email</label>
          <input
            type="email"
            id="email"
            placeholder="Your Email"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="message" className="block text-gray-700 text-sm font-semibold mb-2">Message</label>
          <textarea
            id="message"
            rows="4"
            placeholder="Your Message"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          ></textarea>
        </div>
        <div className="text-center">
          <button
            type="submit"
            className="py-2 px-6 bg-indigo-600 text-white text-lg rounded-md hover:bg-indigo-700 transition-all duration-300"
          >
            Send Message
          </button>
        </div>
      </form>
    </div>
  </div>
</section>

 <footer className="bg-gray-800 text-gray-300 py-8 mt-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Footer Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand/Company Info */}
          <div className="mb-8 md:mb-0">
            <h2 className="text-2xl font-bold text-white mb-4">MentorConnect</h2>
            <p className="text-sm">Connecting mentors and mentees for a brighter future.</p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-white transition-colors">Home</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Find a Mentor</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Become a Mentor</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Resources</a></li>
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Support</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Newsletter</h3>
            <p className="text-sm mb-4">Stay updated with our latest news and offers.</p>
            <form className="space-y-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full bg-gray-700 border border-gray-600 text-white p-2 placeholder-gray-400 rounded-md"
              />
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md transition-all"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-10 pt-6 border-t border-gray-700 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm mb-4 md:mb-0">&copy; {new Date().getFullYear()} MentorConnect. All rights reserved.</p>
          <div className="flex space-x-4">
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              <Facebook size={20} />
              <span className="sr-only">Facebook</span>
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              <Twitter size={20} />
              <span className="sr-only">Twitter</span>
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              <Instagram size={20} />
              <span className="sr-only">Instagram</span>
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              <Linkedin size={20} />
              <span className="sr-only">LinkedIn</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  




    </div>
  );
}