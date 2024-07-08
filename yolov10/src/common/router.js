import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
    {
        path: '/home',
        name: 'home',
        component: () => import('../views/HomeView.vue')
    },
    {
        path: '/about',
        name: 'about',
        component: () => import('../views/AboutView.vue'),
        children: [
            {
                path: '/about/aboutVue',
                name: '/aboutVue',
                component: () => import('../views/AboutVue.vue')
            },
            {
                path: '/about/aboutDB',
                name: '/aboutDB',
                component: () => import('../views/AboutDB.vue')
            },
            {
                path: '/about/aboutElectron',
                name: '/aboutElectron',
                component: () => import('../views/AboutElectron.vue')
            },
            {
                path: '/about/aboutYolo',
                name: '/aboutYolo',
                component: () => import('../views/AboutYolo.vue')
            }]
    },
    {
        path: '/',
        name: 'login',
        component: () => import('../views/Login.vue')
    },
    {
        path: '/register',
        name: 'register',
        component: () => import('../views/Register.vue')
    },
    {
        path: '/dashboard',
        name: 'dashboard',
        component: () => import('../views/DashBoard.vue'),
        children: [
            {
                path: '/dashboard/weather',
                name: 'weather',
                component: () => import('../views/AnimalWeather.vue')
            },
            {
                path: '/dashboard/animal',
                name: 'animal',
                component: () => import('../views/AnimalInfo.vue')
            },
            {
                path: '/dashboard/staff',
                name: 'staff',
                component: () => import('../views/AnimalStaffInfo.vue')
            }
        ]
    }
]
const router = createRouter({
    history: createWebHashHistory(),
    routes: routes
})


export { router, routes }