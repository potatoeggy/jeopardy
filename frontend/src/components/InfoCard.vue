<script setup lang="ts">
import { computed, nextTick, ref } from "vue";
import type { Question } from "../types";

const props = defineProps<{
  question: Question;
  completed?: boolean;
  columnNo: number;
}>();

// hardcoding let's go
const offsetLeft = computed(() => {
  const gaps = 2 * props.columnNo + "vh";
  return `calc(5vw + ${gaps} + 17% * ${props.columnNo})`;
});
const offsetBottom = computed(() => {
  const diff = 4 - (props.question.points - 100) / 100;
  const gaps = 2 * diff + "vh";
  return `calc(5vh + ${gaps} + 100% / 7.25 * ${diff})`;
});

const showQuestion = ref(false);

const clickStart = async () => {
  showQuestion.value = !showQuestion.value;
};
</script>

<template>
  <div>
    <p
      :class="['card', { completed, fullscreen: showQuestion }]"
      :style="{ '--offset-left': offsetLeft, '--offset-bottom': offsetBottom }"
      @click="clickStart"
    >
      {{ question.points }}
    </p>
  </div>
</template>

<style scoped>
p.card:hover:not(.completed):not(.fullscreen) {
  /* tiles */
  transform: scale(1.1);
  filter: brightness(1.2);
  cursor: pointer;
}

p.card {
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
  height: calc(100% / 6.75);
  left: var(--offset-left);
  bottom: var(--offset-bottom);
}

p.card.completed {
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
</style>
