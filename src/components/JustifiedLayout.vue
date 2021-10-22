<template>
	<div ref="gallery" class="gallery">
		<div v-if="values.containerWidth === 0" ref="gallery">&nbsp;</div>
		<Card v-for="(image, index) of values.thumbs" :key="index" :image="image" :margin="10" @click="clickCard">
			<template #inner-description>
				<div class="h-full bg-gray-400 rounded-md bg-opacity-40 px-2">
					<p class="text-lg text-white">Another Title</p>
				</div>
			</template>
			<template #outer-description>
				<div
					class="h-12 overflow-hidden mx-2 px-2 bg-gray-100 bg-opacity-60 rounded-md"
					:style="{ width: image.size.width + 'px' }"
				>
					<p class="font-semibold text-sm text-gray-900">Some Title sadsads sd as</p>
				</div>
			</template>
		</Card>
	</div>
	<slot name="after"></slot>
</template>
<script lang="ts">
import { defineComponent, ref, onMounted, onUnmounted, onUpdated, reactive, PropType } from 'vue'
import { IPhoto, LayoutType } from '@/types'
import { rowLayout } from '@/plugins/gallery'
import Card from './Card.vue'

export default defineComponent({
	name: 'JustifiedLayout',
	components: {
		Card,
	},
	props: {
		images: {
			type: Array as PropType<IPhoto[]>,
			required: true,
		},
	},
	setup(props): {
		values: { thumbs: IPhoto[]; containerWidth: number; observer: ResizeObserver }
		clickCard: () => void
		gallery: any
	} {
		const values = reactive<{ thumbs: IPhoto[]; containerWidth: number; observer: ResizeObserver }>({
			thumbs: [],
			containerWidth: 0,
			observer: null,
		})
		const gallery = ref<HTMLDivElement>()

		onMounted(() => {
			const box = gallery.value
			const boxSize = box?.getBoundingClientRect()

			initObserver()
			// window.addEventListener('resize', resizeHandler)
		})

		// onUpdated(() => {
		// 	console.log('onUpdated')
		// 	if (values.observer == null) {
		// 		console.log('initObserver')
		// 		initObserver()
		// 	}
		// })

		onUnmounted(() => {
			if (values.observer !== null) values.observer.unobserve(gallery.value)
			// window.removeEventListener('resize', resizeHandler)
		})

		const initObserver = () => {
			const obs = new ResizeObserver(onResize)
			obs.observe(gallery.value)
			values.observer = obs
		}

		const onResize = () => {
			const box = gallery.value
			const width = box.offsetWidth
			const height = box.offsetHeight

			console.log('resize', { width, height }, box.offsetWidth, box.clientWidth)
			values.containerWidth = width

			const container = width - 1
			if (width !== 0) {
				computeSize(container)
			}
		}

		const resizeHandler = () => {
			values.containerWidth = gallery.value.offsetWidth
			console.log('resizeHandler', values.containerWidth)
			computeSize(values.containerWidth)
		}

		const computeSize = (containerWidth: number): void => {
			values.thumbs = rowLayout({
				row: {
					width: containerWidth - 1,
					height: 360,
					// maxItems: 5,
				},
				item: {
					margin: 10,
					minWidth: 180,
					maxWidth: 720,
				},
				sizes: props.images,
				layout: LayoutType.Naive,
			})
		}

		const clickCard = () => {
			console.log('Click card')
		}

		return {
			values,
			clickCard,
			gallery,
		}
	},
})
</script>
<style lang="scss">
.gallery {
	display: flex !important;
	flex-wrap: wrap;
	flex-direction: 'row';
	max-width: 1600px;
}
</style>
