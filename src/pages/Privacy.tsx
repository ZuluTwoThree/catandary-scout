import React from 'react';
import Layout from '@/components/layout/Layout';
import { useLanguage } from '@/contexts/LanguageContext';

const Privacy: React.FC = () => {
  const { language } = useLanguage();
  
  return (
    <Layout>
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto prose prose-neutral">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-8">
              {language === 'de' ? 'Datenschutzerklärung' : 'Privacy Policy'}
            </h1>
            
            <div className="space-y-6 text-muted-foreground">
              <section>
                <h2 className="text-xl font-semibold text-foreground mb-3">
                  {language === 'de' ? '1. Datenerfassung' : '1. Data Collection'}
                </h2>
                <p>
                  {language === 'de' 
                    ? 'Wir erfassen nur die Daten, die für die Bereitstellung unserer Dienste erforderlich sind. Dazu gehören Kontaktinformationen (Name, E-Mail) und Nutzungsdaten.'
                    : 'We only collect data necessary to provide our services. This includes contact information (name, email) and usage data.'}
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-foreground mb-3">
                  {language === 'de' ? '2. Datenverwendung' : '2. Data Usage'}
                </h2>
                <p>
                  {language === 'de'
                    ? 'Ihre Daten werden ausschließlich zur Erbringung unserer Beratungsleistungen und zur Verbesserung unserer Services verwendet.'
                    : 'Your data is used exclusively to provide our consulting services and to improve our offerings.'}
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-foreground mb-3">
                  {language === 'de' ? '3. Cookies' : '3. Cookies'}
                </h2>
                <p>
                  {language === 'de'
                    ? 'Wir verwenden nur technisch notwendige Cookies. Tracking-Cookies werden nur mit Ihrer ausdrücklichen Zustimmung gesetzt.'
                    : 'We only use technically necessary cookies. Tracking cookies are only set with your explicit consent.'}
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-foreground mb-3">
                  {language === 'de' ? '4. Ihre Rechte' : '4. Your Rights'}
                </h2>
                <p>
                  {language === 'de'
                    ? 'Gemäß DSGVO haben Sie das Recht auf Auskunft, Berichtigung, Löschung und Übertragbarkeit Ihrer Daten.'
                    : 'Under GDPR, you have the right to access, rectify, delete, and port your data.'}
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-foreground mb-3">
                  {language === 'de' ? '5. Kontakt' : '5. Contact'}
                </h2>
                <p>
                  {language === 'de'
                    ? 'Bei Fragen zum Datenschutz kontaktieren Sie uns bitte unter: privacy@catandary.com'
                    : 'For privacy-related inquiries, please contact us at: privacy@catandary.com'}
                </p>
              </section>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Privacy;
