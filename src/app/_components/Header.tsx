/* eslint-disable @next/next/no-img-element */
import React from 'react'
import { auth } from "@/server/auth";
import { LoginButton } from '@/components/LoginButton';
import CourseSwitcher from '@/components/CourseSwitcher';
import { HeaderWrapper } from '@/components/HeaderWrapper'; // Import the wrapper
import UserStats from '@/components/Stats';

const Header = async () => {
  const session = await auth();
  const user = session?.user;

  return (
    <HeaderWrapper>
      {/* Notice: removed 'fixed' and 'top-0' here, wrapper does it now */}
      <header className="h-20 bg-[#09090b]/90 backdrop-blur-md border-b-4 border-zinc-800 flex items-center justify-center px-6">
        <div className="max-w-5xl w-full flex items-center justify-between">
          <CourseSwitcher />

          <div className="flex items-center gap-6">
            {user && (
              <div className="flex items-center gap-3 group cursor-pointer">
                <div className="w-10 h-10 rounded-xl overflow-hidden border-2 border-zinc-700 group-hover:border-emerald-500 transition-colors">
                  <img 
                    src={user?.image ?? "https://avatar.vercel.sh/guest"} 
                    alt="profile" 
                    className="w-full h-full object-cover" 
                  />
                </div>
                <p className="hidden md:block text-sm font-black text-zinc-200 uppercase tracking-wider">
                  {user?.name}
                </p>
              </div>
            )}
            <div>

{user?.id &&<UserStats user_id={user?.id} />}
            </div>
            <div className="flex items-center">
               <LoginButton />
            </div>
          </div>
        </div>
      </header>
    </HeaderWrapper>
  );
};

export default Header;

