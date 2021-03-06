import Vue from "vue";
import App from "./App.vue";
import VueAxios from "vue-axios";
import axios from "axios";

import routes from "./routes";
import VueRouter from "vue-router";
Vue.use(VueRouter);
const router = new VueRouter({
    routes
});

import Vuelidate from "vuelidate";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import {
    FormGroupPlugin,
    FormPlugin,
    FormInputPlugin,
    ButtonPlugin,
    CardPlugin,
    NavbarPlugin,
    FormSelectPlugin,
    AlertPlugin,
    ToastPlugin,
    LayoutPlugin,
    InputGroupPlugin,
    FormRadioPlugin,
    ModalPlugin,
    ListGroupPlugin,
    OverlayPlugin,
    FormTimepickerPlugin,
    FormDatepickerPlugin,
    JumbotronPlugin
} from "bootstrap-vue";
[
    FormGroupPlugin,
    FormPlugin,
    FormInputPlugin,
    ButtonPlugin,
    CardPlugin,
    NavbarPlugin,
    FormSelectPlugin,
    AlertPlugin,
    ToastPlugin,
    LayoutPlugin,
    InputGroupPlugin,
    FormRadioPlugin,
    ModalPlugin,
    ListGroupPlugin,
    OverlayPlugin,
    FormTimepickerPlugin,
    FormDatepickerPlugin,
    JumbotronPlugin
].forEach((x) => Vue.use(x));
Vue.use(Vuelidate);


import GlobalTest from "./components/Global.vue";
Vue.component("GlobalTest", GlobalTest);


import { state as store_state, actions as store_actions } from "./store";

const state = Vue.observable(store_state)
const actions = Vue.observable(store_actions)
const store = { state: state, actions: actions }

Vue.prototype.$store = store;
Vue.config.devtools = true;

axios.interceptors.request.use(
    function(config) {
        // Do something before request is sent
        return config;
    },
    function(error) {
        // Do something with request error
        return Promise.reject(error);
    }
);

// Add a response interceptor
axios.interceptors.response.use(
    function(response) {
        // Do something with response data
        return response;
    },
    function(error) {
        // Do something with response error
        return Promise.reject(error);
    }
);

Vue.use(VueAxios, axios);

Vue.config.productionTip = false;

const shared_data = {
    username: localStorage.username,
    // username: "hilla",
    login(username) {
        localStorage.setItem("username", username);
        this.username = username;
        console.log("login", this.username);
    },
    logout() {
        console.log("logout");
        localStorage.removeItem("username");
        this.username = undefined;
        console.log("----------")
        console.log(localStorage.username)
    }
};
console.log("shared_data", shared_data);
// Vue.prototype.$root.store = shared_data;

new Vue({
    router,
    data() {
        return {
            store: shared_data
        };
    },
    methods: {
        toast(title, content, variant = null, append = false) {
            this.$bvToast.toast(`${content}`, {
                title: `${title}`,
                toaster: "b-toaster-top-center",
                variant: variant,
                solid: true,
                appendToast: append,
                autoHideDelay: 3000
            });
        }
    },
    render: (h) => h(App)
}).$mount("#app");