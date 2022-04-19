<script setup lang="ts">
import { computed, ref, type Ref } from "vue";
import gameJson from "../data/games";
import type { Board, Question } from "../types";
import InfoCard from "./InfoCard.vue";

const props = defineProps<{ gameNumber: number }>();

const games: Board[] = gameJson.map((game) =>
  game.map((category) => {
    return {
      heading: category.heading,
      questions: category.questions.map((question, index) => {
        return {
          question: question[0],
          answer: question[1],
          points: (index + 1) * 100,
          completed: false,
        };
      }),
    };
  })
);

const currentGame = computed(() => games[props.gameNumber]);
const currentQuestion: Ref<Question | null> = ref(null);

// generate proper display board from games
</script>

<template>
  <div class="container">
    <div class="table">
      <template v-for="(category, i) in currentGame" :key="i">
        <p>{{ category.heading }}</p>
        <InfoCard
          v-for="(question, index) in category.questions"
          :question="question"
          :column-no="i"
          :completed="question.completed"
          :key="index"
        />
      </template>
    </div>
  </div>
</template>

<style scoped>
@import "../assets/colors.css";

.container {
  background: #ec1f64;
  position: relative;
}

.table {
  gap: 2vh;
  display: grid;
  grid-auto-flow: column;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  grid-template-rows: repeat(6, minmax(0, 1fr));
  height: 100%;
  margin-bottom: 5vh;
  margin-left: 5vw;
  margin-right: 5vw;
}

.table > p {
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 1vw;
  font-size: 5vmin;
  transition: all 0.25s ease;
  user-select: none;
  background: #ececec;
  color: black;
}

.table > p:nth-child(6n-5) {
  /* headers */
  color: white;
  border: none;
  font-size: 3vw;
  background: none;
}
</style>
