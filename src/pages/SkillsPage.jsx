import React from 'react';
import PageTransition from '../components/PageTransition';
import Skills from '../components/Skills';

const SkillsPage = () => {
  return (
    <PageTransition>
      <div className="pt-24 min-h-screen">
        <Skills />
      </div>
    </PageTransition>
  );
};

export default SkillsPage;
