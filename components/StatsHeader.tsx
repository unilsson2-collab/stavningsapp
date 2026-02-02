
import React from 'react';
import { UserStats } from '../types';
import { Trophy, Flame, Zap, Map as MapIcon } from 'lucide-react';

interface StatsHeaderProps {
  stats: UserStats;
  onMapClick: () => void;
}

const StatsHeader: React.FC<StatsHeaderProps> = ({ stats, onMapClick }) => {
  return (
    <div className="bg-slate-900/80 backdrop-blur-md border-b border-white/10 p-4 flex items-center justify-between sticky top-0 z-50">
      <button 
        onClick={onMapClick}
        className="flex items-center gap-2 hover:bg-white/10 px-3 py-2 rounded-lg transition-colors"
      >
        <MapIcon className="w-5 h-5 text-blue-400" />
        <span className="font-cinzel font-bold text-lg hidden sm:block">Ordmagikerna</span>
      </button>

      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2 group">
          <Zap className="w-5 h-5 text-amber-400 group-hover:scale-110 transition-transform" />
          <div className="flex flex-col">
            <span className="text-xs text-slate-400 font-semibold uppercase">XP</span>
            <span className="font-bold leading-tight">{stats.xp}</span>
          </div>
        </div>

        <div className="flex items-center gap-2 group">
          <Flame className="w-5 h-5 text-orange-500 group-hover:scale-110 transition-transform" />
          <div className="flex flex-col">
            <span className="text-xs text-slate-400 font-semibold uppercase">Streak</span>
            <span className="font-bold leading-tight">{stats.streak} dagar</span>
          </div>
        </div>

        <div className="flex items-center gap-2 group">
          <Trophy className="w-5 h-5 text-yellow-400 group-hover:scale-110 transition-transform" />
          <div className="flex flex-col">
            <span className="text-xs text-slate-400 font-semibold uppercase">Runor</span>
            <span className="font-bold leading-tight">{stats.runes.length}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsHeader;
