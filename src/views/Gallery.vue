<template>
	<div class="text-yellow-500">Gallery {{ name }}</div>
	<div class="flex flex-row">
		<div class="w-60">
			<p>Some Text</p>
		</div>
		<div class="gallery-grid">
			<div
				v-for="(image, index) of images"
				:key="index"
				class="item m-5 rounded-md border-1/2 border-gray-200 shadow-sm hover:border-purple-600"
			>
				<div class="item-overlay p-2 flex flex-col justify-between">
					<div>
						<button class="float-left hover:text-purple-500 hover:bg-white">
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
				<div class="item-content">
					<img :src="image.src" class="item-img" @load="imgLoad" />
					<img :src="image.src" class="background rounded-md" />
				</div>
			</div>
		</div>
	</div>
</template>
<script setup lang="ts">
import { computed } from 'vue'
import { useStore } from 'vuex'
import { key } from '@/store'

const store = useStore(key)

const images: { src: string; width: number; height: number }[] = [
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

const name = computed(() => {
	return store.state.user.name
})

const ratio = { min: 0.5, max: 2 }

const imgLoad = (event: Event) => {
	let img = event.target as HTMLImageElement
	let imgRatio = img.naturalWidth / img.naturalHeight
	let gRatio = img.naturalWidth / img.naturalHeight
	if (imgRatio < ratio.min) {
		gRatio = ratio.min
	}
	if (imgRatio > ratio.max) {
		gRatio = ratio.max
	}
	img.parentElement?.parentElement?.style.setProperty('--img-ratio', imgRatio.toString())
	img.parentElement?.parentElement?.style.setProperty('--ratio', gRatio.toString())
}
</script>
<style lang="scss">
.gallery-grid {
	display: flex !important;
	flex-wrap: wrap;
	flex-direction: 'column';
	max-width: 1280px;

	--row-height: 200;
	--ratio: 1;
}

.item {
	position: relative;
	display: flex;
	overflow: hidden;
	width: calc(var(--row-height) * var(--ratio) * 1px);
	max-height: calc(var(--row-height) * 1.5 * 1px);
	flex-grow: calc(var(--ratio) * 10);

	.item-content {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
		height: 100%;

		.background {
			position: absolute;
			display: flex;
			// height: 100%;
			// object-fit: fill;
			width: inherit;
			height: inherit;
			opacity: 0.7;
			// transform: scale(1);
			filter: blur(8px);
		}

		.item-img {
			z-index: 10;
			display: block;
			// object-fit: contain;
			object-fit: cover;
			// max-height: inherit;
			// height: inherit;
		}

		img {
			display: block;
			max-width: 100%;
			max-height: 100%;
			flex-grow: calc(var(--img-ratio) * 10);
		}
	}
}

.item-overlay {
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
