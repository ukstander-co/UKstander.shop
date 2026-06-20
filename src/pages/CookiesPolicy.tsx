import React, { useState, useEffect } from 'react';
import { Cookie, Settings, Info, CheckCircle2 } from 'lucide-react';
import ContentPageLayout from '../components/ContentPageLayout';

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
    <ContentPageLayout
      title={dbPage ? dbPage.title : "Cookies Policy"}
      subtitle="How we use digital identifiers to enhance your UKStander experience."
      icon={Cookie}
      image="/src/assets/images/privacy_security_uk_1781925949071.jpg"
      lastUpdated={new Date().toLocaleDateString('en-GB')}
    >
      <div className="space-y-12">
        <section>
          <div className="flex items-center gap-3 mb-4 text-indigo-600">
            <Info className="w-5 h-5" />
            <span className="text-[10px] uppercase font-black tracking-widest">Digital Identifiers</span>
          </div>
          <h2>1. What Are Cookies?</h2>
          <p>
            Cookies are small text files stored on your device when you browse the internet. At UKStander, we use them to enhance your experience, remember your preferences, and track affiliate links securely to ensure our platform remains sustainable.
          </p>
          {dbPage && <div className="whitespace-pre-line mt-4">{dbPage.content}</div>}
        </section>

        {!dbPage && (
          <>
            <div className="bg-slate-50 border border-slate-100 p-8 rounded-[2.5rem] my-12">
              <h3 className="text-2xl font-black mb-6">2. Types of Cookies We Use</h3>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="shrink-0 w-8 h-8 bg-white rounded-lg flex items-center justify-center shadow-sm">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 mb-1">Essential Cookies</h4>
                    <p className="text-xs text-slate-500 leading-relaxed">Necessary for the website to function, such as keeping you logged into your secure account.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="shrink-0 w-8 h-8 bg-white rounded-lg flex items-center justify-center shadow-sm">
                    <CheckCircle2 className="w-4 h-4 text-indigo-500" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 mb-1">Analytics Cookies</h4>
                    <p className="text-xs text-slate-500 leading-relaxed">Helping us understand how our UK audience interacts with Different categories and deal types.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="shrink-0 w-8 h-8 bg-white rounded-lg flex items-center justify-center shadow-sm">
                    <CheckCircle2 className="w-4 h-4 text-orange-500" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 mb-1">Affiliate Tracking</h4>
                    <p className="text-xs text-slate-500 leading-relaxed">Used by our retail partners (like Amazon UK) to attribute referrals to our platform, allowing us to earn commissions.</p>
                  </div>
                </div>
              </div>
            </div>

            <section>
              <div className="flex items-center gap-3 mb-4 text-indigo-600">
                <Settings className="w-5 h-5" />
                <span className="text-[10px] uppercase font-black tracking-widest">Your Control</span>
              </div>
              <h2>3. Managing Your Preferences</h2>
              <p>
                As a UK user, you have the right to consent to non-essential cookies. You can manage or disable cookies through your browser settings at any time. However, please note that disabling certain cookies may affect the functionality of our high-performance curation engine.
              </p>
            </section>

            <section>
              <h2>4. Third-Party Cookies</h2>
              <p>
                Some cookies on our site are set by third parties, such as Google Analytics or social media platforms. These third parties have their own privacy and cookie policies which we encourage you to review.
              </p>
            </section>
          </>
        )}
      </div>
    </ContentPageLayout>
  );
}
