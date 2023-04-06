<template>
  <h1>Beat Lab</h1>
  <!-- <input v-on:keyup.enter="playSound()" /> -->
  <input v-model="bpm" />
  <div class="buttons">
    <input
      id="Eighth Note"
      name="note-value"
      type="radio"
      value="8"
      v-model="noteValue"
    />
    <label for="Eighth Note">Eighth Note</label>
    <input
      id="Quarter Note"
      name="note-value"
      type="radio"
      value="4"
      v-model="noteValue"
    />
    <label for="Quarter Note">Quarter Note</label>
    <input id="Half Note" name="note-value" type="radio" value="2" v-model="noteValue" />
    <label for="Half Note">Half Note</label>
    <input id="Whole Note" name="note-value" type="radio" value="1" v-model="noteValue" />
    <label for="Whole Note">Whole Note</label>
  </div>
  <button @click="playSoundRepeat()">play</button>
</template>

<script>
export default {
  data() {
    return {
      bpm: "",
      noteValue: "",
      fileName: "",
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
    findBeats(){
      return (((this.bpm /60) / this.noteValue) * 1000); 
    },
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
      this.fileName = fileName;
      audio.play();
    },
    playSoundRepeat() {
      let audio = new Audio(require("../assets/" + this.fileName));
      let time = this.findBeats();
      setTimeout(this.playSoundRepeat, time);
      audio.play();
    },
    test() {
      console.log("test");
    },
  },
  created() {
    window.addEventListener("keydown", this.playSound);
  },
  unmounted() {
    window.removeEventListener("keydown", this.playSound);
  },
};
</script>

<style>
.buttons {
  display: flex;
  flex-direction: row;
  justify-content: center;
}
</style>
