// Mock Data Generation and API Service

export const CATEGORIES = {
  NEWS: "News",
  JOBS: "Career Advice",
  VISA: "Visa & Immigration",
  MOVIES: "Movies",
  TECH: "Technology",
  FINANCE: "Finance",
  LIFESTYLE: "Lifestyle",
};

const API_BASE = "/.netlify/functions";

const generateMockArticles = () => {
  // Generate some articles if none exist
  const articles = [];
  const images = [
    "https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&q=80&w=1200",
    "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200",
    "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=1200",
    "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80&w=1200"
  ];

  for (let i = 0; i < 20; i++) {
    const title = `Global Insights: The Future of ${i % 2 === 0 ? 'Technology' : 'Work'} in 2026 - Article ${i + 1}`;
    articles.push({
      id: `art-${Date.now()}-${i}`,
      slug: title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''),
      title: title,
      category: Object.values(CATEGORIES)[i % Object.values(CATEGORIES).length],
      content: `<p>This is a simulated article content for <strong>${title}</strong>. It contains insights about global trends.</p><h2>Key Takeaways</h2><p>Here are some important points...</p>`,
      date: new Date().toLocaleDateString(),
      author: "Editor Team",
      imageUrl: images[i % images.length],
      likes: Math.floor(Math.random() * 100),
      views: Math.floor(Math.random() * 1000),
      hashtags: "#Future #Global #2026",
      tags: ["#Future", "#Global", "#2026"],
      seoTitle: `${title} | VELARA`,
      seoDescription: `Read about ${title}. In-depth analysis and global perspectives.`
    });
  }
  return articles;
};

const requestJson = async (path, options = {}) => {
  const response = await fetch(`${API_BASE}/${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });
  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || "Request failed");
  }
  return response.json();
};

export const getArticles = async () => {
  try {
    return await requestJson("articles");
  } catch (error) {
    console.error("Failed to fetch articles", error);
    return generateMockArticles();
  }
};

export const createArticle = async (article) => {
  return requestJson("articles", {
    method: "POST",
    body: JSON.stringify({ article }),
  });
};

export const updateArticle = async (article) => {
  return requestJson("articles", {
    method: "PUT",
    body: JSON.stringify({ article }),
  });
};

export const deleteArticle = async (id) => {
  return requestJson(`articles?id=${encodeURIComponent(id)}`, {
    method: "DELETE",
  });
};

export const getJobs = async () => {
  try {
    return await requestJson("jobs");
  } catch (error) {
    console.error("Failed to fetch jobs", error);
    return [];
  }
};

export const createJob = async (job) => {
  return requestJson("jobs", {
    method: "POST",
    body: JSON.stringify({ job }),
  });
};

export const deleteJob = async (id) => {
  return requestJson(`jobs?id=${encodeURIComponent(id)}`, {
    method: "DELETE",
  });
};

export const getArticleBySlug = async (slug) => {
  const articles = await getArticles();
  return articles.find(a => a.slug === slug || a.id === slug);
};
