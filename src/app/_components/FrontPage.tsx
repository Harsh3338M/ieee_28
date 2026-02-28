"use client";

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Calendar, 
  MapPin, 
  Globe, 
  Search, 
  Filter, 
  ChevronRight, 
  Trophy, 
  Users, 
  Zap,
  ArrowUpRight,
  Menu,
  X
} from 'lucide-react';
import { format, parseISO, isAfter, isBefore } from 'date-fns';
import { MOCK_HACKATHONS, type Hackathon } from '@/types';
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import Link from 'next/link';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-zinc-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-zinc-900 rounded-lg flex items-center justify-center">
              <Zap className="w-5 h-5 text-white fill-white" />
            </div>
            <span className="text-xl font-bold tracking-tighter text-zinc-900">HACKHUB</span>
          </div>
          
          <div className="hidden md:flex items-center gap-8">
            <a href="#" className="text-sm font-medium text-zinc-600 hover:text-zinc-900 transition-colors">Hackathons</a>
            <a href="#" className="text-sm font-medium text-zinc-600 hover:text-zinc-900 transition-colors">Organizers</a>
            <a href="#" className="text-sm font-medium text-zinc-600 hover:text-zinc-900 transition-colors">Resources</a>
            <Link href= "/Register" className="bg-zinc-900 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-zinc-800 transition-all">
              Post a Hackathon
            </Link>
          </div>

          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="p-2">
              {isOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-zinc-200 overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-4">
              <a href="#" className="block text-lg font-medium text-zinc-900">Hackathons</a>
              <a href="#" className="block text-lg font-medium text-zinc-900">Organizers</a>
              <a href="#" className="block text-lg font-medium text-zinc-900">Resources</a>
              <button className="w-full bg-zinc-900 text-white px-4 py-3 rounded-xl text-lg font-medium">
                Post a Hackathon
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const HackathonCard = ({ hackathon }: { hackathon: Hackathon }) => {
  return (
    <motion.div 
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="group bg-white border border-zinc-200 rounded-2xl overflow-hidden hover:shadow-xl hover:shadow-zinc-200/50 transition-all duration-300"
    >
      <div className="relative h-48 overflow-hidden">
        <img 
          src={hackathon.imageUrl} 
          alt={hackathon.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          referrerPolicy="no-referrer"
        />
        <div className="absolute top-4 left-4 flex gap-2">
          <span className={cn(
            "px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider",
            hackathon.type === 'Online' ? "bg-blue-100 text-blue-700" : 
            hackathon.type === 'In-Person' ? "bg-emerald-100 text-emerald-700" : 
            "bg-orange-100 text-orange-700"
          )}>
            {hackathon.type}
          </span>
        </div>
      </div>
      
      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-bold text-zinc-900 leading-tight group-hover:text-zinc-700 transition-colors">
            {hackathon.title}
          </h3>
          <ArrowUpRight className="w-5 h-5 text-zinc-400 group-hover:text-zinc-900 transition-colors" />
        </div>
        
        <p className="text-zinc-500 text-sm mb-4 line-clamp-2">
          {hackathon.description}
        </p>

        <div className="space-y-2 mb-6">
          <div className="flex items-center gap-2 text-zinc-600 text-sm">
            <Calendar className="w-4 h-4" />
            <span>{format(parseISO(hackathon.startDate), 'MMM d')} - {format(parseISO(hackathon.endDate), 'MMM d, yyyy')}</span>
          </div>
          <div className="flex items-center gap-2 text-zinc-600 text-sm">
            <MapPin className="w-4 h-4" />
            <span>{hackathon.location}</span>
          </div>
          {hackathon.prizePool && (
            <div className="flex items-center gap-2 text-zinc-600 text-sm">
              <Trophy className="w-4 h-4 text-amber-500" />
              <span className="font-medium text-zinc-900">{hackathon.prizePool} Prize Pool</span>
            </div>
          )}
        </div>

        <div className="flex flex-wrap gap-2">
          {hackathon.tags.map(tag => (
            <span key={tag} className="px-2 py-1 bg-zinc-100 text-zinc-600 rounded text-[11px] font-medium">
              #{tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<string>('All');

  const filteredHackathons = useMemo(() => {
    return MOCK_HACKATHONS
      .filter(h => {
        const matchesSearch = h.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            h.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
        const matchesType = filterType === 'All' || h.type === filterType;
        return matchesSearch && matchesType;
      })
      .sort((a, b) => parseISO(a.startDate).getTime() - parseISO(b.startDate).getTime());
  }, [searchQuery, filterType]);

  return (
    <div className="min-h-screen bg-zinc-50 font-sans text-zinc-900 selection:bg-zinc-900 selection:text-white">
      <Navbar />

      <main className="pt-16">
        {/* Hero Section */}
        <section className="relative py-20 lg:py-32 overflow-hidden bg-white border-b border-zinc-200">
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '32px 32px' }}></div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <div className="max-w-3xl">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <span className="inline-block px-3 py-1 rounded-full bg-zinc-100 text-zinc-600 text-[10px] font-bold uppercase tracking-widest mb-6">
                  The Future of Building
                </span>
                <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.85] mb-8">
                  WHERE <span className="text-zinc-400">IDEAS</span> BECOME <span className="italic font-serif font-light">REALITY.</span>
                </h1>
                <p className="text-xl text-zinc-500 mb-10 max-w-xl leading-relaxed">
                  HackHub is the central nervous system for the global hackathon community. Discover, track, and join the world&apos;s most innovative building events.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <button className="bg-zinc-900 text-white px-8 py-4 rounded-full text-lg font-bold hover:bg-zinc-800 transition-all flex items-center justify-center gap-2 group">
                    Explore Hackathons
                    <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                  <button className="border border-zinc-200 text-zinc-900 px-8 py-4 rounded-full text-lg font-bold hover:bg-zinc-50 transition-all">
                    How it works
                  </button>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Search & Filter Section */}
        <section className="py-12 bg-white border-b border-zinc-200 sticky top-16 z-40 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
              <div className="relative w-full md:max-w-md">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
                <input 
                  type="text" 
                  placeholder="Search by name, tech, or theme..."
                  className="w-full pl-12 pr-4 py-3 bg-zinc-50 border border-zinc-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-zinc-900/10 focus:border-zinc-900 transition-all"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-hide">
                {['All', 'Online', 'In-Person', 'Hybrid'].map((type) => (
                  <button
                    key={type}
                    onClick={() => setFilterType(type)}
                    className={cn(
                      "px-5 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all",
                      filterType === type 
                        ? "bg-zinc-900 text-white" 
                        : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200"
                    )}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Listings Section */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-12">
              <div>
                <h2 className="text-3xl font-bold tracking-tight mb-2">Upcoming Hackathons</h2>
                <p className="text-zinc-500">Showing {filteredHackathons.length} events found worldwide</p>
              </div>
              <div className="hidden sm:flex items-center gap-4 text-sm font-medium text-zinc-500">
                <span className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                  In-Person
                </span>
                <span className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                  Online
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <AnimatePresence mode="popLayout">
                {filteredHackathons.map((hackathon) => (
                  <HackathonCard key={hackathon.id} hackathon={hackathon} />
                ))}
              </AnimatePresence>
            </div>

            {filteredHackathons.length === 0 && (
              <div className="py-20 text-center">
                <div className="w-16 h-16 bg-zinc-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-8 h-8 text-zinc-400" />
                </div>
                <h3 className="text-xl font-bold mb-2">No hackathons found</h3>
                <p className="text-zinc-500">Try adjusting your search or filters to find what you&apos;re looking for.</p>
                <button 
                  onClick={() => { setSearchQuery(''); setFilterType('All'); }}
                  className="mt-6 text-zinc-900 font-bold underline underline-offset-4"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-24 bg-zinc-900 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
              <div>
                <div className="text-5xl font-black mb-2 tracking-tighter">500+</div>
                <div className="text-zinc-400 text-sm uppercase tracking-widest font-bold">Events Listed</div>
              </div>
              <div>
                <div className="text-5xl font-black mb-2 tracking-tighter">50k+</div>
                <div className="text-zinc-400 text-sm uppercase tracking-widest font-bold">Builders</div>
              </div>
              <div>
                <div className="text-5xl font-black mb-2 tracking-tighter">$2M+</div>
                <div className="text-zinc-400 text-sm uppercase tracking-widest font-bold">Prizes Won</div>
              </div>
              <div>
                <div className="text-5xl font-black mb-2 tracking-tighter">120+</div>
                <div className="text-zinc-400 text-sm uppercase tracking-widest font-bold">Countries</div>
              </div>
            </div>
          </div>
        </section>

        {/* Newsletter / CTA */}
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-zinc-50 rounded-[3rem] p-12 md:p-20 flex flex-col items-center text-center">
              <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-6 max-w-2xl">
                NEVER MISS A <span className="text-zinc-400">CHANCE</span> TO BUILD.
              </h2>
              <p className="text-lg text-zinc-500 mb-10 max-w-xl">
                Get the latest hackathons, developer grants, and building opportunities delivered straight to your inbox every Monday.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
                <input 
                  type="email" 
                  placeholder="Enter your email"
                  className="flex-1 px-6 py-4 rounded-full border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-zinc-900/10"
                />
                <button className="bg-zinc-900 text-white px-8 py-4 rounded-full font-bold hover:bg-zinc-800 transition-all">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-white border-t border-zinc-200 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-zinc-900 rounded flex items-center justify-center">
                <Zap className="w-4 h-4 text-white fill-white" />
              </div>
              <span className="text-lg font-bold tracking-tighter">HACKHUB</span>
            </div>
            
            <div className="flex gap-8 text-sm font-medium text-zinc-500">
              <a href="#" className="hover:text-zinc-900 transition-colors">Twitter</a>
              <a href="#" className="hover:text-zinc-900 transition-colors">Discord</a>
              <a href="#" className="hover:text-zinc-900 transition-colors">GitHub</a>
              <a href="#" className="hover:text-zinc-900 transition-colors">Privacy</a>
            </div>

            <p className="text-sm text-zinc-400">
              © 2026 HackHub. Built for builders.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}