"use client";

import React, { useState } from 'react';
import { Bot, Sparkles, Send, BrainCircuit } from 'lucide-react';
import { LessonView } from '@/components/LessonView'; 
import { generateLessonData, } from '@/lib/chat';

interface LevelData {
  lesson: number;
  steps: Step[];
  xp: number;
  title: string;
  badges: string[];
  points: number;
}
const SUGGESTIONS = [
  { label: "SQL Injection", icon: "💉" },
  { label: "XSS Attacks", icon: "📜" },
  { label: "Phishing", icon: "🎣" },
  { label: "Brute Force", icon: "🔨" }
];

export default function AILessonPortal() {
  const [stage, setStage] = useState<'chat' | 'loading' | 'lesson'>('chat');
  const [inputValue, setInputValue] = useState("");
  
  // FIXED: Explicitly set type to LevelData or null to avoid linting/error types
  const [generatedLesson, setGeneratedLesson] = useState<LevelData | null>(null);
  const [currentTopic, setCurrentTopic] = useState("");

  const handleGenerate = async (topic: string) => {
    if (!topic || stage === 'loading') return;
    
    setStage('loading');
    setCurrentTopic(topic);

    try {
      // Pass a random ID for the dynamic level
      const result = await generateLessonData(topic, Math.floor(Math.random() * 10000));

      if (result.success && result.data) {
        setGeneratedLesson(result.data);
        setStage('lesson');
      } else {
        throw new Error("Invalid response from AI");
      }
    } catch (error) {
      console.error("Portal Error:", error);
      alert("The AI is currently recalibrating. Please try again!");
      setStage('chat');
    }
  };

  // --- STAGE: LOADING ---
  if (stage === 'loading') {
    return (
      <div className="h-screen bg-[#09090b] flex flex-col items-center justify-center p-6 text-center">
        <div className="relative mb-8">
          <div className="absolute inset-0 bg-green-500/30 blur-3xl rounded-full animate-pulse" />
          <BrainCircuit size={80} className="text-green-400 relative animate-bounce" />
        </div>
        <h2 className="text-3xl font-black text-white mb-2 uppercase tracking-tighter">
          Generating: {currentTopic}
        </h2>
        <p className="text-zinc-500 max-w-xs font-medium">
          Compiling custom interactive modules...
        </p>
      </div>
    );
  }

  // --- STAGE: LESSON ---
  // FIXED: Passing 'generatedLesson' variable, not the 'generateLessonData' function
  if (stage === 'lesson' && generatedLesson) {
    return (
      <LessonView 
        level={generatedLesson} // Corrected: pass the data object
        levelId={generatedLesson.lesson}
        user_id={""} // Pass empty string or fetch from session if needed
      />
    );
  }

  // --- STAGE: CHAT (HERO UI) ---
  return (
    <div className="flex flex-col h-screen bg-[#09090b] text-white overflow-hidden font-sans">
      <main className="flex-grow flex flex-col items-center justify-center p-6 max-w-2xl mx-auto w-full space-y-10">
        
        {/* Avatar Area */}
        <div className="relative">
          <div className="absolute inset-0 bg-green-600/20 blur-3xl rounded-full" />
          <div className="relative w-28 h-28 bg-zinc-900 border-2 border-zinc-800 rounded-[2.5rem] flex items-center justify-center shadow-2xl rotate-3 transition-transform hover:rotate-0">
            <Bot size={56} className="text-green-400 -rotate-3" />
          </div>
        </div>

        {/* Branding */}
        <div className="text-center space-y-4">
          <h1 className="text-6xl font-black tracking-tighter leading-tight italic uppercase">
            Ready to <span className="text-green-500">Hack</span>?
          </h1>
          <p className="text-zinc-400 text-xl font-medium px-4">
            Input a security concept. I&apos;ll build the laboratory.
          </p>
        </div>

        {/* Input Area */}
        <div className="w-full space-y-6">
          <div className="relative group">
            <div className="absolute inset-0 translate-y-2 bg-zinc-800 rounded-3xl" />
            <input 
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleGenerate(inputValue)}
              placeholder="e.g. Broken Access Control"
              className="relative w-full bg-zinc-900 border-2 border-zinc-800 rounded-3xl p-6 pr-20 text-xl font-bold focus:outline-none focus:border-green-500 transition-all placeholder:text-zinc-700"
            />
            <button 
              disabled={!inputValue || stage === 'loading'}
              onClick={() => handleGenerate(inputValue)}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-green-500 rounded-2xl text-white hover:bg-green-400 disabled:bg-zinc-800 disabled:text-zinc-700 transition-all active:translate-y-1"
            >
              <Send size={24} strokeWidth={3} />
            </button>
          </div>

          {/* Suggested Chips */}
          <div className="space-y-4">
            <p className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.3em] text-center">
              Quick Select
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {SUGGESTIONS.map((chip) => (
                <button
                  key={chip.label}
                  onClick={() => handleGenerate(chip.label)}
                  className="relative group active:translate-y-1 transition-all"
                >
                  <div className="absolute inset-0 translate-y-1 bg-zinc-800 rounded-2xl" />
                  <div className="relative px-5 py-3 bg-zinc-900 border-2 border-zinc-800 rounded-2xl font-bold text-sm flex items-center gap-2 group-hover:border-zinc-500">
                    <span>{chip.icon}</span>
                    {chip.label}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </main>

      <footer className="p-8 flex items-center justify-center gap-3 text-zinc-700 font-black uppercase text-[10px] tracking-[0.3em]">
        <Sparkles size={14} />
        <span>Neural Curriculum Engine</span>
        <Sparkles size={14} />
      </footer>
    </div>
  );
}