import React from 'react';

interface StitchPropertyGalleryProps {
    images: string[];
}

const StitchPropertyGallery: React.FC<StitchPropertyGalleryProps> = ({ images }) => {
    const mainImage = images && images.length > 0 ? images[0] : 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070&auto=format&fit=crop';
    const secondaryImages = images && images.length > 1 ? images.slice(1, 3) : [
        'https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1973&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1448630321422-a1cf5a8760e4?q=80&w=2070&auto=format&fit=crop'
    ];

    return (
        <section className="font-stitch-display mb-6 md:mb-10 px-0 md:px-0">
            {/* Desktop Grid (Hidden on Mobile) */}
            <div className="hidden md:grid grid-cols-12 gap-2 h-[450px] overflow-hidden rounded-xl">
                <div className={`${images.length > 1 ? 'col-span-8' : 'col-span-12'} h-full relative group cursor-pointer overflow-hidden`}>
                    <img
                        alt="Main Property"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        src={mainImage}
                    />
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-all"></div>
                </div>

                {images.length > 1 && (
                    <div className="col-span-4 grid grid-rows-2 gap-2 h-full">
                        {secondaryImages.map((img, idx) => (
                            <div key={idx} className="relative group cursor-pointer overflow-hidden">
                                <img
                                    alt={`Property ${idx + 2}`}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    src={img}
                                />
                                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-all"></div>
                                {(idx === 1 || images.length === 2 && idx === 0) && (
                                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/50 transition-all text-white">
                                        <button className="font-stitch-display font-black flex items-center gap-2 text-sm tracking-tight bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 hover:bg-white/20 transition-colors">
                                            <span className="material-symbols-outlined text-xl">grid_view</span>
                                            View All {images.length} Photos
                                        </button>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Mobile Stack (Visible only on Mobile) */}
            <div className="md:hidden space-y-2">
                <div className="relative aspect-[4/3] rounded-xl overflow-hidden shadow-lg">
                    <img
                        alt="Main Property Mobile"
                        className="w-full h-full object-cover"
                        src={mainImage}
                    />
                    <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-md text-white px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-2 border border-white/10">
                        <span className="material-symbols-outlined text-sm">photo_camera</span>
                        1 / {images.length || 1}
                    </div>
                </div>
                {images.length > 1 && (
                    <button className="w-full py-4 text-stitch-primary font-black uppercase text-xs tracking-widest border-2 border-stitch-primary/10 rounded-xl hover:bg-stitch-primary/5 transition-colors flex items-center justify-center gap-2">
                        <span className="material-symbols-outlined text-xl">grid_view</span>
                        View All Photos
                    </button>
                )}
            </div>
        </section>
    );
};

export default StitchPropertyGallery;
