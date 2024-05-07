import { defineStore } from "pinia";
import type { Board, Question } from "../types";

export const useCounterStore = defineStore({
  id: "counter",
  state: () => ({
    // game state
    buttonPressed: false,
    activeQuestion: null as Question | null,
    beepUsers: [] as number[],
    gameTitle: "Unknown game",
    games: [] as Board[],
  }),
  actions: {
    toggleButtonPressed() {
      this.buttonPressed = !this.buttonPressed;
    },
    setQuestion(question: Question) {
      this.activeQuestion = question;
    },
    setUsers(users: number[]) {
      this.beepUsers = users;
    },
    setCurrentGame(gameTitle: string) {
      this.gameTitle = gameTitle;
    },
    setGamesList(games: Board[]) {
      this.games = games;
    },
  },
});
