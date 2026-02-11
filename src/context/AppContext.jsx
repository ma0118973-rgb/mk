import React, { createContext, useState, useEffect, useContext, useCallback } from 'react';
import * as api from '../services/api';

const AppContext = createContext();

export const useAppContext = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
  const [articles, setArticles] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [users, setUsers] = useState([]); // Mock users
  const [myPostedJobIds, setMyPostedJobIds] = useState([]);
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

        // Mock Users
        setUsers([
            { id: 'u1', name: 'John Doe', email: 'john@example.com', status: 'Active' },
            { id: 'u2', name: 'Jane Smith', email: 'jane@example.com', status: 'Active' },
            { id: 'u3', name: 'Bob Johnson', email: 'bob@test.com', status: 'Banned' },
        ]);

        // Load my posted jobs
        const myJobs = JSON.parse(localStorage.getItem('my_posted_jobs') || '[]');
        setMyPostedJobIds(myJobs);

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

  const addJob = useCallback((job) => {
    setJobs(prev => {
        const updated = [job, ...prev];
        localStorage.setItem('pg_jobs', JSON.stringify(updated));
        return updated;
    });
    // Track my posted jobs
    setMyPostedJobIds(prev => {
        const updated = [...prev, job.id];
        localStorage.setItem('my_posted_jobs', JSON.stringify(updated));
        return updated;
    });
  }, []);

  const deleteJob = useCallback((id) => {
    setJobs(prev => {
        const updated = prev.filter(j => j.id !== id);
        localStorage.setItem('pg_jobs', JSON.stringify(updated));
        return updated;
    });
  }, []);

  const banUser = useCallback((id) => {
      setUsers(prev => prev.map(u => u.id === id ? { ...u, status: u.status === 'Banned' ? 'Active' : 'Banned' } : u));
  }, []);

  const value = {
    articles,
    jobs,
    users,
    myPostedJobIds,
    loading,
    addArticle,
    updateArticle,
    deleteArticle,
    addJob,
    deleteJob,
    banUser
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
