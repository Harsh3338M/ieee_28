"use client";

import React from 'react';
import Link from 'next/link';
import { api } from "@/trpc/react";
import { MessageCircle, ArrowBigUp, ArrowBigDown, Eye, ShieldAlert } from 'lucide-react';

const CommunityFeed = () => {
  const { data: posts, isLoading } = api.post.getAll.useQuery();

  if (isLoading) return (
    <div className="min-h-screen bg-[#131f24] flex items-center justify-center">
       <div className="font-black text-[#58cc02] text-2xl animate-pulse tracking-tighter">LOADING FEED...</div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#131f24] p-4 font-sans selection:bg-[#58cc02]/30">
      <div className="max-w-2xl mx-auto space-y-6">
        
        {/* Header with Duo Style */}
        <div className="flex items-center justify-between py-6">
          <h1 className="text-3xl font-black text-[#eeeeee] tracking-tight uppercase italic flex items-center gap-2">
            <span className="text-[#58cc02]">Scam</span> Reports
          </h1>
          <Link href="/community/createPost" className="bg-[#58cc02] text-white font-black px-5 py-2.5 rounded-2xl border-b-4 border-[#46a302] hover:brightness-110 active:border-b-0 active:translate-y-[2px] transition-all text-sm uppercase tracking-wider">
            Report
          </Link>
        </div>

        {posts?.map((post) => (
          <Link 
            key={post.id} 
            href={`/community/post/${post.id}`}
            className="block group"
          >
            {/* Main Card - Fixed Colors */}
            <div className="bg-[#212c33] border-2 border-b-4 border-[#37464f] rounded-3xl p-5 hover:bg-[#2a373f] transition-all active:border-b-2 active:translate-y-[2px]">
              
              <div className="flex gap-4">
                {/* Vote Sidebar - Contrast Fix */}
                <div className="flex flex-col items-center gap-1 bg-[#131f24]/50 p-1 rounded-2xl border border-[#37464f]">
                  <div className="p-1 rounded-xl text-[#afafaf] group-hover:text-[#58cc02] transition-colors">
                    <ArrowBigUp size={26} fill="currentColor" strokeWidth={1} />
                  </div>
                  <span className="font-black text-base text-[#eeeeee]">
                    {(post.upvotes ?? 0) - (post.downvotes ?? 0)}
                  </span>
                  <div className="p-1 rounded-xl text-[#afafaf] group-hover:text-[#ff4b4b] transition-colors">
                    <ArrowBigDown size={26} fill="currentColor" strokeWidth={1} />
                  </div>
                </div>

                {/* Content Area */}
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    {/* Badge Fix */}
                    <span className="bg-[#1899d6] text-white text-[10px] font-black px-2.5 py-1 rounded-xl uppercase tracking-widest border-b-2 border-[#147eb1]">
                      {post.scamType}
                    </span>
                    <span className="text-[11px] font-bold text-[#afafaf] uppercase tracking-tighter">
                      • {new Date(post.createdAt).toLocaleDateString()}
                    </span>
                  </div>

                  <h2 className="text-xl font-black text-[#eeeeee] mb-1 leading-tight group-hover:text-[#58cc02] transition-colors">
                    {post.title}
                  </h2>

                  <p className="text-[#afafaf] text-sm line-clamp-2 mb-4 font-medium leading-relaxed">
                    {post.content}
                  </p>

                  {/* Footer Stats - Icon Thickness Fix */}
                  <div className="flex gap-5 text-[#afafaf]">
                    <div className="flex items-center gap-1.5 hover:text-[#1899d6] transition-colors">
                      <MessageCircle size={18} strokeWidth={3} />
                      <span className="text-xs font-black uppercase tracking-widest">Discuss</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Eye size={18} strokeWidth={3} />
                      <span className="text-xs font-black uppercase tracking-widest">{post.viewCount}</span>
                    </div>
                  </div>
                </div>

                {/* Thumbnail Fix */}
                {post.imageUrl && (
                  <div className="hidden sm:block w-24 h-24 rounded-2xl overflow-hidden border-2 border-[#37464f] shrink-0">
                    <img 
                      src={post.imageUrl} 
                      alt="Evidence" 
                      className="w-full h-full object-cover grayscale-[0.1] group-hover:grayscale-0 transition-all"
                    />
                  </div>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CommunityFeed;