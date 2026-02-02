
import React, { useState, useEffect } from 'react';
import { MODULES } from './constants';
import SpellingModuleView from './components/SpellingModule';
import { Calendar, CheckCircle, ChevronRight, Layout, Trophy, Clock } from 'lucide-react';
import { ModuleCategory, UserProgress } from './types';

const App: React.FC = () => {
  const [activeModuleId, setActiveModuleId] = useState<string | null>(null);
  
  const [progress, setProgress] = useState<UserProgress>(() => {
    const saved = localStorage.getItem('spelling_app_progress');
    return saved ? JSON.parse(saved) : { completedWeeks: [], bestTimes: {} };
  });

  useEffect(() => {
    localStorage.setItem('spelling_app_progress', JSON.stringify(progress));
  }, [progress]);

  const activeModule = MODULES.find(m => m.id === activeModuleId);

  const handleComplete = (week: number, time: number) => {
    const moduleId = activeModuleId!;
    const currentBest = progress.bestTimes[moduleId];
    
    setProgress(prev => ({
      completedWeeks: prev.completedWeeks.includes(week) ? prev.completedWeeks : [...prev.completedWeeks, week],
      bestTimes: {
        ...prev.bestTimes,
        [moduleId]: currentBest ? Math.min(currentBest, time) : time
      }
    }));
    
    setActiveModuleId(null);
    // @ts-ignore
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  const formatTime = (totalSeconds: number) => {
    const m = Math.floor(totalSeconds / 60);
    const s = totalSeconds % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  const categories: ModuleCategory[] = ['Vardagsord', 'Visuella mönster', 'Ord-familjer', 'Låneord & Vanliga fel'];

  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-50 font-sans">
      {activeModuleId && activeModule ? (
        <SpellingModuleView 
          module={activeModule} 
          bestTime={progress.bestTimes[activeModule.id]}
          onExit={() => setActiveModuleId(null)}
          onComplete={(time) => handleComplete(activeModule.week, time)}
        />
      ) : (
        <div className="max-w-4xl mx-auto py-20 px-6">
          <header className="mb-20 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 text-emerald-400 rounded-full mb-6 font-bold text-sm tracking-widest uppercase">
              <Layout className="w-4 h-4" /> Mönster-maskinen
            </div>
            <h1 className="text-6xl font-black tracking-tighter mb-6">Träna din stavning</h1>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">Tävla mot dig själv och dina egna rekord. Kan du bli snabbare utan att stava fel?</p>
          </header>

          <div className="space-y-16">
            {categories.map((cat) => {
              const modules = MODULES.filter(m => m.category === cat);
              if (modules.length === 0) return null;

              return (
                <section key={cat} className="space-y-8">
                  <div className="flex items-center gap-4">
                    <div className="h-px flex-1 bg-white/10"></div>
                    <h2 className="text-lg font-black uppercase tracking-[0.2em] text-slate-500">{cat}</h2>
                    <div className="h-px flex-1 bg-white/10"></div>
                  </div>
                  
                  <div className="grid gap-4">
                    {modules.map((module) => {
                      const isCompleted = progress.completedWeeks.includes(module.week);
                      const bestTime = progress.bestTimes[module.id];
                      
                      return (
                        <button
                          key={module.id}
                          onClick={() => setActiveModuleId(module.id)}
                          className={`group relative flex items-center p-8 bg-slate-900 border-2 rounded-[2.5rem] transition-all hover:scale-[1.01] hover:shadow-2xl active:scale-[0.99] ${isCompleted ? 'border-emerald-500/30 bg-emerald-950/10' : 'border-white/5 hover:border-white/20'}`}
                        >
                          <div className={`mr-8 w-16 h-16 rounded-2xl flex items-center justify-center text-xl font-black transition-colors shrink-0 ${isCompleted ? 'bg-emerald-500 text-white' : 'bg-slate-800 text-slate-500 group-hover:bg-white group-hover:text-slate-900'}`}>
                            {module.week}
                          </div>
                          
                          <div className="text-left flex-1">
                            <div className="flex items-center gap-3 mb-1">
                              <h3 className="text-2xl font-bold tracking-tight">{module.title}</h3>
                              {isCompleted && <CheckCircle className="w-5 h-5 text-emerald-400" />}
                            </div>
                            <div className="flex items-center gap-4">
                              <p className="text-slate-400 text-sm">{module.presentationWords.map(pw => pw.word).join(', ')}...</p>
                              {bestTime && (
                                <div className="flex items-center gap-1.5 text-amber-400 text-xs font-bold uppercase tracking-wider bg-amber-400/10 px-2 py-1 rounded-md">
                                  <Clock className="w-3 h-3" /> Rekord: {formatTime(bestTime)}
                                </div>
                              )}
                            </div>
                          </div>

                          <div className="ml-4 p-4 rounded-2xl bg-slate-800 group-hover:bg-white group-hover:text-slate-900 transition-all">
                            <ChevronRight className="w-6 h-6" />
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </section>
              );
            })}
          </div>

          <footer className="mt-32 pt-12 border-t border-white/5 text-center opacity-40">
            <p className="font-bold flex items-center justify-center gap-2 text-sm">
              <Calendar className="w-5 h-5" /> Terminsprogram för mellanstadiet • Rekord och framsteg sparas lokalt
            </p>
          </footer>
        </div>
      )}
    </div>
  );
};

export default App;
