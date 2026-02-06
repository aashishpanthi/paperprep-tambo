import type { Question, MCQ } from "@/types/question";

/**
 * Converts a theory question into an MCQ format
 */
export function questionToMCQ(question: Question): MCQ {
  const result = generateMCQOptions(question.answer);
  
  return {
    question: question.question,
    options: result.options,
    correctIndex: result.correctIndex,
    explanation: question.explanation || `The correct answer is: ${question.answer}`,
  };
}

/**
 * Generates multiple choice options from a correct answer
 * For MVP, creates simple variations
 */
function generateMCQOptions(correctAnswer: string): { options: string[]; correctIndex: number } {
  const options = [correctAnswer];
  
  // Generate 3 distractors (simplified for MVP)
  const distractors = [
    "None of the above",
    "All of the above",
    "Cannot be determined",
  ];
  
  // Add distractors until we have 4 options
  for (let i = 0; i < 3 && options.length < 4; i++) {
    options.push(distractors[i]);
  }
  
  // Shuffle options and track correct index
  return shuffleArray(options, correctAnswer);
}

/**
 * Shuffles an array using Fisher-Yates algorithm and returns options with correct index
 */
function shuffleArray(array: string[], correctAnswer: string): { options: string[]; correctIndex: number } {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  
  // Find correct answer index after shuffle
  const correctIndex = shuffled.findIndex((item) => item === correctAnswer);
  
  return {
    options: shuffled,
    correctIndex: correctIndex >= 0 ? correctIndex : 0,
  };
}

/**
 * Creates a fill-in-the-blank version of a question
 */
export function questionToFillBlank(question: Question): Question {
  // Simple approach: replace key terms with blanks
  const answerWords = question.answer.split(" ");
  const keyWord = answerWords.length > 0 ? answerWords[0] : question.answer;
  
  const questionText = question.question.replace(
    new RegExp(keyWord, "gi"),
    "_____"
  );
  
  return {
    ...question,
    question: questionText || question.question + " _____",
  };
}
