import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Hero from '../components/Hero';
import LoadingScreen from '../components/LoadingScreen';
import PageTransition from '../components/PageTransition';

const Landing = () => {
  const [isBooting, setIsBooting] = useState(true);
  const navigate = useNavigate();

  return (
    <PageTransition>
      {isBooting ? (
        <LoadingScreen onComplete={() => setIsBooting(false)} />
      ) : (
        <Hero onEnterSystem={() => navigate('/dashboard')} />
      )}
    </PageTransition>
  );
};

export default Landing;
