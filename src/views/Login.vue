<template>
  <v-container fill-height>
    <v-layout align-center justify-center>
      <div class="bg-image">
        <div class="card">
          <v-card color="hsla(0, 5%, 0%, 0.65)">
            <v-row>
              <v-form class="pa-15" ref="form" v-model="valid" lazy-validation>
                <h1>Sign In</h1>

                <div class="pa-2"></div>

                <v-text-field
                  color="white"
                  v-model="username"
                  :rules="usernameRules"
                  label="Username"
                  required
                  hide-details="auto"
                  outlined
                ></v-text-field>

                <div class="pa-2"></div>

                <v-text-field
                  color="white"
                  type="password"
                  v-model="password"
                  :rules="passwordRules"
                  label="Password"
                  required
                  hide-details="auto"
                  outlined
                ></v-text-field>

                <div class="pa-2"></div>

                <v-btn
                  block
                  :disabled="!valid"
                  color="#dc0913"
                  class="mr-4 white--text"
                  @click="submit"
                >
                  Sign In
                  <v-tooltip bottom>
                    <span>I'm A Tooltip</span>
                  </v-tooltip>
                </v-btn>

                <div class="pa-1"></div>

                <v-btn
                  block
                  color="#616161"
                  class="mr-4 white--text"
                  @click="create"
                >
                  Create
                </v-btn>

                <v-checkbox
                  v-model="checkbox"
                  :rules="checkboxRules"
                  label="Checkbox"
                  required
                >
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
        </div>
      </div>
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
    checkboxRules: [(v) => !!v || "Must accept the Terms and Conditions"],
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
.bg-image {
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.bg-image:before {
  content: "";
  background-image: url(../assets/bg-image.jpg);
  background-size: cover;
  position: absolute;
  top: 0px;
  right: 0px;
  bottom: 0px;
  left: 0px;
  opacity: 0.4;
}
.card {
  display: flex;
  position: relative;
}
</style>
