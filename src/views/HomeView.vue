<template>
  <div class="home pa-5 pl-12 pr-12">
    <h1>Welcome to {{ $store.state.appTitle }}</h1>
    <p>
      Here at {{ $store.state.appTitle }}, all you need is your imagination. Create infinite loops
      from our selection of instruments and press record to bring your dream tracks to life. 
    </p>
  </div>
</template>

<script>
export default {
  name: "Home",

  components: {
  },
};
</script>
