<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center">
        <h3>SSC-Project</h3>
      </div>

      <v-spacer></v-spacer>

      <span class="mr-2">{{ $store.state.name }}</span>
      <v-btn
        :disabled="!$store.state.loggedIn"
        color="success"
        class="mr-4"
        @click="logout"
      >
        Logout
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
      <div class="text-center">
        <v-dialog v-model="dialog" width="500">
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              :disabled="!$store.state.loggedIn"
              color="red lighten-2"
              dark
              v-bind="attrs"
              v-on="on"
            >
              Delete User
              <v-icon dark right> mdi-cancel </v-icon>
            </v-btn>
          </template>

          <v-card>
            <v-card-title class="text-h5 grey lighten-2">
              Delete User confirmation
            </v-card-title>

            <v-card-text>
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
  name: "App",

  data() {
    return {
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

      let response = await Vue.axios.post("/api/delete", formData);
      if (response.data.success) {
        await this.$router.push({ path: "/login" });
      }
    },
  },
};
</script>
