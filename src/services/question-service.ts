import { getQuestionsBySubject, getQuestionsByChapter } from "@/data/questions";
import type { Question } from "@/types/question";

/**
 * Get questions by subject and optionally by chapter
 */
export function getQuestions(
  subject: string,
  chapter?: string
): Question[] {
  if (chapter) {
    return getQuestionsByChapter(subject, chapter);
  }
  return getQuestionsBySubject(subject);
}

/**
 * Get a random question from a subject
 */
export function getRandomQuestion(
  subject: string,
  chapter?: string
): Question | null {
  const questions = getQuestions(subject, chapter);
  if (questions.length === 0) return null;
  const randomIndex = Math.floor(Math.random() * questions.length);
  return questions[randomIndex];
}
