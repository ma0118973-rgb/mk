import React from 'react';
import { NavLink } from 'react-router-dom';

export const MobileNav = ({ onMenuClick }) => {
  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50 flex justify-around items-center h-16 shadow-[0_-5px_10px_rgba(0,0,0,0.05)] pb-safe">
      <NavLink 
        to="/" 
        className={({ isActive }) => `flex flex-col items-center justify-center w-full h-full ${isActive ? "text-indigo-600" : "text-gray-400"}`}
      >
        <i className="fas fa-home text-lg mb-1"></i>
        <span className="text-[9px] font-bold uppercase">Home</span>
      </NavLink>
      
      <NavLink 
        to="/category/visa%20&%20immigration" 
        className={({ isActive }) => `flex flex-col items-center justify-center w-full h-full ${isActive ? "text-indigo-600" : "text-gray-400"}`}
      >
        <i className="fas fa-passport text-lg mb-1"></i>
        <span className="text-[9px] font-bold uppercase">Visa</span>
      </NavLink>
      
      <div className="relative -top-5 w-14 h-14">
        <NavLink 
            to="/jobs" 
            className={({ isActive }) => `absolute inset-0 bg-pink-600 text-white rounded-full flex items-center justify-center shadow-lg border-4 border-slate-50 transform active:scale-95 transition-transform ${isActive ? 'bg-pink-700' : ''}`}
        >
            <i className="fas fa-briefcase text-xl"></i>
        </NavLink>
      </div>
      
      <NavLink 
        to="/category/news" 
        className={({ isActive }) => `flex flex-col items-center justify-center w-full h-full ${isActive ? "text-indigo-600" : "text-gray-400"}`}
      >
        <i className="fas fa-newspaper text-lg mb-1"></i>
        <span className="text-[9px] font-bold uppercase">News</span>
      </NavLink>
      
      <button 
        onClick={onMenuClick} 
        className="flex flex-col items-center justify-center w-full h-full text-gray-400 hover:text-indigo-600 transition-colors"
      >
        <i className="fas fa-bars text-lg mb-1"></i>
        <span className="text-[9px] font-bold uppercase">Menu</span>
      </button>
    </div>
  );
};
