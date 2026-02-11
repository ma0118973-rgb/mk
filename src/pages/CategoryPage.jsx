import React, { useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { ArticleCard } from '../components/ArticleCard';

export const CategoryPage = () => {
  const { categoryName } = useParams();
  const { articles } = useAppContext();

  const filteredArticles = useMemo(() => {
    if (!categoryName) return [];
    return articles.filter(a => a.category.toLowerCase() === categoryName.toLowerCase());
  }, [articles, categoryName]);

  const categoryTitle = categoryName ? categoryName.charAt(0).toUpperCase() + categoryName.slice(1) : 'Category';

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="border-b-2 border-black pb-4 mb-12 flex justify-between items-end">
          <h1 className="text-4xl md:text-6xl font-serif font-black text-gray-900 capitalize">
            {categoryName === 'visa & immigration' ? 'Visa Guide' : categoryName}
          </h1>
          <span className="text-sm font-bold uppercase tracking-widest text-gray-500">{filteredArticles.length} Stories</span>
        </div>

        {filteredArticles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-16">
            {filteredArticles.map(article => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-xl text-gray-500 font-serif">No stories found in this category yet.</p>
            <Link to="/" className="inline-block mt-6 text-indigo-600 font-bold hover:underline">Return Home</Link>
          </div>
        )}
      </div>
    </div>
  );
};
