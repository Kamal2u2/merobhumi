import React from 'react';

const StatsSection: React.FC = () => {
  const stats = [
    { label: "Properties Sold", value: "2,450+" },
    { label: "Client Satisfaction", value: "98%" },
    { label: "Cities Covered", value: "150+" },
    { label: "Market Value", value: "$1.2B" }
  ];

  return (
    <section className="bg-stitch-primary/5 border-y border-stitch-primary/10 py-8 md:py-12">
      <div className="max-w-[1280px] mx-auto px-6 md:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-y-8 md:divide-x md:divide-stitch-primary/10">
          {stats.map((stat, i) => (
            <div key={i} className="text-center px-2">
              <div className="font-space-mono font-bold text-2xl md:text-4xl text-stitch-primary mb-1 md:mb-2">{stat.value}</div>
              <div className="font-syne font-medium text-[10px] md:text-sm text-slate-500 uppercase tracking-widest">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
