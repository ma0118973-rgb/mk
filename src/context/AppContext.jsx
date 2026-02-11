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
        const [fetchedArticles, fetchedJobs] = await Promise.all([
          api.getArticles(),
          api.getJobs()
        ]);
        setArticles(fetchedArticles);
        setJobs(fetchedJobs);

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

  const addArticle = useCallback(async (article) => {
    try {
      const saved = await api.createArticle(article);
      setArticles(prev => [saved, ...prev]);
    } catch (error) {
      console.error("Failed to add article", error);
    }
  }, []);

  const updateArticle = useCallback(async (updatedArticle) => {
    try {
      const saved = await api.updateArticle(updatedArticle);
      setArticles(prev => prev.map(a => a.id === saved.id ? saved : a));
    } catch (error) {
      console.error("Failed to update article", error);
    }
  }, []);

  const deleteArticle = useCallback(async (id) => {
    try {
      await api.deleteArticle(id);
      setArticles(prev => prev.filter(a => a.id !== id));
    } catch (error) {
      console.error("Failed to delete article", error);
    }
  }, []);

  const addJob = useCallback(async (job) => {
    try {
      const saved = await api.createJob(job);
      setJobs(prev => [saved, ...prev]);
      // Track my posted jobs
      setMyPostedJobIds(prev => {
          const updated = [...prev, job.id];
          localStorage.setItem('my_posted_jobs', JSON.stringify(updated));
          return updated;
      });
    } catch (error) {
      console.error("Failed to add job", error);
    }
  }, []);

  const deleteJob = useCallback(async (id) => {
    try {
      await api.deleteJob(id);
      setJobs(prev => prev.filter(j => j.id !== id));
    } catch (error) {
      console.error("Failed to delete job", error);
    }
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
