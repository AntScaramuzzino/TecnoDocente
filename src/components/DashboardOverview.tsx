import React from 'react';
import { DidacticUnit, Student, CalendarEvent, ActiveTab } from '../types';
import { 
  Box, 
  Compass, 
  Calendar, 
  Award, 
  GraduationCap, 
  Clock, 
  ChevronRight, 
  Sparkles, 
  AlertTriangle, 
  Layers, 
  BookOpen, 
  CheckCircle2, 
  TrendingUp,
  FolderGit2
} from 'lucide-react';

interface DashboardOverviewProps {
  currentClass: string;
  units: DidacticUnit[];
  students: Student[];
  events: CalendarEvent[];
  onNavigateTab: (tab: ActiveTab) => void;
  onOpenUnitQuiz: (unitId: string) => void;
}

export const DashboardOverview: React.FC<DashboardOverviewProps> = ({
  currentClass,
  units,
  students,
  events,
  onNavigateTab,
  onOpenUnitQuiz
}) => {
  // Averages
  const averages = students.map(s => {
    if (!s.grades || s.grades.length === 0) return 0;
    return s.grades.reduce((a, b) => a + b.value, 0) / s.grades.length;
  }).filter(a => a > 0);

  const classAvg = averages.length > 0 ? (averages.reduce((a, b) => a + b, 0) / averages.length).toFixed(1) : '7.5';
  const upcomingEvents = events.slice(0, 3);

  return (
    <div className="space-y-6 overflow-y-auto max-w-7xl mx-auto w-full pb-10">
      {/* Welcome Hero Banner with Tablet Touch Optimization */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950/80 to-slate-900 border border-slate-700/80 p-6 md:p-8 shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-cyan-950 text-cyan-300 border border-cyan-800 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" /> A.S. 2026/2027 • I Quadrimestre
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-slate-800 text-slate-300 border border-slate-700">
                Classe attiva: {currentClass}
              </span>
            </div>

            <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight">
              Cruscotto Docente di <span className="bg-gradient-to-r from-cyan-400 to-indigo-400 bg-clip-text text-transparent">Tecnologia</span>
            </h1>

            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              Ambiente unificato per la gestione della didattica: proiezioni ortogonali e disegno tecnico interattivo, archivio risorse multimediali, registro valutazioni e verifiche di fine unità.
            </p>
          </div>

          {/* Quick Simulation Launch Card on Hero */}
          <div className="bg-slate-900/90 backdrop-blur-md p-4 rounded-2xl border border-slate-700/80 shadow-xl flex flex-col gap-2.5 min-w-[240px]">
            <span className="text-[11px] font-bold text-cyan-400 uppercase tracking-wider">
              Accesso Rapido Laboratori
            </span>
            <button
              onClick={() => onNavigateTab('proiezioni_disegno')}
              className="w-full py-2 px-3 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold text-xs flex items-center justify-between shadow-lg shadow-cyan-600/20 min-h-[40px]"
            >
              <div className="flex items-center gap-2">
                <Box className="w-4 h-4" />
                <span>Simulatore 3D PO</span>
              </div>
              <ChevronRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => onNavigateTab('edpuzzle')}
              className="w-full py-2 px-3 rounded-xl bg-gradient-to-r from-rose-600 to-amber-600 hover:from-rose-500 hover:to-amber-500 text-white font-bold text-xs flex items-center justify-between shadow-lg shadow-rose-600/20 min-h-[40px]"
            >
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                <span>Quiz Video EdPuzzle</span>
              </div>
              <ChevronRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => onNavigateTab('quiz')}
              className="w-full py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-750 text-amber-300 border border-slate-700 font-bold text-xs flex items-center justify-between min-h-[40px]"
            >
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4" />
                <span>Quiz Unità Didattiche</span>
              </div>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* 4 Feature Launchers / Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* Card 1: Proiezioni Ortogonali */}
        <div 
          onClick={() => onNavigateTab('proiezioni_disegno')}
          className="bg-slate-850 p-4 rounded-2xl border border-slate-750 hover:border-cyan-500/60 transition-all cursor-pointer group shadow flex flex-col justify-between"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-950 text-cyan-400 border border-cyan-800 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Box className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-cyan-900/40 text-cyan-300">
              3D & 2D
            </span>
          </div>
          <div>
            <h3 className="font-bold text-sm text-white group-hover:text-cyan-300">
              Proiezioni Ortogonali
            </h3>
            <p className="text-[11px] text-slate-400 mt-0.5 line-clamp-2">
              Diedro 3D con animazione di ribaltamento dei piani (PO, PV, PL) e norme UNI.
            </p>
          </div>
          <div className="mt-3 text-xs font-bold text-cyan-400 flex items-center gap-1">
            Apri Simulatore <ChevronRight className="w-3.5 h-3.5" />
          </div>
        </div>

        {/* Card 2: Costruzioni Geometriche */}
        <div 
          onClick={() => onNavigateTab('proiezioni_disegno')}
          className="bg-slate-850 p-4 rounded-2xl border border-slate-750 hover:border-teal-500/60 transition-all cursor-pointer group shadow flex flex-col justify-between"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-xl bg-teal-950 text-teal-400 border border-teal-800 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Compass className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-teal-900/40 text-teal-300">
              Passo-passo
            </span>
          </div>
          <div>
            <h3 className="font-bold text-sm text-white group-hover:text-teal-300">
              Disegno Tecnico
            </h3>
            <p className="text-[11px] text-slate-400 mt-0.5 line-clamp-2">
              Squadratura F4, asse di un segmento, esagono e lavagna a mano libera con squadre.
            </p>
          </div>
          <div className="mt-3 text-xs font-bold text-teal-400 flex items-center gap-1">
            Laboratorio Grafico <ChevronRight className="w-3.5 h-3.5" />
          </div>
        </div>

        {/* Card 3: Valutazioni */}
        <div 
          onClick={() => onNavigateTab('valutazione')}
          className="bg-slate-850 p-4 rounded-2xl border border-slate-750 hover:border-emerald-500/60 transition-all cursor-pointer group shadow flex flex-col justify-between"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-950 text-emerald-400 border border-emerald-800 flex items-center justify-center group-hover:scale-110 transition-transform">
              <GraduationCap className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-900/40 text-emerald-300">
              Media: {classAvg}
            </span>
          </div>
          <div>
            <h3 className="font-bold text-sm text-white group-hover:text-emerald-300">
              Registro Valutazioni
            </h3>
            <p className="text-[11px] text-slate-400 mt-0.5 line-clamp-2">
              Rubriche per tavole di disegno, verifiche teoriche e schede studente per BES/DSA.
            </p>
          </div>
          <div className="mt-3 text-xs font-bold text-emerald-400 flex items-center gap-1">
            Gestisci Voti <ChevronRight className="w-3.5 h-3.5" />
          </div>
        </div>

        {/* Card 4: Quiz Finale Unità */}
        <div 
          onClick={() => onNavigateTab('quiz')}
          className="bg-slate-850 p-4 rounded-2xl border border-slate-750 hover:border-amber-500/60 transition-all cursor-pointer group shadow flex flex-col justify-between"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-xl bg-amber-950 text-amber-400 border border-amber-800 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Award className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-900/40 text-amber-300">
              6 Unità
            </span>
          </div>
          <div>
            <h3 className="font-bold text-sm text-white group-hover:text-amber-300">
              Quiz & Verifiche
            </h3>
            <p className="text-[11px] text-slate-400 mt-0.5 line-clamp-2">
              Test finale autocorrettivo per ogni unità didattica con spiegazione e voto in decimi.
            </p>
          </div>
          <div className="mt-3 text-xs font-bold text-amber-400 flex items-center gap-1">
            Vai ai Quiz <ChevronRight className="w-3.5 h-3.5" />
          </div>
        </div>
      </div>

      {/* Main Grid: Units Progress & Calendar Upcoming Deadlines */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column (2 Cols): Active Units Progress */}
        <div className="lg:col-span-2 bg-slate-850 p-5 rounded-2xl border border-slate-750 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-bold text-base text-white flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-cyan-400" />
                Unità Didattiche nel Curricolo
              </h2>
              <p className="text-xs text-slate-400">
                Avanzamento ore didattiche e quiz finali associati
              </p>
            </div>
            <button
              onClick={() => onNavigateTab('unita_lezioni')}
              className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
            >
              Vedi tutte <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {units.slice(0, 4).map(unit => {
              const pct = Math.round((unit.completedHours / unit.durationHours) * 100);
              return (
                <div 
                  key={unit.id}
                  className="bg-slate-900 p-3.5 rounded-xl border border-slate-800 flex flex-col justify-between hover:border-slate-700 transition-all"
                >
                  <div>
                    <div className="flex items-center justify-between mb-1 text-[10px] font-bold text-slate-400">
                      <span className="text-cyan-300">{unit.gradeLevel}</span>
                      <span>{unit.completedHours}h di {unit.durationHours}h</span>
                    </div>
                    <h4 className="font-bold text-xs text-white line-clamp-1">{unit.title}</h4>
                    <p className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">{unit.subtitle}</p>
                  </div>

                  <div className="mt-3">
                    <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden mb-2">
                      <div
                        className="h-full rounded-full transition-all"
                        style={{ width: `${pct}%`, backgroundColor: unit.color }}
                      />
                    </div>
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="text-slate-400">{pct}% completata</span>
                      <button
                        onClick={() => onOpenUnitQuiz(unit.id)}
                        className="font-bold text-amber-400 hover:underline flex items-center gap-1"
                      >
                        Quiz finale <ChevronRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Upcoming Deadlines */}
        <div className="bg-slate-850 p-5 rounded-2xl border border-slate-750 space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-1">
              <h2 className="font-bold text-base text-white flex items-center gap-2">
                <Calendar className="w-4 h-4 text-sky-400" />
                Scadenze Imminenti
              </h2>
              <button
                onClick={() => onNavigateTab('calendario')}
                className="text-xs font-semibold text-sky-400 hover:text-sky-300 flex items-center gap-1"
              >
                Calendario <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
            <p className="text-xs text-slate-400 mb-3">
              Prossime consegne tavole e verifiche didattiche
            </p>

            <div className="space-y-2.5">
              {upcomingEvents.map(ev => (
                <div
                  key={ev.id}
                  className="bg-slate-900 p-3 rounded-xl border border-slate-800 flex items-start gap-3"
                >
                  <div className="w-8 h-8 rounded-lg bg-sky-950 text-sky-400 border border-sky-800 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                    {ev.date.split('-')[2]}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5 text-[10px] text-slate-400 font-semibold mb-0.5">
                      <span className="text-white font-bold bg-slate-800 px-1.5 py-0.2 rounded">
                        {ev.classId}
                      </span>
                      <span>•</span>
                      <span>{ev.date}</span>
                    </div>
                    <h4 className="font-bold text-xs text-white truncate">{ev.title}</h4>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Tip for Teacher */}
          <div className="bg-gradient-to-tr from-indigo-950/60 to-slate-900 p-3 rounded-xl border border-indigo-900/60 text-xs text-slate-300">
            <span className="font-bold text-indigo-300 block mb-0.5">Consiglio didattico tablet:</span>
            Usa lo strumento <strong className="text-white">Timer per la Classe</strong> e il <strong className="text-white">Sorteggio Studente</strong> nella barra veloce in basso a destra durante le lezioni frontali.
          </div>
        </div>
      </div>
    </div>
  );
};
