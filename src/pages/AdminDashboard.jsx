import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { CATEGORIES } from '../services/api';

export const AdminDashboard = () => {
  const { articles, addArticle, deleteArticle, jobs, addJob, deleteJob, users, banUser } = useAppContext();
  const [activeTab, setActiveTab] = useState('create');
  const [pin, setPin] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Article Form State
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('News');
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');
  const [hashtags, setHashtags] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [seoTitle, setSeoTitle] = useState('');
  const [seoDescription, setSeoDescription] = useState('');
  const [seoKeywords, setSeoKeywords] = useState('');

  // Job Form State
  const [jobData, setJobData] = useState({
    title: '', company: '', location: '', type: 'Full-time', duration: '', whatsapp: '', email: '', description: '', salaryRange: 'Negotiable'
  });

  const handleLogin = (e) => {
    e.preventDefault();
    if (pin === '33451') {
      setIsAuthenticated(true);
    } else {
      alert('Access Denied');
    }
  };

  const handleJobChange = (e) => {
      const { name, value } = e.target;
      setJobData(prev => ({ ...prev, [name]: value }));
  };

  const handleJobSubmit = (e) => {
      e.preventDefault();
      addJob({
          ...jobData,
          id: Date.now().toString(),
          isUserPosted: true, // Or false if admin posted, but keeping consistent for now
          postedDate: new Date().toLocaleDateString(),
          source: 'Admin'
      });
      alert('Job Posted Successfully!');
      setJobData({ title: '', company: '', location: '', type: 'Full-time', duration: '', whatsapp: '', email: '', description: '', salaryRange: 'Negotiable' });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '') + '-' + Date.now().toString().slice(-6);
    const newArticle = {
      id: Date.now().toString(),
      slug,
      date: new Date().toLocaleDateString(),
      likes: 0,
      views: 0,
      title,
      category,
      content,
      author,
      hashtags,
      imageUrl: imageUrl || `https://picsum.photos/800/400?random=${Date.now()}`,
      seoTitle: seoTitle || title,
      seoDescription: seoDescription || content.substring(0, 150),
      seoKeywords
    };
    addArticle(newArticle);
    alert('Article Published Successfully!');
    // Reset form
    setTitle('');
    setContent('');
    setAuthor('');
    setHashtags('');
    setImageUrl('');
    setSeoTitle('');
    setSeoDescription('');
    setSeoKeywords('');
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-indigo-900 p-4">
        <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-sm w-full border-4 border-indigo-500">
          <h3 className="text-xl font-bold text-center mb-6 text-indigo-900">Publisher Login</h3>
          <form onSubmit={handleLogin}>
            <input 
              type="password" 
              autoFocus 
              placeholder="PIN" 
              value={pin} 
              onChange={(e) => setPin(e.target.value)} 
              className="w-full text-center text-3xl tracking-[0.5em] border-2 border-indigo-100 rounded-lg py-4 focus:outline-none focus:border-indigo-600 mb-6 font-bold text-indigo-900"
            />
            <button type="submit" className="w-full bg-indigo-600 text-white py-4 rounded-lg font-bold text-sm uppercase tracking-widest hover:bg-indigo-700 shadow-lg">Enter Dashboard</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 bg-slate-50 min-h-screen">
      <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
        <h1 className="text-3xl font-black text-indigo-900">Publisher Dashboard</h1>
        <div className="bg-white rounded-lg shadow-sm p-1 inline-flex border border-gray-200 flex-wrap justify-center">
          <button onClick={() => setActiveTab('create')} className={`px-4 py-2 rounded font-bold transition-colors ${activeTab === 'create' ? 'bg-indigo-600 text-white' : 'text-gray-500'}`}>Write Article</button>
          <button onClick={() => setActiveTab('create-job')} className={`px-4 py-2 rounded font-bold transition-colors ${activeTab === 'create-job' ? 'bg-indigo-600 text-white' : 'text-gray-500'}`}>Post Job</button>
          <button onClick={() => setActiveTab('manage')} className={`px-4 py-2 rounded font-bold transition-colors ${activeTab === 'manage' ? 'bg-indigo-600 text-white' : 'text-gray-500'}`}>Manage Articles</button>
          <button onClick={() => setActiveTab('manage-jobs')} className={`px-4 py-2 rounded font-bold transition-colors ${activeTab === 'manage-jobs' ? 'bg-indigo-600 text-white' : 'text-gray-500'}`}>Manage Jobs</button>
          <button onClick={() => setActiveTab('manage-users')} className={`px-4 py-2 rounded font-bold transition-colors ${activeTab === 'manage-users' ? 'bg-indigo-600 text-white' : 'text-gray-500'}`}>Users</button>
        </div>
      </div>

      {activeTab === 'manage-users' && (
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider">
                <th className="p-4">Name</th>
                <th className="p-4">Email</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user.id} className="border-t border-gray-100 hover:bg-gray-50">
                  <td className="p-4 font-bold text-gray-900">{user.name}</td>
                  <td className="p-4">{user.email}</td>
                  <td className="p-4"><span className={`px-2 py-1 rounded text-xs font-bold uppercase ${user.status === 'Banned' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>{user.status}</span></td>
                  <td className="p-4 text-right">
                    <button onClick={() => banUser(user.id)} className="text-red-600 font-bold hover:underline">{user.status === 'Banned' ? 'Unban' : 'Ban'}</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === 'create-job' && (
          <div className="bg-white p-8 rounded-2xl shadow-lg border border-indigo-50 max-w-4xl mx-auto">
              <h2 className="text-2xl font-black mb-6 text-indigo-900 border-b border-gray-100 pb-4">Post New Job</h2>
              <form onSubmit={handleJobSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Job Title</label>
                        <input required name="title" value={jobData.title} onChange={handleJobChange} className="w-full border-2 border-gray-200 rounded-lg p-3" />
                    </div>
                    <div>
                        <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Company</label>
                        <input required name="company" value={jobData.company} onChange={handleJobChange} className="w-full border-2 border-gray-200 rounded-lg p-3" />
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                        <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Location</label>
                        <input required name="location" value={jobData.location} onChange={handleJobChange} className="w-full border-2 border-gray-200 rounded-lg p-3" />
                    </div>
                    <div>
                        <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Type</label>
                        <select name="type" value={jobData.type} onChange={handleJobChange} className="w-full border-2 border-gray-200 rounded-lg p-3 bg-white">
                            <option value="Full-time">Full-time</option>
                            <option value="Part-time">Part-time</option>
                            <option value="Contract">Contract</option>
                            <option value="Remote">Remote</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Salary Range</label>
                        <input name="salaryRange" value={jobData.salaryRange} onChange={handleJobChange} className="w-full border-2 border-gray-200 rounded-lg p-3" />
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Duration</label>
                        <input name="duration" value={jobData.duration} onChange={handleJobChange} className="w-full border-2 border-gray-200 rounded-lg p-3" placeholder="e.g. Indefinite, 6 months" />
                    </div>
                    <div>
                         <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">WhatsApp / Email (Contact)</label>
                         <input name="whatsapp" value={jobData.whatsapp} onChange={handleJobChange} className="w-full border-2 border-gray-200 rounded-lg p-3" placeholder="Contact Info" />
                    </div>
                </div>
                <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Description</label>
                    <textarea name="description" value={jobData.description} onChange={handleJobChange} className="w-full border-2 border-gray-200 rounded-lg p-3 h-32" />
                </div>
                <button type="submit" className="bg-indigo-600 text-white px-8 py-3 rounded-lg font-bold shadow-lg">Post Job</button>
              </form>
          </div>
      )}

      {activeTab === 'manage-jobs' && (
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider">
                <th className="p-4">Job Title</th>
                <th className="p-4">Company</th>
                <th className="p-4">Posted</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {jobs.map(job => (
                <tr key={job.id} className="border-t border-gray-100 hover:bg-gray-50">
                  <td className="p-4 font-bold text-gray-900">{job.title}</td>
                  <td className="p-4">{job.company}</td>
                  <td className="p-4 text-xs text-gray-500">{job.postedDate}</td>
                  <td className="p-4 text-right">
                    <button onClick={() => deleteJob(job.id)} className="text-red-600 font-bold hover:underline">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === 'create' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="bg-white p-8 rounded-2xl shadow-lg border border-indigo-50">
                <h2 className="text-2xl font-black mb-6 text-indigo-900 border-b border-gray-100 pb-4">Write New Story</h2>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-bold text-gray-500 mb-1 uppercase">Article Headline</label>
                    <input required type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full border-2 border-gray-200 rounded-lg p-4 focus:border-indigo-500 focus:outline-none text-xl font-bold text-gray-900" placeholder="The main title..." />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-bold text-gray-500 mb-1 uppercase">Category</label>
                      <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full border-2 border-gray-200 rounded-lg p-3 text-lg font-bold bg-white">
                        {Object.values(CATEGORIES).map(cat => <option key={cat} value={cat}>{cat}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-500 mb-1 uppercase">Author</label>
                      <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)} className="w-full border-2 border-gray-200 rounded-lg p-3" placeholder="Author Name" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-500 mb-1 uppercase">Cover Image URL</label>
                    <input type="text" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} className="w-full border-2 border-gray-200 rounded-lg p-3" placeholder="https://..." />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-500 mb-1 uppercase">Content (HTML supported)</label>
                    <textarea required value={content} onChange={(e) => setContent(e.target.value)} className="w-full border-2 border-gray-200 rounded-lg p-6 focus:border-indigo-500 focus:outline-none h-[400px] text-lg font-medium leading-relaxed text-gray-800 font-serif" placeholder="Write your story here..." />
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-md border-l-4 border-green-500">
                <h3 className="text-lg font-black uppercase tracking-widest text-gray-800 mb-4"><i className="fas fa-search mr-2 text-green-600"></i> SEO & Metadata</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-500 mb-1 uppercase">Meta Title</label>
                    <input type="text" value={seoTitle} onChange={(e) => setSeoTitle(e.target.value)} className="w-full border border-gray-300 rounded p-2 text-sm font-bold text-gray-700" placeholder="Custom title for Google" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 mb-1 uppercase">Meta Description</label>
                    <textarea value={seoDescription} onChange={(e) => setSeoDescription(e.target.value)} className="w-full border border-gray-300 rounded p-2 text-sm text-gray-700 h-20" placeholder="Summary for search engines" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 mb-1 uppercase">Keywords</label>
                    <input type="text" value={seoKeywords} onChange={(e) => setSeoKeywords(e.target.value)} className="w-full border border-gray-300 rounded p-2 text-sm text-gray-700" placeholder="comma, separated, keywords" />
                  </div>
                </div>
              </div>

              <div className="flex justify-end pt-4">
                <button type="submit" className="bg-indigo-600 text-white px-10 py-4 rounded-xl font-black text-lg uppercase tracking-widest hover:bg-indigo-700 shadow-xl">Publish Article</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {activeTab === 'manage' && (
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider">
                <th className="p-4">Title</th>
                <th className="p-4">Category</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {articles.map(article => (
                <tr key={article.id} className="border-t border-gray-100 hover:bg-gray-50">
                  <td className="p-4 font-bold text-gray-900">{article.title}</td>
                  <td className="p-4"><span className="bg-indigo-100 text-indigo-800 text-xs font-bold px-2 py-1 rounded uppercase">{article.category}</span></td>
                  <td className="p-4 text-right">
                    <button onClick={() => deleteArticle(article.id)} className="text-red-600 font-bold">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
