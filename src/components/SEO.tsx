import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article';
  locale?: string;
}

const SEO: React.FC<SEOProps> = ({
  title = 'Catandary - Navigation System for High-Speed Technology Journeys',
  description = 'Catandary guides German Mittelstand through complex technology landscapes with strategic clarity, innovative AI-powered scouting, and hands-on transformation expertise.',
  keywords = 'technology consulting, digital transformation, AI scouting, innovation management, German Mittelstand, technology strategy, R&D excellence',
  image = '/og-image.png',
  url = 'https://catandary.com',
  type = 'website',
  locale = 'en',
}) => {
  const fullTitle = title.includes('Catandary') ? title : `${title} | Catandary`;

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Catandary',
    description: description,
    url: url,
    logo: `${url}/logo.png`,
    sameAs: [
      'https://linkedin.com/company/catandary',
    ],
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Munich',
      addressCountry: 'DE',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      email: 'contact@catandary.com',
      contactType: 'customer service',
    },
  };

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content="Catandary GmbH" />
      <meta name="robots" content="index, follow" />
      <link rel="canonical" href={url} />
      <html lang={locale} />

      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content="Catandary" />
      <meta property="og:locale" content={locale === 'de' ? 'de_DE' : 'en_US'} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
    </Helmet>
  );
};

export default SEO;
