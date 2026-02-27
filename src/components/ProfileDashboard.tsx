"use client";
import React from 'react';
import { 
  Trophy, 
  Flame, 
  Target, 
  Zap, 
  ShieldCheck, 
  Clock, 
  Star,
  Award,
  User
} from 'lucide-react';
import { allBadges } from '@/lib/badges/allBadges';

interface profileData{
  id: string;
  points: number;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  bio: string | null;
  badges: string[];
  xp: number;
  total_lesson_completed: number;
  ai_lesson_completed: number;
  user_name: string | null;
  streak: number;
}
const ProfileDashboard = ({initialData}:{initialData:profileData}) => {
  // Mock User Data
  const badges = allBadges.filter(badge => initialData.badges.includes(badge.id)).map(badge => ({
    name: badge.name,
    icon: badge.icon, // Using the emoji directly as an icon
    color: badge.color ?? "text-zinc-400",
    bg: badge.bgColor ?? "bg-zinc-800/50",
  }));
  const user = {
    name: initialData.user_name?? "Jane Doe",
    streak: initialData.streak || 5,
    totalXp: initialData.xp || 1200,
    league:  "Gold League",
    badges: badges,
    stats: [
      { label: "Completed", value: initialData.total_lesson_completed, sub: "Lessons", icon: Star, color: "text-yellow-400" },
      { label: "In Progress", value: "3", sub: "Modules", icon: Clock, color: "text-blue-400" },
      { label: "Ai lesson completed", value: initialData.ai_lesson_completed, sub: "Analyses", icon: Target, color: "text-orange-400" },
    ]
  };

  return (
    <div className="min-h-screen bg-[#09090b] text-white p-8 ml-64">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Header Section: Profile Card */}
        <div className="relative bg-zinc-900 border-2 border-zinc-800 rounded-[2.5rem] p-8 shadow-[0_8px_0_0_#18181b] flex flex-col md:flex-row items-center gap-8">
          <div className="relative">
            <div className="w-32 h-32 rounded-3xl bg-emerald-500 border-b-8 border-emerald-700 flex items-center justify-center">
              <User size={64} className="text-white" />
            </div>
            <div className="absolute -bottom-2 -right-2 bg-orange-500 border-4 border-zinc-900 rounded-full p-2 shadow-lg">
              <Flame size={24} className="text-white fill-white" />
            </div>
          </div>
          
          <div className="text-center md:text-left space-y-2">
            <h1 className="text-4xl font-black uppercase tracking-tighter">{user.name}</h1>
            <p className="text-zinc-500 font-bold uppercase tracking-widest text-sm">Joined February 2026</p>
            <div className="flex flex-wrap gap-3 pt-2">
               <span className="px-4 py-1 bg-zinc-800 rounded-xl border-b-4 border-zinc-950 text-xs font-black uppercase text-emerald-400">
                 {user.league}
               </span>
               <span className="px-4 py-1 bg-zinc-800 rounded-xl border-b-4 border-zinc-950 text-xs font-black uppercase text-orange-400 flex items-center gap-1">
                 <Flame size={14} fill="currentColor" /> {user.streak} Day Streak
               </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Statistics Grid */}
          {user.stats.map((stat) => (
            <div key={stat.label} className="bg-zinc-900 border-2 border-zinc-800 rounded-3xl p-6 shadow-[0_5px_0_0_#18181b] flex items-center gap-4">
              <div className={`${stat.color} p-3 bg-white/5 rounded-2xl`}>
                <stat.icon size={32} />
              </div>
              <div>
                <p className="text-2xl font-black">{stat.value}</p>
                <p className="text-xs font-black text-zinc-500 uppercase tracking-widest">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Badges / Achievements Section */}
        <div className="space-y-4">
          <h2 className="text-xl font-black uppercase tracking-widest text-zinc-400 px-2">Achievements</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {user.badges.map((badge) => (
              <div key={badge.name} className="bg-zinc-900/50 border-2 border-dashed border-zinc-800 rounded-[2rem] p-6 flex flex-col items-center text-center group hover:border-zinc-600 transition-colors">
                <div className={`${badge.bg} ${badge.color} p-4 rounded-full mb-3 group-hover:scale-110 transition-transform`}>
                  <badge.icon size={40} />
                </div>
                <p className="font-black text-sm uppercase tracking-tighter">{badge.name}</p>
              </div>
            ))}
            {/* The "Locked" Badge placeholder */}
            <div className="bg-zinc-900/20 border-2 border-dashed border-zinc-900 rounded-[2rem] p-6 flex flex-col items-center text-center opacity-40">
              <div className="bg-zinc-800 p-4 rounded-full mb-3">
                <Award size={40} className="text-zinc-700" />
              </div>
              <p className="font-black text-sm uppercase tracking-tighter text-zinc-700">Locked</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ProfileDashboard;