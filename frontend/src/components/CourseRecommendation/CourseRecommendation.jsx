import React, { useState } from "react";

const CourseRecommendation = () => {
  const [formData, setFormData] = useState({
    subject: "",
    budget: "",
    skillLevel: "",
    timeAvailability: "",
    learningStyle: "",
  });
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setLoading(true);
    setResponse(null);
    try {
      const res = await fetch("https://course-recommendation-api-9f4o.onrender.com/get_recommendations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      setResponse(data);
    } catch (error) {
      console.error("Error:", error);
      setResponse({ error: "Something went wrong." });
    } finally {
      setLoading(false);
    }
  };

  const getPlaceholder = (key) => {
    const labels = {
      subject: "What subject are you interested in?",
      budget: "Your budget for courses",
      skillLevel: "Beginner, Intermediate, or Advanced",
      timeAvailability: "Hours per week available",
      learningStyle: "Visual, Auditory, or Practical",
    };
    return labels[key] || key.replace(/([A-Z])/g, " $1").toLowerCase();
  };

  return (
    <div className="rounded-2xl shadow-lg border border-blue-100">
      <div className="p-6 md:p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-gradient-to-r from-blue-400 to-teal-400 p-3 rounded-xl">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-slate-800">Course Recommendation</h1>
        </div>
        
        <p className="text-slate-600 mb-6">Find the perfect learning path tailored to your preferences and goals.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {Object.entries(formData).map(([key, value]) => (
            <div key={key} className="relative">
              <input
                type="text"
                name={key}
                placeholder={getPlaceholder(key)}
                value={value}
                onChange={handleChange}
                className="w-full bg-blue-50 border border-blue-100 text-slate-800 placeholder-slate-400 px-4 py-3 rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-blue-300 focus:outline-none transition-all duration-200"
              />
            </div>
          ))}
        </div>

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full md:w-auto px-6 py-3 bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600 text-white font-medium rounded-lg shadow-md transition duration-300 transform hover:-translate-y-1 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
              </svg>
              <span>Processing...</span>
            </>
          ) : (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <span>Get Personalized Recommendations</span>
            </>
          )}
        </button>
      </div>

      {response && (
        <div className={`border-t border-blue-100 ${response.error ? 'pb-6 px-6 md:px-8 pt-4' : 'p-6 md:p-8'}`}>
          {response.error ? (
            <div className="flex items-center gap-3 text-red-500 bg-red-50 p-4 rounded-lg">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="font-medium">{response.error}</p>
            </div>
          ) : (
            <>
              <div className="mb-8">
                <div className="flex items-center gap-2 mb-4">
                  <div className="bg-green-100 p-1 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h2 className="text-xl font-bold text-slate-800">Recommended Courses</h2>
                </div>
                
                <div className="space-y-4">
                  {response.recommendations?.map((rec, i) => (
                    <div key={i} className="bg-white border border-blue-100 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow duration-200">
                      <h3 className="font-bold text-lg text-slate-800 mb-1">{rec.course_name}</h3>
                      <p className="text-sm text-blue-600 mb-2">via {rec.platform}</p>
                      
                      <div className="flex flex-wrap gap-2 mb-3">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          💰 {rec.cost}
                        </span>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-teal-100 text-teal-800">
                          ⏱ {rec.duration}
                        </span>
                      </div>
                      
                      <p className="text-slate-600 text-sm mb-3">{rec.description}</p>
                      
                      <a 
                        href={rec.url} 
                        className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors"
                        target="_blank" 
                        rel="noreferrer"
                      >
                        Visit Course
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <div className="flex items-center gap-2 mb-4">
                  <div className="bg-indigo-100 p-1 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                    </svg>
                  </div>
                  <h2 className="text-xl font-bold text-slate-800">Learning Roadmap</h2>
                </div>
                
                <div className="relative pl-8 space-y-6 before:content-[''] before:absolute before:left-3 before:top-2 before:h-full before:w-[2px] before:bg-indigo-200">
                  {response.roadmap?.map((stage, i) => (
                    <div key={i} className="relative">
                      <div className="absolute left-[-28px] bg-indigo-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold">
                        {i + 1}
                      </div>
                      
                      <div className="bg-indigo-50 rounded-xl p-4 border border-indigo-100">
                        <h3 className="font-bold text-slate-800 mb-2">{stage.stage}</h3>
                        <p className="text-slate-600 text-sm mb-3">{stage.description}</p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                          <div>
                            <p className="text-indigo-700 font-medium mb-1">Estimated Time</p>
                            <p className="text-slate-600">{stage.estimated_time}</p>
                          </div>
                          
                          <div>
                            <p className="text-indigo-700 font-medium mb-1">Key Skills</p>
                            <p className="text-slate-600">{stage.key_skills.join(", ")}</p>
                          </div>
                        </div>
                        
                        <div className="mt-3">
                          <p className="text-indigo-700 font-medium mb-1">Resources</p>
                          <p className="text-slate-600 text-sm">{stage.resources.join(", ")}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-yellow-50 border border-yellow-100 rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-500 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <p className="font-bold text-slate-800 mb-1">Pro Tips</p>
                    <p className="text-slate-600 text-sm">{response.additional_tips}</p>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default CourseRecommendation;