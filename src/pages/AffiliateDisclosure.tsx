import React, { useState, useEffect } from 'react';
import { AlertCircle, Tag, ShoppingBag, Mail, ExternalLink, Info } from 'lucide-react';
import ContentPageLayout from '../components/ContentPageLayout';
import ReactMarkdown from 'react-markdown';

export default function AffiliateDisclosure() {
  const [pageData, setPageData] = useState<any>(null);

  useEffect(() => {
    fetch('/api/pages/disclosure')
      .then(res => res.json())
      .then(data => {
        if (data && data.content) setPageData(data);
      })
      .catch(console.warn);
  }, []);

  return (
    <ContentPageLayout
      title={pageData?.title || "Affiliate Disclosure"}
      subtitle={pageData?.seo_description || "How we operate as an independent curation platform within the UK retail ecosystem."}
      icon={AlertCircle}
      image="/src/assets/images/uk_affiliate_hq_1781929933891.jpg"
      lastUpdated={new Date().toLocaleDateString('en-GB')}
    >
      <div className="space-y-16">
        {pageData ? (
          <section className="markdown-body animate-in fade-in duration-300">
            <ReactMarkdown>{pageData.content}</ReactMarkdown>
          </section>
        ) : (
          <>
            <section>
              <div className="flex items-center gap-3 mb-6 text-indigo-600">
                <Tag className="w-5 h-5" />
                <span className="text-[10px] uppercase font-black tracking-[0.4em]">Transparency Mandate</span>
              </div>
              <h2>Commercial Relationships</h2>
              <p>
                  UKStander operates as a curated affiliate platform. This means that when you click on links to various merchants on our site (primarily Amazon.co.uk) and make a purchase, this may result in UKStander earning a small commission.
              </p>
            </section>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-16">
                <div className="bg-white border border-slate-100 p-10 rounded-[3.5rem] shadow-sm relative group overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50 rounded-bl-[3.5rem] transition-all group-hover:scale-110" />
                  <div className="relative z-10">
                    <div className="w-14 h-14 bg-indigo-600 rounded-2xl flex items-center justify-center mb-8 shadow-xl shadow-indigo-100">
                        <ShoppingBag className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="text-2xl font-black mb-4 tracking-tight">No Extra Cost</h3>
                    <p className="text-sm text-slate-500 leading-relaxed font-bold">
                        The price you pay for any item found through UKStander is exactly the same as if you had gone directly to the retailer. 
                    </p>
                  </div>
                </div>
                
                <div className="bg-white border border-slate-100 p-10 rounded-[3.5rem] shadow-sm relative group overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50 rounded-bl-[3.5rem] transition-all group-hover:scale-110" />
                  <div className="relative z-10">
                    <div className="w-14 h-14 bg-emerald-600 rounded-2xl flex items-center justify-center mb-8 shadow-xl shadow-emerald-100">
                        <ExternalLink className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="text-2xl font-black mb-4 tracking-tight">Independent Choice</h3>
                    <p className="text-sm text-slate-500 leading-relaxed font-bold">
                        Our AI-driven curation engine ranks products based on value standards—not on commission rates. 
                    </p>
                  </div>
                </div>
            </div>

            <section className="bg-slate-50 border border-slate-100 rounded-[3.5rem] p-12">
                <div className="flex items-center gap-4 mb-8 text-slate-900">
                    <Info className="w-8 h-8" />
                    <h2 className="m-0 text-3xl font-black tracking-tighter text-slate-900">Compliance with UK Guidelines</h2>
                </div>
                <p className="text-slate-600 leading-relaxed font-medium mb-12">
                    In accordance with the UK's <strong>Advertising Standards Authority (ASA)</strong> and the <strong>Competition and Markets Authority (CMA)</strong>, we ensure full transparency about our commercial relationships.
                </p>
                
                <div className="bg-slate-900 text-white p-10 rounded-[3rem] shadow-2xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl -mr-32 -mt-32 transition-all group-hover:bg-indigo-500/20" />
                    <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">
                        <div className="flex-1">
                            <h4 className="text-2xl font-black mb-4 tracking-tight">Partner with UKStander</h4>
                            <p className="text-slate-400 text-sm leading-relaxed font-medium mb-8">
                                Are you a high-growth UK retailer or brand looking to reach a highly engaged audience?
                            </p>
                            <a href="mailto:partners@ukstander.shop" className="inline-flex items-center gap-3 bg-white text-slate-950 px-10 h-14 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-100 transition-all">
                                <Mail className="w-4 h-4" /> Contact Partnerships
                            </a>
                        </div>
                        <div className="hidden lg:flex w-32 h-32 bg-white/5 rounded-full border border-white/10 items-center justify-center">
                            <AlertCircle className="w-16 h-16 text-white/10" />
                        </div>
                    </div>
                </div>
            </section>
          </>
        )}
      </div>
    </ContentPageLayout>
  );
}
