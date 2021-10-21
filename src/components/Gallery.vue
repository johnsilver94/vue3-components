<template>
	<div ref="gallery" class="gallery">
		<Card v-for="(image, index) of values.thumbs" :key="index" :image="image" :margin="10" />
	</div>
</template>
<script setup lang="ts">
import { ref, onMounted, onUnmounted, onBeforeMount, watch, reactive } from 'vue'
import { IPhoto, LayoutType } from '@/types'
import { rowLayout } from '@/plugins/gallery'
import Card from './Card.vue'

const images: IPhoto[] = [
	{ src: 'https://picsum.photos/720/1920?random=1', width: 720, height: 1920 },
	{ src: 'https://picsum.photos/720/1920?random=1', width: 720, height: 1920 },
	{ src: 'https://picsum.photos/1920/600?random=1', width: 1920, height: 600 },
	{ src: 'https://picsum.photos/1920/1080?random=1', width: 1920, height: 1080 },
	{ src: 'https://picsum.photos/1080/1920?random=1', width: 1080, height: 1920 },
	{ src: 'https://picsum.photos/1080/1920?random=1', width: 1080, height: 1920 },
	{ src: 'https://picsum.photos/480/2560?random=1', width: 480, height: 2560 },
	{ src: 'https://picsum.photos/2560/480?random=1', width: 2560, height: 480 },
	{ src: 'https://picsum.photos/2560/480?random=1', width: 2560, height: 480 },
	{ src: 'https://picsum.photos/480/1920?random=1', width: 480, height: 1920 },
	{ src: 'https://picsum.photos/1920/480?random=1', width: 1920, height: 480 },
	{ src: 'https://picsum.photos/480/1920?random=1', width: 480, height: 1920 },
	{ src: 'https://picsum.photos/480/480?random=1', width: 480, height: 480 },
	{ src: 'https://picsum.photos/1280/720?random=1', width: 1280, height: 720 },
	{ src: 'https://picsum.photos/500/500?random=1', width: 500, height: 500 },
	{ src: 'https://picsum.photos/600/480?random=1', width: 600, height: 480 },
	{ src: 'https://picsum.photos/800/500?random=1', width: 800, height: 500 },
	{ src: 'https://picsum.photos/480/480?random=1', width: 480, height: 480 },
	{ src: 'https://picsum.photos/480/480?random=1', width: 480, height: 480 },
	{ src: 'https://picsum.photos/900/480?random=1', width: 900, height: 480 },
	{ src: 'https://picsum.photos/600/480?random=1', width: 600, height: 480 },
	{ src: 'https://picsum.photos/480/960?random=1', width: 480, height: 960 },
	{ src: 'https://picsum.photos/480/720?random=1', width: 480, height: 720 },
	{ src: 'https://picsum.photos/480/480?random=1', width: 480, height: 480 },
	{ src: 'https://picsum.photos/480/480?random=1', width: 480, height: 480 },
	{ src: 'https://picsum.photos/720/480?random=1', width: 720, height: 480 },
	{ src: 'https://picsum.photos/480/720?random=1', width: 480, height: 720 },
	{ src: 'https://picsum.photos/480/720?random=1', width: 480, height: 720 },
	{ src: 'https://picsum.photos/480/480?random=1', width: 480, height: 480 },
	{ src: 'https://picsum.photos/600/600?random=1', width: 600, height: 600 },
	{ src: 'https://picsum.photos/600/600?random=1', width: 600, height: 600 },
	{ src: 'https://picsum.photos/480/720?random=2', width: 480, height: 720 },
	{ src: 'https://picsum.photos/480/480?random=2', width: 480, height: 480 },
	{ src: 'https://picsum.photos/480/480?random=2', width: 480, height: 480 },
	{ src: 'https://picsum.photos/1280/480?random=2', width: 1280, height: 480 },
	{ src: 'https://picsum.photos/960/480?random=2', width: 960, height: 480 },
	{ src: 'https://picsum.photos/960/480?random=2', width: 960, height: 480 },
	{ src: 'https://picsum.photos/480/480?random=2', width: 480, height: 480 },
	{ src: 'https://picsum.photos/480/480?random=2', width: 480, height: 480 },
	{ src: 'https://picsum.photos/500/480?random=2', width: 500, height: 480 },
	{ src: 'https://picsum.photos/600/480?random=2', width: 600, height: 480 },
	{ src: 'https://picsum.photos/480/480?random=2', width: 480, height: 480 },
	{ src: 'https://picsum.photos/480/480?random=2', width: 480, height: 480 },
	{ src: 'https://picsum.photos/500/500?random=2', width: 500, height: 500 },
	{ src: 'https://picsum.photos/600/480?random=2', width: 600, height: 480 },
	{ src: 'https://picsum.photos/480/500?random=2', width: 480, height: 500 },
	{ src: 'https://picsum.photos/480/500?random=2', width: 480, height: 500 },
	{ src: 'https://picsum.photos/480/500?random=2', width: 480, height: 500 },
	{ src: 'https://picsum.photos/500/500?random=2', width: 500, height: 500 },
	{ src: 'https://picsum.photos/600/500?random=2', width: 600, height: 500 },
	{ src: 'https://picsum.photos/960/480?random=3', width: 960, height: 480 },
	{ src: 'https://picsum.photos/1280/920?random=3', width: 1280, height: 920 },
	{ src: 'https://picsum.photos/480/480?random=3', width: 480, height: 480 },
	{ src: 'https://picsum.photos/480/480?random=3', width: 480, height: 480 },
	{ src: 'https://picsum.photos/720/480?random=3', width: 720, height: 480 },
	{ src: 'https://picsum.photos/720/480?random=3', width: 720, height: 480 },
	{ src: 'https://picsum.photos/480/960?random=3', width: 480, height: 960 },
	{ src: 'https://picsum.photos/480/480?random=3', width: 480, height: 480 },
	{ src: 'https://picsum.photos/480/480?random=3', width: 480, height: 480 },
	{ src: 'https://picsum.photos/480/480?random=3', width: 480, height: 480 },
	{ src: 'https://picsum.photos/720/480?random=3', width: 720, height: 480 },
	{ src: 'https://picsum.photos/480/1280?random=3', width: 480, height: 1280 },
	{ src: 'https://picsum.photos/480/960?random=3', width: 480, height: 960 },
	{ src: 'https://picsum.photos/480/480?random=3', width: 480, height: 480 },
	{ src: 'https://picsum.photos/480/480?random=3', width: 480, height: 480 },
	{ src: 'https://picsum.photos/1280/720?random=3', width: 1280, height: 720 },
	{ src: 'https://picsum.photos/1280/720?random=3', width: 1280, height: 720 },
	{ src: 'https://picsum.photos/600/500?random=2', width: 600, height: 500 },
	{ src: 'https://picsum.photos/480/480?random=3', width: 480, height: 480 },
	{ src: 'https://picsum.photos/2560/480?random=1', width: 2560, height: 480 },
	{ src: 'https://picsum.photos/480/1280?random=3', width: 480, height: 1280 },
	{ src: 'https://picsum.photos/480/1280?random=3', width: 480, height: 1280 },
	{ src: 'https://picsum.photos/480/2560?random=1', width: 480, height: 2560 },
	{ src: 'https://picsum.photos/480/2560?random=1', width: 480, height: 2560 },
]

