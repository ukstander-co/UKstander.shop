import React, { useState, useEffect } from 'react';
import { HelpCircle, Mail, Phone, MessageSquare, Search, ChevronRight, ExternalLink } from 'lucide-react';
import ContentPageLayout from '../components/ContentPageLayout';
import ReactMarkdown from 'react-markdown';

export default function HelpCenter() {
  const [pageData, setPageData] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetch('/api/pages/contact') // Help Center uses contact page data
      .then(res => res.json())
      .then(data => {
        if (data && data.content) setPageData(data);
      })
      .catch(console.warn);
  }, []);

  const faqs = [
    { q: "How do I track my order?", a: "Since we curate deals from retailers like Amazon, you should track your order directly on their website under 'Your Orders'." },
    { q: "Are the prices on UKStander live?", a: "We sync prices multiple times a day, but retailers may change them at any moment. Always check the final price on the retailer's site." },
    { q: "How can I suggest a product?", a: "We love hearing from our community! Email our curation team at deals@ukstander.shop with your suggestions." }
  ];

  return (
    <ContentPageLayout
      title={pageData?.title || "Help Center"}
      subtitle={pageData?.seo_description || "Expert support for UK shoppers. Finding your way around the UKStander ecosystem."}
      icon={HelpCircle}
      image="/src/assets/images/uk_help_center_elite_1781929005642.jpg"
      lastUpdated={new Date().toLocaleDateString('en-GB')}
    >
      <div className="space-y-16 animate-in fade-in duration-300">
        {pageData ? (
          <section className="markdown-body p-8 bg-white border border-slate-100 rounded-[3.5rem] shadow-sm">
            <ReactMarkdown>{pageData.content}</ReactMarkdown>
          </section>
        ) : (
          <>
            {/* Search Bar */}
            <section className="relative -mt-32 z-30">
              <div className="max-w-3xl mx-auto p-4 bg-white rounded-[3rem] shadow-2xl border border-slate-100 flex items-center gap-4">
                <Search className="w-6 h-6 text-slate-400 ml-4" />
                <input 
                  type="text" 
                  placeholder="Search help articles, policies, or retailers..."
                  className="flex-1 bg-transparent border-none outline-none font-medium text-slate-900 placeholder:text-slate-400 h-12"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button className="bg-indigo-600 text-white px-8 h-12 rounded-[2rem] font-black text-xs uppercase tracking-widest hover:bg-indigo-700 transition-all">
                  Search
                </button>
              </div>
            </section>

            <section>
              <p className="text-xl text-slate-600 mb-16 font-medium leading-relaxed">
                Welcome to the UKStander Help Center. Whether you're curious about our AI curation or need help navigating a recent deal, our team and automated systems are here to assist.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
                <div className="p-8 bg-slate-50 border border-slate-100 rounded-[3rem] text-center group hover:bg-white hover:shadow-xl transition-all">
                  <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm group-hover:scale-110 transition-transform">
                    <Mail className="w-7 h-7 text-indigo-600" />
                  </div>
                  <h4 className="text-lg font-black mb-2">Email Us</h4>
                  <p className="text-xs text-slate-500 font-bold mb-4">Response within 24 hours</p>
                  <a href="mailto:support@ukstander.shop" className="text-[10px] font-black uppercase tracking-widest text-indigo-600 border-b-2 border-indigo-100 pb-1">support@ukstander.shop</a>
                </div>

                <div className="p-8 bg-slate-50 border border-slate-100 rounded-[3rem] text-center group hover:bg-white hover:shadow-xl transition-all">
                  <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm group-hover:scale-110 transition-transform">
                    <Phone className="w-7 h-7 text-emerald-600" />
                  </div>
                  <h4 className="text-lg font-black mb-2">Call Lines</h4>
                  <p className="text-xs text-slate-500 font-bold mb-4">Mon-Fri 9am - 5:30pm</p>
                  <a href="tel:+442079460958" className="text-[10px] font-black uppercase tracking-widest text-emerald-600 border-b-2 border-emerald-100 pb-1">+44 20 7946 0958</a>
                </div>

                <div className="p-8 bg-slate-50 border border-slate-100 rounded-[3rem] text-center group hover:bg-white hover:shadow-xl transition-all">
                  <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm group-hover:scale-110 transition-transform">
                    <MessageSquare className="w-7 h-7 text-[#febd69]" />
                  </div>
                  <h4 className="text-lg font-black mb-2">Live Chat</h4>
                  <p className="text-xs text-slate-500 font-bold mb-4">Instant AI Assistance</p>
                  <button className="text-[10px] font-black uppercase tracking-widest text-slate-900 border-b-2 border-[#febd69] pb-1">Start Session</button>
                </div>
              </div>
            </section>

            {/* FAQ Section */}
            <section className="bg-white border border-slate-100 rounded-[4rem] p-12 lg:p-20 shadow-sm">
              <div className="max-w-2xl">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600">
                    <Search className="w-5 h-5" />
                  </div>
                  <h2 className="text-3xl font-black tracking-tight m-0">Frequently Asked</h2>
                </div>

                <div className="space-y-4">
                  {faqs.map((faq, idx) => (
                    <div key={idx} className="group border-b border-slate-100 py-6 last:border-0 hover:translate-x-2 transition-transform cursor-pointer">
                      <div className="flex items-center justify-between gap-4">
                        <h5 className="text-lg font-black text-slate-900">{faq.q}</h5>
                        <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-indigo-600" />
                      </div>
                      <p className="text-sm text-slate-500 font-medium leading-relaxed mt-4 opacity-0 group-hover:opacity-100 h-0 group-hover:h-auto transition-all">
                        {faq.a}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* External Docs */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <a href="/privacy" className="p-10 bg-[#0B192C] text-white rounded-[3rem] group">
                <h4 className="text-xl font-black mb-2 flex items-center gap-3">
                  Privacy Guide <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-all" />
                </h4>
                <p className="text-slate-400 text-sm font-medium">Learn how we protect your data under UK GDPR.</p>
              </a>
              <a href="/disclosure" className="p-10 bg-slate-50 border border-slate-100 rounded-[3rem] group">
                <h4 className="text-xl font-black text-slate-900 mb-2 flex items-center gap-3">
                  Commercial Disclosure <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-all" />
                </h4>
                <p className="text-slate-500 text-sm font-medium">Full transparency on our retail partnerships.</p>
              </a>
            </section>
          </>
        )}
      </div>
    </ContentPageLayout>
  );
}
