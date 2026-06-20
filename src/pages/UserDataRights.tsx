import React, { useState, useEffect } from 'react';
import { Fingerprint, Database, UserCheck, Trash2, Mail, Download } from 'lucide-react';
import ContentPageLayout from '../components/ContentPageLayout';
import ReactMarkdown from 'react-markdown';

export default function UserDataRights() {
  const [pageData, setPageData] = useState<any>(null);

  useEffect(() => {
    fetch('/api/pages/data-rights')
      .then(res => res.json())
      .then(data => {
        if (data && data.content) setPageData(data);
      })
      .catch(console.warn);
  }, []);

  return (
    <ContentPageLayout
      title={pageData?.title || "User Data Rights"}
      subtitle={pageData?.seo_description || "Your legal entitlements under UK GDPR and our commitment to data sovereignty."}
      icon={Fingerprint}
      image="/src/assets/images/uk_data_rights_premium_1781930264587.jpg"
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
              <h2>Your Rights in the UK</h2>
              <p>
                The <strong>UK Data Protection Act 2018</strong> and <strong>UK GDPR</strong> provide you with significant control over your personal information. UKStander is committed to ensuring these rights are respected and easily accessible for all our members.
              </p>
            </section>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-16">
              <div className="p-8 border border-slate-100 rounded-[3rem] bg-white shadow-sm hover:shadow-xl transition-all group relative overflow-hidden">
                 <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-50 rounded-bl-[3rem] transition-all group-hover:scale-110" />
                <div className="relative z-10">
                    <div className="w-14 h-14 bg-indigo-600 rounded-2xl flex items-center justify-center mb-6 shadow-xl shadow-indigo-100">
                    <Database className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="text-xl font-black mb-3">Right to Portability</h3>
                    <p className="text-sm text-slate-500 leading-relaxed font-medium mb-6">
                    You can request a copy of your personal data in a machine-readable format, including your wishlist and profile information.
                    </p>
                    <button className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-indigo-600 border border-indigo-100 px-4 py-2 rounded-xl hover:bg-indigo-50 transition-colors">
                        <Download className="w-3.5 h-3.5" /> Request Archive
                    </button>
                </div>
              </div>
              
              <div className="p-8 border border-slate-100 rounded-[3rem] bg-white shadow-sm hover:shadow-xl transition-all group relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-50 rounded-bl-[3rem] transition-all group-hover:scale-110" />
                <div className="relative z-10">
                    <div className="w-14 h-14 bg-emerald-600 rounded-2xl flex items-center justify-center mb-6 shadow-xl shadow-emerald-100">
                    <UserCheck className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="text-xl font-black mb-3">Right to Rectification</h3>
                    <p className="text-sm text-slate-500 leading-relaxed font-medium">
                    If you believe any data we hold about you is inaccurate or incomplete, you have the right to request an immediate correction.
                    </p>
                </div>
              </div>
            </div>

            <section className="bg-rose-50 border border-rose-100 rounded-[3.5rem] p-12">
                <div className="flex flex-col md:flex-row items-center gap-12">
                    <div className="flex-1">
                        <div className="flex items-center gap-3 mb-6 text-rose-600">
                            <Trash2 className="w-6 h-6" />
                            <span className="text-[10px] uppercase font-black tracking-[0.4em]">Permanent Action</span>
                        </div>
                        <h2 className="text-slate-900 text-3xl font-black tracking-tight mb-4 m-0">The Right to Erasure</h2>
                        <p className="text-slate-600 text-lg leading-relaxed font-medium mb-8">
                            Often referred to as the 'Right to be Forgotten', you can request that UKStander deletes all personal data we hold about you. 
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <a href="mailto:privacy@ukstander.shop?subject=GDPR Erasure Request" className="bg-rose-600 text-white px-8 h-14 rounded-2xl flex items-center gap-3 font-black text-xs uppercase tracking-widest hover:bg-rose-700 transition-all">
                                <Mail className="w-4 h-4" /> Email DPO Inbox
                            </a>
                            <div className="px-6 h-14 rounded-2xl bg-white border border-rose-200 flex items-center text-[10px] font-black uppercase tracking-widest text-rose-400">
                                Verified UK Protocol
                            </div>
                        </div>
                    </div>
                    <div className="w-full md:w-64 h-64 bg-white/50 rounded-full border border-rose-100 flex items-center justify-center relative">
                        <div className="absolute inset-4 border-2 border-dashed border-rose-200 rounded-full animate-[spin_10s_linear_infinite]" />
                        <Fingerprint className="w-24 h-24 text-rose-100" />
                    </div>
                </div>
            </section>
          </>
        )}
      </div>
    </ContentPageLayout>
  );
}
