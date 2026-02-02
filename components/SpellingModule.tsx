
import React, { useState, useEffect, useRef } from 'react';
import { SpellingModule, PatternWord } from '../types';
import { speakWord } from '../services/geminiService';
import { Eye, EyeOff, PenTool, CheckCircle, ArrowRight, ArrowLeft, Volume2, Info, Sparkles, Search, Keyboard, Trophy, Activity, Clock, Timer, AlertCircle } from 'lucide-react';

interface Props {
  module: SpellingModule;
  bestTime?: number;
  onExit: () => void;
  onComplete: (seconds: number) => void;
}

type Step = 'PRESENTATION' | 'PRACTICE' | 'DETECTIVE' | 'DIAGNOSTIC' | 'FINISHED';
type PracticePhase = 'WATCH' | 'TYPE' | 'RESULT';
type DiagnosticPhase = 'LISTEN' | 'TYPE' | 'RESULT';

const SpellingModuleView: React.FC<Props> = ({ module, bestTime, onExit, onComplete }) => {
  const [activeStep, setActiveStep] = useState<Step>('PRESENTATION');
  
  // Timer State
  const [seconds, setSeconds] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  
  // Practice State
  const [isBonusMode, setIsBonusMode] = useState(false);
  const [practiceIdx, setPracticeIdx] = useState(0);
  const [phase, setPhase] = useState<PracticePhase>('WATCH');
  const [userInput, setUserInput] = useState('');
  const [practiceFeedback, setPracticeFeedback] = useState<boolean | null>(null);
  const [isShaking, setIsShaking] = useState(false);
  
  // Detective State
  const [detectiveIdx, setDetectiveIdx] = useState(0);
  const [detectiveFeedback, setDetectiveFeedback] = useState<boolean | null>(null);

  // Diagnostic State
  const [diagnosticIdx, setDiagnosticIdx] = useState(0);
  const [diagPhase, setDiagPhase] = useState<DiagnosticPhase>('LISTEN');
  const [diagFeedback, setDiagFeedback] = useState<boolean | null>(null);

  const inputRef = useRef<HTMLInputElement>(null);

  const currentPracticeList = isBonusMode ? module.extraWords : module.practiceWords;
  const currentPracticeWord = currentPracticeList[practiceIdx];
  const currentDetective = module.detectiveChallenges[detectiveIdx];
  const currentDiagnosticWord = module.diagnosticTest[diagnosticIdx];

  // Timer Effect
  useEffect(() => {
    let interval: number;
    if (isTimerRunning) {
      interval = window.setInterval(() => {
        setSeconds(s => s + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning]);

  // Global keydown for 'Enter' - Strictly validated
  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        if (activeStep === 'PRESENTATION') {
          handleStartPractice();
        } else if (activeStep === 'PRACTICE') {
          if (phase === 'WATCH') handleCover();
          else if (phase === 'RESULT') {
            if (practiceFeedback === true) handleNextPractice();
            else handleRetryPractice(); // Force retry if wrong
          }
        } else if (activeStep === 'DETECTIVE') {
          if (detectiveFeedback === true) handleNextDetective();
          else if (detectiveFeedback === false) setDetectiveFeedback(null);
        } else if (activeStep === 'DIAGNOSTIC') {
          if (diagPhase === 'LISTEN') handleDiagnosticListen();
          else if (diagPhase === 'RESULT') {
            if (diagFeedback === true) handleNextDiagnostic();
            else handleRetryDiagnostic(); // Force retry if wrong
          }
        }
      }
    };
    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  }, [activeStep, phase, practiceFeedback, detectiveFeedback, diagPhase, diagFeedback, isBonusMode]);

  useEffect(() => {
    if ((phase === 'TYPE' || diagPhase === 'TYPE') && inputRef.current) {
      inputRef.current.focus();
    }
  }, [phase, diagPhase]);

  const triggerShake = () => {
    setIsShaking(true);
    setTimeout(() => setIsShaking(false), 500);
  };

  const handleStartPractice = () => {
    setActiveStep('PRACTICE');
    setPhase('WATCH');
    setIsTimerRunning(true);
  };

  const handleCover = () => {
    setPhase('TYPE');
    setUserInput('');
  };

  const handleCheckPractice = () => {
    if (userInput.trim() === '') return;
    const isCorrect = userInput.trim().toLowerCase() === currentPracticeWord.toLowerCase();
    setPracticeFeedback(isCorrect);
    setPhase('RESULT');
    if (isCorrect) {
      speakWord(currentPracticeWord);
    } else {
      triggerShake();
    }
  };

  const handleRetryPractice = () => {
    setPhase('WATCH');
    setPracticeFeedback(null);
    setUserInput('');
  };

  const handleNextPractice = () => {
    if (practiceIdx < currentPracticeList.length - 1) {
      setPracticeIdx(prev => prev + 1);
      setPhase('WATCH');
      setPracticeFeedback(null);
    } else {
      if (!isBonusMode && module.extraWords.length > 0) {
        setIsBonusMode(true);
        setPracticeIdx(0);
        setPhase('WATCH');
        setPracticeFeedback(null);
      } else {
        setActiveStep('DETECTIVE');
      }
    }
  };

  const skipBonus = () => {
    setActiveStep('DETECTIVE');
  };

  const handleDetectiveOption = (opt: string) => {
    if (detectiveFeedback !== null) return;
    const isCorrect = opt === currentDetective.correctWord;
    setDetectiveFeedback(isCorrect);
    if (isCorrect) speakWord(currentDetective.correctWord);
    else triggerShake();
  };

  const handleNextDetective = () => {
    if (detectiveIdx < module.detectiveChallenges.length - 1) {
      setDetectiveIdx(prev => prev + 1);
      setDetectiveFeedback(null);
    } else {
      setActiveStep('DIAGNOSTIC');
      setDiagPhase('LISTEN');
    }
  };

  const handleDiagnosticListen = () => {
    speakWord(currentDiagnosticWord);
    setDiagPhase('TYPE');
    setUserInput('');
  };

  const handleCheckDiagnostic = () => {
    if (userInput.trim() === '') return;
    const isCorrect = userInput.trim().toLowerCase() === currentDiagnosticWord.toLowerCase();
    setDiagFeedback(isCorrect);
    setDiagPhase('RESULT');
    if (!isCorrect) triggerShake();
  };

  const handleRetryDiagnostic = () => {
    setDiagPhase('LISTEN');
    setDiagFeedback(null);
    setUserInput('');
  };

  const handleNextDiagnostic = () => {
    if (diagnosticIdx < module.diagnosticTest.length - 1) {
      setDiagnosticIdx(prev => prev + 1);
      setDiagPhase('LISTEN');
      setDiagFeedback(null);
    } else {
      setIsTimerRunning(false);
      setActiveStep('FINISHED');
    }
  };

  const formatTime = (totalSeconds: number) => {
    const m = Math.floor(totalSeconds / 60);
    const s = totalSeconds % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  const renderVowelConsonant = (text: string) => {
    const vowels = 'aeiouyåäöAEIOUYÅÄÖ';
    return text.split('').map((char, i) => (
      <span key={i} className={vowels.includes(char) ? 'text-red-500' : 'text-blue-500'}>
        {char}
      </span>
    ));
  };

  const renderProgress = (current: number, total: number) => (
    <div className="flex items-center gap-1">
      {Array.from({ length: total }).map((_, i) => (
        <div 
          key={i} 
          className={`h-1.5 rounded-full transition-all ${i < current ? 'bg-emerald-500 w-4' : i === current ? 'bg-white w-8' : 'bg-white/10 w-2'}`}
        />
      ))}
    </div>
  );

  return (
    <div className={`max-w-4xl mx-auto p-4 md:p-8 animate-in fade-in duration-700 ${isShaking ? 'animate-shake' : ''}`}>
      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20%, 60% { transform: translateX(-10px); }
          40%, 80% { transform: translateX(10px); }
        }
        .animate-shake {
          animation: shake 0.5s cubic-bezier(.36,.07,.19,.97) both;
        }
      `}</style>

      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <button onClick={onExit} className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
          <ArrowLeft className="w-5 h-5" /> Avbryt
        </button>
        <div className="flex items-center gap-4">
          {isTimerRunning && (
            <div className="flex items-center gap-2 bg-slate-800 px-4 py-2 rounded-xl text-amber-400 font-mono font-bold border border-amber-400/20">
              <Timer className="w-4 h-4" /> {formatTime(seconds)}
            </div>
          )}
          <div className="bg-slate-800 px-6 py-2 rounded-full text-sm font-bold text-slate-300 border border-white/5">
            VECKA {module.week} • {module.title.toUpperCase()}
          </div>
        </div>
      </div>

      <div className="bg-slate-900 border border-white/10 rounded-[2.5rem] p-8 md:p-12 shadow-2xl relative overflow-hidden">
        
        {/* Step 1: Presentation */}
        {activeStep === 'PRESENTATION' && (
          <div className="animate-in slide-in-from-bottom-4">
            <div className="flex items-center gap-3 mb-6 text-emerald-400">
              <Sparkles className="w-8 h-8" />
              <h1 className="text-3xl font-black">Veckans mönster</h1>
            </div>
            <p className="text-xl text-slate-300 mb-12 leading-relaxed">
              {module.description}
            </p>
            
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              {module.presentationWords.map((pw, i) => (
                <div key={i} className="bg-white/5 border border-white/10 p-8 rounded-3xl text-center hover:bg-white/10 transition-colors">
                  <span className="text-4xl font-black block mb-4 tracking-tight">
                    {renderVowelConsonant(pw.word)}
                  </span>
                  <p className="text-slate-400 text-sm italic">{pw.explanation || 'Se mönstret'}</p>
                </div>
              ))}
            </div>

            <button onClick={handleStartPractice} className="group w-full py-6 bg-emerald-600 hover:bg-emerald-500 text-white rounded-3xl font-black text-2xl transition-all flex items-center justify-center gap-3 shadow-lg shadow-emerald-900/20">
              Börja träna <ArrowRight className="w-8 h-8 group-hover:translate-x-2 transition-transform" />
            </button>
          </div>
        )}

        {/* Step 2: Practice */}
        {activeStep === 'PRACTICE' && (
          <div className="animate-in fade-in duration-300">
            <div className="flex justify-between items-center mb-12">
              <div className="flex flex-col gap-2">
                <span className="text-slate-500 font-bold tracking-widest uppercase text-xs">
                  {isBonusMode ? 'EXTRA' : 'BAS'} • Ord {practiceIdx + 1} av {currentPracticeList.length}
                </span>
                {renderProgress(practiceIdx, currentPracticeList.length)}
              </div>
              <div className="flex items-center gap-4">
                {isBonusMode && (
                  <button onClick={skipBonus} className="text-xs font-bold text-slate-500 hover:text-white underline">Hoppa över extra</button>
                )}
                <div className={`flex items-center gap-2 font-bold px-4 py-2 rounded-xl ${isBonusMode ? 'bg-amber-500/10 text-amber-400' : 'bg-emerald-500/10 text-emerald-400'}`}>
                  {isBonusMode ? <Trophy className="w-5 h-5" /> : <PenTool className="w-5 h-5" />}
                  {isBonusMode ? 'Extraträning' : 'Titta-Täcka-Skriva'}
                </div>
              </div>
            </div>

            <div className="min-h-[350px] flex flex-col items-center justify-center text-center">
              {phase === 'WATCH' && (
                <div className="animate-in zoom-in-95">
                  <h2 className="text-8xl font-black mb-12 tracking-tight">
                    {renderVowelConsonant(currentPracticeWord)}
                  </h2>
                  <button onClick={handleCover} className="px-12 py-6 bg-white text-slate-900 rounded-3xl font-black text-xl hover:bg-slate-200 transition-all flex items-center gap-3 mx-auto">
                    <EyeOff className="w-6 h-6" /> Täcka över
                  </button>
                </div>
              )}

              {phase === 'TYPE' && (
                <div className="animate-in fade-in w-full max-w-md">
                  <div className="w-24 h-24 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-12">
                    <EyeOff className="w-10 h-10 text-slate-500" />
                  </div>
                  <input
                    ref={inputRef}
                    type="text"
                    autoFocus
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleCheckPractice()}
                    placeholder="Skriv ordet här..."
                    className="w-full bg-slate-800 border-2 border-white/10 rounded-3xl p-6 text-3xl font-bold text-center focus:border-emerald-500 focus:outline-none transition-all"
                  />
                  <p className="mt-4 text-slate-500 text-sm">Tryck Enter när du är klar</p>
                </div>
              )}

              {phase === 'RESULT' && (
                <div className="animate-in zoom-in-95">
                  <div className={`flex items-center justify-center gap-3 text-3xl font-black mb-8 ${practiceFeedback ? 'text-emerald-400' : 'text-red-400'}`}>
                    {practiceFeedback ? <CheckCircle className="w-10 h-10" /> : <AlertCircle className="w-10 h-10" />}
                    {practiceFeedback ? 'Snyggt! Rätt stavat.' : 'Nära! Du skrev fel.'}
                  </div>
                  
                  <div className="mb-12">
                    <h2 className="text-8xl font-black mb-4 tracking-tight">
                      {renderVowelConsonant(currentPracticeWord)}
                    </h2>
                    {!practiceFeedback && (
                      <div className="text-slate-400 bg-red-500/10 px-6 py-3 rounded-2xl inline-block border border-red-500/20">
                        Du skrev: <span className="line-through font-mono font-bold text-red-300">{userInput}</span>
                      </div>
                    )}
                  </div>

                  <button 
                    onClick={practiceFeedback ? handleNextPractice : handleRetryPractice} 
                    className={`px-12 py-6 rounded-3xl font-black text-xl transition-all flex items-center gap-3 mx-auto ${practiceFeedback ? 'bg-emerald-600 text-white hover:bg-emerald-500' : 'bg-slate-800 text-white hover:bg-slate-700'}`}
                  >
                    {practiceFeedback ? 'Nästa ord' : 'Titta igen'} <ArrowRight className="w-6 h-6" />
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Step 3: Detective */}
        {activeStep === 'DETECTIVE' && (
          <div className="animate-in fade-in duration-300">
            <div className="flex justify-between items-center mb-8">
              <div className="flex items-center gap-3 text-amber-400">
                <Search className="w-8 h-8" />
                <h2 className="text-3xl font-black">Mönster-detektiven</h2>
              </div>
              <div className="flex flex-col gap-2 items-end">
                <span className="text-slate-500 font-bold tracking-widest uppercase text-xs">Utmaning {detectiveIdx + 1} av {module.detectiveChallenges.length}</span>
                {renderProgress(detectiveIdx, module.detectiveChallenges.length)}
              </div>
            </div>
            
            <div className="bg-white/5 p-12 rounded-[2rem] text-center border border-white/5 mb-12">
              <p className="text-3xl font-medium leading-relaxed mb-12 text-slate-200">
                "{currentDetective.sentence.split('___').map((part, i) => (
                  <React.Fragment key={i}>
                    {part}
                    {i === 0 && <span className="text-amber-400 border-b-4 border-amber-400/30 px-4 inline-block min-w-[80px]">?</span>}
                  </React.Fragment>
                ))}"
              </p>
              
              <div className="grid grid-cols-2 gap-6">
                {currentDetective.options.map((opt) => (
                  <button
                    key={opt}
                    onClick={() => handleDetectiveOption(opt)}
                    className={`p-8 rounded-3xl text-3xl font-bold border-2 transition-all ${detectiveFeedback !== null ? (opt === currentDetective.correctWord ? 'bg-emerald-600 border-emerald-400' : (opt === userInput ? 'bg-red-600 border-red-400' : 'opacity-50 border-white/5')) : 'bg-slate-800 border-white/10 hover:border-amber-400 active:scale-95'}`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            {detectiveFeedback !== null && (
              <div className={`p-8 rounded-3xl animate-in slide-in-from-bottom-4 flex items-center justify-between ${detectiveFeedback ? 'bg-emerald-950/30 border border-emerald-500/30' : 'bg-red-950/30 border border-red-500/30'}`}>
                <div className="flex items-center gap-4">
                  {detectiveFeedback ? <CheckCircle className="w-8 h-8 text-emerald-400" /> : <AlertCircle className="w-8 h-8 text-red-400" />}
                  <span className="text-xl font-bold">{detectiveFeedback ? 'Rätt ord på rätt plats!' : 'Inte riktigt, prova det andra ordet.'}</span>
                </div>
                <button onClick={detectiveFeedback ? handleNextDetective : () => setDetectiveFeedback(null)} className="px-8 py-4 bg-white text-slate-900 rounded-2xl font-black">
                  {detectiveFeedback ? 'Nästa' : 'Försök igen'}
                </button>
              </div>
            )}
          </div>
        )}

        {/* Step 4: Diagnostic */}
        {activeStep === 'DIAGNOSTIC' && (
          <div className="animate-in fade-in duration-300">
             <div className="flex justify-between items-center mb-12">
              <div className="flex items-center gap-3 text-purple-400">
                <Activity className="w-8 h-8" />
                <h2 className="text-3xl font-black">Slutprov</h2>
              </div>
              <div className="flex flex-col gap-2 items-end">
                <span className="text-slate-500 font-bold tracking-widest uppercase text-xs">Ord {diagnosticIdx + 1} av {module.diagnosticTest.length}</span>
                {renderProgress(diagnosticIdx, module.diagnosticTest.length)}
              </div>
            </div>

            <div className="min-h-[300px] flex flex-col items-center justify-center text-center">
              {diagPhase === 'LISTEN' && (
                <div className="animate-in zoom-in-95">
                  <div className="w-32 h-32 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-12 border-4 border-purple-500/30 animate-pulse">
                    <Volume2 className="w-12 h-12 text-purple-400" />
                  </div>
                  <h3 className="text-2xl font-bold mb-8">Lyssna noga på ordet</h3>
                  <button onClick={handleDiagnosticListen} className="px-12 py-6 bg-purple-600 text-white rounded-3xl font-black text-xl hover:bg-purple-500 transition-all flex items-center gap-3">
                    Lyssna och skriv
                  </button>
                </div>
              )}

              {diagPhase === 'TYPE' && (
                <div className="animate-in fade-in w-full max-w-md">
                   <button onClick={() => speakWord(currentDiagnosticWord)} className="w-20 h-20 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-12 hover:bg-white/10 transition-colors">
                    <Volume2 className="w-8 h-8 text-purple-400" />
                  </button>
                  <input
                    ref={inputRef}
                    type="text"
                    autoFocus
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleCheckDiagnostic()}
                    placeholder="Vad sa rösten?"
                    className="w-full bg-slate-800 border-2 border-white/10 rounded-3xl p-6 text-3xl font-bold text-center focus:border-purple-500 focus:outline-none transition-all"
                  />
                  <p className="mt-4 text-slate-500 text-sm">Tryck Enter när du är klar</p>
                </div>
              )}

              {diagPhase === 'RESULT' && (
                <div className="animate-in zoom-in-95">
                   <div className={`flex items-center justify-center gap-3 text-3xl font-black mb-8 ${diagFeedback ? 'text-emerald-400' : 'text-red-400'}`}>
                    {diagFeedback ? <CheckCircle className="w-10 h-10" /> : <AlertCircle className="w-10 h-10" />}
                    {diagFeedback ? 'Perfekt!' : 'Det blev ett fel.'}
                  </div>
                  
                  <h2 className="text-8xl font-black mb-8 tracking-tight">
                    {renderVowelConsonant(currentDiagnosticWord)}
                  </h2>
                  
                  {!diagFeedback && (
                    <div className="mb-8 text-slate-400 bg-red-500/10 px-6 py-3 rounded-2xl inline-block border border-red-500/20">
                      Du skrev: <span className="line-through font-mono font-bold text-red-300">{userInput}</span>
                    </div>
                  )}

                  <button onClick={diagFeedback ? handleNextDiagnostic : handleRetryDiagnostic} className={`px-12 py-6 rounded-3xl font-black text-xl transition-all flex items-center gap-3 mx-auto ${diagFeedback ? 'bg-emerald-600 text-white' : 'bg-slate-800 text-white'}`}>
                    {diagFeedback ? 'Nästa ord' : 'Lyssna igen'} <ArrowRight className="w-6 h-6" />
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Final Screen */}
        {activeStep === 'FINISHED' && (
          <div className="animate-in zoom-in-95 text-center">
            <div className="inline-flex p-6 bg-emerald-500/20 rounded-full mb-8 text-emerald-400">
              <Trophy className="w-16 h-16" />
            </div>
            <h1 className="text-5xl font-black mb-4">Expeditionen klar!</h1>
            <p className="text-2xl text-slate-400 mb-12">Snyggt jobbat, du har bemästrat veckans mönster.</p>
            
            <div className="grid md:grid-cols-2 gap-6 max-w-xl mx-auto mb-12">
              <div className="bg-slate-800 p-8 rounded-3xl border border-white/5">
                <span className="text-slate-500 text-sm font-bold uppercase block mb-2 tracking-widest">Din Tid</span>
                <span className="text-5xl font-black text-white">{formatTime(seconds)}</span>
              </div>
              <div className="bg-slate-800 p-8 rounded-3xl border border-white/5 relative overflow-hidden">
                <span className="text-slate-500 text-sm font-bold uppercase block mb-2 tracking-widest">Bästa Tid</span>
                <span className="text-5xl font-black text-emerald-400">
                  {bestTime && seconds < bestTime ? (
                    <span className="flex items-center justify-center gap-2 animate-bounce">
                      <Sparkles className="w-8 h-8" /> PB!
                    </span>
                  ) : (
                    formatTime(bestTime || seconds)
                  )}
                </span>
                {bestTime && seconds < bestTime && (
                   <div className="absolute top-0 right-0 p-2 text-[10px] font-black bg-emerald-500 text-slate-900 rotate-45 translate-x-4 translate-y-2 uppercase">Nytt!</div>
                )}
              </div>
            </div>

            <button 
              onClick={() => onComplete(seconds)} 
              className="px-16 py-6 bg-emerald-600 hover:bg-emerald-500 text-white rounded-3xl font-black text-2xl transition-all shadow-xl shadow-emerald-900/20 active:scale-95"
            >
              Tillbaka till menyn
            </button>
          </div>
        )}

      </div>
    </div>
  );
};

export default SpellingModuleView;
