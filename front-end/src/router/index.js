import Vue       from 'vue'
import VueRouter from 'vue-router'
import Music     from '../views/Music.vue'
import Events    from '../views/Events.vue'
import Shop      from '../views/Shop.vue'
import Admin     from '../views/Admin.vue'
import Home      from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'home',
        component: Home,
    },
    {
        path: '/music',
        name: 'music',
        component: Music
    },
    {
        path: '/events',
        name: 'events',
        component: Events
    },
    {
        path: '/shop',
        name: 'shop',
        component: Shop
    },
    {
        path: '/admin',
        name: 'admin',
        component: Admin
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
