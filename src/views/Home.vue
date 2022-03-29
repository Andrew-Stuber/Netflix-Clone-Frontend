<template>
  <v-container>
    <!--div v-if="active">
      <h2>Hello World</h2>
    </div-->
    <h2>Home Page</h2>
    <ul>
      <!--li>
        <router-link to="/about">Go to About</router-link>
      </li-->
      <v-row>
        <v-col
          cols="12"
          sm="3"
          md="4"
          v-for="(video, index) in videos"
          :key="index"
        >
          <router-link class="routerLink" :to="'/video/' + video.filename">
            <!--div v-on:mouseover="active = !active"> trying to make a mini player
            </div-->
            <v-card class="mx-auto" max-width="344">
              <v-img
                lazy-src="https://i.imgur.com/XJRowdx.png"
                height="200px"
                :src="video.thumbnail"
              />
              <v-card-title class="justify-center">
                {{ video.title }}
              </v-card-title>
            </v-card>
          </router-link>
        </v-col>
      </v-row>
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
<style lang="scss" scoped>
.routerLink {
  text-decoration: none;
}
</style>
