import React, { useState, useEffect } from 'react';
import { 
  MediaResource, 
  VideoCheckpointQuestion, 
  VideoTranscriptItem, 
  Student, 
  CalendarEvent,
  GradeLevel 
} from '../../types';
import { 
  Youtube, 
  Play, 
  CheckCircle2, 
  XCircle, 
  RotateCcw, 
  Clock, 
  BookOpen, 
  Award, 
  Calendar, 
  Share2, 
  Plus, 
  Edit3, 
  Trash2, 
  Printer, 
  ExternalLink, 
  UserCheck, 
  ChevronRight, 
  Check, 
  X, 
  Sparkles, 
  HelpCircle,
  Search,
  Sliders,
  GraduationCap,
  Volume2
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface VideoEdpuzzleQuizProps {
  resources: MediaResource[];
  initialResourceId?: string;
  currentClass: string;
  students?: Student[];
  onAssignToCalendar?: (event: CalendarEvent) => void;
  onRecordGrade?: (studentId: string, gradeValue: number, subject: string) => void;
  onUpdateResource?: (updatedResource: MediaResource) => void;
  onClose?: () => void;
}

export const VideoEdpuzzleQuiz: React.FC<VideoEdpuzzleQuizProps> = ({
  resources,
  initialResourceId,
  currentClass,
  students = [],
  onAssignToCalendar,
  onRecordGrade,
  onUpdateResource,
  onClose
}) => {
  // Only video resources that have YouTube ID
  const videoResources = resources.filter(r => r.type === 'video' && r.youtubeId);

  // Selected video
  const [selectedVideoId, setSelectedVideoId] = useState<string>(
    initialResourceId || (videoResources[0]?.id || '')
  );

  const currentVideo = videoResources.find(v => v.id === selectedVideoId) || videoResources[0];

  // Mode: 'student' (answering interactive checkpoints) vs 'teacher' (editing checkpoints & assigning)
  const [mode, setMode] = useState<'student' | 'teacher'>('student');

  // Active sub-tab in student mode: 'quiz' | 'transcript'
  const [activeTab, setActiveTab] = useState<'quiz' | 'transcript'>('quiz');

  // Video playback timestamp seek (seconds)
  const [seekSeconds, setSeekSeconds] = useState<number>(0);
  const [playerIframeKey, setPlayerIframeKey] = useState<number>(0);

  // Checkpoints for current video
  const [questions, setQuestions] = useState<VideoCheckpointQuestion[]>(
    currentVideo?.edpuzzleQuestions || []
  );

  // Active question index in Student Mode
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState<number>(0);

  // Student Answers map: questionId -> selected Option Index
  const [userAnswers, setUserAnswers] = useState<Record<string, number>>({});
  // Confirmed questions: questionId -> true
  const [confirmedQuestions, setConfirmedQuestions] = useState<Record<string, boolean>>({});

  // Feedback state
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  // Transcript search
  const [transcriptSearch, setTranscriptSearch] = useState<string>('');

  // Teacher Editor Modal: Add / Edit question
  const [showQuestionModal, setShowQuestionModal] = useState<boolean>(false);
  const [editingQuestion, setEditingQuestion] = useState<VideoCheckpointQuestion | null>(null);
  const [qTimestampLabel, setQTimestampLabel] = useState<string>('01:30');
  const [qTimestampSeconds, setQTimestampSeconds] = useState<number>(90);
  const [qText, setQText] = useState<string>('');
  const [qOptions, setQOptions] = useState<string[]>(['', '', '', '']);
  const [qCorrectIndex, setQCorrectIndex] = useState<number>(0);
  const [qExplanation, setQExplanation] = useState<string>('');
  const [qTranscriptSnippet, setQTranscriptSnippet] = useState<string>('');

  // Class Assignment Modal
  const [showAssignModal, setShowAssignModal] = useState<boolean>(false);
  const [assignClass, setAssignClass] = useState<string>(currentClass || '2ª B');
  const [assignDueDate, setAssignDueDate] = useState<string>('2026-10-25');
  const [assignSuccessMessage, setAssignSuccessMessage] = useState<string>('');

  // Record Grade Modal
  const [showGradeModal, setShowGradeModal] = useState<boolean>(false);
  const [selectedStudentId, setSelectedStudentId] = useState<string>(students[0]?.id || '');
  const [gradeSuccessMessage, setGradeSuccessMessage] = useState<string>('');

  // Sync questions when video changes
  useEffect(() => {
    if (currentVideo) {
      setQuestions(currentVideo.edpuzzleQuestions || []);
      setCurrentQuestionIdx(0);
      setUserAnswers({});
      setConfirmedQuestions({});
      setIsCompleted(false);
      setSeekSeconds(0);
      setPlayerIframeKey(k => k + 1);
    }
  }, [currentVideo?.id]);

  if (!currentVideo) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-center bg-slate-900 rounded-3xl border border-slate-800 text-slate-300">
        <Youtube className="w-12 h-12 text-rose-500 mb-3 animate-pulse" />
        <h3 className="font-bold text-lg text-white mb-1">Nessun video disponibile per il Quiz EdPuzzle</h3>
        <p className="text-xs text-slate-400 max-w-sm">
          Aggiungi un video dalla Libreria Multimediale con link o preset YouTube per visualizzare il quiz interattivo.
        </p>
      </div>
    );
  }

  // Handle seeking video
  const handleSeek = (seconds: number) => {
    setSeekSeconds(seconds);
    setPlayerIframeKey(k => k + 1);
  };

  // Jump to a specific question checkpoint
  const handleSelectQuestionIndex = (idx: number) => {
    setCurrentQuestionIdx(idx);
    const targetQ = questions[idx];
    if (targetQ) {
      handleSeek(targetQ.timestampSeconds);
    }
  };

  // Student selects an option
  const handleSelectOption = (qId: string, optIdx: number) => {
    if (confirmedQuestions[qId]) return; // locked once confirmed
    setUserAnswers(prev => ({ ...prev, [qId]: optIdx }));
  };

  // Student confirms answer
  const handleConfirmAnswer = (q: VideoCheckpointQuestion) => {
    if (userAnswers[q.id] === undefined) return;
    setConfirmedQuestions(prev => ({ ...prev, [q.id]: true }));

    const isCorrect = userAnswers[q.id] === q.correctIndex;
    if (isCorrect) {
      confetti({
        particleCount: 30,
        spread: 60,
        origin: { y: 0.7 }
      });
    }

    // Check if this was the last question
    const allAnswered = questions.every(item => 
      item.id === q.id ? true : confirmedQuestions[item.id]
    );

    if (allAnswered) {
      setIsCompleted(true);
      confetti({
        particleCount: 80,
        spread: 90,
        origin: { y: 0.5 }
      });
    }
  };

  // Score computation
  const correctCount = questions.reduce((acc, q) => {
    return acc + (confirmedQuestions[q.id] && userAnswers[q.id] === q.correctIndex ? 1 : 0);
  }, 0);

  const gradeOutOfTen = questions.length > 0 
    ? Math.round(((correctCount / questions.length) * 6 + 4) * 10) / 10 
    : 10;

  // Restart quiz
  const handleRestartQuiz = () => {
    setUserAnswers({});
    setConfirmedQuestions({});
    setIsCompleted(false);
    setCurrentQuestionIdx(0);
    handleSeek(0);
  };

  // Teacher Save Question (New or Edit)
  const handleSaveQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!qText.trim()) return;

    let updatedQuestionsList: VideoCheckpointQuestion[];

    if (editingQuestion) {
      updatedQuestionsList = questions.map(q => 
        q.id === editingQuestion.id 
          ? {
              ...q,
              timestampLabel: qTimestampLabel,
              timestampSeconds: qTimestampSeconds,
              question: qText.trim(),
              options: qOptions,
              correctIndex: qCorrectIndex,
              explanation: qExplanation.trim(),
              transcriptSnippet: qTranscriptSnippet.trim()
            }
          : q
      );
    } else {
      const newQ: VideoCheckpointQuestion = {
        id: `edp-custom-${Date.now()}`,
        timestampLabel: qTimestampLabel,
        timestampSeconds: qTimestampSeconds,
        question: qText.trim(),
        options: qOptions,
        correctIndex: qCorrectIndex,
        explanation: qExplanation.trim(),
        transcriptSnippet: qTranscriptSnippet.trim() || 'Riferimento alla spiegazione del video a questo minuto.'
      };
      updatedQuestionsList = [...questions, newQ].sort((a, b) => a.timestampSeconds - b.timestampSeconds);
    }

    setQuestions(updatedQuestionsList);

    // Update resource state
    if (onUpdateResource) {
      onUpdateResource({
        ...currentVideo,
        edpuzzleQuestions: updatedQuestionsList
      });
    }

    setShowQuestionModal(false);
    setEditingQuestion(null);
  };

  // Teacher Delete Question
  const handleDeleteQuestion = (qId: string) => {
    const filtered = questions.filter(q => q.id !== qId);
    setQuestions(filtered);
    if (onUpdateResource) {
      onUpdateResource({
        ...currentVideo,
        edpuzzleQuestions: filtered
      });
    }
  };

  // Open Teacher Editor for a specific timestamp
  const handleOpenAddQuestionAt = (timeStr: string, seconds: number, snippet: string) => {
    setEditingQuestion(null);
    setQTimestampLabel(timeStr);
    setQTimestampSeconds(seconds);
    setQTranscriptSnippet(snippet);
    setQText('');
    setQOptions(['', '', '', '']);
    setQCorrectIndex(0);
    setQExplanation('');
    setShowQuestionModal(true);
  };

  // Assign to Calendar
  const handleConfirmAssign = () => {
    if (onAssignToCalendar) {
      const newEvent: CalendarEvent = {
        id: `cal-edp-${Date.now()}`,
        title: `EdPuzzle: ${currentVideo.title}`,
        classId: assignClass,
        gradeLevel: currentVideo.gradeLevel,
        date: assignDueDate,
        type: 'video_quiz_edpuzzle',
        description: `Visione del video con checkpoint interattivi e verifica di ${questions.length} domande basate sulla trascrizione.`,
        completed: false
      };
      onAssignToCalendar(newEvent);
      setAssignSuccessMessage(`Quiz EdPuzzle assegnato con successo alla classe ${assignClass} per il ${assignDueDate}!`);
      setTimeout(() => {
        setAssignSuccessMessage('');
        setShowAssignModal(false);
      }, 2000);
    }
  };

  // Record Grade to Student
  const handleConfirmRecordGrade = () => {
    if (onRecordGrade && selectedStudentId) {
      onRecordGrade(selectedStudentId, gradeOutOfTen, `Video Quiz EdPuzzle: ${currentVideo.title.slice(0, 30)}...`);
      const studentName = students.find(s => s.id === selectedStudentId)?.name || 'Studente';
      setGradeSuccessMessage(`Voto ${gradeOutOfTen} registrato con successo per ${studentName}!`);
      setTimeout(() => {
        setGradeSuccessMessage('');
        setShowGradeModal(false);
      }, 2000);
    }
  };

  // Filtered transcript lines
  const filteredTranscript = (currentVideo.transcript || []).filter(item => {
    if (!transcriptSearch.trim()) return true;
    const term = transcriptSearch.toLowerCase();
    return item.text.toLowerCase().includes(term) ||
           (item.keyConcept && item.keyConcept.toLowerCase().includes(term)) ||
           item.time.includes(term);
  });

  const activeQuestion = questions[currentQuestionIdx];

  return (
    <div className="flex flex-col h-full bg-slate-900 text-slate-100 rounded-2xl overflow-hidden border border-slate-800 shadow-2xl">
      {/* Top Header Bar */}
      <div className="bg-slate-850 px-4 py-3 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 via-rose-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-rose-500/20">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-black text-base md:text-lg text-white tracking-tight flex items-center gap-2">
                Quiz Video EdPuzzle Integrato
              </h2>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-950 text-amber-300 border border-amber-800">
                Trascrizione Fedele & Checkpoint
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Verifica interattiva dell'ascolto: domande posizionate lungo la linea temporale basate su cosa dice il docente
            </p>
          </div>
        </div>

        {/* Video selector dropdown & Mode switcher */}
        <div className="flex items-center gap-2 flex-wrap">
          {/* Select Video */}
          <select
            value={currentVideo.id}
            onChange={e => setSelectedVideoId(e.target.value)}
            className="bg-slate-900 border border-slate-700/80 rounded-xl px-3 py-2 text-xs font-semibold text-white focus:outline-none focus:border-amber-400 max-w-[240px] truncate"
          >
            {videoResources.map(v => (
              <option key={v.id} value={v.id}>
                {v.title} ({v.edpuzzleQuestions?.length || 0} Q)
              </option>
            ))}
          </select>

          {/* Mode Switcher */}
          <div className="bg-slate-900 p-1 rounded-xl border border-slate-700 flex items-center">
            <button
              onClick={() => setMode('student')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                mode === 'student'
                  ? 'bg-amber-500 text-slate-950 shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <GraduationCap className="w-3.5 h-3.5" />
              Modalità Studente
            </button>
            <button
              onClick={() => setMode('teacher')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                mode === 'teacher'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Sliders className="w-3.5 h-3.5" />
              Modalità Docente
            </button>
          </div>

          {onClose && (
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Main Workspace (Split View optimized for Tablet Landscape & LIM) */}
      <div className="flex-1 overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-0">
        
        {/* LEFT COLUMN: Video Player & Interactive Timeline (cols 12 -> 7) */}
        <div className="lg:col-span-7 flex flex-col border-b lg:border-b-0 lg:border-r border-slate-800 p-4 overflow-y-auto space-y-4">
          
          {/* Video Title Header */}
          <div className="flex items-start justify-between gap-2">
            <div>
              <div className="flex items-center gap-2 text-[11px] font-bold text-rose-400 mb-0.5">
                <Youtube className="w-3.5 h-3.5 text-red-500" />
                <span>{currentVideo.channelName || 'Canale Didattico'}</span>
                <span className="text-slate-500">•</span>
                <span className="text-slate-300">{currentVideo.gradeLevel}</span>
                <span className="text-slate-500">•</span>
                <span className="text-slate-400">{currentVideo.area}</span>
              </div>
              <h3 className="font-extrabold text-white text-base md:text-lg leading-snug">
                {currentVideo.title}
              </h3>
            </div>
            
            <div className="flex items-center gap-1.5 shrink-0">
              <button
                onClick={() => setShowAssignModal(true)}
                className="px-2.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-300 border border-slate-700 text-xs font-bold flex items-center gap-1"
                title="Assegna come compito alla classe"
              >
                <Calendar className="w-3.5 h-3.5" />
                Assegna
              </button>
            </div>
          </div>

          {/* Embedded YouTube Player */}
          <div className="w-full bg-black rounded-2xl overflow-hidden border border-slate-800 shadow-xl relative aspect-video flex items-center justify-center">
            <iframe
              key={playerIframeKey}
              className="w-full h-full"
              src={`https://www.youtube-nocookie.com/embed/${currentVideo.youtubeId}?autoplay=1&rel=0&start=${seekSeconds}&modestbranding=1`}
              title={currentVideo.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>

          {/* EdPuzzle Interactive Timeline Bar with Pinned Questions */}
          <div className="bg-slate-850 p-4 rounded-2xl border border-slate-800 space-y-2.5">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-amber-300 flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
                <Clock className="w-3.5 h-3.5" />
                Barra Temporale EdPuzzle ({questions.length} Checkpoint)
              </span>
              <span className="text-slate-400 font-mono text-[11px]">
                Progresso: {Object.keys(confirmedQuestions).length} / {questions.length} risposte
              </span>
            </div>

            {/* Timeline markers track */}
            <div className="relative py-3">
              {/* Horizontal line */}
              <div className="w-full h-2.5 bg-slate-900 rounded-full border border-slate-750 relative overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-amber-500 to-rose-500 transition-all duration-300"
                  style={{
                    width: questions.length > 0 
                      ? `${(Object.keys(confirmedQuestions).length / questions.length) * 100}%` 
                      : '0%'
                  }}
                />
              </div>

              {/* Pins positioned along timeline */}
              <div className="flex items-center justify-between mt-2.5 gap-1 overflow-x-auto no-scrollbar pt-1">
                {questions.map((q, idx) => {
                  const isConfirmed = confirmedQuestions[q.id];
                  const isCorrect = isConfirmed && userAnswers[q.id] === q.correctIndex;
                  const isCurrent = idx === currentQuestionIdx;

                  return (
                    <button
                      key={q.id}
                      onClick={() => handleSelectQuestionIndex(idx)}
                      className={`flex flex-col items-center px-2 py-1.5 rounded-xl transition-all shrink-0 min-w-[70px] border ${
                        isCurrent
                          ? 'bg-amber-500/20 border-amber-400 text-amber-200 scale-105 shadow-md shadow-amber-500/20'
                          : isConfirmed
                            ? isCorrect
                              ? 'bg-emerald-950/60 border-emerald-700 text-emerald-300'
                              : 'bg-rose-950/60 border-rose-700 text-rose-300'
                            : 'bg-slate-900 border-slate-750 text-slate-400 hover:text-white'
                      }`}
                    >
                      <div className="flex items-center gap-1 text-[11px] font-mono font-bold">
                        {isConfirmed ? (
                          isCorrect ? (
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                          ) : (
                            <XCircle className="w-3.5 h-3.5 text-rose-400" />
                          )
                        ) : (
                          <HelpCircle className="w-3.5 h-3.5 text-amber-400" />
                        )}
                        <span>{q.timestampLabel}</span>
                      </div>
                      <span className="text-[9px] font-semibold truncate max-w-[65px] mt-0.5">
                        Q{idx + 1}
                      </span>
                    </button>
                  );
                })}

                {/* Teacher "+ Aggiungi Checkpoint" button */}
                {mode === 'teacher' && (
                  <button
                    onClick={() => handleOpenAddQuestionAt('03:00', 180, '')}
                    className="flex flex-col items-center px-2.5 py-1.5 rounded-xl bg-indigo-950/60 border border-indigo-700 text-indigo-300 hover:bg-indigo-900/60 transition-all shrink-0 min-w-[70px]"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span className="text-[9px] font-bold mt-0.5">+ Domanda</span>
                  </button>
                )}
              </div>
            </div>

            {/* Quick Seek controls */}
            <div className="flex items-center justify-between text-xs pt-1 border-t border-slate-800 text-slate-400">
              <span>Salta al minuto:</span>
              <div className="flex items-center gap-1.5 flex-wrap">
                {questions.map((q, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSeek(q.timestampSeconds)}
                    className="px-2 py-0.5 rounded bg-slate-900 hover:bg-slate-800 text-[11px] font-mono font-bold text-amber-300 border border-slate-750"
                  >
                    ▶ {q.timestampLabel}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Salient Moments Summary Box (Sincronizzato 1:1) */}
          <div className="bg-slate-850 p-4 rounded-2xl border border-slate-800">
            <h4 className="font-bold text-xs uppercase tracking-wider text-rose-300 mb-2 flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5 text-rose-400" />
              Minuti Salienti Verificati nel Video (Indice Ufficiale)
            </h4>
            <div className="space-y-1.5">
              {(currentVideo.lessonTimestamps || []).map((ts, idx) => {
                const hasQuestion = questions.some(q => q.timestampLabel === ts.time);
                return (
                  <div
                    key={idx}
                    className="p-2 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center justify-between gap-3 text-xs"
                  >
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          const parts = ts.time.split(':');
                          const secs = parseInt(parts[0], 10) * 60 + parseInt(parts[1], 10);
                          handleSeek(secs);
                        }}
                        className="font-mono font-bold text-rose-400 bg-rose-950/60 px-2 py-0.5 rounded border border-rose-900/80 hover:bg-rose-900/80 flex items-center gap-1 shrink-0"
                      >
                        <Play className="w-2.5 h-2.5 fill-current" />
                        {ts.time}
                      </button>
                      <span className="text-slate-300 font-medium">{ts.note}</span>
                    </div>

                    {hasQuestion ? (
                      <span className="px-2 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-800 text-[10px] font-bold shrink-0 flex items-center gap-1">
                        <HelpCircle className="w-3 h-3" /> Checkpoint Attivo
                      </span>
                    ) : mode === 'teacher' ? (
                      <button
                        onClick={() => {
                          const parts = ts.time.split(':');
                          const secs = parseInt(parts[0], 10) * 60 + parseInt(parts[1], 10);
                          handleOpenAddQuestionAt(ts.time, secs, ts.note);
                        }}
                        className="px-2 py-0.5 rounded bg-indigo-950 text-indigo-300 border border-indigo-800 text-[10px] font-bold hover:bg-indigo-900 shrink-0"
                      >
                        + Aggiungi Quiz
                      </button>
                    ) : null}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Interactive Quiz Card or Synchronized Transcript (cols 12 -> 5) */}
        <div className="lg:col-span-5 flex flex-col bg-slate-850 p-4 overflow-y-auto space-y-4">
          
          {/* Sub Tab Switcher (Quiz Interattivo vs Trascrizione Fedele) */}
          <div className="bg-slate-900 p-1 rounded-xl border border-slate-750 flex items-center justify-between">
            <button
              onClick={() => setActiveTab('quiz')}
              className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                activeTab === 'quiz'
                  ? 'bg-amber-500 text-slate-950 shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <HelpCircle className="w-3.5 h-3.5" />
              Domanda Checkpoint {activeQuestion ? `(${currentQuestionIdx + 1}/${questions.length})` : ''}
            </button>
            <button
              onClick={() => setActiveTab('transcript')}
              className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                activeTab === 'transcript'
                  ? 'bg-slate-800 text-white shadow-sm border border-slate-700'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              Trascrizione Fedele ({currentVideo.transcript?.length || 0})
            </button>
          </div>

          {/* TAB CONTENT 1: QUIZ INTERATTIVO EDPUZZLE */}
          {activeTab === 'quiz' && (
            <div className="space-y-4">
              {/* Finished State Summary Card */}
              {isCompleted ? (
                <div className="bg-slate-900 border-2 border-emerald-500/80 rounded-2xl p-5 text-center space-y-4 shadow-xl">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/40">
                    <Award className="w-8 h-8" />
                  </div>

                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                      Verifica Video EdPuzzle Completata!
                    </span>
                    <h3 className="font-black text-2xl text-white mt-1">
                      Punteggio: {correctCount} / {questions.length}
                    </h3>
                    <div className="mt-2 inline-flex items-center gap-1.5 bg-slate-850 px-3.5 py-1.5 rounded-full border border-slate-750">
                      <span className="text-xs text-slate-400 font-semibold">Valutazione Proposta:</span>
                      <span className="text-sm font-black text-amber-400">{gradeOutOfTen} / 10</span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed max-w-sm mx-auto">
                    {gradeOutOfTen >= 8 
                      ? 'Comprensione eccellente dei concetti spiegati nel video! Ottimo ascolto e analisi dei dettagli.'
                      : gradeOutOfTen >= 6
                        ? 'Buona comprensione generale. Rivedi i passaggi con spigoli nascosti o formule per consolidare.'
                        : 'Si consiglia di riascoltare il video con attenzione alla trascrizione e ripetere il quiz.'}
                  </p>

                  <div className="grid grid-cols-2 gap-2 pt-2">
                    <button
                      onClick={() => setShowGradeModal(true)}
                      className="py-2.5 px-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-emerald-600/20"
                    >
                      <UserCheck className="w-4 h-4" />
                      Registra Voto
                    </button>
                    <button
                      onClick={handleRestartQuiz}
                      className="py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-200 font-bold text-xs flex items-center justify-center gap-1.5 border border-slate-700"
                    >
                      <RotateCcw className="w-4 h-4" />
                      Ripeti da Capo
                    </button>
                  </div>
                </div>
              ) : activeQuestion ? (
                /* Question Card */
                <div className="bg-slate-900 rounded-2xl border border-slate-750 p-4 space-y-4 shadow-lg">
                  {/* Question Header & Timestamp */}
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-black text-xs px-2.5 py-1 rounded-lg bg-amber-500/20 text-amber-300 border border-amber-500/40 flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        Minuto {activeQuestion.timestampLabel}
                      </span>
                      <span className="text-xs font-bold text-slate-300">
                        Domanda {currentQuestionIdx + 1} di {questions.length}
                      </span>
                    </div>

                    <button
                      onClick={() => handleSeek(activeQuestion.timestampSeconds)}
                      className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-750 text-[11px] font-bold text-slate-300 flex items-center gap-1 border border-slate-700"
                      title="Riascolta questo spezzone video"
                    >
                      <RotateCcw className="w-3 h-3 text-amber-400" />
                      Riascolta
                    </button>
                  </div>

                  {/* Transcript Context Excerpt */}
                  {activeQuestion.transcriptSnippet && (
                    <div className="p-3 rounded-xl bg-slate-850 border border-slate-750 text-xs text-slate-300 space-y-1">
                      <div className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-rose-400">
                        <Volume2 className="w-3 h-3" />
                        Dalla Spiegazione Appena Ascoltata:
                      </div>
                      <p className="italic text-slate-200 leading-relaxed font-serif">
                        "{activeQuestion.transcriptSnippet}"
                      </p>
                    </div>
                  )}

                  {/* Question Statement */}
                  <div className="space-y-1">
                    <h4 className="font-extrabold text-sm md:text-base text-white leading-snug">
                      {activeQuestion.question}
                    </h4>
                  </div>

                  {/* Options List */}
                  <div className="space-y-2">
                    {activeQuestion.options.map((opt, optIdx) => {
                      const isSelected = userAnswers[activeQuestion.id] === optIdx;
                      const isConfirmed = confirmedQuestions[activeQuestion.id];
                      const isCorrect = optIdx === activeQuestion.correctIndex;

                      let optStyles = 'bg-slate-850 border-slate-750 text-slate-200 hover:border-slate-650';
                      if (isConfirmed) {
                        if (isCorrect) {
                          optStyles = 'bg-emerald-950/80 border-emerald-500 text-emerald-200 font-bold';
                        } else if (isSelected && !isCorrect) {
                          optStyles = 'bg-rose-950/80 border-rose-500 text-rose-200 line-through';
                        } else {
                          optStyles = 'bg-slate-850/50 border-slate-800 text-slate-500 opacity-60';
                        }
                      } else if (isSelected) {
                        optStyles = 'bg-amber-500/20 border-amber-400 text-white font-bold shadow-md shadow-amber-500/10';
                      }

                      return (
                        <button
                          key={optIdx}
                          disabled={isConfirmed}
                          onClick={() => handleSelectOption(activeQuestion.id, optIdx)}
                          className={`w-full p-3 rounded-xl border text-left text-xs md:text-sm transition-all flex items-start gap-3 min-h-[44px] ${optStyles}`}
                        >
                          <span className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 ${
                            isSelected ? 'bg-amber-400 text-slate-950' : 'bg-slate-800 text-slate-400'
                          }`}>
                            {String.fromCharCode(65 + optIdx)}
                          </span>
                          <span className="leading-snug flex-1">{opt}</span>
                          {isConfirmed && isCorrect && (
                            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                          )}
                          {isConfirmed && isSelected && !isCorrect && (
                            <XCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {/* Feedback Explanation (after confirm) */}
                  {confirmedQuestions[activeQuestion.id] && (
                    <div className={`p-3 rounded-xl border text-xs leading-relaxed space-y-1 ${
                      userAnswers[activeQuestion.id] === activeQuestion.correctIndex
                        ? 'bg-emerald-950/40 border-emerald-800 text-emerald-200'
                        : 'bg-rose-950/40 border-rose-800 text-rose-200'
                    }`}>
                      <div className="font-bold flex items-center gap-1.5">
                        {userAnswers[activeQuestion.id] === activeQuestion.correctIndex ? (
                          <>
                            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                            <span>Esatto! Ottima risposta</span>
                          </>
                        ) : (
                          <>
                            <XCircle className="w-4 h-4 text-rose-400" />
                            <span>Risposta errata</span>
                          </>
                        )}
                      </div>
                      <p className="text-slate-300">
                        {activeQuestion.explanation}
                      </p>
                    </div>
                  )}

                  {/* Controls / Next */}
                  <div className="pt-2 flex items-center justify-between border-t border-slate-800 gap-2">
                    <button
                      disabled={currentQuestionIdx === 0}
                      onClick={() => handleSelectQuestionIndex(currentQuestionIdx - 1)}
                      className="px-3 py-2 rounded-xl bg-slate-800 text-slate-300 disabled:opacity-30 text-xs font-semibold"
                    >
                      Precedente
                    </button>

                    {!confirmedQuestions[activeQuestion.id] ? (
                      <button
                        disabled={userAnswers[activeQuestion.id] === undefined}
                        onClick={() => handleConfirmAnswer(activeQuestion)}
                        className="flex-1 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-rose-600 hover:from-amber-400 hover:to-rose-500 disabled:opacity-40 text-slate-950 font-black text-xs shadow-lg shadow-amber-500/20"
                      >
                        Conferma Risposta
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          if (currentQuestionIdx < questions.length - 1) {
                            handleSelectQuestionIndex(currentQuestionIdx + 1);
                          } else {
                            setIsCompleted(true);
                          }
                        }}
                        className="flex-1 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-emerald-600/20"
                      >
                        {currentQuestionIdx < questions.length - 1 ? (
                          <>Continua al Prossimo Checkpoint <ChevronRight className="w-4 h-4" /></>
                        ) : (
                          <>Vedi Risultato Finale <Award className="w-4 h-4" /></>
                        )}
                      </button>
                    )}
                  </div>
                </div>
              ) : (
                <div className="p-8 text-center bg-slate-900 rounded-2xl border border-slate-800">
                  <p className="text-xs text-slate-400">Nessuna domanda presente per questo video.</p>
                </div>
              )}
            </div>
          )}

          {/* TAB CONTENT 2: TRASCRIZIONE FEDELE SINCRONIZZATA */}
          {activeTab === 'transcript' && (
            <div className="space-y-3">
              {/* Transcript Search Bar */}
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Cerca parole nella trascrizione del docente..."
                  value={transcriptSearch}
                  onChange={e => setTranscriptSearch(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-750 rounded-xl pl-8 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                />
              </div>

              {/* Transcript Line-by-Line Cards */}
              <div className="space-y-2">
                {filteredTranscript.map((item, idx) => {
                  const hasEdpuzzleQ = questions.find(q => q.timestampLabel === item.time);
                  
                  return (
                    <div
                      key={idx}
                      className="p-3 rounded-xl bg-slate-900 border border-slate-750 hover:border-slate-650 transition-all space-y-1.5"
                    >
                      <div className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleSeek(item.seconds)}
                            className="font-mono font-bold text-amber-400 bg-amber-950/60 px-2 py-0.5 rounded border border-amber-800 text-[11px] flex items-center gap-1 hover:bg-amber-900/60"
                          >
                            <Play className="w-2.5 h-2.5 fill-current" />
                            {item.time}
                          </button>
                          <span className="font-bold text-slate-300 text-[11px]">
                            {item.speaker || 'Docente'}
                          </span>
                        </div>

                        {item.keyConcept && (
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-rose-300 border border-slate-700 font-semibold truncate max-w-[160px]">
                            {item.keyConcept}
                          </span>
                        )}
                      </div>

                      <p className="text-xs text-slate-200 leading-relaxed">
                        {item.text}
                      </p>

                      {/* Action triggers */}
                      <div className="flex items-center justify-between pt-1 border-t border-slate-800/80">
                        {hasEdpuzzleQ ? (
                          <button
                            onClick={() => {
                              const qIdx = questions.findIndex(q => q.id === hasEdpuzzleQ.id);
                              if (qIdx >= 0) {
                                handleSelectQuestionIndex(qIdx);
                                setActiveTab('quiz');
                              }
                            }}
                            className="text-[10px] font-bold text-amber-400 hover:text-amber-300 flex items-center gap-1"
                          >
                            <HelpCircle className="w-3 h-3" />
                            Apri Quiz Checkpoint collegato
                          </button>
                        ) : mode === 'teacher' ? (
                          <button
                            onClick={() => handleOpenAddQuestionAt(item.time, item.seconds, item.text)}
                            className="text-[10px] font-bold text-indigo-400 hover:text-indigo-300 flex items-center gap-1"
                          >
                            <Plus className="w-3 h-3" />
                            Crea Domanda per questo minuto
                          </button>
                        ) : (
                          <span className="text-[10px] text-slate-500">
                            Minuto saliente per la spiegazione
                          </span>
                        )}

                        <button
                          onClick={() => handleSeek(item.seconds)}
                          className="text-[10px] text-slate-400 hover:text-white"
                        >
                          Ascolta da qui ▶
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* TEACHER QUESTION MODAL (Add / Edit Question at Timestamp) */}
      {showQuestionModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-xl w-full p-5 md:p-6 shadow-2xl overflow-y-auto max-h-[90vh] space-y-4">
            <div className="flex items-start justify-between border-b border-slate-800 pb-3">
              <div>
                <h3 className="font-extrabold text-base md:text-lg text-white flex items-center gap-2">
                  <Edit3 className="w-5 h-5 text-amber-400" />
                  {editingQuestion ? 'Modifica Domanda EdPuzzle' : 'Aggiungi Domanda EdPuzzle al Video'}
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Posiziona il quesito sul timestamp e cita la trascrizione del docente.
                </p>
              </div>
              <button
                onClick={() => setShowQuestionModal(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveQuestion} className="space-y-3.5">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-400 mb-1">
                    Minuto del Video (MM:SS)
                  </label>
                  <input
                    type="text"
                    required
                    value={qTimestampLabel}
                    onChange={e => {
                      setQTimestampLabel(e.target.value);
                      const parts = e.target.value.split(':');
                      if (parts.length === 2) {
                        const s = (parseInt(parts[0], 10) || 0) * 60 + (parseInt(parts[1], 10) || 0);
                        setQTimestampSeconds(s);
                      }
                    }}
                    placeholder="Es. 02:40"
                    className="w-full bg-slate-850 border border-slate-700 rounded-xl px-3 py-2 text-xs font-mono text-white focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-400 mb-1">
                    Trascrizione di riferimento citata
                  </label>
                  <input
                    type="text"
                    value={qTranscriptSnippet}
                    onChange={e => setQTranscriptSnippet(e.target.value)}
                    placeholder="Frase pronunciata dal docente nel video"
                    className="w-full bg-slate-850 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-400 mb-1">
                  Testo della Domanda
                </label>
                <textarea
                  required
                  rows={2}
                  value={qText}
                  onChange={e => setQText(e.target.value)}
                  placeholder="Es. Come sono orientati i raggi proiettanti nel Triedro di Monge?"
                  className="w-full bg-slate-850 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              {/* 4 Options */}
              <div className="space-y-2">
                <label className="block text-[11px] font-bold text-slate-400">
                  Opzioni di Risposta (seleziona il radiobutton per la risposta corretta):
                </label>
                {qOptions.map((opt, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="correctOptionRadio"
                      checked={qCorrectIndex === idx}
                      onChange={() => setQCorrectIndex(idx)}
                      className="accent-amber-400 w-4 h-4 cursor-pointer"
                    />
                    <span className="font-bold text-xs text-slate-400 w-4">
                      {String.fromCharCode(65 + idx)}.
                    </span>
                    <input
                      type="text"
                      required
                      value={opt}
                      onChange={e => {
                        const updated = [...qOptions];
                        updated[idx] = e.target.value;
                        setQOptions(updated);
                      }}
                      placeholder={`Opzione ${String.fromCharCode(65 + idx)}`}
                      className="flex-1 bg-slate-850 border border-slate-700 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>
                ))}
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-400 mb-1">
                  Spiegazione Didattica (mostrata dopo la risposta)
                </label>
                <input
                  type="text"
                  required
                  value={qExplanation}
                  onChange={e => setQExplanation(e.target.value)}
                  placeholder="Es. Come spiegato nel video, l'ortogonalità richiede raggi a 90°..."
                  className="w-full bg-slate-850 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowQuestionModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-xs font-semibold text-slate-300"
                >
                  Annulla
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-lg shadow-amber-500/20"
                >
                  Salva Domanda
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* CLASS ASSIGNMENT MODAL */}
      {showAssignModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-start justify-between border-b border-slate-800 pb-3">
              <div>
                <h3 className="font-extrabold text-base text-white flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-amber-400" />
                  Assegna Video Quiz alla Classe
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Crea una scadenza didattica nel calendario delle lezioni.
                </p>
              </div>
              <button
                onClick={() => setShowAssignModal(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {assignSuccessMessage ? (
              <div className="p-4 rounded-xl bg-emerald-950 border border-emerald-600 text-emerald-200 text-xs font-bold text-center">
                {assignSuccessMessage}
              </div>
            ) : (
              <div className="space-y-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-400 mb-1">Classe Destinataria</label>
                  <select
                    value={assignClass}
                    onChange={e => setAssignClass(e.target.value)}
                    className="w-full bg-slate-850 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                  >
                    <option value="1ª A">1ª A</option>
                    <option value="1ª B">1ª B</option>
                    <option value="2ª A">2ª A</option>
                    <option value="2ª B">2ª B</option>
                    <option value="3ª A">3ª A</option>
                    <option value="3ª C">3ª C</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-400 mb-1">Data Scadenza Consegna</label>
                  <input
                    type="date"
                    value={assignDueDate}
                    onChange={e => setAssignDueDate(e.target.value)}
                    className="w-full bg-slate-850 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div className="p-3 rounded-xl bg-slate-850 text-xs text-slate-300 border border-slate-750">
                  <span className="font-bold text-white block mb-0.5">{currentVideo.title}</span>
                  <span className="text-slate-400">Verifica composta da {questions.length} domande interattive basate sulla trascrizione.</span>
                </div>

                <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-800">
                  <button
                    type="button"
                    onClick={() => setShowAssignModal(false)}
                    className="px-4 py-2 rounded-xl bg-slate-800 text-xs font-semibold text-slate-300"
                  >
                    Annulla
                  </button>
                  <button
                    type="button"
                    onClick={handleConfirmAssign}
                    className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-lg shadow-amber-500/20"
                  >
                    Conferma Assegnazione
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* RECORD GRADE MODAL */}
      {showGradeModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-start justify-between border-b border-slate-800 pb-3">
              <div>
                <h3 className="font-extrabold text-base text-white flex items-center gap-2">
                  <UserCheck className="w-5 h-5 text-emerald-400" />
                  Registra Valutazione nel Registro
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Salva il voto conseguito dallo studente nel registro valutazioni.
                </p>
              </div>
              <button
                onClick={() => setShowGradeModal(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {gradeSuccessMessage ? (
              <div className="p-4 rounded-xl bg-emerald-950 border border-emerald-600 text-emerald-200 text-xs font-bold text-center">
                {gradeSuccessMessage}
              </div>
            ) : (
              <div className="space-y-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-400 mb-1">Seleziona Studente ({currentClass})</label>
                  <select
                    value={selectedStudentId}
                    onChange={e => setSelectedStudentId(e.target.value)}
                    className="w-full bg-slate-850 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-400"
                  >
                    {students.map(s => (
                      <option key={s.id} value={s.id}>
                        {s.name} {s.besDsa ? '(BES/DSA)' : ''}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="p-3 rounded-xl bg-slate-850 border border-slate-750 flex items-center justify-between">
                  <div>
                    <span className="text-xs text-slate-400 block">Voto da registrare:</span>
                    <span className="text-lg font-black text-emerald-400">{gradeOutOfTen} / 10</span>
                  </div>
                  <span className="text-[11px] px-2.5 py-1 rounded bg-slate-800 text-slate-300 font-semibold border border-slate-700">
                    Tipo: Quiz Video EdPuzzle
                  </span>
                </div>

                <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-800">
                  <button
                    type="button"
                    onClick={() => setShowGradeModal(false)}
                    className="px-4 py-2 rounded-xl bg-slate-800 text-xs font-semibold text-slate-300"
                  >
                    Annulla
                  </button>
                  <button
                    type="button"
                    onClick={handleConfirmRecordGrade}
                    className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-lg shadow-emerald-600/20"
                  >
                    Salva nel Registro
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
