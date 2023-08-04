
import React from 'react';

import WhyChooseUs from '@/components/WhyChooseUs';
import HeroSection from '@/components/header';
import Image from 'next/image';
import DocumentExtractor from '@/components/WhatToDo';
import Loading from '@/components/loader';

const Home: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center py-4 gap-4">

      <div className="w-full    rounded-lg shadow-lg">
        <HeroSection />
      </div>

      <div className="w-full   p-2 rounded-lg shadow-lg">
        <WhyChooseUs />
      </div>
      <div className="w-full   p-2 rounded-lg shadow-lg">
        <DocumentExtractor />
        <Loading />
      </div>


    </div>
  );
}

export default Home;