<template>
  <v-app>
    <v-app-bar
      app
      color="#6A76AB"
      dark
      shrink-on-scroll
      prominent
      src="https://picsum.photos/1920/1080?random"
      fade-img-on-scroll
      scroll-target="#scrolling-techniques-4"
    >
      <template v-slot:img="{ props }">
        <v-img
          v-bind="props"
          gradient="to top right, rgba(100,115,201,.7), rgba(25,32,72,.7)"
        ></v-img>
      </template>

      <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>

      <v-toolbar-title class="title text-h3 pl-0">{{
        $store.state.appTitle
      }}</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>

      <template v-slot:extension>
        <v-tabs v-model="tab" align-with-title>
          <v-tabs-slider color="yellow"></v-tabs-slider>
          <v-tab v-for="instrument in instruments" :key="instrument.title" :to="instrument.to" link>
          <v-tab-item-icon>
            <v-icon class="pr-2">{{ instrument.icon }}</v-icon>
          </v-tab-item-icon>
            <v-tab-item-title>{{ instrument.title }}</v-tab-item-title>
          </v-tab >
        </v-tabs>
      </template>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" absolute temporary>
      <v-list active-class="deep-purple--text text--accent-4" dense nav>
        <v-list-item v-for="item in items" :key="item.title" :to="item.to" link>
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main app>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",

  data: () => ({
    drawer: false,
    items: [
      { title: "Home", icon: "mdi-home", to: "/" },
      { title: "Account", icon: "mdi-account", to: "/account" },
    ],
    instruments: [
      { title: "Drums", icon: "mdi-light-recessed", to: "/drums" },
      { title: "Piano", icon: "mdi-piano", to: "/piano"},
      { title: "Guitar", icon: "mdi-guitar-acoustic", to: "" },
      { title: "Bass", icon: "mdi-music-clef-bass", to: "" },
      { title: "Harmonica", icon: "mdi-music-clef-alto", to: "" },
    ],
  }),
};
</script>
