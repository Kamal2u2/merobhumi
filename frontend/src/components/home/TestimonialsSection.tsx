import React from 'react';

const TestimonialsSection: React.FC = () => {
  const testimonials = [
    {
      name: "Anish Shrestha",
      location: "Kathmandu, Nepal",
      text: "Matched us with our dream home in just 2 weeks. The process was seamless and personalized."
    },
    {
      name: "Srijana Thapa",
      location: "Pokhara, Nepal",
      text: "The neighborhood insights were invaluable. We knew exactly what we were getting."
    },
    {
      name: "Ramesh Karki",
      location: "Lalitpur, Nepal",
      text: "Best real estate experience ever. The AI recommendations were spot-on and saved us months."
    }
  ];

  return (
    <section className="bg-[#F9F7F2] py-8 md:py-16 overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-6 md:px-8">
        {/* Section Header */}
        <div className="mb-8 md:mb-16">
          <div className="font-space-mono text-[10px] md:text-sm text-[#D4755B] uppercase tracking-widest mb-2 md:mb-4">Testimonials</div>
          <h2 className="font-fraunces text-2xl md:text-5xl text-[#111827]">What Our Clients Say</h2>
        </div>

        {/* Horizontal Scroll on Mobile, Grid on Desktop */}
        <div className="flex md:grid md:grid-cols-3 gap-6 overflow-x-auto pb-6 md:pb-0 hide-scrollbar snap-x">
          {testimonials.map((t, i) => (
            <div key={i} className="flex-none w-[280px] md:w-auto bg-white border border-[#f3f4f6] rounded-2xl p-6 md:p-8 snap-center">
              <div className="flex gap-1 mb-3 md:mb-4 text-stitch-accent-red">
                {[...Array(5)].map((_, star) => (
                  <span key={star} className="material-icons text-sm md:text-xl">star</span>
                ))}
              </div>
              <p className="font-manrope text-sm md:text-base text-[#4b5563] leading-relaxed mb-4 md:mb-6">
                "{t.text}"
              </p>
              <div className="flex items-center gap-3 mt-auto">
                <div className="w-8 h-8 md:w-12 md:h-12 bg-slate-100 rounded-full flex items-center justify-center">
                  <span className="material-symbols-outlined text-slate-400 text-sm md:text-xl">person</span>
                </div>
                <div>
                  <div className="font-syne font-bold text-xs md:text-sm text-[#111827]">{t.name}</div>
                  <div className="font-manrope text-[10px] md:text-xs text-[#6b7280]">{t.location}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
