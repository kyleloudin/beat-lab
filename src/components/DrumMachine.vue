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
                v-if="isPlaying"
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
              :color="color"
              dark
              depressed
              fab
              @click="
                toggle();
                playSoundRepeat();
              "
            >
              <v-icon large>
                {{ isPlaying ? "mdi-pause" : "mdi-play" }}
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
        class="d-flex flex-start"
        rounded
        color="primary"
        dark
        @click="playRecording()"
      >
        Play Recording
      </v-btn>
    </div>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    bpm: 40,
    interval: null,
    isPlaying: false,
    fileName: "",
    noteValue: "",
    recording: [],
    sounds: [],
    valueOfNotes: [],
    checked: true,
    sounds2: [],
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
    playSound(e) {
      let fileName;
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
        default:
          fileName = "";
          break;
      }
      if (fileName != "" && this.noteValue != "") {
        let audio = new Audio(require("../assets/" + fileName));
        this.fileName = fileName;
        this.sounds.push(audio);
        this.sounds2.push(fileName);
        this.valueOfNotes.push(this.noteValue);
        audio.play();
      }
    },

    playSoundRepeat() {
      if (!this.isPlaying || this.sounds === []) {
        setTimeout(this.stopSound, 200);
      } else {
        this.sounds2.forEach((sound) => {
          let audio = new Audio(require("../assets/" + sound));
          audio.play();
        });
        let time = this.findBeats();
        setTimeout(this.playSoundRepeat, time);
      }
    },
    playRecording() {
      this.recording.forEach((audio) => {
        audio.play();
      });
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
    toggle() {
      this.isPlaying = !this.isPlaying;
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






