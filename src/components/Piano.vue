<template>
  <v-container class="piano-container">
    <v-row>
      <v-btn
        v-for="key in pianoKeys"
        :key="key.id"
        :class="['piano-key', key.type, { active: key.active }]"
        @mousedown="playKey(key)"
        @mouseup="stopKey(key)"
        @touchstart="playKey(key)"
        @touchend="stopKey(key)"
      >
        {{ key.label }}
      </v-btn>
    </v-row>
  </v-container>
</template>

<script>
import * as Tone from "tone";
export default {
  data() {
    return {
      // synth: new Tone.Synth().toDestination(),

      pianoKeys: [
        { id: 1, label: "C", type: "white", active: false, keyCode: 65 },
        { id: 2, label: "C#", type: "black", active: false, keyCode: 87 },
        { id: 3, label: "D", type: "white", active: false, keyCode: 83 },
        { id: 4, label: "D#", type: "black", active: false, keyCode: 69 },
        { id: 5, label: "E", type: "white", active: false, keyCode: 68 },
        { id: 6, label: "F", type: "white", active: false, keyCode: 70 },
        { id: 7, label: "F#", type: "black", active: false, keyCode: 84 },
        { id: 8, label: "G", type: "white", active: false, keyCode: 71 },
        { id: 9, label: "G#", type: "black", active: false, keyCode: 89 },
        { id: 10, label: "A", type: "white", active: false, keyCode: 72 },
        { id: 11, label: "A#", type: "black", active: false, keyCode: 85 },
        { id: 12, label: "B", type: "white", active: false, keyCode: 74 },
      ],
    };
  },
  created() {
    // Add event listener for keyboard events
    window.addEventListener("keydown", this.handleKeyDown);
    window.addEventListener("keyup", this.handleKeyUp);
  },
  beforeDestroy() {
    // Remove event listener when component is destroyed
    window.removeEventListener("keydown", this.handleKeyDown);
    window.removeEventListener("keyup", this.handleKeyUp);
  },
  methods: {
    playKey(key) {
      key.active = true;
      const synth = new Tone.Synth().toDestination();

      
      // if (key.keyCode == 65) {
      //   //play a middle 'C' for the duration of an 8th note
      //   synth.triggerAttackRelease("C4", "8n");
      // }

      switch (key.keyCode){
        case 65:
        synth.triggerAttackRelease("C4", "4n");
        break;
        case 87:
        synth.triggerAttackRelease("C#4", "8n");
        break;
        case 83:
        synth.triggerAttackRelease("D4", "8n");
        break;
        case 69:
        synth.triggerAttackRelease("D#4", "8n");
        break;
        case 68:
        synth.triggerAttackRelease("E4", "8n");
        break;
        case 70:
        synth.triggerAttackRelease("F4", "8n");
        break;
        case 84:
        synth.triggerAttackRelease("F#4", "8n");
        break;
        case 71:
        synth.triggerAttackRelease("G4", "8n");
        break;
        case 89:
        synth.triggerAttackRelease("G#4", "8n");
        break;
        case 72:
        synth.triggerAttackRelease("A4", "8n");
        break;
        case 85:
        synth.triggerAttackRelease("A#4", "8n");
        break;
        case 74:
        synth.triggerAttackRelease("B4", "8n");
        break;
      }
      
    },
    stopKey(key) {
      key.active = false;
    },
    handleKeyDown(event) {
      // Find the matching piano key based on the keyCode
      const key = this.pianoKeys.find((key) => key.keyCode === event.keyCode);
      if (key) {
        this.playKey(key);
      }
    },
    handleKeyUp(event) {
      // Find the matching piano key based on the keyCode
      const key = this.pianoKeys.find((key) => key.keyCode === event.keyCode);
      if (key) {
        this.stopKey(key);
      }
    },
  },
};
</script>

<style>
.piano-container {
  background-color: #f0f0f0;
  padding: 10px;
}

.piano-key {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 40px;
  height: 160px;
  font-size: 14px;
  border: 1px solid #aaaaaa;
  background-color: #ffffff;
  color: #333333;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.piano-key.white {
  border-bottom: 3px solid #aaaaaa;
}

.piano-key.black {
  position: relative;
  margin-left: -20px;
  margin-right: -20px;
  min-width: 20px;
  height: 100px;
  background-color: #333333;
  color: #ffffff;
  z-index: 1;
}

.piano-key.active {
  background-color: #d0d0d0;
}

.piano-key.active.white {
  background-color: #c0c0c0;
}

.piano-key.active.black {
  background-color: #666666;
}
</style>
