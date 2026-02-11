import React, { useState } from 'react';

export const JobModal = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    location: '',
    type: 'Full-time',
    duration: '',
    whatsapp: '',
    email: '',
    description: ''
  });

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      id: Date.now().toString(),
      isUserPosted: true,
      postedDate: new Date().toLocaleDateString(),
      salaryRange: 'Negotiable' // Default or add field if needed
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl relative animate-fade-in-up my-4 md:my-8">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 transition-colors">
          <i className="fas fa-times"></i>
        </button>
        
        <div className="p-6 md:p-8 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-t-2xl">
          <h2 className="text-xl md:text-2xl font-black text-indigo-900"><i className="fas fa-briefcase mr-2 text-indigo-600"></i> Post a Job</h2>
          <p className="text-xs md:text-sm text-indigo-600 font-bold mt-1">Share your opportunity with our global community.</p>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Job Title <span className="text-red-500">*</span></label>
              <input required name="title" value={formData.title} onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 font-bold text-gray-900 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors" placeholder="e.g. Software Engineer" />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Company Name <span className="text-red-500">*</span></label>
              <input required name="company" value={formData.company} onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 font-bold text-gray-900 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors" placeholder="Your Company" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Location / Remote <span className="text-red-500">*</span></label>
              <input required name="location" value={formData.location} onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 font-medium text-gray-900 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors" placeholder="e.g. Remote, New York" />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Job Type</label>
              <select name="type" value={formData.type} onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 font-medium text-gray-900 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors appearance-none">
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Contract">Contract</option>
                <option value="Freelance">Freelance</option>
                <option value="Internship">Internship</option>
              </select>
            </div>
          </div>

          <div>
             <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Duration / Hours <span className="text-red-500">*</span></label>
             <input required name="duration" value={formData.duration} onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 font-medium text-gray-900 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors" placeholder="e.g. 40h/week, 6 months" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">WhatsApp (Optional)</label>
              <input name="whatsapp" value={formData.whatsapp} onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 font-medium text-gray-900 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors" placeholder="+1 234..." />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Email (Optional)</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 font-medium text-gray-900 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors" placeholder="contact@example.com" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Description</label>
            <textarea name="description" value={formData.description} onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 font-medium text-gray-900 h-32 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors" placeholder="Job details..."></textarea>
          </div>

          <div className="pt-4 border-t border-gray-100 flex justify-end gap-4">
            <button type="button" onClick={onClose} className="px-6 py-3 rounded-lg font-bold text-gray-500 hover:bg-gray-100 transition-colors">Cancel</button>
            <button type="submit" className="bg-indigo-600 text-white px-8 py-3 rounded-lg font-bold shadow-lg hover:bg-indigo-700 hover:shadow-xl transition-all transform hover:-translate-y-0.5">Post Job Now</button>
          </div>
        </form>
      </div>
    </div>
  );
};