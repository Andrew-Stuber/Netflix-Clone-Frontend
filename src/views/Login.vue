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
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-text-field
          v-model="username"
          :rules="usernameRules"
          label="Username"
          required
        ></v-text-field>

        <v-text-field
          type="password"
          v-model="password"
          :rules="passwordRules"
          label="Password"
          required
        ></v-text-field>

        <v-btn :disabled="!valid" color="success" class="mr-4" @click="submit">
          Login
        </v-btn>

        <v-btn color="primary" class="mr-4" @click="create"> Create </v-btn>
      </v-form>
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
