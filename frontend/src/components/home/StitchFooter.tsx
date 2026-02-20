import React from 'react';
import { Link } from 'react-router-dom';

const StitchFooter: React.FC = () => {
    return (
        <footer className="font-stitch-display bg-white dark:bg-background-dark py-16 border-t border-slate-200 dark:border-slate-800 mt-8 md:mt-12">
            <div className="max-w-7xl mx-auto px-4 text-left">
                <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
                    <div className="col-span-2">
                        <div className="flex items-center gap-2 mb-6">
                            <img src="/logo.svg" alt="Merobhumi" className="h-24 md:h-36 w-auto max-w-[350px] md:max-w-[500px] object-contain" />
                        </div>
                        <p className="text-sm text-slate-500 max-w-xs leading-relaxed">
                            Merobhumi is Nepal's No 1 Property portal and has been adjudged as the most preferred real estate portal in the country.
                        </p>
                    </div>

                    <div>
                        <h4 className="font-black text-sm mb-6 uppercase !text-slate-900 dark:!text-white !font-stitch-display">Buy</h4>
                        <ul className="space-y-3 text-sm text-slate-500">
                            <li><Link className="hover:text-stitch-primary transition-colors" to="/properties">Residential Plots</Link></li>
                            <li><Link className="hover:text-stitch-primary transition-colors" to="/properties">Villas for Sale</Link></li>
                            <li><Link className="hover:text-stitch-primary transition-colors" to="/properties">Apartments</Link></li>
                            <li><Link className="hover:text-stitch-primary transition-colors" to="/properties">New Projects</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-black text-sm mb-6 uppercase !text-slate-900 dark:!text-white !font-stitch-display tracking-widest">Resources</h4>
                        <ul className="space-y-3 text-sm text-slate-500 font-medium">
                            <li><Link className="hover:text-stitch-primary transition-colors" to="/properties">Property Rates</Link></li>
                            <li><Link className="hover:text-stitch-primary transition-colors" to="/contact">EMI Calculator</Link></li>
                            <li><Link className="hover:text-stitch-primary transition-colors" to="/contact">Legal Guide</Link></li>
                            <li><Link className="hover:text-stitch-primary transition-colors" to="/contact">Real Estate News</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-black text-sm mb-6 uppercase !text-slate-900 dark:!text-white !font-stitch-display tracking-widest">Company</h4>
                        <ul className="space-y-3 text-sm text-slate-500 font-medium">
                            <li><Link className="hover:text-stitch-primary transition-colors" to="/about">About Us</Link></li>
                            <li><Link className="hover:text-stitch-primary transition-colors" to="/contact">Contact Us</Link></li>
                            <li><Link className="hover:text-stitch-primary transition-colors" to="/about">Careers</Link></li>
                            <li><Link className="hover:text-stitch-primary transition-colors" to="/about">Privacy Policy</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="pt-8 border-t border-slate-100 dark:border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="flex items-center gap-6">
                        <a href="https://facebook.com" target="_blank" rel="noreferrer" className="material-symbols-outlined text-slate-400 hover:text-blue-600 transition-colors cursor-pointer">facebook</a>
                        <a href="https://twitter.com" target="_blank" rel="noreferrer" className="material-symbols-outlined text-slate-400 hover:text-sky-400 transition-colors cursor-pointer">public</a>
                        <a href="mailto:info@merobhumi.com" className="material-symbols-outlined text-slate-400 hover:text-stitch-primary transition-colors cursor-pointer">alternate_email</a>
                    </div>
                    <p className="text-xs text-slate-400 font-medium">© 2024 Merobhumi Realty Services. Built for the future of Nepal.</p>
                </div>
            </div>
        </footer>
    );
};

export default StitchFooter;
