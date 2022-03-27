<template>
  <div>
    <video
      ref="videoPlayer"
      class="video-js vjs-theme-city vjs-fluid"
      @timeupdate="onPlayerTimeupdate($event)"
    ></video>
  </div>
</template>

<script>
import store from "@/store";
import Vue from "vue";
import videojs from "video.js";
import "video.js/dist/video-js.css";
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
  data() {
    return {
      player: null,
    };
  },
  mounted() {
    this.player = videojs(
      this.$refs.videoPlayer,
      this.options,
      function onPlayerReady() {
        console.log("onPlayerReady", this);
        this.currentTime(store.state.timestamp);
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
      formData.append("username", store.state.username);
      formData.append("timestamp", this.player.currentTime());
      await Vue.axios.post("/api/update", formData);
      console.log(this.player.currentTime());
    },
  },
};
</script>
