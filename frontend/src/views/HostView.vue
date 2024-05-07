<script setup lang="ts">
import { computed, ref, type Ref } from "vue";
import type { Action, HostUser, NameColor, SerialisedUser } from "../types";
import IconVolumeOff from "../components/icons/IconVolumeOff.vue";
import IconVolumeUp from "../components/icons/IconVolumeUp.vue";
import JeopardyGame from "../components/JeopardyGame.vue";
import { useCounterStore } from "@/stores/counter";
import { finalQuestion } from "@/data/games";
import IconCloudOn from "../components/icons/IconCloudOn.vue";
import IconCloudOff from "../components/icons/IconCloudOff.vue";

const MAX_PLAYERS = 6;
const COLOR_MAP: NameColor[] = [
  "red",
  "blue",
  "yellow",
  "green",
  "orange",
  "purple",
];
const API_ENDPOINT = "ws://localhost:8080/host";
const AUDIO_FILES: { path: string; loop?: boolean }[] = [
  { path: "kahoot-lobby.mp3", loop: true },
  { path: "jeopardy-think.mp3" },
  { path: "among-us-buzzer.mp3" },
  { path: "battle-1.mp3" },
  { path: "battle-2.mp3" },
  { path: "battle-3.mp3" },
  { path: "battle-end.mp3" },
];
const socket = new WebSocket(API_ENDPOINT);
const serverAvailable = ref(false);

const userData: Ref<SerialisedUser[]> = ref([]);
const players = computed(() => {
  return userData.value.map((u, index) => {
    const color = COLOR_MAP[index];
    const displayName =
      u.name === ""
        ? color.charAt(0).toUpperCase() + color.substring(1)
        : u.name;

    return {
      id: u.id,
      name: displayName,
      color: color,
      points: u.points,
    };
  });
});
const waiting = ref(true);
const activeIndex: Ref<number[]> = ref([]);

const store = useCounterStore();
const gameNumber = ref(0);

const animationIndex = ref(0);
const animationOn = ref(true);
const hostAlreadyTaken = ref(false);
const showGame = ref(false);
const finalMode = ref(false);
const finalIndex = ref(0);
const finalAnswers: Ref<string[]> = ref([]);
const finalBets: Ref<string[]> = ref([]);
const finalStep = ref(0);
/*
 * Final documentation
 * 0: place bets
 * 1: question & submit answer
 * 2: show player answers
 * 3: show actual answer
 */
const currentUserIndex = ref(0);
const buttonCooldown = ref(false); // ignore all button presses

const audioOn = ref(false);
const currentAudioRef = ref(0);
const audioRefs: Ref<HTMLAudioElement[]> = ref([]);

const toggleAudio = () => {
  if (audioOn.value) {
    console.log("we rushing so you can't disable it once you turn it on");
    return;
  }
  if (audioOn.value) {
    audioRefs.value[currentAudioRef.value].pause();
  } else if (!showGame.value) {
    audioRefs.value[currentAudioRef.value].play();
  }
  audioOn.value = !audioOn.value;
};

const pointMod = (user: SerialisedUser, points: number) => {
  user.points += points;
};

const sendReady = () => {
  // if we're in the end screen restore to normal
  // or if we accidentally hit the ready button
  // but don't want it
  if (!animationOn.value || !waiting.value) {
    waiting.value = true;
    animationOn.value = true;
    activeIndex.value = [];
    return;
  }
  audioRefs.value[0].pause();
  waiting.value = false;
  socket.send(JSON.stringify({ action: "ready" }));
};

const sendFinal = () => {
  socket.send(JSON.stringify({ action: "final" }));
};

const sendReadySpecial = () => {
  activeIndex.value = store.beepUsers;
  setTimeout(() => (activeIndex.value = []), 5000);
  try {
    socket.send(
      JSON.stringify({
        action: "ready",
        ids: store.beepUsers.map((i) => players.value[i].id),
      })
    );
  } catch (err) {
    // normal if there are no players
  }
};

const startGame = () => {
  if (finalMode.value) {
    finalMode.value = false;
  }
  showGame.value = !showGame.value;
  audioRefs.value[currentAudioRef.value].pause();
};

const toggleFinal = () => {
  if (!finalMode.value && showGame.value) {
    showGame.value = false;
  }
  finalMode.value = !finalMode.value;

  if (finalMode.value) {
    sendFinal();
  }
  waiting.value = true;
};

const colorBar: Ref<NameColor | null> = ref(null);

const progressFinal = () => {
  const jeopardyMusic = audioRefs.value[1];
  if (!finalMode.value) {
    return;
  }

  if (finalStep.value === 2) {
    finalIndex.value++;
    if (finalIndex.value < players.value.length) {
      return;
    }
  }

  finalStep.value++;

  if (finalStep.value === 1) {
    sendFinal();
    setTimeout(() => jeopardyMusic.play(), 5000);
  } else {
    jeopardyMusic.pause();
  }
};

