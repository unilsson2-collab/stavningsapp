
import React from 'react';

export type ModuleCategory = 'Vardagsord' | 'Visuella mönster' | 'Ord-familjer' | 'Låneord & Vanliga fel';

export interface PatternWord {
  word: string;
  explanation?: string;
}

export interface DetectiveChallenge {
  sentence: string;
  correctWord: string;
  options: string[];
}

export interface DiagnosticChallenge {
  word: string;
  audioPrompt: string; // The word to be spoken
}

export interface SpellingModule {
  id: string;
  week: number;
  category: ModuleCategory;
  title: string;
  description: string;
  presentationWords: PatternWord[];
  practiceWords: string[]; // Standard 10-12 words
  extraWords: string[];    // Optional 5-8 extra words
  detectiveChallenges: DetectiveChallenge[];
  diagnosticTest: string[]; // Words for the final "hidden" check
}

export interface UserProgress {
  completedWeeks: number[];
  bestTimes: Record<string, number>; // moduleId -> seconds
}

export interface UserStats {
  xp: number;
  streak: number;
  runes: string[];
}

export interface WordChallenge {
  word: string;
  fullWord: string;
  context: string;
  correctAnswer: string;
  options: string[];
}

export interface GameFeedback {
  isCorrect: boolean;
  message: string;
  aiInsight: string;
}

export interface LevelConfig {
  id: string;
  title: string;
  ruleTitle: string;
  ruleExplanation: string;
  color: string;
  borderColor: string;
  icon: React.ReactNode;
  runeSymbol: string;
  examples: PatternWord[];
  challenges: WordChallenge[];
}
