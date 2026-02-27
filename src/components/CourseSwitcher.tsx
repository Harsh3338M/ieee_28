"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { ChevronDown, GraduationCap, ShieldAlert, Globe } from 'lucide-react';

const CourseSwitcher = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative" onMouseEnter={() => setIsOpen(true)} onMouseLeave={() => setIsOpen(false)}>
      {/* The Main Trigger Button */}
      <button className="flex items-center gap-3 px-4 py-2 bg-zinc-900 border-b-4 border-zinc-950 rounded-2xl hover:bg-zinc-800 transition-all active:translate-y-1 active:border-b-0 group">
        <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center shadow-[0_2px_0_0_#059669]">
          <Globe size={20} className="text-white" />
        </div>
        <span className="font-black text-sm uppercase tracking-widest text-zinc-200">
          Courses
        </span>
        <ChevronDown size={18} className={`text-zinc-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* The Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-72 bg-[#18181b] border-2 border-zinc-800 rounded-3xl shadow-[0_10px_0_0_#09090b] p-2 z-[60] animate-in fade-in zoom-in duration-100">
          <div className="space-y-1">
            
            {/* Option 1: General Knowledge */}
            <Link href="/dashboard/general" className="flex items-center gap-4 p-4 rounded-2xl hover:bg-zinc-800/50 transition-colors group">
              <div className="w-12 h-12 bg-blue-500 rounded-2xl flex items-center justify-center border-b-4 border-blue-700">
                <ShieldAlert size={24} className="text-white" />
              </div>
              <div className="text-left">
                <p className="font-black text-sm uppercase text-blue-400">General</p>
                <p className="text-xs text-zinc-500 font-bold">Cyber safety for everyone</p>
              </div>
            </Link>

            <div className="h-px bg-zinc-800 mx-2 my-1" />

            {/* Option 2: Professional */}
            <Link href="/dashboard/pro" className="flex items-center gap-4 p-4 rounded-2xl hover:bg-zinc-800/50 transition-colors group">
              <div className="w-12 h-12 bg-purple-500 rounded-2xl flex items-center justify-center border-b-4 border-purple-700">
                <GraduationCap size={24} className="text-white" />
              </div>
              <div className="text-left">
                <p className="font-black text-sm uppercase text-purple-400">Professional</p>
                <p className="text-xs text-zinc-500 font-bold">Tools, Exploits & DevSecOps</p>
              </div>
            </Link>

          </div>
        </div>
      )}
    </div>
  );
};

export default CourseSwitcher;