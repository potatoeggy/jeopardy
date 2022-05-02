<script setup lang="ts">
import { RouterView } from "vue-router";

// disable hardware media keys
// eslint-disable-next-line no-undef
const mediaKeys: MediaSessionAction[] = [
  "play",
  "pause",
  "seekbackward",
  "seekforward",
  "previoustrack",
  "nexttrack",
];

for (const k of mediaKeys)
  navigator.mediaSession.setActionHandler(k, () => null);
</script>

<template>
  <RouterView />
</template>

<style>
@import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@600&display=swap");
#app {
  height: 100vh;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Montserrat", "Noto Sans", sans-serif;
}
</style>
