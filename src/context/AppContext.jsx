import React, { createContext, useState, useEffect, useContext, useCallback } from 'react';
import * as api from '../services/api';

const AppContext = createContext();

export const useAppContext = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
  const [articles, setArticles] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const fetchedArticles = await api.getArticles();
        setArticles(fetchedArticles);
        
        // Mock jobs for now or load from local storage
        const storedJobs = localStorage.getItem('pg_jobs');
        if (storedJobs) {
            setJobs(JSON.parse(storedJobs));
        } else {
            // Basic mock jobs if empty
            setJobs([
                { id: '1', title: 'Software Engineer', company: 'Tech Corp', location: 'Remote', type: 'Full-time', salaryRange: '$100k-$150k', postedDate: 'Today' },
                { id: '2', title: 'Product Manager', company: 'Biz Inc', location: 'New York', type: 'Full-time', salaryRange: '$120k-$180k', postedDate: 'Yesterday' }
            ]);
        }
      } catch (error) {
        console.error("Failed to load data", error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const addArticle = useCallback((article) => {
    setArticles(prev => {
        const updated = [article, ...prev];
        api.saveArticles(updated);
        return updated;
    });
  }, []);

  const updateArticle = useCallback((updatedArticle) => {
    setArticles(prev => {
        const updated = prev.map(a => a.id === updatedArticle.id ? updatedArticle : a);
        api.saveArticles(updated);
        return updated;
    });
  }, []);

  const deleteArticle = useCallback((id) => {
    setArticles(prev => {
        const updated = prev.filter(a => a.id !== id);
        api.saveArticles(updated);
        return updated;
    });
  }, []);

  const value = {
    articles,
    jobs,
    loading,
    addArticle,
    updateArticle,
    deleteArticle
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
