import React, { useState, useEffect, useMemo } from 'react';
import Navbar from '../components/common/Navbar';
import { propertiesAPI } from '../services/api';
import { useSEO } from '../hooks/useSEO';
import LoadingState from '../components/common/LoadingState';

// Stitch Components
import StitchFilterSidebar from '../components/properties/StitchFilterSidebar';
import StitchPropertiesHeader from '../components/properties/StitchPropertiesHeader';
import StitchPropertyCardHorizontal from '../components/properties/StitchPropertyCardHorizontal';
import StitchFooter from '../components/home/StitchFooter';

export interface Property {
  _id: string;
  title: string;
  location: string;
  price: number;
  image: string[];
  beds: number;
  baths: number;
  sqft: number;
  type: string;
  availability: string;
  description: string;
  amenities: string[];
  phone: string;
  isVerified?: boolean;
  isFeatured?: boolean;
}

const PropertiesPage: React.FC = () => {
  useSEO({
    title: 'Explore Properties in Nepal | Merobhumi',
    description: 'Browse the latest apartments, houses, and land listings in Nepal. Filter by budget, locality, and property type.',
  });

  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('Kathmandu, Nepal');
  const [budget, setBudget] = useState('Budget');
  const [bhk, setBhk] = useState('BHK');

  const sanitizeData = (data: Property[]) => {
    // Filter out obvious test data/placeholders found during audit
    const suspiciousPatterns = ['sdf', 'afa', 'test', 'sample'];
    return data.filter(prop => {
      const isTestTitle = suspiciousPatterns.some(p => prop.title.toLowerCase().includes(p));
      const isTestLocation = suspiciousPatterns.some(p => prop.location.toLowerCase().includes(p));
      const isTooShort = prop.title.length < 5 || prop.location.length < 3;
      return !(isTestTitle || isTestLocation || isTooShort);
    });
  };

  const fetchProperties = async () => {
    try {
      setLoading(true);
      const { data } = await propertiesAPI.getAll();
      if (data.success && data.property) {
        const cleanData = sanitizeData(data.property);
        setProperties(cleanData);
      }
    } catch (err) {
      setError('Failed to load listings');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  const handleUpdateSearch = () => {
    // In a real app we'd pass these to the API, for now we re-fetch to simulate
    fetchProperties();
  };

  return (
    <div className="bg-stitch-bg-light dark:bg-stitch-bg-dark min-h-screen font-stitch-display text-left">
      <Navbar />

      {/* Localized Stitch Search Bar */}
      <section className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 shadow-sm sticky top-[65px] z-40">
        <div className="max-w-[1400px] mx-auto px-4 py-3 flex flex-wrap items-center gap-3">
          <div className="flex-1 min-w-[300px] flex items-center bg-slate-100 dark:bg-slate-800 rounded-lg px-3 border border-slate-200 dark:border-slate-700">
            <span className="material-symbols-outlined text-slate-400 text-xl">search</span>
            <input
              className="w-full bg-transparent border-none focus:ring-0 text-sm font-medium py-2.5"
              placeholder="Locality, Project or Landmark"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2">
            <select
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-medium py-2.5 px-4 outline-none focus:border-stitch-primary cursor-pointer"
            >
              <option>Budget</option>
              <option>Rs. 50L - 1Cr</option>
              <option>Rs. 1Cr - 2Cr</option>
              <option>Above 2Cr</option>
            </select>
            <select
              value={bhk}
              onChange={(e) => setBhk(e.target.value)}
              className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-medium py-2.5 px-4 outline-none focus:border-stitch-primary cursor-pointer"
            >
              <option>BHK</option>
              <option>2 BHK</option>
              <option>3 BHK</option>
              <option>4+ BHK</option>
            </select>
            <button
              onClick={handleUpdateSearch}
              className="bg-stitch-primary hover:bg-[#d43f11] text-white px-8 py-2.5 rounded-lg font-bold text-sm transition-all shadow-md active:scale-95"
            >
              Update
            </button>
          </div>
        </div>
      </section>

      <main className="max-w-[1400px] mx-auto px-4 py-8 flex gap-8">
        {/* Left Sidebar - Filters */}
        <StitchFilterSidebar onFilterChange={(filters) => {
          console.log('Filters applied:', filters);
          // Re-fetch to simulate server-side filtering
          fetchProperties();
        }} />

        {/* Results List */}
        <div className="flex-1">
          {loading ? (
            <LoadingState />
          ) : error ? (
            <div className="text-center py-20 bg-white rounded-xl border border-slate-200">
              <p className="text-red-500 font-bold">{error}</p>
              <button onClick={() => window.location.reload()} className="mt-4 text-stitch-primary underline">Retry</button>
            </div>
          ) : (
            <>
              <StitchPropertiesHeader totalResults={properties.length} />

              <div className="space-y-6">
                {properties.map((prop) => (
                  <StitchPropertyCardHorizontal key={prop._id} property={prop} />
                ))}

                {properties.length === 0 && (
                  <div className="text-center py-20 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                    <span className="material-symbols-outlined text-5xl text-slate-300 mb-4">search_off</span>
                    <p className="text-slate-500 font-bold">No properties found matching your criteria</p>
                  </div>
                )}
              </div>

              {/* Pagination */}
              {properties.length > 0 && (
                <div className="flex items-center justify-center gap-2 py-12">
                  <button className="size-10 flex items-center justify-center rounded-lg border border-slate-200 dark:border-slate-800 hover:bg-stitch-primary hover:text-white transition-colors">
                    <span className="material-symbols-outlined">chevron_left</span>
                  </button>
                  <button className="size-10 flex items-center justify-center rounded-lg bg-stitch-primary text-white font-bold shadow-md">1</button>
                  <button className="size-10 flex items-center justify-center rounded-lg border border-slate-200 dark:border-slate-800 hover:bg-stitch-primary hover:text-white transition-colors">2</button>
                  <button className="size-10 flex items-center justify-center rounded-lg border border-slate-200 dark:border-slate-800 hover:bg-stitch-primary hover:text-white transition-colors">3</button>
                  <button className="size-10 flex items-center justify-center rounded-lg border border-slate-200 dark:border-slate-800 hover:bg-stitch-primary hover:text-white transition-colors">
                    <span className="material-symbols-outlined">chevron_right</span>
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </main>

      <StitchFooter />
    </div>
  );
};

export default PropertiesPage;
