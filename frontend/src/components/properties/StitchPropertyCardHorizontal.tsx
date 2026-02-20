import React, { useState } from 'react';
import { Property } from '../../pages/PropertiesPage';
import { Link } from 'react-router-dom';
import StitchContactModal from './StitchContactModal';

interface StitchPropertyCardHorizontalProps {
    property: Property;
}

const StitchPropertyCardHorizontal: React.FC<StitchPropertyCardHorizontalProps> = ({ property }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const formatPrice = (price: number) => {
        if (price >= 10000000) return `Rs. ${(price / 10000000).toFixed(2)} Cr`;
        if (price >= 100000) return `Rs. ${(price / 100000).toFixed(2)} L`;
        return `Rs. ${price.toLocaleString()}`;
    };

    return (
        <div className="bg-white dark:bg-slate-900 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all border border-slate-200 dark:border-slate-800 flex flex-col md:flex-row h-full md:h-72 font-stitch-display animate-in fade-in slide-in-from-bottom-2 duration-500">
            {/* Modal */}
            <StitchContactModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                property={{
                    id: property._id || '',
                    title: property.title,
                    price: property.price,
                    location: property.location,
                    ownerPhone: (property as any).phone
                }}
            />

            <div className="relative w-full md:w-80 h-64 md:h-full shrink-0 group">
                <img
                    alt={property.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    src={property.image && property.image.length > 0 ? property.image[0] : 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1973&auto=format&fit=crop'}
                />
                {property.isVerified && (
                    <div className="absolute top-3 left-3 bg-green-600 text-white text-[10px] font-bold px-2 py-1 rounded-sm uppercase tracking-wider">Verified</div>
                )}
                <div className="absolute bottom-3 left-3 flex gap-1">
                    <span className="bg-black/60 text-white text-[10px] p-1 rounded flex items-center gap-1">
                        <span className="material-symbols-outlined text-[14px]">photo_camera</span> {property.image?.length || 0}
                    </span>
                </div>
                <button className="absolute top-3 right-3 text-white/80 hover:text-stitch-primary transition-colors drop-shadow-md">
                    <span className="material-symbols-outlined">favorite</span>
                </button>
            </div>

            <div className="p-6 flex-1 flex flex-col justify-between text-left">
                <div>
                    <div className="flex justify-between items-start mb-2">
                        <div>
                            <Link to={`/property/${property._id}`}>
                                <h3 className="text-xl font-bold text-slate-900 dark:text-white hover:text-stitch-primary cursor-pointer transition-colors max-w-sm truncate">
                                    {property.title}
                                </h3>
                            </Link>
                            <p className="text-sm text-slate-500 flex items-center gap-1 mt-1">
                                <span className="material-symbols-outlined text-sm text-stitch-primary">location_on</span> {property.location}
                            </p>
                        </div>
                        <div className="text-right">
                            <p className="text-2xl font-black text-stitch-primary">{formatPrice(property.price)}</p>
                            <p className="text-[10px] text-slate-500 font-medium tracking-tight">Price Negotiable</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4 mb-6 py-4 border-y border-slate-100 dark:border-slate-800">
                        <div>
                            <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Area</p>
                            <p className="text-sm font-bold">{property.sqft} sqft</p>
                        </div>
                        <div>
                            <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Rooms</p>
                            <p className="text-sm font-bold">{property.beds} BHK</p>
                        </div>
                        <div>
                            <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Status</p>
                            <p className="text-sm font-bold">{property.availability}</p>
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-4 overflow-hidden h-6">
                        {property.amenities?.slice(0, 3).map((amenity, idx) => (
                            <span key={idx} className="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-[10px] px-2 py-1 rounded font-medium whitespace-nowrap">
                                {amenity}
                            </span>
                        ))}
                    </div>
                </div>

                <div className="flex gap-3 mt-auto">
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="flex-1 bg-stitch-primary hover:bg-[#d43f11] text-white py-3 rounded-lg font-bold text-sm transition-all flex items-center justify-center gap-2"
                    >
                        Contact Owner
                    </button>
                    <Link
                        to={`/property/${property._id}`}
                        className="flex-1 border-2 border-stitch-primary text-stitch-primary hover:bg-stitch-primary/5 py-3 rounded-lg font-bold text-sm transition-all flex items-center justify-center gap-2 text-center"
                    >
                        View Details
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default StitchPropertyCardHorizontal;
