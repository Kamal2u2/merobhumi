import React from 'react';

interface StitchPropertiesHeaderProps {
    totalResults: number;
}

const StitchPropertiesHeader: React.FC<StitchPropertiesHeaderProps> = ({ totalResults }) => {
    return (
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 font-stitch-display text-left">
            <div>
                <h2 className="text-lg md:text-xl font-black text-slate-900 dark:text-white">
                    {totalResults} Results | <span className="font-medium text-slate-500 text-base md:text-lg">Properties for Sale in Nepal</span>
                </h2>
            </div>
            <div className="flex items-center gap-4 text-xs md:text-sm">
                <div className="flex items-center gap-2">
                    <span className="text-slate-500">Sort by:</span>
                    <select className="border-none bg-transparent font-bold text-stitch-primary focus:ring-0 cursor-pointer outline-none p-0">
                        <option>Relevance</option>
                        <option>Price: Low to High</option>
                        <option>Price: High to Low</option>
                        <option>Newest First</option>
                    </select>
                </div>
            </div>
        </div>
    );
};

export default StitchPropertiesHeader;
