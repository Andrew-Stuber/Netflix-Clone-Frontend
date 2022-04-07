import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import store from "@/store";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
  {
    path: "/login",
    name: "Login",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Login.vue"),
  },
  {
    path: "/video/:id",
    name: "Video",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Video.vue"),
  },
  {
    path: "/list",
    name: "List",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/List.vue"),
  },
  {
    path: "/action",
    name: "Action",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Action.vue"),
  },
  {
    path: "/anime",
    name: "Anime",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Anime.vue"),
  },
  {
    path: "/drama",
    name: "Drama",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Drama.vue"),
  },
  {
    path: "/fantasy",
    name: "Fantasy",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Fantasy.vue"),
  },
  {
    path: "/horror",
    name: "Horror",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Horror.vue"),
  },
  {
    path: "/mystery",
    name: "Mystery",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Mystery.vue"),
  },
  {
    path: "/romance",
    name: "Romance",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Romance.vue"),
  },
];

const router = new VueRouter({
  routes,
});

// Setup beforeEach hook to check the logged in sync the login states with backend
router.beforeEach(async (to, from, next) => {
  // get videos
  await store.dispatch("retrieveVideos");
  // get login state using whoami and axios
  // response.data is out payload
  await store.dispatch("retrieveUserState");
  let loggedIn = store.state.loggedIn;
  if (to.name === "Login" && loggedIn) {
    next({ name: "Home" });
  }
  // make sure if user i logged, user will not be able to see login page
  if (to.name !== "Login" && !loggedIn) {
    // redirect to login page
    next({ name: "Login" });
  } else {
    // otherwise, let go
    next();
  }
  // get list videos
  await store.dispatch("getAllListVideos");
});

export default router;
