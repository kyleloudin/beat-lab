<template>
    <div>
     <Piano></Piano>
    </div>
  </template>
  
  <script>
  export default {
    name: "piano",
  
    components: {
      Piano: require("@/components/Piano.vue").default,
    },
  };
  </script>