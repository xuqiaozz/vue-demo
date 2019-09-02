import Vue from "vue";
import VueRouter from 'vue-router';

Vue.use(VueRouter)


import Guide from "./views/Guide.vue";

const routes = [{
        path: "/",
        redirect: {
            name: "guide"
        }
    },
    {
        path: "/search",
        component: () => import("@/views/Search.vue"),
        name: "search"
    },
    {
        path: "/good/detail/:goodId",
        name: 'good',
        component: () => import("@/views/Good.vue")
    },
    {
        path: "/guide",
        component: Guide,
        name: "guide"
    },
    {
        path: "/addresslist",
        name: "addresslist",
        component: () => import("@/views/AddressList.vue")
    },
    {
        path: "/setaddress/",
        name: "setaddress",
        component: () => import("@/views/SetAddress.vue")
    },
    {
        path: "/updataaddr/",
        name: "updataaddr",
        component: () => import("@/views/UpadateAddr.vue")
    },
    {
        path: "/jiesuan",
        name: "jiesuan",
        component: () => import("@/views/Jiesuan.vue")
    },
    {
        path: "/login",
        component: () => import("@/views/Login.vue"),
        name: "login"
    },
    {
        path: "/register",
        component: () => import("@/views/Register.vue"),
        name: "register"
    },
    {
        path: "/index",
        component: () => import("@/views/Index.vue"),
        name: "index",
        children: [{
                path: "",
                redirect: {
                    name: "home"
                }
            },
            {
                path: "home",
                name: "home",
                component: () => import("@/views/Home.vue")
            },
            {
                path: "classify",
                name: "classify",
                component: () => import("@/views/Classify.vue")
            },
            {
                path: "cart",
                name: "cart",
                component: () => import("@/views/Cart.vue")
            },
            {
                path: "mine",
                name: "mine",
                component: () => import("@/views/Mine.vue")
            },
            {
                path: "**",
                redirect: {
                    name: 'home'
                }
            }
        ]
    }
]


const router = new VueRouter({
    routes,
    mode: "hash",
    base: "/"
})

export default router;