import React from 'react';
import MainLayout from './MainLayout';
import { m as motion } from 'motion/react';
import { Helmet } from 'react-helmet-async';
import { LucideIcon } from 'lucide-react';

interface ContentPageLayoutProps {
  title: string;
  subtitle?: string;
  icon?: LucideIcon;
  image?: string;
  children: React.ReactNode;
  lastUpdated?: string;
}

export default function ContentPageLayout({ 
  title, 
  subtitle, 
  icon: Icon, 
  image, 
  children, 
  lastUpdated 
}: ContentPageLayoutProps) {
  return (
    <MainLayout>
      <Helmet>
        <title>{title} | UKStander</title>
        <meta name="description" content={subtitle || `Read our ${title} on UKStander.`} />
      </Helmet>

      <div className="min-h-screen bg-[#F8FAFC]">
        {/* Hero Section */}
        <div className="relative h-[300px] md:h-[400px] w-full overflow-hidden flex items-center justify-center">
          {image ? (
            <img 
              src={image} 
              alt={title} 
              className="absolute inset-0 w-full h-full object-cover brightness-[0.4]"
              referrerPolicy="no-referrer"
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-[#0B192C] to-[#012169]" />
          )}
          
          <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {Icon && (
                <div className="inline-flex p-3 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 mb-6 group-hover:scale-110 transition-transform">
                  <Icon className="w-8 h-8 text-white shadow-sm" />
                </div>
              )}
              <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight leading-tight mb-4 drop-shadow-xl">
                {title}
              </h1>
              {subtitle && (
                <p className="text-lg md:text-xl text-slate-200 font-medium max-w-2xl mx-auto drop-shadow-lg">
                  {subtitle}
                </p>
              )}
            </motion.div>
          </div>
        </div>

        {/* Content Section */}
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 -mt-12 relative z-20">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white border border-slate-200 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] p-8 md:p-16"
          >
            {lastUpdated && (
              <div className="mb-10 pb-6 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                  Last Updated: {lastUpdated}
                </span>
                <div className="flex items-center gap-2 px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full border border-indigo-100/50">
                  <div className="w-1.5 h-1.5 bg-indigo-600 rounded-full animate-pulse" />
                  <span className="text-[10px] font-bold uppercase tracking-wider">Official Policy</span>
                </div>
              </div>
            )}

            <div className="prose prose-slate prose-lg max-w-none prose-headings:font-black prose-headings:tracking-tight prose-headings:text-slate-900 prose-p:text-slate-600 prose-p:leading-relaxed prose-strong:text-slate-900 prose-a:text-indigo-600 prose-a:no-underline hover:prose-a:underline">
              {children}
            </div>

            {/* Amazon Affiliate Disclaimer Footer for Policy Pages */}
            <div className="mt-16 pt-8 border-t border-slate-100">
              <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200/60">
                <p className="text-xs text-slate-500 leading-relaxed italic font-medium">
                   <strong>Disclosure:</strong> As an Amazon Associate, UKStander earns from qualifying purchases made through links on this platform. This support allows us to maintain our high-quality curation standards and provide our services free of charge to UK consumers. All product information and prices are correct at the time of publication but are subject to change by the retailer.
                </p>
              </div>
            </div>
          </motion.div>
        </main>
      </div>
    </MainLayout>
  );
}
