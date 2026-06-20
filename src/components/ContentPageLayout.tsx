import React, { useEffect, useState } from 'react';
import MainLayout from './MainLayout';
import { m as motion, AnimatePresence } from 'motion/react';
import { Helmet } from 'react-helmet-async';
import { LucideIcon, ChevronRight, List, Info } from 'lucide-react';

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
  const [headings, setHeadings] = useState<{ id: string; text: string }[]>([]);

  useEffect(() => {
    const headingElements = document.querySelectorAll('main h2');
    const hData = Array.from(headingElements).map((el, i) => {
      const text = el.textContent || '';
      const id = el.id || `section-${i}`;
      el.id = id;
      return { id, text };
    });
    setHeadings(hData);
  }, [children]);

  return (
    <MainLayout>
      <Helmet>
        <title>{title} | UKStander Premium Curation</title>
        <meta name="description" content={subtitle || `Read our ${title} on UKStander. Expertly curated for the UK market.`} />
        <html lang="en-GB" />
      </Helmet>

      <div className="min-h-screen bg-[#FDFDFD]">
        {/* Elite Hero Header */}
        <div className="relative h-[40vh] min-h-[350px] w-full overflow-hidden flex items-end pb-20 px-4">
          {image ? (
            <motion.div 
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              transition={{ duration: 10, ease: "easeOut" }}
              className="absolute inset-0"
            >
              <img 
                src={image} 
                alt={title} 
                className="w-full h-full object-cover brightness-[0.35]"
                referrerPolicy="no-referrer"
              />
            </motion.div>
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-[#0B192C] via-[#012169] to-[#0B192C]" />
          )}
          
          <div className="absolute inset-0 bg-gradient-to-t from-[#FDFDFD] via-transparent to-transparent opacity-60" />

          <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-8">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="max-w-3xl"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="h-[2px] w-12 bg-[#febd69]" />
                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#febd69] drop-shadow-sm">UK Market Exclusive</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tighter leading-[0.9] mb-6">
                {title.split(' ').map((word, idx) => (
                  <span key={idx} className="inline-block mr-3 last:mr-0">{word}</span>
                ))}
              </h1>
              {subtitle && (
                <p className="text-lg md:text-xl text-slate-600 font-medium leading-relaxed max-w-2xl">
                  {subtitle}
                </p>
              )}
            </motion.div>

            {Icon && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8, rotate: -15 }}
                animate={{ opacity: 0.15, scale: 1, rotate: 0 }}
                transition={{ duration: 1.2, ease: "backOut" }}
                className="hidden lg:block"
              >
                <Icon className="w-64 h-64 text-slate-900" />
              </motion.div>
            )}
          </div>
        </div>

        {/* Content Utility Bar */}
        <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-y border-slate-100 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between overflow-x-auto no-scrollbar">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest whitespace-nowrap">
                <ChevronRight className="w-3 h-3 text-[#febd69]" /> Home
              </div>
              <div className="flex items-center gap-2 text-[10px] font-bold text-slate-900 uppercase tracking-widest whitespace-nowrap">
                <ChevronRight className="w-3 h-3 text-[#febd69]" /> {title}
              </div>
            </div>
            
            {lastUpdated && (
              <div className="flex items-center gap-4">
                <span className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] whitespace-nowrap">
                  Updated {lastUpdated}
                </span>
                <div className="h-6 w-[1px] bg-slate-100 hidden sm:block" />
                <div className="hidden sm:flex items-center gap-2 px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full border border-emerald-100/50">
                  <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                  <span className="text-[9px] font-black uppercase tracking-wider">Verified Policy</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Body Layout */}
        <div className="max-w-7xl mx-auto px-4 py-16 lg:py-24 grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Quick Navigation - Left Sticky */}
          <aside className="hidden lg:block lg:col-span-3 sticky top-32 h-fit">
            <div className="bg-slate-50 rounded-3xl p-8 border border-slate-100 shadow-sm">
              <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-6 flex items-center gap-2">
                <List className="w-3.5 h-3.5" /> Contents
              </h4>
              <nav className="space-y-4">
                {headings.map((h) => (
                  <a 
                    key={h.id}
                    href={`#${h.id}`}
                    className="block text-xs font-bold text-slate-600 hover:text-indigo-600 hover:translate-x-1 transition-all"
                  >
                    {h.text}
                  </a>
                ))}
              </nav>

              <div className="mt-10 pt-10 border-t border-slate-200">
                <div className="flex items-center gap-3 p-4 bg-indigo-600 rounded-2xl text-white">
                  <Info className="w-5 h-5 opacity-80" />
                  <span className="text-[9px] font-black uppercase tracking-widest leading-tight">Need specific help?</span>
                </div>
              </div>
            </div>
          </aside>

          {/* Main Article Content */}
          <main className="lg:col-span-9 max-w-4xl">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="prose prose-slate prose-xl max-w-none 
                prose-headings:font-black prose-headings:tracking-tighter prose-headings:text-slate-900 
                prose-h2:text-3xl prose-h2:mt-16 prose-h2:mb-8
                prose-p:text-slate-600 prose-p:leading-[1.8] prose-p:mb-8
                prose-strong:text-slate-900 prose-strong:font-black
                prose-a:text-indigo-600 prose-a:no-underline prose-a:font-black hover:prose-a:underline
                prose-ul:list-none prose-ul:pl-0 prose-li:relative prose-li:pl-8 
                prose-li:before:content-[''] prose-li:before:absolute prose-li:before:left-0 prose-li:before:top-[0.8em] 
                prose-li:before:w-2 prose-li:before:h-2 prose-li:before:bg-[#febd69] prose-li:before:rounded-full"
            >
              {children}
            </motion.div>

            {/* Affiliate Disclosure Card */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="mt-24 p-10 bg-[#0B192C] text-white rounded-[3rem] relative overflow-hidden group shadow-2xl"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl -mr-32 -mt-32 transition-all group-hover:bg-indigo-500/20" />
              
              <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">
                <div className="shrink-0 w-20 h-20 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/20">
                  <span className="text-3xl font-black text-[#febd69]">!</span>
                </div>
                <div>
                  <h5 className="text-lg font-black mb-3 text-[#febd69] tracking-tight">Amazon Affiliate Disclosure for UK Consumers</h5>
                  <p className="text-sm text-slate-300 leading-loose italic font-medium">
                    UKStander is a participant in the Amazon Services LLC Associates Program, an affiliate advertising program designed to provide a means for sites to earn advertising fees by advertising and linking to Amazon.co.uk. As an Amazon Associate, we earn from qualifying purchases. This supports our independent UK curation hub.
                  </p>
                </div>
              </div>
            </motion.div>
          </main>
        </div>
      </div>
    </MainLayout>
  );
}
