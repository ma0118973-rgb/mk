import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export const Footer = () => {
  const navigate = useNavigate();
  const [clickCount, setClickCount] = useState(0);

  const handleAdminClick = () => {
      const newCount = clickCount + 1;
      setClickCount(newCount);
      if (newCount >= 5) {
          navigate('/admin');
          setClickCount(0);
      }
  };

  return (
    <footer className="bg-[#0f172a] text-white mt-20 pt-16 pb-32 border-t-8 border-indigo-600 relative">
      <div className="container mx-auto px-6 safe-area-padding">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="md:col-span-2">
            <h2 className="brand-logo text-4xl mb-6 font-black tracking-tight text-white">VELARA.</h2>
            <p className="text-slate-400 font-serif text-lg leading-relaxed max-w-md">Illuminating the world through stories. Designed for clarity, depth, and the modern reader.</p>
          </div>
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest mb-6 text-indigo-400">Discover</h4>
            <ul className="space-y-4 text-base font-medium text-slate-300">
              <li><Link to="/jobs" className="hover:text-white hover:underline text-pink-400">Find a Job</Link></li>
              <li><Link to="/category/visa%20&%20immigration" className="hover:text-white hover:underline text-green-400">Visa Guide</Link></li>
              <li><Link to="/category/tech" className="hover:text-white hover:underline">Technology</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest mb-6 text-indigo-400">Legal & Support</h4>
            <div className="flex flex-col space-y-3 text-sm text-slate-400">
              <Link to="/privacy" className="hover:text-white text-indigo-300 font-bold">Privacy Policy</Link>
              <Link to="/terms" className="hover:text-white">Terms of Use</Link>
              <Link to="/disclaimer" className="hover:text-white">Disclaimer</Link>
              <Link to="/about" className="hover:text-white">About Us</Link>
              <Link to="/contact" className="hover:text-white">Contact</Link>
            </div>
          </div>
        </div>
        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center text-center md:text-left">
          <div className="mb-4 md:mb-0">
            <p className="text-sm text-slate-500 font-bold">© 2026 Velara Global Media. All Rights Reserved.</p>
            <p className="text-[10px] text-slate-600 mt-1 uppercase tracking-wider">Authorized Content Aggregator. Global Standards Compliant.</p>
          </div>
          <div className="w-4 h-4 rounded-full bg-slate-800 hover:bg-indigo-500 cursor-pointer transition-colors" onClick={handleAdminClick} title="Admin Login"></div>
        </div>
      </div>
    </footer>
  );
};
