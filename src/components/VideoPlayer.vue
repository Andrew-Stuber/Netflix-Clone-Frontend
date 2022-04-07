<template>
  <div>
    <video
      ref="videoPlayer"
      class="video-js vjs-theme-city vjs-fluid"
      @timeupdate="onPlayerTimeupdate($event)"
      @volumechange="onPlayerVolumeUpdate($event)"
    ></video>
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
  data() {
    return {
      player: null,
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
      await Vue.axios.post("/api/timestamp/update", formData);
    },
  },
};
</script>
