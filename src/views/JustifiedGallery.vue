<template>
	<div class="text-yellow-500 h-40">JustifiedGallery Flickr {{ name }}</div>
	<div class="flex flex-row">
		<div class="w-80">
			<p>Some Text</p>
		</div>
		<JustifiedLayout :images="images"></JustifiedLayout>
	</div>
</template>
<script lang="ts">
import JustifiedLayout from '@components/JustifiedLayout.vue'
import { computed, ComputedRef } from 'vue'
import { useStore } from 'vuex'
import { key } from '@/store'
import { IPhoto } from '@/types'

type JustifiedGalleryProps = {
	name: ComputedRef<string>
	images: IPhoto[]
}

export default {
	name: 'JustifiedGallery',
	components: {
		JustifiedLayout,
	},
	setup(): JustifiedGalleryProps {
		const store = useStore(key)

		const name: ComputedRef<string> = computed(() => {
			return store.state.user.name
		})

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

		return { name, images }
	},
}
</script>
<style lang="scss">
.justifiedgallery {
	display: flex !important;
	flex-wrap: wrap;
	flex-direction: 'row';
	max-width: 1600px;
}

.jg-item {
	position: relative;

	img {
		width: 100%;
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
