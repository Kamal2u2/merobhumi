import React from 'react';

interface StitchDeleteConfirmModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title: string;
    message: string;
    isDeleting?: boolean;
}

const StitchDeleteConfirmModal: React.FC<StitchDeleteConfirmModalProps> = ({
    isOpen,
    onClose,
    onConfirm,
    title,
    message,
    isDeleting = false
}) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 font-stitch-display animate-in fade-in duration-200">
            <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={onClose}></div>

            <div className="bg-white dark:bg-slate-900 w-full max-w-sm rounded-2xl shadow-2xl relative overflow-hidden animate-in zoom-in-95 duration-200">
                <div className="p-8 text-center">
                    <div className="size-16 bg-red-50 dark:bg-red-900/20 rounded-full flex items-center justify-center text-red-600 mx-auto mb-6">
                        <span className="material-symbols-outlined text-3xl">delete_forever</span>
                    </div>

                    <h3 className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-tight mb-2">{title}</h3>
                    <p className="text-sm text-slate-500 mb-8">{message}</p>

                    <div className="flex flex-col gap-3">
                        <button
                            onClick={onConfirm}
                            disabled={isDeleting}
                            className="bg-red-600 hover:bg-red-700 text-white w-full py-3.5 rounded-xl font-black text-sm uppercase tracking-widest shadow-lg shadow-red-600/20 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                        >
                            {isDeleting ? (
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                            ) : (
                                <>Confirm Delete</>
                            )}
                        </button>
                        <button
                            onClick={onClose}
                            disabled={isDeleting}
                            className="text-slate-500 dark:text-slate-400 font-bold text-sm py-2 hover:text-slate-800 dark:hover:text-slate-200 transition-colors"
                        >
                            Nevermind, keep it
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StitchDeleteConfirmModal;
