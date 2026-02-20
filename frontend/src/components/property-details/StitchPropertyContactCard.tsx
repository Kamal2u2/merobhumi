import React from 'react';

interface StitchPropertyContactCardProps {
    propertyName: string;
    phone?: string;
    onContact?: () => void;
}

const StitchPropertyContactCard: React.FC<StitchPropertyContactCardProps> = ({ propertyName, phone, onContact }) => {
    return (
        <div className="lg:sticky lg:top-20 font-stitch-display space-y-4 md:space-y-6">
            <div className="bg-white dark:bg-slate-900 p-4 md:p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xl text-left">
                <h4 className="text-lg md:text-xl font-black mb-4 md:mb-6 text-slate-900 dark:text-white uppercase tracking-tight">Contact Owner</h4>
                <div className="flex items-center gap-3 md:gap-4 mb-6 md:mb-8">
                    <div className="size-12 md:size-14 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden ring-2 ring-slate-100 dark:ring-slate-800">
                        <img
                            alt="Agent"
                            className="w-full h-full object-cover"
                            src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1974&auto=format&fit=crop"
                        />
                    </div>
                    <div>
                        <p className="font-black text-slate-900 dark:text-white uppercase text-xs md:text-sm tracking-wide">Verified Owner</p>
                        <p className="text-[10px] md:text-xs text-slate-500 font-medium whitespace-nowrap">Relationship Manager Available</p>
                    </div>
                </div>

                <div className="space-y-3 md:space-y-4">
                    <p className="text-xs md:text-sm text-slate-500 font-medium leading-relaxed">
                        Interested in <span className="text-slate-900 dark:text-white font-bold">{propertyName}</span>?
                        Connect directly for the best deals.
                    </p>

                    <button
                        onClick={onContact}
                        className="w-full bg-stitch-primary hover:bg-[#d43f11] text-white font-black py-3.5 md:py-4 rounded-lg shadow-lg shadow-stitch-primary/30 transition-all uppercase tracking-widest text-xs md:text-sm mt-2"
                    >
                        Contact via Phone
                    </button>
                    <button
                        onClick={onContact}
                        className="w-full border-2 border-stitch-primary text-stitch-primary hover:bg-stitch-primary/5 font-black py-3.5 md:py-4 rounded-lg transition-all uppercase tracking-widest text-xs md:text-sm flex items-center justify-center gap-2"
                    >
                        <span className="material-symbols-outlined text-lg md:text-xl">chat</span>
                        Chat on WhatsApp
                    </button>
                </div>
            </div>

            {/* Home Loan Banner */}
            <div className="bg-slate-900 border border-slate-700/50 text-white p-6 rounded-xl text-left shadow-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-400/5 blur-3xl rounded-full -mr-16 -mt-16"></div>
                <div className="flex items-center gap-2 mb-5">
                    <span className="material-symbols-outlined text-yellow-500 text-2xl drop-shadow-[0_0_8px_rgba(234,179,8,0.4)]">account_balance</span>
                    <h4 className="font-black uppercase tracking-widest text-xs text-slate-100">Home Loan Assistant</h4>
                </div>
                <p className="text-xs text-slate-400 mb-6 leading-relaxed font-medium">Get pre-approved home loans from top banks in Nepal at competitive rates starting from <span className="text-white font-bold">11.5%</span>.</p>
                <div className="space-y-4 mb-8">
                    <div className="flex justify-between items-center text-xs border-b border-slate-800 pb-3">
                        <span className="text-slate-500 font-bold uppercase tracking-wider">Interest Rate</span>
                        <span className="font-black text-green-400 text-base">11.5%<span className="text-[10px] ml-0.5">*</span></span>
                    </div>
                    <div className="flex justify-between items-center text-xs border-b border-slate-800 pb-3">
                        <span className="text-slate-500 font-bold uppercase tracking-wider">Max Tenure</span>
                        <span className="font-black text-white text-base">20 Years</span>
                    </div>
                </div>
                <button className="w-full py-2.5 text-stitch-primary font-black text-[10px] uppercase tracking-widest hover:underline transition-all text-center">Check Eligibility</button>
            </div>
        </div>
    );
};

export default StitchPropertyContactCard;
