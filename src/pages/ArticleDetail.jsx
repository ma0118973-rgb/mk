import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useAppContext } from '../context/AppContext';
import { ArticleCard } from '../components/ArticleCard';

export const ArticleDetail = () => {
  const { slug, id } = useParams(); // Support both slug and legacy ID
  const { articles } = useAppContext();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [rating, setRating] = useState(0);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    if (articles.length > 0) {
      // Find by slug or ID
      const found = articles.find(a => 
        (slug && (a.slug === slug || a.id === slug)) || 
        (id && a.id === id)
      );
      setArticle(found);
      setLoading(false);
    }
  }, [slug, id, articles]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white">
        <div className="w-12 h-12 border-4 border-black border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-4xl font-bold mb-4">Article Not Found</h1>
        <p className="mb-8">The article you are looking for does not exist or has been moved.</p>
        <Link to="/" className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-indigo-700">Go Home</Link>
      </div>
    );
  }

  const nextArticle = articles.find(a => a.id !== article.id);

  return (
    <>
      <Helmet>
        <title>{article.seoTitle || `${article.title} | VELARA`}</title>
        <meta name="description" content={article.seoDescription || article.content.substring(0, 150)} />
        {article.seoKeywords && <meta name="keywords" content={article.seoKeywords} />}
        <meta property="og:title" content={article.title} />
        <meta property="og:description" content={article.seoDescription || article.content.substring(0, 150)} />
        <meta property="og:image" content={article.imageUrl} />
        <meta property="og:type" content="article" />
        <link rel="canonical" href={`https://velara-global.netlify.app/blog/${article.slug || article.id}`} />
      </Helmet>

      <article className="min-h-screen bg-white pb-20">
        <div className="relative h-[50vh] md:h-[70vh] w-full overflow-hidden">
          <img src={article.imageUrl} alt={article.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent flex flex-col justify-end p-6 md:p-16 lg:p-24">
            <div className="container mx-auto max-w-4xl animate-slide-up">
              <Link to={`/category/${article.category.toLowerCase()}`} className="inline-block bg-pink-600 text-white text-xs font-black uppercase tracking-widest px-4 py-2 mb-6 hover:bg-pink-700 transition-colors rounded-sm shadow-lg">
                {article.category}
              </Link>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-black text-white mb-6 leading-tight drop-shadow-lg">
                {article.title}
              </h1>
              <div className="flex flex-wrap items-center gap-6 text-sm font-bold text-gray-300 uppercase tracking-widest">
                <span className="flex items-center gap-2"><i className="fas fa-user-circle text-lg"></i> {article.author}</span>
                <span className="w-1 h-1 bg-gray-500 rounded-full"></span>
                <span>{article.date}</span>
                <span className="w-1 h-1 bg-gray-500 rounded-full"></span>
                <span><i className="far fa-clock mr-1"></i> 5 min read</span>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 md:px-0 max-w-3xl -mt-10 relative z-10">
          <div className="bg-white p-8 md:p-16 rounded-t-3xl shadow-xl article-content-wrapper">
            <div className="prose prose-lg md:prose-xl max-w-none font-serif text-slate-800 leading-relaxed" 
                 dangerouslySetInnerHTML={{ __html: article.content }} />
            
            <div className="bg-slate-50 p-8 md:p-12 rounded-3xl shadow-sm text-center mb-16 mt-16">
              <h3 className="font-black text-slate-900 mb-8 text-3xl">Was this article helpful?</h3>
              <div className="flex justify-center gap-6 mb-10">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button key={star} onClick={() => setRating(star)} className={`text-5xl transition-colors transform hover:scale-110 ${star <= rating ? 'text-yellow-400' : 'text-gray-300 hover:text-yellow-400'}`}>
                    <i className="fas fa-star"></i>
                  </button>
                ))}
              </div>
              <div className="flex justify-center gap-4">
                <button onClick={() => setIsLiked(!isLiked)} className={`flex items-center space-x-4 px-12 py-5 rounded-full transition-all duration-300 shadow-xl transform hover:-translate-y-1 ${isLiked ? 'bg-pink-600 text-white' : 'bg-white border-4 border-slate-200 text-slate-700'}`}>
                  <i className={`${isLiked ? 'fas' : 'far'} fa-heart text-3xl`}></i>
                  <span className="font-bold text-2xl">{article.likes + (isLiked ? 1 : 0)} Likes</span>
                </button>
                <button className="flex items-center space-x-4 px-12 py-5 rounded-full bg-blue-600 text-white transition-all duration-300 shadow-xl transform hover:-translate-y-1 hover:bg-blue-700">
                  <i className="fas fa-share-alt text-3xl"></i>
                  <span className="font-bold text-2xl">Share</span>
                </button>
              </div>
              {article.hashtags && <div className="mt-8 text-indigo-500 font-bold text-2xl tracking-wide">{article.hashtags}</div>}
            </div>

            {nextArticle && (
              <div className="mb-24 animate-fade-in-up">
                <div className="flex items-center gap-4 mb-6">
                  <div className="h-px bg-gray-300 flex-grow"></div>
                  <span className="text-sm font-black uppercase tracking-widest text-gray-400">Continuing Story</span>
                  <div className="h-px bg-gray-300 flex-grow"></div>
                </div>
                <ArticleCard article={nextArticle} />
              </div>
            )}
          </div>
        </div>
      </article>
      
      <style>{`
        .article-content-wrapper p, 
        .article-content-wrapper li {
          font-size: 18px !important;
          line-height: 1.8 !important;
          margin-bottom: 1.5rem !important;
          color: #334155 !important;
        }
        @media (min-width: 768px) {
          .article-content-wrapper p,
          .article-content-wrapper li {
            font-size: 20px !important;
            line-height: 1.9 !important;
          }
        }
        .article-content-wrapper h2 {
          font-size: 28px !important;
          line-height: 1.3 !important;
          font-weight: 800 !important;
          margin-top: 2.5rem !important;
          margin-bottom: 1rem !important;
          color: #0f172a !important;
        }
        .article-content-wrapper blockquote {
          font-size: 22px !important;
          font-style: italic !important;
          border-left: 6px solid #db2777 !important;
          padding-left: 20px !important;
          background: #f8fafc;
          padding: 20px;
          margin: 30px 0;
        }
      `}</style>
    </>
  );
};
