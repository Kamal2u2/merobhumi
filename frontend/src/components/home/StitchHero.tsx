import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';

const StitchHero: React.FC = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = React.useState('Buy');
    const [searchQuery, setSearchQuery] = React.useState('');
    const [type, setType] = React.useState('Flat');
    const [budget, setBudget] = React.useState('Budget');

    const { scrollY } = useScroll();
    const y1 = useTransform(scrollY, [0, 500], [0, 200]);
    const opacity = useTransform(scrollY, [0, 300], [1, 0]);

    const handleSearch = () => {
        const params = new URLSearchParams();
        if (searchQuery) params.append('location', searchQuery);
        if (type && type !== 'Type') params.append('type', type);
        if (budget && budget !== 'Budget') params.append('budget', budget);
        if (activeTab === 'Rent') params.append('purpose', 'rent');

        navigate(`/properties?${params.toString()}`);
    };

    return (
        <section className="relative h-[500px] md:h-[520px] flex items-center justify-center overflow-hidden font-stitch-display">
            <motion.div
                style={{ y: y1 }}
                className="absolute inset-0 bg-cover bg-center z-0 scale-110"
                initial={{ scale: 1.2 }}
                animate={{ scale: 1.1 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
            >
                <div
                    className="absolute inset-0"
                    style={{
                        backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.6)), url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop')`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                    }}
                />
            </motion.div>
            <motion.div
                style={{ opacity }}
                className="relative z-10 w-full max-w-5xl px-4 text-center"
            >
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.8 }}
                    className="text-3xl md:text-6xl font-black text-white mb-6 md:mb-10 tracking-tight drop-shadow-lg"
                >
                    Find a home you'll love
                </motion.h2>

                {/* Search Component */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 30 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.8, type: "spring", stiffness: 100 }}
                    className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-md rounded-2xl shadow-2xl p-3 md:p-6 text-left border border-white/20"
                >
                    <div className="flex flex-wrap gap-6 mb-6 border-b border-slate-100 dark:border-slate-800 px-2 pb-2">
                        {['Buy', 'Rent', 'Commercial', 'Plots'].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`${activeTab === tab ? 'text-[#D8232A] border-[#D8232A]' : 'text-slate-500 border-transparent hover:text-[#D8232A]'} font-black pb-3 px-1 text-xs uppercase tracking-[0.2em] border-b-2 transition-all duration-300`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>

                    <div className="flex flex-col lg:flex-row items-stretch gap-3">
                        <div className="flex-[2] flex items-center bg-white dark:bg-slate-800 rounded-xl px-4 border border-slate-200 dark:border-slate-700 focus-within:ring-2 focus-within:ring-[#D8232A]/20 transition-all shadow-sm">
                            <span className="material-symbols-outlined text-slate-400">location_on</span>
                            <input
                                className="w-full bg-transparent border-none focus:ring-0 text-slate-900 dark:text-white py-4 font-semibold placeholder:text-slate-400"
                                placeholder="Enter Kathmandu, Lalitpur, or City"
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>

                        <div className="flex-1 flex items-center bg-white dark:bg-slate-800 rounded-xl px-4 border border-slate-200 dark:border-slate-700 shadow-sm">
                            <span className="material-symbols-outlined text-slate-400">home</span>
                            <select
                                value={type}
                                onChange={(e) => setType(e.target.value)}
                                className="w-full bg-transparent border-none focus:ring-0 text-slate-900 dark:text-white py-4 text-sm font-black uppercase tracking-widest outline-none"
                            >
                                <option>Flat</option>
                                <option>House</option>
                                <option>Villa</option>
                                <option>Land</option>
                            </select>
                        </div>

                        <div className="flex-1 flex items-center bg-white dark:bg-slate-800 rounded-xl px-4 border border-slate-200 dark:border-slate-700 shadow-sm">
                            <span className="material-symbols-outlined text-slate-400">payments</span>
                            <select
                                value={budget}
                                onChange={(e) => setBudget(e.target.value)}
                                className="w-full bg-transparent border-none focus:ring-0 text-slate-900 dark:text-white py-4 text-sm font-black uppercase tracking-widest outline-none"
                            >
                                <option>Budget</option>
                                <option>Under 50L</option>
                                <option>50L - 1Cr</option>
                                <option>Above 1Cr</option>
                            </select>
                        </div>

                        <button
                            onClick={handleSearch}
                            className="bg-[#D8232A] hover:bg-[#B91C1C] text-white px-10 py-4 rounded-xl font-black uppercase tracking-widest flex items-center justify-center gap-2 transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-[#D8232A]/30"
                        >
                            <span className="material-symbols-outlined font-bold">search</span>
                            Search
                        </button>
                    </div>
                </motion.div>
            </motion.div>
        </section>
    );
};

export default StitchHero;
