<template>
  <div>
    <video
      ref="videoPlayer"
      class="video-js vjs-theme-city vjs-fluid"
      @timeupdate="onPlayerTimeupdate($event)"
    />
    <v-col>
      <v-text-field
        label="Main input"
        v-model="newComment"
        hide-details="auto"
      />
    </v-col>
    <v-col class="justify-center">
      <v-btn
        block
        color="#616161"
        class="mr-4 white--text"
        @click="create"
        elevation="2"
        depressed
      >
        Create Comment
      </v-btn>
    </v-col>
    <br />
    <div v-for="(item, index) in subtitles" :key="index">
      <v-card class="mx-auto">
        <v-card-text>
          <div>User</div>
          <p class="text-h6 text--primary">{{ item.username }}</p>
          <div class="text-h5 text--primary">
            {{ item.comment }}<br />
            @{{ item.timestamp }} seconds
          </div>
        </v-card-text>
      </v-card>
      <br />
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import videojs from "video.js";
import "video.js/dist/video-js.css";
// There are the theme that can be change for the video.
// City
import "@videojs/themes/dist/city/index.css";

// Fantasy
import "@videojs/themes/dist/fantasy/index.css";

// Forest
import "@videojs/themes/dist/forest/index.css";

// Sea
import "@videojs/themes/dist/sea/index.css";

export default {
  name: "VideoPlayer",
  props: {
    options: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  async created() {
    let formData = new FormData();
    formData.append("videoId", this.$route.params.id);
    let response = await Vue.axios.post("/api/videos/comment", formData);
    this.subtitles = response.data;
  },
  data() {
    return {
      player: null,
      subtitles: [],
      newComment: "",
    };
  },
  async mounted() {
    let videoId = this.$route.params.id;
    let formData = new FormData();
    formData.append("videoId", videoId);
    let responseTime = await Vue.axios.post("/api/timestamp/get", formData);
    this.player = videojs(
      this.$refs.videoPlayer,
      this.options,
      function onPlayerReady() {
        this.currentTime(responseTime.data.timestamp);
      }
    );
  },
  beforeDestroy() {
    if (this.player) {
      this.player.dispose();
    }
  },
  methods: {
    // eslint-disable-next-line no-unused-vars
    async onPlayerTimeupdate(player) {
      let formData = new FormData();
      formData.append("videoId", this.$route.params.id);
      formData.append("timestamp", this.player.currentTime());
      formData.append("videoId", this.$route.params.id);
      await Vue.axios.post("/api/timestamp/update", formData);
    },
    async create() {
      let formData = new FormData();
      formData.append("videoId", this.$route.params.id);
      formData.append("comment", this.newComment);
      await Vue.axios.post("/api/videos/comment/update", formData);
      let response = await Vue.axios.post("/api/videos/comment", formData);
      this.subtitles = response.data;
    },
  },
};
</script>
