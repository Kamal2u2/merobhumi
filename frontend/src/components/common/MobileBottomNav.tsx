import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Search, PlusSquare, User, Heart } from 'lucide-react';

const MobileBottomNav: React.FC = () => {
    return (
        <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white/80 dark:bg-slate-900/80 backdrop-blur-lg border-t border-slate-200 dark:border-slate-800 px-6 py-3 z-[100] safe-area-bottom shadow-[0_-4px_20px_-10px_rgba(0,0,0,0.1)]">
            <div className="flex justify-between items-center max-w-md mx-auto">
                <NavLink
                    to="/"
                    className={({ isActive }) => `flex flex-col items-center gap-1 transition-colors ${isActive ? 'text-stitch-primary' : 'text-slate-400'}`}
                >
                    {({ isActive }) => (
                        <>
                            <Home size={20} strokeWidth={isActive ? 2.5 : 2} />
                            <span className="text-[10px] font-bold uppercase tracking-widest">Home</span>
                        </>
                    )}
                </NavLink>

                <NavLink
                    to="/properties"
                    className={({ isActive }) => `flex flex-col items-center gap-1 transition-colors ${isActive ? 'text-stitch-primary' : 'text-slate-400'}`}
                >
                    {({ isActive }) => (
                        <>
                            <Search size={20} strokeWidth={isActive ? 2.5 : 2} />
                            <span className="text-[10px] font-bold uppercase tracking-widest">Search</span>
                        </>
                    )}
                </NavLink>

                <NavLink
                    to="/post-property"
                    className="relative -mt-8 flex flex-col items-center"
                >
                    <div className="size-14 bg-stitch-primary rounded-full flex items-center justify-center text-white shadow-lg shadow-stitch-primary/40 border-4 border-white dark:border-slate-900 active:scale-95 transition-transform">
                        <PlusSquare size={24} />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-stitch-primary mt-1">Post</span>
                </NavLink>

                <NavLink
                    to="/profile?view=Favorites"
                    className={({ isActive }) => `flex flex-col items-center gap-1 transition-colors ${isActive ? 'text-stitch-primary' : 'text-slate-400'}`}
                >
                    {({ isActive }) => (
                        <>
                            <Heart size={20} strokeWidth={isActive ? 2.5 : 2} />
                            <span className="text-[10px] font-bold uppercase tracking-widest">Saved</span>
                        </>
                    )}
                </NavLink>

                <NavLink
                    to="/profile"
                    className={({ isActive }) => `flex flex-col items-center gap-1 transition-colors ${isActive ? 'text-stitch-primary' : 'text-slate-400'}`}
                >
                    {({ isActive }) => (
                        <>
                            <User size={20} strokeWidth={isActive ? 2.5 : 2} />
                            <span className="text-[10px] font-bold uppercase tracking-widest">Profile</span>
                        </>
                    )}
                </NavLink>
            </div>
        </nav>
    );
};

export default MobileBottomNav;
