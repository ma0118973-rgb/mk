import React, { useEffect } from 'react';

export const StaticPage = ({ type }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [type]);

  const renderContent = () => {
    switch (type) {
      case 'privacy':
        return (
          <div className="space-y-10">
            <div className="border-b-2 border-indigo-500 pb-6">
              <h1 className="text-4xl md:text-6xl font-black text-white mb-4">Privacy Policy</h1>
              <p className="text-xl font-bold text-gray-400">Effective Date: October 2025</p>
            </div>
            <div className="space-y-8 text-lg font-medium text-gray-200 leading-relaxed">
              <p>At <strong>VELARA</strong>, accessible from our website, one of our main priorities is the privacy of our visitors.</p>
              {/* Add more content as needed based on original */}
            </div>
          </div>
        );
      case 'contact':
        return (
          <div className="max-w-4xl mx-auto">
            <div className="border-b-2 border-yellow-500 pb-6 mb-10">
              <h1 className="text-4xl md:text-6xl font-black text-white mb-4">Contact Us</h1>
            </div>
            <form className="space-y-6 bg-white/5 p-10 rounded-3xl border border-white/10 shadow-2xl">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                        <label className="block text-sm font-black uppercase text-gray-400 mb-2">First Name</label>
                        <input type="text" className="w-full bg-white/5 border border-white/10 p-4 rounded-xl focus:border-yellow-500 text-white" />
                    </div>
                    <div>
                        <label className="block text-sm font-black uppercase text-gray-400 mb-2">Last Name</label>
                        <input type="text" className="w-full bg-white/5 border border-white/10 p-4 rounded-xl focus:border-yellow-500 text-white" />
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-black uppercase text-gray-400 mb-2">Email</label>
                    <input type="email" className="w-full bg-white/5 border border-white/10 p-4 rounded-xl focus:border-yellow-500 text-white" />
                </div>
                <div>
                    <label className="block text-sm font-black uppercase text-gray-400 mb-2">Message</label>
                    <textarea className="w-full bg-white/5 border border-white/10 p-4 rounded-xl focus:border-yellow-500 text-white h-48 resize-none"></textarea>
                </div>
                <button className="w-full bg-yellow-500 text-black px-10 py-5 font-black uppercase tracking-widest hover:bg-yellow-400 rounded-xl text-xl">Send Message</button>
            </form>
          </div>
        );
      default:
        return <div className="text-white text-center text-2xl py-20">Content coming soon for {type}...</div>;
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 py-16 text-white">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="max-w-5xl mx-auto">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};
