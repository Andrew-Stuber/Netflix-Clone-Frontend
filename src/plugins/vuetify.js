import Vue from "vue";
import Vuetify from "vuetify/lib/framework";

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    dark: true,
    themes: {
      dark: {
        // Color is applied to selected drop down item
        primary: "#000000",
        secondary: "#E50914",

        // Uncomment this to make things worse
        // 'primary--text': '#FF00FF'
      },
    },
  },
});
