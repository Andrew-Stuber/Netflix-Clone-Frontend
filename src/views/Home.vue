<template>
  <v-container>
    <h2>Home Page</h2>
    <ul>
      <li>
        <router-link to="/about">Go to About</router-link>
      </li>
      <li>
        <router-link to="/video">Go to Video</router-link>
      </li>
    </ul>
  </v-container>
</template>

<script>
export default {
  name: "Home.vue",
};
</script>
