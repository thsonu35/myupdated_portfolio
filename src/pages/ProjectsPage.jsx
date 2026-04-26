import React from 'react';
import PageTransition from '../components/PageTransition';
import Projects from '../components/Projects';

const ProjectsPage = () => {
  return (
    <PageTransition>
      <div className="pt-24 min-h-screen">
        <Projects />
      </div>
    </PageTransition>
  );
};

export default ProjectsPage;
