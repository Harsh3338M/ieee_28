"use client";

import React, { useState } from 'react';
import { api } from "@/trpc/react";
import { useRouter } from "next/navigation";
import { 
  Send, 
  Ghost, 
  ShieldAlert
} from "lucide-react";
// 1. IMPORT YOUR ENUM (Adjust path as needed)
import { ScamType } from "../../../../generated/prisma"; 

// 2. Update these IDs to match your Prisma Enum exactly
const SCAM_TYPES = [
  { id: ScamType.PHISHING, label: 'Phishing Link', icon: '🔗' },
  { id: ScamType.CRYPTO, label: 'Crypto', icon: '💰' },
  { id: ScamType.WHATSAPP, label: 'WhatsApp/SMS', icon: '📱' },
  { id: ScamType.GENERAL, label: 'General/Other', icon: '⚠️' },
  { id: ScamType.MARKETPLACE, label: 'MarketPlace', icon: '📈' },
];

export default function CreatePostPage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [scamType, setScamType] = useState<ScamType>(ScamType.GENERAL);
  const [isAnonymous, setIsAnonymous] = useState(false);

  const createPost = api.post.create.useMutation({
    onSuccess: () => {
      // 3. Make sure this points to your feed page
      router.push("/community"); 
      router.refresh();
    },
    onError: (err) => {
      // Use 'message' directly; tRPC errors usually have this
      const errorMessage = err.message ?? "An unknown error occurred";
      alert(errorMessage);
    },
  });

  const handleSubmit = () => {
    if (!title || !content) return;
    // Note: Ensure your router 'create' input includes 'isAnonymous' 
    // or remove it here if your schema doesn't have it yet.
    createPost.mutate({ 
      title, 
      content, 
      scamType:scamType , 
      // isAnonymous: isAnonymous // Only include if added to Prisma/Router
    });
  };

  return (
    <div className="min-h-screen bg-[#131f24] text-[#eeeeee] font-sans p-6 pb-24">
      <div className="max-w-2xl mx-auto space-y-8">
        
        {/* Header Section */}
        <div className="flex items-center gap-4 mb-10">
          <div className="p-4 bg-[#afafaf]/10 rounded-2xl border-2 border-[#37464f]">
            <ShieldAlert size={32} className="text-[#ff4b4b]" />
          </div>
          <div>
            <h1 className="text-3xl font-black tracking-tight uppercase">Report a Scam</h1>
            <p className="text-[#afafaf] font-bold">Help others stay safe in the community.</p>
          </div>
        </div>

        {/* Form Card */}
        <div className="relative">
          <div className="bg-[#212c33] border-2 border-b-4 border-[#37464f] rounded-3xl p-8 space-y-6">
            
            {/* Title Input */}
            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest text-[#afafaf] ml-1">
                Headline
              </label>
              <input 
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="What happened? (e.g., Fake Amazon Support Call)"
                className="w-full bg-[#131f24] border-2 border-[#37464f] rounded-2xl p-4 text-lg font-bold focus:outline-none focus:border-[#58cc02] transition-all placeholder:text-[#52656d]"
              />
            </div>

            {/* Scam Type Selector */}
            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest text-[#afafaf] ml-1">
                Scam Category
              </label>
              <div className="flex flex-wrap gap-3">
                {SCAM_TYPES.map((type) => (
                  <button
                    key={type.id}
                    type="button"
                    onClick={() => setScamType(type.id)}
                    className={`px-4 py-2 rounded-2xl font-black text-sm transition-all active:translate-y-1 ${
                      scamType === type.id 
                        ? 'bg-[#1cb0f6] text-white border-b-4 border-[#1899d6]' 
                        : 'bg-[#131f24] text-[#afafaf] border-2 border-[#37464f] hover:bg-[#253942]'
                    }`}
                  >
                    {type.icon} {type.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Story Textarea */}
            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest text-[#afafaf] ml-1">
                The Details
              </label>
              <textarea 
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={6}
                placeholder="Describe the scam in detail... What were the warning signs?"
                className="w-full bg-[#131f24] border-2 border-[#37464f] rounded-2xl p-4 text-base font-medium focus:outline-none focus:border-[#58cc02] transition-all placeholder:text-[#52656d] resize-none"
              />
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t-2 border-[#37464f]">
              
              <div className="flex items-center gap-3 text-[#52656d]">
                 <Ghost size={20} />
                 <span className="text-xs font-black uppercase">Identity Protected</span>
              </div>

              <button 
                onClick={handleSubmit}
                disabled={!title || !content || createPost.isPending}
                className="w-full sm:w-auto px-10 py-4 bg-[#58cc02] border-b-4 border-[#46a302] rounded-2xl font-black text-white uppercase tracking-wider hover:brightness-110 active:border-b-0 active:translate-y-1 transition-all disabled:opacity-50"
              >
                {createPost.isPending ? "Publishing..." : "Publish Warning"}
              </button>
            </div>
          </div>
        </div>

        {/* Helper Tip */}
        <div className="bg-[#1cb0f6]/10 border-2 border-[#1cb0f6] rounded-2xl p-4 flex gap-4 items-center">
          <div className="bg-[#1cb0f6] p-2 rounded-lg">
            <Send size={20} className="text-white" />
          </div>
          <p className="text-sm font-bold text-[#1cb0f6]">
            Pro tip: Avoid sharing your own personal phone number in the post.
          </p>
        </div>

      </div>
    </div>
  );
}