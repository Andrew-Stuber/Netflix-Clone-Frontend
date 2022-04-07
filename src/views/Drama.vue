<template>
  <v-container class="body">
    <v-col justify-end>
      <h1>Drama</h1>
    </v-col>
    <ul>
      <!--li>
        <router-link to="/about">Go to About</router-link>
      </li-->
      <v-row>
        <v-col
          cols="12"
          sm="3"
          md="4"
          v-for="(video, index) in filteredVideos"
          :key="index"
        >
          <div>
            <v-card
              class="mx-auto"
              width="344"
              max-height="360"
              :ripple="true"
              @mouseenter="setMouseHoverEnter(index)"
              @mouseleave="setMouseHoverLeave(index)"
            >
              <!-- Video Link -->
              <router-link class="routerLink" :to="'/video/' + video.id">
                <div @click="spinner = true">
                  <h2 class="ml-2">{{ video.title }}</h2>
                  <v-img
                    lazy-src="https://i.imgur.com/XJRowdx.png"
                    height="200px"
                    :src="video.thumbnail"
                    v-show="!mouseHover[index]"
                  />
                  <!-- Box Video Stuff -->
                  <BoxVideo
                    :options="setVideoSrc(video.link)"
                    v-if="mouseHover[index]"
                    :video-id="video.id"
                  />
                  <!--                  <v-card-title class="justify-center">-->
                  <!--                    {{ video.title }}-->
                  <!--                  </v-card-title>-->
                </div>
              </router-link>

              <!-- Drop Down -->
              <v-card-actions>
                <v-btn icon @click="setAddList(index)">
                  <v-icon>{{
                    add.at(index) ? "mdi-check" : "mdi-plus"
                  }}</v-icon>
                </v-btn>
                <v-spacer />
                <v-btn icon @click="setDescription(index)">
                  <v-icon>{{
                    show.at(index) ? "mdi-chevron-up" : "mdi-chevron-down"
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
import BoxVideo from "@/views/BoxVideo";

export default {
  name: "Drama.vue",
  components: {
    BoxVideo,
  },
  data() {
    return {
      search: "Drama",
      videos: store.state.videos,
      spinner: false,
      show: new Array(store.state.numVideos).fill(false),
      add: new Array(store.state.numList).fill(false),
      mouseHover: new Array(store.state.numVideos).fill(false),
      videoOptions: {
        autoplay: true,
        muted: true,
        controls: false,
        sources: [
          {
            src: "", // link to the video!!!
            type: "application/x-mpegurl",
          },
        ],
      },
    };
  },
  methods: {
    setDescription(index) {
      this.$set(this.show, index, !this.show[index]);
    },
    setMouseHoverEnter(index) {
      this.$set(this.mouseHover, index, true);
    },
    setMouseHoverLeave(index) {
      this.$set(this.mouseHover, index, false);
    },
    setVideoSrc(videoLink) {
      this.$set(this.videoOptions.sources[0], "src", videoLink);
      return this.videoOptions;
    },
    setAddList(index) {
      this.$set(this.add, index, !this.add.at(index));
    },
  },
  computed: {
    filteredVideos() {
      return this.videos.filter((video) =>
        video.tags.toLowerCase().match(this.search.toLowerCase())
      );
    },
  },
};
</script>
<style lang="scss" scoped>
.body {
  background-image: url("../assets/dm.jpeg");
  background-size: 130% 100%;
  height: 100%;
}
</style>
