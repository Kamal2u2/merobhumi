import React from 'react';

interface StitchProfileHeaderProps {
    user: {
        name: string;
        email: string;
        location?: string;
        phone?: string;
        avatar?: string;
    };
    onEdit: () => void;
}

const StitchProfileHeader: React.FC<StitchProfileHeaderProps> = ({ user, onEdit }) => {
    return (
        <section className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 p-6 mb-8 font-stitch-display">
            <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-6 text-left">
                <div className="flex flex-col md:flex-row items-center gap-6">
                    <div className="relative">
                        <div className="size-24 rounded-full bg-slate-100 dark:bg-slate-800 border-4 border-white dark:border-slate-700 shadow-lg overflow-hidden">
                            <img
                                alt="User Profile"
                                className="w-full h-full object-cover"
                                src={user.avatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2070&auto=format&fit=crop'}
                            />
                        </div>
                        <button
                            onClick={onEdit}
                            className="absolute bottom-0 right-0 bg-stitch-primary text-white p-1.5 rounded-full shadow-lg border-2 border-white"
                        >
                            <span className="material-symbols-outlined text-xs">edit</span>
                        </button>
                    </div>
                    <div className="text-center md:text-left">
                        <h2 className="text-2xl font-black text-slate-900 dark:text-white">{user.name}</h2>
                        <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-2 text-sm text-slate-500">
                            <span className="flex items-center gap-1">
                                <span className="material-symbols-outlined text-sm">mail</span> {user.email}
                            </span>
                            <span className="flex items-center gap-1">
                                <span className="material-symbols-outlined text-sm">call</span> {user.phone || 'Set Phone Number'}
                            </span>
                            <span className="flex items-center gap-1">
                                <span className="material-symbols-outlined text-sm">location_on</span> {user.location || 'Nepal'}
                            </span>
                        </div>
                        <div className="mt-4 flex gap-2">
                            <span className="bg-stitch-primary/10 text-stitch-primary text-[10px] font-bold px-2 py-1 rounded-full uppercase">Silver Member</span>
                            <span className="bg-green-100 dark:bg-green-900/30 text-green-600 text-[10px] font-bold px-2 py-1 rounded-full uppercase">Profile Verified</span>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col gap-3 w-full md:w-auto mt-4 md:mt-0">
                    <button
                        onClick={onEdit}
                        className="bg-stitch-primary text-white px-6 py-3 md:py-2.5 rounded-xl md:rounded-lg font-bold text-xs md:text-sm shadow-md hover:bg-[#d43f11] transition-all flex items-center justify-center gap-2 w-full md:w-auto"
                    >
                        <span className="material-symbols-outlined text-lg">edit</span> Edit Profile
                    </button>
                    <button
                        onClick={() => {
                            navigator.clipboard.writeText(window.location.href);
                            alert('Profile link copied to clipboard!');
                        }}
                        className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 px-6 py-3 md:py-2.5 rounded-xl md:rounded-lg font-bold text-xs md:text-sm hover:bg-slate-50 dark:hover:bg-slate-700 transition-all flex items-center justify-center gap-2 w-full md:w-auto"
                    >
                        <span className="material-symbols-outlined text-lg">share</span> Share Profile
                    </button>
                </div>
            </div>
        </section>
    );
};

export default StitchProfileHeader;
