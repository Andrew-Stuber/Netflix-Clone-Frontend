<template>
  <v-app>
    <v-app-bar
      v-if="!['Login', 'Video'].includes($route.name)"
      app
      color="#E50914"
      elevation="4"
    >
      <div>
        <v-btn
          plain
          :ripple="false"
          target="_blank"
          href="https://www.youtube.com/watch?v=5DlROhT8NgU"
          style="text-decoration: none"
        >
          <img
            class="mr-3"
            :src="require('./assets/Among-Us-Logo.png')"
            height="40"
          />
        </v-btn>
      </div>

      <div>
        <v-btn plain text to="/" :ripple="false">Home</v-btn>
      </div>
      <div class="text-center">
        <v-menu offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-btn plain text :ripple="false" v-bind="attrs" v-on="on">
              category
            </v-btn>
          </template>
          <v-list>
            <v-list-item to="/action">Action</v-list-item>
            <v-list-item to="/anime">Anime</v-list-item>
            <v-list-item to="/drama">Drama</v-list-item>
            <v-list-item to="/fantasy">Fantasy</v-list-item>
            <v-list-item to="/horror">Horror</v-list-item>
            <v-list-item to="/mystery">Mystery</v-list-item>
            <v-list-item to="/romance">Romance</v-list-item>
          </v-list>
        </v-menu>
      </div>
      <div>
        <v-btn plain text :ripple="false" to="/list">My List</v-btn>
      </div>
      <div>
        <v-btn plain text :ripple="false" to="/about"> About </v-btn>
      </div>

      <v-spacer></v-spacer>

      <div>
        <h3 class="mr-5">{{ $store.state.name }}</h3>
      </div>
      <v-btn
        :disabled="!$store.state.loggedIn"
        color="dark"
        class="mr-4"
        @click="logout"
      >
        Logout
        <v-icon dark right>mdi-open-in-new</v-icon>
      </v-btn>

      <div class="text-center">
        <v-menu bottom open-delay="100" offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-btn icon v-bind="attrs" v-on="on" :ripple="false">
              <v-icon>mdi-cog</v-icon>
            </v-btn>
          </template>
          <div class="text-center">
            <v-dialog v-model="dialog" width="500">
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  :disabled="!$store.state.loggedIn"
                  color="red lighten-1"
                  dark
                  v-bind="attrs"
                  v-on="on"
                >
                  Delete User
                  <v-icon dark right>mdi-cancel</v-icon>
                </v-btn>
              </template>

              <v-card>
                <v-card-title class="text-h6 red darken-3">
                  Delete User confirmation
                </v-card-title>

                <v-card-text class="pa-3">
                  Are you really sure you want to delete this user?
                </v-card-text>

                <v-divider></v-divider>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="primary" text @click="deleteUser">
                    Yes, please
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </div>
        </v-menu>
      </div>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import Vue from "vue";
import store from "@/store";

export default {
  data() {
    return {
      video: store.state.videos,
      dialog: false,
    };
  },
  methods: {
    async logout() {
      let response = await Vue.axios.get("/api/logout");
      // need to update states by calling who
      if (response.data.success) {
        await store.dispatch("clearUserState");
        await this.$router.push({ path: "/login" });
      }
    },
    async deleteUser() {
      this.dialog = false;
      let username = store.state.username;
      let formData = new FormData();
      formData.append("username", username);

      let response = await Vue.axios.get("/api/delete");
      if (response.data.success) {
        await this.$router.push({ path: "/login" });
      }
    },
  },
};
</script>
