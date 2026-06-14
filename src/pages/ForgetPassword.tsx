import React, { useState, useEffect } from 'react';
import { Mail, ArrowLeft, Send, ShoppingBag, ShieldCheck } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Helmet } from 'react-helmet-async';
import { toast } from 'react-hot-toast';
import Lottie from 'lottie-react';
import Footer from '../components/Footer';
import AuthLoadingOverlay from '../components/AuthLoadingOverlay';

const ANIM_URL = "https://lottie.host/5053cfb5-6a56-4c54-a69c-29369f69741e/kZk7B1AEmI.json";

export default function ForgetPassword() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [animationData, setAnimationData] = useState<any>(null);

  useEffect(() => {
    fetch(ANIM_URL)
      .then(res => {
        if (!res.ok) throw new Error('Fetch failed');
        const contentType = res.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
          return res.json();
        }
        throw new Error('Not JSON');
      })
      .then(setAnimationData)
      .catch((err) => {
        console.warn("Lottie loading failed, using fallback icon", err);
      });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setStatus('loading');
    
    try {
      const response = await fetch('/api/auth/forget-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(data.message || 'Recovery link dispatched!', {
          duration: 4000,
          style: {
            borderRadius: '1rem',
            background: '#0B192C',
            color: '#fff',
            fontSize: '12px'
          }
        });
        setStatus('success');
      } else {
        toast.error(data.error || 'Node not found', {
          style: {
             borderRadius: '1rem',
             fontSize: '12px'
          }
        });
        setStatus('error');
      }
    } catch (error) {
      console.error("Submission failed", error);
      toast.error('Protocol Sync Failed');
      setStatus('error');
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFDFD] flex flex-col font-sans overflow-hidden text-slate-900">
      <AuthLoadingOverlay isVisible={status === 'loading'} message="Encrypting Protocol" />
      <Helmet>
        <title>Account Recovery | UKStander - Synchronize Authentication</title>
        <meta name="description" content="Recover your authentication protocol. Enter your email to receive secure account synchronization credentials." />
        <meta name="keywords" content="UKStander account recovery, forgot password, authentication sync, secure reset protocol" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ForgotPasswordPage",
            "name": "UKStander Password Recovery",
            "description": "Recovery portal for ukstander authentication secrets.",
            "mainEntity": {
              "@type": "WebForm",
              "name": "Recovery Form",
              "action": "/api/auth/forget-password"
            }
          })}
        </script>
      </Helmet>

      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-2/3 h-2/3 bg-indigo-50/50 rounded-full blur-[150px] -mr-48 -mt-48" />
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-emerald-50/50 rounded-full blur-[120px] -ml-32 -mb-32" />
        <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'linear-gradient(#0B192C 0.5px, transparent 0.5px), linear-gradient(90deg, #0B192C 0.5px, transparent 0.5px)', backgroundSize: '60px 60px' }} />
      </div>

      <div className="flex-1 flex flex-col justify-center items-center p-6 relative z-10 pt-12 md:pt-16">
        <motion.div
           initial={{ opacity: 0, scale: 0.95, y: 30 }}
           animate={{ opacity: 1, scale: 1, y: 0 }}
           transition={{ duration: 0.8 }}
           className="w-full max-w-[420px]"
        >
          {/* Main 3D Card */}
          <div className="bg-white border border-slate-100 rounded-[2.5rem] shadow-[0_40px_100px_rgba(0,0,0,0.06)] overflow-hidden relative">
            <div className="h-1.5 bg-gradient-to-r from-[#0B192C] via-indigo-500 to-[#0B192C] w-full" />
            
            <div className="p-8 pb-4 text-center">
              <motion.div 
                whileHover={{ scale: 1.1, rotate: 10 }}
                className="w-20 h-20 bg-[#0B192C] rounded-[1.8rem] flex items-center justify-center mx-auto mb-6 shadow-xl"
              >
                {animationData ? (
                   <Lottie animationData={animationData} className="w-12 h-12" />
                ) : (
                  <ShoppingBag className="w-10 h-10 text-white" />
                )}
              </motion.div>
              <h1 className="text-3xl font-black text-[#0B192C] tracking-tighter font-display mb-3 leading-tight">Access Recovery</h1>
              <p className="text-slate-400 font-bold uppercase tracking-[0.2em] text-[8px] leading-relaxed px-4">
                Enter authorized email to synchronize new security credentials.
              </p>
            </div>

            {status === 'success' ? (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="px-8 pb-10 text-center space-y-6"
              >
                <div className="bg-emerald-50 text-emerald-700 p-6 rounded-[1.5rem] border-2 border-emerald-100 font-black text-[10px] uppercase tracking-[0.2em] leading-loose shadow-sm">
                  The recovery link has been dispatched to your verified node.
                </div>
                <Link to="/login" className="flex items-center justify-center gap-2 text-indigo-600 font-black text-[10px] uppercase tracking-[0.2em] hover:gap-3 transition-all group">
                   <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" /> Return to Login
                </Link>
              </motion.div>
            ) : (
              <form 
                onSubmit={handleSubmit} 
                className="px-8 pb-10 space-y-8"
                aria-label="Account Recovery Request"
              >
                <div className="space-y-2">
                  <label htmlFor="email" className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 px-2 font-display">Target Email</label>
                  <div className="relative group/field">
                    <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-slate-300 group-focus-within/field:text-indigo-600 transition-colors" />
                    <input 
                      id="email"
                      type="email"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      required
                      placeholder="uk@curation.com"
                      aria-label="Recovery Email Address"
                      className="w-full bg-slate-50 border-2 border-transparent rounded-xl py-4.5 pl-12 pr-6 text-sm font-bold text-slate-800 focus:bg-white focus:outline-none focus:border-indigo-500/20 focus:ring-4 focus:ring-indigo-500/5 transition-all outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-5">
                  <button 
                    disabled={status === 'loading'}
                    aria-label={status === 'loading' ? 'Processing' : 'Send Reset Link'}
                    className="w-full bg-[#0B192C] text-white py-4.5 rounded-[1.8rem] font-black text-[10px] uppercase tracking-[0.3em] flex items-center justify-center gap-3 shadow-[0_15px_30px_rgba(11,25,44,0.3)] hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50 cursor-pointer group/btn"
                  >
                    <span className="group-hover:mr-2 transition-all">
                      {status === 'loading' ? 'Encrypting...' : 'Dispatch Link'}
                    </span>
                    <Send className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                  </button>
                  <Link to="/login" className="w-full flex justify-center py-2 text-[9px] font-black text-slate-400 uppercase tracking-widest hover:text-indigo-600 transition-colors">
                     Back to Auth Node
                  </Link>
                </div>
              </form>
            )}

            <div className="bg-[#0B192C] p-6 flex items-center justify-center gap-6 border-t border-white/5 relative overflow-hidden">
               <div className="absolute inset-0 bg-indigo-500/5 pointer-events-none" />
               <ShieldCheck className="w-4 h-4 text-indigo-400 relative z-10" />
               <span className="text-[9px] font-black text-white uppercase tracking-[0.2em] relative z-10">Advanced Recovery Sequence</span>
            </div>
          </div>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
}
