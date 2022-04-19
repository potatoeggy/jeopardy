<script setup lang="ts">
import { computed, ref } from "vue";
import type { Question } from "../types";

const props = defineProps<{
  question: Question;
  completed?: boolean;
  columnNo: number;
}>();

const emit = defineEmits(["completed"]);

// hardcoding let's go
const offsetLeft = computed(() => {
  const gaps = 2 * props.columnNo + "vh";
  return `calc(5vw + ${gaps} + 17% * ${props.columnNo})`;
});
const offsetBottom = computed(() => {
  const diff = 4 - (props.question.points - 100) / 100;
  const gaps = 1.5 * diff + "vh";
  return `calc(17vh + ${gaps} + 100% / 8 * ${diff})`;
});

const showQuestion = ref(false);
const showAnswer = ref(false);

const clickStart = () => {
  if (props.completed && !showQuestion.value) {
    return;
  }
  showQuestion.value = !showQuestion.value;
  showAnswer.value = false;
};

const clickAnswer = () => {
  if (!showQuestion.value) {
    emit("completed");
    return;
  }
  showAnswer.value = !showAnswer.value;
  emit("completed");
};
</script>

<template>
  <div>
    <div
      :class="['card', { completed, fullscreen: showQuestion }]"
      :style="{ '--offset-left': offsetLeft, '--offset-bottom': offsetBottom }"
      @click="clickStart"
      @click.right.prevent="clickAnswer"
    >
      <p>{{ question.points }}<span v-if="showQuestion"> points</span></p>
      <template v-if="showQuestion">
        <p>&nbsp;</p>
        <p :class="['question', { smaller: showAnswer }]">
          {{ question.question }}
        </p>
        <p class="answer" v-if="showAnswer">{{ question.answer }}</p>
      </template>
    </div>
  </div>
</template>

<style scoped>
.card:hover:not(.completed):not(.fullscreen) {
  /* tiles */
  transform: scale(1.1);
  filter: brightness(1.2);
  cursor: pointer;
  border: none;
}

.card:not(.card.fullscreen):not(.completed):not(:hover) {
  border-bottom: 0.5rem solid #bababa;
}

.card {
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 1vw;
  font-size: 5vmin;
  transition: all 0.25s ease;
  user-select: none;
  background: #ececec;
  color: black;
  width: 17%;
  height: calc(100% / 8);
  left: var(--offset-left);
  bottom: var(--offset-bottom);
}

.card.completed {
  border: 1px solid gray;
  opacity: 0.4;
  background: none;
}

.card.fullscreen {
  filter: brightness(1.2);
  border-radius: 0;
  z-index: 2;
  transform: translate(1rem 1rem);
  width: 100%;
  height: 100%;
  left: 0;
  bottom: 0;
}

.card.fullscreen {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding-top: 10%;
  box-shadow: 0.2rem 0.2rem 0.2rem 0.2rem rgb(167, 164, 164);
  background: #ececec;
  opacity: 1;
}

.question {
  font-size: 7vh;
  margin: 5%;
  text-align: center;
  transition: all 0.25s ease;
}

.question.smaller {
  font-size: 5vh;
}

.answer {
  padding-top: 4%;
  border-top: 0.1rem solid black;
  width: 80%;
  text-align: center;
  font-size: 7vh;
  transition: font-size 0.25s ease;
}
</style>
