<template>
	<div ref="gallery" class="gallery">
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
import { defineComponent, ref, onMounted, onUnmounted, watch, reactive, PropType } from 'vue'
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
	setup(props): { values: { thumbs: IPhoto[] }; clickCard: () => void } {
		const values = reactive<{ thumbs: IPhoto[] }>({
			thumbs: [],
		})

		const gallery = ref<HTMLDivElement>()
		const containerWidth = ref<number>(null)

		onMounted(() => {
			containerWidth.value = gallery?.value?.clientWidth
			window.addEventListener('resize', resizeHandler)
		})

		onUnmounted(() => {
			window.removeEventListener('resize', resizeHandler)
		})

		// onBeforeMount(() => {})

		watch(containerWidth, (newContainerWidth, oldContainerWidth) => {
			console.log('watch', newContainerWidth, oldContainerWidth)
			const container = 1600 - 1 // scrollbar == 17 when full page

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
				sizes: props.images,
				layout: LayoutType.Naive,
			})
		})

		const resizeHandler = () => {
			containerWidth.value = gallery?.value?.clientWidth
		}

		const clickCard = () => {
			containerWidth.value = 1280
		}

		return {
			values,
			clickCard,
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
