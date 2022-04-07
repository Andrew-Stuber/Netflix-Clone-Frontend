<template>
  <v-container>
    <v-col justify-end>
      <v-text-field
        v-model="search"
        filled
        rounded
        label="Search Videos"
        clearable
      ></v-text-field>
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
                  />
                  <!--                  <v-card-title class="justify-center">-->
                  <!--                    {{ video.title }}-->
                  <!--                  </v-card-title>-->
                </div>
              </router-link>

              <!-- Drop Down -->
              <v-card-actions>
                <v-btn
                  icon
                  @click="
                    addToList(index, video.id);
                    addToVideos(video);
                  "
                >
                  <v-icon>{{
                    add.at(index) ? "mdi-check" : "mdi-plus"
                  }}</v-icon>
                </v-btn>
                <v-spacer />
                <v-btn
                  icon
                  @click="
                    setDescription(index);
                    removeFromVideos(video);
                  "
                >
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
import Vue from "vue";

export default {
  name: "Home.vue",
  components: {
    BoxVideo,
  },
  async mounted() {
    let response = await Vue.axios.get("/api/videos/mylist");
    for (let i = 0; i < response.data.mylistvideo.length; i++) {
      this.$set(this.add, response.data.mylistvideo.at(i).id - 1, true);
    }
    console.log(response.data.mylistvideo.at(0));
  },
  data() {
    return {
      search: "",
      videoList: [],
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
    async addToList(index, videoId) {
      let formData = new FormData();
      formData.append("videoId", videoId);
      this.$set(this.add, index, !this.add.at(index));
      await Vue.axios.post("/api/videos/mylist/add", formData);
    },
    addToVideos(video) {
      this.videoList.push(video);
    },
    removeFromVideos(video) {
      this.videoList.filter((v) => v !== video);
    },
  },
  computed: {
    filteredVideos() {
      return this.videos.filter((video) =>
        video.title.toLowerCase().includes(this.search.toLowerCase())
      );
    },
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
body {
  background: #f6e9e3;
  background-size: 100% 100%;
}
</style>
