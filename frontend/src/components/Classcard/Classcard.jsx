import React from 'react';

const ClassCard = ({ classTitle, onClick }) => {
  // Always return a green gradient
  const getColorFromTitle = () => {
    return 'from-emerald-500 to-green-700'; // consistent green gradient
  }

  // Get gradient color
  const gradientClass = getColorFromTitle();

  return (
    <div 
      onClick={onClick}
      className="w-64 h-48 bg-slate-800 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-slate-700 overflow-hidden cursor-pointer hover:-translate-y-2 relative group"
    >
      {/* Background gradient with reduced opacity */}
      <div className={`absolute inset-0 bg-gradient-to-br ${gradientClass} opacity-10 group-hover:opacity-20 transition-opacity duration-300`}></div>
      
      <div className="p-6 flex flex-col h-full justify-between relative">
        {/* Icon in top right */}
        <div className="flex justify-between items-start mb-4">
          <div className={`w-14 h-14 rounded-lg bg-gradient-to-br ${gradientClass} flex items-center justify-center text-white shadow-lg transform group-hover:scale-110 transition-transform duration-300`}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          
          {/* Decorative elements */}
          <div className="flex space-x-1">
            <div className="w-2 h-2 rounded-full bg-slate-600"></div>
            <div className="w-2 h-2 rounded-full bg-slate-600"></div>
          </div>
        </div>
        
        {/* Content */}
        <div className="flex-grow">
          {classTitle && (
            <h3 className="text-xl font-bold text-white mb-2 group-hover:text-slate-100">
              {classTitle}
            </h3>
          )}
        </div>
        
        {/* Bottom action hint with subtle animation */}
        <div className="flex items-center justify-between text-sm text-slate-300 mt-4 group-hover:text-white transition-colors">
          <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Click to enter</span>
          </div>
          
          {/* Arrow icon that moves on hover */}
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default ClassCard;