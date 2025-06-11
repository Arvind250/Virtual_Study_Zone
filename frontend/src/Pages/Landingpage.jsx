import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    
    // Optional: Add parallax effect for the floating elements
    const handleMouseMove = (e) => {
      const floatingElements = document.querySelectorAll('.floating-element');
      floatingElements.forEach(elem => {
        const speed = elem.getAttribute('data-speed');
        const x = (window.innerWidth - e.pageX * speed) / 100;
        const y = (window.innerHeight - e.pageY * speed) / 100;
        elem.style.transform = `translateX(${x}px) translateY(${y}px)`;
      });
    };

    document.addEventListener('mousemove', handleMouseMove);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const handleGetStarted = () => {
    navigate('/login');
  };

  const features = [
    {
      title: "Student Module",
      description: "Join classes, submit assignments, and track your progress with our intuitive interface.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
          <circle cx="9" cy="7" r="4"></circle>
          <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
          <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
        </svg>
      )
    },
    {
      title: "Faculty Module",
      description: "Create and manage classes, assign work, and evaluate student performance efficiently.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
          <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
        </svg>
      )
    },
    {
      title: "Smart Grading System",
      description: "Automate assessment processes and provide detailed feedback to improve learning outcomes.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
          <polyline points="22 4 12 14.01 9 11.01"></polyline>
        </svg>
      )
    },
    {
      title: "Course Recommendation System",
      description: "Get personalized course suggestions based on interests, performance, and career goals.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
        </svg>
      )
    }
  ];

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Modern Hero Section */}
      <div className="h-screen relative overflow-hidden bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 flex items-center justify-center">
        {/* Navigation */}
        <nav className="absolute top-0 left-0 w-full py-6 px-8 z-30 flex justify-between items-center">
          <div className="text-white font-bold text-2xl">Virtual Classroom</div>
          <button 
            onClick={handleGetStarted}
            className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-teal-500 text-white text-lg font-semibold rounded-lg shadow-lg hover:shadow-indigo-500/50 transition-all duration-300 transform hover:-translate-y-1 hover:scale-105"
          >
            Login
          </button>
        </nav>
        
        {/* Decorative Elements */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Animated grid background */}
          <div className="absolute inset-0 opacity-10">
            <div className="grid grid-cols-12 h-full w-full">
              {Array.from({ length: 12 }).map((_, i) => (
                <div key={i} className="border-r border-t border-indigo-500/20"></div>
              ))}
            </div>
          </div>
          
          {/* Glowing elements */}
          <div className="floating-element" data-speed="2">
            <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-indigo-600/20 rounded-full blur-3xl animate-pulse"></div>
          </div>
          <div className="floating-element" data-speed="3">
            <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-teal-500/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
          </div>
          <div className="floating-element" data-speed="1.5">
            <div className="absolute top-1/2 right-1/3 w-40 h-40 bg-amber-500/20 rounded-full blur-3xl animate-pulse" style ={{animationDelay: '2s'}}></div>
          </div>
          
          {/* Floating geometric shapes */}
          <div className="floating-element absolute top-20 left-20 w-16 h-16 border-2 border-indigo-400/30 rounded-lg transform rotate-45 animate-float" data-speed="4"></div>
          <div className="floating-element absolute bottom-32 right-48 w-12 h-12 border-2 border-teal-400/30 rounded-full animate-float" style={{animationDelay: '2.5s'}} data-speed="3"></div>
          <div className="floating-element absolute top-1/3 right-1/5 w-24 h-24 border-2 border-amber-400/30 rounded-md transform rotate-12 animate-float" style={{animationDelay: '1.5s'}} data-speed="2"></div>
          
          {/* Animated code lines */}
          <div className="absolute -left-10 top-1/4 opacity-30 transform -rotate-45">
            <div className="h-2 w-16 bg-indigo-400 rounded mb-2 animate-typing"></div>
            <div className="h-2 w-32 bg-indigo-400/70 rounded mb-2 animate-typing" style={{animationDelay: '0.3s'}}></div>
            <div className="h-2 w-20 bg-indigo-400/50 rounded mb-2 animate-typing" style={{animationDelay: '0.6s'}}></div>
            <div className="h-2 w-28 bg-indigo-400/80 rounded mb-2 animate-typing" style={{animationDelay: '0.9s'}}></div>
          </div>
          
          <div className="absolute right-10 bottom-1/3 opacity-30 transform rotate-45">
            <div className="h-2 w-16 bg-teal-400 rounded mb-2 animate-typing"></div>
            <div className="h-2 w-32 bg-teal-400/70 rounded mb-2 animate-typing" style={{animationDelay: '0.3s'}}></div>
            <div className="h-2 w-20 bg-teal-400/50 rounded mb-2 animate-typing" style={{animationDelay: '0.6s'}}></div>
          </div>
        </div>
        
        {/* 3D Perspective Container */}
        <div className="container mx-auto px-4 relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Hero Content */}
          <div className={`max-w-2xl text-center lg:text-left transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
            <h1 className="text-5xl lg:text-6xl font-bold mb-6">
              <span className="block text-white">Modern Education</span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-teal-400 to-amber-400">Reimagined</span>
            </h1>
            <p className="text-xl text-gray-300 mb-10 max-w-lg">
              Connect, collaborate, and learn in a virtual environment designed for the future of education.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button 
                onClick={handleGetStarted}
                className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-teal-500 text-white text-lg font-semibold rounded-lg shadow-lg hover:shadow-indigo-500/50 transition-all duration-300 transform hover:-translate-y-1 hover:scale-105"
              >
                Get Started
              </button>
              
            </div>
          </div>
          
          {/* 3D Dashboard Preview */}
          <div className={`relative perspective-lg max-w-lg w-full transition-all duration-1000 delay-300 transform ${isVisible ? 'translate-y-0 opacity-100 rotate-0' : 'translate-y-12 opacity-0 rotate-6'}`}>
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-4 shadow-2xl border border-indigo-500/20 transform rotate-y-12 hover:rotate-y-0 transition-transform duration-500">
              <div className="flex items-center justify-between mb-4">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <div className="bg-slate-700 rounded-md px-3 py-1 text-xs text-slate-300">dashboard.virtualclassroom.com</div>
              </div>
              
              {/* Dashboard Content Preview */}
              <div className="bg-slate-800 rounded-lg p-4">
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h3 className="text-white text-lg font-medium">Welcome back, Guest!</h3>
                    <p className="text-slate-400 text-sm">Monday, April 20, 2025</p>
                  </div>
                  <div className="bg-indigo-500 rounded-full w-10 h-10 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-3 mb-6">
                  <div className="bg-gradient-to-br from-indigo-500/20 to-indigo-700/20 rounded-lg p-3 border border-indigo-500/30">
                    <div className="text-indigo-400 text-sm mb-1">Active Classes</div>
                    <div className="text-white text-2xl font-bold">4</div>
                  </div>
                  <div className="bg-gradient-to-br from-teal-500/20 to-teal-700/20 rounded-lg p-3 border border-teal-500/30">
                    <div className="text-teal-400 text-sm mb-1">Assignments</div>
                    <div className="text-white text-2xl font-bold">12</div>
                  </div>
                </div>
                
                <div className="bg-slate-700/50 rounded-lg p-3 mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <div className="text-white font-medium">Upcoming Classes</div>
                    <div className="text-indigo-400 text-xs">View All</div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center bg-slate-800/80 p-2 rounded">
                      <div>
                        <div className="text-white text-sm">Advanced Mathematics</div>
                        <div className="text-slate-400 text-xs">10:00 AM - 11:30 AM</div>
                      </div>
                      <div className="bg-amber-500/20 text-amber-400 text-xs rounded px-2 py-1">In 15min</div>
                    </div>
                    <div className="flex justify-between items-center bg-slate-800/50 p-2 rounded">
                      <div>
                        <div className="text-white text-sm">Data Structures</div>
                        <div className="text-slate-400 text-xs">1:00 PM - 2:30 PM</div>
                      </div>
                      <div className="bg-slate-700 text-slate-400 text-xs rounded px-2 py-1">Today</div>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-center">
                  <div className="w-1/2 bg-slate-700/30 h-1 rounded"></div>
                </div>
              </div>
            </div>
            
            {/* Decorative Elements */}
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-teal-500/10 rounded-full blur-xl"></div>
            <div className="absolute -top-6 -left-6 w-32 h-32 bg-indigo-500/10 rounded-full blur-xl"></div>
          </div>
        </div>
        
        {/* Wave Separator */}
        <div className="absolute bottom-0 left-0 w-full">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full h-auto">
            <path fill="#0f172a" fillOpacity="1" d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,208C672,213,768,203,864,186.7C960,171,1056,149,1152,149.3C1248,149,1344,171,1392,181.3L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          </svg>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-slate-900 py-24 px-4 md:px-8" id="features">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Powerful Features</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">Discover how our platform can transform your educational experience</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className={`bg-gradient-to-br from-slate-800 to-slate-900 p-8 rounded-xl shadow-lg border border-slate-700/50 transition-all duration-300 hover:shadow-indigo-500/20 hover:-translate-y-1 group relative overflow-hidden`}
              >
                {/* Background glow effect */}
                <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-teal-500 rounded-xl blur opacity-0 group-hover:opacity-20 transition duration-500"></div>
                
                {/* Content */}
                <div className="relative">
                  <div className="text-indigo-400 mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                  <p className="text-gray-400">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-gradient-to-r from-indigo-900 to-slate-900 py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Ready to Transform Your Learning Experience?</h2>
          <p className="text-xl text-gray-300 mb-8">Join thousands of students and teachers already using Virtual Classroom.</p>
          <button 
            onClick={handleGetStarted}
            className="px-8 py-4 bg-gradient-to-r from-amber-500 to-amber-600 text-white text-lg font-semibold rounded-lg shadow-lg hover:shadow-amber-500/50 transition-all duration-300 transform hover:-translate-y-1"
          >
            Get Started Now
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-slate-900 text-gray-400 py-12 px-4">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between">
          <div className="mb-8 md:mb-0">
            <h3 className="text-2xl font-bold text-white mb-4">Virtual Classroom</h3>
            <p className="max-w-xs">Empowering education through innovative technology solutions.</p>
          </div>
          <div>
            <p>© {new Date().getFullYear()} Virtual Classroom. All rights reserved.</p>
          </div>
        </div>
      </footer>
      
      {/* Add CSS for custom animations */}
      <style jsx>{`
        @keyframes float {
          0% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
          100% { transform: translateY(0px) rotate(0deg); }
        }
        
        @keyframes typing {
          0% { width: 0; opacity: 0; }
          50% { opacity: 1; }
          100% { width: 100%; opacity: 0; }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .animate-typing {
          animation: typing 4s ease-in-out infinite;
        }
        
        .perspective-lg {
          perspective: 1000px;
        }
        
        .rotate-y-12 {
          transform: rotateY(12deg);
        }
        
        .hover:rotate-y-0:hover {
          transform: rotateY(0deg);
        }
      `}</style>
    </div>
  );
};

export default LandingPage;