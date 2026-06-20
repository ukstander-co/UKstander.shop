import React, { useState, useEffect } from 'react';
import { Mail, Phone, MessageSquare, MapPin } from 'lucide-react';
import ContentPageLayout from '../components/ContentPageLayout';

export default function ContactUs() {
  const [dbPage, setDbPage] = useState<any>(null);

  useEffect(() => {
    fetch('/api/pages/contact')
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
      title={dbPage ? dbPage.title : "Help Center"}
      subtitle="Connecting you with the experts behind the curation. We're here to help you shop smarter."
      icon={MessageSquare}
      image="/src/assets/images/uk_shopping_hq_1781925814755.jpg"
      lastUpdated={new Date().toLocaleDateString('en-GB')}
    >
      <div className="space-y-12">
        <section>
          {dbPage ? (
            <div className="whitespace-pre-line text-slate-600 leading-relaxed font-semibold">
              {dbPage.content}
            </div>
          ) : (
            <>
              <p className="text-lg">If you have any questions about our curated deals, our platform, or policies, please secure a connection with our respective departments. Our team of specialists is dedicated to ensuring you get the most out of our UK curation engine.</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-12">
                <div className="p-8 bg-slate-50 rounded-[2.5rem] border border-slate-100 flex flex-col items-center text-center">
                  <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm mb-4">
                    <Mail className="w-6 h-6 text-indigo-600" />
                  </div>
                  <h3 className="text-xl font-black mb-2">Email Support</h3>
                  <p className="text-sm text-slate-500 mb-4 font-medium leading-relaxed">The fastest way to get a response for non-urgent matters.</p>
                  <a href="mailto:support@ukstander.shop" className="text-indigo-600 font-black text-xs uppercase tracking-widest bg-white px-6 py-3 rounded-full border border-slate-200 hover:shadow-md transition-all">Support Inbox</a>
                </div>
                
                <div className="p-8 bg-slate-50 rounded-[2.5rem] border border-slate-100 flex flex-col items-center text-center">
                  <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm mb-4">
                    <Phone className="w-6 h-6 text-emerald-600" />
                  </div>
                  <h3 className="text-xl font-black mb-2">Phone Lines</h3>
                  <p className="text-sm text-slate-500 mb-4 font-medium leading-relaxed">Speak directly with our UK-based team during business hours.</p>
                  <a href="tel:+442079460958" className="text-emerald-600 font-black text-xs uppercase tracking-widest bg-white px-6 py-3 rounded-full border border-slate-200 hover:shadow-md transition-all">+44 20 7946 0958</a>
                </div>
              </div>

              <div className="bg-white border border-slate-200 rounded-[2.5rem] p-8 md:p-12 shadow-sm">
                <h3 className="text-2xl font-black mb-8 border-b border-slate-100 pb-4">Departmental Directory</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-8 gap-x-12">
                  <div className="space-y-1 group">
                    <span className="block font-black text-slate-400 text-[10px] uppercase tracking-[0.2em] mb-1">General Inquiries</span>
                    <a href="mailto:info@ukstander.shop" className="text-slate-900 group-hover:text-indigo-600 transition-colors text-base font-black flex items-center gap-2">
                       info@ukstander.shop
                    </a>
                  </div>
                  <div className="space-y-1 group">
                    <span className="block font-black text-slate-400 text-[10px] uppercase tracking-[0.2em] mb-1">Retailers & Affiliates</span>
                    <a href="mailto:affiliate@ukstander.shop" className="text-slate-900 group-hover:text-indigo-600 transition-colors text-base font-black flex items-center gap-2">
                       affiliate@ukstander.shop
                    </a>
                  </div>
                  <div className="space-y-1 group">
                    <span className="block font-black text-slate-400 text-[10px] uppercase tracking-[0.2em] mb-1">Curation Team</span>
                    <a href="mailto:deals@ukstander.shop" className="text-slate-900 group-hover:text-indigo-600 transition-colors text-base font-black flex items-center gap-2">
                       deals@ukstander.shop
                    </a>
                  </div>
                  <div className="space-y-1 group">
                    <span className="block font-black text-slate-400 text-[10px] uppercase tracking-[0.2em] mb-1">Data Rights Officer</span>
                    <a href="mailto:admin@ukstander.shop" className="text-slate-900 group-hover:text-indigo-600 transition-colors text-base font-black flex items-center gap-2">
                       admin@ukstander.shop
                    </a>
                  </div>
                </div>
                
                <div className="mt-12 pt-8 border-t border-slate-100 flex flex-col md:flex-row items-center justify-between gap-6">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center">
                      <MapPin className="w-5 h-5 text-slate-500" />
                    </div>
                    <div>
                      <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">HQ Address</p>
                      <p className="text-xs font-bold text-slate-700">Canary Wharf, London, E14 5AB</p>
                    </div>
                  </div>
                  <div className="px-4 py-2 bg-slate-50 rounded-xl border border-slate-200/60 text-[10px] font-black text-slate-500 uppercase tracking-widest">
                    Mon - Fri: 09:00 - 17:30 GMT
                  </div>
                </div>
              </div>
            </>
          )}
        </section>
      </div>
    </ContentPageLayout>
  );
}
