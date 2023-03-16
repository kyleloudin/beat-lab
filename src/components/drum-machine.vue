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
          fileName = "kick.wav";
          break;
        case "s":
          fileName = "kick2.wav";
          break;
        case "z":
          fileName = "kick3.wav";
          break;
        case "x":
          fileName = "kick4.wav";
          break;
        case "d":
          fileName = "snare.wav";
          break;
        case "f":
          fileName = "snare2.wav";
          break;
        case "c":
          fileName = "snare3.wav";
          break;
        case "v":
          fileName = "snare4.wav";
          break;
        case "i":
          fileName = "hihat1.wav";
          break;
        case "o":
          fileName = "hihat2.wav";
          break;
        case "p":
          fileName = "hihat3.wav";
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
