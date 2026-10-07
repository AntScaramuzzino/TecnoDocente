import React, { useState } from 'react';
import { DidacticUnit, LessonPlan, SubjectArea, GradeLevel } from '../../types';
import { 
  BookOpen, 
  Plus, 
  Calendar, 
  Clock, 
  CheckCircle2, 
  ChevronRight, 
  FileText, 
  Search, 
  Layers, 
  Printer, 
  Award,
  Box,
  Compass,
  X,
  Sparkles
} from 'lucide-react';

interface LessonPlannerProps {
  units: DidacticUnit[];
  lessonPlans: LessonPlan[];
  onOpenUnitQuiz: (unitId: string) => void;
  onOpenSimulator: () => void;
  onAddUnit: (unit: DidacticUnit) => void;
  onAddLessonPlan: (lesson: LessonPlan) => void;
}

export const LessonPlanner: React.FC<LessonPlannerProps> = ({
  units,
  lessonPlans,
  onOpenUnitQuiz,
  onOpenSimulator,
  onAddUnit,
  onAddLessonPlan
}) => {
  const [selectedUnit, setSelectedUnit] = useState<DidacticUnit | null>(units[2] || units[0]); // Default to PO unit
  const [selectedLesson, setSelectedLesson] = useState<LessonPlan | null>(lessonPlans[0] || null);
  const [showNewUnitModal, setShowNewUnitModal] = useState<boolean>(false);
  const [showNewLessonModal, setShowNewLessonModal] = useState<boolean>(false);
  const [gradeFilter, setGradeFilter] = useState<string>('Tutte le classi');

  // Form states for New Unit
  const [newUnitTitle, setNewUnitTitle] = useState('');
  const [newUnitSubtitle, setNewUnitSubtitle] = useState('');
  const [newUnitGrade, setNewUnitGrade] = useState<GradeLevel>('2ª Media');
  const [newUnitArea, setNewUnitArea] = useState<SubjectArea>('Disegno Tecnico');
  const [newUnitHours, setNewUnitHours] = useState<number>(16);
  const [newUnitDesc, setNewUnitDesc] = useState('');

  // Form states for New Lesson Plan
  const [newLessonTitle, setNewLessonTitle] = useState('');
  const [newLessonMinutes, setNewLessonMinutes] = useState<number>(60);
  const [newLessonPlate, setNewLessonPlate] = useState('');
  const [newLessonHomework, setNewLessonHomework] = useState('');

  const filteredUnits = units.filter(u => {
    if (gradeFilter !== 'Tutte le classi' && u.gradeLevel !== gradeFilter) return false;
    return true;
  });

  const handleCreateUnit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUnitTitle.trim()) return;

    const newU: DidacticUnit = {
      id: `u-${Date.now()}`,
      title: newUnitTitle.trim(),
      subtitle: newUnitSubtitle.trim() || 'Unità didattica di Tecnologia',
      gradeLevel: newUnitGrade,
      area: newUnitArea,
      durationHours: newUnitHours,
      completedHours: 0,
      objectives: ['Comprendere i concetti cardine dell\'argomento', 'Sviluppare competenze pratiche'],
      competencies: ['Risoluzione di problemi tecnologici reali'],
      lessonsCount: 1,
      description: newUnitDesc.trim() || 'Descrizione dell\'unità didattica.',
      tags: [newUnitArea.split(' ')[0]],
      color: '#0284c7',
      quizId: `quiz-${Date.now()}`,
      resourcesCount: 2
    };

    onAddUnit(newU);
    setSelectedUnit(newU);
    setShowNewUnitModal(false);
    setNewUnitTitle('');
    setNewUnitSubtitle('');
    setNewUnitDesc('');
  };

  const handleCreateLesson = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLessonTitle.trim() || !selectedUnit) return;

    const newLP: LessonPlan = {
      id: `lp-${Date.now()}`,
      unitId: selectedUnit.id,
      unitTitle: selectedUnit.title,
      title: newLessonTitle.trim(),
      gradeLevel: selectedUnit.gradeLevel,
      durationMinutes: newLessonMinutes,
      date: new Date().toISOString().split('T')[0],
      phases: [
        { name: 'Aggancio & Problematizzazione', durationMin: 10, activity: 'Discussione iniziale con la classe', method: 'Lezione frontale' },
        { name: 'Spiegazione e dimostrazione LIM', durationMin: 25, activity: 'Presentazione contenuti con supporto multimediale', method: 'LIM / Multimediale' },
        { name: 'Laboratorio e applicazione pratica', durationMin: 20, activity: 'Esercitazione su quaderno o tavola da disegno', method: 'Laboratorio' },
        { name: 'Chiusura e restituzione', durationMin: 5, activity: 'Verifica rapida dei punti chiave', method: 'Verifica formativa' }
      ],
      materialsNeeded: ['Libro di testo', 'Squadre da disegno', 'Matite 2H e HB'],
      drawingPlateNumber: newLessonPlate.trim(),
      homework: newLessonHomework.trim(),
      notes: 'Adattamento per studenti BES/DSA con schede sintetiche.'
    };

    onAddLessonPlan(newLP);
    setSelectedLesson(newLP);
    setShowNewLessonModal(false);
    setNewLessonTitle('');
    setNewLessonPlate('');
    setNewLessonHomework('');
  };

  return (
    <div className="flex flex-col h-full bg-slate-900 text-slate-100 rounded-2xl overflow-hidden border border-slate-800 shadow-xl">
      {/* Top Header */}
      <div className="bg-slate-800/90 backdrop-blur-md px-4 py-3.5 border-b border-slate-700/80 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-cyan-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
            <BookOpen className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-bold text-lg text-white">Unità Didattiche & Piani di Lezione</h2>
              <span className="text-xs px-2 py-0.5 rounded-full bg-blue-950 text-blue-300 border border-blue-800">
                Curricolo Ministeriale
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Progettazione didattica, articolazione delle lezioni per fasi e raccordo con verifiche e tavole grafiche
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowNewUnitModal(true)}
            className="px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold flex items-center gap-1.5 min-h-[40px] shadow-lg shadow-blue-600/20"
          >
            <Plus className="w-4 h-4" />
            Nuova Unità
          </button>
        </div>
      </div>

      {/* Main Workspace (Split View optimized for Tablet Landscape) */}
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
        {/* Left Column: Units Grid / List */}
        <div className="w-full md:w-80 lg:w-96 bg-slate-850 border-r border-slate-800 flex flex-col overflow-hidden">
          {/* Filter Pills */}
          <div className="p-3 border-b border-slate-800 flex items-center gap-1.5 overflow-x-auto">
            {['Tutte le classi', '1ª Media', '2ª Media', '3ª Media'].map(g => (
              <button
                key={g}
                onClick={() => setGradeFilter(g)}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-all border ${
                  gradeFilter === g
                    ? 'bg-blue-600 text-white border-blue-500'
                    : 'bg-slate-800 text-slate-400 border-slate-700/80 hover:text-white'
                }`}
              >
                {g}
              </button>
            ))}
          </div>

          {/* Units list */}
          <div className="flex-1 overflow-y-auto p-3 space-y-2.5">
            {filteredUnits.map(unit => {
              const isSelected = selectedUnit?.id === unit.id;
              const percent = Math.round((unit.completedHours / unit.durationHours) * 100);

              return (
                <div
                  key={unit.id}
                  onClick={() => setSelectedUnit(unit)}
                  className={`p-3.5 rounded-2xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-slate-800 text-white border-blue-500 shadow-md scale-[1.01]'
                      : 'bg-slate-900/80 text-slate-300 border-slate-800 hover:border-slate-700 hover:bg-slate-800/40'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider bg-slate-800 text-cyan-300 border border-slate-700">
                      {unit.gradeLevel}
                    </span>
                    <span className="text-[11px] font-semibold text-slate-400">
                      {unit.completedHours}h / {unit.durationHours}h
                    </span>
                  </div>

                  <h3 className="font-bold text-sm text-white leading-snug">
                    {unit.title}
                  </h3>
                  <p className="text-[11px] text-slate-400 mt-1 line-clamp-1">
                    {unit.subtitle}
                  </p>

                  {/* Progress bar */}
                  <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden mt-3">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{ width: `${percent}%`, backgroundColor: unit.color }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Selected Unit Details & Lesson Plans */}
        <div className="flex-1 bg-slate-900 overflow-y-auto p-4 md:p-6 space-y-6">
          {selectedUnit ? (
            <>
              {/* Unit Hero Card */}
              <div className="bg-slate-850 p-5 rounded-2xl border border-slate-750 space-y-4">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1.5 text-xs">
                      <span className="px-2.5 py-0.5 rounded-full font-bold bg-blue-950 text-blue-300 border border-blue-800">
                        {selectedUnit.gradeLevel}
                      </span>
                      <span className="text-slate-400">•</span>
                      <span className="text-slate-300 font-semibold">{selectedUnit.area}</span>
                      <span className="text-slate-400">•</span>
                      <span className="text-slate-400">{selectedUnit.durationHours} Ore Ministeriali</span>
                    </div>
                    <h2 className="text-xl md:text-2xl font-extrabold text-white">
                      {selectedUnit.title}
                    </h2>
                    <p className="text-xs text-slate-300 mt-1">
                      {selectedUnit.subtitle}
                    </p>
                  </div>

                  {/* Quick Action Buttons for the Unit */}
                  <div className="flex items-center gap-2">
                    {selectedUnit.area === 'Proiezioni Ortogonali' && (
                      <button
                        onClick={onOpenSimulator}
                        className="px-3 py-2 rounded-xl bg-cyan-950 text-cyan-300 border border-cyan-800 hover:bg-cyan-900/40 text-xs font-bold flex items-center gap-1.5 min-h-[40px]"
                      >
                        <Box className="w-4 h-4" />
                        Simulatore 3D PO
                      </button>
                    )}

                    <button
                      onClick={() => onOpenUnitQuiz(selectedUnit.id)}
                      className="px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold flex items-center gap-1.5 min-h-[40px] shadow-lg shadow-amber-500/20"
                    >
                      <Award className="w-4 h-4" />
                      Avvia Quiz Finale
                    </button>
                  </div>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed pt-2 border-t border-slate-800">
                  {selectedUnit.description}
                </p>

                {/* Objectives and Competencies */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                  <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800">
                    <h4 className="text-[11px] font-bold uppercase tracking-wider text-cyan-400 mb-2">
                      Obiettivi di Apprendimento
                    </h4>
                    <ul className="space-y-1.5 text-xs text-slate-300">
                      {selectedUnit.objectives.map((obj, i) => (
                        <li key={i} className="flex items-start gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                          <span>{obj}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800">
                    <h4 className="text-[11px] font-bold uppercase tracking-wider text-emerald-400 mb-2">
                      Traguardi per le Competenze
                    </h4>
                    <ul className="space-y-1.5 text-xs text-slate-300">
                      {selectedUnit.competencies.map((comp, i) => (
                        <li key={i} className="flex items-start gap-1.5">
                          <Sparkles className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                          <span>{comp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Lesson Plans for this Unit */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-base text-white">
                      Piani di Lezione e Attività Didattiche
                    </h3>
                    <p className="text-xs text-slate-400">
                      Scansione temporale della lezione (frontale, laboratoriale, verifica)
                    </p>
                  </div>
                  <button
                    onClick={() => setShowNewLessonModal(true)}
                    className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-blue-400 border border-slate-700 text-xs font-bold flex items-center gap-1 min-h-[38px]"
                  >
                    <Plus className="w-3.5 h-3.5" /> Nuova Lezione
                  </button>
                </div>

                {lessonPlans
                  .filter(lp => lp.unitId === selectedUnit.id)
                  .map(plan => (
                    <div
                      key={plan.id}
                      className="bg-slate-850 p-4 rounded-2xl border border-slate-750 space-y-3"
                    >
                      <div className="flex flex-wrap items-start justify-between gap-2">
                        <div>
                          <div className="flex items-center gap-2 text-xs text-slate-400 mb-1">
                            <span className="flex items-center gap-1 text-slate-300">
                              <Calendar className="w-3 h-3 text-blue-400" /> {plan.date}
                            </span>
                            <span>•</span>
                            <span className="flex items-center gap-1 text-slate-300">
                              <Clock className="w-3 h-3 text-cyan-400" /> {plan.durationMinutes} min
                            </span>
                            {plan.drawingPlateNumber && (
                              <>
                                <span>•</span>
                                <span className="text-amber-300 font-bold bg-amber-950/60 px-2 py-0.5 rounded border border-amber-900/60">
                                  {plan.drawingPlateNumber}
                                </span>
                              </>
                            )}
                          </div>
                          <h4 className="font-bold text-base text-white">
                            {plan.title}
                          </h4>
                        </div>

                        <button
                          onClick={() => window.print()}
                          className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-750 text-slate-300 border border-slate-700 text-xs flex items-center gap-1"
                          title="Stampa piano lezione"
                        >
                          <Printer className="w-3.5 h-3.5" /> Stampa
                        </button>
                      </div>

                      {/* 4 Phases Timeline */}
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-2 pt-2 border-t border-slate-800">
                        {plan.phases.map((ph, idx) => (
                          <div key={idx} className="bg-slate-900/90 p-2.5 rounded-xl border border-slate-800">
                            <div className="flex items-center justify-between text-[10px] font-bold text-slate-400 mb-1">
                              <span>FASE {idx + 1}</span>
                              <span className="text-blue-400">{ph.durationMin} min</span>
                            </div>
                            <div className="font-bold text-xs text-slate-200 mb-1">
                              {ph.name}
                            </div>
                            <p className="text-[11px] text-slate-400 leading-snug">
                              {ph.activity}
                            </p>
                            <span className="inline-block mt-2 text-[9px] font-semibold px-1.5 py-0.5 rounded bg-slate-800 text-cyan-300">
                              {ph.method}
                            </span>
                          </div>
                        ))}
                      </div>

                      {/* Homework & Materials */}
                      <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 text-xs">
                        <div className="text-slate-300">
                          <strong className="text-slate-400">Compito a casa: </strong>
                          {plan.homework || 'Nessun compito assegnato'}
                        </div>
                        <div className="text-slate-400 text-[11px]">
                          <strong>Materiali: </strong> {plan.materialsNeeded.join(', ')}
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </>
          ) : (
            <div className="text-center py-20 text-slate-500">
              Seleziona un'unità didattica per visualizzarne i dettagli e i piani di lezione.
            </div>
          )}
        </div>
      </div>

      {/* New Unit Modal */}
      {showNewUnitModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-lg w-full p-6 shadow-2xl overflow-y-auto max-h-[90vh]">
            <h3 className="font-bold text-lg text-white mb-1">Crea Nuova Unità Didattica</h3>
            <p className="text-xs text-slate-400 mb-4">
              Imposta obiettivi, durata oraria e contenuti ministeriali per la nuova unità.
            </p>

            <form onSubmit={handleCreateUnit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Titolo Unità</label>
                <input
                  type="text"
                  required
                  value={newUnitTitle}
                  onChange={e => setNewUnitTitle(e.target.value)}
                  placeholder="Es. Le Telecomunicazioni e la Rete Internet"
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Sottotitolo / Argomenti Chiave</label>
                <input
                  type="text"
                  value={newUnitSubtitle}
                  onChange={e => setNewUnitSubtitle(e.target.value)}
                  placeholder="Es. Dalla trasmissione dei segnali alle fake news"
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Classe</label>
                  <select
                    value={newUnitGrade}
                    onChange={e => setNewUnitGrade(e.target.value as any)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-2.5 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
                  >
                    <option value="1ª Media">1ª Media</option>
                    <option value="2ª Media">2ª Media</option>
                    <option value="3ª Media">3ª Media</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Materia</label>
                  <select
                    value={newUnitArea}
                    onChange={e => setNewUnitArea(e.target.value as any)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-2.5 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
                  >
                    <option value="Materiali & Risorse">Materiali</option>
                    <option value="Disegno Tecnico">Disegno</option>
                    <option value="Proiezioni Ortogonali">Proiezioni</option>
                    <option value="Energia & Fonti Rinnovabili">Energia</option>
                    <option value="Edilizia & Città Sostenibili">Edilizia</option>
                    <option value="Elettricità & Elettronica">Elettronica</option>
                    <option value="Economia & Agenda 2030">Economia</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Ore Previste</label>
                  <input
                    type="number"
                    min="2"
                    max="40"
                    value={newUnitHours}
                    onChange={e => setNewUnitHours(Number(e.target.value))}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-2.5 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Descrizione Sintetica</label>
                <textarea
                  rows={2}
                  value={newUnitDesc}
                  onChange={e => setNewUnitDesc(e.target.value)}
                  placeholder="Finalità didattiche ed evoluzione delle lezioni..."
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl p-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowNewUnitModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300"
                >
                  Annulla
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-lg shadow-blue-600/20"
                >
                  Salva Unità Didattica
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* New Lesson Modal */}
      {showNewLessonModal && selectedUnit && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-lg w-full p-6 shadow-2xl overflow-y-auto max-h-[90vh]">
            <h3 className="font-bold text-lg text-white mb-1">Nuovo Piano di Lezione</h3>
            <p className="text-xs text-slate-400 mb-4">
              Aggiungi una lezione per l'unità: <strong className="text-blue-300">{selectedUnit.title}</strong>
            </p>

            <form onSubmit={handleCreateLesson} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Titolo Lezione</label>
                <input
                  type="text"
                  required
                  value={newLessonTitle}
                  onChange={e => setNewLessonTitle(e.target.value)}
                  placeholder="Es. Costruzione della piramide su PO e ribaltamento su PL"
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Durata (minuti)</label>
                  <input
                    type="number"
                    value={newLessonMinutes}
                    onChange={e => setNewLessonMinutes(Number(e.target.value))}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Tavola Disegno (opzionale)</label>
                  <input
                    type="text"
                    value={newLessonPlate}
                    onChange={e => setNewLessonPlate(e.target.value)}
                    placeholder="Es. Tavola n. 9"
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Compiti a Casa Assegnati</label>
                <input
                  type="text"
                  value={newLessonHomework}
                  onChange={e => setNewLessonHomework(e.target.value)}
                  placeholder="Es. Completare la campitura e ripassare con HB"
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowNewLessonModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300"
                >
                  Annulla
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-lg shadow-blue-600/20"
                >
                  Salva Lezione
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
