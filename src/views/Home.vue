<template>
  <v-container>
    <h2>Home Page</h2>
    <ul>
      <li>
        <router-link to="/about">Go to About</router-link>
      </li>
      <li v-for="video in videos" :key="video.filename">
        <router-link :to="'/video/' + video.filename">
          <v-img
            lazy-src="https://i.imgur.com/XJRowdx.png"
            max-height="150"
            max-width="250"
            :src="video.thumbnail"
          ></v-img>
          {{ video.title }}</router-link
        >
      </li>
    </ul>
  </v-container>
</template>

<script>
import store from "@/store";
export default {
  name: "Home.vue",
  data() {
    return {
      videos: store.state.videos,
    };
  },
};
</script>