const values = reactive<{ thumbs: IPhoto[] }>({
	thumbs: [],
})

const gallery = ref<HTMLDivElement>()
const containerWidth = ref<number>(null)

onMounted(() => {
	containerWidth.value = gallery?.value?.clientWidth
	window.addEventListener('resize', resizeHandler)
	console.log(gallery)
})

onUnmounted(() => {
	window.removeEventListener('resize', resizeHandler)
})

onBeforeMount(() => {
	console.log('update')
})

watch(containerWidth, (newContainerWidth, oldContainerWidth) => {
	console.log('watch', newContainerWidth, oldContainerWidth)
	const container = 1600 - 1 // scrollbar == 17 when full page

	console.log(container)
	values.thumbs = rowLayout({
		row: {
			width: container,
			height: 360,
			// maxItems: 5,
		},
		item: {
			margin: 10,
			minWidth: 180,
			maxWidth: 720,
		},
		sizes: images,
		layout: LayoutType.Naive,
	})
	console.log(values.thumbs)
})

const resizeHandler = () => {
	containerWidth.value = gallery?.value?.clientWidth
}
</script>
<style lang="scss">
.gallery {
	display: flex !important;
	flex-wrap: wrap;
	flex-direction: 'row';
	max-width: 1600px;
}
</style>
