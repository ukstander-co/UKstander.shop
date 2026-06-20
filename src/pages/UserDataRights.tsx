import React from 'react';
import { Fingerprint, Database, UserCheck, Trash2 } from 'lucide-react';
import ContentPageLayout from '../components/ContentPageLayout';

export default function UserDataRights() {
  return (
    <ContentPageLayout
      title="User Data Rights"
      subtitle="Your legal entitlements under UK GDPR and our commitment to data sovereignty."
      icon={Fingerprint}
      image="/src/assets/images/privacy_security_uk_1781925949071.jpg"
      lastUpdated={new Date().toLocaleDateString('en-GB')}
    >
      <section>
        <h2>Your Rights in the UK</h2>
        <p>
          The <strong>UK Data Protection Act 2018</strong> and <strong>UK GDPR</strong> provide you with significant control over your personal information. UKStander is committed to ensuring these rights are respected and easily accessible for all our members.
        </p>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-16">
        <div className="p-8 border border-slate-100 rounded-[2.5rem] bg-white shadow-sm hover:shadow-md transition-shadow">
          <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center mb-6">
            <Database className="w-6 h-6 text-indigo-600" />
          </div>
          <h3 className="text-xl font-black mb-3">Right to Portability</h3>
          <p className="text-sm text-slate-500 leading-relaxed font-medium">
            You can request a copy of your personal data in a structured, commonly used, and machine-readable format. This includes your wishlist, profile information, and interaction history.
          </p>
        </div>
        
        <div className="p-8 border border-slate-100 rounded-[2.5rem] bg-white shadow-sm hover:shadow-md transition-shadow">
          <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center mb-6">
            <UserCheck className="w-6 h-6 text-emerald-600" />
          </div>
          <h3 className="text-xl font-black mb-3">Right to Rectification</h3>
          <p className="text-sm text-slate-500 leading-relaxed font-medium">
            If you believe any data we hold about you is inaccurate or incomplete, you have the right to request an immediate correction through our Data Protection Officer.
          </p>
        </div>
      </div>

      <section>
        <div className="flex items-center gap-3 mb-4 text-rose-600">
          <Trash2 className="w-5 h-5" />
          <span className="text-[10px] uppercase font-black tracking-widest">Permanent Removal</span>
        </div>
        <h2>The Right to Erasure</h2>
        <p>
          Often referred to as the 'Right to be Forgotten', you can request that UKStander deletes all personal data we hold about you. We will comply with this request unless there is a lawful reason for us to retain specific information (such as for financial record-keeping or legal compliance).
        </p>
        <div className="mt-8 p-6 bg-slate-50 rounded-2xl border border-slate-200/60">
          <p className="text-xs font-bold text-slate-700">How to request data erasure:</p>
          <ol className="mt-2 text-xs text-slate-500 space-y-1 list-decimal pl-4">
            <li>Log in to your account settings.</li>
            <li>Select 'Account Management'.</li>
            <li>Click 'Request Account Deletion'.</li>
            <li>Alternatively, email <a href="mailto:privacy@ukstander.shop" className="text-indigo-600 font-black">privacy@ukstander.shop</a> with the subject line 'GDPR Erasure Request'.</li>
          </ol>
        </div>
      </section>

      <section className="mt-16 bg-[#0B192C] text-white p-10 rounded-[2.5rem]">
        <h3 className="text-white font-black mb-4">Our Transparency Commitment</h3>
        <p className="text-slate-300 text-sm leading-relaxed mb-6">
          UKStander maintains a comprehensive Record of Processing Activities (ROPA). We regularly audit our data workflows to ensure peak compliance with Information Commissioner's Office (ICO) standards. We never monetize your personal data through third-party sales.
        </p>
        <div className="flex items-center gap-4">
          <div className="px-4 py-2 bg-white/10 rounded-full border border-white/20 text-[10px] font-bold uppercase tracking-widest">ICO Registered</div>
          <div className="px-4 py-2 bg-white/10 rounded-full border border-white/20 text-[10px] font-bold uppercase tracking-widest">Tier 1 Compliance</div>
        </div>
      </section>
    </ContentPageLayout>
  );
}
