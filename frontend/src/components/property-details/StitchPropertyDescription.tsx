import React from 'react';

interface StitchPropertyDescriptionProps {
    description: string;
}

const StitchPropertyDescription: React.FC<StitchPropertyDescriptionProps> = ({ description }) => {
    return (
        <div className="space-y-8 font-stitch-display text-left">
            <div className="bg-orange-50/50 dark:bg-orange-900/5 p-8 md:p-10 rounded-3xl border border-orange-100 dark:border-orange-900/20 shadow-sm relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-orange-200/20 blur-3xl rounded-full -mr-16 -mt-16 group-hover:bg-orange-300/30 transition-colors"></div>

                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 border-b border-orange-100 dark:border-orange-900/20 pb-6">
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <span className="bg-orange-100 dark:bg-orange-900/30 text-orange-600 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5 shadow-sm">
                                <span className="material-symbols-outlined text-sm font-bold">verified</span>
                                Verified Listing
                            </span>
                        </div>
                        <h3 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white leading-tight">
                            Why buy this property?
                        </h3>
                    </div>
                </div>

                <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
                    {[
                        { text: 'Premium location with high appreciation potential.', icon: 'trending_up' },
                        { text: 'Modern amenities including 24/7 security and parking.', icon: 'security' },
                        { text: 'Spacious design with excellent natural ventilation.', icon: 'air' },
                        { text: 'Proximity to schools, hospitals, and shopping centers.', icon: 'location_on' }
                    ].map((item, idx) => (
                        <li key={idx} className="flex items-start gap-4 group/item">
                            <div className="size-10 rounded-xl bg-white dark:bg-slate-800 shadow-sm flex items-center justify-center shrink-0 group-hover/item:scale-110 transition-transform">
                                <span className="material-symbols-outlined text-orange-600 text-xl font-medium">{item.icon}</span>
                            </div>
                            <span className="text-sm md:text-base text-slate-700 dark:text-slate-300 font-semibold leading-snug pt-1">
                                {item.text}
                            </span>
                        </li>
                    ))}
                </ul>
            </div>

            <section>
                <h3 className="text-xl font-black mb-4 text-slate-900 dark:text-white">Description</h3>
                <div className="prose prose-slate dark:prose-invert max-w-none text-slate-600 dark:text-slate-400 leading-relaxed">
                    <p>{description}</p>
                    <button className="text-stitch-primary font-bold text-sm mt-4 hover:underline">Read More...</button>
                </div>
            </section>
        </div>
    );
};

export default StitchPropertyDescription;
