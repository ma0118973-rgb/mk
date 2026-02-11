import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CATEGORIES } from '../services/api';

export const Navbar = ({ isOpen, setIsOpen }) => {
  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-indigo-900 via-blue-800 to-indigo-900 shadow-lg text-white">
        <div className="hidden sm:flex flex-row justify-between items-center py-2 px-8 bg-black/20 text-[11px] font-bold uppercase tracking-widest text-blue-100">
          <div className="flex items-center gap-4">
            <span className="text-red-400"><i className="fas fa-circle text-[6px] align-middle mr-1"></i> Live</span>
            <span>{new Date().toLocaleDateString()}</span>
          </div>
          <div className="flex space-x-6"><span className="text-blue-200">Global Edition</span></div>
        </div>
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex justify-between items-center h-16 lg:h-20">
            <Link to="/" className="text-center lg:text-left flex-grow lg:flex-grow-0">
              <span className="brand-logo text-3xl lg:text-4xl font-black tracking-tight text-white drop-shadow-md">VELARA</span>
            </Link>
            <nav className="hidden lg:flex items-center space-x-8 mx-auto">
              <Link to="/" className="text-xs font-bold uppercase tracking-widest text-blue-100 hover:text-white transition-colors hover:scale-105 transform">Cover</Link>
              <Link to="/category/visa%20&%20immigration" className="text-xs font-bold uppercase tracking-widest text-green-300 hover:text-white transition-colors hover:scale-105 transform">Visa Guide</Link>
              <Link to="/category/news" className="text-xs font-bold uppercase tracking-widest text-blue-100 hover:text-white transition-colors hover:scale-105 transform">News</Link>
              <Link to="/category/movies" className="text-xs font-bold uppercase tracking-widest text-blue-100 hover:text-white transition-colors hover:scale-105 transform">Reviews</Link>
            </nav>
            <div className="hidden lg:flex items-center space-x-4">
              <Link to="/jobs" className="px-6 py-2 bg-pink-600 text-white text-[11px] font-bold uppercase tracking-widest hover:bg-pink-700 transition-colors rounded-full shadow-lg border border-pink-500">Jobs</Link>
            </div>
            <button onClick={() => setIsOpen(true)} className="lg:hidden text-white focus:outline-none p-2 ml-auto" aria-label="Open Menu">
              <i className="fas fa-bars text-xl"></i>
            </button>
          </div>
        </div>
      </header>
      <div className="h-16 lg:h-32"></div>
      
      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 bg-gradient-to-b from-indigo-900 to-purple-900 z-[60] transform transition-transform duration-300 ease-out ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex flex-col h-full text-white p-6 safe-area-padding">
          <div className="flex justify-between items-center mb-8 border-b border-white/10 pb-4">
            <span className="brand-logo text-3xl font-bold">VELARA</span>
            <button onClick={() => setIsOpen(false)} className="p-2 bg-white/10 rounded-full">
              <i className="fas fa-times text-xl"></i>
            </button>
          </div>
          <div className="flex flex-col space-y-6 overflow-y-auto flex-grow no-scrollbar">
            <Link to="/" onClick={() => setIsOpen(false)} className="text-2xl font-serif font-bold text-blue-100">Home</Link>
            <Link to="/category/visa%20&%20immigration" onClick={() => setIsOpen(false)} className="text-2xl font-serif font-bold text-green-400">Visa Consultant</Link>
            <Link to="/jobs" onClick={() => setIsOpen(false)} className="text-2xl font-serif font-bold text-pink-400">Job Board</Link>
            <div className="h-px bg-white/20 my-4"></div>
            <div className="grid grid-cols-2 gap-4">
              {Object.values(CATEGORIES).map(cat => (
                <Link key={cat} to={`/category/${cat.toLowerCase()}`} onClick={() => setIsOpen(false)} className="text-sm uppercase tracking-widest text-blue-200 mb-2 hover:text-white">{cat}</Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
