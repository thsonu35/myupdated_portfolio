import React from 'react';
import PageTransition from '../components/PageTransition';
import Contact from '../components/Contact';

const ContactPage = () => {
  return (
    <PageTransition>
      <div className="pt-24 min-h-screen">
        <Contact />
      </div>
    </PageTransition>
  );
};

export default ContactPage;
