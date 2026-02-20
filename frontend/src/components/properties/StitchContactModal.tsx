import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle2, MessageSquare, Send, Phone } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { inquiryAPI } from '../../services/api';
import { toast } from 'sonner';

interface StitchContactModalProps {
    isOpen: boolean;
    onClose: () => void;
    property: {
        id: string;
        title: string;
        price: string | number;
        location: string;
        ownerPhone?: string;
    };
}

const StitchContactModal: React.FC<StitchContactModalProps> = ({ isOpen, onClose, property }) => {
    const { user } = useAuth();
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: `I am interested in "${property.title}". Please let me know more about it.`
    });

    useEffect(() => {
        if (user) {
            setFormData(prev => ({
                ...prev,
                name: user.name || '',
                email: user.email || '',
                phone: (user as any).phone || ''
            }));
        }
    }, [user]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await inquiryAPI.create({
                propertyId: property.id,
                buyerName: formData.name,
                buyerEmail: formData.email,
                buyerPhone: formData.phone,
                message: formData.message
            });

            if (response.data.success) {
                setSubmitted(true);
                toast.success('Inquiry sent successfully!');
            }
        } catch (error: any) {
            console.error('Error sending inquiry:', error);
            toast.error(error.response?.data?.message || 'Failed to send inquiry');
        } finally {
            setLoading(false);
        }
    };

    const handleWhatsApp = () => {
        const message = encodeURIComponent(`Hi, I'm interested in your property "${property.title}" listed on Merobhumi. Link: ${window.location.origin}/property/${property.id}`);
        window.open(`https://wa.me/${property.ownerPhone || '9779800000000'}?text=${message}`, '_blank');
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
                    />

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-[2rem] shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-800"
                    >
                        {/* Header Image/Pattern */}
                        <div className="h-24 bg-stitch-primary/10 relative">
                            <div className="absolute inset-0 bg-gradient-to-r from-stitch-primary/20 to-transparent" />
                            <button
                                onClick={onClose}
                                className="absolute top-6 right-6 p-2 rounded-full bg-white/50 dark:bg-slate-800/50 hover:bg-white dark:hover:bg-slate-800 transition-colors z-10"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        <div className="px-8 pb-10 -mt-8 relative animate-in fade-in slide-in-from-bottom-4 duration-500">
                            {!submitted ? (
                                <>
                                    <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-xl border border-slate-100 dark:border-slate-800 mb-8 inline-block">
                                        <MessageSquare className="text-stitch-primary mb-2" size={32} />
                                        <h2 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tight">Contact Owner</h2>
                                        <p className="text-slate-500 text-sm font-medium mt-1">Get instant details for <span className="text-stitch-primary">{property.title}</span></p>
                                    </div>

                                    <form onSubmit={handleSubmit} className="space-y-4">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className="space-y-1.5">
                                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Full Name</label>
                                                <input
                                                    type="text"
                                                    required
                                                    value={formData.name}
                                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                    placeholder="e.g. Kamal Gyawali"
                                                    className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-stitch-primary/20 focus:border-stitch-primary outline-none transition-all"
                                                />
                                            </div>
                                            <div className="space-y-1.5">
                                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Phone Number</label>
                                                <input
                                                    type="tel"
                                                    required
                                                    value={formData.phone}
                                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                                    placeholder="+977 98XXXXXXXX"
                                                    className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-stitch-primary/20 focus:border-stitch-primary outline-none transition-all"
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-1.5">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Email Address</label>
                                            <input
                                                type="email"
                                                required
                                                value={formData.email}
                                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                placeholder="kamal@example.com"
                                                className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-stitch-primary/20 focus:border-stitch-primary outline-none transition-all"
                                            />
                                        </div>

                                        <div className="space-y-1.5">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Message (Optional)</label>
                                            <textarea
                                                rows={3}
                                                value={formData.message}
                                                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                                className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-stitch-primary/20 focus:border-stitch-primary outline-none transition-all resize-none"
                                            />
                                        </div>

                                        <button
                                            type="submit"
                                            disabled={loading}
                                            className="w-full bg-stitch-primary hover:bg-[#C05E44] text-white font-black py-4 rounded-xl shadow-lg shadow-stitch-primary/25 transition-all uppercase tracking-widest text-xs flex items-center justify-center gap-2 group disabled:opacity-70"
                                        >
                                            {loading ? 'Sending...' : (
                                                <>
                                                    Send Inquiry
                                                    <Send size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                                </>
                                            )}
                                        </button>
                                    </form>
                                </>
                            ) : (
                                <div className="py-12 text-center space-y-6">
                                    <div className="size-20 bg-emerald-50 dark:bg-emerald-900/20 rounded-full flex items-center justify-center mx-auto text-emerald-500 mb-2">
                                        <CheckCircle2 size={40} />
                                    </div>
                                    <div>
                                        <h2 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tight">Lead Sent!</h2>
                                        <p className="text-slate-500 text-sm font-medium mt-2 px-4">
                                            The owner has been notified. Expect a call or email shortly regarding <span className="font-bold text-slate-700 dark:text-slate-300">{property.title}</span>.
                                        </p>
                                    </div>

                                    <div className="grid grid-cols-1 gap-3">
                                        <button
                                            onClick={handleWhatsApp}
                                            className="w-full bg-[#25D366] hover:bg-[#128C7E] text-white font-black py-4 rounded-xl shadow-lg shadow-emerald-500/20 transition-all uppercase tracking-widest text-xs flex items-center justify-center gap-2"
                                        >
                                            <Phone size={16} />
                                            WhatsApp Owner Now
                                        </button>
                                        <button
                                            onClick={onClose}
                                            className="w-full border-2 border-slate-200 dark:border-slate-800 text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800 font-black py-4 rounded-xl transition-all uppercase tracking-widest text-xs"
                                        >
                                            Back to Search
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default StitchContactModal;
