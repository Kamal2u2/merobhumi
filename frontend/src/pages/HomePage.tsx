import React, { useState, useEffect } from 'react';
import { useSEO } from '../hooks/useSEO';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { propertiesAPI } from '../services/api';
import { Property } from './PropertiesPage';

// Common Components
import Navbar from '../components/common/Navbar';

// Stitch Modular Components
import StitchHero from '../components/home/StitchHero';
import StitchProjects from '../components/home/StitchProjects';
import StitchOwnerSection from '../components/home/StitchOwnerSection';
import StitchFeaturedListings from '../components/home/StitchFeaturedListings';
import StitchFooter from '../components/home/StitchFooter';

const HomePage: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  useSEO({
    title: 'Merobhumi - Premium Real Estate Marketplace in Nepal',
    description: 'Merobhumi is Nepal\'s trusted property portal connecting buyers and sellers with verified listings across all provinces.',
  });

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        setLoading(true);
        const response = await propertiesAPI.getAll();
        if (response.data && response.data.property) {
          setProperties(response.data.property);
        }
      } catch (error) {
        console.error('Error fetching properties:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProperties();
  }, []);

  return (
    <div className="bg-stitch-bg-light dark:bg-stitch-bg-dark min-h-screen font-stitch-display text-slate-900 dark:text-slate-100">

      {/* Reverted Global Navbar */}
      <Navbar />

      {/* Hero Section */}
      <StitchHero />

      {/* Main Content Container */}
      <main className="max-w-7xl mx-auto px-4 py-16">

        {/* Services / Quicklinks (Inline from Stitch) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 -mt-24 relative z-20 mb-20 animate-in fade-in slide-in-from-bottom-4 duration-1000">
          {[
            { icon: 'account_balance', title: 'Home Loans', desc: 'Low interest rates', color: 'blue' },
            { icon: 'gavel', title: 'Legal Services', desc: 'Verified documents', color: 'green' },
            { icon: 'trending_up', title: 'Property Valuation', desc: 'Market price check', color: 'purple' },
            { icon: 'support_agent', title: 'Expert Advice', desc: 'Consult experts', color: 'orange' },
          ].map((item, idx) => (
            <div
              key={idx}
              onClick={() => navigate('/contact')}
              className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-md p-6 rounded-2xl shadow-xl border border-white/20 dark:border-slate-800 flex items-center gap-4 hover:-translate-y-2 transition-all cursor-pointer group"
            >
              <div className={`p-3 rounded-xl text-${item.color}-600 bg-${item.color}-100 dark:bg-${item.color}-900/30 group-hover:scale-110 transition-transform`}>
                <span className="material-symbols-outlined font-bold">{item.icon}</span>
              </div>
              <div className="text-left">
                <h3 className="font-black text-xs uppercase tracking-widest !text-slate-900 dark:!text-white mb-0.5">{item.title}</h3>
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Popular Projects */}
        <StitchProjects properties={properties.slice(0, 4)} />

        {/* Zero Brokerage Section */}
        <StitchOwnerSection />

        {/* Dynamic Featured Listings */}
        <StitchFeaturedListings properties={properties} />

        {/* Fresh Launches (Inline from Stitch) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 text-left mb-20">
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-6 uppercase tracking-tight">Fresh New Launches</h2>
            <div className="space-y-4">
              {(properties.length > 0 ? properties.slice(0, 3) : [
                { _id: '1', title: 'Kathmandu Heights', location: 'Budhanilkantha', price: 45000000, type: 'Villa', beds: 4 },
                { _id: '2', title: 'Patan Residency', location: 'Jhamsikhel', price: 28000000, type: 'Apartment', beds: 3 },
                { _id: '3', title: 'Lakeside Bliss', location: 'Sedi, Pokhara', price: 12000000, type: 'Land', beds: 0 },
              ]).map((launch: any, idx) => {
                const id = launch._id || `launch-${idx}`;
                const formatPrice = (p: number) => {
                  if (p >= 10000000) return `Rs. ${(p / 10000000).toFixed(1)} Cr`;
                  if (p >= 100000) return `Rs. ${(p / 100000).toFixed(1)} L`;
                  return `Rs. ${p.toLocaleString()}`;
                };

                return (
                  <Link
                    key={id}
                    to={`/property/${id}`}
                    className="flex items-center gap-4 bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-100 dark:border-slate-800 hover:shadow-xl transition-all group"
                  >
                    <div className="size-20 bg-slate-50 dark:bg-slate-800 rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform">
                      <span className="material-symbols-outlined text-slate-400 text-3xl">
                        {launch.type?.toLowerCase().includes('land') ? 'landscape' : 'apartment'}
                      </span>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-extrabold text-slate-900 dark:text-white tracking-tight">{launch.title}</h4>
                      <p className="text-xs text-slate-500 font-medium">{launch.location} • {launch.beds > 0 ? `${launch.beds} BHK` : ''} {launch.type}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-black text-stitch-primary text-lg">
                        {typeof launch.price === 'number' ? formatPrice(launch.price) : launch.price}
                      </p>
                      <p className="text-[10px] text-green-600 font-black uppercase tracking-widest">Trending</p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-xl">
            <h2 className="text-xl font-black text-slate-900 dark:text-white mb-8 uppercase tracking-widest text-[14px]">Trending Localities</h2>
            <div className="space-y-8">
              {[
                { name: 'Kathmandu, Baluwatar', change: '4.2%', width: '85%' },
                { name: 'Lalitpur, Jhamsikhel', change: '6.8%', width: '92%' },
                { name: 'Pokhara, Lakeside', change: '3.1%', width: '78%' },
                { name: 'Chitwan, Bharatpur', change: '5.4%', width: '82%' },
              ].map((loc, idx) => (
                <div key={idx} className="group cursor-default">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-black text-slate-800 dark:text-slate-200 uppercase tracking-tight">{loc.name}</span>
                    <span className="text-[10px] text-green-600 font-black flex items-center gap-1 bg-green-50 dark:bg-green-900/20 px-2 py-0.5 rounded-full">
                      <span className="material-symbols-outlined text-[12px] font-bold">trending_up</span> {loc.change}
                    </span>
                  </div>
                  <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-1.5 overflow-hidden">
                    <div className="bg-stitch-primary h-full rounded-full group-hover:opacity-80 transition-opacity" style={{ width: loc.width }}></div>
                  </div>
                </div>
              ))}
              <div className="pt-6 border-t border-slate-100 dark:border-slate-800">
                <button
                  onClick={() => navigate('/contact')}
                  className="w-full text-center text-stitch-primary font-black text-[11px] uppercase tracking-[0.2em] hover:opacity-70 transition-opacity"
                >
                  Download Market Report
                </button>
              </div>
            </div>
          </div>
        </div>

      </main>

      {/* Stitch Footer */}
      <StitchFooter />
    </div>
  );
};

export default HomePage;