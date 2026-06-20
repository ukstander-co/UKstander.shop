import React, { useState, useEffect } from 'react';
import { Shield, Lock, Eye, FileText } from 'lucide-react';
import ContentPageLayout from '../components/ContentPageLayout';

export default function PrivacyPolicy() {
  const [dbPage, setDbPage] = useState<any>(null);

  useEffect(() => {
    fetch('/api/pages/privacy')
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
      title={dbPage ? dbPage.title : "Privacy Policy"}
      subtitle="Transparency and security are at the core of our commitment to UK shoppers."
      icon={Shield}
      image="/src/assets/images/privacy_security_uk_1781925949071.jpg"
      lastUpdated={new Date().toLocaleDateString('en-GB')}
    >
      <div className="space-y-12">
        <section>
          <div className="flex items-center gap-3 mb-4 text-indigo-600">
            <Lock className="w-5 h-5" />
            <span className="text-[10px] uppercase font-black tracking-widest">Data Protection</span>
          </div>
          <h2>1. Information We Collect</h2>
          <p>
            At UKStander, we collect minimal personal data to provide our curation services. Under the <strong>UK General Data Protection Regulation (UK GDPR)</strong>, we may collect your name, email address, and browsing behavior on our platform to optimize the deals we present to you.
          </p>
          {dbPage && <div className="whitespace-pre-line mt-4">{dbPage.content}</div>}
        </section>

        {!dbPage && (
          <>
            <section>
              <div className="flex items-center gap-3 mb-4 text-emerald-600">
                <Eye className="w-5 h-5" />
                <span className="text-[10px] uppercase font-black tracking-widest">Usage Insights</span>
              </div>
              <h2>2. How We Use Your Data</h2>
              <p>
                We use your information to secure your account, prevent fraud, and analyze traffic to improve our product curation. We do not sell your personal data to third parties. Our primary goal is to personalize your experience, ensuring the deals you see are relevant to your shopping habits in the UK.
              </p>
            </section>

            <section>
              <div className="flex items-center gap-3 mb-4 text-orange-600">
                <FileText className="w-5 h-5" />
                <span className="text-[10px] uppercase font-black tracking-widest">Tracking Policy</span>
              </div>
              <h2>3. Cookies and Tracking</h2>
              <p>
                We use essential cookies to keep you logged in and analytics cookies to understand how you use our site. Some of our retail partners may use tracking cookies when you click on a curated deal to attribute the sale to UKStander. This is standard industry practice for affiliate platforms and helps us keep our services free for you.
              </p>
            </section>

            <div className="bg-slate-50 border border-slate-100 p-8 rounded-3xl my-12">
              <h3 className="text-xl font-black mb-4">4. Your Rights Under UK GDPR</h3>
              <p className="text-sm text-slate-600 leading-relaxed mb-6 font-medium">
                As a UK resident, you have the right to access, correct, or delete your personal data. You may also object to processing or request data portability. We are registered with the Information Commissioner's Office (ICO).
              </p>
              <ul className="space-y-3 text-sm text-slate-700 font-bold list-disc pl-5">
                <li>Right to be informed about how your data is used.</li>
                <li>Right of access to your personal data.</li>
                <li>Right to rectification of inaccurate data.</li>
                <li>Right to erasure (right to be forgotten).</li>
              </ul>
            </div>

            <section>
              <h2>5. Contact Our DPO</h2>
              <p>
                If you have questions about this privacy policy or wish to exercise your rights, please contact our Data Protection Officer at:
                <br />
                <a href="mailto:admin@ukstander.shop" className="text-indigo-600 font-bold hover:underline">dpo@ukstander.shop</a>
              </p>
            </section>
          </>
        )}
      </div>
    </ContentPageLayout>
  );
}
