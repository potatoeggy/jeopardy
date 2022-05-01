<script setup lang="ts">
import { useCounterStore } from "@/stores/counter";
import { computed, ref, watch, type Ref } from "vue";
import gameJson from "../data/games";
import type { Board, HostUser, Question } from "../types";
import InfoCard from "./InfoCard.vue";

const props = defineProps<{
  gameNumber: number;
  users: HostUser[];
  currentUserIndex: number; // we could put this into store
}>();

const emit = defineEmits(["request-buzzer", "next-user"]);

const gameData: Ref<Board[]> = ref(
  gameJson.map((game) => {
    return {
      title: game.title,
      board: game.board.map((category) => {
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
      }),
    };
  })
);

const games = ref(gameData.value.map((e) => e.board));

const gameNumberSanitised = computed(
  () => props.gameNumber % games.value.length
);
const currentGameMetadata = computed(
  () => gameData.value[gameNumberSanitised.value]
);
useCounterStore().setCurrentGame(currentGameMetadata.value.title);
const currentGame = computed(() => games.value[gameNumberSanitised.value]);

// game state
const turn = ref(0);

watch(currentGameMetadata, (value) => {
  // don't you love it when you rush things and
  // maintain it later but then your terrible
  // rushing screws you over?
  useCounterStore().setCurrentGame(value.title);
});

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
          @next-user="emit('next-user')"
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
