<template>
	<div ref="gallery" class="gallery">
		<div v-if="containerWidth === 0">There are no photos</div>
		<Card
			v-for="(image, index) of thumbs"
			:key="index"
			:image="image"
			:margin="10"
			@click="clickCard"
			@click:card-settings="cardSettingsHandler($event)"
		>
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
import { defineComponent, ref, onMounted, onUnmounted, reactive, PropType, Ref, toRefs } from 'vue'
import { throttle } from 'lodash'
import { IPhoto, LayoutType } from '@/types'
import { rowLayout } from '@/plugins/gallery'
import Card from './Card.vue'

type Values = {
	thumbs: IPhoto[]
	containerWidth: number
	observer: ResizeObserver
}

type Res = {
	thumbs: Ref<IPhoto[]>
	containerWidth: Ref<number>
	observer: Ref<ResizeObserver>
	clickCard: () => void
	gallery: Ref<HTMLDivElement>
	cardSettingsHandler: (image: IPhoto) => void
	computeSize: (containerWidth: number) => void
}

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
	emits: ['update:sizes'],
	setup(props, { emit }): Res {
		const values = reactive<Values>({
			thumbs: [],
			containerWidth: 0,
			observer: null,
		})
		const gallery = ref<HTMLDivElement>()

		onMounted(() => {
			initObserver()
		})

		onUnmounted(() => {
			if (values.observer !== null) values.observer.unobserve(gallery.value)
		})

		const initObserver = () => {
			const obs = new ResizeObserver(throttle(onResize, 1000))
			obs.observe(gallery.value)
			values.observer = obs
		}

		const onResize = () => {
			if (!gallery.value) return
			const box = gallery.value
			const { offsetWidth, offsetHeight } = box

			console.log('resize', { offsetWidth, offsetHeight }, box.offsetWidth, box.clientWidth)
			if (values.containerWidth !== offsetWidth && offsetWidth !== 0) {
				values.containerWidth = offsetWidth

				const container = offsetWidth
				computeSize(container)
			}
		}

		const computeSize = (containerWidth: number): void => {
			console.log('computeSize', containerWidth)
			const sizes = rowLayout({
				row: {
					width: containerWidth - 1,
					height: 360, // 240 if containerWidth is < 700
					// maxItems: 5,
				},
				item: {
					margin: 10,
					minWidth: 180, // optimal to be 1/2 from row.height
					maxWidth: 480, // optimal to be 1 + 1/2 from row.height
				},
				sizes: props.images,
				layout: LayoutType.Naive,
			})

			values.thumbs = sizes
			emit('update:sizes', sizes)
		}

		const clickCard = () => {
			console.log('Click card')
		}

		const cardSettingsHandler = (image: IPhoto): void => {
			console.log(image, typeof image)
		}

		return {
			...toRefs(values),
			clickCard,
			gallery,
			cardSettingsHandler,
			computeSize,
		}
	},
})
</script>
<style lang="scss">
.gallery {
	display: flex !important;
	flex-wrap: wrap;
	flex-direction: 'row';
}
</style>
