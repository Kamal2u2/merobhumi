import React from 'react';
import { useNavigate } from 'react-router-dom';

const StitchOwnerSection: React.FC = () => {
    const navigate = useNavigate();
    const miniProperties = [
        { id: 1, type: '2 BHK Apartment', price: 'Rs. 45,000', location: 'Durbarmarg, Kathmandu', image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop' },
        { id: 2, type: '3 BHK House', price: 'Rs. 2.1 Cr', location: 'Baneshwor, Kathmandu', image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2080&auto=format&fit=crop' },
        { id: 3, type: 'Studio Flat', price: 'Rs. 25,000', location: 'Sanepa, Lalitpur', image: 'https://images.unsplash.com/photo-1600607687946-371d74fe4abd?q=80&w=2070&auto=format&fit=crop' },
        { id: 4, type: '1 BHK Flat', price: 'Rs. 32,000', location: 'Jhamsikhel, Lalitpur', image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=2070&auto=format&fit=crop' }
    ];

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

                <div className="mt-12 flex flex-nowrap gap-6 overflow-x-auto pb-4 hide-scrollbar">
                    {miniProperties.map((prop) => (
                        <div key={prop.id} className="flex-none w-64 bg-white rounded-2xl p-4 text-slate-900 shadow-xl group hover:-translate-y-2 transition-all duration-300">
                            <div className="relative overflow-hidden rounded-xl mb-3">
                                <img className="w-full h-32 object-cover group-hover:scale-110 transition-transform duration-500" src={prop.image} alt={prop.type} />
                                <div className="absolute top-2 left-2 bg-blue-600 text-[8px] font-black text-white px-2 py-0.5 rounded-full uppercase tracking-widest">Owner</div>
                            </div>
                            <div className="flex justify-between items-start mb-2">
                                <h4 className="font-bold text-sm tracking-tight">{prop.type}</h4>
                                <p className="text-blue-600 font-extrabold text-sm whitespace-nowrap">{prop.price}</p>
                            </div>
                            <p className="text-[10px] text-slate-500 font-medium flex items-center gap-1 mb-4">
                                <span className="material-symbols-outlined text-[14px]">location_on</span> {prop.location}
                            </p>
                            <button
                                onClick={() => navigate('/contact')}
                                className="w-full py-2.5 bg-slate-100 dark:bg-slate-50 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-all shadow-sm"
                            >
                                Contact Owner
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default StitchOwnerSection;
