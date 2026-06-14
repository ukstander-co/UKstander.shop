import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Lottie from 'lottie-react';

const LOADING_3D_URL = "https://lottie.host/de84c6c0-6d9b-4e14-87f5-a3d24263673f/4Zl5YV0Q1N.json";

interface AuthLoadingOverlayProps {
  isVisible: boolean;
  message?: string;
}

export default function AuthLoadingOverlay({ isVisible, message = "Authenticating" }: AuthLoadingOverlayProps) {
  const [animationData, setAnimationData] = useState<any>(null);

  useEffect(() => {
    if (isVisible) {
      fetch(LOADING_3D_URL)
        .then(res => res.json())
        .then(setAnimationData)
        .catch(() => console.warn("Lottie loading failed for overlay"));
    }
  }, [isVisible]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#0B192C]/95 backdrop-blur-md"
        >
          <motion.div 
            initial={{ scale: 0.8, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            className="w-64 h-64 relative flex flex-col items-center justify-center text-center"
          >
            {animationData ? (
              <Lottie 
                animationData={animationData} 
                loop 
                className="w-full h-full"
              />
            ) : (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-32 h-32 border-4 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin shadow-[0_0_30px_rgba(99,102,241,0.3)]" />
                </div>
            )}
            
            <div className="mt-8 space-y-2">
              <p className="text-white font-black text-sm uppercase tracking-[0.4em] animate-pulse">{message}</p>
              <div className="flex gap-1 justify-center">
                 <div className="w-1 h-1 bg-indigo-500 rounded-full animate-bounce delay-0" />
                 <div className="w-1 h-1 bg-indigo-500 rounded-full animate-bounce delay-150" />
                 <div className="w-1 h-1 bg-indigo-500 rounded-full animate-bounce delay-300" />
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
