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
      tags: ["#Future", "#Global", "#2026"],
      seoTitle: `${title} | VELARA`,
      seoDescription: `Read about ${title}. In-depth analysis and global perspectives.`
    });
  }
  return articles;
};

export const getArticles = async () => {
  // Simulate API fetch
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const stored = localStorage.getItem('velara_articles');
  if (stored) return JSON.parse(stored);
  
  const mock = generateMockArticles();
  localStorage.setItem('velara_articles', JSON.stringify(mock));
  return mock;
};

export const saveArticles = async (articles) => {
  await new Promise(resolve => setTimeout(resolve, 300));
  localStorage.setItem('velara_articles', JSON.stringify(articles));
  return true;
};

export const getArticleBySlug = async (slug) => {
  const articles = await getArticles();
  return articles.find(a => a.slug === slug || a.id === slug);
};
