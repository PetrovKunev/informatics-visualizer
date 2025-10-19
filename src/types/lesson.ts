import type { PseudocodeStep } from './visualizer';

export interface LessonSection {
  id: string;
  title: string;
  content: string;
  objective: string;
}

export interface LessonQuizQuestion {
  id: string;
  question: string;
  answers: { id: string; label: string; correct: boolean }[];
  explanation: string;
}

export interface LessonDefinition {
  slug: string;
  title: string;
  summary: string;
  heroIllustration: string;
  estimatedTime: string;
  prerequisites: string[];
  objectives: string[];
  pseudocode: PseudocodeStep[];
  sections: LessonSection[];
  quiz: LessonQuizQuestion[];
  bigO: {
    best: string;
    average: string;
    worst: string;
    space: string;
  };
}

export type LessonCollection = Record<string, LessonDefinition>;
