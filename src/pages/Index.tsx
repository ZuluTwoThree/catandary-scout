import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Compass, Brain, Users, Rocket, ChevronRight } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';

const Index: React.FC = () => {
  const { t } = useLanguage();
  const { user } = useAuth();

  const services = [
    {
      icon: Compass,
      titleKey: 'services.strategic.title',
      descriptionKey: 'services.strategic.description',
      color: 'from-turquoise to-turquoise-light',
    },
    {
      icon: Brain,
      titleKey: 'services.digital.title',
      descriptionKey: 'services.digital.description',
      color: 'from-turquoise-dark to-turquoise',
    },
    {
      icon: Users,
      titleKey: 'services.change.title',
      descriptionKey: 'services.change.description',
      color: 'from-anthracite to-anthracite-light',
    },
    {
      icon: Rocket,
      titleKey: 'services.excellence.title',
      descriptionKey: 'services.excellence.description',
      color: 'from-turquoise-light to-turquoise-glow',
    },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        {/* Background Decorations */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 right-0 w-[600px] h-[600px] bg-turquoise/5 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-turquoise/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
          <div className="absolute top-1/2 left-1/4 w-2 h-2 bg-turquoise rounded-full animate-pulse-soft" />
          <div className="absolute top-1/3 right-1/3 w-3 h-3 bg-turquoise/50 rounded-full animate-pulse-soft" style={{ animationDelay: '1s' }} />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl">
            {/* Tagline */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent rounded-full mb-6 animate-fade-in">
              <Compass className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-accent-foreground">
                {t('hero.tagline')}
              </span>
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 animate-fade-in" style={{ animationDelay: '0.1s' }}>
              {t('hero.title').split(' ').map((word, i) => (
                <span key={i}>
                  {i === 1 || i === 2 ? (
                    <span className="text-gradient">{word} </span>
                  ) : (
                    <span>{word} </span>
                  )}
                </span>
              ))}
            </h1>

            {/* Subtitle */}
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-8 animate-fade-in" style={{ animationDelay: '0.2s' }}>
              {t('hero.subtitle')}
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <Link to="/services">
                <Button variant="hero" size="xl">
                  {t('hero.cta.primary')}
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
              <Link to={user ? '/scouting' : '/auth?mode=signup'}>
                <Button variant="heroOutline" size="xl">
                  {t('hero.cta.secondary')}
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Geometric Pattern */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 hidden lg:block">
          <svg width="400" height="400" viewBox="0 0 400 400" className="opacity-10">
            <circle cx="200" cy="200" r="150" stroke="currentColor" strokeWidth="1" fill="none" className="text-turquoise" />
            <circle cx="200" cy="200" r="100" stroke="currentColor" strokeWidth="1" fill="none" className="text-turquoise" />
            <circle cx="200" cy="200" r="50" stroke="currentColor" strokeWidth="2" fill="none" className="text-turquoise" />
            <line x1="50" y1="200" x2="350" y2="200" stroke="currentColor" strokeWidth="1" className="text-turquoise" />
            <line x1="200" y1="50" x2="200" y2="350" stroke="currentColor" strokeWidth="1" className="text-turquoise" />
          </svg>
        </div>
      </section>

      {/* Services Preview Section */}
      <section className="py-20 md:py-32 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              {t('services.title')}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t('services.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {services.map((service, index) => (
              <Link
                key={service.titleKey}
                to="/services"
                className="group relative bg-card border border-border rounded-2xl p-6 md:p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Icon */}
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform`}>
                  <service.icon className="w-6 h-6 text-primary-foreground" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                  {t(service.titleKey)}
                </h3>
                <p className="text-muted-foreground mb-4">
                  {t(service.descriptionKey)}
                </p>

                {/* Arrow */}
                <div className="flex items-center text-primary font-medium">
                  <span className="text-sm">{t('services.learnMore')}</span>
                  <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </div>

                {/* Hover Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-5 transition-opacity`} />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="relative bg-gradient-dark rounded-3xl p-8 md:p-16 overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                <defs>
                  <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                    <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-turquoise" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />
              </svg>
            </div>

            <div className="relative z-10 text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
                Ready to Navigate Your Technology Journey?
              </h2>
              <p className="text-lg text-primary-foreground/70 max-w-2xl mx-auto mb-8">
                Let's discuss how we can accelerate your technology strategy and drive meaningful transformation.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/contact">
                  <Button variant="hero" size="lg">
                    Get in Touch
                    <ArrowRight className="w-5 h-5" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
