<template>
  <v-container>
    <h2>Video Page</h2>
    <ul>
      <li>
        <router-link to="/">Go to Home</router-link>
      </li>
    </ul>
    <div>
      <h1>{{ title }}</h1>
    </div>
    <div>
      <video-player :options="videoOptions" />
    </div>
  </v-container>
</template>

<script>
import VideoPlayer from "@/components/VideoPlayer.vue";
import store from "@/store";

export default {
  name: "Video.vue",
  components: {
    VideoPlayer,
  },
  data() {
    return {
      title: store.state.videos.find(
        (video) => video.filename.localeCompare(this.$route.params.id) === 0
      ).title,
      videoOptions: {
        autoplay: true,
        muted: true,
        controls: true,
        sources: [
          {
            src: store.state.videos.find(
              (video) =>
                video.filename.localeCompare(this.$route.params.id) === 0
            ).link, // link to the video!!!
            type: "application/x-mpegurl",
          },
        ],
      },
    };
  },
};
</script>
