import React from 'react';
import { HelpCircle, Search, MessageSquare, BookOpen } from 'lucide-react';
import ContentPageLayout from '../components/ContentPageLayout';

export default function HelpCenter() {
  const faqs = [
    {
      q: "How does UKStander find these deals?",
      a: "Our AI engine scans thousands of SKUs across major UK marketplaces every hour, comparing historical pricing, current demand, and shipping availability to identify genuine value for British shoppers."
    },
    {
      q: "Do I buy products directly from UKStander?",
      a: "No. UKStander is a curation platform. We find the best items and direct you to trusted retailers like Amazon.co.uk to complete your purchase securely."
    },
    {
      q: "Is there a fee for using UKStander?",
      a: "UKStander is completely free for users. We earn a small commission from our retail partners at no extra cost to you when you make a purchase through our curated links."
    },
    {
      q: "What if my item arrives damaged?",
      a: "Because you purchase directly from major retailers, you are covered by their robust returns policies. Simply visit your 'Orders' page on the retailer's site to initiate a replacement or refund."
    }
  ];

  return (
    <ContentPageLayout
      title="Help Center"
      subtitle="Everything you need to know about navigating the UKStander curation engine."
      icon={HelpCircle}
      image="/src/assets/images/uk_shopping_hq_1781925814755.jpg"
      lastUpdated={new Date().toLocaleDateString('en-GB')}
    >
      <div className="relative mb-16">
        <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-slate-400" />
        </div>
        <input 
          type="text" 
          placeholder="Search for answers..." 
          className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-5 pl-14 pr-6 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all font-medium text-slate-700"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        <div className="group p-8 bg-white border border-slate-100 rounded-[2rem] shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all">
          <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-indigo-600 transition-colors">
            <MessageSquare className="w-6 h-6 text-indigo-600 group-hover:text-white" />
          </div>
          <h3 className="text-xl font-black mb-2">Live Support</h3>
          <p className="text-sm text-slate-500 leading-relaxed font-medium mb-6">
            Need immediate help? Our shopping assistants are available to help you find specific products or resolve issues during UK business hours (9am - 5:30pm GMT).
          </p>
          <a href="/contact" className="text-indigo-600 font-bold text-xs uppercase tracking-widest flex items-center gap-2 hover:gap-3 transition-all">
            Start Live Chat →
          </a>
        </div>
        
        <div className="group p-8 bg-white border border-slate-100 rounded-[2rem] shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all">
          <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-emerald-600 transition-colors">
            <BookOpen className="w-6 h-6 text-emerald-600 group-hover:text-white" />
          </div>
          <h3 className="text-xl font-black mb-2">Shopping Guides</h3>
          <p className="text-sm text-slate-500 leading-relaxed font-medium mb-6">
            New to smart shopping? Explore our comprehensive library of guides on how to spot the best deals and use price history to your advantage.
          </p>
          <a href="/blog" className="text-emerald-600 font-bold text-xs uppercase tracking-widest flex items-center gap-2 hover:gap-3 transition-all">
            Read Guides →
          </a>
        </div>
      </div>

      <section>
        <h2 className="text-center mb-10">Frequently Asked Questions</h2>
        <div className="space-y-6">
          {faqs.map((faq, i) => (
            <div key={i} className="p-8 bg-slate-50 rounded-[2rem] border border-slate-100/50">
              <h4 className="text-lg font-black text-slate-900 mb-3">{faq.q}</h4>
              <p className="text-sm text-slate-600 leading-relaxed font-medium">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-20 text-center">
        <p className="text-slate-500 font-medium mb-6">Can't find what you're looking for?</p>
        <a 
          href="mailto:help@ukstander.shop" 
          className="inline-flex bg-slate-900 text-white px-10 py-5 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-slate-800 transition-all shadow-xl shadow-slate-200"
        >
          Email Our Support Team
        </a>
      </section>
    </ContentPageLayout>
  );
}
