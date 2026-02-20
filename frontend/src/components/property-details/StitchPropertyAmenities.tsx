import React from 'react';

interface StitchPropertyAmenitiesProps {
    amenities: string[];
}

const StitchPropertyAmenities: React.FC<StitchPropertyAmenitiesProps> = ({ amenities }) => {
    const getIcon = (amenity: string) => {
        const a = amenity.toLowerCase();
        if (a.includes('pool')) return 'pool';
        if (a.includes('gym')) return 'fitness_center';
        if (a.includes('park')) return 'local_parking';
        if (a.includes('garden')) return 'park';
        if (a.includes('security')) return 'security';
        if (a.includes('play')) return 'stroller';
        if (a.includes('power') || a.includes('backup')) return 'bolt';
        return 'star';
    };

    return (
        <section className="font-stitch-display text-left py-4">
            <h3 className="text-xl font-black mb-6 text-slate-900 dark:text-white">Amenities</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {amenities.slice(0, 8).map((amenity, idx) => (
                    <div key={idx} className="flex flex-col items-center p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-slate-800 shadow-sm text-center group hover:border-stitch-primary transition-colors">
                        <span className="material-symbols-outlined text-3xl text-stitch-primary mb-2 group-hover:scale-110 transition-transform">{getIcon(amenity)}</span>
                        <span className="text-[10px] font-black text-slate-900 dark:text-slate-100 uppercase tracking-widest">{amenity}</span>
                    </div>
                ))}
            </div>
            {amenities.length > 8 && (
                <button className="w-full mt-6 py-3 border border-slate-200 dark:border-slate-800 rounded-lg text-sm font-bold text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                    Show all {amenities.length}+ Amenities
                </button>
            )}
        </section>
    );
};

export default StitchPropertyAmenities;
