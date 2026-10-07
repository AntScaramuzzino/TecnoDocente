import React, { useState } from 'react';
import { ActiveTab, DidacticUnit, LessonPlan, MediaResource, Student, CalendarEvent } from './types';
import { 
  INITIAL_UNITS, 
  INITIAL_LESSON_PLANS, 
  INITIAL_RESOURCES, 
  INITIAL_STUDENTS_2B, 
  INITIAL_CALENDAR_EVENTS 
} from './data/mockData';
import { Header } from './components/Header';
import { Navigation } from './components/Navigation';
import { DashboardOverview } from './components/DashboardOverview';
import { OrthographicSimulator } from './components/simulator/OrthographicSimulator';
import { TechnicalDrawingLab } from './components/simulator/TechnicalDrawingLab';
import { LessonPlanner } from './components/lessons/LessonPlanner';
import { MultimediaLibrary } from './components/multimedia/MultimediaLibrary';
import { EvaluationSystem } from './components/evaluation/EvaluationSystem';
import { DidacticCalendar } from './components/calendar/DidacticCalendar';
import { UnitQuizModule } from './components/quizzes/UnitQuizModule';
import { VideoEdpuzzleQuiz } from './components/multimedia/VideoEdpuzzleQuiz';
import { QuickTeacherTools } from './components/QuickTeacherTools';
import { Box, Compass } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('panoramica');
  const [currentClass, setCurrentClass] = useState<string>('2ª B');
  const [simulatorSubTab, setSimulatorSubTab] = useState<'po' | 'disegno'>('po');
  const [edpuzzleTargetVideoId, setEdpuzzleTargetVideoId] = useState<string | undefined>(undefined);
  const [targetUnitId, setTargetUnitId] = useState<string>('u3-proiezioni-ortogonali');

  // Application States
  const [units, setUnits] = useState<DidacticUnit[]>(INITIAL_UNITS);
  const [lessonPlans, setLessonPlans] = useState<LessonPlan[]>(INITIAL_LESSON_PLANS);
  const [resources, setResources] = useState<MediaResource[]>(INITIAL_RESOURCES);
  const [students, setStudents] = useState<Student[]>(INITIAL_STUDENTS_2B);
  const [calendarEvents, setCalendarEvents] = useState<CalendarEvent[]>(INITIAL_CALENDAR_EVENTS);

  // Handlers
  const handleOpenUnitQuiz = (unitId: string) => {
    setTargetUnitId(unitId);
    setActiveTab('quiz');
  };

  const handleOpenEdpuzzle = (videoId?: string) => {
    if (videoId) {
      setEdpuzzleTargetVideoId(videoId);
    }
    setActiveTab('edpuzzle');
  };

  const handleOpenSimulator = () => {
    setActiveTab('proiezioni_disegno');
    setSimulatorSubTab('po');
  };

  const handleAddUnit = (newUnit: DidacticUnit) => {
    setUnits(prev => [newUnit, ...prev]);
  };

  const handleAddLessonPlan = (newPlan: LessonPlan) => {
    setLessonPlans(prev => [newPlan, ...prev]);
  };

  const handleAddResource = (newRes: MediaResource) => {
    setResources(prev => [newRes, ...prev]);
  };

  const handleUpdateResource = (updatedResource: MediaResource) => {
    setResources(prev => prev.map(r => r.id === updatedResource.id ? updatedResource : r));
  };

  const handleToggleResourceFavorite = (id: string) => {
    setResources(prev => prev.map(r => r.id === id ? { ...r, favorite: !r.favorite } : r));
  };

  const handleAddCalendarEvent = (newEvent: CalendarEvent) => {
    setCalendarEvents(prev => [newEvent, ...prev]);
  };

  const handleToggleEventComplete = (eventId: string) => {
    setCalendarEvents(prev => prev.map(e => e.id === eventId ? { ...e, completed: !e.completed } : e));
  };

  const handleRecordStudentGrade = (studentId: string, gradeValue: number, subject: string) => {
    setStudents(prev => prev.map(st => {
      if (st.id === studentId) {
        const newGrade = {
          id: `grade-${Date.now()}`,
          date: new Date().toISOString().split('T')[0],
          type: 'Quiz Video EdPuzzle' as const,
          subject,
          value: gradeValue,
          notes: 'Valutazione formativa completata tramite checkpoint video EdPuzzle sulla trascrizione.'
        };
        return {
          ...st,
          grades: [newGrade, ...st.grades]
        };
      }
      return st;
    }));
  };

  const pendingEventsCount = calendarEvents.filter(e => !e.completed).length;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans select-none antialiased">
      {/* Top Tablet Header */}
      <Header
        currentClass={currentClass}
        onSelectClass={setCurrentClass}
        pendingDeliveriesCount={pendingEventsCount}
      />

      {/* Navigation Bar (Tablet Touch Optimized) */}
      <Navigation
        activeTab={activeTab}
        onChangeTab={setActiveTab}
      />

      {/* Main Workspace Area */}
      <main className="flex-1 p-3 md:p-6 overflow-hidden flex flex-col">
        {/* TAB 1: PANORAMICA (HOME) */}
        {activeTab === 'panoramica' && (
          <DashboardOverview
            currentClass={currentClass}
            units={units}
            students={students}
            events={calendarEvents}
            onNavigateTab={setActiveTab}
            onOpenUnitQuiz={handleOpenUnitQuiz}
          />
        )}

        {/* TAB 2: PROIEZIONI ORTOGONALI & DISEGNO TECNICO */}
        {activeTab === 'proiezioni_disegno' && (
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Sub-navigation between 3D PO and 2D Drawing Lab */}
            <div className="mb-3 flex items-center justify-between bg-slate-900 p-1.5 rounded-2xl border border-slate-800 self-start">
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setSimulatorSubTab('po')}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 min-h-[42px] ${
                    simulatorSubTab === 'po'
                      ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Box className="w-4 h-4" />
                  Simulatore 3D Proiezioni Ortogonali (PO)
                </button>
                <button
                  onClick={() => setSimulatorSubTab('disegno')}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 min-h-[42px] ${
                    simulatorSubTab === 'disegno'
                      ? 'bg-teal-500 text-slate-950 shadow-md shadow-teal-500/20'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Compass className="w-4 h-4" />
                  Laboratorio Disegno Tecnico & Costruzioni
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-hidden">
              {simulatorSubTab === 'po' ? (
                <OrthographicSimulator />
              ) : (
                <TechnicalDrawingLab />
              )}
            </div>
          </div>
        )}

        {/* TAB 3: UNITÀ DIDATTICHE & LEZIONI */}
        {activeTab === 'unita_lezioni' && (
          <LessonPlanner
            units={units}
            lessonPlans={lessonPlans}
            onOpenUnitQuiz={handleOpenUnitQuiz}
            onOpenSimulator={handleOpenSimulator}
            onAddUnit={handleAddUnit}
            onAddLessonPlan={handleAddLessonPlan}
          />
        )}

        {/* TAB 4: QUIZ VIDEO EDPUZZLE SU TRASCRIZIONE */}
        {activeTab === 'edpuzzle' && (
          <VideoEdpuzzleQuiz
            resources={resources}
            initialResourceId={edpuzzleTargetVideoId}
            currentClass={currentClass}
            students={students}
            onAssignToCalendar={handleAddCalendarEvent}
            onRecordGrade={handleRecordStudentGrade}
            onUpdateResource={handleUpdateResource}
          />
        )}

        {/* TAB 5: QUIZ FINALE UNITÀ */}
        {activeTab === 'quiz' && (
          <UnitQuizModule
            units={units}
            initialUnitId={targetUnitId}
            resources={resources}
            onOpenEdpuzzle={handleOpenEdpuzzle}
          />
        )}

        {/* TAB 6: LIBRERIA RISORSE MULTIMEDIALI */}
        {activeTab === 'risorse' && (
          <MultimediaLibrary
            resources={resources}
            currentClass={currentClass}
            students={students}
            onOpenSimulator={handleOpenSimulator}
            onAddResource={handleAddResource}
            onToggleFavorite={handleToggleResourceFavorite}
            onOpenEdpuzzle={handleOpenEdpuzzle}
            onAssignToCalendar={handleAddCalendarEvent}
            onRecordGrade={handleRecordStudentGrade}
            onUpdateResource={handleUpdateResource}
          />
        )}

        {/* TAB 6: VALUTAZIONE & REGISTRO */}
        {activeTab === 'valutazione' && (
          <EvaluationSystem
            students={students}
            currentClass={currentClass}
            onUpdateStudents={setStudents}
          />
        )}

        {/* TAB 7: CALENDARIO SCADENZE */}
        {activeTab === 'calendario' && (
          <DidacticCalendar
            events={calendarEvents}
            currentClass={currentClass}
            onAddEvent={handleAddCalendarEvent}
            onToggleEventComplete={handleToggleEventComplete}
          />
        )}
      </main>

      {/* Floating Quick Teacher Tools Dock (Timer, Random Student Picker, Quick Notes) */}
      <QuickTeacherTools
        students={students}
        currentClass={currentClass}
      />
    </div>
  );
}
