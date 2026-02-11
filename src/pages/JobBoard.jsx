import React, { useContext, useState, useMemo } from 'react';
import { useAppContext } from '../context/AppContext';
import { JobModal } from '../components/JobModal';

const JobCard = ({ job, isMyJob, onDelete }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className={`bg-white rounded-lg border border-gray-200 p-6 hover:border-blue-300 transition-all shadow-sm relative overflow-hidden group cursor-pointer ${expanded ? 'ring-2 ring-blue-500' : ''}`} onClick={() => setExpanded(!expanded)}>
      <div className={`absolute top-0 right-0 text-[10px] font-bold px-2 py-1 uppercase tracking-wider rounded-bl ${job.isUserPosted ? 'bg-orange-50 text-orange-700' : 'bg-green-50 text-green-700'}`}>
        {job.isUserPosted ? <span><i className="fas fa-user-circle mr-1"></i> User Post</span> : <span><i className="fas fa-check-circle mr-1"></i> {job.source || 'Verified'}</span>}
      </div>
      <div className="flex flex-col sm:flex-row gap-4 items-start mb-4 pr-0 sm:pr-16">
        {job.imageUrl && (
          <div className="w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden border border-gray-100 bg-white mx-auto sm:mx-0">
            <img src={job.imageUrl} alt={job.company} className="w-full h-full object-contain p-1" />
          </div>
        )}
        <div className="flex-grow text-center sm:text-left">
          <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-700 transition-colors leading-tight">{job.title}</h3>
          <p className="text-slate-500 font-medium text-sm">{job.company}</p>
        </div>
      </div>
      <div className="flex flex-wrap gap-y-2 gap-x-4 text-sm text-gray-500 mb-4">
        <span className="flex items-center gap-1"><i className="fas fa-map-marker-alt text-red-400"></i> {job.location}</span>
        <span className="flex items-center gap-1"><i className="fas fa-briefcase text-blue-400"></i> {job.type}</span>
        <span className="flex items-center gap-1 font-semibold text-green-600"><i className="fas fa-money-bill-wave"></i> {job.salaryRange || 'Negotiable'}</span>
        {job.duration && <span className="flex items-center gap-1 text-purple-600"><i className="far fa-clock"></i> {job.duration}</span>}
      </div>
      
      {/* Contact Info for User Posted Jobs */}
      {job.isUserPosted && expanded && (
          <div className="mb-4 bg-gray-50 p-3 rounded border border-gray-100 flex flex-wrap gap-4 text-sm">
              {job.whatsapp && <a href={`https://wa.me/${job.whatsapp.replace(/[^0-9]/g, '')}`} target="_blank" rel="noreferrer" onClick={(e) => e.stopPropagation()} className="flex items-center gap-2 text-green-600 font-bold hover:underline"><i className="fab fa-whatsapp text-lg"></i> {job.whatsapp}</a>}
              {job.email && <a href={`mailto:${job.email}`} onClick={(e) => e.stopPropagation()} className="flex items-center gap-2 text-blue-600 font-bold hover:underline"><i className="far fa-envelope text-lg"></i> {job.email}</a>}
          </div>
      )}

      <div className={`text-gray-600 text-sm mb-4 transition-all duration-500 ${expanded ? 'line-clamp-none' : 'line-clamp-2'}`}>
        <p className="whitespace-pre-line">{job.description}</p>
        {expanded && <p className="mt-4 text-gray-500 italic text-xs bg-yellow-50 p-2 rounded border border-yellow-100"><i className="fas fa-shield-alt mr-1"></i>Safety Tip: Never pay money for a job interview. Report suspicious posts.</p>}
      </div>
      <div className="flex justify-between items-center pt-4 border-t border-gray-100">
        <span className="text-xs text-blue-600 font-bold uppercase tracking-widest">{expanded ? 'Show Less' : 'Read Full Details'}</span>
        <div className="flex gap-3">
            {isMyJob && (
                <button 
                    onClick={(e) => { e.stopPropagation(); onDelete(job.id); }} 
                    className="bg-red-100 text-red-600 text-sm px-4 py-2 rounded hover:bg-red-200 transition-colors font-bold flex items-center"
                >
                    <i className="fas fa-trash-alt mr-2"></i> Delete
                </button>
            )}
            <button className="bg-slate-900 text-white text-sm px-6 py-2 rounded hover:bg-slate-800 transition-colors shadow-sm font-bold flex items-center">
                Apply Now <i className="fas fa-external-link-alt ml-2 text-xs"></i>
            </button>
        </div>
      </div>
    </div>
  );
};

