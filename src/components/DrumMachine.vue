<template>
  <v-container class="about pt-4">
    <v-card class="mx-auto" max-width="600">
      <v-toolbar flat dense>
        <v-toolbar-title>
          <span class="subheading">METRONOME</span>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon>
          <v-icon>mdi-share-variant</v-icon>
        </v-btn>
      </v-toolbar>

      <v-card-text>
        <v-row class="mb-4" justify="space-between">
          <v-col class="text-left">
            <span class="text-h2 font-weight-light" v-text="bpm"></span>
            <span class="subheading font-weight-light mr-1">BPM</span>
            <v-fade-transition>
              <v-avatar
                v-if="isClicking"
                :color="color"
                :style="{
                  animationDuration: animationDuration,
                }"
                class="mb-1 v-avatar--metronome"
                size="12"
              ></v-avatar>
            </v-fade-transition>
          </v-col>
          <v-col class="text-right">
            <v-btn
              class="metronome-button"
              :color="color"
              dark
              depressed
              fab
              @click="
                toggle('metronome');
                activateMetronome();
              "
            >
              <v-icon large>
                {{ isClicking ? "mdi-pause" : "mdi-play" }}
              </v-icon>
            </v-btn>
          </v-col>
        </v-row>

        <v-slider
          v-model="bpm"
          :color="color"
          track-color="grey"
          always-dirty
          min="40"
          max="218"
        >
          <template v-slot:prepend>
            <v-icon :color="color" @click="decrement"> mdi-minus </v-icon>
          </template>

          <template v-slot:append>
            <v-icon :color="color" @click="increment"> mdi-plus </v-icon>
          </template>
        </v-slider>
      </v-card-text>
    </v-card>
    <div class="d-flex justify-center">
      <v-radio-group
        class="radio pl-400 d-flex justify-center"
        v-model="noteValue"
        row
      >
        <v-radio label="Eighth Note" value=".5"></v-radio>
        <v-radio label="Quarter Note" value="1"></v-radio>
        <v-radio label="Half Note" value="2"></v-radio>
        <v-radio label="Whole Note" value="4"></v-radio>
      </v-radio-group>
    </div>
    <div class="d-flex justify-center">
      <v-btn
        class="record d-flex flex-start"
        rounded
        color="primary"
        dark
        @click="toggle('record')"
      >
        Record
      </v-btn>
      <v-btn
        class="play d-flex flex-start"
        rounded
        color="primary"
        dark
        @click="toggle('playSong'), playRecording()"
      >
        Play
      </v-btn>
      <v-btn
        class="quantize d-flex flex-start"
        rounded
        color="primary"
        dark
        @click="quantize('quantize')"
      >
        Quantize
      </v-btn>
    </div>
  </v-container>
</template>

<script>
import * as Tone from "tone";

