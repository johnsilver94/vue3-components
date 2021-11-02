<template>
	<div ref="cursorArea" class="cursor-area bg-white">
		<div
			class="cursor"
			:style="{ left: coordinates.x + 'px', bottom: coordinates.y + 'px' }"
			@mousedown="mouseDown"
			@mousemove="mouseMove"
			@mouseup="mouseUp"
			@mouseleave="mouseUp"
		/>
	</div>
</template>
<script lang="ts">
import { defineComponent, onMounted, PropType, ref, Ref, reactive } from '@vue/runtime-core'
import { throttle, clamp } from 'lodash'

export default defineComponent({
	name: 'CursorArea',
	props: {
		position: {
			type: Object as PropType<{ x: number; y: number }>,
			required: true,
		},
	},
	emits: [],
	setup(props, { emit }) {
		let dragging = false
		const coordinates = reactive({
			x: 0,
			y: 0,
		})
		let area: { x: number; y: number; width: number; height: number; offsetX: number; offsetY: number } = null
		const cursorArea = ref<HTMLDivElement>()

		onMounted(() => {
			console.log(props.position, cursorArea.value.getBoundingClientRect())
			coordinates.x = props.position.x - 16 / 2
			coordinates.y = props.position.y - 16 / 2

			area = cursorArea.value.getBoundingClientRect().toJSON()
			console.log('areea', area)
		})

		const mouseDown = throttle((e: MouseEvent): void => {
			dragging = true
			console.log('mouseDown', e.offsetX, e.offsetY)
			area.offsetX = e.offsetX
			area.offsetY = e.offsetY
		}, 5)

		const mouseMove = throttle((e: MouseEvent): void => {
			if (dragging) {
				console.log('mouseMove', e, e.clientX, e.clientY, coordinates)

				const x = coordinates.x + e.offsetX - area.offsetX
				const y = coordinates.y - (e.offsetY + area.offsetY)

				// coordinates.y = clamp(y, 0 + 16 / 2, area.height - 16 / 2)
				// coordinates.x = clamp(x, 0 + 16 / 2, area.width - 16 / 2)

				coordinates.x += e.offsetX - area.offsetX
				coordinates.y -= e.offsetY - area.offsetY

				console.log(x, y, coordinates.x, coordinates.y)
			}
		}, 5)

		const mouseUp = throttle((e: MouseEvent): void => {
			console.log('mouseUp', e.offsetX, e.offsetY)
			dragging = false
		}, 5)
		return { cursorArea, coordinates, mouseDown, mouseMove, mouseUp }
	},
})
</script>
<style lang="scss">
.cursor-area {
	position: relative;
	width: inherit;
	height: inherit;
}
.cursor {
	position: absolute;
	box-sizing: border-box;
	width: 16px;
	height: 16px;
	border-radius: 50%;
	border: 2px solid black;
}
</style>
