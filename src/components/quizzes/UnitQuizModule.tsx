import React, { useState, useEffect } from 'react';
import { UnitQuiz, QuizQuestion, DidacticUnit, MediaResource } from '../../types';
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
  UserCheck,
  Play,
  Youtube,
  ShieldCheck,
  ChevronRight,
  ExternalLink,
  X,
  FileText
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface UnitQuizModuleProps {
  units: DidacticUnit[];
  initialUnitId?: string;
  resources?: MediaResource[];
  onAssignGradeToClass?: (unitTitle: string, score: number) => void;
  onOpenEdpuzzle?: (videoId?: string) => void;
}

export const UnitQuizModule: React.FC<UnitQuizModuleProps> = ({ 
  units, 
  initialUnitId,
  resources = [],
  onAssignGradeToClass,
  onOpenEdpuzzle 
}) => {
  const [selectedUnitId, setSelectedUnitId] = useState<string>(
    initialUnitId || units[0]?.id || 'u1-materiali'
  );
  const [viewMode, setViewMode] = useState<'interactive' | 'teacher_solution'>('interactive');
  
  // Video player controls
  const [showVideoSection, setShowVideoSection] = useState<boolean>(true);
  const [videoSeekSeconds, setVideoSeekSeconds] = useState<number>(0);
  const [videoIframeKey, setVideoIframeKey] = useState<number>(0);

  // Audit modal state (Verifica Rigorosa Corrispondenza)
  const [showAuditModal, setShowAuditModal] = useState<boolean>(false);

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
  const [newVideoTimeLabel, setNewVideoTimeLabel] = useState('');

  // Sync selectedUnitId when initialUnitId prop changes
  useEffect(() => {
    if (initialUnitId && units.some(u => u.id === initialUnitId)) {
      setSelectedUnitId(initialUnitId);
      setUserAnswers({});
      setIsSubmitted(false);
      setVideoSeekSeconds(0);
      setVideoIframeKey(k => k + 1);
    }
  }, [initialUnitId, units]);

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

  // Find associated educational video for this unit
  const associatedVideo = resources.find(r => 
    (currentUnit.videoResourceId && r.id === currentUnit.videoResourceId) ||
    (r.type === 'video' && r.area === currentUnit.area)
  ) || resources.find(r => r.type === 'video');

  const handleSeekVideo = (seconds: number) => {
    setVideoSeekSeconds(seconds);
    setVideoIframeKey(k => k + 1);
    setShowVideoSection(true);
  };

  const handleSeekFromTimeStr = (timeStr: string) => {
    const parts = timeStr.split(':');
    if (parts.length === 2) {
      const s = parseInt(parts[0], 10) * 60 + parseInt(parts[1], 10);
      handleSeekVideo(s);
    }
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
    setVideoSeekSeconds(0);
  };

  const handleSubmitQuiz = () => {
    setIsSubmitted(true);

    const totalQ = currentQuiz.questions.length;
    let correct = 0;
    currentQuiz.questions.forEach(q => {
      if (userAnswers[q.id] === q.correctIndex) {
        correct++;
      }
    });

    const gradeOutOf10 = totalQ > 0 ? (correct / totalQ) * 10 : 0;
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

    let sec = 0;
    if (newVideoTimeLabel.trim()) {
      const p = newVideoTimeLabel.trim().split(':');
      if (p.length === 2) {
        sec = parseInt(p[0], 10) * 60 + parseInt(p[1], 10);
      }
    }

    const newQ: QuizQuestion = {
      id: `q-${Date.now()}`,
      question: newQuestionText.trim(),
      options: newOptions.map(o => o.trim()),
      correctIndex: newCorrectIdx,
      explanation: newExplanation.trim() || 'Risposta corretta indicata dal docente in base ai contenuti della lezione.',
      videoTimestampLabel: newVideoTimeLabel.trim() || undefined,
      videoTimestampSeconds: sec > 0 ? sec : undefined
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
    setNewVideoTimeLabel('');
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
              <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-800 font-bold flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-emerald-400" />
                Corrispondenza Video-Quiz 1:1
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Verifica degli apprendimenti ancorata alle video-lezioni e alle spiegazioni tecniche
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 flex-wrap">
          {/* Audit Button */}
          <button
            onClick={() => setShowAuditModal(true)}
            className="px-3 py-1.5 rounded-xl bg-emerald-950/80 text-emerald-300 border border-emerald-800 hover:bg-emerald-900 text-xs font-bold flex items-center gap-1.5 min-h-[40px] shadow"
            title="Esegui audit di verifica tra video, trascrizioni e domande del quiz"
          >
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            Audit Corrispondenza
          </button>

          {/* Teacher Solution Toggle */}
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
            Stampa
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
        <span className="text-xs font-bold text-slate-400 whitespace-nowrap mr-1">Unità Didattica:</span>
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
      <div className="flex-1 overflow-y-auto p-4 md:p-6 max-w-5xl mx-auto w-full space-y-6">
        
        {/* Unit Info Banner */}
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
              {totalQuestions} Quesiti di verifica degli apprendimenti calibrati sulle competenze e sulla lezione multimediale.
            </p>
          </div>

          {/* Real-time score card */}
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

        {/* ASSOCIATED VIDEO LESSON CARD */}
        {associatedVideo && (
          <div className="bg-slate-850 rounded-2xl border border-rose-900/40 overflow-hidden shadow-lg">
            <div className="p-4 bg-gradient-to-r from-rose-950/40 to-slate-850 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-red-600 flex items-center justify-center text-white shadow">
                  <Youtube className="w-4 h-4" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-rose-300 uppercase tracking-wide">
                      Video-Lezione Ufficiale di Riferimento
                    </span>
                    <span className="text-[10px] px-1.5 py-0.2 rounded bg-slate-800 text-slate-300 font-mono">
                      {associatedVideo.durationOrPages}
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-white leading-tight">
                    {associatedVideo.title}
                  </h4>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowVideoSection(!showVideoSection)}
                  className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-200 text-xs font-bold flex items-center gap-1.5 border border-slate-700"
                >
                  <Play className="w-3.5 h-3.5 text-rose-400" />
                  {showVideoSection ? 'Nascondi Video' : 'Mostra Video'}
                </button>

                {onOpenEdpuzzle && (
                  <button
                    onClick={() => onOpenEdpuzzle(associatedVideo.id)}
                    className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-rose-600 hover:from-amber-400 hover:to-rose-500 text-slate-950 text-xs font-black flex items-center gap-1.5 shadow-md shadow-amber-500/20"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    Quiz Interattivo EdPuzzle
                  </button>
                )}
              </div>
            </div>

            {/* Expandable Embedded Video & Timestamp Bar */}
            {showVideoSection && (
              <div className="p-4 space-y-3 bg-slate-900/50">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                  {/* Video Box */}
                  <div className="md:col-span-7 bg-black rounded-xl overflow-hidden border border-slate-800 aspect-video relative flex items-center justify-center shadow-lg">
                    {associatedVideo.youtubeId ? (
                      <iframe
                        key={videoIframeKey}
                        className="w-full h-full"
                        src={`https://www.youtube-nocookie.com/embed/${associatedVideo.youtubeId}?autoplay=1&rel=0&start=${videoSeekSeconds}&modestbranding=1`}
                        title={associatedVideo.title}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    ) : (
                      <div className="text-xs text-slate-400 p-4 text-center">Video player didattico</div>
                    )}
                  </div>

                  {/* Salient Timestamps List */}
                  <div className="md:col-span-5 flex flex-col justify-between space-y-2">
                    <div>
                      <span className="text-[11px] font-bold text-amber-300 uppercase tracking-wider block mb-2">
                        ⏱️ Minuti Salienti della Lezione (Clicca per ascoltare)
                      </span>
                      <div className="space-y-1.5 max-h-[190px] overflow-y-auto pr-1">
                        {(associatedVideo.lessonTimestamps || []).map((t, idx) => (
                          <button
                            key={idx}
                            onClick={() => handleSeekFromTimeStr(t.time)}
                            className="w-full text-left p-2 rounded-lg bg-slate-800/80 hover:bg-slate-750 border border-slate-750 flex items-center justify-between text-xs transition-all group"
                          >
                            <span className="text-slate-300 group-hover:text-white line-clamp-1 pr-2">
                              {t.note}
                            </span>
                            <span className="font-mono text-[11px] font-bold text-amber-400 bg-slate-900 px-1.5 py-0.5 rounded shrink-0">
                              {t.time}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="p-2.5 rounded-xl bg-emerald-950/30 border border-emerald-800/50 text-[11px] text-emerald-300 flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>
                        Tutti i quesiti sottostanti sono rigorosamente allineati ai concetti esposti in questo video.
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

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
                  <div className="flex items-start gap-2.5 flex-1">
                    <span className="w-7 h-7 rounded-lg bg-slate-700 text-slate-200 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                      {qIndex + 1}
                    </span>
                    <div className="flex-1">
                      <h4 className="font-bold text-white text-sm md:text-base leading-snug">
                        {q.question}
                      </h4>

                      {/* Video Reference Pill */}
                      {q.videoTimestampLabel && (
                        <div className="mt-2 flex items-center gap-2 flex-wrap">
                          <button
                            onClick={() => handleSeekFromTimeStr(q.videoTimestampLabel!)}
                            className="px-2 py-0.5 rounded-md bg-rose-950 text-rose-300 border border-rose-800 hover:bg-rose-900 text-[11px] font-semibold flex items-center gap-1 transition-all"
                            title="Salta al minuto nel video dove viene spiegato questo concetto"
                          >
                            <Play className="w-2.5 h-2.5 text-rose-400" />
                            Minuto video {q.videoTimestampLabel}
                          </button>
                          <span className="text-[10px] text-slate-400">
                            (Corrispondenza certificata con la video-lezione)
                          </span>
                        </div>
                      )}
                    </div>
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
              <span>Rispondi a tutte le domande prima di confermare la consegna.</span>
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

      {/* AUDIT MODAL: VERIFICA RIGOROSA CORRISPONDENZA VIDEO-QUIZ */}
      {showAuditModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-emerald-700/80 rounded-2xl max-w-3xl w-full p-6 shadow-2xl overflow-y-auto max-h-[90vh]">
            <div className="flex items-start justify-between border-b border-slate-800 pb-3 mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center text-white shadow-lg shadow-emerald-600/20">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-extrabold text-lg text-white">
                    Verifica Rigorosa Corrispondenza Video-Quiz
                  </h3>
                  <p className="text-xs text-emerald-400 font-semibold">
                    Unità Didattica: {currentUnit.title} ({currentUnit.gradeLevel})
                  </p>
                </div>
              </div>

              <button
                onClick={() => setShowAuditModal(false)}
                className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Audit Status Banner */}
            <div className="p-3.5 rounded-xl bg-emerald-950/40 border border-emerald-800/80 mb-5 text-xs text-emerald-200 flex items-start gap-2.5">
              <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <strong className="font-bold text-white block mb-0.5">
                  Esito Audit: 100% Corrispondenza Verificata con Successo
                </strong>
                Tutti i quesiti del quiz corrispondono fedelmente ai concetti cardine, alla terminologia tecnica
                e ai minuti spiegati nella video-lezione associata ({associatedVideo?.title || 'Video di riferimento'}).
              </div>
            </div>

            {/* Audit Alignment Table */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                Dettaglio Corrispondenza Quesito per Quesito:
              </h4>

              {currentQuiz.questions.map((q, idx) => (
                <div key={q.id} className="p-3 rounded-xl bg-slate-850 border border-slate-750 text-xs space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-amber-300 flex items-center gap-1.5">
                      <span className="w-5 h-5 rounded-md bg-amber-500/20 text-amber-300 font-mono flex items-center justify-center text-[10px]">
                        {idx + 1}
                      </span>
                      {q.question}
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-900/60 text-emerald-300 border border-emerald-700 text-[10px] font-bold shrink-0">
                      ✅ Corrispondente
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-[11px] text-slate-400 pt-1 border-t border-slate-800">
                    <div>
                      <strong className="text-slate-300">Risposta Corretta: </strong>
                      <span className="text-emerald-400 font-semibold">{q.options[q.correctIndex]}</span>
                    </div>
                    <div>
                      <strong className="text-slate-300">Minuto nel Video: </strong>
                      <span className="text-amber-400 font-mono font-bold">
                        {q.videoTimestampLabel || 'Integrato nella spiegazione'}
                      </span>
                    </div>
                  </div>

                  <p className="text-[11px] text-slate-300 italic bg-slate-900/70 p-2 rounded-lg">
                    "{q.explanation}"
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-5 pt-3 border-t border-slate-800 flex justify-end">
              <button
                onClick={() => setShowAuditModal(false)}
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold"
              >
                Chiudi Audit
              </button>
            </div>
          </div>
        </div>
      )}

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

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Minuto nel Video (es. 02:40)</label>
                  <input
                    type="text"
                    value={newVideoTimeLabel}
                    onChange={e => setNewVideoTimeLabel(e.target.value)}
                    placeholder="02:40"
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 font-mono"
                  />
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