export default {
  data: () => ({
    recordButton: document.querySelector(".record"),
    metronomeButton: document.querySelector(".metronome-button"),
    bpm: 40,
    interval: null,
    isPlaying: false,
    isRecording: false,
    isClicking: false,
    fileName: "",
    checked: true,
    barLength: 0,
    noteValue: "",
    noteObject: {
      fileName: "",
      time: "",
    },
    notesArray: [],
  }),

  computed: {
    color() {
      if (this.bpm < 100) return "indigo";
      if (this.bpm < 125) return "teal";
      if (this.bpm < 140) return "green";
      if (this.bpm < 175) return "orange";
      return "red";
    },
    animationDuration() {
      return `${60 / this.bpm}s`;
    },
  },

  methods: {
    findBeats() {
      return (60 / this.bpm) * 1000 * this.noteValue;
    },
    activateMetronome() {
      let metronomeClick = new Audio(require("../assets/metronome.wav"));
      if (this.isClicking) {
        metronomeClick.play();
        let time = (60 / this.bpm) * 1000;
        setTimeout(this.activateMetronome, time);
      } else if (!this.isClicking) {
        metronomeClick.pause();
        metronomeClick = new Audio(require("../assets/metronome.wav"));
      }
    },

    findClosestValue(inputTime) {
      let startTime = Date.now();
      let dataSet = [];
      let timeBetweenNotes = 60000 / (this.bpm * 8);
      for (let i = 0; i <= 7; i++) {
        (startTime + timeBetweenNotes * i).push(dataSet);
      }
      let closestValue = dataSet[0];
      let closestDifference = Math.abs(inputTime - dataSet[0]);
      for (let i = 1; i < dataSet.length; i++) {
        const difference = Math.abs(inputTime - dataSet[i]);
        if (difference < closestDifference) {
          closestValue = dataSet[i];
          closestDifference = difference;
        }
      }
      return closestValue;
    },

    playSound(e) {
      let pushNote = { fileName: "", time: 0 };
      switch (e.key) {
        case "a":
          pushNote.fileName = "kick.wav";
          pushNote.time = Date.now();
          break;
        case "s":
          pushNote.fileName = "kick2.wav";
          pushNote.time = Date.now();
          break;
        case "z":
          pushNote.fileName = "kick3.wav";
          pushNote.time = Date.now();
          break;
        case "x":
          pushNote.fileName = "kick4.wav";
          pushNote.time = Date.now();
          break;
        case "d":
          pushNote.fileName = "snare.wav";
          pushNote.time = Date.now();
          break;
        case "f":
          pushNote.fileName = "snare2.wav";
          pushNote.time = Date.now();
          break;
        case "c":
          pushNote.fileName = "snare3.wav";
          pushNote.time = Date.now();
          break;
        case "v":
          pushNote.fileName = "snare4.wav";
          pushNote.time = Date.now();
          break;
        case "i":
          pushNote.fileName = "hihat1.wav";
          pushNote.time = Date.now();
          break;
        case "o":
          pushNote.fileName = "hihat2.wav";
          pushNote.time = Date.now();
          break;
        case "p":
          pushNote.fileName = "hihat3.wav";
          pushNote.time = Date.now();
          break;
        default:
          pushNote.fileName = "";
          pushNote.time = Date.now();
          break;
      }
      if (pushNote.fileName != "") {
        let audio = new Audio(require("../assets/" + pushNote.fileName));
        audio.play();
      }
      if (this.isRecording) {
        this.notesArray.push(pushNote);
      }
    },

    // playSoundRepeat() {
    //   if (!this.isPlaying || this.sounds === []) {
    //     setTimeout(this.stopSound, 200);
    //   } else {
    //     this.sounds2.forEach((sound) => {
    //       let audio = new Audio(require("../assets/" + sound));
    //       audio.play();
    //     });
    //     let time = this.findBeats();
    //     setTimeout(this.playSoundRepeat, time);
    //   }
    // },

    record() {},
    playRecording() {
      for (let i = 0; i < this.notesArray.length; i++) {
        if (i === 0) {
          this.notesArray[i].test = 0;
        } else {
          this.notesArray[i].test =
            this.notesArray[i].time - this.notesArray[0].time;
        }
        this.notesArray.forEach((sound) => {
          setTimeout(() => {
            let audio = new Audio(require("../assets/" + sound.fileName));
            audio.play();
          }, sound.test);
        });
      }
    },

    quantize() {
      findClosestValue();
    },
    stopSound() {
      this.sounds = [];
    },
    decrement() {
      this.bpm--;
    },
    increment() {
      this.bpm++;
    },
    toggle(button) {
      if (button == "metronome") {
        this.isClicking = !this.isClicking;
      }
      if (button == "record") {
        this.isRecording = !this.isRecording;
      }
      if (button == "playSong") {
        this.isPlaying = !this.isPlaying;
      }
      if (button == "quantize") {
        this.isQuantized = !this.isQuantized;
      }
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
@keyframes metronome-example {
  from {
    transform: scale(0.5);
  }

  to {
    transform: scale(1);
  }
}

/* .v-input--radio-group__input {
  justify-content: center;
} */

.v-avatar--metronome {
  animation-name: metronome-example;
  animation-iteration-count: infinite;
  animation-direction: alternate;
}
</style>
