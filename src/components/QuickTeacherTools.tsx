import React, { useState, useEffect } from 'react';
import { Student } from '../types';
import { 
  Timer, 
  Dice5, 
  StickyNote, 
  Maximize, 
  Minimize, 
  Play, 
  Pause, 
  RotateCcw, 
  UserCheck, 
  X,
  Volume2,
  Check
} from 'lucide-react';

interface QuickTeacherToolsProps {
  students: Student[];
  currentClass: string;
}

export const QuickTeacherTools: React.FC<QuickTeacherToolsProps> = ({ students, currentClass }) => {
  const [activeTool, setActiveTool] = useState<'timer' | 'random' | 'notes' | null>(null);

  // Timer state
  const [timerSeconds, setTimerSeconds] = useState<number>(900); // 15 min default
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);
  const [timerPreset, setTimerPreset] = useState<number>(15);

  // Random picker state
  const [pickedStudent, setPickedStudent] = useState<Student | null>(null);
  const [isPicking, setIsPicking] = useState<boolean>(false);

  // Quick notes state
  const [quickNotes, setQuickNotes] = useState<string>(() => {
    return localStorage.getItem('tecnodocente_quick_notes') || 'Ricordare alla 2ª B di portare il compasso balaustrone per la tavola sulla piramide retta.';
  });
  const [notesSaved, setNotesSaved] = useState<boolean>(false);

  // Fullscreen state
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  useEffect(() => {
    let interval: any = null;
    if (isTimerRunning && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds(sec => sec - 1);
      }, 1000);
    } else if (timerSeconds === 0 && isTimerRunning) {
      setIsTimerRunning(false);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timerSeconds]);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().then(() => setIsFullscreen(true)).catch(() => {});
    } else {
      document.exitFullscreen().then(() => setIsFullscreen(false)).catch(() => {});
    }
  };

  const handlePickRandomStudent = () => {
    if (students.length === 0) return;
    setIsPicking(true);
    setPickedStudent(null);

    let count = 0;
    const interval = setInterval(() => {
      const randIdx = Math.floor(Math.random() * students.length);
      setPickedStudent(students[randIdx]);
      count++;
      if (count > 12) {
        clearInterval(interval);
        setIsPicking(false);
      }
    }, 120);
  };

  const setTimerMinutes = (mins: number) => {
    setTimerPreset(mins);
    setIsTimerRunning(false);
    setTimerSeconds(mins * 60);
  };

  const formatTimer = (totalSec: number) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const handleSaveNotes = () => {
    localStorage.setItem('tecnodocente_quick_notes', quickNotes);
    setNotesSaved(true);
    setTimeout(() => setNotesSaved(false), 2000);
  };

  return (
    <>
      {/* Floating Toolbar on Bottom-Right / Tablet Dock */}
      <div className="fixed bottom-4 right-4 z-40 bg-slate-900/90 backdrop-blur-lg border border-slate-700/80 rounded-2xl shadow-2xl p-1.5 flex items-center gap-1.5">
        <button
          onClick={() => setActiveTool(activeTool === 'timer' ? null : 'timer')}
          className={`p-2.5 rounded-xl transition-all min-h-[44px] min-w-[44px] flex items-center justify-center ${
            activeTool === 'timer' ? 'bg-amber-500 text-slate-950 font-bold shadow' : 'text-slate-300 hover:bg-slate-800'
          }`}
          title="Timer / Cronometro per verifiche in classe"
        >
          <Timer className="w-5 h-5" />
          {isTimerRunning && (
            <span className="ml-1.5 text-xs font-mono font-bold">{formatTimer(timerSeconds)}</span>
          )}
        </button>

        <button
          onClick={() => {
            setActiveTool(activeTool === 'random' ? null : 'random');
            if (activeTool !== 'random') handlePickRandomStudent();
          }}
          className={`p-2.5 rounded-xl transition-all min-h-[44px] min-w-[44px] flex items-center justify-center ${
            activeTool === 'random' ? 'bg-cyan-500 text-slate-950 font-bold shadow' : 'text-slate-300 hover:bg-slate-800'
          }`}
          title="Estrai Studente a caso per interrogazione"
        >
          <Dice5 className="w-5 h-5" />
        </button>

        <button
          onClick={() => setActiveTool(activeTool === 'notes' ? null : 'notes')}
          className={`p-2.5 rounded-xl transition-all min-h-[44px] min-w-[44px] flex items-center justify-center ${
            activeTool === 'notes' ? 'bg-indigo-500 text-white font-bold shadow' : 'text-slate-300 hover:bg-slate-800'
          }`}
          title="Blocco note rapido docente"
        >
          <StickyNote className="w-5 h-5" />
        </button>

        <button
          onClick={toggleFullscreen}
          className="p-2.5 rounded-xl text-slate-300 hover:bg-slate-800 transition-all min-h-[44px] min-w-[44px] flex items-center justify-center"
          title="Schermo intero (LIM / Tablet)"
        >
          {isFullscreen ? <Minimize className="w-5 h-5" /> : <Maximize className="w-5 h-5" />}
        </button>
      </div>

      {/* Popover Card for Active Quick Tool */}
      {activeTool && (
        <div className="fixed bottom-20 right-4 z-50 w-80 sm:w-96 bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl p-4 text-white">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-3">
            <h4 className="font-bold text-sm text-slate-200 flex items-center gap-1.5">
              {activeTool === 'timer' && <><Timer className="w-4 h-4 text-amber-400" /> Timer per la Classe</>}
              {activeTool === 'random' && <><Dice5 className="w-4 h-4 text-cyan-400" /> Sorteggio Studente ({currentClass})</>}
              {activeTool === 'notes' && <><StickyNote className="w-4 h-4 text-indigo-400" /> Blocco Note Docente</>}
            </h4>
            <button onClick={() => setActiveTool(null)} className="text-slate-400 hover:text-white">
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* TIMER TOOL */}
          {activeTool === 'timer' && (
            <div className="flex flex-col items-center">
              <div className="text-4xl font-mono font-black my-2 tracking-wider text-amber-300">
                {formatTimer(timerSeconds)}
              </div>

              {/* Preset buttons */}
              <div className="grid grid-cols-4 gap-1.5 w-full mb-3">
                {[5, 15, 30, 45].map(m => (
                  <button
                    key={m}
                    onClick={() => setTimerMinutes(m)}
                    className={`py-1.5 rounded-lg text-xs font-bold border ${
                      timerPreset === m ? 'bg-amber-500/20 text-amber-300 border-amber-400' : 'bg-slate-800 text-slate-300 border-slate-700'
                    }`}
                  >
                    {m} min
                  </button>
                ))}
              </div>

              {/* Start / Pause / Reset */}
              <div className="flex items-center gap-2 w-full">
                <button
                  onClick={() => setIsTimerRunning(!isTimerRunning)}
                  className={`flex-1 py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 ${
                    isTimerRunning ? 'bg-rose-600 hover:bg-rose-500 text-white' : 'bg-amber-500 hover:bg-amber-400 text-slate-950'
                  }`}
                >
                  {isTimerRunning ? <><Pause className="w-4 h-4" /> Pausa</> : <><Play className="w-4 h-4" /> Avvia Timer</>}
                </button>
                <button
                  onClick={() => {
                    setIsTimerRunning(false);
                    setTimerSeconds(timerPreset * 60);
                  }}
                  className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-300 border border-slate-700 text-xs font-bold"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* RANDOM STUDENT PICKER */}
          {activeTool === 'random' && (
            <div className="text-center py-2">
              <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-750 mb-3 min-h-[72px] flex items-center justify-center">
                {pickedStudent ? (
                  <div>
                    <span className="text-xs text-cyan-400 block font-semibold mb-0.5">Studente estratto:</span>
                    <span className="text-lg font-black text-white">{pickedStudent.name}</span>
                  </div>
                ) : (
                  <span className="text-xs text-slate-400">Premi per estrarre uno studente</span>
                )}
              </div>

              <button
                disabled={isPicking || students.length === 0}
                onClick={handlePickRandomStudent}
                className="w-full py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-2"
              >
                <Dice5 className="w-4 h-4" />
                {isPicking ? 'Estrazione in corso...' : 'Estrai un altro studente'}
              </button>
            </div>
          )}

          {/* QUICK NOTES */}
          {activeTool === 'notes' && (
            <div className="space-y-2.5">
              <textarea
                rows={4}
                value={quickNotes}
                onChange={e => setQuickNotes(e.target.value)}
                placeholder="Scrivi promemoria per la lezione, consegne o annotazioni..."
                className="w-full bg-slate-800 border border-slate-700 rounded-xl p-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-400"
              />
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-slate-400">Salvataggio automatico locale</span>
                <button
                  onClick={handleSaveNotes}
                  className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold flex items-center gap-1"
                >
                  {notesSaved ? <><Check className="w-3.5 h-3.5 text-emerald-400" /> Salvato</> : 'Salva Note'}
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};
