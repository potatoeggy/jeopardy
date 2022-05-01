<script setup lang="ts">
import { useCounterStore } from "@/stores/counter";
import { computed, ref, watch, type Ref } from "vue";
import type { HostUser, Question } from "../types";

const props = defineProps<{
  question: Question;
  completed?: boolean;
  columnNo: number;
  users: HostUser[];
  currentUserIndex: number;
}>();

const emit = defineEmits(["completed", "exit", "request-buzzer", "next-user"]);

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

const stealAllowed = ref(false);

const timerNum = ref(20);
const timerId = ref(0);

const bgm: Ref<HTMLAudioElement | null> = ref(null);

const store = useCounterStore();

const requestBuzzer = (users: number[]) => {
  store.setUsers(users);
  emit("request-buzzer");
};

const clickStart = () => {
  if (props.completed && !showQuestion.value) {
    return;
  }
  showQuestion.value = !showQuestion.value;

  if (!showQuestion.value) {
    clearInterval(timerId.value);
    // kill music
    for (let i = 3; i <= 5; i++) {
      const tempAudio = document.getElementById(
        `audio-${i}`
      ) as HTMLAudioElement;
      tempAudio.pause();
      tempAudio.currentTime = 0;
    }
    emit("exit"); // TODO: check wincon
  }

  if (showQuestion.value) {
    setTimeout(() => {
      // kahoot music is audioref 3-5
      timerNum.value = 20;
      bgm.value = document.getElementById(
        `audio-${((Math.random() * 3) | 0) + 3}`
      ) as HTMLAudioElement;
      bgm.value.currentTime = 0;
      bgm.value?.play();
      requestBuzzer([props.currentUserIndex]);
      timerId.value = setInterval(() => {
        timerNum.value--;
        if (timerNum.value <= 0) {
          const gong = document.getElementById(
            `audio-${6}`
          ) as HTMLAudioElement;
          gong.play();
          requestBuzzer(
            (() => {
              const a: number[] = [];
              for (let i = 0; i < props.users.length; i++) {
                // why isn't there an easier way
                if (i === props.currentUserIndex) continue;
                a.push(i);
              }
              return a;
            })()
          );
          clearTimeout(timerId.value);
        }
      }, 1000);
    }, 4000);
  }
  showAnswer.value = false;
};

const clickAnswer = () => {
  if (!showQuestion.value) {
    emit("completed");
    return;
  }

  clearInterval(timerId.value);
  timerNum.value = 0;
  showAnswer.value = !showAnswer.value;
  emit("completed");
  emit("next-user");
};

watch(store.$state, (first, second) => {
  if (showQuestion.value && second.buttonPressed) {
    bgm.value?.pause();
    clearInterval(timerId.value);
  }
});
</script>

<template>
  <div>
    <div
      :class="['card', { completed, fullscreen: showQuestion }]"
      :style="{ ['--offset-left' as any]: offsetLeft, ['--offset-bottom' as any]: offsetBottom }"
      @click="clickStart"
      @click.right.prevent="clickAnswer"
    >
      <div class="circle" v-if="showQuestion && timerNum">{{ timerNum }}</div>
      <p class="highlight">
        {{ question.points }}<span v-if="showQuestion"> points</span>
      </p>
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
.circle {
  position: absolute;
  right: 5%;
  top: 4%;
  width: 16vmin;
  height: 16vmin;
  border-radius: 50%;
  font-size: 7vmin;
  background: #ec1f64;
  z-index: 3;
  display: grid;
  place-items: center;
  color: white;
  transition: all 0.25s ease;
}
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
  padding-top: 5%;
  box-shadow: 0.2rem 0.2rem 0.2rem 0.2rem rgb(167, 164, 164);
  background: #ececec;
  opacity: 1;
}

.card.fullscreen .highlight {
  background: #ec1f64;
  color: white;
  border-radius: 2vmin;
  padding: 0.5rem;
}

.question {
  font-size: 4vmin;
  margin-left: 20%;
  margin-right: 20%;
  margin-bottom: 5%;
  text-align: center;
  transition: all 0.25s ease;
  transform: scale(1.5) translateY(100%);
}

.question.smaller {
  transform: none;
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
