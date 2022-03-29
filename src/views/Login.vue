<template>
  <v-container fill-height>
    <v-layout align-center justify-center>
      <v-card color="hsla(0, 5%, 0%, 0.7)">
        <v-row>
          <v-form class="pa-15" ref="form" v-model="valid" lazy-validation>
            <h1>Sign In</h1>
            <v-text-field
              color="white"
              v-model="username"
              :rules="usernameRules"
              label="Username"
              required
            ></v-text-field>

            <v-text-field
              color="white"
              type="password"
              v-model="password"
              :rules="passwordRules"
              label="Password"
              required
            ></v-text-field>

            <v-btn
              :disabled="!valid"
              color="#dc0913"
              class="mr-4 white--text"
              @click="submit"
            >
              Sign In
            </v-btn>

            <v-btn color="#616161" class="mr-4 white--text" @click="create">
              Create
            </v-btn>

            <v-checkbox v-model="checkbox" aria-required="true">
              <template v-slot:label>
                <div>
                  I agree to the
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on }">
                      <a
                        target="_blank"
                        href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                        @click.stop
                        v-on="on"
                      >
                        Terms and Conditions
                      </a>
                    </template>
                    Opens in new window
                  </v-tooltip>
                </div>
              </template>
            </v-checkbox>
          </v-form>
        </v-row>
        <div>
          <v-alert v-if="createSuccess" dense text type="success">
            User created successfully. Now you can login.
          </v-alert>
          <v-alert v-if="createError" dense text type="error">
            {{ errorMessage }}
          </v-alert>
          <v-alert v-if="loginError" dense text type="error">
            Error: Username or password are incorrect.
          </v-alert>
        </div>
      </v-card>
    </v-layout>
  </v-container>
</template>

<script>
import Vue from "vue";

export default {
  data: () => ({
    valid: true,
    username: "",
    password: "",
    usernameRules: [(v) => !!v || "Username is required"],
    passwordRules: [(v) => !!v || "Password is required"],
    createSuccess: false,
    createError: false,
    loginError: false,
    errorMessage: "",
  }),
  methods: {
    clearAlert() {
      this.createSuccess = false;
      this.createError = false;
      this.loginError = false;
    },
    async submit() {
      if (this.$refs.form.validate()) {
        // submit to backend to authenticate
        let formData = new FormData();
        formData.append("username", this.username);
        formData.append("password", this.password);

        let response = await Vue.axios.post("/api/login", formData);
        if (response.data.success) {
          await this.$router.push({ path: "/" });
        } else {
          this.clearAlert();
          this.loginError = true;
        }
      }
    },
    async create() {
      if (this.$refs.form.validate()) {
        // submit to backend to authenticate
        let formData = new FormData();
        formData.append("username", this.username);
        formData.append("password", this.password);

        let response = await Vue.axios.post("/api/create", formData);
        if (response.data.success) {
          this.clearAlert();
          this.createSuccess = true;
        } else {
          this.clearAlert();
          this.createError = true;
          this.errorMessage = response.data.message;
        }
      }
    },
  },
};
</script>

<style lang="scss">
main {
  background-image: url(../assets/website.jpeg);
  background-size: cover;
}
</style>
