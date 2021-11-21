import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HelloWorld from '@views/HelloWorld.vue'
import Gallery from '@views/Gallery.vue'
import JustifiedGallery from '@views/JustifiedGallery.vue'
import Picker from '@views/Picker.vue'
import Components from '@views/Components.vue'
import Sliders from '@views/Sliders.vue'

const routes: RouteRecordRaw[] = [
	{ path: '/', name: 'HelloWorld', component: HelloWorld },
	{ path: '/gallery', name: 'Gallery', component: Gallery },
	{ path: '/justifiedgallery', name: 'JustifiedGallery', component: JustifiedGallery },
	{ path: '/picker', name: 'Picker', component: Picker },
	{ path: '/components', name: 'Components', component: Components },
	{ path: '/sliders', name: 'Sliders', component: Sliders },
]
const router = createRouter({
	history: createWebHistory(),
	routes,
})

export default router
