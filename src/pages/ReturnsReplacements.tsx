import React, { useState, useEffect } from 'react';
import { RefreshCcw, Package, Truck, ShieldCheck, HelpCircle } from 'lucide-react';
import ContentPageLayout from '../components/ContentPageLayout';
import ReactMarkdown from 'react-markdown';

export default function ReturnsReplacements() {
  const [pageData, setPageData] = useState<any>(null);

  useEffect(() => {
    fetch('/api/pages/returns')
      .then(res => res.json())
      .then(data => {
        if (data && data.content) setPageData(data);
      })
      .catch(console.warn);
  }, []);

  return (
    <ContentPageLayout
      title={pageData?.title || "Returns & Replacements"}
      subtitle={pageData?.seo_description || "Clear guidelines on how to handle returns and replacements for curated items."}
      icon={RefreshCcw}
      image="/src/assets/images/uk_logistics_hq_1781929951092.jpg"
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
              <h2>Our Role in the Process</h2>
              <p>
                Because UKStander operates as a curated directory and independent shopping hub, we do not fulfill orders or handle product delivery directly. Your contract of sale is with the individual retailer (e.g., Amazon.co.uk).
              </p>
              <p>
                However, we are committed to ensuring you have all the information necessary to resolve any issues with your purchases quickly and efficiently.
              </p>
            </section>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-16">
              <div className="p-8 bg-white border border-slate-100 rounded-[3rem] shadow-sm relative overflow-hidden group">
                <div className="absolute -right-4 -top-4 w-32 h-32 bg-indigo-50 rounded-full opacity-50 group-hover:scale-110 transition-transform" />
                <div className="relative z-10">
                  <div className="w-14 h-14 bg-indigo-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-indigo-100">
                    <Package className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-black mb-4">Merchant Policies</h3>
                  <p className="text-sm font-medium leading-relaxed text-slate-500 mb-6">
                    Most UK retailers offer a standard 30-day return window. Amazon UK typically provides a 'no-quibble' return policy for most items.
                  </p>
                  <a href="https://www.amazon.co.uk/gp/help/customer/display.html?nodeId=GKM69DUUYKQWKWX7" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-indigo-600 hover:gap-3 transition-all">
                    View Amazon Returns <Truck className="w-4 h-4" />
                  </a>
                </div>
              </div>

              <div className="p-8 bg-white border border-slate-100 rounded-[3rem] shadow-sm relative overflow-hidden group">
                <div className="absolute -right-4 -top-4 w-32 h-32 bg-emerald-50 rounded-full opacity-50 group-hover:scale-110 transition-transform" />
                <div className="relative z-10">
                  <div className="w-14 h-14 bg-emerald-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-emerald-100">
                    <ShieldCheck className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-black mb-4">UK Statutory Rights</h3>
                  <p className="text-sm font-medium leading-relaxed text-slate-500 mb-6">
                    Under the Consumer Rights Act 2015, you have a legal right to a refund, repair, or replacement if an item is not of satisfactory quality.
                  </p>
                  <div className="px-4 py-2 bg-emerald-50 rounded-xl inline-block border border-emerald-100 text-[10px] font-black text-emerald-700 uppercase tracking-widest">
                    Tier 1 Consumer Protection
                  </div>
                </div>
              </div>
            </div>

            <section className="bg-slate-50 rounded-[3.5rem] p-12 border border-slate-100">
              <div className="max-w-2xl">
                <h2 className="text-3xl font-black tracking-tight mb-6">Common Questions</h2>
                <div className="space-y-6">
                  <div className="flex gap-6">
                    <div className="shrink-0 w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-400 font-black text-xs">?</div>
                    <div>
                      <h4 className="font-black text-slate-900 mb-2">Who pays for return shipping?</h4>
                      <p className="text-sm text-slate-500 font-medium leading-relaxed">Usually, if the item is faulty, the retailer pays. If you've simply changed your mind, you may need to cover the cost unless stated otherwise.</p>
                    </div>
                  </div>
                  <div className="flex gap-6">
                    <div className="shrink-0 w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-400 font-black text-xs">?</div>
                    <div>
                      <h4 className="font-black text-slate-900 mb-2">How long do refunds take?</h4>
                      <p className="text-sm text-slate-500 font-medium leading-relaxed">Refunds are typically processed within 3-5 business days once the item reaches the merchant's fulfillment center.</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-12 p-8 bg-white rounded-3xl border border-slate-200 flex flex-col md:flex-row items-center gap-8 shadow-sm">
                    <div className="text-center md:text-left flex-1">
                        <p className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-2">Still Unsure?</p>
                        <h5 className="text-xl font-black mb-2">Need help with a specific merchant?</h5>
                        <p className="text-sm text-slate-500 font-medium mb-4">Our support team can guide you to the right department.</p>
                    </div>
                    <a href="/help" className="bg-slate-950 text-white px-8 py-3 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-800 transition-all flex items-center gap-2">
                        <HelpCircle className="w-4 h-4" /> Help Center
                    </a>
                </div>
              </div>
            </section>
          </>
        )}
      </div>
    </ContentPageLayout>
  );
}
