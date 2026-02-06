export type Question = {
  id: string;
  subject: string;
  chapter?: string;
  question: string;
  answer: string;
  explanation?: string;
  type: "theory" | "mcq";
};

export type MCQ = {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
};

export type Subject = {
  id: string;
  name: string;
  description: string;
  chapters?: string[];
  questionCount: number;
};
