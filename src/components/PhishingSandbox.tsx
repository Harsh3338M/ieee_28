"use client";
import React, { useState } from 'react';
import { Lock, Unlock, ShieldAlert, RotateCcw, ChevronLeft, ChevronRight, Globe } from 'lucide-react';

interface SandboxProps {
  url: string;
  isSecure: boolean;
  contentTitle: string;
  onDetect: (isScam: boolean) => void   ;
}

const PhishingSandbox = ({ url, isSecure, contentTitle, onDetect }: SandboxProps) => {
  const [showCert, setShowCert] = useState(false);

  return (
    <div className="w-full max-w-2xl mx-auto bg-zinc-900 border-4 border-zinc-800 rounded-[2rem] overflow-hidden shadow-[0_12px_0_0_#18181b]">
      {/* Browser Toolbar */}
      <div className="bg-zinc-800 p-4 flex items-center gap-4 border-b-2 border-zinc-700">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-rose-500" />
          <div className="w-3 h-3 rounded-full bg-amber-500" />
          <div className="w-3 h-3 rounded-full bg-emerald-500" />
        </div>
        
        {/* Address Bar */}
        <div className="flex-grow flex items-center gap-2 bg-black/40 px-4 py-2 rounded-xl border border-zinc-600 group relative">
          <button onClick={() => setShowCert(!showCert)} className="hover:scale-110 transition-transform">
            {isSecure ? <Lock size={16} className="text-emerald-500" /> : <Unlock size={16} className="text-rose-500" />}
          </button>
          <span className="text-sm font-medium text-zinc-300 truncate tracking-tight">
            {url}
          </span>
          
          {/* Certificate Popup Overlay */}
          {showCert && (
            <div className="absolute top-12 left-0 w-64 bg-zinc-800 border-2 border-zinc-700 rounded-2xl p-4 shadow-2xl z-50 animate-in fade-in zoom-in duration-200">
              <h4 className="font-black text-xs uppercase text-zinc-400 mb-2">Connection Info</h4>
              <p className="text-xs font-bold text-zinc-200 mb-3">
                {isSecure ? "Verified by GlobalSign" : "Certificate is INVALID or Expired"}
              </p>
              <button 
                onClick={() => onDetect(!isSecure)}
                className="w-full py-2 bg-rose-500 text-white rounded-lg text-[10px] font-black uppercase tracking-widest border-b-4 border-rose-700 active:translate-y-1 active:border-b-0 transition-all"
              >
                Report Malicious
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Website Content Area */}
      <div className="bg-white h-64 flex flex-col items-center justify-center p-8 text-black relative">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-blue-600 rounded-full mx-auto flex items-center justify-center">
            <Globe className="text-white" size={32} />
          </div>
          <h2 className="text-2xl font-black tracking-tighter">{contentTitle}</h2>
          <p className="text-sm text-gray-500 font-bold leading-tight">Please sign in to continue to your dashboard</p>
          <div className="w-full h-8 bg-gray-100 rounded-md border border-gray-200" />
          <div className="w-2/3 h-8 bg-blue-600 rounded-md mx-auto border-b-4 border-blue-800" />
        </div>
        
        {/* Hint overlay for users */}
        <div className="absolute bottom-4 right-4 animate-bounce">
           <ShieldAlert className="text-amber-500 opacity-50" size={24} />
        </div>
      </div>
    </div>
  );
};

export default PhishingSandbox;