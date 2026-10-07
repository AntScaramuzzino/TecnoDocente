export type GradeLevel = '1ª Media' | '2ª Media' | '3ª Media';

export type SubjectArea = 
  | 'Materiali & Risorse' 
  | 'Disegno Tecnico' 
  | 'Proiezioni Ortogonali' 
  | 'Energia & Fonti Rinnovabili' 
  | 'Edilizia & Città Sostenibili' 
  | 'Elettricità & Elettronica' 
  | 'Economia & Agenda 2030';

export interface DidacticUnit {
  id: string;
  title: string;
  subtitle: string;
  gradeLevel: GradeLevel;
  area: SubjectArea;
  durationHours: number;
  completedHours: number;
  objectives: string[];
  competencies: string[];
  lessonsCount: number;
  description: string;
  tags: string[];
  color: string;
  quizId: string;
  resourcesCount: number;
}

export interface LessonPlan {
  id: string;
  unitId: string;
  unitTitle: string;
  title: string;
  gradeLevel: GradeLevel;
  durationMinutes: number;
  date: string;
  phases: {
    name: string;
    durationMin: number;
    activity: string;
    method: 'Lezione frontale' | 'Laboratorio' | 'LIM / Multimediale' | 'Cooperative Learning' | 'Verifica formativa';
  }[];
  materialsNeeded: string[];
  drawingPlateNumber?: string;
  homework: string;
  notes: string;
}

export type ResourceType = 'video' | 'scheda' | 'modello3d' | 'mappa' | 'infografica';

export interface MediaResource {
  id: string;
  title: string;
  type: ResourceType;
  area: SubjectArea;
  gradeLevel: GradeLevel;
  durationOrPages?: string;
  description: string;
  thumbnailUrl?: string;
  mediaUrl: string;
  youtubeId?: string;
  channelName?: string;
  lessonTimestamps?: { time: string; note: string }[];
  tags: string[];
  favorite?: boolean;
  contentSnippet?: string;
}

export interface Student {
  id: string;
  name: string;
  classId: string;
  grades: {
    id: string;
    date: string;
    type: 'Tavola Disegno' | 'Verifica Scritta' | 'Interrogazione Orale' | 'Laboratorio STEAM';
    subject: string;
    value: number; // 4 to 10
    rubricScores?: {
      precisione?: number; // 1 to 4
      correttezza?: number;
      pulizia?: number;
      puntualita?: number;
    };
    notes?: string;
  }[];
  notes?: string;
  besDsa?: boolean;
  recoveryNeeded?: boolean;
}

export interface CalendarEvent {
  id: string;
  title: string;
  classId: string;
  gradeLevel: GradeLevel;
  date: string; // YYYY-MM-DD
  time?: string;
  type: 'consegna_tavola' | 'verifica' | 'laboratorio' | 'lezione_speciale' | 'scadenza';
  description?: string;
  unitId?: string;
  completed?: boolean;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  imageScheme?: string;
}

export interface UnitQuiz {
  id: string;
  unitId: string;
  unitTitle: string;
  gradeLevel: GradeLevel;
  area: SubjectArea;
  timeMinutes: number;
  questions: QuizQuestion[];
}

export type ActiveTab = 
  | 'panoramica'
  | 'unita_lezioni'
  | 'proiezioni_disegno'
  | 'risorse'
  | 'valutazione'
  | 'calendario'
  | 'quiz';
