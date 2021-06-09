import Main from "./pages/MainPage";
import NotFound from "./pages/NotFoundPage";
import FavoriteGames from "./components/FavoriteGames";

const routes = [
  {
    path: "/",
    name: "main",
    component: Main
  },
  {
    path: "/register",
    name: "register",
    component: () => import("./pages/RegisterPage")
  },
  {
    path: "/login",
    name: "login",
    component: () => import("./pages/LoginPage")
  },
  {
    path: "/logout",
    name: "logout",
    component: () => import("./pages/LoginPage")
  },
  {
    path: "/search",
    name: "search",
    component: () => import("./pages/SearchPage")
  },
  {
    path: "/favorite",
    name: "favorite",
    component: FavoriteGames
  },
  {
    path: "*",
    name: "notFound",
    component: NotFound
  }
];

export default routes;
