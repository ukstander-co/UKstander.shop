import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Lottie from 'lottie-react';
import { ShoppingBag } from 'lucide-react';

// Using a high-quality shopping/loading animation from a stable CDN
const LOADING_LOTTIE_URL = "https://lottie.host/5053cfb5-6a56-4c54-a69c-29369f69741e/kZk7B1AEmI.json";

export default function SplashScreen({ onComplete }: { onComplete: () => void }) {
  const [animationData, setAnimationData] = useState<any>(null);

  useEffect(() => {
    fetch(LOADING_LOTTIE_URL)
      .then(res => {
        if (!res.ok) throw new Error('Fetch failed');
        const contentType = res.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
          return res.json();
        }
        throw new Error('Not JSON');
      })
      .then(data => setAnimationData(data))
      .catch((err) => {
        console.warn("Lottie loading failed, using fallback icon", err);
      });

    const timer = setTimeout(() => {
      onComplete();
    }, 2500); // Show for 2.5 seconds

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.1, filter: 'blur(10px)' }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className="fixed inset-0 z-[9999] bg-[#0B192C] flex flex-col items-center justify-center overflow-hidden"
    >
      {/* 3D Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-5%] w-[40%] h-[40%] bg-indigo-600/20 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-5%] w-[50%] h-[50%] bg-emerald-500/10 blur-[150px] rounded-full animate-pulse delay-700" />
      </div>

      <div className="relative z-10 flex flex-col items-center">
        <motion.div
          initial={{ y: 20, opacity: 0, scale: 0.8 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="w-48 h-48 md:w-64 md:h-64"
        >
          {animationData ? (
             <Lottie animationData={animationData} loop={true} />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
               <ShoppingBag className="w-24 h-24 text-indigo-500 animate-bounce" />
            </div>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="mt-8 text-center"
        >
          <h1 className="text-4xl md:text-5xl font-black tracking-tighter text-white mb-2">
            UK<span className="text-indigo-500">Stander</span>
          </h1>
          <p className="text-slate-400 font-bold uppercase tracking-[0.3em] text-[10px]">
            Premium Curation Engine
          </p>
        </motion.div>

        {/* 3D Progress Bar */}
        <div className="mt-12 w-48 h-1 bg-white/10 rounded-full overflow-hidden border border-white/5 shadow-[0_0_15px_rgba(99,102,241,0.3)]">
           <motion.div 
             initial={{ x: '-100%' }}
             animate={{ x: '0%' }}
             transition={{ duration: 2, ease: "easeInOut" }}
             className="w-full h-full bg-gradient-to-r from-indigo-500 to-emerald-400 shadow-[0_0_10px_rgba(99,102,241,0.8)]" 
           />
        </div>
      </div>
    </motion.div>
  );
}
