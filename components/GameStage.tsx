
import React, { useState, useEffect } from 'react';
import { WordChallenge, GameFeedback, LevelConfig } from '../types';
import { getSpellingExplanation, speakWord } from '../services/geminiService';
import { CheckCircle2, XCircle, Wand2, Loader2, Volume2, Info, ArrowRight, Sparkles, BookOpen } from 'lucide-react';

interface GameStageProps {
  level: LevelConfig;
  onComplete: (success: boolean) => void;
  onUpdateStats: (xp: number) => void;
}

type GameState = 'INTRO' | 'PLAYING' | 'COMPLETED';

const GameStage: React.FC<GameStageProps> = ({ level, onComplete, onUpdateStats }) => {
  const [gameState, setGameState] = useState<GameState>('INTRO');
  const [currentChallengeIndex, setCurrentChallengeIndex] = useState(0);
  const [feedback, setFeedback] = useState<GameFeedback | null>(null);
  const [isLoadingAi, setIsLoadingAi] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  // Fix: Added missing state variable to track audio playback status
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);

  const challenge = level.challenges[currentChallengeIndex];

  // Logic for completion animation
  const handleLevelFinished = () => {
    setGameState('COMPLETED');
    // @ts-ignore
    confetti({
      particleCount: 150,
      spread: 100,
      origin: { y: 0.5 },
      colors: ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6']
    });
  };

  // Fix: Added missing handlePlayAudio function to play the current word's audio
  const handlePlayAudio = () => {
    if (isAudioPlaying) return;
    setIsAudioPlaying(true);
    speakWord(challenge.fullWord);
    // Simple state reset after estimated playback duration
    setTimeout(() => setIsAudioPlaying(false), 1000);
  };

  const handleOptionClick = async (option: string) => {
    if (feedback) return;
    
    setSelectedOption(option);
    const isCorrect = option === challenge.correctAnswer;
    
    setFeedback({
      isCorrect,
      message: isCorrect ? 'Snyggt! Runan börjar lysa.' : 'Ojdå, inte riktigt!',
      aiInsight: "Hämtar magisk förklaring..." 
    });

    if (isCorrect) {
      onUpdateStats(50);
      // @ts-ignore
      confetti({
        particleCount: 40,
        spread: 50,
        origin: { y: 0.7 }
      });
    }

    setIsLoadingAi(true);
    const aiInsight = await getSpellingExplanation(
      challenge.fullWord,
      option,
      challenge.correctAnswer,
      level.title
    );
    
    setFeedback(prev => prev ? { ...prev, aiInsight } : null);
    setIsLoadingAi(false);
  };

  const nextChallenge = () => {
    if (currentChallengeIndex < level.challenges.length - 1) {
      setCurrentChallengeIndex(prev => prev + 1);
      setFeedback(null);
      setSelectedOption(null);
      speakWord(level.challenges[currentChallengeIndex + 1].fullWord);
    } else {
      handleLevelFinished();
    }
  };

  if (gameState === 'INTRO') {
    return (
      <div className="max-w-2xl mx-auto py-8 px-4 animate-in fade-in zoom-in-95 duration-500">
        <div className={`p-8 rounded-3xl border-2 ${level.color} ${level.borderColor} shadow-2xl backdrop-blur-md`}>
          <div className="flex justify-center mb-6">
            <div className="p-6 bg-white/10 rounded-full float-anim">
              {React.cloneElement(level.icon as React.ReactElement, { className: "w-16 h-16" })}
            </div>
          </div>
          <h2 className="text-3xl font-cinzel font-bold text-center mb-4">{level.title}</h2>
          
          <div className="bg-black/30 rounded-2xl p-6 mb-8 border border-white/10">
            <div className="flex items-center gap-2 text-blue-400 mb-2">
              <BookOpen className="w-5 h-5" />
              <span className="font-bold uppercase text-sm tracking-wider">Dagens Regel</span>
            </div>
            <h4 className="text-xl font-bold mb-2">{level.ruleTitle}</h4>
            <p className="text-slate-200 leading-relaxed mb-6">{level.ruleExplanation}</p>
            
            <div className="grid grid-cols-2 gap-4">
              {level.examples.map((ex, i) => (
                <div key={i} className="bg-white/5 p-3 rounded-xl border border-white/5">
                  <span className="block font-bold text-blue-300 text-lg">{ex.word}</span>
                  <span className="text-xs text-slate-400">{ex.explanation}</span>
                </div>
              ))}
            </div>
          </div>

          <button 
            onClick={() => {
              setGameState('PLAYING');
              speakWord(challenge.fullWord);
            }}
            className="w-full py-5 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl font-black text-xl shadow-lg transition-all active:scale-95 flex items-center justify-center gap-3 group"
          >
            Starta Expeditionen
            <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    );
  }

  if (gameState === 'COMPLETED') {
    return (
      <div className="max-w-2xl mx-auto py-8 px-4 animate-in zoom-in-95 duration-700">
        <div className="p-12 rounded-3xl bg-slate-900 border-4 border-emerald-500 text-center shadow-[0_0_50px_rgba(16,185,129,0.2)]">
          <div className="text-8xl mb-6 flex justify-center">
            <div className="relative">
               <div className="absolute inset-0 blur-2xl bg-emerald-500/50 animate-pulse"></div>
               <span className="relative text-emerald-400 font-serif drop-shadow-[0_0_15px_rgba(52,211,153,0.8)]">
                 {level.runeSymbol}
               </span>
            </div>
          </div>
          <h2 className="text-4xl font-cinzel font-bold mb-4 text-emerald-400">Runan är helad!</h2>
          <p className="text-slate-300 text-xl mb-10">
            Du har bemästrat {level.title.toLowerCase()} och återställt en del av språkets kraft till trädet.
          </p>
          <div className="flex flex-col gap-4">
            <div className="bg-emerald-500/10 border border-emerald-500/30 p-4 rounded-2xl flex items-center justify-between">
              <span className="font-bold">Belöning:</span>
              <span className="text-emerald-400 font-bold">+200 XP</span>
            </div>
            <button 
              onClick={() => onComplete(true)}
              className="w-full py-5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-2xl font-black text-xl shadow-lg transition-all"
            >
              Återvänd till kartan
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto py-8 px-4 animate-in fade-in duration-300">
      <div className={`p-8 rounded-3xl border-2 transition-all ${level.color} ${level.borderColor} shadow-2xl backdrop-blur-sm`}>
        
        {/* Progress header */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-white/10 rounded-lg">{level.icon}</div>
            <span className="font-bold text-slate-300 uppercase text-xs tracking-widest">{level.title}</span>
          </div>
          <div className="flex gap-1">
            {level.challenges.map((_, i) => (
              <div 
                key={i} 
                className={`w-3 h-3 rounded-full transition-colors ${i < currentChallengeIndex ? 'bg-emerald-400' : i === currentChallengeIndex ? 'bg-blue-400 animate-pulse' : 'bg-slate-700'}`}
              />
            ))}
          </div>
        </div>

        {/* Word Display */}
        <div className="text-center py-12 bg-black/20 rounded-2xl mb-8 border border-white/5 relative group">
          <button 
            onClick={handlePlayAudio}
            className={`absolute top-4 right-4 p-3 rounded-full transition-all ${isAudioPlaying ? 'bg-blue-500 text-white' : 'bg-white/10 hover:bg-white/20 text-blue-400'}`}
          >
            <Volume2 className="w-6 h-6" />
          </button>
          
          <div className="px-6 mb-8">
            <p className="text-slate-300 text-lg italic flex items-center justify-center gap-2">
              <Info className="w-5 h-5 text-blue-500 shrink-0" />
              <span>"{challenge.context.replace('___', '______')}"</span>
            </p>
          </div>
          
          <h3 className="text-7xl font-bold tracking-tighter font-mono">
            {challenge.word.split('_').map((part, i) => (
              <React.Fragment key={i}>
                {part}
                {i < challenge.word.split('_').length - 1 && (
                  <span className="text-blue-500 border-b-4 border-blue-500/40 px-1">_</span>
                )}
              </React.Fragment>
            ))}
          </h3>
        </div>

        {/* Interaction Grid */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          {challenge.options.map((option) => (
            <button
              key={option}
              disabled={!!feedback || isLoadingAi}
              onClick={() => handleOptionClick(option)}
              className={`
                p-8 rounded-2xl text-4xl font-bold transition-all transform
                ${selectedOption === option 
                  ? (option === challenge.correctAnswer ? 'bg-emerald-600 border-emerald-400 scale-105' : 'bg-rose-600 border-rose-400') 
                  : 'bg-slate-800/80 hover:bg-slate-700 border-white/10 hover:border-white/30'}
                border-2 shadow-lg
                ${feedback ? 'cursor-default' : 'active:scale-95'}
              `}
            >
              {option}
            </button>
          ))}
        </div>

        {/* Feedback Area */}
        {feedback && (
          <div className={`p-6 rounded-2xl border-2 animate-in slide-in-from-bottom-2 ${feedback.isCorrect ? 'bg-emerald-950/40 border-emerald-500/50' : 'bg-rose-950/40 border-rose-500/50'}`}>
            <div className="flex items-start gap-4">
              <div className="p-3 bg-white/10 rounded-full">
                {feedback.isCorrect ? <Sparkles className="w-6 h-6 text-emerald-400" /> : <XCircle className="w-6 h-6 text-rose-400" />}
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-xl mb-1">{feedback.message}</h4>
                
                <div className="flex items-center gap-2 text-slate-300 min-h-[4rem]">
                  {isLoadingAi ? (
                    <div className="flex items-center gap-2">
                      <Loader2 className="w-4 h-4 animate-spin text-blue-400" />
                      <span className="text-sm italic">Ordmagikern viskar en förklaring...</span>
                    </div>
                  ) : (
                    <div className="flex items-start gap-2">
                      <Wand2 className="w-4 h-4 text-blue-400 mt-1 shrink-0" />
                      <p className="text-base italic text-slate-100">{feedback.aiInsight}</p>
                    </div>
                  )}
                </div>

                <button
                  onClick={nextChallenge}
                  className="mt-6 w-full py-4 bg-white text-slate-900 rounded-xl font-black text-lg hover:bg-blue-50 transition-all shadow-xl active:scale-95"
                >
                  {currentChallengeIndex === level.challenges.length - 1 ? 'REPARERA RUNAN' : 'NÄSTA ORD'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GameStage;
