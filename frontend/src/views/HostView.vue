<script setup lang="ts">
import { computed, ref, type Ref } from "vue";
import type { Action, HostUser, NameColor, SerialisedUser } from "../types";

const COLOR_MAP: NameColor[] = ["red", "blue", "yellow", "green"];
const API_ENDPOINT = "ws://localhost:8080/host";
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
let waiting = ref(false);
let activeIndex: Ref<number | null> = ref(null);

let animationIndex = ref(0);
let hostAlreadyTaken = ref(false);

const pointMod = (user: SerialisedUser, points: number) => {
  user.points += points;
};

const sendReady = () => {
  console.log("pls");
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
    case undefined:
    case null:
    default:
      return;
  }
};
</script>

<template>
  <div class="container" @keyup.enter.capture="sendReady">
    <div class="button-room general bg">
      <transition-group name="list" tag="">
        <div
          v-for="(user, index) in players"
          :key="index"
          :class="['list', { disabled: waiting || activeIndex !== index }]"
          @click="user.points += 100"
          @click.right.prevent="user.points -= 100"
        >
          <div
            :class="[
              'big-button',
              'center',
              user.color,
              {
                animated: animationIndex % players.length === index,
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
      <a @click="sendReady">Ready</a>
      <p>{{ players.length }} playing</p>
    </footer>
  </div>
</template>

<style scoped>
@import "../assets/colors.css";
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
  cursor: pointer;
  transition-duration: 0.2s;
  transition-property: filter;
  border-bottom: 1rem solid var(--darker);
  transform-origin: top left;
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

.big-button:hover {
  filter: brightness(0.9);
}

.disabled {
  filter: none;
  transition: none;
  opacity: 0.3;
  cursor: default;
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
