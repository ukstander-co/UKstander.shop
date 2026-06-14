import React, { useState, useEffect } from 'react';
import { Mail, Phone } from 'lucide-react';
import MainLayout from '../components/MainLayout';

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
    <MainLayout>
      <div className="min-h-screen py-12 md:py-20 bg-[#F8FAFC] text-slate-900 font-sans p-6 md:p-12">
        <div className="max-w-3xl mx-auto bg-white border border-slate-200 rounded-3xl shadow-sm p-8 md:p-12">
          <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-12 bg-slate-100 text-slate-700 rounded-2xl flex items-center justify-center border border-slate-200">
            <Mail className="w-6 h-6" />
          </div>
          <h1 className="text-3xl font-black tracking-tight text-slate-900">
            {dbPage ? dbPage.title : "Contact Us"}
          </h1>
        </div>

        <div className="prose prose-slate max-w-none text-slate-600 space-y-6">
          {dbPage ? (
            <div className="whitespace-pre-line text-slate-600 leading-relaxed font-semibold">
              {dbPage.content}
            </div>
          ) : (
            <>
              <p>If you have any questions about our curated deals, privacy practices, or affiliate relationships, please reach out to us.</p>
              
              <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm mt-6">
                <div className="flex items-center gap-4 mb-6">
                   <Mail className="w-6 h-6 text-indigo-500" />
                   <span className="font-semibold text-slate-800 text-lg">Email:</span>
                   <a href="mailto:support@ukstander.shop" className="text-indigo-600 hover:text-indigo-700 font-medium">support@ukstander.shop</a>
                </div>
                <div className="flex items-center gap-4 mb-6">
                   <Phone className="w-6 h-6 text-indigo-500" />
                   <span className="font-semibold text-slate-800 text-lg">Phone:</span>
                   <span className="text-slate-600 font-medium">+44 20 7946 0958</span>
                </div>
                <p className="text-sm mt-8 text-slate-500 font-medium bg-slate-100 p-3 rounded-xl border border-slate-200 inline-block">Business Hours: Monday - Friday, 9:00 AM - 5:00 PM (GMT)</p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  </MainLayout>
);
}
