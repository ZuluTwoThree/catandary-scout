import React from 'react';
import Header from './Header';
import Footer from './Footer';
import CookieConsent from '@/components/CookieConsent';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-subtle">
      <Header />
      <main className="flex-1 pt-16 md:pt-20">
        {children}
      </main>
      <Footer />
      <CookieConsent />
    </div>
  );
};

export default Layout;
