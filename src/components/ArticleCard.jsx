import React from 'react';
import { Link } from 'react-router-dom';

export const ArticleCard = ({ article }) => {
  return (
    <Link to={`/blog/${article.slug || article.id}`} className="block group relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white hover:border-pink-500 transition-all duration-300">
        <div className="aspect-[4/3] overflow-hidden">
            <img src={article.imageUrl} alt={article.title} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" loading="lazy" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent p-6 flex flex-col justify-end">
            <span className="text-xs font-bold uppercase tracking-widest text-pink-400 mb-2">{article.category}</span>
            <h3 className="text-xl font-serif font-bold text-white leading-tight mb-2 group-hover:underline decoration-pink-500 decoration-2 underline-offset-4">{article.title}</h3>
            <div className="flex items-center text-gray-400 text-xs font-bold mt-2 space-x-4">
                <span><i className="far fa-clock mr-1"></i> {article.date}</span>
                <span><i className="far fa-eye mr-1"></i> {article.views || 0}</span>
            </div>
        </div>
    </Link>
  );
};
