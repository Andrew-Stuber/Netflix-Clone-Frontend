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
          <div>
            <v-card class="mx-auto" max-width="344" :ripple="true">
              <router-link class="routerLink" :to="'/video/' + video.filename">
                <div @click="spinner = true">
                  <v-img
                    lazy-src="https://i.imgur.com/XJRowdx.png"
                    height="200px"
                    :src="video.thumbnail"
                  />
                  <v-card-title class="justify-center">
                    {{ video.title }}
                  </v-card-title>
                </div>
              </router-link>

              <v-card-actions>
                <v-spacer />
                <v-btn icon @click="setDescription(index)">
                  <v-icon>{{
                    show.indexOf(index) ? "mdi-chevron-up" : "mdi-chevron-down"
                  }}</v-icon>
                </v-btn>
              </v-card-actions>

              <v-expand-transition>
                <div v-show="show.at(index)">
                  <v-card-text>
                    {{ video.description }}
                  </v-card-text>
                </div>
              </v-expand-transition>
            </v-card>
          </div>
        </v-col>
      </v-row>
    </ul>
    <v-progress-circular
      class="spinner"
      indeterminate
      color="primary"
      v-if="spinner"
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
      spinner: false,
      show: new Array(store.state.numVideos).fill(false),
      listedVideo: {
        fileName: String,
        title: String,
        show: false,
      },
      listedVideos: new Array(store.state.numVideos).fill(this.listedVideo),
    };
  },
  methods: {
    setDescription(index) {
      this.$set(this.show, index, !this.show[index]);
      console.log(this.show.at(index));
    },
    /*updateListedVideos(item) {
      listedVideos.at();
    },*/
  },
  mounted() {
    //videos.forEach();
    console.log(this.show);
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
