<template>
	<div ref="gallery" class="gallery">
		<div
			v-for="(image, index) of values.thumbs"
			:key="index"
			class="jg-item rounded-lg"
			:style="{ margin: '10px', width: image.size.width + 'px', height: image.size.height + 'px' }"
		>
			<div class="jg-item-overlay p-2 flex flex-col justify-between hover:opacity-80">
				<div>
					<button class="float-left hover:text-purple-500 hover:bg-white text-gray-900">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="h-6 w-6"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="1"
								d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
							/>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="1"
								d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
							/>
						</svg>
					</button>
					<button class="float-right hover:text-purple-500 hover:bg-white">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="h-6 w-6"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="1"
								d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
							/>
						</svg>
					</button>
				</div>
				<div>
					<p class="text-sm text-gray-500 text-center hidden">Over Image</p>
					<span class="float-right text-red-400">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="h-6 w-6"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"
							/>
						</svg>
					</span>
					<p class="text-lg text-white">Some Title</p>
				</div>
			</div>
			<div class="jg-item-content">
				<img :src="image.src" class="jg-item-background" />
				<img :src="image.src" class="jg-item-img" />
			</div>
		</div>
	</div>
</template>
<script setup lang="ts">
import { ref, onMounted, onUnmounted, onBeforeMount, watch, reactive } from 'vue'
import { IPhoto, LayoutType } from '@/types'
import { rowLayout } from '@/plugins/gallery'

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

.jg-item {
	position: relative;
	display: flex;
	overflow: hidden;

	.jg-item-content {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
		height: 100%;

		.jg-item-background {
			position: absolute;
			display: flex;
			width: inherit;
			height: inherit;
			opacity: 0.5;
			transform: scale(1.5);
			filter: blur(10px);
		}

		.jg-item-img {
			z-index: 10;
			display: block;
			object-fit: contain;
		}

		img {
			display: block;
			max-width: 100%;
			max-height: 100%;
		}
	}
}

.jg-item-overlay {
	position: absolute;
	left: 0;
	right: 0;
	top: 0;
	bottom: 0;
	z-index: 100;

	p {
		font-size: 16px;
		float: left;
	}
}
</style>
