<template>
  <v-container>
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
            <div @click="active = true">
              <v-card class="mx-auto" max-width="344" :ripple="true">
                <v-img
                  lazy-src="https://i.imgur.com/XJRowdx.png"
                  height="200px"
                  :src="video.thumbnail"
                />
                <v-card-title class="justify-center">
                  {{ video.title }}
                </v-card-title>
              </v-card>
            </div>
          </router-link>
        </v-col>
      </v-row>
    </ul>
    <v-progress-circular
      class="spinner"
      indeterminate
      color="primary"
      v-if="active"
    />
  </v-container>
</template>

<script>
import store from "@/store";

export default {
  name: "Home.vue",
  data() {
    return {
      videos: store.state.videos,
      active: false,
    };
  },
};
</script>
<style lang="scss" scoped>
.routerLink {
  text-decoration: none;
}
.spinner {
  top: 90%;
  left: 90%;
  position: absolute;
}
</style>
