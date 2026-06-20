import React from 'react';
import { RefreshCcw, Package, Truck, ShieldCheck } from 'lucide-react';
import ContentPageLayout from '../components/ContentPageLayout';

export default function ReturnsReplacements() {
  return (
    <ContentPageLayout
      title="Returns & Replacements"
      subtitle="Simple, transparent guidelines for managing your purchases through our curated retailer network."
      icon={RefreshCcw}
      image="/src/assets/images/returns_replacements_uk_1781925833251.jpg"
      lastUpdated={new Date().toLocaleDateString('en-GB')}
    >
      <section>
        <h2>Your Consumer Rights</h2>
        <p>
          At UKStander, we curate products from high-authority UK retailers, primarily Amazon.co.uk. This means that when you make a purchase, you are fully protected by both the retailer's policies and the <strong>UK Consumer Rights Act 2015</strong>.
        </p>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-12">
        <div className="flex flex-col items-center text-center p-6 bg-slate-50 rounded-3xl border border-slate-100">
          <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm mb-4">
            <Package className="w-5 h-5 text-indigo-600" />
          </div>
          <h4 className="font-bold text-slate-900 mb-2">30-Day Returns</h4>
          <p className="text-xs text-slate-500 leading-relaxed">Standard no-quibble return window for most unused UK purchases.</p>
        </div>
        <div className="flex flex-col items-center text-center p-6 bg-slate-50 rounded-3xl border border-slate-100">
          <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm mb-4">
            <Truck className="w-5 h-5 text-indigo-600" />
          </div>
          <h4 className="font-bold text-slate-900 mb-2">Free Collection</h4>
          <p className="text-xs text-slate-500 leading-relaxed">Available for many prime-eligible items through partner drop-off points.</p>
        </div>
        <div className="flex flex-col items-center text-center p-6 bg-slate-50 rounded-3xl border border-slate-100">
          <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm mb-4">
            <ShieldCheck className="w-5 h-5 text-indigo-600" />
          </div>
          <h4 className="font-bold text-slate-900 mb-2">UK Warranty</h4>
          <p className="text-xs text-slate-500 leading-relaxed">Full legal protection on faulty or misdescribed goods for up to 6 years.</p>
        </div>
      </div>

      <section>
        <h2>How to Process a Return</h2>
        <p>
          Since UKStander is an affiliate platform, all returns and replacements are handled directly by the retail partner (e.g., Amazon UK). To start a return:
        </p>
        <ol className="space-y-4 text-slate-600 font-medium list-decimal pl-6">
          <li>
            <strong>Locate your confirmation email:</strong> This was sent by the retailer at the time of purchase.
          </li>
          <li>
            <strong>Visit the Retailer's Order Center:</strong> Log in to your account on the site where you finalized the purchase.
          </li>
          <li>
            <strong>Select 'Return or Replace Items':</strong> Follow the step-by-step instructions provided by the merchant to print your labels or generate a QR code for drop-off.
          </li>
          <li>
            <strong>Refund Processing:</strong> Most UK retailers process refunds within 3-5 working days once the item is received back at their fulfillment center.
          </li>
        </ol>
      </section>

      <section className="mt-12 bg-indigo-50/50 p-8 rounded-3xl border border-indigo-100/50">
        <h3 className="text-indigo-900 font-black mb-3">Need help with a referral?</h3>
        <p className="text-sm text-indigo-800 leading-relaxed italic font-medium">
          If you are having trouble locating the correct seller or need clarification on a product detail that you saw on UKStander, our support team can help guide you to the right place. 
        </p>
        <a href="/contact" className="inline-flex items-center gap-2 text-indigo-600 font-black text-xs uppercase tracking-widest mt-4 hover:gap-3 transition-all">
          Contact Support Specialist →
        </a>
      </section>
    </ContentPageLayout>
  );
}
