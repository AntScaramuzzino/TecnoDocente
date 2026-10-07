import React, { useState } from 'react';
import { Student } from '../../types';
import { 
  GraduationCap, 
  Search, 
  Plus, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle2, 
  Award, 
  Edit3, 
  Printer, 
  X, 
  Sparkles,
  FileSpreadsheet,
  Layers,
  Compass
} from 'lucide-react';

interface EvaluationSystemProps {
  students: Student[];
  currentClass: string;
  onUpdateStudents: (updated: Student[]) => void;
}

export const EvaluationSystem: React.FC<EvaluationSystemProps> = ({ 
  students, 
  currentClass, 
  onUpdateStudents 
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<'tutti' | 'recupero' | 'bes_dsa' | 'eccellenze'>('tutti');
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [showAddGradeModal, setShowAddGradeModal] = useState<boolean>(false);
  const [targetStudentId, setTargetStudentId] = useState<string>('');

  // Add Grade Form state
  const [gradeType, setGradeType] = useState<'Tavola Disegno' | 'Verifica Scritta' | 'Interrogazione Orale' | 'Laboratorio STEAM' | 'Quiz Video EdPuzzle'>('Tavola Disegno');
  const [gradeSubject, setGradeSubject] = useState('Tavola n. 3 - Proiezioni Ortogonali');
  const [gradeValue, setGradeValue] = useState<number>(8.0);
  const [gradeNotes, setGradeNotes] = useState('');
  const [rubricPrecision, setRubricPrecision] = useState<number>(4);
  const [rubricCorrectness, setRubricCorrectness] = useState<number>(4);
  const [rubricCleanliness, setRubricCleanliness] = useState<number>(3);
  const [rubricPunctuality, setRubricPunctuality] = useState<number>(4);

  // Filter students by search and tags
  const filteredStudents = students.filter(s => {
    const matchesSearch = s.name.toLowerCase().includes(searchTerm.toLowerCase());
    if (!matchesSearch) return false;

    if (filterType === 'recupero') {
      const avg = getStudentAverage(s);
      return avg < 6 || s.recoveryNeeded;
    }
    if (filterType === 'bes_dsa') return s.besDsa;
    if (filterType === 'eccellenze') {
      const avg = getStudentAverage(s);
      return avg >= 8.5;
    }
    return true;
  });

  // Calculate statistics
  const averages = students.map(s => getStudentAverage(s)).filter(a => a > 0);
  const classAvg = averages.length > 0 ? (averages.reduce((a, b) => a + b, 0) / averages.length).toFixed(2) : '0';
  const below6Count = students.filter(s => getStudentAverage(s) < 6 && getStudentAverage(s) > 0).length;
  const excellenceCount = students.filter(s => getStudentAverage(s) >= 8.5).length;

  const handleOpenAddGrade = (studentId?: string) => {
    setTargetStudentId(studentId || (filteredStudents[0]?.id ?? ''));
    setGradeValue(8.0);
    setGradeNotes('');
    setShowAddGradeModal(true);
  };

  const handleSaveGrade = (e: React.FormEvent) => {
    e.preventDefault();
    if (!targetStudentId) return;

    const newGrade = {
      id: `g-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      type: gradeType,
      subject: gradeSubject,
      value: gradeValue,
      rubricScores: gradeType === 'Tavola Disegno' ? {
        precisione: rubricPrecision,
        correttezza: rubricCorrectness,
        pulizia: rubricCleanliness,
        puntualita: rubricPunctuality
      } : undefined,
      notes: gradeNotes.trim()
    };

    const updatedList = students.map(s => {
      if (s.id === targetStudentId) {
        return {
          ...s,
          grades: [newGrade, ...s.grades]
        };
      }
      return s;
    });

    onUpdateStudents(updatedList);
    setShowAddGradeModal(false);

    // If detail modal is open for this student, update it
    if (selectedStudent && selectedStudent.id === targetStudentId) {
      const found = updatedList.find(x => x.id === targetStudentId);
      if (found) setSelectedStudent(found);
    }
  };

  return (
    <div className="flex flex-col h-full bg-slate-900 text-slate-100 rounded-2xl overflow-hidden border border-slate-800 shadow-xl">
      {/* Top Header */}
      <div className="bg-slate-800/90 backdrop-blur-md px-4 py-3.5 border-b border-slate-700/80 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-600 flex items-center justify-center shadow-lg shadow-emerald-500/20">
            <GraduationCap className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-bold text-lg text-white">Registro Valutazioni & Competenze</h2>
              <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-800">
                Classe {currentClass === 'Tutte le classi' ? '2ª B' : currentClass}
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Rubriche di valutazione per Tavole grafiche di disegno, verifiche teoriche e compiti di realtà
            </p>
          </div>
        </div>

        {/* Action Buttons (Touch Friendly) */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => window.print()}
            className="px-3 py-1.5 rounded-xl bg-slate-800 text-slate-300 border border-slate-700 hover:bg-slate-700 text-xs font-semibold flex items-center gap-1.5 min-h-[40px]"
          >
            <Printer className="w-4 h-4" />
            Stampa Griglia
          </button>
          <button
            onClick={() => handleOpenAddGrade()}
            className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1.5 min-h-[40px] shadow-lg shadow-emerald-600/20"
          >
            <Plus className="w-4 h-4" />
            Inserisci Voto
          </button>
        </div>
      </div>

      {/* KPI Stats Bar */}
      <div className="bg-slate-850 px-4 py-3 border-b border-slate-800 grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="bg-slate-900/80 p-2.5 rounded-xl border border-slate-750 flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-sm">
            {classAvg}
          </div>
          <div>
            <div className="text-[10px] uppercase font-bold text-slate-400">Media della Classe</div>
            <div className="text-xs font-bold text-white">Obiettivo: &ge; 7.0</div>
          </div>
        </div>

        <div className="bg-slate-900/80 p-2.5 rounded-xl border border-slate-750 flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-sky-500/20 text-sky-400 flex items-center justify-center font-bold text-sm">
            {students.length}
          </div>
          <div>
            <div className="text-[10px] uppercase font-bold text-slate-400">Studenti Iscritti</div>
            <div className="text-xs font-bold text-white">Classe attiva</div>
          </div>
        </div>

        <div className="bg-slate-900/80 p-2.5 rounded-xl border border-slate-750 flex items-center gap-3">
          <div className={`w-9 h-9 rounded-lg flex items-center justify-center font-bold text-sm ${
            below6Count > 0 ? 'bg-rose-500/20 text-rose-400' : 'bg-slate-800 text-slate-400'
          }`}>
            {below6Count}
          </div>
          <div>
            <div className="text-[10px] uppercase font-bold text-slate-400">Da Recuperare (&lt; 6)</div>
            <div className="text-xs font-bold text-white">Piani di recupero attivi</div>
          </div>
        </div>

        <div className="bg-slate-900/80 p-2.5 rounded-xl border border-slate-750 flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-sm">
            {excellenceCount}
          </div>
          <div>
            <div className="text-[10px] uppercase font-bold text-slate-400">Fascia Alta (&ge; 8.5)</div>
            <div className="text-xs font-bold text-white">Competenze avanzate</div>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-slate-850/60 px-4 py-2.5 border-b border-slate-800 flex flex-wrap items-center justify-between gap-2.5">
        <div className="relative flex-1 min-w-[200px] max-w-sm">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Cerca studente per cognome o nome..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700/80 rounded-xl pl-9 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto">
          {(['tutti', 'recupero', 'bes_dsa', 'eccellenze'] as const).map(f => (
            <button
              key={f}
              onClick={() => setFilterType(f)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold capitalize whitespace-nowrap transition-all border ${
                filterType === f
                  ? 'bg-slate-700 text-emerald-300 border-emerald-500/50 font-bold'
                  : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
              }`}
            >
              {f === 'tutti' ? 'Tutti gli studenti' : f === 'bes_dsa' ? 'BES / DSA' : f}
            </button>
          ))}
        </div>
      </div>

      {/* Grade Table Area (Optimized for Touch Scrolling & Tablet Tap) */}
      <div className="flex-1 overflow-auto p-4">
        <div className="bg-slate-850 rounded-2xl border border-slate-800 overflow-hidden shadow">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-800/80 text-slate-400 border-b border-slate-700/80 uppercase tracking-wider text-[11px]">
                <th className="py-3 px-4 font-bold">Studente</th>
                <th className="py-3 px-3 font-bold text-center">Media</th>
                <th className="py-3 px-4 font-bold">Ultimi Voti (Tavole & Verifiche)</th>
                <th className="py-3 px-3 font-bold text-center">Livello</th>
                <th className="py-3 px-4 font-bold text-right">Azioni Rapide</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {filteredStudents.map(student => {
                const avg = getStudentAverage(student);
                const level = getLevelFromAverage(avg);

                return (
                  <tr 
                    key={student.id} 
                    className="hover:bg-slate-800/50 transition-colors"
                  >
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-white text-sm">{student.name}</span>
                        {student.besDsa && (
                          <span className="px-1.5 py-0.5 rounded text-[10px] bg-indigo-950 text-indigo-300 border border-indigo-800 font-semibold">
                            BES/DSA
                          </span>
                        )}
                        {student.recoveryNeeded && (
                          <span className="px-1.5 py-0.5 rounded text-[10px] bg-rose-950 text-rose-300 border border-rose-800 font-semibold flex items-center gap-0.5">
                            <AlertTriangle className="w-2.5 h-2.5" /> Recupero
                          </span>
                        )}
                      </div>
                      <div className="text-[11px] text-slate-400 truncate max-w-xs mt-0.5">
                        {student.notes || 'Nessuna nota particolare registrata'}
                      </div>
                    </td>

                    <td className="py-3 px-3 text-center">
                      <span className={`inline-block px-2.5 py-1 rounded-lg font-extrabold text-sm ${
                        avg >= 8 ? 'bg-emerald-950 text-emerald-300 border border-emerald-800' :
                        avg >= 6 ? 'bg-amber-950 text-amber-300 border border-amber-800' :
                        'bg-rose-950 text-rose-300 border border-rose-800'
                      }`}>
                        {avg > 0 ? avg.toFixed(1) : '-'}
                      </span>
                    </td>

                    <td className="py-3 px-4">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        {student.grades.slice(0, 4).map(g => (
                          <span
                            key={g.id}
                            className={`px-2 py-1 rounded-md text-xs font-bold border transition-transform hover:scale-105 cursor-pointer ${
                              g.value >= 8 ? 'bg-emerald-900/30 text-emerald-300 border-emerald-700/60' :
                              g.value >= 6 ? 'bg-amber-900/30 text-amber-300 border-amber-700/60' :
                              'bg-rose-900/30 text-rose-300 border-rose-700/60'
                            }`}
                            title={`${g.type}: ${g.subject} (${g.date})`}
                          >
                            {g.value.toFixed(1)}
                            <span className="text-[9px] ml-1 font-normal opacity-70">
                              {g.type === 'Tavola Disegno' ? 'Tav' : 'Ver'}
                            </span>
                          </span>
                        ))}
                      </div>
                    </td>

                    <td className="py-3 px-3 text-center">
                      <span className={`text-[11px] px-2 py-0.5 rounded-full font-semibold ${level.badgeStyle}`}>
                        {level.label}
                      </span>
                    </td>

                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => handleOpenAddGrade(student.id)}
                          className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-emerald-400 border border-slate-700 text-xs font-semibold flex items-center gap-1 min-h-[36px]"
                          title="Aggiungi voto rapido"
                        >
                          <Plus className="w-3.5 h-3.5" /> Voto
                        </button>
                        <button
                          onClick={() => setSelectedStudent(student)}
                          className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 text-xs font-semibold min-h-[36px]"
                          title="Apri scheda studente completa"
                        >
                          Scheda
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Student Detail Modal */}
      {selectedStudent && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-2xl w-full p-6 shadow-2xl overflow-y-auto max-h-[90vh]">
            <div className="flex items-start justify-between border-b border-slate-800 pb-3 mb-4">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-xl text-white">{selectedStudent.name}</h3>
                  <span className="text-xs px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                    Classe {selectedStudent.classId}
                  </span>
                  {selectedStudent.besDsa && (
                    <span className="text-xs px-2 py-0.5 rounded bg-indigo-950 text-indigo-300 border border-indigo-800 font-semibold">
                      BES / DSA
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-400 mt-1">{selectedStudent.notes}</p>
              </div>
              <button
                onClick={() => setSelectedStudent(null)}
                className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-3 gap-3 mb-5">
              <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700 text-center">
                <div className="text-[11px] text-slate-400 uppercase font-bold">Media Generale</div>
                <div className="text-2xl font-black text-emerald-400 mt-0.5">
                  {getStudentAverage(selectedStudent).toFixed(1)}
                </div>
              </div>
              <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700 text-center">
                <div className="text-[11px] text-slate-400 uppercase font-bold">Valutazioni Registrate</div>
                <div className="text-2xl font-black text-cyan-400 mt-0.5">
                  {selectedStudent.grades.length}
                </div>
              </div>
              <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700 text-center">
                <div className="text-[11px] text-slate-400 uppercase font-bold">Livello Competenze</div>
                <div className="text-sm font-bold text-amber-300 mt-1">
                  {getLevelFromAverage(getStudentAverage(selectedStudent)).label}
                </div>
              </div>
            </div>

            {/* List of grades & rubrics */}
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
              Storico Valutazioni Dettagliato
            </h4>
            <div className="space-y-2.5">
              {selectedStudent.grades.map(g => (
                <div key={g.id} className="p-3 rounded-xl bg-slate-800/60 border border-slate-750 flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-bold text-white text-xs">{g.subject}</span>
                      <span className="text-[11px] text-slate-400 ml-2">({g.type} • {g.date})</span>
                    </div>
                    <span className={`px-2.5 py-0.5 rounded-lg text-sm font-black ${
                      g.value >= 8 ? 'bg-emerald-950 text-emerald-300 border border-emerald-800' :
                      g.value >= 6 ? 'bg-amber-950 text-amber-300 border border-amber-800' :
                      'bg-rose-950 text-rose-300 border border-rose-800'
                    }`}>
                      {g.value.toFixed(1)}
                    </span>
                  </div>

                  {/* Rubric scores if drawing plate */}
                  {g.rubricScores && (
                    <div className="grid grid-cols-4 gap-1.5 pt-2 border-t border-slate-750 text-center text-[10px]">
                      <div className="bg-slate-900 p-1 rounded">
                        <span className="text-slate-400 block">Precisione</span>
                        <span className="font-bold text-cyan-300">{g.rubricScores.precisione}/4</span>
                      </div>
                      <div className="bg-slate-900 p-1 rounded">
                        <span className="text-slate-400 block">Correttezza</span>
                        <span className="font-bold text-cyan-300">{g.rubricScores.correttezza}/4</span>
                      </div>
                      <div className="bg-slate-900 p-1 rounded">
                        <span className="text-slate-400 block">Pulizia Foglio</span>
                        <span className="font-bold text-cyan-300">{g.rubricScores.pulizia}/4</span>
                      </div>
                      <div className="bg-slate-900 p-1 rounded">
                        <span className="text-slate-400 block">Puntualità</span>
                        <span className="font-bold text-cyan-300">{g.rubricScores.puntualita}/4</span>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-5 pt-4 border-t border-slate-800 flex items-center justify-between">
              <button
                onClick={() => handleOpenAddGrade(selectedStudent.id)}
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1.5"
              >
                <Plus className="w-4 h-4" /> Aggiungi Voto a {selectedStudent.name}
              </button>
              <button
                onClick={() => setSelectedStudent(null)}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs text-slate-300 font-semibold"
              >
                Chiudi
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Grade Touch Modal */}
      {showAddGradeModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-lg w-full p-6 shadow-2xl overflow-y-auto max-h-[90vh]">
            <h3 className="font-bold text-lg text-white mb-1">Registra Valutazione</h3>
            <p className="text-xs text-slate-400 mb-4">
              Inserimento voto e compilazione rubrica per lo studente selezionato.
            </p>

            <form onSubmit={handleSaveGrade} className="space-y-4">
              {/* Select Student */}
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Studente</label>
                <select
                  value={targetStudentId}
                  onChange={e => setTargetStudentId(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                >
                  {students.map(s => (
                    <option key={s.id} value={s.id}>
                      {s.name} ({s.classId})
                    </option>
                  ))}
                </select>
              </div>

              {/* Grade Type */}
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Tipologia Prova</label>
                  <select
                    value={gradeType}
                    onChange={e => setGradeType(e.target.value as any)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                  >
                    <option value="Tavola Disegno">Tavola Disegno Tecnico</option>
                    <option value="Verifica Scritta">Verifica Scritta</option>
                    <option value="Interrogazione Orale">Interrogazione Orale</option>
                    <option value="Laboratorio STEAM">Laboratorio STEAM</option>
                    <option value="Quiz Video EdPuzzle">Quiz Video EdPuzzle</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Oggetto / Titolo Prova</label>
                  <input
                    type="text"
                    required
                    value={gradeSubject}
                    onChange={e => setGradeSubject(e.target.value)}
                    placeholder="Es. Tavola 4 - Proiezioni Ortogonali"
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              {/* Quick Touch Voto Buttons (4 to 10 with half grades) */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-bold text-slate-300">Voto Finale: <span className="text-emerald-400 text-sm font-extrabold">{gradeValue.toFixed(1)}</span></label>
                  <span className="text-[10px] text-slate-400">Tocca per selezionare</span>
                </div>
                <div className="grid grid-cols-7 gap-1.5">
                  {[4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10].map(v => (
                    <button
                      key={v}
                      type="button"
                      onClick={() => setGradeValue(v)}
                      className={`py-2 rounded-lg text-xs font-bold transition-all min-h-[38px] ${
                        gradeValue === v
                          ? 'bg-emerald-500 text-slate-950 font-black scale-105 shadow'
                          : 'bg-slate-800 hover:bg-slate-750 text-slate-300 border border-slate-700'
                      }`}
                    >
                      {v}
                    </button>
                  ))}
                </div>
              </div>

              {/* Rubric Criteria if Drawing plate */}
              {gradeType === 'Tavola Disegno' && (
                <div className="bg-slate-850 p-3 rounded-xl border border-slate-750 space-y-2 text-xs">
                  <div className="font-bold text-slate-300 text-[11px] uppercase tracking-wider flex items-center gap-1">
                    <Compass className="w-3 h-3 text-cyan-400" />
                    Rubrica di Valutazione Tavola Grafica (1 - 4)
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-[11px]">
                    <div>
                      <span className="text-slate-400 block mb-1">Precisione del tratto (2H/HB)</span>
                      <select 
                        value={rubricPrecision} 
                        onChange={e => setRubricPrecision(Number(e.target.value))}
                        className="w-full bg-slate-900 border border-slate-700 rounded px-2 py-1 text-white"
                      >
                        <option value={4}>4 - Ottima precisione</option>
                        <option value={3}>3 - Buona</option>
                        <option value={2}>2 - Sufficiente</option>
                        <option value={1}>1 - Impreciso</option>
                      </select>
                    </div>

                    <div>
                      <span className="text-slate-400 block mb-1">Correttezza geometrica</span>
                      <select 
                        value={rubricCorrectness} 
                        onChange={e => setRubricCorrectness(Number(e.target.value))}
                        className="w-full bg-slate-900 border border-slate-700 rounded px-2 py-1 text-white"
                      >
                        <option value={4}>4 - Completa e corretta</option>
                        <option value={3}>3 - Pochi errori minori</option>
                        <option value={2}>2 - Errori di ribaltamento</option>
                        <option value={1}>1 - Gravemente errata</option>
                      </select>
                    </div>

                    <div>
                      <span className="text-slate-400 block mb-1">Pulizia del foglio e squadratura</span>
                      <select 
                        value={rubricCleanliness} 
                        onChange={e => setRubricCleanliness(Number(e.target.value))}
                        className="w-full bg-slate-900 border border-slate-700 rounded px-2 py-1 text-white"
                      >
                        <option value={4}>4 - Impeccabile</option>
                        <option value={3}>3 - Pulita</option>
                        <option value={2}>2 - Qualche sbavatura</option>
                        <option value={1}>1 - Macchiato/sgualcito</option>
                      </select>
                    </div>

                    <div>
                      <span className="text-slate-400 block mb-1">Puntualità consegna</span>
                      <select 
                        value={rubricPunctuality} 
                        onChange={e => setRubricPunctuality(Number(e.target.value))}
                        className="w-full bg-slate-900 border border-slate-700 rounded px-2 py-1 text-white"
                      >
                        <option value={4}>4 - Puntuale</option>
                        <option value={3}>3 - Lieve ritardo giustificato</option>
                        <option value={2}>2 - In ritardo</option>
                        <option value={1}>1 - Consegnata dopo solleciti</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* Notes */}
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Note per lo Studente / Famiglia</label>
                <textarea
                  rows={2}
                  value={gradeNotes}
                  onChange={e => setGradeNotes(e.target.value)}
                  placeholder="Es. Ottimo controllo delle squadre; fare attenzione all'inclinazione dell'archetto di ribaltamento."
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl p-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowAddGradeModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300"
                >
                  Annulla
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-lg shadow-emerald-600/20"
                >
                  Conferma Voto
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

// Helper grade average calculations
function getStudentAverage(student: Student): number {
  if (!student.grades || student.grades.length === 0) return 0;
  const sum = student.grades.reduce((acc, g) => acc + g.value, 0);
  return sum / student.grades.length;
}

function getLevelFromAverage(avg: number): { label: string; badgeStyle: string } {
  if (avg >= 8.5) {
    return { label: 'Avanzato', badgeStyle: 'bg-emerald-950 text-emerald-300 border border-emerald-800' };
  }
  if (avg >= 7) {
    return { label: 'Intermedio', badgeStyle: 'bg-cyan-950 text-cyan-300 border border-cyan-800' };
  }
  if (avg >= 6) {
    return { label: 'Base', badgeStyle: 'bg-amber-950 text-amber-300 border border-amber-800' };
  }
  return { label: 'Iniziale', badgeStyle: 'bg-rose-950 text-rose-300 border border-rose-800' };
}