export const JobBoard = () => {
  const { jobs, addJob, myPostedJobIds, deleteJob } = useAppContext();
  const [searchTerm, setSearchTerm] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredJobs = useMemo(() => {
    return jobs.filter(job => {
      const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            job.company.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesLocation = locationFilter === '' || job.location.includes(locationFilter);
      const matchesType = typeFilter === 'All' || job.type === typeFilter;
      return matchesSearch && matchesLocation && matchesType;
    });
  }, [jobs, searchTerm, locationFilter, typeFilter]);

  const handlePostJob = (jobData) => {
      addJob(jobData);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 pb-32">
      <JobModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSubmit={handlePostJob} />
      
      <div className="bg-gradient-to-r from-blue-900 to-slate-900 rounded-3xl p-6 md:p-12 text-center text-white mb-12 shadow-2xl relative overflow-hidden">
        <div className="relative z-10 max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-5xl font-serif font-bold mb-8 leading-tight">Find Your Next Role</h1>
          
          <div className="bg-white p-3 rounded-2xl shadow-xl flex flex-col md:flex-row gap-3 mb-6">
            <div className="flex-grow flex items-center bg-gray-50 rounded-xl px-4 py-3 border border-gray-200">
              <i className="fas fa-search text-gray-400 mr-3"></i>
              <input 
                type="text" 
                placeholder="Job title, keywords..." 
                className="w-full bg-transparent text-gray-900 font-bold focus:outline-none placeholder-gray-400 text-sm md:text-base"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex-shrink-0 md:w-48 bg-gray-50 rounded-xl px-4 py-3 border border-gray-200 relative">
              <i className="fas fa-map text-gray-400 absolute left-4 top-1/2 -translate-y-1/2"></i>
              <select 
                className="w-full bg-transparent text-gray-900 font-bold focus:outline-none pl-6 appearance-none cursor-pointer text-sm md:text-base"
                value={locationFilter}
                onChange={(e) => setLocationFilter(e.target.value)}
              >
                <option value="">All Locations</option>
                <option value="Remote">Remote</option>
                <option value="New York">New York</option>
                <option value="California">California</option>
                <option value="Texas">Texas</option>
              </select>
              <i className="fas fa-chevron-down text-gray-400 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-xs"></i>
            </div>
             <div className="flex-shrink-0 md:w-40 bg-gray-50 rounded-xl px-4 py-3 border border-gray-200 relative">
              <select 
                className="w-full bg-transparent text-gray-900 font-bold focus:outline-none appearance-none cursor-pointer text-sm md:text-base"
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
              >
                <option value="All">All Types</option>
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Contract">Contract</option>
                <option value="Remote">Remote</option>
              </select>
              <i className="fas fa-chevron-down text-gray-400 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-xs"></i>
            </div>
          </div>

          <button onClick={() => setIsModalOpen(true)} className="inline-flex items-center bg-white/10 backdrop-blur-md border border-white/20 text-white px-6 py-2 rounded-full hover:bg-white/20 transition-all font-bold text-sm uppercase tracking-widest group">
            <i className="fas fa-plus-circle mr-2 text-green-400"></i> Post a Job for Free
          </button>
        </div>
      </div>

      <div className="space-y-6">
          <div className="flex justify-between items-center mb-2 border-b border-gray-200 pb-4">
            <h2 className="font-bold text-slate-800 text-xl">{filteredJobs.length} Openings Found</h2>
            <span className="text-xs text-gray-500 font-medium">Sorted by: Relevance</span>
          </div>
          {filteredJobs.length > 0 ? (
            filteredJobs.map(job => (
                <JobCard 
                    key={job.id} 
                    job={job} 
                    isMyJob={myPostedJobIds.includes(job.id)}
                    onDelete={deleteJob}
                />
            ))
          ) : (
            <div className="text-center py-20 bg-white rounded-xl border border-dashed border-slate-300">
              <i className="far fa-folder-open text-4xl text-slate-300 mb-4"></i>
              <p className="text-slate-500">No jobs match your criteria.</p>
              <button onClick={() => {setSearchTerm(''); setLocationFilter(''); setTypeFilter('All');}} className="mt-4 text-blue-600 font-bold hover:underline">Clear Filters</button>
            </div>
          )}
      </div>
    </div>
  );
};