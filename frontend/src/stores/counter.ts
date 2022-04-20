import { defineStore } from "pinia";
import type { HostUser, Question } from "../types";

export const useCounterStore = defineStore({
  id: "counter",
  state: () => ({
    // game state
    buttonPressed: false,
    activeQuestion: null as Question | null,
    beepUsers: [] as number[],
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
  },
});
