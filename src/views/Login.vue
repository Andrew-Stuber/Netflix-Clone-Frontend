<template>
  <v-container>
    <template>
      <v-alert v-if="createSuccess" dense text type="success">
        User created successfully. Now you can login.
      </v-alert>
      <v-alert v-if="createError" dense outlined type="error">
        {{ errorMessage }}
      </v-alert>
      <v-alert v-if="loginError" dense outlined type="error">
        Error: Username or password are incorrect.
      </v-alert>
      <v-layout justify-center md-10>
        <v-card class="#424242 elevation-12" max-width="500" max-height="500">
          <v-row justify="center">
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
            </v-form>
          </v-row>
        </v-card>
      </v-layout>
    </template>
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

<style>
v-form {
  border-radius: 3rem;
  border: none;
  padding: 10px;
  text-align: center;
  outline: none;
  margin: 10px;
  width: 30%;
  box-sizing: border-box;
  font-family: "Poppins", sans-serif;
  font-weight: 400;
}
</style>
