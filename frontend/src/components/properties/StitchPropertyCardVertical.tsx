import React from 'react';
import { Property } from '../../pages/PropertiesPage';
import { Link } from 'react-router-dom';

interface StitchPropertyCardVerticalProps {
    property: Property;
}

const StitchPropertyCardVertical: React.FC<StitchPropertyCardVerticalProps> = ({ property }) => {
    const formatPrice = (p: number) => {
        if (p >= 10000000) return `Rs. ${(p / 10000000).toFixed(2)} Cr`;
        if (p >= 100000) return `Rs. ${(p / 100000).toFixed(2)} L`;
        return `Rs. ${p.toLocaleString()}`;
    };

    return (
        <Link to={`/property/${property._id}`} className="group bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 font-stitch-display text-left flex flex-col h-full">
            <div className="h-28 md:h-48 overflow-hidden relative">
                <img
                    alt={property.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    src={property.image?.[0] || 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1973&auto=format&fit=crop'}
                />
                <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-1.5 py-0.5 rounded text-[8px] font-bold uppercase text-slate-900 border border-slate-200">
                    {property.type}
                </div>
            </div>
            <div className="p-2.5 md:p-4 flex flex-col flex-1">
                <h4 className="font-bold text-slate-900 dark:text-white mb-0.5 group-hover:text-[#D8232A] transition-colors truncate text-xs md:text-sm">
                    {property.title}
                </h4>
                <p className="text-[10px] md:text-xs text-slate-500 mb-2 md:mb-4 flex items-center gap-1">
                    <span className="material-symbols-outlined text-[12px] md:text-[14px] text-[#D8232A]">location_on</span>
                    <span className="truncate">{property.location}</span>
                </p>
                <div className="flex flex-col md:flex-row md:justify-between md:items-center pt-2 md:pt-3 border-t border-slate-100 dark:border-slate-800 mt-auto">
                    <span className="text-sm md:text-lg font-black text-[#D8232A] leading-tight">{formatPrice(property.price)}</span>
                    <span className="text-[8px] md:text-[10px] font-bold bg-slate-50 dark:bg-slate-800 px-1.5 py-0.5 rounded text-slate-500 uppercase w-fit mt-1 md:mt-0">
                        {property.beds} BHK
                    </span>
                </div>
            </div>
        </Link>
    );
};

export default StitchPropertyCardVertical;
