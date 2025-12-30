import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type Language = 'en' | 'de';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.services': 'Services',
    'nav.contact': 'Contact',
    'nav.scouting': 'Scouting',
    'nav.login': 'Login',
    'nav.logout': 'Logout',
    'nav.signup': 'Sign Up',

    // Hero
    'hero.tagline': 'Navigation System for High-Speed Technology Journeys',
    'hero.title': 'Accelerate Your Technology Strategy',
    'hero.subtitle': 'We guide German Mittelstand through complex technology landscapes with strategic clarity, innovative AI-powered scouting, and hands-on transformation expertise.',
    'hero.cta.primary': 'Explore Services',
    'hero.cta.secondary': 'Start Scouting',

    // Services
    'services.title': 'Our Expertise',
    'services.subtitle': 'Four interconnected domains to navigate your technology journey',
    
    'services.strategic.title': 'Strategic Technology Management',
    'services.strategic.description': 'Navigate complex technology landscapes with clarity through roadmapping, portfolio optimization, and due diligence.',
    'services.strategic.roadmapping': 'Technology Roadmapping & ATRA',
    'services.strategic.portfolio': 'Portfolio Optimization',
    'services.strategic.scouting': 'Scouting & Due Diligence',

    'services.digital.title': 'Digital Transformation & GenAI',
    'services.digital.description': 'Harness the power of AI and digital technologies to transform workflows and capabilities.',
    'services.digital.automation': 'Workflow Automation',
    'services.digital.twin': 'Digital Twin & MBSE',
    'services.digital.genai': 'Generative AI Integration',

    'services.change.title': 'Systemic Change Leadership',
    'services.change.description': 'Build organizational capability for continuous transformation and innovation.',
    'services.change.coaching': 'Transformation Coaching',
    'services.change.leadership': 'Ambidextrous Leadership',
    'services.change.diagnostics': 'Organizational Diagnostics',

    'services.excellence.title': 'R&D Excellence & Scale-Up',
    'services.excellence.description': 'Transform innovations into market-ready solutions with operational excellence.',
    'services.excellence.scaleup': '0→1 Scale-Up Programs',
    'services.excellence.ip': 'IP & Patent Strategy',
    'services.excellence.operations': 'R&D Operations',

    'services.learnMore': 'Learn More',

    // Contact
    'contact.title': 'Let\'s Start a Conversation',
    'contact.subtitle': 'Ready to accelerate your technology journey? We\'d love to hear from you.',
    'contact.name': 'Your Name',
    'contact.email': 'Email Address',
    'contact.company': 'Company',
    'contact.message': 'Your Message',
    'contact.submit': 'Send Message',
    'contact.success': 'Thank you! We\'ll be in touch soon.',
    'contact.error': 'Something went wrong. Please try again.',

    // Auth
    'auth.login.title': 'Welcome Back',
    'auth.login.subtitle': 'Sign in to access your scouting dashboard',
    'auth.signup.title': 'Get Started',
    'auth.signup.subtitle': 'Create an account to access AI-powered scouting',
    'auth.email': 'Email',
    'auth.password': 'Password',
    'auth.confirmPassword': 'Confirm Password',
    'auth.login.button': 'Sign In',
    'auth.signup.button': 'Create Account',
    'auth.login.link': 'Already have an account? Sign in',
    'auth.signup.link': 'Don\'t have an account? Sign up',
    'auth.error.invalid': 'Invalid email or password',
    'auth.error.exists': 'An account with this email already exists',
    'auth.error.mismatch': 'Passwords do not match',

    // Scouting
    'scouting.title': 'Technology Scouting',
    'scouting.subtitle': 'AI-powered research and analysis for strategic technology decisions',
    'scouting.query.placeholder': 'Describe your technology scouting query...',
    'scouting.query.submit': 'Start Research',
    'scouting.results.title': 'Research Results',
    'scouting.results.loading': 'Analyzing your query...',

    // Footer
    'footer.tagline': 'Navigation System for High-Speed Technology Journeys',
    'footer.privacy': 'Privacy Policy',
    'footer.imprint': 'Imprint',
    'footer.terms': 'Terms of Service',
    'footer.copyright': '© 2024 Catandary. All rights reserved.',

    // Cookie Consent
    'cookie.title': 'Cookie Settings',
    'cookie.description': 'We use cookies to enhance your experience. By continuing to visit this site you agree to our use of cookies.',
    'cookie.accept': 'Accept All',
    'cookie.reject': 'Reject Non-Essential',
    'cookie.settings': 'Cookie Settings',

    // Common
    'common.loading': 'Loading...',
    'common.error': 'An error occurred',
    'common.back': 'Back',
  },
  de: {
    // Navigation
    'nav.home': 'Startseite',
    'nav.services': 'Leistungen',
    'nav.contact': 'Kontakt',
    'nav.scouting': 'Scouting',
    'nav.login': 'Anmelden',
    'nav.logout': 'Abmelden',
    'nav.signup': 'Registrieren',

    // Hero
    'hero.tagline': 'Navigationssystem für Hochgeschwindigkeits-Technologiereisen',
    'hero.title': 'Beschleunigen Sie Ihre Technologiestrategie',
    'hero.subtitle': 'Wir führen den deutschen Mittelstand durch komplexe Technologielandschaften mit strategischer Klarheit, innovativem KI-gestütztem Scouting und praxisnaher Transformationsexpertise.',
    'hero.cta.primary': 'Leistungen entdecken',
    'hero.cta.secondary': 'Scouting starten',

    // Services
    'services.title': 'Unsere Expertise',
    'services.subtitle': 'Vier vernetzte Bereiche zur Navigation Ihrer Technologiereise',
    
    'services.strategic.title': 'Strategisches Technologiemanagement',
    'services.strategic.description': 'Navigieren Sie durch komplexe Technologielandschaften mit Klarheit durch Roadmapping, Portfoliooptimierung und Due Diligence.',
    'services.strategic.roadmapping': 'Technology Roadmapping & ATRA',
    'services.strategic.portfolio': 'Portfoliooptimierung',
    'services.strategic.scouting': 'Scouting & Due Diligence',

    'services.digital.title': 'Digitale Transformation & GenAI',
    'services.digital.description': 'Nutzen Sie die Kraft von KI und digitalen Technologien zur Transformation von Workflows und Fähigkeiten.',
    'services.digital.automation': 'Workflow-Automatisierung',
    'services.digital.twin': 'Digitaler Zwilling & MBSE',
    'services.digital.genai': 'Generative KI Integration',

    'services.change.title': 'Systemische Change Leadership',
    'services.change.description': 'Entwickeln Sie organisatorische Fähigkeiten für kontinuierliche Transformation und Innovation.',
    'services.change.coaching': 'Transformations-Coaching',
    'services.change.leadership': 'Ambidextrous Leadership',
    'services.change.diagnostics': 'Organisationsdiagnostik',

    'services.excellence.title': 'F&E Excellence & Scale-Up',
    'services.excellence.description': 'Verwandeln Sie Innovationen in marktreife Lösungen mit operativer Exzellenz.',
    'services.excellence.scaleup': '0→1 Scale-Up Programme',
    'services.excellence.ip': 'IP- & Patentstrategie',
    'services.excellence.operations': 'F&E Operations',

    'services.learnMore': 'Mehr erfahren',

    // Contact
    'contact.title': 'Lassen Sie uns sprechen',
    'contact.subtitle': 'Bereit, Ihre Technologiereise zu beschleunigen? Wir freuen uns auf Ihre Nachricht.',
    'contact.name': 'Ihr Name',
    'contact.email': 'E-Mail-Adresse',
    'contact.company': 'Unternehmen',
    'contact.message': 'Ihre Nachricht',
    'contact.submit': 'Nachricht senden',
    'contact.success': 'Vielen Dank! Wir melden uns bald bei Ihnen.',
    'contact.error': 'Etwas ist schiefgelaufen. Bitte versuchen Sie es erneut.',

    // Auth
    'auth.login.title': 'Willkommen zurück',
    'auth.login.subtitle': 'Melden Sie sich an, um auf Ihr Scouting-Dashboard zuzugreifen',
    'auth.signup.title': 'Loslegen',
    'auth.signup.subtitle': 'Erstellen Sie ein Konto für KI-gestütztes Scouting',
    'auth.email': 'E-Mail',
    'auth.password': 'Passwort',
    'auth.confirmPassword': 'Passwort bestätigen',
    'auth.login.button': 'Anmelden',
    'auth.signup.button': 'Konto erstellen',
    'auth.login.link': 'Bereits ein Konto? Anmelden',
    'auth.signup.link': 'Noch kein Konto? Registrieren',
    'auth.error.invalid': 'Ungültige E-Mail oder Passwort',
    'auth.error.exists': 'Ein Konto mit dieser E-Mail existiert bereits',
    'auth.error.mismatch': 'Passwörter stimmen nicht überein',

    // Scouting
    'scouting.title': 'Technologie-Scouting',
    'scouting.subtitle': 'KI-gestützte Recherche und Analyse für strategische Technologieentscheidungen',
    'scouting.query.placeholder': 'Beschreiben Sie Ihre Technologie-Scouting-Anfrage...',
    'scouting.query.submit': 'Recherche starten',
    'scouting.results.title': 'Rechercheergebnisse',
    'scouting.results.loading': 'Analysiere Ihre Anfrage...',

    // Footer
    'footer.tagline': 'Navigationssystem für Hochgeschwindigkeits-Technologiereisen',
    'footer.privacy': 'Datenschutz',
    'footer.imprint': 'Impressum',
    'footer.terms': 'AGB',
    'footer.copyright': '© 2024 Catandary. Alle Rechte vorbehalten.',

    // Cookie Consent
    'cookie.title': 'Cookie-Einstellungen',
    'cookie.description': 'Wir verwenden Cookies, um Ihre Erfahrung zu verbessern. Durch die weitere Nutzung dieser Website stimmen Sie unserer Cookie-Nutzung zu.',
    'cookie.accept': 'Alle akzeptieren',
    'cookie.reject': 'Nicht-essentielle ablehnen',
    'cookie.settings': 'Cookie-Einstellungen',

    // Common
    'common.loading': 'Laden...',
    'common.error': 'Ein Fehler ist aufgetreten',
    'common.back': 'Zurück',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const stored = localStorage.getItem('catandary-language');
    return (stored as Language) || 'en';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('catandary-language', lang);
    document.documentElement.lang = lang;
  };

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
