import React from 'react';

interface StitchPropertyMainInfoProps {
    title: string;
    location: string;
    price: number;
    beds: number;
    baths: number;
    sqft: number;
    type: string;
    availability: string;
}

const StitchPropertyMainInfo: React.FC<StitchPropertyMainInfoProps> = ({
    title, location, price, beds, baths, sqft, type, availability
}) => {
    const formatPrice = (p: number) => {
        if (p >= 10000000) return `Rs. ${(p / 10000000).toFixed(2)} Cr`;
        if (p >= 100000) return `Rs. ${(p / 100000).toFixed(2)} L`;
        return `Rs. ${p.toLocaleString()}`;
    };

    const perSqft = (price / sqft).toFixed(0);

    return (
        <div className="bg-white dark:bg-slate-900 p-5 md:p-8 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm font-stitch-display text-left">
            <div className="flex flex-col md:flex-row justify-between items-start gap-4 md:items-start mb-8">
                <div className="w-full">
                    <h2 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white mb-2 leading-tight">{title}</h2>
                    <p className="text-slate-500 flex items-center gap-1.5 text-xs md:text-sm">
                        <span className="material-symbols-outlined text-base text-stitch-primary">location_on</span>
                        {location}
                    </p>
                </div>
                <div className="flex gap-3 shrink-0 self-end md:self-start">
                    <button className="p-2 md:p-2.5 rounded-full border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:border-stitch-primary hover:text-stitch-primary transition-all flex items-center justify-center">
                        <span className="material-symbols-outlined text-lg md:text-xl">share</span>
                    </button>
                    <button className="p-2 md:p-2.5 rounded-full border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:border-stitch-primary hover:text-stitch-primary transition-all flex items-center justify-center">
                        <span className="material-symbols-outlined text-lg md:text-xl">favorite</span>
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8 border-t border-slate-100 dark:border-slate-800">
                <div>
                    <p className="text-[9px] md:text-[10px] text-slate-500 uppercase font-black tracking-widest mb-1.5">Price</p>
                    <p className="text-xl md:text-2xl font-black text-stitch-primary leading-none mb-1">{formatPrice(price)}</p>
                    <p className="text-[9px] md:text-[10px] text-slate-400 font-medium whitespace-nowrap">@ Rs. {perSqft} / sqft</p>
                </div>
                <div>
                    <p className="text-[10px] text-slate-500 uppercase font-black tracking-widest mb-1.5">Config</p>
                    <p className="text-lg font-bold text-slate-900 dark:text-white leading-none mb-1">{beds} BHK {type}</p>
                    <p className="text-[10px] text-slate-400 font-medium">{baths} Baths</p>
                </div>
                <div>
                    <p className="text-[10px] text-slate-500 uppercase font-black tracking-widest mb-1.5">Area</p>
                    <p className="text-lg font-bold text-slate-900 dark:text-white leading-none mb-1">{sqft.toLocaleString()} sqft</p>
                    <p className="text-[10px] text-slate-400 font-medium">Carpet Area</p>
                </div>
                <div>
                    <p className="text-[10px] text-slate-500 uppercase font-black tracking-widest mb-1.5">Status</p>
                    <p className="text-lg font-bold text-slate-900 dark:text-white leading-none mb-1 capitalize">{availability}</p>
                    <p className="text-[10px] text-slate-400 font-medium">Verified Listing</p>
                </div>
            </div>
        </div>
    );
};

export default StitchPropertyMainInfo;
