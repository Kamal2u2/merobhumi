import React from 'react';
import { Link } from 'react-router-dom';
import { Property } from '../../pages/PropertiesPage';

interface Project {
    id: string;
    title: string;
    location: string;
    price: string;
    developer: string;
    image: string;
    badge?: string;
}

interface StitchProjectsProps {
    properties?: Property[];
}

const StitchProjects: React.FC<StitchProjectsProps> = ({ properties: dynamicProperties }) => {
    const defaultProjects: Project[] = [
        {
            id: '1',
            title: 'Himalayan Heights',
            location: 'Budhanilkantha, Kathmandu',
            price: 'Rs. 4.5 Cr',
            developer: 'Mero Developers',
            badge: 'New Launch',
            image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070&auto=format&fit=crop'
        },
        {
            id: '2',
            title: 'Lakeside Villas',
            location: 'Sedi, Pokhara',
            price: 'Rs. 2.8 Cr',
            developer: 'Pokhara Realty',
            badge: 'Ready to Move',
            image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=2071&auto=format&fit=crop'
        }
    ];

    const displayProperties = dynamicProperties && dynamicProperties.length > 0
        ? dynamicProperties
        : defaultProjects;

    const formatPrice = (price: number) => {
        if (price >= 10000000) return `Rs. ${(price / 10000000).toFixed(1)} Cr`;
        if (price >= 100000) return `Rs. ${(price / 100000).toFixed(1)} L`;
        return `Rs. ${price.toLocaleString()}`;
    };

    return (
        <section className="font-stitch-display py-6 md:py-10">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h2 className="text-2xl font-black text-slate-900 dark:text-white">Popular Projects</h2>
                    <p className="text-slate-500 text-sm mt-1">Handpicked projects for you in Top Localities</p>
                </div>
                <Link to="/properties" className="text-stitch-primary font-bold text-sm flex items-center gap-1 hover:underline">
                    View All <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </Link>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
                {displayProperties.map((item: any, idx: number) => {
                    const id = item._id || item.id || `project-${idx}`;
                    const title = item.title;
                    const location = item.location;
                    const price = typeof item.price === 'number' ? formatPrice(item.price) : item.price;
                    const image = item.image?.[0] || item.image || 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1973&auto=format&fit=crop';
                    const developer = item.ownerName || item.developer || 'Verified Seller';
                    const badge = item.status === 'featured' ? 'Featured' : item.badge;

                    return (
                        <Link
                            key={id}
                            to={`/property/${id}`}
                            className="bg-white dark:bg-slate-900 rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow border border-slate-100 dark:border-slate-800 group"
                        >
                            <div className="relative h-48">
                                <img
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    src={image}
                                    alt={title}
                                />
                                {badge && (
                                    <span className={`absolute top-3 left-3 text-white text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider ${badge === 'New Launch' || badge === 'Featured' ? 'bg-stitch-accent-red' : 'bg-blue-600'}`}>
                                        {badge}
                                    </span>
                                )}
                            </div>
                            <div className="p-5">
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="bg-stitch-primary/10 text-stitch-primary text-[10px] font-bold px-1.5 py-0.5 rounded">VERIFIED</span>
                                    <span className="text-xs font-semibold text-slate-400 truncate">{developer}</span>
                                </div>
                                <h3 className="font-bold text-lg mb-1 group-hover:text-stitch-primary transition-colors truncate">{title}</h3>
                                <p className="text-xs text-slate-500 mb-4 flex items-center gap-1">
                                    <span className="material-symbols-outlined text-sm">location_on</span> {location}
                                </p>
                                <div className="flex items-center justify-between pt-4 border-t border-slate-50 dark:border-slate-800">
                                    <div>
                                        <p className="text-xs text-slate-400 font-medium">Starting from</p>
                                        <p className="text-lg font-black text-stitch-primary">{price}</p>
                                    </div>
                                    <span className="material-symbols-outlined text-slate-300 group-hover:text-stitch-primary transition-colors">favorite</span>
                                </div>
                            </div>
                        </Link>
                    );
                })}
            </div>
        </section>
    );
};

export default StitchProjects;
