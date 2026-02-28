"use client";
import React from 'react';
import { ShieldCheck, ShieldAlert, X, CheckCircle2, AlertCircle, Trophy, ArrowRight,    } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { useLesson } from '@/hooks/useLesson';
import TactileButton from '@/app/_components/TactileButton';
import { useRouter } from 'next/navigation';
import { api } from '@/trpc/react';
import Link from 'next/link';

export const LessonView = ({ level,levelId,user_id }: { level:LevelData,levelId:number,user_id:string|null }) => {
  const { 
    step, progress, selectedOption, setSelectedOption, 
    isCorrect, handleCheck, handleNext, isFinished 
  } = useLesson(level.steps);
  const utils = api.useUtils();
  const { mutate, isPending } = api.profile.updateStats.useMutation({
    // 2. Automatically refresh the UI data when the mutation succeeds
    onSuccess: () => {
      alert("Stats updated!");
      void utils.profile.getById.invalidate(); 
    },
    onError: (error) => {
      console.error("Failed to update:", error.message);
    },
    onSettled: () => {
      // Always refetch after error or success to ensure we are synced with the DB
      void utils.profile.getById.invalidate();
    },
  });

  React.useEffect(() => {
    if (isFinished && user_id) {
      mutate({
        userId: user_id,
        xp: 100,
        points: 20,
        badges: [`level-${levelId}-complete`]
      });
    }
    // We only want this to run when 'isFinished' changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFinished, user_id, levelId, mutate]);
  if (isFinished)
    { 
    
    if(level.megaLevel !== null){
      return <div className='mt-20 flex justify-center text-white bg-red-600'>Go to mega level <Link href={`/level/${levelId}`} className='text-white'>Mega level-{levelId}</Link></div>
    }
 
      return <CompletionState currentLevelId={levelId} />;
    }
  return (
    <div className="flex flex-col h-screen bg-[#09090b] text-zinc-100 font-sans">
      {/* Header */}
      <header className="flex items-center gap-4 p-6 max-w-2xl mx-auto w-full">
        <X className="text-zinc-500 cursor-pointer hover:text-white transition" onClick={() => window.history.back()} />
        <Progress value={progress} className="h-2 bg-zinc-800" />
      </header>

      {/* Main Content */}
      <main className="flex-grow flex flex-col items-center justify-center p-6 max-w-xl mx-auto w-full">
        <div className="text-center space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="flex justify-center">
            {step?.type === 'quiz' ? (
              <AlertCircle size={80} className="text-blue-400 drop-shadow-[0_0_15px_rgba(96,165,250,0.5)]" />
            ) : step?.id === 1 ? (
              <ShieldAlert size={80} className="text-amber-400 drop-shadow-[0_0_15px_rgba(251,191,36,0.4)]" />
            ) : (
              <ShieldCheck size={80} className="text-emerald-400 drop-shadow-[0_0_15px_rgba(52,211,153,0.4)]" />
            )}
          </div>

          <div className="space-y-4">
            <h1 className="text-3xl font-black tracking-tight">{step?.title}</h1>
            <p className="text-lg text-zinc-400 leading-relaxed">{step?.description}</p>
          </div>

          {step?.type === 'quiz' && (
            <div className="grid gap-3 mt-8 w-full">
              {step.options?.map((option) => (
                <button
                  key={option}
                  onClick={() => isCorrect === null && setSelectedOption(option)}
                  className={`p-5 border-2 rounded-2xl text-lg font-bold transition-all duration-200 ${
                    selectedOption === option 
                      ? 'border-blue-500 bg-blue-500/10 text-blue-400' 
                      : 'border-zinc-800 bg-zinc-900/50 hover:border-zinc-700 text-zinc-300'
                  } ${isCorrect !== null && 'cursor-default'}`}
                >
                  {option}
                </button>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Feedback Tray */}
      <footer className={`p-8 border-t border-zinc-800 transition-colors duration-300 ${
        isCorrect === true ? 'bg-emerald-950/30' : 
        isCorrect === false ? 'bg-rose-950/30' : 'bg-[#09090b]'
      }`}>
        <div className="max-w-2xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4 min-h-[3rem]">
            {isCorrect !== null && (
              <>
                <div className={`p-2 rounded-full ${isCorrect ? 'bg-emerald-500' : 'bg-rose-500'}`}>
                  {isCorrect ? <CheckCircle2 className="text-white" /> : <X className="text-white" />}
                </div>
                <h2 className={`text-2xl font-black ${isCorrect ? 'text-emerald-400' : 'text-rose-400'}`}>
                  {isCorrect ? 'Correct!' : 'Not quite!'}
                </h2>
              </>
            )}
          </div>
          
          <TactileButton
            variant={isCorrect === false ? 'danger' : 'primary'}
            disabled={step?.type === 'quiz' && !selectedOption}
            onClick={isCorrect === null ? handleCheck : handleNext}
            className="w-full md:w-64 py-4 text-xl"
          >
            {isCorrect === null ? 'Check' : 'Continue'}
          </TactileButton>
        </div>
      </footer>
    </div>
  );
};

const CompletionState = ({ currentLevelId }: { currentLevelId: number }) => {
    const router = useRouter();
    const nextLevelId = currentLevelId + 1;
  
    return (
      <div className="h-full bg-[#09090b] flex flex-col items-center justify-center p-6 text-center">
        <div className="relative mb-8">
          <div className="absolute inset-0 bg-emerald-500/20 blur-3xl rounded-full" />
          <Trophy size={100} className="text-emerald-400 relative animate-bounce" />
        </div>
        
        <h1 className="text-4xl font-black text-white mb-2">Level {currentLevelId} Complete!</h1>
        <p className="text-zinc-400 mb-8 max-w-xs">
          You&apos;re becoming a web security expert. Ready for the next challenge?
        </p>
  
        <div className="flex flex-col w-full max-w-xs gap-3">
          <TactileButton 
            variant="primary" 
            onClick={() => router.push(`/lesson/${nextLevelId}`)}
            className="w-full flex items-center justify-center gap-2"
          >
            Next Lesson <ArrowRight size={20} />
          </TactileButton>
  
          <button 
            onClick={() => router.push("/dashboard")}
            className="text-zinc-500 hover:text-zinc-300 font-medium transition py-2"
          >
            Back to Level Select
          </button>
        </div>
      </div>
    );
  };