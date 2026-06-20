import React, { useState, useEffect } from 'react';
import { Award, TrendingUp, Users, DollarSign, ArrowRight, CheckCircle, Mail } from 'lucide-react';
import ContentPageLayout from '../components/ContentPageLayout';
import ReactMarkdown from 'react-markdown';

export default function Affiliates() {
  const [pageData, setPageData] = useState<any>(null);

  useEffect(() => {
    fetch('/api/pages/affiliate')
      .then(res => res.json())
      .then(data => {
        if (data && data.content) setPageData(data);
      })
      .catch(console.warn);
  }, []);

  return (
    <ContentPageLayout
      title={pageData?.title || "Affiliate Partners"}
      subtitle={pageData?.seo_description || "Join the UK's most advanced AI-driven commerce ecosystem and earn competitive rewards."}
      icon={Award}
      image="/src/assets/images/uk_affiliate_hq_1781929933891.jpg"
      lastUpdated={new Date().toLocaleDateString('en-GB')}
    >
      <div className="space-y-20">
        {pageData ? (
          <section className="markdown-body">
            <ReactMarkdown>{pageData.content}</ReactMarkdown>
          </section>
        ) : (
          <>
            {/* Welcome Section */}
            <section>
              <div className="flex items-center gap-3 mb-6 text-indigo-600">
                <TrendingUp className="w-5 h-5" />
                <span className="text-[10px] uppercase font-black tracking-[0.4em]">Scaling Together</span>
              </div>
              <div className="max-w-3xl">
                  <h2 className="text-4xl font-black tracking-tight mb-6 text-slate-900">Why Partner with UKStander?</h2>
                  <p className="text-lg text-slate-600 font-medium leading-relaxed">
                      UKStander isn't just another affiliate directory. We are a technology-first platform that leverages LLaMA-3 analytics to identify high-conversion trends before they hit the mainstream. By joining our partner network, you gain access to our proprietary data and a high-trust user base.
                  </p>
              </div>
            </section>

            {/* Perks Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="p-8 bg-white border border-slate-100 rounded-[3rem] shadow-sm relative group overflow-hidden">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-50 rounded-bl-[3rem] transition-all group-hover:scale-110" />
                    <div className="relative z-10">
                        <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-indigo-100">
                            <DollarSign className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="text-xl font-black mb-3">Premium Rates</h3>
                        <p className="text-sm text-slate-500 font-medium leading-relaxed">
                            Access exclusive bounty rates and increased commission percentages from our Tier 1 UK retail partners.
                        </p>
                    </div>
                </div>

                <div className="p-8 bg-white border border-slate-100 rounded-[3rem] shadow-sm relative group overflow-hidden">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-50 rounded-bl-[3rem] transition-all group-hover:scale-110" />
                    <div className="relative z-10">
                        <div className="w-12 h-12 bg-emerald-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-emerald-100">
                            <TrendingUp className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="text-xl font-black mb-3">Priority Trends</h3>
                        <p className="text-sm text-slate-500 font-medium leading-relaxed">
                            Get 48-hour advanced notice on high-probability seasonal trends predicted by our AI discovery engine.
                        </p>
                    </div>
                </div>

                <div className="p-8 bg-white border border-slate-100 rounded-[3rem] shadow-sm relative group overflow-hidden">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-slate-100 rounded-bl-[3rem] transition-all group-hover:scale-110" />
                    <div className="relative z-10">
                        <div className="w-12 h-12 bg-slate-900 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-slate-200">
                            <Users className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="text-xl font-black mb-3">Partner Support</h3>
                        <p className="text-sm text-slate-500 font-medium leading-relaxed">
                            Dedicated account managers based in London to help you optimize your campaign placement and strategy.
                        </p>
                    </div>
                </div>
            </div>

            {/* Benefits List */}
            <section className="bg-slate-900 text-white rounded-[4rem] p-12 lg:p-20 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[120px] -mr-64 -mt-64" />
                
                <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div>
                       <h2 className="text-3xl md:text-5xl font-black tracking-tighter mb-8 max-w-md">Real-time stats. Real-world impact.</h2>
                       <div className="space-y-6">
                          {[
                            "Automatic API integration for seamless tracking",
                            "Detailed monthly demographic insights",
                            "Early access to Rainforest API data spikes",
                            "Custom co-branded landing pages for top tiers",
                            "UK-wide delivery network verification"
                          ].map((item, i) => (
                            <div key={i} className="flex items-center gap-4">
                               <div className="w-6 h-6 rounded-full bg-indigo-500/20 flex items-center justify-center border border-indigo-500/30">
                                  <CheckCircle className="w-3.5 h-3.5 text-indigo-400" />
                               </div>
                               <span className="text-sm font-bold text-slate-300">{item}</span>
                            </div>
                          ))}
                       </div>
                    </div>
                    <div className="bg-white/5 border border-white/10 rounded-[3rem] p-12 backdrop-blur-sm self-start">
                        <h3 className="text-2xl font-black mb-4">Application Criteria</h3>
                        <p className="text-slate-400 text-sm font-medium mb-8">
                            We maintain a high-quality ecosystem. We look for partners with a strong UK audience and brand alignment.
                        </p>
                        <div className="space-y-4 pt-4 border-t border-white/5">
                            <div className="flex justify-between items-center">
                                <span className="text-[10px] font-black uppercase text-slate-500">Market Focus</span>
                                <span className="text-xs font-black text-indigo-400 uppercase">United Kingdom</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-[10px] font-black uppercase text-slate-500">Min. Audience</span>
                                <span className="text-xs font-black text-indigo-400 uppercase">Varies by niche</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-[10px] font-black uppercase text-slate-500">Vetting Process</span>
                                <span className="text-xs font-black text-indigo-400 uppercase">2-3 Business Days</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="text-center py-12">
                <h2 className="text-4xl font-black tracking-tighter mb-6">Ready to scale your reach?</h2>
                <p className="text-lg text-slate-500 font-medium mb-12 max-w-2xl mx-auto">
                    Join the UKStander network today and start leveraging AI-driven insights to power your commercial growth.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                    <a href="mailto:partners@ukstander.shop" className="bg-indigo-600 text-white h-16 px-12 rounded-2xl flex items-center justify-center font-black text-sm uppercase tracking-widest hover:bg-slate-900 transition-all shadow-xl shadow-indigo-100">
                        Apply Now <ArrowRight className="w-4 h-4 ml-2" />
                    </a>
                    <a href="/disclosure" className="text-slate-400 hover:text-slate-900 font-black text-xs uppercase tracking-widest transition-colors">
                        View Disclosure Policies
                    </a>
                </div>
            </section>
          </>
        )}
      </div>
    </ContentPageLayout>
  );
}
