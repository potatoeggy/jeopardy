<script setup lang="ts">
import type { Action, NameColor } from "../types";
import { computed, ref, type Ref } from "vue";
import ServerErrorDialog from "../components/ServerErrorDialog.vue";
import IconCloudOff from "../components/icons/IconCloudOff.vue";
import IconCloudOn from "../components/icons/IconCloudOn.vue";

const API_ENDPOINT = "ws://localhost:8080/join";
const COLORS: NameColor[] = ["red", "blue", "yellow", "green"];
let socket = new WebSocket(API_ENDPOINT);

const name = ref("");
const colorNumber: Ref<number> = ref(0);
const color: Ref<NameColor> = computed(() => COLORS[colorNumber.value]);
const serverAvailable = ref(false); // websocket things
const pressAllowed = ref(false); // if server says go

const inputText = ref("400");
const timeout: Ref<number> = ref(0);

const finalMode = ref(0);
/*
 * Final documentation
 * 0: disabled
 * 1: bets
 * 2: questions
 */

const buttonDisabled = computed(
  () => !(serverAvailable.value && pressAllowed.value)
);

const displayName = computed(() =>
  name.value === ""
    ? color.value.charAt(0).toUpperCase() + color.value.substring(1)
    : name.value
);

const push = () => {
  if (finalMode.value > 0) {
    if (finalMode.value === 1 && isNaN(parseInt(inputText.value))) {
      return;
    }
    socket.send(JSON.stringify({ action: "final", message: inputText.value }));
    return;
  }

  if (!pressAllowed.value) return;
  socket.send(JSON.stringify({ action: "pressed" }));
  pressAllowed.value = false;
};

function createSocket(newSocket: WebSocket) {
  newSocket.onopen = () => {
    serverAvailable.value = true;
    // make sure cloudflare doesn't disconnect us
  };
  newSocket.onclose = () => {
    serverAvailable.value = false;
    setTimeout(() => {
      socket = new WebSocket(API_ENDPOINT);
      createSocket(socket);
    }, 1000);
  };

  newSocket.onmessage = (msg) => {
    const data: Action = JSON.parse(msg.data);
    console.log("Server:", data);

    switch (data?.action) {
      case "ready":
        clearTimeout(timeout.value);
        pressAllowed.value = true;
        // if it isn't pressed, disable after 20 s
        timeout.value = setTimeout(() => (pressAllowed.value = false), 20000);
        break;
      case "error":
        if (data.error === "NoHostAvailable") {
          serverAvailable.value = false;
        }
        break;
      case "color":
        if (data.number >= 0 && data.number < COLORS.length)
          colorNumber.value = data.number;
        break;
      case "final":
        clearTimeout(timeout.value);
        finalMode.value++;
        if (finalMode.value === 2) {
          // clear text
          inputText.value = "What is a potato?";
        }
        pressAllowed.value = true;
        break;
      case undefined:
      case null:
      default:
    }
  };
}

createSocket(socket);
setInterval(() => socket.send("ping!"), 10000);

// TODO: allow changing names
</script>

<template>
  <div class="container">
    <div class="button-room general bg">
      <input type="text" v-model.trim.lazy="inputText" v-if="finalMode > 0" />
      <div
        id="big-button"
        :class="[
          'bg',
          'button-room',
          color,
          { disabled: buttonDisabled, final: finalMode > 0 },
        ]"
        @click="push"
        @click.right.prevent="push"
      >
        {{ buttonDisabled ? "Waiting..." : "Answer!" }}
      </div>
    </div>
    <footer>
      <!--
      <label for="name">Name</label>
      <input type="text" id="name" />
      -->
      <span v-if="serverAvailable"><IconCloudOn /> Connected</span>
      <span v-else><IconCloudOff /> No connection available</span>

      <p>{{ displayName }} Team</p>
    </footer>
  </div>
</template>

<style scoped>
@import "../assets/colors.css";
#big-button {
  width: 50%;
  height: 60%;
  background: var(--bg);
  color: white;
  text-shadow: rgba(0, 0, 0, 0.25) 0px 0.125rem 0px,
    rgb(0, 0, 0) 0px 0px 0.125rem;
  font-size: 5vw;
  border-radius: 3vmin;
  cursor: pointer;
  transition-duration: 0.2s;
  transition-property: filter;
  border-bottom: 1rem solid var(--darker);
  user-select: none;
}

#big-button:hover {
  filter: brightness(0.9);
}

#big-button.disabled {
  filter: none;
  transition: none;
  opacity: 0.2;
  cursor: default;
}

.bg {
  background: var(--bg-dark);
  box-shadow: 0.2rem 0.2rem 0.2rem 0.2rem lightgray;
}

#big-button.final {
  height: 20%;
}

.button-room {
  display: flex;
  flex-direction: column;
  gap: 5%;
  justify-content: center;
  align-items: center;
  height: 100%;
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

footer > span {
  display: flex;
  gap: 0.5rem;
}

input[type="text"] {
  height: 5rem;
  font-size: 3rem;
  padding: 1rem;
  width: 50%;
  border-radius: 0.5rem;
  outline: none;
}

* {
  transition: all 0.25s ease;
}
</style>
