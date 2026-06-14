import { useGeolocation } from './useGeolocation';

const translations: Record<string, Record<string, string>> = {
  'EN': {
    'search_placeholder': 'Search premium UK deals...',
    'all_categories': 'All Categories',
    'curated_for': 'Curated for',
    'hello': 'Hello,',
    'account_lists': 'Account & Lists',
    'returns': 'Returns',
    'orders': '& Orders',
    'top_drops': 'Top Drops',
    'cart': 'Cart',
    'deal_alerts_title': 'Sign up for Deal Alerts',
    'deal_alerts_desc': "Don't miss out on exclusive stock drops and premium discounts.",
    'subscribe': 'Subscribe',
    'back_to_top': 'Back to top',
    'company': 'Company',
    'support': 'Support',
    'legal': 'Legal',
    'resources': 'Resources',
    'buy_now': 'Buy Now',
    'add_to_cart': 'Add to Cart',
    'view_details': 'View Details',
    'people_cart': 'people have this in their cart',
    'viewed_times': 'Viewed {clicks} times in the last 24 hours',
    'today_deals': "Today's Deals",
    'customer_service': 'Customer Service',
    'registry': 'Registry',
    'gift_cards': 'Gift Cards',
    'sell': 'Sell'
  },
  'FR': {
    'search_placeholder': 'Rechercher des offres premium...',
    'all_categories': 'Toutes catégories',
    'curated_for': 'Sélectionné pour',
    'hello': 'Bonjour,',
    'account_lists': 'Compte et listes',
    'returns': 'Retours',
    'orders': '& Commandes',
    'top_drops': 'Meilleures Ventes',
    'cart': 'Panier',
    'deal_alerts_title': 'Inscrivez-vous aux alertes promos',
    'deal_alerts_desc': 'Ne manquez pas les offres exclusives et les réductions premium.',
    'subscribe': "S'abonner",
    'back_to_top': 'Retour en haut',
    'company': 'Entreprise',
    'support': 'Support',
    'legal': 'Légal',
    'resources': 'Ressources',
    'buy_now': 'Acheter maintenant',
    'add_to_cart': 'Ajouter au panier',
    'view_details': 'Voir les détails',
    'people_cart': 'personnes ont ceci dans leur panier',
    'viewed_times': 'Vu {clicks} fois dans les dernières 24 heures',
    'today_deals': 'Offres du jour',
    'customer_service': 'Service Client',
    'registry': 'Registre',
    'gift_cards': 'Cartes Cadeaux',
    'sell': 'Vendre'
  },
  'ES': {
    'search_placeholder': 'Buscar ofertas premium...',
    'all_categories': 'Todas las categorías',
    'curated_for': 'Seleccionado para',
    'hello': 'Hola,',
    'account_lists': 'Cuenta y listas',
    'returns': 'Devoluciones',
    'orders': 'y Pedidos',
    'top_drops': 'Ofertas Top',
    'cart': 'Carrito',
    'deal_alerts_title': 'Regístrate para Alertas de Ofertas',
    'deal_alerts_desc': 'No te pierdas de stock exclusivo y descuentos premium.',
    'subscribe': 'Suscribirse',
    'back_to_top': 'Volver arriba',
    'company': 'Empresa',
    'support': 'Soporte',
    'legal': 'Legal',
    'resources': 'Recursos',
    'buy_now': 'Comprar ahora',
    'add_to_cart': 'Añadir al Carrito',
    'view_details': 'Ver Detalles',
    'people_cart': 'personas tienen esto en su carrito',
    'viewed_times': 'Visto {clicks} veces en las últimas 24 horas',
    'today_deals': 'Ofertas de Hoy',
    'customer_service': 'Servicio al Cliente',
    'registry': 'Lista de Bodas',
    'gift_cards': 'Tarjetas de Regalo',
    'sell': 'Vender'
  },
  'DE': {
    'search_placeholder': 'Premium-Angebote suchen...',
    'all_categories': 'Alle Kategorien',
    'curated_for': 'Ausgewählt für',
    'hello': 'Hallo,',
    'account_lists': 'Konto und Listen',
    'returns': 'Rücksendungen',
    'orders': '& Bestellungen',
    'top_drops': 'Top-Angebote',
    'cart': 'Einkaufswagen',
    'deal_alerts_title': 'Für Angebotsalarme anmelden',
    'deal_alerts_desc': 'Verpassen Sie keine exklusiven Rabatte.',
    'subscribe': 'Abonnieren',
    'back_to_top': 'Zurück nach oben',
    'company': 'Unternehmen',
    'support': 'Unterstützung',
    'legal': 'Rechtliches',
    'resources': 'Ressourcen',
    'buy_now': 'Jetzt Kaufen',
    'add_to_cart': 'In den Einkaufswagen',
    'view_details': 'Details',
    'people_cart': 'Personen haben dies im Wagen',
    'viewed_times': '{clicks} mal in den letzten 24 Stunden angesehen',
    'today_deals': 'Angebote des Tages',
    'customer_service': 'Kundenservice',
    'registry': 'Wunschzettel',
    'gift_cards': 'Gutscheine',
    'sell': 'Verkaufen'
  },
  'UR': {
    'search_placeholder': 'بہترین ڈیلز تلاش کریں...',
    'all_categories': 'تمام کیٹیگریز',
    'curated_for': 'آپ کے لئے',
    'hello': 'ہیلو،',
    'account_lists': 'اکاؤنٹ اور لسٹس',
    'returns': 'واپسی',
    'orders': '& آرڈرز',
    'top_drops': 'ٹاپ ڈراپس',
    'cart': 'کارٹ',
    'deal_alerts_title': 'ڈیل الرٹس کے لئے سائن اپ کریں',
    'deal_alerts_desc': 'خصوصی ڈسکاؤنٹس اور ڈراپس مت چھوڑیں۔',
    'subscribe': 'سبسکرائب',
    'back_to_top': 'اوپر جائیں',
    'company': 'کمپنی',
    'support': 'سپورٹ',
    'legal': 'قانونی',
    'resources': 'وسائل',
    'buy_now': 'ابھی خریدیں',
    'add_to_cart': 'کارٹ میں شامل کریں',
    'view_details': 'تفصیلات دیکھیں',
    'people_cart': 'لوگوں نے اسے اپنی کارٹ میں رکھا ہے',
    'viewed_times': 'پچھلے 24 گھنٹوں میں {clicks} بار دیکھا گیا',
    'today_deals': 'آج کی ڈیلز',
    'customer_service': 'کسٹمر سروس',
    'registry': 'رجسٹری',
    'gift_cards': 'گفٹ کارڈز',
    'sell': 'بیچیں'
  }
};

export function useTranslation() {
  const { languageCode } = useGeolocation();

  const t = (key: string, variables?: Record<string, string | number>) => {
    // Default to EN if language not found
    const langDict = translations[languageCode] || translations['EN'];
    let text = langDict[key] || translations['EN'][key] || key;
    
    if (variables) {
      Object.keys(variables).forEach(varKey => {
        text = text.replace(`{${varKey}}`, String(variables[varKey]));
      });
    }
    
    return text;
  };

  return { t };
}
