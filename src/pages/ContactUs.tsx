import React, { useState, useEffect } from 'react';
import { Mail, Phone, MessageSquare, MapPin, Send, CheckCircle2, Loader2, Info } from 'lucide-react';
import ContentPageLayout from '../components/ContentPageLayout';
import { toast } from 'react-hot-toast';

export default function ContactUs() {
  const [dbPage, setDbPage] = useState<any>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    department: 'General Inquiries',
    message: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    fetch('/api/pages/contact')
      .then(res => res.json())
      .then(data => {
        if (data && data.content) setDbPage(data);
      })
      .catch(console.warn);
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
      const data = await res.json();
      if (res.ok) {
        setSubmitted(true);
        toast.success(data.message);
      } else {
        toast.error(data.error || "Failed to submit request");
      }
    } catch (err) {
      toast.error("Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <ContentPageLayout
      title={dbPage ? dbPage.title : "Contact & Support"}
      subtitle={dbPage ? dbPage.seo_description : "Connecting you with the experts behind the curation. We're here to help you shop smarter."}
      icon={MessageSquare}
      image="/src/assets/images/uk_help_center_elite_1781929005642.jpg"
      lastUpdated={new Date().toLocaleDateString('en-GB')}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Left Side: Info */}
        <div className="space-y-12">
          <section>
             <h2 className="text-3xl font-black mb-6 tracking-tight">Direct Channels</h2>
             <p className="text-lg text-slate-600 font-medium leading-relaxed mb-8">
               Our London-based team of curators and support specialists are available during business hours to assist with any platform or partnership inquiries.
             </p>

             <div className="space-y-6">
                <div className="flex items-center gap-6 p-6 bg-white border border-slate-100 shadow-sm rounded-[2rem] group hover:shadow-md transition-all">
                   <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600 group-hover:scale-110 transition-transform">
                      <Mail className="w-6 h-6" />
                   </div>
                   <div>
                      <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest leading-none mb-1">Email Support</p>
                      <a href="mailto:support@ukstander.shop" className="text-slate-900 font-black hover:text-indigo-600 transition-colors">support@ukstander.shop</a>
                   </div>
                </div>

                <div className="flex items-center gap-6 p-6 bg-white border border-slate-100 shadow-sm rounded-[2rem] group hover:shadow-md transition-all">
                   <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600 group-hover:scale-110 transition-transform">
                      <Phone className="w-6 h-6" />
                   </div>
                   <div>
                      <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest leading-none mb-1">Phone Line</p>
                      <a href="tel:+442079460958" className="text-slate-900 font-black hover:text-emerald-600 transition-colors">+44 20 7946 0958</a>
                   </div>
                </div>

                <div className="flex items-center gap-6 p-6 bg-white border border-slate-100 shadow-sm rounded-[2rem] group hover:shadow-md transition-all">
                   <div className="w-12 h-12 bg-slate-900 rounded-2xl flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                      <MapPin className="w-6 h-6" />
                   </div>
                   <div>
                      <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest leading-none mb-1">Office HQ</p>
                      <p className="text-slate-900 font-black">Canary Wharf, London, E14 5AB</p>
                   </div>
                </div>
             </div>
          </section>

          <section className="p-8 bg-slate-50 border border-slate-100 rounded-[2.5rem]">
             <div className="flex items-center gap-3 mb-4 text-indigo-600">
                <Info className="w-5 h-5" />
                <h3 className="text-sm font-black uppercase tracking-widest m-0">Business Hours</h3>
             </div>
             <p className="text-sm text-slate-500 font-medium leading-relaxed mb-4">
                Our team is active Monday to Friday, 09:00 - 17:30 GMT. We aim to respond to all written inquiries within 24 business hours.
             </p>
             <div className="px-4 py-2 bg-white rounded-xl inline-block border border-slate-200 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                Currently Open
             </div>
          </section>
        </div>

        {/* Right Side: Form */}
        <div className="bg-white border border-slate-200 rounded-[3.5rem] p-8 lg:p-12 shadow-sm relative">
           {submitted ? (
             <div className="h-full flex flex-col items-center justify-center text-center animate-in fade-in zoom-in duration-500">
                <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mb-8">
                   <CheckCircle2 className="w-10 h-10 text-emerald-600" />
                </div>
                <h2 className="text-3xl font-black mb-4">Message Received</h2>
                <p className="text-slate-500 font-medium mb-8">
                  Your inquiry has been logged in our secure processing system. A member of our specialist team will be in touch shortly.
                </p>
                <button 
                  onClick={() => setSubmitted(false)}
                  className="bg-indigo-600 text-white px-8 py-3 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-indigo-700 hover:scale-105 transition-all"
                >
                  Send Another Inquiry
                </button>
             </div>
           ) : (
             <form onSubmit={handleSubmit} className="space-y-8">
               <h2 className="text-3xl font-black tracking-tight mb-8">Submit an Inquiry</h2>
               
               <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em] ml-1">Your Full Name</label>
                    <input 
                      type="text" 
                      required
                      className="w-full bg-slate-50 border border-slate-200 h-14 rounded-2xl px-6 font-bold text-slate-900 focus:bg-white focus:border-indigo-600 focus:shadow-[0_0_0_4px_rgba(79,70,229,0.1)] outline-none transition-all"
                      placeholder="e.g. James Smith"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em] ml-1">Email Address</label>
                    <input 
                      type="email" 
                      required
                      className="w-full bg-slate-50 border border-slate-200 h-14 rounded-2xl px-6 font-bold text-slate-900 focus:bg-white focus:border-indigo-600 focus:shadow-[0_0_0_4px_rgba(79,70,229,0.1)] outline-none transition-all"
                      placeholder="james@example.co.uk"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em] ml-1">Department</label>
                    <select 
                      className="w-full bg-slate-50 border border-slate-200 h-14 rounded-2xl px-6 font-bold text-slate-900 focus:bg-white focus:border-indigo-600 outline-none transition-all appearance-none"
                      value={formData.department}
                      onChange={(e) => setFormData({...formData, department: e.target.value})}
                    >
                      <option>General Inquiries</option>
                      <option>Advertising & Affiliate</option>
                      <option>Data Rights & GDPR</option>
                      <option>Curation Feedback</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em] ml-1">How can we help?</label>
                    <textarea 
                      required
                      className="w-full bg-slate-50 border border-slate-200 min-h-[150px] rounded-[2rem] p-6 font-bold text-slate-900 focus:bg-white focus:border-indigo-600 outline-none transition-all resize-none"
                      placeholder="Describe your inquiry in detail..."
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                    />
                  </div>
               </div>

               <button 
                 disabled={submitting}
                 className="w-full bg-indigo-600 text-white h-16 rounded-[2rem] font-black text-xs uppercase tracking-[0.2em] hover:bg-slate-900 hover:scale-[1.02] active:scale-95 disabled:bg-slate-400 disabled:scale-100 transition-all flex items-center justify-center gap-3 shadow-xl shadow-indigo-100"
               >
                 {submitting ? (
                   <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Processing...
                   </>
                 ) : (
                   <>
                    <Send className="w-4 h-4" />
                    Submit Secure Request
                   </>
                 )}
               </button>

               <p className="text-[10px] text-center text-slate-400 font-bold leading-relaxed px-8">
                 By submitting this form, you acknowledge that your data will be processed according to our <a href="/privacy" className="text-indigo-600 underline">Privacy Policy</a>.
               </p>
             </form>
           )}
        </div>
      </div>
    </ContentPageLayout>
  );
}
