<template>
  <v-container>
    <v-row class="pa-3">
      <div class="mr-5">
        <v-btn to="/" icon x-large>
          <v-icon dark right>mdi-arrow-left</v-icon>
        </v-btn>
      </div>
      <div class="title pa-3">
        <h1>{{ title }}</h1>
      </div>
    </v-row>
    <div class="pa-2">
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
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.savedVideo = store.state.videos.find(
        (video) => video.id == this.$route.params.id
      );
      return this.savedVideo;
    },
  },
  async created() {
    this.$set(this, "title", this.getVideo.title);
    this.videoOptions.sources[0].src = this.getVideo.link;
  },
  data() {
    return {
      savedVideo: null,
      subtitles: [],
      title: "",
      videoOptions: {
        autoplay: true,
        muted: false,
        controls: true,
        controlBar: {
          pictureInPictureToggle: false,
        },
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
