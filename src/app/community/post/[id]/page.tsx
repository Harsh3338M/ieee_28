import { api } from "@/trpc/server"; // Use the server-side caller
import { 
  ArrowLeft, 
  MessageCircle, 
  ArrowBigUp, 
  ArrowBigDown, 
  ShieldAlert, 
  Share2,
  Calendar
} from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';

const PostDetailPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  // 1. Await the dynamic params
  const { id } = await params;
  const postId = parseInt(id);

  // 2. Fetch data directly on the server
  // This replaces the useQuery hook
  const post = await api.post.getById({ id: postId });

  // 3. Handle 404
  if (!post) {
    notFound();
  }

  const netScore = post.upvotes - post.downvotes;

  return (
    <div className="min-h-screen bg-[#131f24] text-[#eeeeee] pb-20 font-sans">
      {/* Sticky Header */}
      <div className="sticky top-0 z-10 bg-[#131f24] border-b-2 border-[#37464f] p-4">
        <div className="max-w-3xl mx-auto flex items-center gap-4">
          <Link 
            href="/community" // Use Link instead of router.back in Server Components
            className="p-2 hover:bg-[#212c33] rounded-xl transition-colors text-[#afafaf]"
          >
            <ArrowLeft size={24} strokeWidth={3} />
          </Link>
          <h2 className="font-black uppercase tracking-tight text-sm text-[#afafaf]">Back to Feed</h2>
        </div>
      </div>

      <div className="max-w-3xl mx-auto p-4 pt-8">
        {/* Main Post Container */}
        <div className="bg-[#212c33] border-2 border-b-4 border-[#37464f] rounded-3xl overflow-hidden">
          
          {/* Top Metadata */}
          <div className="p-6 border-b-2 border-[#37464f] flex justify-between items-start">
            <div className="flex items-center gap-3">
              <div className="bg-[#1899d6] p-2 rounded-xl border-b-4 border-[#147eb1]">
                <ShieldAlert className="text-white" size={20} />
              </div>
              <div>
                <span className="bg-[#1899d6]/20 text-[#1899d6] text-[10px] font-black px-2 py-0.5 rounded-md uppercase tracking-widest">
                  {post.scamType}
                </span>
                <h1 className="text-2xl md:text-3xl font-black text-white leading-tight mt-1">
                  {post.title}
                </h1>
              </div>
            </div>
            
            <div className="hidden sm:flex flex-col items-center bg-[#131f24] p-2 rounded-2xl border-2 border-[#37464f]">
              <ArrowBigUp className="text-[#afafaf] hover:text-[#58cc02] cursor-pointer" size={28} fill="currentColor" />
              <span className="font-black text-lg">{netScore}</span>
              <ArrowBigDown className="text-[#afafaf] hover:text-[#ff4b4b] cursor-pointer" size={28} fill="currentColor" />
            </div>
          </div>

          {/* Image Evidence Section */}
          {post.imageUrl && (
            <div className="p-4 bg-[#131f24]/30">
              <div className="rounded-2xl border-2 border-[#37464f] overflow-hidden">
                <img 
                  src={post.imageUrl} 
                  alt="Evidence" 
                  className="w-full h-auto max-h-[500px] object-contain bg-black/20"
                />
              </div>
              <p className="text-center text-[#afafaf] text-xs font-bold mt-2 uppercase tracking-tighter italic">
                — Attachment: Evidence Provided —
              </p>
            </div>
          )}

          {/* Content Body */}
          <div className="p-6">
            <div className="flex items-center gap-2 mb-6 text-[#afafaf]">
              <div className="w-8 h-8 rounded-full bg-[#58cc02] border-2 border-[#46a302] flex items-center justify-center text-white font-black text-xs">
                {post.createdBy?.name?.[0] ?? 'U'}
              </div>
              <span className="text-sm font-black text-[#eeeeee]">{post.createdBy?.name ?? "Anonymous User"}</span>
              <span className="text-xs font-bold opacity-60">•</span>
              <Calendar size={14} />
              <span className="text-xs font-bold uppercase">{new Date(post.createdAt).toLocaleDateString()}</span>
            </div>

            <div className="prose prose-invert max-w-none">
              <p className="text-[#afafaf] leading-relaxed text-lg whitespace-pre-wrap">
                {post.content}
              </p>
            </div>
          </div>

          {/* Interaction Footer */}
          <div className="p-4 bg-[#2a373f] flex items-center gap-4 border-t-2 border-[#37464f]">
             <button className="flex-1 bg-[#131f24] hover:bg-[#1c2a32] p-3 rounded-2xl border-b-4 border-black flex items-center justify-center gap-2 transition-all active:border-b-0 active:translate-y-[2px]">
                <MessageCircle size={20} className="text-[#1899d6]" strokeWidth={3} />
                <span className="font-black text-sm text-[#eeeeee] uppercase">Join Discussion</span>
             </button>
             <button className="bg-[#131f24] hover:bg-[#1c2a32] p-3 rounded-2xl border-b-4 border-black transition-all active:border-b-0 active:translate-y-[2px]">
                <Share2 size={20} className="text-[#afafaf]" />
             </button>
          </div>
        </div>

        {/* Placeholder for Comments Section */}
        <div className="mt-8 space-y-4">
           <h3 className="font-black text-[#afafaf] uppercase text-sm tracking-widest ml-2">Comments</h3>
           <div className="bg-[#212c33] p-6 rounded-2xl border-2 border-[#37464f] border-dashed text-center">
              <p className="text-[#afafaf] font-bold">No comments yet. Be the first to warn others!</p>
           </div>
        </div>
      </div>
    </div>
  );
};

export default PostDetailPage;