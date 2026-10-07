import React from 'react';
import { CLASSES_LIST } from '../data/mockData';
import { 
  Compass, 
  Layers, 
  School, 
  ChevronDown, 
  Bell, 
  Calendar,
  Sparkles
} from 'lucide-react';

interface HeaderProps {
  currentClass: string;
  onSelectClass: (c: string) => void;
  pendingDeliveriesCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  currentClass,
  onSelectClass,
  pendingDeliveriesCount
}) => {
  return (
    <header className="bg-slate-900/90 backdrop-blur-md border-b border-slate-800 px-4 py-3 sticky top-0 z-30 flex items-center justify-between gap-4">
      {/* Brand logo & Teacher Title */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-cyan-500 via-blue-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-cyan-500/20 text-white font-black text-xl tracking-tighter">
          T
        </div>
        <div>
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-base md:text-lg text-white tracking-tight">
              Tecno<span className="text-cyan-400">Docente</span>
            </span>
            <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-slate-800 text-cyan-300 border border-slate-700 hidden sm:inline-block">
              Tablet Pro
            </span>
          </div>
          <p className="text-[11px] text-slate-400 hidden sm:block">
            Cruscotto Didattico Disciplina Tecnologia • Secondaria di I Grado
          </p>
        </div>
      </div>

      {/* Class Selector & Quick Badges */}
      <div className="flex items-center gap-2.5">
        {/* Class Switcher (Big touch target for tablet) */}
        <div className="relative flex items-center">
          <label htmlFor="class-select" className="sr-only">Seleziona Classe</label>
          <div className="flex items-center gap-1.5 bg-slate-800 hover:bg-slate-750 border border-slate-700 rounded-xl px-3 py-1.5 text-xs text-white cursor-pointer transition-colors min-h-[40px]">
            <School className="w-4 h-4 text-cyan-400" />
            <select
              id="class-select"
              value={currentClass}
              onChange={e => onSelectClass(e.target.value)}
              className="bg-transparent text-white font-bold text-xs focus:outline-none cursor-pointer pr-1"
            >
              {CLASSES_LIST.map(c => (
                <option key={c} value={c} className="bg-slate-900 text-slate-200">
                  {c}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Notifications / Pending deliveries button */}
        <div 
          className="relative p-2 rounded-xl bg-slate-800 text-slate-300 border border-slate-700 hover:bg-slate-750 transition-colors cursor-pointer min-h-[40px] min-w-[40px] flex items-center justify-center"
          title={`${pendingDeliveriesCount} scadenze didattiche in arrivo`}
        >
          <Bell className="w-4 h-4 text-slate-300" />
          {pendingDeliveriesCount > 0 && (
            <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-rose-500 text-white font-extrabold text-[10px] flex items-center justify-center shadow">
              {pendingDeliveriesCount}
            </span>
          )}
        </div>
      </div>
    </header>
  );
};
