import React, { useState, useEffect } from 'react';
import { FileText, Scale, Gavel, AlertTriangle } from 'lucide-react';
import ContentPageLayout from '../components/ContentPageLayout';

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
    <ContentPageLayout
      title={dbPage ? dbPage.title : "Terms & Conditions"}
      subtitle="The legal framework governing your use of our curation platform."
      icon={FileText}
      image="/src/assets/images/privacy_security_uk_1781925949071.jpg"
      lastUpdated={new Date().toLocaleDateString('en-GB')}
    >
      <div className="space-y-12">
        <section>
          <div className="flex items-center gap-3 mb-4 text-indigo-600">
            <Scale className="w-5 h-5" />
            <span className="text-[10px] uppercase font-black tracking-widest">Legal framework</span>
          </div>
          <h2>1. Acceptance of Terms</h2>
          <p>
            By accessing and using UKStander, you agree to comply with these Terms and Conditions. These terms are governed by the laws of <strong>England and Wales</strong>. If you do not agree to these terms, please discontinue use of the platform immediately.
          </p>
          {dbPage && <div className="whitespace-pre-line mt-4">{dbPage.content}</div>}
        </section>

        {!dbPage && (
          <>
            <section>
              <div className="flex items-center gap-3 mb-4 text-emerald-600">
                <Gavel className="w-5 h-5" />
                <span className="text-[10px] uppercase font-black tracking-widest">Our Service</span>
              </div>
              <h2>2. Service Description</h2>
              <p>
                UKStander is a curated web portal. We do not sell products directly. We direct you to third-party retailers, primarily Amazon UK. Any purchase you make is governed by the terms and conditions of the respective retailer. We are an intermediary facilitating discovery, not a direct seller of physical goods.
              </p>
            </section>

            <section>
              <div className="flex items-center gap-3 mb-4 text-rose-600">
                <AlertTriangle className="w-5 h-5" />
                <span className="text-[10px] uppercase font-black tracking-widest">Disclaimers</span>
              </div>
              <h2>3. Liability & Accuracy</h2>
              <p>
                While we strive to provide accurate information and prices, we are not responsible for discrepancies, out-of-stock items, or issues arising from purchases made on third-party websites. Your consumer rights (including under the <strong>Consumer Rights Act 2015</strong>) remain at all times with the retailer from whom you purchase the goods.
              </p>
            </section>

            <div className="bg-slate-50 border border-slate-100 p-8 rounded-3xl my-12">
              <h3 className="text-xl font-black mb-4">4. Intellectual Property</h3>
              <p className="text-sm text-slate-600 leading-relaxed font-medium">
                The content, branding, and curation on this platform are owned by UKStander. Third-party logos and product images are the property of their respective owners and are used for identification and descriptive purposes only under fair use guidelines.
              </p>
            </div>

            <section>
              <h2>5. Changes to Terms</h2>
              <p>
                We reserve the right to modify these terms at any time. Changes will be effective immediately upon publication on this page. Your continued use of the platform constitutes acceptance of any revised terms.
              </p>
            </section>
          </>
        )}
      </div>
    </ContentPageLayout>
  );
}
