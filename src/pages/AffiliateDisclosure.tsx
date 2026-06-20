import React, { useState, useEffect } from 'react';
import { AlertCircle, Tag, ShoppingBag, Mail, ExternalLink } from 'lucide-react';
import ContentPageLayout from '../components/ContentPageLayout';

export default function AffiliateDisclosure() {
  const [dbPage, setDbPage] = useState<any>(null);

  useEffect(() => {
    fetch('/api/pages/disclosure')
      .then(res => res.json())
      .then(data => {
        if (data && data.content) {
          setDbPage(data);
        }
      })
      .catch(console.warn);
  }, []);

  return (
    <ContentPageLayout
      title={dbPage ? dbPage.title : "Affiliate Disclosure"}
      subtitle="How we operate as an independent curation platform within the UK retail ecosystem."
      icon={AlertCircle}
      image="/src/assets/images/affiliate_growth_uk_1781925970093.jpg"
      lastUpdated={new Date().toLocaleDateString('en-GB')}
    >
      <section>
        <div className="flex items-center gap-3 mb-4 text-indigo-600">
          <Tag className="w-5 h-5" />
          <span className="text-[10px] uppercase font-black tracking-widest">Transparency & Trust</span>
        </div>
        <h2>Commercial Relationships</h2>
        <p>
          UKStander operates as a curated affiliate platform. This means that when you click on links to various merchants on our site (primarily Amazon.co.uk) and make a purchase, this may result in UKStander earning a small commission.
        </p>
        {dbPage && <div className="whitespace-pre-line mt-4">{dbPage.content}</div>}
      </section>

      {!dbPage && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-16">
            <div className="bg-white border border-slate-100 p-8 rounded-[2.5rem] shadow-sm">
              <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center mb-6">
                <ShoppingBag className="w-6 h-6 text-indigo-600" />
              </div>
              <h3 className="text-xl font-black mb-3">No Extra Cost</h3>
              <p className="text-sm text-slate-500 leading-relaxed font-bold">
                The price you pay for any item found through UKStander is exactly the same as if you had gone directly to the retailer. Commissions are paid by the retailer to us for the referral and do not affect your purchase price.
              </p>
            </div>
            
            <div className="bg-white border border-slate-100 p-8 rounded-[2.5rem] shadow-sm">
              <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center mb-6">
                <ExternalLink className="w-6 h-6 text-emerald-600" />
              </div>
              <h3 className="text-xl font-black mb-3">Independent Choice</h3>
              <p className="text-sm text-slate-500 leading-relaxed font-bold">
                Our AI-driven curation engine ranks products based on qualitative and quantitative data—not on commission rates. We frequently feature products with lower commission structures if they offer better value to you.
              </p>
            </div>
          </div>

          <section>
            <h2>Compliance with UK Guidelines</h2>
            <p>
              In accordance with the UK's <strong>Advertising Standards Authority (ASA)</strong> and the <strong>Competition and Markets Authority (CMA)</strong>, we ensure full transparency about our commercial relationships. We believe that being open about how we fund our platform strengthens the trust between us and our UK audience.
            </p>
            <p>
              UKStander was built to help British shoppers navigate the complexities of modern retail. Every product featured has been vetted by our curation engine for quality and price reliability.
            </p>
          </section>

          <section className="bg-slate-900 text-white p-10 rounded-[2.5rem] mt-16 shadow-2xl">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="flex-1">
                <h3 className="text-white font-black mb-2 uppercase tracking-wide text-xs">Retail Partnerships</h3>
                <h4 className="text-2xl font-black mb-4">Partner with UIStander</h4>
                <p className="text-slate-400 text-sm leading-relaxed font-medium mb-6">
                  Are you a high-growth UK retailer or brand looking to reach a highly engaged, shopping-focused audience? Our AI curation engine is always looking for new data sources.
                </p>
                <a href="mailto:partners@ukstander.shop" className="inline-flex items-center gap-2 bg-white text-slate-950 px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-100 transition-all">
                  <Mail className="w-4 h-4" /> Contact Partnerships
                </a>
              </div>
              <div className="hidden md:block w-32 h-32 bg-white/5 rounded-full border border-white/10 flex items-center justify-center">
                <AlertCircle className="w-16 h-16 text-white/20" />
              </div>
            </div>
          </section>
        </>
      )}
    </ContentPageLayout>
  );
}
