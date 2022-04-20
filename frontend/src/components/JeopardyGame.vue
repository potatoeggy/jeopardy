<script setup lang="ts">
import { computed, ref, type Ref } from "vue";
import gameJson from "../data/games";
import type { Board, HostUser, Question } from "../types";
import InfoCard from "./InfoCard.vue";

const props = defineProps<{
  gameNumber: number;
  users: HostUser[];
  currentUserIndex: number; // we could put this into store
}>();

const emit = defineEmits(["request-buzzer"]);

const games: Ref<Board[]> = ref(
  gameJson.map((game) =>
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
  )
);

const currentGame = computed(() => games.value[props.gameNumber]);

// game state
const turn = ref(0);

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
          :users="users"
          :current-user-index="currentUserIndex"
          @completed="question.completed = !question.completed"
          @request-buzzer="emit('request-buzzer')"
        />
      </template>
    </div>
  </div>
</template>

<style scoped>
@import "../assets/colors.css";

.container {
  background: #ec1f64;
  height: 100%;
}

.table {
  gap: 2vh;
  display: grid;
  grid-auto-flow: column;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  grid-template-rows: repeat(6, minmax(0, 1fr));
  height: 100%;
  margin-bottom: 10vh;
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
  font-size: 2vw;
  background: none;
  text-align: center;
}
</style>
