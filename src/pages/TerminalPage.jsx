import React from 'react';
import PageTransition from '../components/PageTransition';
import Terminal from '../components/Terminal';

const TerminalPage = () => {
  return (
    <PageTransition>
      <div className="w-full h-screen bg-black relative">
        <Terminal fullscreen={true} />
      </div>
    </PageTransition>
  );
};

export default TerminalPage;
