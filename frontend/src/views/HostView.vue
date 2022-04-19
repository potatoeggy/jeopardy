<script setup lang="ts">
import { computed, ref, type Ref } from "vue";
import type { Action, HostUser, NameColor, SerialisedUser } from "../types";
import IconVolumeOff from "../components/icons/IconVolumeOff.vue";
import IconVolumeUp from "../components/icons/IconVolumeUp.vue";
import JeopardyGame from "../components/JeopardyGame.vue";

const COLOR_MAP: NameColor[] = ["red", "blue", "yellow", "green"];
const API_ENDPOINT = "ws://localhost:8080/host";
const AUDIO_FILES: { path: string; loop?: boolean }[] = [
  { path: "kahoot-lobby.mp3", loop: true },
  { path: "jeopardy-think.mp3" },
  { path: "among-us-buzzer.mp3" },
];
const socket = new WebSocket(API_ENDPOINT);

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
const activeIndex: Ref<number> = ref(-1);

const animationIndex = ref(0);
const animationOn = ref(true);
const hostAlreadyTaken = ref(false);

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
  } else {
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
    activeIndex.value = -1;
    return;
  }
  audioRefs.value[0].pause();
  waiting.value = false;
  socket.send(JSON.stringify({ action: "ready" }));
};

setInterval(() => animationIndex.value++, 1000);

socket.onmessage = (msg) => {
  const data: Action = JSON.parse(msg.data);
  console.log(data);
  switch (data.action) {
    case "setname":
      break;
    case "user":
      if (data.userIds.length <= 4) {
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
      if (data.id && !waiting.value) {
        activeIndex.value = players.value.findIndex((u) => u.id === data.id);
        audioRefs.value[2].play();
        animationOn.value = false;
        waiting.value = true;
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
    :loop="audio.loop"
    preload="auto"
  >
    <source :src="`/${audio.path}`" />
  </audio>
  <div class="container" @keyup.enter.capture="sendReady">
    <jeopardy-game :game-number="1" v-if="false" />
    <div class="button-room general bg">
      <transition-group name="list" tag="">
        <div
          v-for="(user, index) in players"
          :key="index"
          :class="[
            'list',
            {
              enabled: !waiting || activeIndex === index,
              'active-index': activeIndex === index && !animationOn,
              'not-active-index': activeIndex !== index && !animationOn,
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
            {{ user.name }}
          </div>
          <p class="point-text">
            {{ user.points }}
          </p>
        </div>
        <div
          v-if="players.length === 0 && hostAlreadyTaken"
          class="no-one-here"
        >
          Game in progress...<br />
          Please try again later.
        </div>
        <div v-else-if="players.length === 0" class="no-one-here">
          No one here... <br />
          Join at jeopardy.bayview.club!
        </div>
      </transition-group>
    </div>
    <footer>
      <!--
      <label for="name">Name</label>
      <input type="text" id="name" />
      -->
      <div class="corner">
        <icon-volume-up v-if="audioOn" @click="toggleAudio" />
        <icon-volume-off v-else @click="toggleAudio" />
        <a @click="sendReady">Ready</a>
      </div>
      <p>{{ players.length }} playing</p>
    </footer>
  </div>
</template>

<style scoped>
@import "../assets/colors.css";
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
  --width: 18vw;
  width: var(--width);
  height: var(--width);
  background: var(--bg);
  color: white;
  text-shadow: rgba(0, 0, 0, 0.25) 0px 0.125rem 0px,
    rgb(0, 0, 0) 0px 0px 0.125rem;
  font-size: 4vw;
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
  box-shadow: 0.2rem 0.2rem 0.2rem 0.2rem lightgray;
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

.point-text:hover {
  cursor: pointer;
  transform: scale(1.2);
}

.no-one-here {
  font-size: 4vw;
  text-align: center;
  color: gray;
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
</style>
