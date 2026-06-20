import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import MainLayout from '../components/MainLayout';
import { Loader2, Sparkles } from 'lucide-react';
import { apiClient } from '../utils/apiClient';

export default function InfoPage() {
  const { pageId } = useParams();
  const navigate = useNavigate();
  const [dbPage, setDbPage] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!pageId) return;
    if (pageId === 'blog') {
      navigate('/blog', { replace: true });
      return;
    }
    setLoading(true);
    apiClient.request(`/api/pages/${pageId}`, { cacheTTL: 120000, useOfflineFallback: true })
      .then(data => {
        if (data && data.content) {
          setDbPage(data);
        } else {
          setDbPage(null);
        }
        setLoading(false);
      })
      .catch(() => {
        setDbPage(null);
        setLoading(false);
      });
  }, [pageId, navigate]);

  const titleFormat = (str: string) => {
    return str.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };

  const title = dbPage ? dbPage.title : (pageId ? titleFormat(pageId) : 'Information Pages');

  return (
    <MainLayout>
      <div className="min-h-screen font-sans text-slate-900 bg-[#EAEDED] py-12">
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-slate-200">
            
            {loading ? (
              <div className="py-20 flex flex-col items-center justify-center text-slate-400 font-bold gap-2 text-xs uppercase tracking-wider">
                <Loader2 className="w-6 h-6 animate-spin text-indigo-600" /> Synchronization on dynamic nodes...
              </div>
            ) : (
              <>
                <h1 className="text-3xl font-black text-slate-900 mb-6 flex items-center gap-2">
                  {title}
                  {dbPage && <span className="text-[10px] uppercase font-bold bg-green-50 text-green-700 px-2 py-0.5 rounded-full border border-green-100 flex items-center gap-1 shrink-0"><Sparkles className="w-3 h-3 text-green-600" /> Curated</span>}
                </h1>
                
                <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed font-semibold whitespace-pre-line space-y-4">
                  {dbPage ? (
                    <>
                      {dbPage.content}
                      {pageId === 'blog' && (
                        <div className="mt-8 pt-8 border-t border-slate-100 flex flex-col items-center">
                          <p className="text-sm text-slate-500 mb-4">Want to see our AI's latest shopping guides and trending products?</p>
                          <button 
                            onClick={() => navigate('/blog')}
                            className="bg-indigo-600 hover:bg-indigo-700 text-white font-black text-xs uppercase tracking-widest px-8 py-4 rounded-2xl shadow-xl shadow-indigo-100 transition-all flex items-center gap-2 cursor-pointer animate-bounce"
                          >
                            Explore Dynamic UK Blog <Sparkles className="w-4 h-4" />
                          </button>
                        </div>
                      )}
                    </>
                  ) : (
                    <>
                      <p>Welcome to the {title} reference section.</p>
                      <p>This is a dynamically managed informational article within our system catalog.</p>
                      <p>
                        The content for this page has not been customized by the Administrator yet. Once personalized, 
                        real-time curated terms, links, rules, and categories will auto-populate onto this secure view.
                      </p>
                    </>
                  )}
                </div>
              </>
            )}
          </div>
        </main>
      </div>
    </MainLayout>
  );
}
