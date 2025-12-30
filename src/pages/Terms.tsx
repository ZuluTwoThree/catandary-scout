import React from 'react';
import Layout from '@/components/layout/Layout';
import { useLanguage } from '@/contexts/LanguageContext';

const Terms: React.FC = () => {
  const { language } = useLanguage();
  
  return (
    <Layout>
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-8">
              {language === 'de' ? 'Allgemeine Geschäftsbedingungen' : 'Terms of Service'}
            </h1>
            
            <div className="space-y-6 text-muted-foreground">
              <section>
                <h2 className="text-xl font-semibold text-foreground mb-3">
                  {language === 'de' ? '1. Geltungsbereich' : '1. Scope'}
                </h2>
                <p>
                  {language === 'de'
                    ? 'Diese Allgemeinen Geschäftsbedingungen gelten für alle Geschäftsbeziehungen zwischen Catandary GmbH und unseren Kunden.'
                    : 'These Terms of Service apply to all business relationships between Catandary GmbH and our clients.'}
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-foreground mb-3">
                  {language === 'de' ? '2. Leistungen' : '2. Services'}
                </h2>
                <p>
                  {language === 'de'
                    ? 'Wir bieten Beratungsdienstleistungen im Bereich Technologiemanagement, digitale Transformation und Innovation.'
                    : 'We provide consulting services in technology management, digital transformation, and innovation.'}
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-foreground mb-3">
                  {language === 'de' ? '3. Vertraulichkeit' : '3. Confidentiality'}
                </h2>
                <p>
                  {language === 'de'
                    ? 'Alle im Rahmen der Zusammenarbeit ausgetauschten Informationen werden vertraulich behandelt.'
                    : 'All information exchanged during our collaboration will be treated confidentially.'}
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-foreground mb-3">
                  {language === 'de' ? '4. Haftung' : '4. Liability'}
                </h2>
                <p>
                  {language === 'de'
                    ? 'Unsere Haftung ist auf Vorsatz und grobe Fahrlässigkeit beschränkt, soweit gesetzlich zulässig.'
                    : 'Our liability is limited to intentional misconduct and gross negligence, as permitted by law.'}
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-foreground mb-3">
                  {language === 'de' ? '5. Anwendbares Recht' : '5. Applicable Law'}
                </h2>
                <p>
                  {language === 'de'
                    ? 'Es gilt deutsches Recht. Gerichtsstand ist München.'
                    : 'German law applies. Place of jurisdiction is Munich.'}
                </p>
              </section>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Terms;
