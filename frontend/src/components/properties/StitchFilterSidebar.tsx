import React, { useState } from 'react';

interface StitchFilterSidebarProps {
    onFilterChange?: (filters: any) => void;
}

const StitchFilterSidebar: React.FC<StitchFilterSidebarProps> = ({ onFilterChange }) => {
    const [priceMax, setPriceMax] = useState(100);
    const [selectedPostedBy, setSelectedPostedBy] = useState<string[]>([]);
    const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);

    const amenities = [
        { label: 'Power Backup', count: 142 },
        { label: 'Gymnasium', count: 56 },
        { label: 'Swimming Pool', count: 89 },
        { label: 'Reserved Parking', count: 210 },
        { label: 'Security', count: 175 },
        { label: 'Clubhouse', count: 45 },
    ];

    const handlePostedByChange = (type: string) => {
        const newSelected = selectedPostedBy.includes(type)
            ? selectedPostedBy.filter(t => t !== type)
            : [...selectedPostedBy, type];
        setSelectedPostedBy(newSelected);
        onFilterChange?.({ postedBy: newSelected, priceMax, amenities: selectedAmenities });
    };

    const handleAmenityChange = (label: string) => {
        const newSelected = selectedAmenities.includes(label)
            ? selectedAmenities.filter(l => l !== label)
            : [...selectedAmenities, label];
        setSelectedAmenities(newSelected);
        onFilterChange?.({ postedBy: selectedPostedBy, priceMax, amenities: newSelected });
    };

    const handlePriceChange = (value: number) => {
        setPriceMax(value);
        onFilterChange?.({ postedBy: selectedPostedBy, priceMax: value, amenities: selectedAmenities });
    };

    return (
        <aside className="hidden lg:block w-72 flex-shrink-0 space-y-6 font-stitch-display">
            <div className="bg-white dark:bg-slate-900 rounded-xl p-5 shadow-sm border border-slate-200 dark:border-slate-800 text-left">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="font-bold text-lg text-slate-900 dark:text-white">Filters</h3>
                    <button
                        onClick={() => {
                            setPriceMax(100);
                            setSelectedPostedBy([]);
                            setSelectedAmenities([]);
                            onFilterChange?.({ postedBy: [], priceMax: 100, amenities: [] });
                        }}
                        className="text-stitch-primary text-xs font-bold uppercase hover:underline"
                    >
                        Reset
                    </button>
                </div>

                <div className="space-y-8">
                    {/* Price Range */}
                    <div>
                        <h4 className="font-bold text-sm mb-4 text-slate-900 dark:text-white uppercase tracking-wider">Price Range</h4>
                        <div className="px-2">
                            <input
                                className="w-full accent-stitch-primary cursor-pointer"
                                max="100"
                                min="0"
                                type="range"
                                value={priceMax}
                                onChange={(e) => handlePriceChange(parseInt(e.target.value))}
                            />
                            <div className="flex justify-between mt-2 text-xs font-medium text-slate-500">
                                <span>Rs. 0</span>
                                <span>Rs. {priceMax === 100 ? '10 Cr+' : `${priceMax * 10} L`}</span>
                            </div>
                        </div>
                    </div>

                    {/* Area */}
                    <div>
                        <h4 className="font-bold text-sm mb-4 text-slate-900 dark:text-white uppercase tracking-wider">Area (sqft)</h4>
                        <div className="grid grid-cols-2 gap-2">
                            <input className="w-full bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded text-xs p-2 outline-none focus:border-stitch-primary" placeholder="Min" type="text" />
                            <input className="w-full bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded text-xs p-2 outline-none focus:border-stitch-primary" placeholder="Max" type="text" />
                        </div>
                    </div>

                    {/* Posted By */}
                    <div>
                        <h4 className="font-bold text-sm mb-4 text-slate-900 dark:text-white uppercase tracking-wider">Posted By</h4>
                        <div className="space-y-3">
                            {['Owner', 'Developer', 'Agent'].map((type) => (
                                <label key={type} className="flex items-center gap-3 cursor-pointer group">
                                    <input
                                        className="rounded text-stitch-primary focus:ring-stitch-primary border-slate-300 cursor-pointer"
                                        type="checkbox"
                                        checked={selectedPostedBy.includes(type)}
                                        onChange={() => handlePostedByChange(type)}
                                    />
                                    <span className="text-sm text-slate-600 dark:text-slate-400 group-hover:text-stitch-primary transition-colors">{type}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Amenities */}
                    <div>
                        <h4 className="font-bold text-sm mb-4 text-slate-900 dark:text-white uppercase tracking-wider">Amenities</h4>
                        <div className="space-y-3">
                            {amenities.map((amenity) => (
                                <label key={amenity.label} className="flex items-center gap-3 cursor-pointer group">
                                    <input
                                        className="rounded text-stitch-primary focus:ring-stitch-primary border-slate-300 cursor-pointer"
                                        type="checkbox"
                                        checked={selectedAmenities.includes(amenity.label)}
                                        onChange={() => handleAmenityChange(amenity.label)}
                                    />
                                    <span className="text-sm text-slate-600 dark:text-slate-400 group-hover:text-stitch-primary transition-colors">{amenity.label}</span>
                                </label>
                            ))}
                            <button className="text-stitch-primary text-xs font-bold mt-2 hover:underline">Show all amenities</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile App Banner (Stitch Style) */}
            <div className="bg-stitch-primary/10 rounded-xl p-4 border border-stitch-primary/20 text-left">
                <p className="text-sm font-bold text-stitch-primary mb-2">Want to sell faster?</p>
                <button className="bg-stitch-primary text-white text-xs font-bold px-4 py-2 rounded-lg w-full hover:bg-opacity-90 transition-all">Post Property Free</button>
            </div>
        </aside>
    );
};

export default StitchFilterSidebar;
