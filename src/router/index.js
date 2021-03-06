import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "Index",
    component: () => import("@/views/Index/Index")
  },
  {
    path: "/publish",
    name: "Publish",
    component: () => import("@/views/Edit/Index")
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
