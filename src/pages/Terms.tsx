import React, { useState, useEffect } from 'react';
import { FileText, Gavel, Scale, AlertTriangle } from 'lucide-react';
import ContentPageLayout from '../components/ContentPageLayout';
import ReactMarkdown from 'react-markdown';

export default function Terms() {
  const [pageData, setPageData] = useState<any>(null);

  useEffect(() => {
    fetch('/api/pages/terms')
      .then(res => res.json())
      .then(data => {
        if (data && data.content) setPageData(data);
      })
      .catch(console.warn);
  }, []);

  return (
    <ContentPageLayout
      title={pageData?.title || "Terms of Service"}
      subtitle={pageData?.seo_description || "The legal framework for using the UKStander platform in the United Kingdom."}
      icon={FileText}
      image="/src/assets/images/uk_legal_terms_premium_1781930229112.jpg"
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
              <h2>Agreement to Terms</h2>
              <p>
                Welcome to UKStander. By accessing this website, you agree to comply with and be bound by these terms of service under UK commercial laws. These terms apply to all visitors, users, and others who access or use our service.
              </p>
            </section>

            {/* Legal Highlights */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-16">
              <div className="p-10 border border-slate-100 rounded-[3rem] bg-white shadow-sm relative group overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-rose-50 rounded-bl-[3rem] transition-all group-hover:scale-110" />
                <div className="relative z-10">
                  <div className="w-14 h-14 bg-white border border-rose-100 rounded-2xl flex items-center justify-center mb-8 shadow-sm">
                    <AlertTriangle className="w-7 h-7 text-rose-600" />
                  </div>
                  <h3 className="text-2xl font-black mb-4 tracking-tight">Disclaimer</h3>
                  <p className="text-sm text-slate-500 leading-relaxed font-medium">
                    We are a curation hub. We are NOT the retailer. Any issues with product quality, shipping, or payments must be resolved with the final merchant (e.g., Amazon UK).
                  </p>
                </div>
              </div>

              <div className="p-10 border border-slate-100 rounded-[3rem] bg-slate-900 text-white relative group overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-bl-[3rem] transition-all group-hover:scale-110" />
                <div className="relative z-10">
                  <div className="w-14 h-14 bg-white/10 border border-white/20 rounded-2xl flex items-center justify-center mb-8">
                    <Scale className="w-7 h-7 text-[#febd69]" />
                  </div>
                  <h3 className="text-2xl font-black mb-4 tracking-tight">Governing Law</h3>
                  <p className="text-sm text-slate-400 leading-relaxed font-medium">
                    These terms are governed and construed in accordance with the laws of England and Wales. Any disputes will fall under the exclusive jurisdiction of the Courts of the UK.
                  </p>
                </div>
              </div>
            </div>

            <section className="bg-slate-50 border border-slate-100 rounded-[3rem] p-12">
                <div className="flex items-center gap-4 mb-8">
                    <Gavel className="w-8 h-8 text-slate-900" />
                    <h2 className="m-0 text-3xl font-black tracking-tighter">Intellectual Property</h2>
                </div>
                <p className="text-slate-600 leading-relaxed font-medium mb-8">
                    All algorithms, site design, text, graphics, and their selection/arrangement are the copyright of UKStander. Unauthorized scraping or automated monitoring of our endpoints is strictly prohibited.
                </p>
                <div className="flex items-center gap-4 p-6 bg-white border border-slate-200 rounded-2xl shadow-sm">
                    <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center">
                        <FileText className="w-5 h-5 text-indigo-600" />
                    </div>
                    <div>
                       <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest leading-none mb-1">Legal Document Ver.</p>
                       <p className="text-xs font-black text-slate-900 leading-none">UKS-TOS-2026-A</p>
                    </div>
                </div>
            </section>
          </>
        )}
      </div>
    </ContentPageLayout>
  );
}
