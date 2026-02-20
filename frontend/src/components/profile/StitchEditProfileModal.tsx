import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { userAPI } from '../../services/api';
import { toast } from 'sonner';

interface StitchEditProfileModalProps {
    isOpen: boolean;
    onClose: () => void;
    user: {
        name: string;
        email: string;
        phone?: string;
        location?: string;
    };
    onUpdate: (updatedUser: any) => void;
}

const StitchEditProfileModal: React.FC<StitchEditProfileModalProps> = ({ isOpen, onClose, user, onUpdate }) => {
    const [formData, setFormData] = useState({
        name: user.name,
        phone: user.phone || '',
        location: user.location || 'Kathmandu, Nepal'
    });
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        setFormData({
            name: user.name,
            phone: user.phone || '',
            location: user.location || 'Kathmandu, Nepal'
        });
    }, [user]);

    if (!isOpen) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);
        try {
            const response = await userAPI.updateProfile(formData);
            if (response.data.success) {
                toast.success('Profile updated successfully!');
                onUpdate(response.data.user);
                onClose();
            }
        } catch (error) {
            console.error('Update Error:', error);
            toast.error('Failed to update profile');
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 font-stitch-display animate-in fade-in duration-300">
            <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={onClose}></div>

            <div className="bg-white dark:bg-slate-900 w-full max-w-md rounded-2xl shadow-2xl relative overflow-hidden animate-in zoom-in-95 slide-in-from-bottom-4 duration-300">
                {/* Header Gradient */}
                <div className="h-2 bg-gradient-to-r from-stitch-primary to-orange-400"></div>

                <div className="p-8">
                    <div className="flex justify-between items-center mb-6">
                        <div>
                            <h3 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tight">Edit Profile</h3>
                            <p className="text-xs text-slate-500 mt-1">Keep your contact information up to date</p>
                        </div>
                        <button
                            onClick={onClose}
                            className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                        >
                            <span className="material-symbols-outlined">close</span>
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="space-y-1.5">
                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Full Name</label>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-slate-400 text-lg">person</span>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full bg-slate-50 dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-800 rounded-xl py-3 pl-12 pr-4 text-sm focus:border-stitch-primary outline-none transition-all"
                                    placeholder="Enter your full name"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Phone Number</label>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-slate-400 text-lg">call</span>
                                <input
                                    type="tel"
                                    value={formData.phone}
                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                    className="w-full bg-slate-50 dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-800 rounded-xl py-3 pl-12 pr-4 text-sm focus:border-stitch-primary outline-none transition-all"
                                    placeholder="+977-98XXXXXXXX"
                                />
                            </div>
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Location</label>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-slate-400 text-lg">location_on</span>
                                <input
                                    type="text"
                                    value={formData.location}
                                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                    className="w-full bg-slate-50 dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-800 rounded-xl py-3 pl-12 pr-4 text-sm focus:border-stitch-primary outline-none transition-all"
                                    placeholder="e.g. Kathmandu, Nepal"
                                />
                            </div>
                        </div>

                        <div className="flex gap-3 pt-4">
                            <button
                                type="button"
                                onClick={onClose}
                                className="flex-1 px-6 py-3.5 rounded-xl font-bold text-sm border-2 border-slate-100 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={isSaving}
                                className="flex-2 bg-stitch-primary hover:bg-[#d43f11] text-white px-8 py-3.5 rounded-xl font-black text-sm uppercase tracking-widest shadow-lg shadow-stitch-primary/20 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                            >
                                {isSaving ? (
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                ) : 'Save Changes'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default StitchEditProfileModal;
