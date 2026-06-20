import React, { useState, useEffect } from 'react';
import { Cookie, MousePointer, Activity, Info } from 'lucide-react';
import ContentPageLayout from '../components/ContentPageLayout';
import ReactMarkdown from 'react-markdown';

export default function CookiesPolicy() {
  const [pageData, setPageData] = useState<any>(null);

  useEffect(() => {
    fetch('/api/pages/cookies')
      .then(res => res.json())
      .then(data => {
        if (data && data.content) setPageData(data);
      })
      .catch(console.warn);
  }, []);

  return (
    <ContentPageLayout
      title={pageData?.title || "Cookies Policy"}
      subtitle={pageData?.seo_description || "How we use cookies to provide a personalised UK shopping experience."}
      icon={Cookie}
      image="/src/assets/images/uk_cookies_policy_premium_1781930247673.jpg"
      lastUpdated={new Date().toLocaleDateString('en-GB')}
    >
      <div className="space-y-16">
        {pageData ? (
          <section className="markdown-body">
            <ReactMarkdown>{pageData.content}</ReactMarkdown>
          </section>
        ) : (
          <>
            <section>
              <h2>How We Use Tracking</h2>
              <p>
                We use cookies to enhance your browsing experience, serve personalised recommendations, and keep you logged into your secure account. A cookie is a small file of letters and numbers that we store on your browser or the hard drive of your computer.
              </p>
            </section>

            {/* Cookie Categories */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-16">
              <div className="p-8 border border-slate-100 rounded-[3rem] bg-white shadow-sm hover:shadow-xl transition-all">
                <div className="w-14 h-14 bg-indigo-50 rounded-2xl flex items-center justify-center mb-6">
                  <Activity className="w-7 h-7 text-indigo-600" />
                </div>
                <h3 className="text-xl font-black mb-3 tracking-tight">Strictly Necessary</h3>
                <p className="text-xs text-slate-500 leading-relaxed font-bold">
                  Required for the operation of our website. These include cookies that enable you to log into secure areas.
                </p>
                <div className="mt-6 px-3 py-1 bg-indigo-50 border border-indigo-100 rounded-full inline-block text-[9px] font-black uppercase text-indigo-600 tracking-widest">Always Active</div>
              </div>

              <div className="p-8 border border-slate-100 rounded-[3rem] bg-white shadow-sm hover:shadow-xl transition-all">
                <div className="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center mb-6">
                  <MousePointer className="w-7 h-7 text-emerald-600" />
                </div>
                <h3 className="text-xl font-black mb-3 tracking-tight">Analytical</h3>
                <p className="text-xs text-slate-500 leading-relaxed font-bold">
                  They allow us to recognise and count the number of visitors and to see how visitors move around our website.
                </p>
              </div>

              <div className="p-8 border border-slate-100 rounded-[3rem] bg-white shadow-sm hover:shadow-xl transition-all">
                <div className="w-14 h-14 bg-[#febd69]/10 rounded-2xl flex items-center justify-center mb-6">
                  <Cookie className="w-7 h-7 text-[#febd69]" />
                </div>
                <h3 className="text-xl font-black mb-3 tracking-tight">Affiliate Hub</h3>
                <p className="text-xs text-slate-500 leading-relaxed font-bold">
                  These cookies are set by our retail partners to track sales from our platform for commission attribution.
                </p>
              </div>
            </div>

            <section className="bg-slate-900 text-white rounded-[3.5rem] p-12 lg:p-16 flex flex-col md:flex-row items-center gap-12">
                <div className="flex-1">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center border border-white/20">
                            <Info className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Manage Preference</span>
                    </div>
                    <h2 className="text-white text-3xl font-black tracking-tighter mb-4">You have control</h2>
                    <p className="text-slate-400 text-lg leading-relaxed font-medium">
                        You can block cookies by activating the setting on your browser that allows you to refuse the setting of all or some cookies. However, if you use your browser settings to block all cookies you may not be able to access all or parts of our site.
                    </p>
                </div>
                <button className="whitespace-nowrap bg-white text-slate-900 px-10 h-16 rounded-[2rem] font-black text-xs uppercase tracking-widest hover:bg-slate-200 transition-all">
                    Accept All Cookies
                </button>
            </section>
          </>
        )}
      </div>
    </ContentPageLayout>
  );
}
