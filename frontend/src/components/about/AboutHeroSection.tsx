import React from 'react';
import mainAboutImage from '../../images/Main about image.jpg';

const AboutHeroSection: React.FC = () => {
  return (
    <section className="relative bg-[#C05621] h-[480px] overflow-hidden">
      {/* Background Pattern */}
      <div
        className="absolute inset-0 opacity-20 mix-blend-overlay"
        style={{
          backgroundImage: `url('${mainAboutImage}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-transparent" />

      {/* Content */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center max-w-[702px] px-6 md:px-8">
          <h1 className="font-fraunces text-4xl md:text-[56px] leading-tight md:leading-[61.6px] text-[#F2EFE9] mb-4 md:mb-6">
            Redefining Real Estate with<br className="hidden md:block" />
            <span className="italic">Intelligence & Elegance</span>
          </h1>

          {/* Divider */}
          <div className="w-16 md:w-24 h-px bg-[rgba(242,239,233,0.4)] mx-auto mb-6 md:mb-8" />

          <p className="font-manrope font-extralight text-base md:text-lg text-[rgba(242,239,233,0.9)] tracking-wide">
            Where data-driven precision meets the art of living.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutHeroSection;