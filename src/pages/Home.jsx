import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { ArticleCard } from '../components/ArticleCard';

export const Home = () => {
  const { articles } = useAppContext();
  const [visibleCount, setVisibleCount] = useState(9);

  if (!articles || articles.length === 0) return null;

  const coverStory = articles[0];
  const topStories = articles.slice(1, 4);
  const collection = articles.slice(4, visibleCount);

  return (
    <div className="w-full bg-white">
      <section className="container mx-auto px-4 lg:px-8 py-10 lg:py-14 border-b border-gray-900">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Cover Story */}
          <div className="lg:col-span-8 flex flex-col border-r border-gray-100 lg:pr-10">
            <Link to={`/blog/${coverStory?.slug || coverStory?.id}`} className="group block mb-6">
              <div className="relative aspect-[16/9] w-full overflow-hidden bg-gray-100 mb-6">
                <img src={coverStory?.imageUrl} alt={coverStory?.title} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
                <div className="absolute top-0 left-0 bg-black text-white px-4 py-2 font-bold text-xs uppercase tracking-widest">Cover Story</div>
              </div>
              <div className="flex items-center space-x-3 mb-4 text-xs font-bold uppercase tracking-widest text-gray-500">
                <span className="text-black">{coverStory?.category}</span>
                <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                <span>{coverStory?.date}</span>
              </div>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold text-gray-900 leading-tight group-hover:text-gray-700 transition-colors mb-4">{coverStory?.title}</h1>
              <div className="text-gray-600 font-serif text-xl leading-relaxed line-clamp-3" dangerouslySetInnerHTML={{ __html: coverStory?.content }} />
            </Link>
          </div>

          {/* Top Stories Sidebar */}
          <div className="lg:col-span-4 flex flex-col space-y-10">
            <div className="border-b border-black pb-2 mb-2">
              <span className="text-[10px] font-bold uppercase tracking-widest text-black">Top Stories</span>
            </div>
            {topStories.map(story => (
              <Link key={story.id} to={`/blog/${story.slug || story.id}`} className="group flex flex-col gap-3 pb-8 border-b border-gray-100 last:border-0 last:pb-0">
                <span className="text-[10px] font-bold uppercase text-red-700 block">{story.category}</span>
                <h3 className="text-xl lg:text-2xl font-serif font-bold leading-tight group-hover:text-gray-600 transition-colors">{story.title}</h3>
                <div className="w-full aspect-video bg-gray-100 overflow-hidden mt-1">
                  <img src={story.imageUrl} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Trending Bar */}
      <div className="border-b border-gray-200 py-4 bg-white">
        <div className="container mx-auto px-4 flex items-center space-x-6">
          <span className="flex-shrink-0 text-[10px] font-bold uppercase tracking-widest text-black border border-black px-2 py-1">Trending</span>
          <div className="flex overflow-x-auto no-scrollbar space-x-8 whitespace-nowrap mask-right">
            {articles.slice(0, 6).map(t => (
              <Link key={t.id} to={`/blog/${t.slug || t.id}`} className="text-xs font-serif font-medium text-gray-500 hover:text-black transition-colors">{t.title}</Link>
            ))}
          </div>
        </div>
      </div>

      {/* The Collection */}
      <section className="container mx-auto px-4 lg:px-8 py-20">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 border-b border-black pb-6">
          <h2 className="text-4xl lg:text-5xl font-serif font-bold text-gray-900">The Collection</h2>
          <div className="mt-4 md:mt-0">
            <Link to="/category/news" className="text-[10px] font-bold uppercase tracking-widest text-gray-500 hover:text-black transition-colors">View Full Archive <i className="fas fa-arrow-right ml-1"></i></Link>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-16">
          {collection.map(t => <ArticleCard key={t.id} article={t} />)}
        </div>
        {visibleCount < articles.length && (
          <div className="mt-20 text-center">
            <button onClick={() => setVisibleCount(c => c + 6)} className="bg-white text-black border border-black px-12 py-4 text-xs font-bold uppercase tracking-widest hover:bg-black hover:text-white transition-all duration-300">Load More Stories</button>
          </div>
        )}
      </section>

      <section className="bg-slate-900 text-white py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center"></div>
        <div className="container mx-auto px-4 lg:px-8 text-center max-w-4xl relative z-10">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400 mb-4 block">Velara Careers</span>
          <h2 className="text-4xl md:text-6xl font-serif font-bold mb-8 leading-tight">Define the Future.</h2>
          <p className="text-gray-300 text-xl mb-12 font-serif leading-relaxed max-w-2xl mx-auto">Explore a curated selection of executive opportunities at the world's most visionary organizations.</p>
          <Link to="/jobs" className="inline-block bg-white text-slate-900 px-10 py-5 text-xs font-bold uppercase tracking-widest hover:bg-gray-200 transition-colors">View Opportunities</Link>
        </div>
      </section>
    </div>
  );
};
