import React from 'react';
import { ActiveTab } from '../types';
import { 
  Home, 
  BookOpen, 
  Box, 
  FolderGit2, 
  GraduationCap, 
  Calendar, 
  Award,
  Compass
} from 'lucide-react';

interface NavigationProps {
  activeTab: ActiveTab;
  onChangeTab: (tab: ActiveTab) => void;
}

interface NavItem {
  id: ActiveTab;
  label: string;
  icon: React.ReactNode;
  badge?: string;
  badgeColor?: string;
}

export const Navigation: React.FC<NavigationProps> = ({ activeTab, onChangeTab }) => {
  const navItems: NavItem[] = [
    { 
      id: 'panoramica', 
      label: 'Panoramica', 
      icon: <Home className="w-4 h-4" /> 
    },
    { 
      id: 'proiezioni_disegno', 
      label: 'Simulatore PO & Disegno', 
      icon: <Box className="w-4 h-4 text-cyan-400" />,
      badge: '3D/2D',
      badgeColor: 'bg-cyan-950 text-cyan-300 border-cyan-800'
    },
    { 
      id: 'unita_lezioni', 
      label: 'Unità & Lezioni', 
      icon: <BookOpen className="w-4 h-4 text-blue-400" /> 
    },
    { 
      id: 'quiz', 
      label: 'Quiz Finale Unità', 
      icon: <Award className="w-4 h-4 text-amber-400" />,
      badge: 'Test',
      badgeColor: 'bg-amber-950 text-amber-300 border-amber-800'
    },
    { 
      id: 'risorse', 
      label: 'Libreria Risorse', 
      icon: <FolderGit2 className="w-4 h-4 text-purple-400" /> 
    },
    { 
      id: 'valutazione', 
      label: 'Valutazione & Voti', 
      icon: <GraduationCap className="w-4 h-4 text-emerald-400" /> 
    },
    { 
      id: 'calendario', 
      label: 'Calendario Scadenze', 
      icon: <Calendar className="w-4 h-4 text-sky-400" /> 
    },
  ];

  return (
    <nav className="bg-slate-900 border-b border-slate-800 px-3 py-2 overflow-x-auto no-scrollbar">
      <div className="flex items-center gap-1.5 min-w-max mx-auto max-w-7xl">
        {navItems.map(item => {
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => onChangeTab(item.id)}
              className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs md:text-sm font-semibold transition-all duration-150 min-h-[44px] touch-manipulation select-none border ${
                isActive
                  ? 'bg-slate-800 text-white border-cyan-500/80 shadow-md shadow-cyan-500/10 scale-[1.02] font-bold'
                  : 'bg-slate-900 hover:bg-slate-800/60 text-slate-400 border-transparent hover:text-slate-200'
              }`}
            >
              <span className="shrink-0">{item.icon}</span>
              <span>{item.label}</span>
              {item.badge && (
                <span className={`text-[10px] px-1.5 py-0.2 rounded font-bold border ml-0.5 ${item.badgeColor || 'bg-slate-800 text-slate-300'}`}>
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
