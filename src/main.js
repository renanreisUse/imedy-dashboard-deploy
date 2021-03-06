import Vue from "vue";
import "./pollyfills";
import VueRouter from "vue-router";
import VueNotify from "vue-notifyjs";
import VeeValidate from "vee-validate";
import lang from "element-ui/lib/locale/lang/pt-br";
import locale from "element-ui/lib/locale";
import App from "./App.vue";
import store from "./store";
import api from "./services/api";
import VueAxios from "vue-axios";
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue' 
// Plugins
import GlobalComponents from "./gloablComponents";
import GlobalDirectives from "./globalDirectives";
import SideBar from "./components/UIComponents/SidebarPlugin";

// router setup
import routes from "./routes/routes";

// library imports

import "./assets/sass/paper-dashboard.scss";
import "./assets/sass/element_variables.scss";
import "./assets/sass/demo.scss";

import sidebarLinks from "./sidebarLinks";
// plugin setup
Vue.use(VueRouter);
Vue.use(GlobalDirectives);
Vue.use(GlobalComponents);
Vue.use(VueNotify);
Vue.use(SideBar, { sidebarLinks: sidebarLinks });
Vue.use(VeeValidate);
Vue.use(VueAxios, { axios: api() });
// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)
locale.use(lang);

// configure router
const router = new VueRouter({
  routes, // short for routes: routes
  linkActiveClass: "active"
  /* mode: 'history' */
});

// router controle by token
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem("token");
  const paths = ["/auth/reset-password", "/register", "/auth/reset-password/manager", "/"]
  if (!token && !paths.includes(to.path)) {
    next("/");
  } else {
    next();
  }
});

/* eslint-disable no-new */
new Vue({
  el: "#app",
  render: h => h(App),
  router,
  store
});
