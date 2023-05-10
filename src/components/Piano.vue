<template>
  <body>
    <div class="piano">
      <div data-note="C" class="key white"></div>
      <div data-note="Db" class="key black"></div>
      <div data-note="D" class="key white"></div>
      <div data-note="Eb" class="key black"></div>
      <div data-note="E" class="key white"></div>
      <div data-note="F" class="key white"></div>
      <div data-note="Gb" class="key black"></div>
      <div data-note="G" class="key white"></div>
      <div data-note="Ab" class="key black"></div>
      <div data-note="A" class="key white"></div>
      <div data-note="Bb" class="key black"></div>
      <div data-note="B" class="key white"></div>
    </div>

    <audio id="C" src="notes/C.mp3"></audio>
    <audio id="Db" src="notes/Db.mp3"></audio>
    <audio id="D" src="notes/D.mp3"></audio>
    <audio id="Eb" src="notes/Eb.mp3"></audio>
    <audio id="E" src="notes/E.mp3"></audio>
    <audio id="F" src="notes/F.mp3"></audio>
    <audio id="Gb" src="notes/Gb.mp3"></audio>
    <audio id="G" src="notes/G.mp3"></audio>
    <audio id="Ab" src="notes/Ab.mp3"></audio>
    <audio id="A" src="notes/A.mp3"></audio>
    <audio id="Bb" src="notes/Bb.mp3"></audio>
    <audio id="B" src="notes/B.mp3"></audio>
</body>
</template>

<script>
export default {
  data: () => ({
    WHITE_KEYS: ["z", "x", "c", "v", "b", "n", "m"],
    BLACK_KEYS: ["s", "d", "g", "h", "j"],
    keys: window.querySelectorAll(".key"),
    whiteKeys: window.querySelectorAll(".key.white"),
    blackKeys: window.querySelectorAll(".key.black"),
  }),

  methods: {
    playNote(key) {
      const Audio = window.getElementById(key.dataset.note);
      Audio.currentTime = 0;
      Audio.play();
      key.classList.add("active");
      Audio.addEventListener("ended", () => {
        key.classList.remove("active");
      });
    },
  },

  created() {
    window.addEventListener("keydown", (e) => {
      if (e.repeat) return;
      const key = e.key;
      const whiteKeyIndex = WHITE_KEYS.indexOf(key);
      const blackKeyIndex = BLACK_KEYS.indexOf(key);

      if (whiteKeyIndex > -1) playNote(whiteKeys[whiteKeyIndex]);
      if (blackKeyIndex > -1) playNote(blackKeys[blackKeyIndex]);
    });
  },

  unmounted() {
    window.removeEventListener("keydown", this.playSound);
  },
};
</script>

<style>
*,
*::before,
*::after {
  box-sizing: border-box;
}

body {
  background-color: #143f6b;
  margin: 0;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.piano {
  display: flex;
}

.key {
  height: calc(var(--width) * 4);
  width: var(--width);
}

.white {
  --width: 100px;
  background-color: white;
  border: 1px solid #333;
}

.white.active {
  background-color: #ccc;
}

.black {
  --width: 60px;
  background-color: black;
  margin-left: calc(var(--width) / -2);
  margin-right: calc(var(--width) / -2);
  z-index: 2;
}

.black.active {
  background-color: #333;
}
</style>
