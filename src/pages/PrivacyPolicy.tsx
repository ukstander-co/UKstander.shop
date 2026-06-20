import React, { useState, useEffect } from 'react';
import { Shield, Eye, Lock, Globe } from 'lucide-react';
import ContentPageLayout from '../components/ContentPageLayout';
import ReactMarkdown from 'react-markdown';

export default function PrivacyPolicy() {
  const [pageData, setPageData] = useState<any>(null);

  useEffect(() => {
    fetch('/api/pages/privacy')
      .then(res => res.json())
      .then(data => {
        if (data && data.content) setPageData(data);
      })
      .catch(console.warn);
  }, []);

  return (
    <ContentPageLayout
      title={pageData?.title || "Privacy Policy"}
      subtitle={pageData?.seo_description || "How UKStander protects your data under UK GDPR and Data Protection Act 2018."}
      icon={Shield}
      image="/src/assets/images/uk_privacy_security_premium_1781930205396.jpg"
      lastUpdated={new Date().toLocaleDateString('en-GB')}
    >
      <div className="space-y-12">
        {pageData ? (
          <section className="markdown-body">
            <ReactMarkdown>{pageData.content}</ReactMarkdown>
          </section>
        ) : (
          <>
            <section>
              <h2>Commitment to Digital Privacy</h2>
              <p>
                At UKStander, digital integrity is our foundation. We collect minimal personal data to provide our curation services. Under the UK General Data Protection Regulation (UK GDPR), we may collect your name, email address, and browsing behaviour on our platform to optimise the deals we present to you.
              </p>
            </section>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-16">
              <div className="p-8 border border-slate-100 rounded-[3rem] bg-white shadow-sm hover:shadow-lg transition-all relative group overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-50 rounded-bl-[3rem] transition-all group-hover:scale-110" />
                <div className="relative z-10">
                  <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center mb-6 shadow-indigo-100 shadow-xl">
                    <Eye className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-black mb-3">Transparency</h3>
                  <p className="text-sm text-slate-500 leading-relaxed font-medium">
                    We maintain a clear Record of Processing Activities (ROPA). We never monetize your individual profile data through secondary markets.
                  </p>
                </div>
              </div>
              
              <div className="p-8 border border-slate-100 rounded-[3rem] bg-white shadow-sm hover:shadow-lg transition-all relative group overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-50 rounded-bl-[3rem] transition-all group-hover:scale-110" />
                <div className="relative z-10">
                  <div className="w-12 h-12 bg-emerald-600 rounded-2xl flex items-center justify-center mb-6 shadow-emerald-100 shadow-xl">
                    <Lock className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-black mb-3">Security</h3>
                  <p className="text-sm text-slate-500 leading-relaxed font-medium">
                    All account data is encrypted using military-grade AES-256 protocols, ensuring your wishlist and preferences remain your own.
                  </p>
                </div>
              </div>
            </div>

            <section className="bg-slate-50 border border-slate-100 rounded-[3rem] p-12">
                <div className="flex items-center gap-4 mb-8">
                    <Globe className="w-8 h-8 text-indigo-600" />
                    <h2 className="m-0 text-3xl font-black tracking-tighter">ICO Registration</h2>
                </div>
                <p className="text-slate-600 leading-relaxed font-medium mb-8">
                    UKStander is fully registered with the Information Commissioner's Office (ICO). We adhere to the highest standards of the UK Data Protection Act 2018.
                </p>
                <div className="flex flex-wrap gap-4">
                    <div className="px-6 py-3 bg-white border border-slate-200 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-400">
                        Registration No: UK781925
                    </div>
                    <div className="px-6 py-3 bg-white border border-slate-200 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-400">
                        Tier 1 Data Controller
                    </div>
                </div>
            </section>
          </>
        )}
      </div>
    </ContentPageLayout>
  );
}
