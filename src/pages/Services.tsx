import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Compass, Brain, Users, Rocket, Check } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';

const Services: React.FC = () => {
  const { t } = useLanguage();

  const services = [
    {
      id: 'strategic',
      icon: Compass,
      titleKey: 'services.strategic.title',
      descriptionKey: 'services.strategic.description',
      color: 'from-turquoise to-turquoise-light',
      features: [
        'services.strategic.roadmapping',
        'services.strategic.portfolio',
        'services.strategic.scouting',
      ],
    },
    {
      id: 'digital',
      icon: Brain,
      titleKey: 'services.digital.title',
      descriptionKey: 'services.digital.description',
      color: 'from-turquoise-dark to-turquoise',
      features: [
        'services.digital.automation',
        'services.digital.twin',
        'services.digital.genai',
      ],
    },
    {
      id: 'change',
      icon: Users,
      titleKey: 'services.change.title',
      descriptionKey: 'services.change.description',
      color: 'from-anthracite to-anthracite-light',
      features: [
        'services.change.coaching',
        'services.change.leadership',
        'services.change.diagnostics',
      ],
    },
    {
      id: 'excellence',
      icon: Rocket,
      titleKey: 'services.excellence.title',
      descriptionKey: 'services.excellence.description',
      color: 'from-turquoise-light to-turquoise-glow',
      features: [
        'services.excellence.scaleup',
        'services.excellence.ip',
        'services.excellence.operations',
      ],
    },
  ];

  return (
    <Layout>
      {/* Header */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              {t('services.title')}
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground">
              {t('services.subtitle')}
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="pb-20 md:pb-32">
        <div className="container mx-auto px-4">
          <div className="space-y-12 md:space-y-20">
            {services.map((service, index) => (
              <div
                key={service.id}
                className={`flex flex-col ${index % 2 === 1 ? 'md:flex-row-reverse' : 'md:flex-row'} gap-8 md:gap-16 items-center`}
              >
                {/* Visual */}
                <div className="flex-1 w-full">
                  <div className={`relative aspect-square max-w-md mx-auto bg-gradient-to-br ${service.color} rounded-3xl p-8 flex items-center justify-center shadow-xl`}>
                    <service.icon className="w-24 h-24 md:w-32 md:h-32 text-primary-foreground opacity-90" />
                    {/* Decorative Elements */}
                    <div className="absolute top-4 right-4 w-4 h-4 border-2 border-primary-foreground/30 rounded-full" />
                    <div className="absolute bottom-8 left-8 w-8 h-8 border-2 border-primary-foreground/20 rounded-lg rotate-45" />
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-4 shadow-lg`}>
                    <service.icon className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                    {t(service.titleKey)}
                  </h2>
                  <p className="text-lg text-muted-foreground mb-6">
                    {t(service.descriptionKey)}
                  </p>
                  <ul className="space-y-3 mb-8">
                    {service.features.map((featureKey) => (
                      <li key={featureKey} className="flex items-center gap-3">
                        <div className="w-5 h-5 rounded-full bg-accent flex items-center justify-center flex-shrink-0">
                          <Check className="w-3 h-3 text-primary" />
                        </div>
                        <span className="text-foreground">{t(featureKey)}</span>
                      </li>
                    ))}
                  </ul>
                  <Link to="/contact">
                    <Button variant="default" size="lg">
                      {t('services.learnMore')}
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Let's discuss how our expertise can help accelerate your technology journey.
            </p>
            <Link to="/contact">
              <Button variant="hero" size="xl">
                Contact Us
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Services;