const pushColorBar = () => {
  colorBar.value =
    COLOR_MAP[currentUserIndex.value % players.value.length] || null;
};

setInterval(() => animationIndex.value++, 1000);

socket.onopen = () => {
  serverAvailable.value = true;
  // so cloudflare doesn't disconnect us
  setInterval(() => socket.send("ping!"), 10000);
};
socket.onclose = () => (serverAvailable.value = false);
socket.onmessage = (msg) => {
  const data: Action = JSON.parse(msg.data);
  console.log(data);
  switch (data.action) {
    case "setname":
      break;
    case "user":
      if (data.userIds.length <= MAX_PLAYERS) {
        // remove ones that don't exist
        userData.value = userData.value.filter((u) =>
          data.userIds.includes(u.id)
        );

        // add ones that don't exist
        userData.value.push(
          ...data.userIds
            .filter(
              (a) => userData.value.filter((u) => u.id === a).length === 0
            )
            .map((id) => {
              return { id: id, name: "", points: 0 };
            })
        );
      }
      break;
    case "error":
      if (data.error === "HostAlreadyTaken") {
        hostAlreadyTaken.value = true;
      }
      break;
    case "pressed":
      if (data.id && !buttonCooldown.value) {
        activeIndex.value = [players.value.findIndex((u) => u.id === data.id)];
        colorBar.value = COLOR_MAP[activeIndex.value[0]] || null;
        audioRefs.value[2].play();
        waiting.value = true;
        buttonCooldown.value = true;
        store.toggleButtonPressed();
        setTimeout(() => {
          buttonCooldown.value = false;
          activeIndex.value = [];
          store.toggleButtonPressed();
        }, 4000);
      }
      break;
    case "final":
      if (data.message && data.id && finalStep.value <= 1) {
        const index = players.value.findIndex((u) => u.id === data.id);
        const finalArray = finalStep.value === 0 ? finalBets : finalAnswers;
        finalArray.value[index] = data.message;
      }
      break;
    case undefined:
    case null:
    default:
      return;
  }
};
</script>

<template>
  <audio
    v-for="(audio, index) in AUDIO_FILES"
    :key="index"
    ref="audioRefs"
    :id="`audio-${index}`"
    :loop="audio.loop"
    preload="auto"
  >
    <source :src="`/${audio.path}`" />
  </audio>
  <div class="container" @keyup.enter.capture="sendReady">
    <div class="game-container">
      <jeopardy-game
        :game-number="gameNumber"
        :users="players"
        :current-user-index="currentUserIndex % players.length"
        @request-buzzer="sendReadySpecial"
        @next-user="currentUserIndex++"
        @exit-card="pushColorBar"
      />

      <div
        :class="[
          'button-room',
          'general',
          'bg',
          colorBar,
          colorBar ? 'color-bar' : null,
          { overlay: showGame },
        ]"
        @animationend="colorBar = null"
      >
        <p class="final-label" v-if="finalMode">Final Jeopardy</p>
        <p class="final-question" v-if="finalMode">
          <span v-if="finalStep === 0">
            Category: {{ finalQuestion.category }} — Place your bets!
          </span>
          <span v-else-if="finalStep === 1">{{ finalQuestion.question }}</span>
          <span v-else-if="finalStep === 3">{{ finalQuestion.answer }}</span>
        </p>
        <transition-group name="list" tag="">
          <div
            v-for="(user, index) in players"
            :key="index"
            :class="[
              'list',
              {
                enabled:
                  !waiting ||
                  activeIndex.includes(index) ||
                  (finalMode && finalStep === 0 && finalBets[index]) ||
                  (finalMode && finalStep >= 1 && finalAnswers[index]),
                'active-index': activeIndex.includes(index) && !animationOn,
                'not-active-index':
                  !activeIndex.includes(index) && !animationOn,
              },
            ]"
            @click="user.points += 100"
            @click.right.prevent="user.points -= 100"
          >
            <div
              :class="[
                'big-button',
                'center',
                user.color,
                {
                  animated:
                    animationIndex % players.length === index && animationOn,
                },
              ]"
            >
              <p>{{ user.name }}</p>
            </div>

            <p class="point-text">
              {{ user.points }}
            </p>
            <p
              class="point-text long-point-text"
              v-if="finalMode && index <= finalIndex && finalStep >= 2"
            >
              Bet: {{ finalBets[index] }}
              <br />
              {{ finalAnswers[index] }}
            </p>
          </div>
          <template v-if="players.length === 0 && !showGame">
            <div v-if="hostAlreadyTaken" class="no-one-here">
              Game in progress...<br />
              Please try again later.
            </div>
            <div v-else-if="!serverAvailable" class="no-one-here">
              Something went wrong...<br />
              Please refresh the page.
            </div>
            <div v-else class="no-one-here">
              No one here... <br />
              Join at jeopardy.eggworld.me!
            </div>
          </template>
        </transition-group>
      </div>
    </div>
    <footer>
      <!--
      <label for="name">Name</label>
      <input type="text" id="name" />
      -->
      <div class="corner">
        <icon-cloud-on v-if="serverAvailable" />
        <icon-cloud-off v-else />
        <icon-volume-up v-if="audioOn" @click="toggleAudio" />
        <icon-volume-off v-else @click="toggleAudio" />
        <a @click="sendReady">Ready</a> / <a @click="startGame">Toggle</a> /
        <a @click="toggleFinal">Final</a> /
        <a @click="progressFinal">Progress</a>
      </div>
      <a @click="gameNumber++">{{ store.gameTitle }}</a>
    </footer>
  </div>
