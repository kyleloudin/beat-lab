<template>
  <div>
    <drum-machine></drum-machine>
  </div>
</template>

<script>
export default {
  name: "Drums",

  components: {
    DrumMachine: require("@/components/DrumMachine.vue").default,
  },
};
</script>
