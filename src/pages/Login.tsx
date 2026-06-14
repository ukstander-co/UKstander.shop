import React, { useState, useEffect } from 'react';
import { Lock, Mail, ArrowRight, UserPlus, ShoppingBag, ShieldCheck, Sparkles } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Helmet } from 'react-helmet-async';
import { toast } from 'react-hot-toast';
import Lottie from 'lottie-react';
import Footer from '../components/Footer';
import AuthLoadingOverlay from '../components/AuthLoadingOverlay';
// @ts-ignore
import ukstanderAffiliateBg from '../assets/images/ukstander_affiliate_bg_1781414243307.jpg';

const LOGIN_ANIM_URL = "https://lottie.host/5053cfb5-6a56-4c54-a69c-29369f69741e/kZk7B1AEmI.json";

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [animationData, setAnimationData] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(LOGIN_ANIM_URL)
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
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();
      
      if (response.ok) {
        toast.success('Access Granted. Synchronizing node...', {
           duration: 2000,
           icon: '⚡',
           style: {
             borderRadius: '1rem',
             background: '#0B192C',
             color: '#fff',
             fontWeight: 'bold',
             fontSize: '12px',
             textTransform: 'uppercase',
             letterSpacing: '0.1em'
           },
        });

        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));

        setTimeout(() => {
          if (data.user.role === 'admin') {
            navigate('/admin');
          } else {
            navigate('/user');
          }
        }, 1500);
      } else {
        toast.error(data.error || 'Authentication Failed', {
          style: {
            borderRadius: '1rem',
            background: '#fff',
            color: '#0B192C',
            fontWeight: 'bold',
            fontSize: '12px',
            border: '2px solid #fee2e2'
          }
        });
      }
    } catch (error) {
      console.error('Error logging in:', error);
      toast.error('Node Connection Error');
    } finally {
      // Keep it true for a bit longer to show the fancy animation
      setTimeout(() => setIsSubmitting(false), 1000);
    }
  };

  return (
    <div className="h-screen w-full max-h-screen overflow-hidden bg-[#FDFDFD] flex flex-col justify-between font-sans relative">
      <AuthLoadingOverlay isVisible={isSubmitting} message="Authenticating Node" />

      <Helmet>
        <title>Login | UKStander - Premium Curation Node</title>
        <meta name="description" content="Securely sign in to UKStander to access your premium UK shopping curation dashboard and exclusive regional deals." />
        <meta name="keywords" content="UKStander login, secure shopping access, UK deals dashboard, authentic shopping node" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LoginPage",
            "name": "UKStander Login",
            "description": "Secure access portal for UKStander premium members.",
            "mainEntity": {
              "@type": "WebForm",
              "name": "Login Form",
              "action": "/api/auth/login"
            }
          })}
        </script>
      </Helmet>

      {/* Dynamic Background Elements */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-2/3 h-2/3 bg-indigo-50/40 rounded-full blur-[150px] -mr-48 -mt-48" />
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-emerald-50/40 rounded-full blur-[120px] -ml-32 -mb-32" />
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#0B192C 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      </div>

      <div className="flex-1 flex items-center justify-center p-4 relative z-10 w-full max-w-6xl mx-auto overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 w-full gap-8 lg:gap-12 items-center">
          
          {/* Logo, Branding and 3D Affiliate Network Layout */}
          <motion.div 
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="hidden lg:flex lg:col-span-6 flex-col justify-center items-start text-left space-y-6"
          >
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 bg-emerald-50 text-emerald-600 text-[10px] font-black uppercase tracking-[0.2em] rounded-full border border-emerald-100">
                UK Affiliate Link
              </span>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            </div>
            
            <div className="space-y-2">
              <h2 className="text-3xl xl:text-4xl font-black text-[#0B192C] tracking-tight leading-tight font-display">
                Modern E-Commerce <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-indigo-600">Affiliate System</span>
              </h2>
              <p className="text-slate-500 text-sm font-medium max-w-md">
                Securely trade, sync products, and analyze UK stander merchant transactions dynamically through our unified API node.
              </p>
            </div>

            {/* Glossy 3D Asset Frame */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
              className="relative w-full aspect-[4/3] max-w-[400px] rounded-3xl overflow-hidden border border-slate-100 shadow-[0_30px_60px_rgba(0,0,0,0.06)] bg-white p-2 self-start"
            >
              <img 
                src={ukstanderAffiliateBg} 
                alt="UKStander Affiliate Node Graphic" 
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover rounded-2xl select-none"
              />
              {/* Inner floating widget */}
              <div className="absolute bottom-5 left-5 right-5 bg-slate-900/90 backdrop-blur-md rounded-2xl p-4 flex items-center justify-between text-white border border-white/10 shadow-2xl">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center border border-emerald-500/30">
                    <ShieldCheck className="w-4.5 h-4.5 text-emerald-400" />
                  </div>
                  <div>
                    <h5 className="text-[10px] text-slate-300 font-extrabold tracking-widest leading-none">Live Connection</h5>
                    <p className="text-[11px] font-bold text-white mt-1 leading-none">uk-stander-secure-node</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-[8px] font-bold tracking-widest text-[#012169] bg-white rounded px-1.5 py-0.5 uppercase leading-none">UK Tier-1</span>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Secure Login Panel */}
          <div className="col-span-1 lg:col-span-6 flex justify-center items-center w-full">
            <motion.div
               initial={{ opacity: 0, scale: 0.9, y: 40 }}
               animate={{ opacity: 1, scale: 1, y: 0 }}
               transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
               className="w-full max-w-[390px]"
            >
          {/* Main 3D Card */}
          <div className="group bg-white border border-slate-100 rounded-[2rem] shadow-[0_30px_80px_rgba(0,0,0,0.06)] overflow-hidden relative">
            {/* Top Accent Bar */}
            <div className="h-1.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-emerald-500 w-full" />
            
            <div className="p-6 pb-2 text-center">
              <motion.div 
                whileHover={{ scale: 1.05, rotate: 3 }}
                className="w-14 h-14 bg-[#0B192C] rounded-[1.2rem] flex items-center justify-center mx-auto mb-3 shadow-[0_15px_30px_rgba(11,25,44,0.2)]"
              >
                {animationData ? (
                  <Lottie animationData={animationData} loop={true} className="w-8 h-8" />
                ) : (
                  <ShoppingBag className="w-7 h-7 text-white" />
                )}
              </motion.div>
              
              <div className="space-y-1">
                <h1 className="text-2xl font-black text-[#0B192C] tracking-tighter font-display leading-tight">Welcome</h1>
                <p className="text-slate-400 font-bold uppercase tracking-[0.2em] text-[8px]">Access Premium UK Curation</p>
              </div>
            </div>

            {/* Form Area */}
            <form 
              onSubmit={handleSubmit} 
              className="px-6 pb-6 space-y-4"
              aria-label="Secure Account Login"
            >
              <div className="space-y-3">
                <div className="space-y-1">
                  <label htmlFor="email" className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 px-1">Identification</label>
                  <div className="relative group/field">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 group-focus-within/field:text-indigo-600 transition-colors" />
                    <input 
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      placeholder="uk@ukstander.uk"
                      aria-label="Account Email"
                      className="w-full bg-slate-50 border-2 border-transparent rounded-xl py-3 pl-11 pr-5 text-sm font-bold text-slate-800 focus:bg-white focus:outline-none focus:border-indigo-500/20 focus:ring-4 focus:ring-indigo-500/5 transition-all outline-none placeholder:text-slate-300 shadow-inner"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between items-center px-1">
                    <label htmlFor="password" className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400">Security Key</label>
                    <Link to="/forget-password" title="Recover access" className="text-[8.5px] font-black text-indigo-500 uppercase tracking-widest hover:text-indigo-700 transition-all underline-offset-4">Forgot Access?</Link>
                  </div>
                  <div className="relative group/field">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 group-focus-within/field:text-indigo-600 transition-colors" />
                    <input 
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      placeholder="••••••••"
                      aria-label="Secure Password"
                      className="w-full bg-slate-50 border-2 border-transparent rounded-xl py-3 pl-11 pr-5 text-sm font-bold text-slate-800 focus:bg-white focus:outline-none focus:border-indigo-500/20 focus:ring-4 focus:ring-indigo-500/5 transition-all outline-none placeholder:text-slate-300 shadow-inner"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <button 
                  type="submit"
                  disabled={isSubmitting}
                  aria-label={isSubmitting ? 'Authenticating' : 'Sign In'}
                  className="w-full bg-[#0B192C] text-white py-3 rounded-[1.2rem] font-black text-[9px] uppercase tracking-[0.3em] flex items-center justify-center gap-2 shadow-[0_12px_24px_rgba(11,25,44,0.25)] hover:shadow-[0_18px_32px_rgba(11,25,44,0.35)] hover:bg-slate-800 hover:scale-[1.01] active:scale-95 transition-all disabled:opacity-50 cursor-pointer group/btn"
                >
                  <span className="group-hover:mr-1.5 transition-all">
                    {isSubmitting ? 'Authenticating...' : 'Commence Session'}
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </button>
                
                <div className="flex items-center gap-3">
                  <div className="h-px bg-slate-100 flex-1" />
                  <span className="text-[8px] font-black text-slate-300 uppercase tracking-[0.3em]">OR</span>
                  <div className="h-px bg-slate-100 flex-1" />
                </div>

                <Link 
                  to="/signup" 
                  aria-label="Create New Account"
                  className="w-full flex items-center justify-center gap-3 py-3 rounded-[1.2rem] border-2 border-slate-50 text-slate-400 font-extrabold text-[9px] uppercase tracking-[0.2em] hover:bg-slate-50 hover:text-indigo-600 transition-all cursor-pointer shadow-sm"
                >
                  Create New Protocol <UserPlus className="w-3.5 h-3.5" />
                </Link>
              </div>
            </form>

            {/* Verification Footer */}
            <div className="bg-[#0B192C] p-4 px-6 flex items-center justify-between gap-4 border-t border-white/5 relative overflow-hidden">
               <div className="absolute inset-0 bg-indigo-500/5 pointer-events-none" />
               <div className="flex items-center gap-3 relative z-10">
                 <div className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center border border-white/10 shadow-lg">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shadow-glow" />
                 </div>
                 <div className="flex flex-col">
                   <span className="text-[8.5px] font-black text-white uppercase tracking-widest">TLS 1.3 Secure</span>
                   <span className="text-[7.5px] font-bold text-slate-500 uppercase tracking-widest">UK Regional Node</span>
                 </div>
               </div>
               <div className="flex items-center gap-2 relative z-10 opacity-50 hover:opacity-100 transition-opacity">
                 <Sparkles className="w-3 h-3 text-emerald-400" />
               </div>
            </div>
          </div>
        </motion.div>
          </div>
        </div>
      </div>

      <Footer minimal />
    </div>
  );
}
