import React, { useState, useEffect } from 'react';
import { Lock, Mail, User, ArrowRight, LogIn, ShoppingBag, ShieldCheck, Sparkles, TrendingUp } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Helmet } from 'react-helmet-async';
import { toast } from 'react-hot-toast';
import Lottie from 'lottie-react';
import Footer from '../components/Footer';
import AuthLoadingOverlay from '../components/AuthLoadingOverlay';

const SIGNUP_ANIM_URL = "https://lottie.host/5053cfb5-6a56-4c54-a69c-29369f69741e/kZk7B1AEmI.json";

export default function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [animationData, setAnimationData] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(SIGNUP_ANIM_URL)
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
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password })
      });

      const data = await response.json();
      
      if (response.ok) {
        toast.success('Protocol Initiated. Welcome to the Node.', {
          duration: 3000,
          icon: '💎',
          style: {
            borderRadius: '1rem',
            background: '#059669',
            color: '#fff',
            fontWeight: 'bold',
            fontSize: '12px',
            textTransform: 'uppercase',
            letterSpacing: '0.1em'
          },
        });
        setTimeout(() => navigate('/login'), 2000);
      } else {
        toast.error(data.error || 'Registration failed', {
           style: {
             borderRadius: '1rem',
             fontWeight: 'bold',
             fontSize: '12px'
           }
        });
      }
    } catch (error) {
      console.error('Error signing up:', error);
      toast.error('An error occurred during registration.');
    } finally {
      setTimeout(() => setIsSubmitting(false), 1000);
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFDFD] flex flex-col font-sans overflow-hidden">
      <AuthLoadingOverlay isVisible={isSubmitting} message="Initializing Protocol" />
      <Helmet>
        <title>Create Account | UKStander - Join the Curation Hub</title>
        <meta name="description" content="Join UKStander today. Create a secure account to access the most advanced UK deal curation engine and regional shopping nodes." />
        <meta name="keywords" content="UKStander signup, join UK shopping network, regional deal access, create shopping node" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "RegisterPage",
            "name": "UKStander Signup",
            "description": "Registration portal for becoming a UKStander member.",
            "mainEntity": {
              "@type": "WebForm",
              "name": "Registration Form",
              "action": "/api/auth/signup"
            }
          })}
        </script>
      </Helmet>

      {/* Dynamic Background Elements */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-2/3 h-2/3 bg-emerald-50/40 rounded-full blur-[150px] -ml-40 -mt-40 opacity-60" />
        <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-indigo-50/40 rounded-full blur-[120px] -mr-32 -mb-32 opacity-60" />
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#0B192C 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
      </div>

      <div className="flex-1 flex flex-col justify-center items-center p-6 relative z-10 pt-12 md:pt-16">
        <motion.div
           initial={{ opacity: 0, scale: 0.95, y: 30 }}
           animate={{ opacity: 1, scale: 1, y: 0 }}
           transition={{ duration: 0.8 }}
           className="w-full max-w-[460px]"
        >
          {/* Main 3D Card */}
          <div className="bg-white border border-slate-100 rounded-[2.5rem] shadow-[0_40px_100px_rgba(0,0,0,0.06)] overflow-hidden">
            <div className="h-1.5 bg-gradient-to-r from-emerald-500 via-indigo-500 to-emerald-500 w-full" />
            
            <div className="p-8 pb-4 text-center">
               <motion.div 
                whileHover={{ y: -8, rotate: -3 }}
                className="w-20 h-20 bg-[#0B192C] rounded-[1.8rem] flex items-center justify-center mx-auto mb-6 shadow-[0_20px_40px_rgba(5,150,105,0.2)]"
              >
                {animationData ? (
                  <Lottie animationData={animationData} className="w-12 h-12" />
                ) : (
                  <ShoppingBag className="w-10 h-10 text-white" />
                )}
              </motion.div>
              
              <h1 className="text-3xl font-black text-[#0B192C] tracking-tighter font-display mb-2 leading-tight">Join UKStander</h1>
              <p className="text-slate-400 font-bold uppercase tracking-[0.2em] text-[8px]">Initialize Secure Shopping Protocol</p>
            </div>

            <form 
              onSubmit={handleSubmit} 
              className="px-8 pb-10 space-y-6"
              aria-label="Account Registration Form"
            >
              <div className="grid grid-cols-1 gap-5">
                <div className="space-y-1.5">
                  <label htmlFor="name" className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 px-2">Official Name</label>
                  <div className="relative group/field">
                    <User className="absolute left-5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-slate-300 group-focus-within/field:text-emerald-500 transition-colors" />
                    <input 
                      id="name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      placeholder="Jane Cooper"
                      aria-label="Full Name"
                      className="w-full bg-slate-50 border-2 border-transparent rounded-xl py-4 pl-12 pr-6 text-sm font-bold text-slate-800 focus:bg-white focus:outline-none focus:border-emerald-500/20 focus:ring-4 focus:ring-emerald-500/5 transition-all outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="email" className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 px-2">Account Email</label>
                  <div className="relative group/field">
                    <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-slate-300 group-focus-within/field:text-emerald-500 transition-colors" />
                    <input 
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      placeholder="hello@domain.co.uk"
                      aria-label="Email Address"
                      className="w-full bg-slate-50 border-2 border-transparent rounded-xl py-4 pl-12 pr-6 text-sm font-bold text-slate-800 focus:bg-white focus:outline-none focus:border-emerald-500/20 focus:ring-4 focus:ring-emerald-500/5 transition-all outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="password" className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 px-2">Authorization Secret</label>
                  <div className="relative group/field">
                    <Lock className="absolute left-5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-slate-300 group-focus-within/field:text-emerald-500 transition-colors" />
                    <input 
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      placeholder="••••••••"
                      aria-label="Secure Password"
                      className="w-full bg-slate-50 border-2 border-transparent rounded-xl py-4 pl-12 pr-6 text-sm font-bold text-slate-800 focus:bg-white focus:outline-none focus:border-emerald-500/20 focus:ring-4 focus:ring-emerald-500/5 transition-all outline-none"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-5">
                <button 
                  type="submit"
                  disabled={isSubmitting}
                  aria-label={isSubmitting ? 'Activating Account' : 'Activate Account'}
                  className="w-full bg-emerald-600 text-white py-4.5 rounded-[1.5rem] font-black text-[10px] uppercase tracking-[0.3em] flex items-center justify-center gap-3 shadow-[0_15px_30px_rgba(5,150,105,0.2)] hover:bg-emerald-700 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50 cursor-pointer group/btn"
                >
                  <span className="group-hover:mr-2 transition-all">
                    {isSubmitting ? 'Processing...' : 'Activate Account'}
                  </span>
                  <TrendingUp className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                </button>
                
                <div className="flex items-center gap-8">
                  <div className="h-px bg-slate-100 flex-1" />
                  <span className="text-[8px] font-black text-slate-300 uppercase tracking-[0.3em] text-center whitespace-nowrap">Already Registered?</span>
                  <div className="h-px bg-slate-100 flex-1" />
                </div>

                <Link 
                  to="/login" 
                  aria-label="Log in to existing account"
                  className="w-full flex items-center justify-center gap-3 py-4.5 rounded-[1.5rem] border-2 border-slate-50 text-slate-500 font-extrabold text-[10px] uppercase tracking-[0.2em] hover:bg-slate-50 transition-all cursor-pointer shadow-sm"
                >
                  Sign Into Existing Node <LogIn className="w-3.5 h-3.5 text-emerald-500" />
                </Link>
              </div>
            </form>

            <div className="bg-[#0B192C] p-6 flex items-center justify-center gap-6 border-t border-white/5 relative overflow-hidden">
               <div className="absolute inset-0 bg-emerald-500/5 pointer-events-none" />
               <div className="flex items-center gap-3 relative z-10">
                 <ShieldCheck className="w-4 h-4 text-emerald-500" />
                 <span className="text-[9px] font-black text-white uppercase tracking-widest text-center">Privacy First Protocol</span>
               </div>
               <div className="w-px h-6 bg-white/10 relative z-10" />
               <div className="flex items-center gap-3 relative z-10">
                 <Sparkles className="w-4 h-4 text-indigo-400" />
                 <span className="text-[9px] font-black text-white uppercase tracking-widest">UK Verified Node</span>
               </div>
            </div>
          </div>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
}
