import type { FinalQuestion } from "../types";

export type Question = [question: string, answer: string];
export type Category = {
  heading: string;
  questions: [Question, Question, Question, Question, Question];
};
export type Board = [Category, Category, Category, Category, Category];
export type Game = {
  title: string;
  board: Board;
};

const gameImports = import.meta.globEager("./games/*.ts");

const games: Game[] = [
  ...Object.values(gameImports).map((game) => game.default),
];

export const finalQuestion: FinalQuestion = {
  question:
    "If aqueous ammonia is added to an aqueous copper (II) sulfate solution (light blue), the ammonia molecules will replace the water molecules. The light seen will change from light blue to _____.",
  answer: "What is dark blue / purple",
  category: "Colour of Complex Ions",
};

export default games;
