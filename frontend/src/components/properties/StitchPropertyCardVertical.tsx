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
        <Link to={`/property/${property._id}`} className="group bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 font-stitch-display text-left">
            <div className="h-48 overflow-hidden relative">
                <img
                    alt={property.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    src={property.image?.[0] || 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1973&auto=format&fit=crop'}
                />
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded text-[10px] font-bold uppercase text-slate-900 border border-slate-200">
                    {property.type}
                </div>
            </div>
            <div className="p-4">
                <h4 className="font-bold text-slate-900 dark:text-white mb-1 group-hover:text-stitch-primary transition-colors truncate">
                    {property.title}
                </h4>
                <p className="text-xs text-slate-500 mb-4 flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px] text-stitch-primary">location_on</span>
                    {property.location}
                </p>
                <div className="flex justify-between items-center pt-3 border-t border-slate-100 dark:border-slate-800">
                    <span className="text-lg font-black text-stitch-primary">{formatPrice(property.price)}</span>
                    <span className="text-[10px] font-bold bg-slate-50 dark:bg-slate-800 px-2 py-1 rounded text-slate-500 uppercase">
                        {property.beds} BHK
                    </span>
                </div>
            </div>
        </Link>
    );
};

export default StitchPropertyCardVertical;