</template>

<style scoped>
@import "../assets/colors.css";

.color-bar {
  animation-name: color;
  animation-duration: 3s;
}

@keyframes color {
  0% {
    background: gray;
  }
  25%,
  75% {
    background: var(--bg);
  }
  100% {
    background: gray;
  }
}

.general {
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  transition: all 0.5s ease;
  z-index: 10;
}

.game-container {
  position: relative;
  height: 100%;
}
.active-index {
  transform: scale(1.25);
}

.not-active-index {
  transform: scale(0.75);
}
.corner {
  display: flex;
  gap: 0.5rem;
}
.big-button {
  --width: 15vw;
  width: var(--width);
  aspect-ratio: 1/1;
  background: var(--bg);
  color: white;
  text-shadow: rgba(0, 0, 0, 0.25) 0px 0.125rem 0px,
    rgb(0, 0, 0) 0px 0px 0.125rem;
  font-size: 3.5vw;
  border-radius: 50%;
  transition-duration: 0.2s;
  transition-property: filter;
  border-bottom: 1rem solid var(--darker);
  transform-origin: top left;
  opacity: 0.3;
  cursor: default;
  user-select: none;
}

.enabled > .big-button {
  opacity: 1;
  cursor: pointer;
}

.big-button.idle {
  border-radius: 3vmin;
}

.big-button.animated {
  animation-name: bounce;
  animation-duration: 1s;
}

@keyframes bounce {
  0%,
  20%,
  50%,
  80%,
  100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-2rem);
  }
  60% {
    transform: translateY(-1rem);
  }
}

.big-button.enabled:hover {
  filter: brightness(0.9);
}

.bg {
  background: var(--bg-dark);
  box-shadow: 0.2rem 0.2rem 0.6rem 0.2rem rgba(0, 0, 0, 0.5);
}

.button-room {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  height: 100%;
}

.center {
  display: flex;
  justify-content: center;
  align-items: center;
}

.container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
}

footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  align-self: flex-end;
  padding: 1.25rem;
  padding-top: 1.5rem;
  font-size: 1.25rem;
  width: 100%;
}

.point-text {
  text-align: center;
  font-size: 4vw;
  margin-top: 1rem;
  transition: transform 0.2s;
  user-select: none;
  opacity: 0.3;
}

.enabled > .point-text {
  opacity: 1;
}

.long-point-text {
  font-size: 2vw;
  max-width: 50%;
  margin-bottom: -7%;
}

.point-text:hover {
  cursor: pointer;
  transform: scale(1.2);
}

.long-point-text:hover {
  transform: none;
  cursor: default;
}

.no-one-here {
  font-size: 4vw;
  text-align: center;
  color: gray;
}

.list {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.list-move,
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

.list-leave-active {
  position: absolute;
}

a:hover {
  text-decoration: underline;
  cursor: pointer;
}

a {
  user-select: none;
}

.general.overlay {
  height: 15%;
  top: 85%;
  background: gray;
}

.general.overlay .list {
  flex-direction: row;
  align-items: center;
  gap: 2rem;
}

.general.overlay .big-button {
  --width: 9vmin;
}

.general.overlay .big-button > p {
  display: none;
}

.general.overlay .point-text {
  margin: 0;
  color: white;
  opacity: 1;
}

.general * {
  transition: all 0.4s ease;
}

.final-label {
  position: absolute;
  z-index: 10;
  left: 0;
  top: 0;
  font-size: 5vmin;
  transform: translate(calc(50vw - 50%), 50%);
  transition: all 0.5s ease;
  color: white;
  background: #ff2578;
  padding: 0.5rem;
  border-radius: 0.5rem;
}

.final-question {
  position: absolute;
  text-align: center;
  margin-left: 10%;
  margin-right: 10%;
  bottom: 0;
  transform: translateY(-10vh);
  font-size: 5vmin;
}
</style>
