import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { CATEGORIES } from '../services/api';

export const AdminDashboard = () => {
  const { articles, addArticle, deleteArticle } = useAppContext();
  const [activeTab, setActiveTab] = useState('create');
  const [pin, setPin] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Form State
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('News');
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');
  const [hashtags, setHashtags] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [seoTitle, setSeoTitle] = useState('');
  const [seoDescription, setSeoDescription] = useState('');
  const [seoKeywords, setSeoKeywords] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    if (pin === '33451') {
      setIsAuthenticated(true);
    } else {
      alert('Access Denied');
    }
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
        <div className="bg-white rounded-lg shadow-sm p-1 inline-flex border border-gray-200">
          <button onClick={() => setActiveTab('create')} className={`px-6 py-2 rounded font-bold transition-colors ${activeTab === 'create' ? 'bg-indigo-600 text-white' : 'text-gray-500'}`}>Write</button>
          <button onClick={() => setActiveTab('manage')} className={`px-6 py-2 rounded font-bold transition-colors ${activeTab === 'manage' ? 'bg-indigo-600 text-white' : 'text-gray-500'}`}>Manage</button>
        </div>
      </div>

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
