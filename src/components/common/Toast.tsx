import React from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const Toast: React.FC = () => {
  const { toast } = useApp();

  if (!toast) return null;

  return (
    <div className="fixed bottom-20 md:bottom-8 right-4 md:right-8 z-50 max-w-sm w-full animate-in fade-in slide-in-from-bottom-4 duration-200">
      <div className="flex items-center gap-3 p-3.5 rounded-xl bg-[#14141E] border border-violet-500/30 text-white shadow-xl shadow-purple-950/20 backdrop-blur-md">
        <div className="shrink-0">
          {toast.type === 'success' && <CheckCircle2 className="w-5 h-5 text-emerald-400" />}
          {toast.type === 'error' && <AlertCircle className="w-5 h-5 text-rose-400" />}
          {toast.type === 'info' && <Info className="w-5 h-5 text-violet-400" />}
        </div>
        <p className="text-sm font-medium text-zinc-100 flex-1 leading-snug">{toast.text}</p>
      </div>
    </div>
  );
};
