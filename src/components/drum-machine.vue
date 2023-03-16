<template>
  <h1>Beat Lab</h1>
  <!-- <input v-on:keyup.enter="playSound()" /> -->
</template>

<script>
export default {
  data() {
    return {
      sounds: [
        {
          title: "snare",
          sound: "snare.wav",
          key: "k",
        },
      ],
    };
  },
  methods: {
    playSound(e) {
      let fileName = "";
      switch (e.key) {
        case "a":
          fileName = "snare.wav";
          break;
        case "s":
          fileName = "kick.wav";
          break;
        case "z":
          // code block
          break;
        case "x":
          // code block
          break;
        case "d":
          // code block
          break;
        case "f":
          // code block
          break;
        case "c":
          // code block
          break;
        case "v":
          // code block
          break;
        case "i":
          // code block
          break;
        case "o":
          // code block
          break;
        case "p":
          // code block
          break;
      }
      let audio = new Audio(require("../assets/" + fileName));
      audio.play();
    },
    test() {
      return alert("test");
    },
  },
  created() {
    window.addEventListener("keyup", this.playSound);
  },
  unmounted() {
    window.removeEventListener("keyup", this.playSound);
  },
};
</script>

<style></style>
