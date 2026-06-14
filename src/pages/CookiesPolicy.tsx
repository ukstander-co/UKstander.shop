import React, { useState, useEffect } from 'react';
import { Cookie } from 'lucide-react';
import MainLayout from '../components/MainLayout';

export default function CookiesPolicy() {
  const [dbPage, setDbPage] = useState<any>(null);

  useEffect(() => {
    fetch('/api/pages/cookies')
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
            <Cookie className="w-6 h-6" />
          </div>
          <h1 className="text-3xl font-black tracking-tight text-slate-900">
            {dbPage ? dbPage.title : "Cookies Policy"}
          </h1>
        </div>

        <div className="prose prose-slate max-w-none text-slate-600 space-y-6">
          <p className="text-sm"><strong>Last Updated: {new Date().toLocaleDateString('en-GB')}</strong></p>
          
          {dbPage ? (
            <div className="whitespace-pre-line text-slate-600 leading-relaxed font-semibold">
              {dbPage.content}
            </div>
          ) : (
            <>
              <section>
                <h2 className="text-xl font-bold text-slate-800 mb-3">1. What Are Cookies?</h2>
                <p>Cookies are small text files stored on your device when you browse the internet. At UKStander, we use them to enhance your experience and track affiliate links securely.</p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-slate-800 mb-3">2. How We Use Cookies</h2>
                <p>We use essential cookies for login sessions and security. We also use analytics cookies to understand product trends in the UK market. Thirdly, when you click an affiliate link, a tracking cookie may be placed by the retailer to credit us for the referral.</p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-slate-800 mb-3">3. Managing Cookies</h2>
                <p>You can manage or disable cookies through your browser settings. However, disabling essential cookies may prevent you from logging in, and disabling tracking cookies may affect our ability to secure you the best curated deals.</p>
              </section>
            </>
          )}
        </div>
      </div>
    </div>
  </MainLayout>
);
}
