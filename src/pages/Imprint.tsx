import React from 'react';
import Layout from '@/components/layout/Layout';
import { useLanguage } from '@/contexts/LanguageContext';

const Imprint: React.FC = () => {
  const { language } = useLanguage();
  
  return (
    <Layout>
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-8">
              {language === 'de' ? 'Impressum' : 'Imprint'}
            </h1>
            
            <div className="space-y-6 text-muted-foreground">
              <section>
                <h2 className="text-xl font-semibold text-foreground mb-3">
                  {language === 'de' ? 'Angaben gemäß § 5 TMG' : 'Information according to § 5 TMG'}
                </h2>
                <address className="not-italic">
                  <p className="font-medium text-foreground">Catandary GmbH</p>
                  <p>Musterstraße 123</p>
                  <p>80331 München</p>
                  <p>Germany</p>
                </address>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-foreground mb-3">
                  {language === 'de' ? 'Kontakt' : 'Contact'}
                </h2>
                <p>Email: contact@catandary.com</p>
                <p>Tel: +49 (0) 89 123456789</p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-foreground mb-3">
                  {language === 'de' ? 'Handelsregister' : 'Commercial Register'}
                </h2>
                <p>{language === 'de' ? 'Registergericht' : 'Registration Court'}: Amtsgericht München</p>
                <p>{language === 'de' ? 'Registernummer' : 'Registration Number'}: HRB 123456</p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-foreground mb-3">
                  {language === 'de' ? 'Umsatzsteuer-ID' : 'VAT ID'}
                </h2>
                <p>{language === 'de' ? 'Umsatzsteuer-Identifikationsnummer gemäß §27 a Umsatzsteuergesetz' : 'VAT identification number according to §27 a Value Added Tax Act'}:</p>
                <p>DE123456789</p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-foreground mb-3">
                  {language === 'de' ? 'Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV' : 'Responsible for content according to § 55 Abs. 2 RStV'}
                </h2>
                <p>Max Mustermann</p>
                <p>Musterstraße 123</p>
                <p>80331 München</p>
              </section>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Imprint;
