import React from 'react';
import { Property } from '../../pages/PropertiesPage';
import StitchPropertyCardVertical from '../properties/StitchPropertyCardVertical';
import { Link } from 'react-router-dom';

interface StitchFeaturedListingsProps {
    properties: Property[];
    title?: string;
}

const StitchFeaturedListings: React.FC<StitchFeaturedListingsProps> = ({ properties, title = "Newest Listings" }) => {
    if (!properties || properties.length === 0) return null;

    return (
        <section className="py-16 font-stitch-display animate-in fade-in slide-in-from-bottom-6 duration-1000">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-2">{title}</h2>
                    <p className="text-slate-500 text-sm">Explore the latest property additions to our platform</p>
                </div>
                <Link
                    to="/properties"
                    className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-stitch-primary font-bold px-6 py-2 rounded-full text-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition-all flex items-center gap-2"
                >
                    Explore All <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {properties.slice(0, 8).map((property, idx) => (
                    <StitchPropertyCardVertical key={property._id || `featured-${idx}`} property={property} />
                ))}
            </div>
        </section>
    );
};

export default StitchFeaturedListings;
