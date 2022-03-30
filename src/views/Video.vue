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
  name: "Video",
  components: {
    VideoPlayer,
  },
  computed: {
    getVideo() {
      return store.state.videos.find(
        (video) => video.id == this.$route.params.id
      );
    },
  },
  created() {
    console.log(store.state.videos);
    console.log(this.getVideo.title);
    this.$set(this, "title", this.getVideo.title);
    this.videoOptions.sources[0].src = this.getVideo.link;
  },
  data() {
    return {
      title: "",
      videoOptions: {
        autoplay: true,
        muted: true,
        controls: true,
        sources: [
          {
            src: "", // link to the video!!!
            type: "application/x-mpegurl",
          },
        ],
      },
    };
  },
};
</script>
