import {
  createRouter,
  createWebHistory,
  type RouteRecordRaw,
} from "vue-router";

const routes: RouteRecordRaw[] = [
  {
    path: "/login",
    name: 'login',
    component: () => import('../views/Login.vue')
  },
  {
    path: "/registro",
    name: 'registro',
    component: () => import('../views/Registro.vue')
  },
  {
    path: '/inicio',
    name: 'inicio',
    component: () => import('../views/Header.vue'),
    children: [
      {
        path: 'foros',
        name: 'foros',
        component: () => import('../views/Foro/Foros.vue')
      },
      {
        path: 'blogs',
        name: 'blogs',
        component: () => import('../views/Blog/Blogs.vue')
      },
      {
        path: 'publicar',
        name: 'crear publicacion',
        component: () => import('../views/Foro/FormForo.vue')
      },
      {
        path: 'publicacion/:id([0-9]+)',
        name: 'publicacion',
        component: () => import('../views/PublicacionDetalles.vue')
      },
      {
        path: 'publicar_blog',
        name: 'Blog',
        component: () => import('../views/Blog/FormBlog.vue')
      }
    ]
  },
  {
    path: "/:pathMatch(.*)*",
    redirect: "/login",
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
