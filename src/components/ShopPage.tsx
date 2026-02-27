"use client";
import React from 'react';
import { ShieldCheck, Snowflake, Terminal, Zap, ShoppingCart } from 'lucide-react';
import TactileButton from '@/app/_components/TactileButton';

const SHOP_ITEMS = [
  {
    id: 'freeze',
    name: 'Firewall Freeze',
    desc: 'Protect your streak for one day of inactivity.',
    price: 200,
    icon: Snowflake,
    color: 'text-blue-400',
    bg: 'bg-blue-400/10'
  },
  {
    id: 'decrypt',
    name: 'Hint Decryptor',
    desc: 'Reveal a hint or remove a wrong answer in any AI lesson.',
    price: 500,
    icon: Zap,
    color: 'text-yellow-400',
    bg: 'bg-yellow-400/10'
  },
  {
    id: 'pro_terminal',
    name: 'Neon Terminal',
    desc: 'Unlock a custom neon-green theme for your dashboard.',
    price: 1500,
    icon: Terminal,
    color: 'text-emerald-400',
    bg: 'bg-emerald-400/10'
  }
];

const ShopPage = () => {
  return (
    <div className="min-h-screen bg-[#09090b] text-white p-8 ml-64 pt-24">
      <div className="max-w-3xl mx-auto space-y-12">
        
        {/* Shop Header */}
        <div className="flex items-center justify-between border-b-4 border-zinc-800 pb-8">
          <div>
            <h1 className="text-4xl font-black uppercase tracking-tighter">The Armory</h1>
            <p className="text-zinc-500 font-bold uppercase tracking-wider text-sm mt-1">Upgrade your security toolkit</p>
          </div>
          <div className="bg-zinc-900 px-6 py-3 rounded-2xl border-b-4 border-zinc-950 flex items-center gap-3">
            <Zap className="text-yellow-400 fill-yellow-400" size={24} />
            <span className="text-2xl font-black">1,240</span>
          </div>
        </div>

        {/* Items Grid */}
        <div className="space-y-4">
          {SHOP_ITEMS.map((item) => (
            <div key={item.id} className="flex items-center gap-6 p-6 bg-zinc-900 border-2 border-zinc-800 rounded-[2.5rem] shadow-[0_8px_0_0_#18181b] transition-transform active:translate-y-1">
              <div className={`${item.bg} ${item.color} p-5 rounded-3xl`}>
                <item.icon size={40} />
              </div>
              
              <div className="flex-grow">
                <h3 className="text-xl font-black uppercase tracking-tight">{item.name}</h3>
                <p className="text-zinc-500 font-medium text-sm">{item.desc}</p>
              </div>

              <TactileButton variant="primary" className="px-6 py-3 text-sm flex items-center gap-2">
                 Buy for {item.price}
              </TactileButton>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ShopPage;