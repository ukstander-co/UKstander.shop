import React, { useState, useEffect } from 'react';
import { Users, Target, Award, Globe, Rocket, ShieldCheck, Mail, Send, Loader2, CheckCircle2 } from 'lucide-react';
import ContentPageLayout from '../components/ContentPageLayout';
import ReactMarkdown from 'react-markdown';

export default function AboutUs() {
  const [pageData, setPageData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    department: 'General Inquiries',
    message: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    fetch('/api/pages/about-ukstander')
      .then(res => res.json())
      .then(data => {
        if (data && data.content) setPageData(data);
      })
      .catch(console.warn)
      .finally(() => setLoading(false));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch('/api/support-requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        setSubmitted(true);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <ContentPageLayout
      title={pageData?.title || "About UKStander"}
      subtitle={pageData?.seo_description || "The UK's premier destination for intelligent, AI-driven shopping curation and daily deals."}
      icon={Users}
      image="/src/assets/images/uk_shopping_hq_1781925814755.jpg"
      lastUpdated={new Date().toLocaleDateString('en-GB')}
    >
      <div className="space-y-16">
        {pageData ? (
          <section className="markdown-body">
            <ReactMarkdown>{pageData.content}</ReactMarkdown>
          </section>
        ) : (
          <>
            <section>
              <h2>Our Mission</h2>
              <p>
                Founded in London, UKStander was born out of a simple observation: the digital marketplace is becoming increasingly cluttered. Finding genuine value among millions of products requires more than just a search bar—it requires intelligent curation.
              </p>
              <p>
                Our mission is to simplify the shopping experience for UK consumers by merging advanced AI technology with human expertise. We don't just list products; we curate opportunities.
              </p>
            </section>

            {/* Brand Pillars */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 my-16">
              <div className="p-8 bg-white border border-slate-100 rounded-[3rem] shadow-sm hover:shadow-xl transition-all group overflow-hidden relative">
                <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-50 rounded-bl-[3rem] transition-all group-hover:scale-110" />
                <div className="relative z-10">
                  <div className="w-14 h-14 bg-indigo-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-indigo-200">
                    <Target className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-black mb-4 tracking-tight">Precision Curation</h3>
                  <p className="text-sm font-medium leading-relaxed text-slate-500">
                    Our proprietary algorithm analyzes thousands of price points and technical metrics to highlight only the best value items.
                  </p>
                </div>
              </div>

              <div className="p-8 bg-white border border-slate-100 rounded-[3rem] shadow-sm hover:shadow-xl transition-all group overflow-hidden relative">
                <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-50 rounded-bl-[3rem] transition-all group-hover:scale-110" />
                <div className="relative z-10">
                  <div className="w-14 h-14 bg-emerald-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-emerald-200">
                    <Globe className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-black mb-4 tracking-tight">UK Exclusive</h3>
                  <p className="text-sm font-medium leading-relaxed text-slate-500">
                    Based in Canary Wharf, we maintain a deep focus on the British retail landscape, delivery networks, and consumer trends.
                  </p>
                </div>
              </div>

              <div className="p-8 bg-white border border-slate-100 rounded-[3rem] shadow-sm hover:shadow-xl transition-all group overflow-hidden relative">
                <div className="absolute top-0 right-0 w-24 h-24 bg-[#febd69]/10 rounded-bl-[3rem] transition-all group-hover:scale-110" />
                <div className="relative z-10">
                  <div className="w-14 h-14 bg-[#febd69] rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-[#febd69]/20">
                    <ShieldCheck className="w-7 h-7 text-slate-900" />
                  </div>
                  <h3 className="text-xl font-black mb-4 tracking-tight">Vetted Quality</h3>
                  <p className="text-sm font-medium leading-relaxed text-slate-500">
                    Every deal is strictly verified by our internal curation team for authenticity, warranty availability, and stock reliability.
                  </p>
                </div>
              </div>
            </div>

            {/* Why Trust Section */}
            <section className="relative overflow-hidden p-12 bg-slate-900 rounded-[3.5rem] text-white">
              <div className="absolute top-0 right-0 -mt-20 -mr-20 w-96 h-96 bg-indigo-500/10 rounded-full blur-[100px]" />
              <div className="relative z-10 flex flex-col md:flex-row items-center gap-16">
                <div className="flex-1 space-y-6">
                  <div className="inline-flex items-center gap-3 px-4 py-1.5 bg-white/10 rounded-full border border-white/20">
                    <Award className="w-4 h-4 text-[#febd69]" />
                    <span className="text-[10px] font-black uppercase tracking-[0.2em]">Excellence Standard</span>
                  </div>
                  <h2 className="text-white text-3xl md:text-5xl font-black tracking-tighter mb-4">Why UK consumers trust our curations</h2>
                  <p className="text-slate-400 text-lg leading-relaxed font-medium">
                    We believe that trust is earned through transparency. That's why we clearly disclose our affiliate relationships and ensure our rankings are never for sale. Our AI prioritizes your savings over our earnings.
                  </p>
                  <div className="flex flex-wrap gap-8 pt-4">
                    <div>
                      <p className="text-3xl font-black text-white">50k+</p>
                      <p className="text-[10px] font-black uppercase text-slate-500 tracking-widest mt-1">Verified Deals</p>
                    </div>
                    <div>
                      <p className="text-3xl font-black text-white">100%</p>
                      <p className="text-[10px] font-black uppercase text-slate-500 tracking-widest mt-1">UK Secured</p>
                    </div>
                    <div>
                      <p className="text-3xl font-black text-white">24/7</p>
                      <p className="text-[10px] font-black uppercase text-slate-500 tracking-widest mt-1">AI Monitoring</p>
                    </div>
                  </div>
                </div>
                <div className="relative w-full md:w-80 h-80">
                  <div className="absolute inset-0 bg-white/5 rounded-full border border-white/10 animate-pulse" />
                  <div className="absolute inset-4 bg-white/5 rounded-full border border-white/10" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Rocket className="w-32 h-32 text-indigo-400/50" />
                  </div>
                </div>
              </div>
            </section>
          </>
        )}

        {/* Support Inquiry Form */}
        <section className="bg-white border border-slate-200 rounded-[3.5rem] p-8 lg:p-16 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-50/50 rounded-full -mr-32 -mt-32 blur-3xl" />
          
          <div className="max-w-3xl mx-auto">
            {submitted ? (
              <div className="py-12 flex flex-col items-center justify-center text-center animate-in fade-in zoom-in duration-500">
                <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mb-8">
                  <CheckCircle2 className="w-10 h-10 text-emerald-600" />
                </div>
                <h2 className="text-3xl font-black mb-4 tracking-tight">Inquiry Received</h2>
                <p className="text-slate-500 font-medium mb-8 max-w-md">
                  Thank you for reaching out. Your inquiry has been sent to our admin team. We aim to respond within 24 working hours.
                </p>
                <button 
                  onClick={() => setSubmitted(false)}
                  className="bg-indigo-600 text-white px-8 py-3 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-10">
                <div className="text-center mb-12">
                   <h2 className="text-4xl font-black tracking-tighter mb-4">Submit an Inquiry</h2>
                   <p className="text-slate-500 font-medium">Have a specific question or partnership proposal? Our team is ready to assist.</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em] ml-1">Full Name</label>
                    <input 
                      type="text" 
                      required
                      className="w-full bg-slate-50 border border-slate-200 h-14 rounded-2xl px-6 font-bold text-slate-900 focus:bg-white focus:border-indigo-600 outline-none transition-all"
                      placeholder="James Smith"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em] ml-1">Email Address</label>
                    <input 
                      type="email" 
                      required
                      className="w-full bg-slate-50 border border-slate-200 h-14 rounded-2xl px-6 font-bold text-slate-900 focus:bg-white focus:border-indigo-600 outline-none transition-all"
                      placeholder="james@example.co.uk"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em] ml-1">Department</label>
                  <select 
                    className="w-full bg-slate-50 border border-slate-200 h-14 rounded-2xl px-6 font-bold text-slate-900 focus:bg-white focus:border-indigo-600 outline-none transition-all appearance-none cursor-pointer"
                    value={formData.department}
                    onChange={(e) => setFormData({...formData, department: e.target.value})}
                  >
                    <option>General Inquiries</option>
                    <option>Advertising & Press</option>
                    <option>Affiliate & Partnership</option>
                    <option>Technical Support</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em] ml-1">Your Message</label>
                  <textarea 
                    required
                    className="w-full bg-slate-50 border border-slate-200 min-h-[160px] rounded-[2rem] p-6 font-bold text-slate-900 focus:bg-white focus:border-indigo-600 outline-none transition-all resize-none"
                    placeholder="How can we help you today?"
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                  />
                </div>

                <div className="flex justify-center pt-4">
                  <button 
                    disabled={submitting}
                    className="w-full md:w-auto bg-slate-900 text-white min-w-[280px] h-16 rounded-[2rem] font-black text-xs uppercase tracking-[0.2em] hover:bg-indigo-600 hover:scale-[1.02] active:scale-95 disabled:bg-slate-400 disabled:scale-100 transition-all flex items-center justify-center gap-3 shadow-xl shadow-slate-200"
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        Send Message
                      </>
                    )}
                  </button>
                </div>

                <p className="text-[10px] text-center text-slate-400 font-bold leading-relaxed px-8">
                  By clicking send, you agree to our <a href="/terms" className="text-indigo-600">Terms of Service</a>. 
                  We process data in accordance with <a href="/privacy" className="text-indigo-600">Privacy Policy</a>.
                </p>
              </form>
            )}
          </div>
        </section>
      </div>
    </ContentPageLayout>
  );
}
