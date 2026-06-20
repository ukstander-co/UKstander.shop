import { useState, useEffect } from 'react';

const languageNames: Record<string, string> = {
  'EN': 'English',
  'FR': 'Français',
  'ES': 'Español',
  'DE': 'Deutsch',
  'IT': 'Italiano',
  'PT': 'Português',
  'NL': 'Nederlands',
  'PL': 'Polski',
  'RU': 'Русский',
  'JA': '日本語',
  'ZH': '中文',
  'AR': 'العربية',
  'HI': 'हिन्दी',
  'UR': 'Urdu'
};

export function useGeolocation() {
  const [countryName, setCountryName] = useState("United Kingdom");
  const [countryCode, setCountryCode] = useState("GB");
  const [languageCode, setLanguageCode] = useState("EN");
  const [languageName, setLanguageName] = useState("English");
  const [currency, setCurrency] = useState({ code: 'GBP', symbol: '£', name: 'British Pound' });

  useEffect(() => {
    fetch('https://api.ipgeolocation.io/ipgeo?apiKey=ed542d539b0b457295ff8462ddaaf44c')
      .then(res => {
        if (!res.ok) throw new Error('Fetch failed');
        const contentType = res.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
          return res.json();
        }
        throw new Error('Not JSON');
      })
      .then(data => {
         if (data.country_name) setCountryName(data.country_name);
         if (data.country_code2) setCountryCode(data.country_code2);
         if (data.languages) {
            let firstLang = data.languages.split(',')[0].split('-')[0].toUpperCase();
            if (data.country_code2 === 'PK') firstLang = 'EN';
            setLanguageCode(firstLang || "EN");
            setLanguageName(languageNames[firstLang] || languageNames['EN']);
         }
         if (data.currency) {
            setCurrency({
               code: data.currency.code || 'GBP',
               symbol: data.currency.symbol || '£',
               name: data.currency.name || 'British Pound'
            });
         }
      })
      .catch((e) => {
         console.warn("Geolocation fallback applied", e);
      });
  }, []);

  useEffect(() => {
     // Apply lang to document html
     document.documentElement.lang = languageCode.toLowerCase();
  }, [languageCode]);

  const getFlagEmoji = (code: string) => {
    if (!code || code.length !== 2) return '🇬🇧';
    const codePoints = code
      .toUpperCase()
      .split('')
      .map(char => 127397 + char.charCodeAt(0));
    return String.fromCodePoint(...codePoints);
  };

  const changeLanguage = (code: string) => {
     setLanguageCode(code);
     setLanguageName(languageNames[code] || 'Unknown');
  };

  return {
    countryName,
    countryCode,
    languageCode,
    languageName,
    currency,
    flagEmoji: getFlagEmoji(countryCode),
    changeLanguage,
    availableLanguages: Object.entries(languageNames).map(([code, name]) => ({ code, name }))
  };
}
