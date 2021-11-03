<template>
	<div ref="cursorArea" class="cursor-area bg-white">
		<div class="cursor" :style="{ left: x + 'px', bottom: y + 'px' }" @mousedown="mouseDown" />
	</div>
</template>
<script lang="ts">
import { defineComponent, onMounted, PropType, ref, Ref, toRefs, reactive } from '@vue/runtime-core'
import { throttle, clamp } from 'lodash'
import { type } from 'os'

type XCoordinates = {
	x: number
	y?: number
}

type YCoordinates = {
	x?: number
	y: number
}

type XYCoordinates = {
	x: number
	y: number
}

type ICoordinates = XCoordinates | YCoordinates | XYCoordinates

enum DragDirection {
	X = 'XAxis',
	Y = 'YAxis',
	XY = 'XYAxis',
}

const pickerRadius = 16 / 2

export default defineComponent({
	name: 'CursorArea',
	props: {
		position: {
			type: Object as PropType<ICoordinates>,
			required: true,
		},
		direction: {
			type: String as PropType<DragDirection>,
			default: DragDirection.XY,
		},
	},
	emits: [],
	setup(props, { emit }) {
		const coordinates = reactive<XYCoordinates>({
			x: 0,
			y: 0,
		})
		let area: { x: number; y: number; width: number; height: number; clientX: number; offsetY: number } = null
		const cursorArea = ref<HTMLDivElement>()

		onMounted(() => {
			console.log(props.position, props.direction)
			area = cursorArea.value.getBoundingClientRect().toJSON()
			console.log('areea', area)

			switch (props.direction) {
				case DragDirection.X:
					console.log('X Area')
					coordinates.x = props.position.x - pickerRadius
					coordinates.y = area.height / 2 - pickerRadius
					break
				case DragDirection.Y:
					console.log('Y Area')
					break
				default:
					console.log('XY Area')
					coordinates.x = props.position.x - pickerRadius
					coordinates.y = props.position.y - pickerRadius
			}
		})

		const mouseDown = throttle((e: MouseEvent): void => {
			document.documentElement.addEventListener('mousemove', mouseMove, true)
			document.documentElement.addEventListener('mouseup', mouseUp, true)
		}, 5)

		const mouseMove = throttle((e: MouseEvent): void => {
			console.log(area.y, e.clientY)

			const dx = e.clientX - area.x - pickerRadius
			const dy = area.height - (e.clientY - area.y + pickerRadius)

			switch (props.direction) {
				case DragDirection.X:
					coordinates.x = clamp(dx, 0 - pickerRadius, area.width - pickerRadius)
					break
				case DragDirection.Y:
					coordinates.y = clamp(dy, 0 - pickerRadius, area.height - pickerRadius)
					break
				default:
					coordinates.y = clamp(dy, 0 - pickerRadius, area.height - pickerRadius)
					coordinates.x = clamp(dx, 0 - pickerRadius, area.width - pickerRadius)
					console.log(coordinates.x, coordinates.y)
			}
		}, 5)

		const mouseUp = throttle((e: MouseEvent): void => {
			document.documentElement.removeEventListener('mousemove', mouseMove, true)
			document.documentElement.removeEventListener('mouseup', mouseUp, true)
		}, 5)

		return { cursorArea, ...toRefs(coordinates), mouseDown, mouseMove, mouseUp }
	},
})
</script>
<style lang="scss">
.cursor-area {
	position: relative;
	user-select: none;
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
