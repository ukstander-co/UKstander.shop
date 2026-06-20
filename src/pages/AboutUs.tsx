import React from 'react';
import { Users, Target, Award } from 'lucide-react';
import ContentPageLayout from '../components/ContentPageLayout';

export default function AboutUs() {
  return (
    <ContentPageLayout
      title="About UKStander"
      subtitle="The UK's premier destination for intelligent, AI-driven shopping curation and daily deals."
      icon={Users}
      image="/src/assets/images/uk_shopping_hq_1781925814755.jpg"
      lastUpdated={new Date().toLocaleDateString('en-GB')}
    >
      <section>
        <h2>Our Mission</h2>
        <p>
          Founded in London, UKStander was born out of a simple observation: the digital marketplace is becoming increasingly cluttered. Finding genuine value among millions of products requires more than just a search bar—it requires intelligent curation.
        </p>
        <p>
          Our mission is to simplify the shopping experience for UK consumers by merging advanced AI technology with human expertise. We don't just list products; we curate opportunities.
        </p>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-12">
        <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100">
          <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm mb-6">
            <Target className="w-6 h-6 text-indigo-600" />
          </div>
          <h3 className="text-xl font-black mb-2">Data-Driven Curation</h3>
          <p className="text-sm leading-relaxed text-slate-600">
            Our proprietary algorithm analyzes thousands of product data points—price history, consumer sentiment, and technical specifications—to highlight items that offer the best price-to-quality ratio in the UK market.
          </p>
        </div>
        <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100">
          <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm mb-6">
            <Award className="w-6 h-6 text-indigo-600" />
          </div>
          <h3 className="text-xl font-black mb-2">UK Market Expertise</h3>
          <p className="text-sm leading-relaxed text-slate-600">
            We focus exclusively on the United Kingdom. This local focus allows us to understand the nuances of British retail, shipping logistics, and consumer rights, ensuring our recommendations are always relevant and actionable.
          </p>
        </div>
      </div>

      <section>
        <h2>How We Work</h2>
        <p>
          UKStander operates as an independent curation hub. We aggregate the latest deals from major retailers, primarily Amazon UK, and use our "Stander Score" to rank products. This score is a composite of value, reliability, and trend velocity.
        </p>
        <p>
          We take a transparent approach to our commercial relationships. As an affiliate platform, we may earn a commission when you purchase through our links, but our editorial integrity is paramount—we only feature products that meet our high internal standards.
        </p>
      </section>

      <section className="bg-[#0B192C] text-white p-10 rounded-[2.5rem] mt-12 text-center">
        <h2 className="text-white mb-4">Join the Smart Shopping Movement</h2>
        <p className="text-slate-300 mb-8 max-w-xl mx-auto">
          Start your journey with UKStander today and discover why thousands of UK shoppers trust our AI-powered recommendations for their daily essentials and premium tech.
        </p>
        <a 
          href="/user" 
          className="inline-flex bg-[#febd69] text-slate-900 px-8 py-4 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-[#f3a847] transition-all transform hover:scale-105"
        >
          Explore Curated Deals
        </a>
      </section>
    </ContentPageLayout>
  );
}
