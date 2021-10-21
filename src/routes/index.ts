import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HelloWorld from '@views/HelloWorld.vue'
import Gallery from '@views/Gallery.vue'
import CubeGallery from '@views/CubeGallery.vue'
import LightGallery from '@views/LightGallery.vue'
import VueJustifiedLayout from '@views/VueJustifiedLayout.vue'
import JustifiedGallery from '@views/JustifiedGallery.vue'
import CreloGallery from '@views/CreloGallery.vue'

const routes: RouteRecordRaw[] = [
	{ path: '/', name: 'HelloWorld', component: HelloWorld },
	{ path: '/gallery', name: 'Gallery', component: Gallery },
	{ path: '/cubegallery', name: 'CubeGallery', component: CubeGallery },
	{ path: '/lightgallery', name: 'LightGallery', component: LightGallery },
	{ path: '/vuejustifiedlayout', name: 'VueJustifiedLayout', component: VueJustifiedLayout },
	{ path: '/justifiedgallery', name: 'JustifiedGallery', component: JustifiedGallery },
	{ path: '/crelogallery', name: 'CreloGallery', component: CreloGallery },
]
const router = createRouter({
	history: createWebHistory(),
	routes,
})

export default router
