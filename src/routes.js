import Main from "./pages/MainPage";
import NotFound from "./pages/NotFoundPage";
import FavoriteGames from "./components/FavoriteGames";
import popup from "./components/popup.vue"
const routes = [{
        path: "/",
        name: "main",
        component: Main
    },
    {
        path: "/register",
        name: "register",
        component: () =>
            import ("./pages/RegisterPage")
    },
    {
        path: "/login",
        name: "login",
        component: () =>
            import ("./pages/LoginPage")
    },
    {
        path: "/logout",
        name: "logout",
        component: () =>
            import ("./pages/LoginPage")
    },
    {
        path: "/search",
        name: "search",
        component: () =>
            import ("./pages/SearchPage")
    },
    {
        path: "/about",
        name: "about",
        component: () =>
            import ("./pages/AboutPage")
    },
    {
        path: "/currentStage",
        name: "currentStage",
        component: () =>
            import ("./pages/currentStagePage")
    },
    {
        path: "/favorite",
        name: "favorite",
        component: FavoriteGames
    },
    {
        path: "/popup",
        name: "popup",
        component: popup
    },
    {
        path: "/TeamCard",
        name: "TeamCard",
        component: () =>
            import ("./components/TeamCard")
    },
    {
        path: "*",
        name: "notFound",
        component: NotFound
    }
];

export default routes;