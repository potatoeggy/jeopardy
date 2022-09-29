export type * from "./actions";

export type NameColor =
  | "red"
  | "blue"
  | "yellow"
  | "green"
  | "orange"
  | "purple";

export type SerialisedUser = {
  id: string;
  name: string;
  points: number;
};

export type HostUser = SerialisedUser & {
  color: NameColor;
};

export type Question = {
  question: string;
  answer: string;
  points: number;
  completed?: boolean;
};

export type Column = {
  heading: string;
  questions: Question[];
};

export type FinalQuestion = {
  question: string;
  answer: string;
  category: string;
};

export type Board = {
  title: string;
  final?: FinalQuestion;
  board: Column[];
};
