<template>
  <v-container>
    <h2>Video Page</h2>
    <ul>
      <li>
        <router-link to="/">Go to Home</router-link>
      </li>
    </ul>
    <div>
      <video-player :options="videoOptions" />
    </div>
  </v-container>
</template>

<script>
import VideoPlayer from "@/components/VideoPlayer.vue";

export default {
  name: "Video.vue",
  components: {
    VideoPlayer,
  },
  data() {
    return {
      videoOptions: {
        autoplay: true,
        muted: true,
        controls: true,
        sources: [
          {
            src: "http://localhost:8082/hls/sample1.mp4/index.m3u8", // link to the video!!!
            type: "application/x-mpegurl",
          },
        ],
      },
    };
  },
};
</script>
