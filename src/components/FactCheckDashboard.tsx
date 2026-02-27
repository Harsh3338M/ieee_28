/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
"use client";
import React, { useState } from 'react';
import { ShieldCheck, ShieldAlert, Upload, Search, ArrowRight } from 'lucide-react';
import { factCheckSecurity } from '@/lib/FactChecker'; // Your Server Action
const FactChecker = () => {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleCheck = async () => {
    setLoading(true);
    const data = await factCheckSecurity(query);
    if (data.success) setResult(data.analysis);
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#09090b] text-white p-6 ml-64 mt-20 ">
      <div className="max-w-3xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="inline-block p-4 bg-orange-500/10 rounded-3xl border-2 border-orange-500/20 mb-4">
            <ShieldAlert size={48} className="text-orange-400" />
          </div>
          <h1 className="text-4xl font-black uppercase tracking-tighter">Fact Checker</h1>
          <p className="text-zinc-500 font-bold">Paste a suspicious message or upload a screenshot</p>
        </div>

        {/* Input Area */}
        <div className="bg-zinc-900 border-2 border-zinc-800 rounded-[2.5rem] p-2 shadow-[0_8px_0_0_#18181b]">
          <textarea 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ex: 'A bank caller is asking for my OTP to update my KYC...'"
            className="w-full bg-transparent p-6 text-lg font-bold focus:outline-none min-h-[150px] resize-none"
          />
          <div className="flex items-center justify-between p-4 bg-black/40 rounded-[2rem]">
            <button className="flex items-center gap-2 px-4 py-2 text-zinc-400 font-black uppercase text-xs hover:text-white transition">
              <Upload size={18} /> Add Screenshot
            </button>
            <button 
              onClick={handleCheck}
              disabled={loading}
              className="bg-orange-500 border-b-4 border-orange-700 px-8 py-3 rounded-2xl font-black uppercase tracking-widest flex items-center gap-2 active:translate-y-1 active:border-b-0 transition-all"
            >
              {loading ? "Analyzing..." : "Fact Check"} <Search size={18} />
            </button>
          </div>
        </div>

        {/* Results Card */}
        {result && (
          <div className="animate-in fade-in zoom-in duration-300">
            <div className={`rounded-[2.5rem] border-2 p-8 space-y-6 ${
              result.isScam ? 'bg-rose-500/10 border-rose-500/50' : 'bg-emerald-500/10 border-emerald-500/50'
            }`}>
              <div className="flex items-center justify-between">
                <h2 className={`text-3xl font-black uppercase ${result.isScam ? 'text-rose-400' : 'text-emerald-400'}`}>
                  Verdict: {result.isScam ? 'Likely a Scam' : 'Looks Safe'}
                </h2>
                <div className={`px-4 py-1 rounded-full font-black text-xs uppercase ${
                   result.riskLevel === 'Critical' ? 'bg-rose-600' : 'bg-orange-500'
                }`}>
                  {result.riskLevel} Risk
                </div>
              </div>

              <p className="text-xl font-bold text-zinc-200">{result.summary}</p>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h3 className="font-black uppercase text-xs text-zinc-500 tracking-widest">Red Flags</h3>
                  {result.redFlags.map((flag: string) => (
                    <div key={flag} className="flex gap-2 text-sm font-bold text-rose-300">
                      <ShieldAlert size={16} className="shrink-0" /> {flag}
                    </div>
                  ))}
                </div>
                <div className="space-y-3">
                  <h3 className="font-black uppercase text-xs text-zinc-500 tracking-widest">Next Steps</h3>
                  {result.recommendations.map((step: string) => (
                    <div key={step} className="flex gap-2 text-sm font-bold text-emerald-300">
                      <ArrowRight size={16} className="shrink-0" /> {step}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FactChecker;