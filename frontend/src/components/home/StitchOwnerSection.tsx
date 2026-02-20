import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { propertiesAPI } from '../../services/api';

const StitchOwnerSection: React.FC = () => {
    const navigate = useNavigate();
    const [properties, setProperties] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOwnerListings = async () => {
            try {
                setLoading(true);
                const { data } = await propertiesAPI.getOwnerListings();
                if (data.success && data.property) {
                    setProperties(data.property.slice(0, 4)); // Show top 4
                }
            } catch (err) {
                console.error('Failed to fetch owner listings:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchOwnerListings();
    }, []);

    const formatPrice = (price: number) => {
        if (price >= 10000000) return `Rs. ${(price / 10000000).toFixed(1)} Cr`;
        if (price >= 100000) return `Rs. ${(price / 100000).toFixed(1)} L`;
        return `Rs. ${price.toLocaleString()}`;
    };

    if (!loading && properties.length === 0) return null; // Hide if no real owner listings

    return (
        <section className="font-stitch-display bg-blue-600 rounded-3xl p-8 md:p-12 text-white relative overflow-hidden my-16 shadow-2xl">
            <div className="absolute right-0 top-0 h-full w-1/3 opacity-20 hidden lg:block">
                <svg className="w-full h-full" fill="white" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100,0 L400,0 L400,400 L100,400 Q200,200 100,0 Z"></path>
                </svg>
            </div>
            <div className="relative z-10">
                <div className="max-w-xl text-left">
                    <h2 className="text-3xl font-black mb-4 !text-white !font-stitch-display">Zero Brokerage Properties</h2>
                    <p className="text-blue-100 mb-8 leading-relaxed">Connect directly with owners and save thousands on brokerage fees. We have verified owner listings across Nepal.</p>
                    <button
                        onClick={() => navigate('/properties?owner=true')}
                        className="bg-white text-blue-600 px-8 py-3 rounded-full font-bold shadow-lg hover:bg-blue-50 transition-all hover:scale-105"
                    >
                        Explore Owner Listings
                    </button>
                </div>

                <div className="mt-12 flex flex-nowrap gap-6 overflow-x-auto pb-4 hide-scrollbar min-h-[250px]">
                    {loading ? (
                        [1, 2, 3, 4].map((n) => (
                            <div key={n} className="flex-none w-64 bg-white/10 rounded-2xl p-4 animate-pulse">
                                <div className="w-full h-32 bg-white/20 rounded-xl mb-3"></div>
                                <div className="h-4 bg-white/20 rounded w-3/4 mb-2"></div>
                                <div className="h-4 bg-white/20 rounded w-1/2"></div>
                            </div>
                        ))
                    ) : (
                        properties.map((prop) => (
                            <div
                                key={prop._id}
                                onClick={() => navigate(`/properties/${prop._id}`)}
                                className="flex-none w-64 bg-white rounded-2xl p-4 text-slate-900 shadow-xl group hover:-translate-y-2 transition-all duration-300 cursor-pointer"
                            >
                                <div className="relative overflow-hidden rounded-xl mb-3">
                                    <img
                                        className="w-full h-32 object-cover group-hover:scale-110 transition-transform duration-500"
                                        src={prop.image?.[0] || 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1000&auto=format&fit=crop'}
                                        alt={prop.title}
                                    />
                                    <div className="absolute top-2 left-2 bg-blue-600 text-[8px] font-black text-white px-2 py-0.5 rounded-full uppercase tracking-widest">Owner</div>
                                </div>
                                <div className="flex justify-between items-start mb-2">
                                    <h4 className="font-bold text-sm tracking-tight line-clamp-1">{prop.title}</h4>
                                    <p className="text-blue-600 font-extrabold text-sm whitespace-nowrap ml-2">{formatPrice(prop.price)}</p>
                                </div>
                                <p className="text-[10px] text-slate-500 font-medium flex items-center gap-1 mb-4">
                                    <span className="material-symbols-outlined text-[14px]">location_on</span>
                                    <span className="line-clamp-1">{prop.location}</span>
                                </p>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        navigate(`/properties/${prop._id}`);
                                    }}
                                    className="w-full py-2.5 bg-slate-100 dark:bg-slate-50 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-all shadow-sm"
                                >
                                    View Details
                                </button>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </section>
    );
};

export default StitchOwnerSection;
