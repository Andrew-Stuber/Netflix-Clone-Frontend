<template>
  <div>
    <video ref="videoPlayer" class="video-js vjs-theme-city vjs-fluid" />
  </div>
</template>

<script>
//import VideoPlayer from "@/components/VideoPlayer.vue";
//import store from "@/store";

//import Vue from "vue";
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
  name: "BoxVideo",
  props: {
    options: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  async mounted() {
    this.player = videojs(
      this.$refs.videoPlayer,
      this.$props.options,
      function onPlayerReady() {
        this.currentTime(0);
      }
    );
  },
  beforeDestroy() {
    if (this.player) {
      this.player.dispose();
    }
  },
  data: () => ({
    player: null,
  }),
};
</script>
