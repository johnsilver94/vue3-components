<template>
	<div class="text-yellow-500">CubeGallery 2 {{ name }}</div>
	<lightgallery class="light-gallery" :settings="{ speed: 500 }">
		<a class="cg-item"><img src="https://picsum.photos/200/300?random=1" /></a>
		<a class="cg-item"><img src="https://picsum.photos/300/300?random=1" /></a>
		<a class="cg-item"><img src="https://picsum.photos/400/300?random=1" /></a>
		<a class="cg-item"><img src="https://picsum.photos/500/300?random=1" /></a>
		<a class="cg-item"><img src="https://picsum.photos/600/300?random=1" /></a>
		<a class="cg-item"><img src="https://picsum.photos/200/200?random=1" /></a>
		<a class="cg-item"><img src="https://picsum.photos/300/200?random=1" /></a>
		<a class="cg-item"><img src="https://picsum.photos/400/200?random=1" /></a>
		<a class="cg-item"><img src="https://picsum.photos/500/200?random=1" /></a>
		<a class="cg-item"><img src="https://picsum.photos/600/200?random=1" /></a>
		<a class="cg-item"><img src="https://picsum.photos/200/400?random=1" /></a>
		<a class="cg-item"><img src="https://picsum.photos/300/400?random=1" /></a>
		<a class="cg-item"><img src="https://picsum.photos/400/400?random=1" /></a>
		<a class="cg-item"><img src="https://picsum.photos/500/400?random=1" /></a>
		<a class="cg-item"><img src="https://picsum.photos/600/400?random=1" /></a>
		<a class="cg-item"><img src="https://picsum.photos/200/500?random=1" /></a>
		<a class="cg-item"><img src="https://picsum.photos/300/500?random=1" /></a>
		<a class="cg-item"><img src="https://picsum.photos/400/500?random=1" /></a>
		<a class="cg-item"><img src="https://picsum.photos/500/500?random=1" /></a>
		<a class="cg-item"><img src="https://picsum.photos/600/500?random=1" /></a>
		<a class="cg-item"><img src="https://picsum.photos/200/300?random=2" /></a>
		<a class="cg-item"><img src="https://picsum.photos/300/300?random=2" /></a>
		<a class="cg-item"><img src="https://picsum.photos/400/300?random=2" /></a>
		<a class="cg-item"><img src="https://picsum.photos/500/300?random=2" /></a>
		<a class="cg-item"><img src="https://picsum.photos/600/300?random=2" /></a>
		<a class="cg-item"><img src="https://picsum.photos/200/200?random=2" /></a>
		<a class="cg-item"><img src="https://picsum.photos/300/200?random=2" /></a>
		<a class="cg-item"><img src="https://picsum.photos/400/200?random=2" /></a>
		<a class="cg-item"><img src="https://picsum.photos/500/200?random=2" /></a>
		<a class="cg-item"><img src="https://picsum.photos/600/200?random=2" /></a>
		<a class="cg-item"><img src="https://picsum.photos/200/400?random=2" /></a>
		<a class="cg-item"><img src="https://picsum.photos/300/400?random=2" /></a>
		<a class="cg-item"><img src="https://picsum.photos/400/400?random=2" /></a>
		<a class="cg-item"><img src="https://picsum.photos/500/400?random=2" /></a>
		<a class="cg-item"><img src="https://picsum.photos/600/400?random=2" /></a>
		<a class="cg-item"><img src="https://picsum.photos/200/500?random=2" /></a>
		<a class="cg-item"><img src="https://picsum.photos/300/500?random=2" /></a>
		<a class="cg-item"><img src="https://picsum.photos/400/500?random=2" /></a>
		<a class="cg-item"><img src="https://picsum.photos/500/500?random=2" /></a>
		<a class="cg-item"><img src="https://picsum.photos/600/500?random=2" /></a>
		<a class="cg-item"><img src="https://picsum.photos/200/300?random=3" /></a>
		<a class="cg-item"><img src="https://picsum.photos/300/300?random=3" /></a>
		<a class="cg-item"><img src="https://picsum.photos/400/300?random=3" /></a>
		<a class="cg-item"><img src="https://picsum.photos/500/300?random=3" /></a>
		<a class="cg-item"><img src="https://picsum.photos/600/300?random=3" /></a>
		<a class="cg-item"><img src="https://picsum.photos/200/200?random=3" /></a>
		<a class="cg-item"><img src="https://picsum.photos/300/200?random=3" /></a>
		<a class="cg-item"><img src="https://picsum.photos/400/200?random=3" /></a>
		<a class="cg-item"><img src="https://picsum.photos/500/200?random=3" /></a>
		<a class="cg-item"><img src="https://picsum.photos/600/200?random=3" /></a>
		<a class="cg-item"><img src="https://picsum.photos/200/400?random=3" /></a>
		<a class="cg-item"><img src="https://picsum.photos/300/400?random=3" /></a>
		<a class="cg-item"><img src="https://picsum.photos/400/400?random=3" /></a>
		<a class="cg-item"><img src="https://picsum.photos/500/400?random=3" /></a>
		<a class="cg-item"><img src="https://picsum.photos/600/400?random=3" /></a>
		<a class="cg-item"><img src="https://picsum.photos/200/500?random=3" /></a>
		<a class="cg-item"><img src="https://picsum.photos/300/500?random=3" /></a>
		<a class="cg-item"><img src="https://picsum.photos/400/500?random=3" /></a>
		<a class="cg-item"><img src="https://picsum.photos/500/500?random=3" /></a>
		<a class="cg-item"><img src="https://picsum.photos/600/500?random=3" /></a>
	</lightgallery>
</template>
<script setup lang="ts">
import { computed } from 'vue'
import { useStore } from 'vuex'
import Lightgallery from 'lightgallery/vue'
import { key } from '@/store'

const store = useStore(key)

const name = computed(() => {
	return store.state.user.name
})
</script>
<style lang="scss">
@import 'lightgallery/css/lightgallery.css';
@import 'lightgallery/css/lg-thumbnail.css';
@import 'lightgallery/css/lg-zoom.css';

.lightgallery {
	display: flex !important;
	flex-wrap: wrap;
}
</style>
