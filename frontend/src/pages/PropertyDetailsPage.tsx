import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import LoadingState from '../components/common/LoadingState';
import { propertiesAPI } from '../services/api';
import { useSEO } from '../hooks/useSEO';
import StructuredData from '../components/common/StructuredData';

// Stitch Detail Components
import StitchPropertyGallery from '../components/property-details/StitchPropertyGallery';
import StitchPropertyMainInfo from '../components/property-details/StitchPropertyMainInfo';
import StitchPropertyDescription from '../components/property-details/StitchPropertyDescription';
import StitchPropertyAmenities from '../components/property-details/StitchPropertyAmenities';
import StitchPropertyContactCard from '../components/property-details/StitchPropertyContactCard';
import StitchPropertyCardVertical from '../components/properties/StitchPropertyCardVertical';
import StitchContactModal from '../components/properties/StitchContactModal';
import StitchFooter from '../components/home/StitchFooter';

interface PropertyData {
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
  googleMapLink?: string;
}

const PropertyDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [property, setProperty] = useState<PropertyData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [similarProperties, setSimilarProperties] = useState<PropertyData[]>([]);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  useSEO({
    title: property ? `${property.title} in ${property.location} | Merobhumi` : 'Property Details',
    description: property ? property.description.slice(0, 160) : 'View property details on Merobhumi.',
  });

  useEffect(() => {
    const fetchProperty = async () => {
      if (!id) return;
      try {
        setLoading(true);
        const { data } = await propertiesAPI.getById(id);
        if (data.success && data.property) {
          setProperty(data.property);
        } else {
          setError('Property not found');
        }
      } catch (err) {
        setError('Failed to load property details');
      } finally {
        setLoading(false);
      }
    };
    fetchProperty();
  }, [id]);

  useEffect(() => {
    const fetchSimilar = async () => {
      if (!property) return;
      try {
        const { data } = await propertiesAPI.getAll();
        if (data.success && data.property) {
          const similar = data.property.filter((p: any) =>
            p.type === property.type && p._id !== property._id
          ).slice(0, 3);
          setSimilarProperties(similar);
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchSimilar();
  }, [property]);

  if (loading) return (
    <div className="bg-stitch-bg-light dark:bg-stitch-bg-dark min-h-screen">
      <Navbar />
      <LoadingState />
    </div>
  );

  if (error || !property) return (
    <div className="bg-stitch-bg-light dark:bg-stitch-bg-dark min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 flex items-center justify-center p-20">
        <div className="text-center">
          <h2 className="text-2xl font-black text-slate-800 mb-4">{error}</h2>
          <Link to="/properties" className="text-stitch-primary font-bold underline">Back to Browse</Link>
        </div>
      </div>
      <StitchFooter />
    </div>
  );

  return (
    <div className="bg-stitch-bg-light dark:bg-stitch-bg-dark min-h-screen font-stitch-display">
      <Navbar />

      {/* Contact Modal */}
      {property && (
        <StitchContactModal
          isOpen={isContactModalOpen}
          onClose={() => setIsContactModalOpen(false)}
          property={{
            id: property._id,
            title: property.title,
            price: property.price,
            location: property.location,
            ownerPhone: property.phone
          }}
        />
      )}

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="relative z-10 flex flex-wrap text-[9px] md:text-xs text-slate-500 gap-y-2 gap-x-2 mb-6 md:mb-10 text-left uppercase font-black tracking-widest px-1">
          <Link to="/" className="hover:text-stitch-primary transition-colors">Home</Link>
          <span className="opacity-30">/</span>
          <Link to="/properties" className="hover:text-stitch-primary transition-colors">Nepal Real Estate</Link>
          <span className="opacity-30">/</span>
          <span className="text-slate-900 dark:text-slate-300 truncate max-w-[150px] md:max-w-none">{property.title}</span>
        </nav>

        {/* Gallery */}
        <StitchPropertyGallery images={property.image} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Main Info Columns */}
          <div className="lg:col-span-2 space-y-12">
            <StitchPropertyMainInfo
              title={property.title}
              location={property.location}
              price={property.price}
              beds={property.beds}
              baths={property.baths}
              sqft={property.sqft}
              type={property.type}
              availability={property.availability}
            />

            <StitchPropertyDescription description={property.description} />

            <StitchPropertyAmenities amenities={property.amenities} />

            {/* Floor Plan Section */}
            <section className="text-left">
              <h3 className="text-2xl font-black mb-8 text-slate-900 dark:text-white uppercase tracking-tight">Floor Plan</h3>
              <div className="bg-white dark:bg-slate-900 p-8 md:p-12 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col items-center">
                <div className="relative group cursor-zoom-in mb-8">
                  <img
                    alt="Property Floor Plan"
                    className="max-w-md w-full rounded-lg mix-blend-multiply dark:mix-blend-normal opacity-80 group-hover:opacity-100 transition-opacity"
                    src="https://images.unsplash.com/photo-1503387762-592dea58ef21?q=80&w=2000&auto=format&fit=crop"
                  />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/10 rounded-lg">
                    <span className="bg-white text-slate-900 px-4 py-2 rounded-full font-black text-xs uppercase shadow-xl tracking-widest flex items-center gap-2">
                      <span className="material-symbols-outlined text-sm">zoom_in</span> Enlarge
                    </span>
                  </div>
                </div>
                <div className="flex flex-wrap justify-center gap-4">
                  <button className="bg-stitch-primary text-white px-8 py-3.5 rounded-lg font-black uppercase text-xs tracking-widest shadow-lg shadow-stitch-primary/20 flex items-center gap-2">
                    <span className="material-symbols-outlined text-xl">visibility</span> View Full Plan
                  </button>
                  <button className="border-2 border-stitch-primary text-stitch-primary hover:bg-stitch-primary/5 px-8 py-3.5 rounded-lg font-black uppercase text-xs tracking-widest flex items-center gap-2">
                    <span className="material-symbols-outlined text-xl">download</span> Download PDF
                  </button>
                </div>
              </div>
            </section>

            {/* Location Section */}
            {/* ... existing location section content ... */}
          </div>

          <aside className="relative">
            <StitchPropertyContactCard
              propertyName={property.title}
              phone={property.phone}
              onContact={() => setIsContactModalOpen(true)}
            />
          </aside>
        </div>
        {/* ... similar properties ... */}
      </main>
      <StitchFooter />
    </div>
  );
};

export default PropertyDetailsPage;
