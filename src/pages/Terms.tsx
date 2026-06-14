import React, { useState, useEffect } from 'react';
import { FileText } from 'lucide-react';
import MainLayout from '../components/MainLayout';

export default function Terms() {
  const [dbPage, setDbPage] = useState<any>(null);

  useEffect(() => {
    fetch('/api/pages/terms')
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
            <FileText className="w-6 h-6" />
          </div>
          <h1 className="text-3xl font-black tracking-tight text-slate-900">
            {dbPage ? dbPage.title : "Terms & Conditions"}
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
                <h2 className="text-xl font-bold text-slate-800 mb-3">1. Acceptance of Terms</h2>
                <p>By accessing and using UKStander, you agree to comply with these Terms and Conditions. These terms are governed by the laws of England and Wales.</p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-slate-800 mb-3">2. Service Description</h2>
                <p>UKStander is a curated web portal. We do not sell products directly. We direct you to third-party UK retailers. Any purchase you make is governed by the terms and conditions of the respective retailer.</p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-slate-800 mb-3">3. Liability</h2>
                <p>While we strive to provide accurate information and prices, we are not responsible for discrepancies, out-of-stock items, or issues arising from purchases made on third-party websites. Your consumer rights (including under the Consumer Rights Act 2015) remain at all times with the retailer from whom you purchase the goods.</p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-slate-800 mb-3">4. Intellectual Property</h2>
                <p>The content, branding, and curation on this platform are owned by UKStander. Third-party logos and product images are the property of their respective owners and are used for identification purposes only.</p>
              </section>
            </>
          )}
        </div>
      </div>
    </div>
  </MainLayout>
);
}
