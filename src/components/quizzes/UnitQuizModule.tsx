import React, { useState } from 'react';
import { UnitQuiz, QuizQuestion, DidacticUnit } from '../../types';
import { UNIT_QUIZZES } from '../../data/mockData';
import { 
  CheckCircle2, 
  XCircle, 
  Award, 
  RotateCcw, 
  Printer, 
  PlusCircle, 
  BookOpen, 
  Clock, 
  Lightbulb, 
  Sparkles,
  UserCheck
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface UnitQuizModuleProps {
  units: DidacticUnit[];
  onAssignGradeToClass?: (unitTitle: string, score: number) => void;
}

export const UnitQuizModule: React.FC<UnitQuizModuleProps> = ({ units, onAssignGradeToClass }) => {
  const [selectedUnitId, setSelectedUnitId] = useState<string>(units[0]?.id || 'u1-materiali');
  const [viewMode, setViewMode] = useState<'interactive' | 'teacher_solution'>('interactive');
  
  // Quiz state
  const [userAnswers, setUserAnswers] = useState<Record<string, number>>({});
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [showAddQuestionModal, setShowAddQuestionModal] = useState<boolean>(false);
  const [quizzesData, setQuizzesData] = useState<Record<string, UnitQuiz>>(UNIT_QUIZZES);

  // New question form state
  const [newQuestionText, setNewQuestionText] = useState('');
  const [newOptions, setNewOptions] = useState(['', '', '', '']);
  const [newCorrectIdx, setNewCorrectIdx] = useState(0);
  const [newExplanation, setNewExplanation] = useState('');

  const currentUnit = units.find(u => u.id === selectedUnitId) || units[0];
  const currentQuiz = quizzesData[currentUnit.quizId] || {
    id: `quiz-${currentUnit.id}`,
    unitId: currentUnit.id,
    unitTitle: currentUnit.title,
    gradeLevel: currentUnit.gradeLevel,
    area: currentUnit.area,
    timeMinutes: 15,
    questions: []
  };

  const handleSelectOption = (questionId: string, optionIdx: number) => {
    if (isSubmitted) return;
    setUserAnswers(prev => ({
      ...prev,
      [questionId]: optionIdx
    }));
  };

  const handleResetQuiz = () => {
    setUserAnswers({});
    setIsSubmitted(false);
  };

  const handleSubmitQuiz = () => {
    setIsSubmitted(true);

    // Calculate score
    const totalQ = currentQuiz.questions.length;
    let correctCount = 0;
    currentQuiz.questions.forEach(q => {
      if (userAnswers[q.id] === q.correctIndex) {
        correctCount++;
      }
    });

    const gradeOutOf10 = totalQ > 0 ? (correctCount / totalQ) * 10 : 0;
    if (gradeOutOf10 >= 6) {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  };

  const handleAddQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newQuestionText.trim() || newOptions.some(o => !o.trim())) return;

    const newQ: QuizQuestion = {
      id: `q-${Date.now()}`,
      question: newQuestionText.trim(),
      options: newOptions.map(o => o.trim()),
      correctIndex: newCorrectIdx,
      explanation: newExplanation.trim() || 'Risposta corretta indicata dal docente.'
    };

    setQuizzesData(prev => {
      const existing = prev[currentUnit.quizId];
      if (!existing) return prev;
      return {
        ...prev,
        [currentUnit.quizId]: {
          ...existing,
          questions: [...existing.questions, newQ]
        }
      };
    });

    // Reset form
    setNewQuestionText('');
    setNewOptions(['', '', '', '']);
    setNewCorrectIdx(0);
    setNewExplanation('');
    setShowAddQuestionModal(false);
  };

  // Score stats
  const totalQuestions = currentQuiz.questions.length;
  const answeredCount = Object.keys(userAnswers).length;
  let correctCount = 0;
  if (isSubmitted) {
    currentQuiz.questions.forEach(q => {
      if (userAnswers[q.id] === q.correctIndex) correctCount++;
    });
  }
  const calculatedGrade = totalQuestions > 0 ? ((correctCount / totalQuestions) * 10).toFixed(1) : '0';

  return (
    <div className="flex flex-col h-full bg-slate-900 text-slate-100 rounded-2xl overflow-hidden border border-slate-800 shadow-xl">
      {/* Quiz Top Toolbar */}
      <div className="bg-slate-800/90 backdrop-blur-md px-4 py-3.5 border-b border-slate-700/80 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 to-rose-500 flex items-center justify-center shadow-lg shadow-amber-500/20">
            <Award className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-bold text-lg text-white">Quiz Finale di Unità Didattica</h2>
              <span className="text-xs px-2 py-0.5 rounded-full bg-amber-950 text-amber-300 border border-amber-800">
                Verifica degli Apprendimenti
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Valutazione formativa e sommativa strutturata con spiegazioni tecniche per ogni quesito
            </p>
          </div>
        </div>

        {/* View Mode & Actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setViewMode(viewMode === 'interactive' ? 'teacher_solution' : 'interactive')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all min-h-[40px] flex items-center gap-1.5 ${
              viewMode === 'teacher_solution'
                ? 'bg-indigo-600 text-white border-indigo-500 shadow-md'
                : 'bg-slate-800 text-indigo-300 border-slate-700 hover:bg-slate-700'
            }`}
          >
            <Lightbulb className="w-4 h-4" />
            {viewMode === 'teacher_solution' ? 'Soluzioni Visibili' : 'Mostra Risposte (Docente)'}
          </button>

          <button
            onClick={() => window.print()}
            className="px-3 py-1.5 rounded-xl bg-slate-800 text-slate-300 border border-slate-700 hover:bg-slate-700 text-xs font-semibold flex items-center gap-1.5 min-h-[40px]"
            title="Stampa foglio verifica per gli studenti"
          >
            <Printer className="w-4 h-4" />
            Stampa Verifica
          </button>

          <button
            onClick={() => setShowAddQuestionModal(true)}
            className="px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold flex items-center gap-1.5 min-h-[40px]"
          >
            <PlusCircle className="w-4 h-4" />
            Nuovo Quesito
          </button>
        </div>
      </div>

      {/* Unit Selector Strip (Touch Friendly) */}
      <div className="bg-slate-850 px-4 py-2 border-b border-slate-800 flex items-center gap-2 overflow-x-auto">
        <span className="text-xs font-bold text-slate-400 whitespace-nowrap mr-1">Unità:</span>
        {units.map(u => (
          <button
            key={u.id}
            onClick={() => {
              setSelectedUnitId(u.id);
              handleResetQuiz();
            }}
            className={`px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all min-h-[40px] flex items-center gap-1.5 border ${
              selectedUnitId === u.id
                ? 'bg-amber-500/20 text-amber-300 border-amber-500/60 font-bold shadow-sm'
                : 'bg-slate-800 text-slate-400 border-slate-700/60 hover:text-slate-200'
            }`}
          >
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: u.color }} />
            <span>{u.title}</span>
            <span className="text-[10px] opacity-70">({u.gradeLevel})</span>
          </button>
        ))}
      </div>

      {/* Quiz Body */}
      <div className="flex-1 overflow-y-auto p-4 md:p-6 max-w-4xl mx-auto w-full space-y-6">
        {/* Quiz Banner Card */}
        <div className="bg-gradient-to-r from-slate-850 to-slate-800 p-5 rounded-2xl border border-slate-700 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs text-amber-400 font-semibold mb-1">
              <span>{currentUnit.gradeLevel}</span>
              <span>•</span>
              <span>{currentUnit.area}</span>
              <span>•</span>
              <span className="flex items-center gap-1 text-slate-300">
                <Clock className="w-3 h-3" /> {currentQuiz.timeMinutes} minuti
              </span>
            </div>
            <h3 className="font-bold text-xl text-white">
              {currentQuiz.unitTitle}
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              {totalQuestions} Quesiti a risposta multipla con valutazione automatica in decimi (scala 4-10).
            </p>
          </div>

          {/* Real-time score card or Submit status */}
          <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-700 text-center min-w-[160px]">
            {isSubmitted ? (
              <div>
                <div className="text-xs uppercase font-bold text-slate-400">Voto Ottenuto</div>
                <div className={`text-3xl font-extrabold mt-0.5 ${
                  Number(calculatedGrade) >= 6 ? 'text-emerald-400' : 'text-rose-400'
                }`}>
                  {calculatedGrade} <span className="text-base font-normal text-slate-400">/ 10</span>
                </div>
                <div className="text-[11px] text-slate-300 mt-1">
                  {correctCount} su {totalQuestions} corretti
                </div>
              </div>
            ) : (
              <div>
                <div className="text-xs uppercase font-bold text-slate-400">Completamento</div>
                <div className="text-2xl font-bold text-cyan-400 mt-0.5">
                  {answeredCount} <span className="text-sm font-normal text-slate-400">/ {totalQuestions}</span>
                </div>
                <div className="text-[11px] text-slate-400 mt-1">
                  {answeredCount === totalQuestions ? 'Pronto alla consegna' : 'In corso...'}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Questions List */}
        <div className="space-y-5">
          {currentQuiz.questions.map((q, qIndex) => {
            const userAnswer = userAnswers[q.id];
            const isCorrect = isSubmitted && userAnswer === q.correctIndex;
            const isWrong = isSubmitted && userAnswer !== undefined && userAnswer !== q.correctIndex;

            return (
              <div 
                key={q.id}
                className={`p-5 rounded-2xl border transition-all ${
                  isSubmitted 
                    ? isCorrect
                      ? 'bg-emerald-950/20 border-emerald-800/60'
                      : isWrong
                      ? 'bg-rose-950/20 border-rose-800/60'
                      : 'bg-slate-800/50 border-slate-700'
                    : 'bg-slate-800/70 border-slate-700 hover:border-slate-600'
                }`}
              >
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-2.5">
                    <span className="w-7 h-7 rounded-lg bg-slate-700 text-slate-200 text-xs font-bold flex items-center justify-center shrink-0">
                      {qIndex + 1}
                    </span>
                    <h4 className="font-bold text-white text-sm md:text-base leading-snug">
                      {q.question}
                    </h4>
                  </div>

                  {isSubmitted && (
                    <span className="shrink-0">
                      {isCorrect ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                      ) : (
                        <XCircle className="w-5 h-5 text-rose-400" />
                      )}
                    </span>
                  )}
                </div>

                {/* Options grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 mt-3">
                  {q.options.map((opt, optIdx) => {
                    const isSelected = userAnswer === optIdx;
                    const isTheCorrectOne = optIdx === q.correctIndex;

                    let optStyle = 'bg-slate-900 border-slate-700/80 text-slate-300 hover:bg-slate-750';

                    if (viewMode === 'teacher_solution') {
                      if (isTheCorrectOne) {
                        optStyle = 'bg-emerald-950/50 border-emerald-500 text-emerald-200 font-bold';
                      }
                    } else if (isSubmitted) {
                      if (isTheCorrectOne) {
                        optStyle = 'bg-emerald-950/60 border-emerald-500 text-emerald-300 font-bold';
                      } else if (isSelected && !isTheCorrectOne) {
                        optStyle = 'bg-rose-950/60 border-rose-500 text-rose-300';
                      } else {
                        optStyle = 'bg-slate-900/60 border-slate-800 text-slate-500';
                      }
                    } else if (isSelected) {
                      optStyle = 'bg-amber-500/20 border-amber-400 text-amber-200 font-semibold shadow-sm';
                    }

                    return (
                      <button
                        key={optIdx}
                        onClick={() => handleSelectOption(q.id, optIdx)}
                        disabled={isSubmitted || viewMode === 'teacher_solution'}
                        className={`text-left p-3.5 rounded-xl text-xs md:text-sm border transition-all flex items-start gap-2.5 min-h-[48px] touch-manipulation ${optStyle}`}
                      >
                        <span className="w-5 h-5 rounded-full border border-current flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                          {String.fromCharCode(65 + optIdx)}
                        </span>
                        <span className="leading-relaxed flex-1">{opt}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Explanation Box (Visible if submitted or in teacher solution mode) */}
                {(isSubmitted || viewMode === 'teacher_solution') && (
                  <div className="mt-3.5 p-3 rounded-xl bg-slate-900/90 border border-slate-700/80 text-xs flex items-start gap-2 text-slate-300">
                    <Lightbulb className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-amber-300 font-semibold">Spiegazione didattica: </strong>
                      {q.explanation}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom Submission & Reset Actions */}
        <div className="p-4 bg-slate-800/90 backdrop-blur-md rounded-2xl border border-slate-700 flex flex-wrap items-center justify-between gap-3">
          <div className="text-xs text-slate-400">
            {isSubmitted ? (
              <span>Verifica conclusa. Puoi reimpostarla per far esercitare un altro alunno.</span>
            ) : (
              <span>Rispondi a tutte le domande prima di confermare.</span>
            )}
          </div>

          <div className="flex items-center gap-2">
            {isSubmitted && (
              <button
                onClick={handleResetQuiz}
                className="px-4 py-2.5 rounded-xl bg-slate-700 hover:bg-slate-600 text-xs font-bold text-slate-200 flex items-center gap-1.5 min-h-[44px]"
              >
                <RotateCcw className="w-4 h-4" />
                Riprova Quiz
              </button>
            )}

            {!isSubmitted && (
              <button
                disabled={answeredCount === 0}
                onClick={handleSubmitQuiz}
                className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs flex items-center gap-2 min-h-[44px] shadow-lg shadow-amber-500/20 disabled:opacity-50"
              >
                <CheckCircle2 className="w-4 h-4" />
                Consegna e Calcola Voto
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Add Question Modal */}
      {showAddQuestionModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-lg w-full p-6 shadow-2xl overflow-y-auto max-h-[90vh]">
            <h3 className="font-bold text-lg text-white mb-1">Aggiungi Quesito Didattico</h3>
            <p className="text-xs text-slate-400 mb-4">
              Aggiungi una domanda al quiz di: <strong className="text-amber-300">{currentUnit.title}</strong>
            </p>

            <form onSubmit={handleAddQuestion} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Testo della Domanda</label>
                <textarea
                  rows={2}
                  required
                  value={newQuestionText}
                  onChange={e => setNewQuestionText(e.target.value)}
                  placeholder="Es. Nel metodo di Monge, quale linea si usa per gli spigoli nascosti?"
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl p-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">Opzioni di Risposta (indica quella corretta)</label>
                <div className="space-y-2">
                  {newOptions.map((opt, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="correctOpt"
                        checked={newCorrectIdx === idx}
                        onChange={() => setNewCorrectIdx(idx)}
                        className="w-4 h-4 text-amber-500 bg-slate-800 border-slate-700"
                        title="Segna come corretta"
                      />
                      <input
                        type="text"
                        required
                        value={opt}
                        onChange={e => {
                          const updated = [...newOptions];
                          updated[idx] = e.target.value;
                          setNewOptions(updated);
                        }}
                        placeholder={`Opzione ${String.fromCharCode(65 + idx)}`}
                        className="flex-1 bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Spiegazione Didattica</label>
                <textarea
                  rows={2}
                  value={newExplanation}
                  onChange={e => setNewExplanation(e.target.value)}
                  placeholder="Motivazione tecnica della risposta corretta..."
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl p-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowAddQuestionModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300"
                >
                  Annulla
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold"
                >
                  Salva Quesito
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
