import React, { useEffect, useState, useCallback } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { Home } from './pages/Home';
import { ArticleDetail } from './pages/ArticleDetail';
import { CategoryPage } from './pages/CategoryPage';
import { JobBoard } from './pages/JobBoard';
import { AdminDashboard } from './pages/AdminDashboard';
import { StaticPage } from './pages/StaticPage';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { MobileNav } from './components/MobileNav';
import * as api from './services/api';

const AnalyticsTracker = () => {
  const location = useLocation();
  useEffect(() => {
    // Simple analytics mock
    const history = JSON.parse(localStorage.getItem('pg_analytics_history') || '[]');
    const newEntry = {
      timestamp: Date.now(),
      path: location.pathname,
      source: document.referrer || 'Direct',
    };
    history.push(newEntry);
    if (history.length > 5000) history.shift();
    localStorage.setItem('pg_analytics_history', JSON.stringify(history));
    
    const views = Number(localStorage.getItem('pg_total_views') || 0);
    localStorage.setItem('pg_total_views', (views + 1).toString());
    
    window.scrollTo(0, 0);
  }, [location]);
  return null;
};

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <AppProvider>
      <BrowserRouter>
        <AnalyticsTracker />
        <div className="min-h-screen flex flex-col bg-slate-50 overflow-x-hidden w-full relative font-sans text-slate-900">
          <Navbar isOpen={isMenuOpen} setIsOpen={setIsMenuOpen} />
          <main className="flex-grow w-full max-w-[100vw] overflow-x-hidden bg-slate-50 mb-16 lg:mb-0">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/category/:categoryName" element={<CategoryPage />} />
              {/* Dynamic Routing: Using Slug instead of ID */}
              <Route path="/blog/:slug" element={<ArticleDetail />} />
              {/* Legacy support: Redirect old ID based URLs if needed, or handle them in ArticleDetail */}
              <Route path="/article/:id" element={<ArticleDetail />} /> 
              
              <Route path="/jobs" element={<JobBoard />} />
              <Route path="/admin" element={<AdminDashboard />} />
              
              <Route path="/privacy" element={<StaticPage type="privacy" />} />
              <Route path="/terms" element={<StaticPage type="terms" />} />
              <Route path="/disclaimer" element={<StaticPage type="disclaimer" />} />
              <Route path="/contact" element={<StaticPage type="contact" />} />
              <Route path="/about" element={<StaticPage type="about" />} />
              
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
          <Footer />
          <MobileNav onMenuClick={() => setIsMenuOpen(true)} />
        </div>
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;
