import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Globe, Mail, CheckCircle2 } from 'lucide-react';
import { useGeolocation } from '../hooks/useGeolocation';
import { useTranslation } from '../hooks/useTranslation';
import Logo from './Logo';

interface FooterProps {
  minimal?: boolean;
}

export default function Footer({ minimal = false }: FooterProps) {
  const { countryName, languageName, currency, flagEmoji } = useGeolocation();
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [settings, setSettings] = useState<any>(null);

  useEffect(() => {
    fetch('/api/global-settings')
      .then(res => res.json())
      .then(data => setSettings(data))
      .catch(console.error);
  }, []);

  const companyHeading = settings?.footer_company_heading || 'Company';
  const companyLinks = settings?.footer_company_links 
    ? JSON.parse(settings.footer_company_links) 
    : [
        { label: 'About Us', href: '/info/about-ukstander' },
        { label: 'Blog', href: '/blog' }
      ];

  const supportHeading = settings?.footer_support_heading || 'Support';
  const supportLinks = settings?.footer_support_links 
    ? JSON.parse(settings.footer_support_links) 
    : [
        { label: 'Your Account', href: '/user/profile' },
        { label: 'Returns & Replacements', href: '/info/returns' },
        { label: 'Help Center', href: '/contact' }
      ];

  const legalHeading = settings?.footer_legal_heading || 'Legal';
  const legalLinks = settings?.footer_legal_links 
    ? JSON.parse(settings.footer_legal_links) 
    : [
        { label: 'Privacy Policy', href: '/privacy' },
        { label: 'Terms of Service', href: '/terms' },
        { label: 'Cookies Policy', href: '/cookies' },
        { label: 'User Data Rights', href: '/data-rights' }
      ];

  const resourceHeading = settings?.footer_resource_heading || 'Resources';
  const resourceLinks = settings?.footer_resource_links 
    ? JSON.parse(settings.footer_resource_links) 
    : [
        { label: 'Affiliates', href: '/info/affiliate' }
      ];

  const copyrightText = settings?.footer_copyright || `© ${new Date().getFullYear()}, UKStander.shop, Inc. or its affiliates`;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if(email && email.includes('@')) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  if (minimal) {
    return (
      <footer className="mt-auto py-4 px-6 w-full bg-transparent text-center z-10 select-none">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3 text-[10px] font-bold text-slate-700 uppercase tracking-widest leading-loose">
          <p className="opacity-90">{copyrightText}</p>
          <div className="flex items-center gap-6">
            <Link to="/privacy" className="text-slate-700 hover:text-indigo-600 transition-colors font-extrabold">Privacy</Link>
            <Link to="/terms" className="text-slate-700 hover:text-indigo-600 transition-colors font-extrabold">Terms</Link>
            <Link to="/cookies" className="text-slate-700 hover:text-indigo-600 transition-colors font-extrabold">Cookies</Link>
          </div>
        </div>
      </footer>
    );
  }

  return (
    <footer className="mt-auto flex flex-col w-full z-10 font-sans">
      {/* Back to top button */}
      <button 
        onClick={scrollToTop}
        className="bg-[#012169] hover:bg-[#08152b] text-white py-4 text-sm font-medium transition-colors w-full"
      >
        {t('back_to_top')}
      </button>

      {/* Deal Alerts Section */}
      <div className="bg-[#0B192C] border-b border-white/10 w-full py-8 px-4 flex justify-center">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-6 justify-between w-full">
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <h4 className="text-lg font-bold text-white mb-1 flex items-center"><Mail className="w-5 h-5 mr-2 text-red-500" /> {t('deal_alerts_title')}</h4>
            <p className="text-sm text-slate-300">{t('deal_alerts_desc')}</p>
          </div>
          
          <div className="w-full md:w-auto flex-1 max-w-md">
            {subscribed ? (
              <div className="flex items-center justify-center md:justify-start text-sm font-bold text-emerald-400 py-2 bg-emerald-400/10 rounded-xl px-4">
                <CheckCircle2 className="w-5 h-5 mr-2" /> Subscribed successfully!
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <input 
                  type="email" 
                  required 
                  placeholder="Enter your email address" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 bg-white text-slate-900 rounded-md px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#febd69] placeholder:text-slate-500 font-medium"
                />
                <button type="submit" className="bg-[#febd69] text-slate-900 px-6 py-2.5 rounded-md text-sm font-bold hover:bg-[#f3a847] transition-colors shadow-sm whitespace-nowrap">
                  {t('subscribe')}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="bg-[#0B192C] text-white py-12 px-4 md:px-10 border-b border-slate-800">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Column 1 */}
            <div>
              <h3 className="font-bold mb-4 text-[16px] text-white">{companyHeading}</h3>
              <ul className="space-y-2.5 text-sm text-slate-400">
                {companyLinks.map((link: any, idx: number) => (
                  <li key={idx}>
                    {link.href.startsWith('/') ? (
                      <Link to={link.href} className="hover:text-white hover:underline transition-colors">{link.label}</Link>
                    ) : (
                      <a href={link.href} className="hover:text-white hover:underline transition-colors">{link.label}</a>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 2 */}
            <div>
              <h3 className="font-bold mb-4 text-[16px] text-white">{supportHeading}</h3>
              <ul className="space-y-2.5 text-sm text-slate-400">
                {supportLinks.map((link: any, idx: number) => (
                  <li key={idx}>
                    {link.href.startsWith('/') ? (
                      <Link to={link.href} className="hover:text-white hover:underline transition-colors">{link.label}</Link>
                    ) : (
                      <a href={link.href} className="hover:text-white hover:underline transition-colors">{link.label}</a>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3 */}
            <div>
              <h3 className="font-bold mb-4 text-[16px] text-white">{legalHeading}</h3>
              <ul className="space-y-2.5 text-sm text-slate-400">
                {legalLinks.map((link: any, idx: number) => (
                  <li key={idx}>
                    {link.href.startsWith('/') ? (
                      <Link to={link.href} className="hover:text-white hover:underline transition-colors">{link.label}</Link>
                    ) : (
                      <a href={link.href} className="hover:text-white hover:underline transition-colors">{link.label}</a>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 4 */}
            <div>
              <h3 className="font-bold mb-4 text-[16px] text-white">{resourceHeading}</h3>
              <ul className="space-y-2.5 text-sm text-slate-400">
                {resourceLinks.map((link: any, idx: number) => (
                  <li key={idx}>
                    {link.href.startsWith('/') ? (
                      <Link to={link.href} className="hover:text-white hover:underline transition-colors">{link.label}</Link>
                    ) : (
                      <a href={link.href} className="hover:text-white hover:underline transition-colors">{link.label}</a>
                    )}
                  </li>
                ))}
              </ul>
            </div>

        </div>
      </div>

      {/* Footer Bottom Logo */}
      <div className="bg-slate-900 text-white py-10 px-4 flex flex-col items-center justify-center border-t border-slate-800">
        <Logo dark={true} />
      </div>
      
      <div className="bg-[#012169] text-white py-6">
        <div className="flex flex-col items-center justify-center space-y-3 text-xs text-slate-500">
          <p>{copyrightText}</p>
        </div>
      </div>
    </footer>
  );
}
