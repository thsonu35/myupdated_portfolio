import React from 'react';
import PageTransition from '../components/PageTransition';
import Experience from '../components/Experience';
import Gamification from '../components/Gamification';
import Certifications from '../components/Certifications';
import About from '../components/About';

const ExperiencePage = () => {
  return (
    <PageTransition>
      <div className="pt-24 pb-24 min-h-screen">
        <About />
        <Gamification />
        <Experience />
        <Certifications />
      </div>
    </PageTransition>
  );
};

export default ExperiencePage;
