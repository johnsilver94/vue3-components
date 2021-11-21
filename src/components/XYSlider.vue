<template>
	<div ref="areaRef" class="area bg-white" :style="[slider.areaStyle]" @click="mouseClick">
		<div
			class="slider"
			:style="[
				slider.style,
				{
					left: x + 'px',
					bottom: y + 'px',
					width: slider.size + 'px',
					height: slider.size + 'px',
				},
			]"
			@mousedown="mouseDown"
		/>
	</div>
</template>
<script lang="ts">
import { defineComponent, onMounted, PropType, ref, Ref, reactive } from '@vue/runtime-core'
import { throttle, clamp } from 'lodash'
import { computed, ComputedRef, CSSProperties, toRefs } from 'vue'

type XYCoordinates =
	| {
			x: number
			y: number
	  }
	| {
			x?: number
			y: number
	  }
	| {
			x: number
			y?: number
	  }

enum Axis {
	X = 'x',
	Y = 'y',
	XY = 'xy',
}

type Slider = {
	size: number
	position: XYCoordinates
	style?: CSSProperties
	areaStyle?: CSSProperties
}

type Res = {
	areaRef: Ref<HTMLDivElement>
	x?: Ref<number>
	y?: Ref<number>
	sliderComputed: ComputedRef<CSSProperties>
	mouseDown: (e: MouseEvent) => void
	mouseClick: (e: MouseEvent) => void
}

export default defineComponent({
	name: 'XYSlider',
	props: {
		slider: {
			type: Object as PropType<Slider>,
			required: true,
			// eslint-disable-next-line vue/require-valid-default-prop
			default: {
				size: 18,
				position: { x: 0, y: 0 },
			},
		},
		axis: {
			type: String as PropType<Axis>,
			required: false,
			default: Axis.XY,
		},
	},
	emits: [],
	setup(props): Res {
		const coordinates = reactive<XYCoordinates>({
			x: 0,
			y: 0,
		})
		let areaSize: DOMRect = null
		const areaRef = ref<HTMLDivElement>()

		onMounted(() => {
			console.log(props.slider.position, props.axis)
			areaSize = { ...areaRef.value.getBoundingClientRect().toJSON() }
			console.log('area', areaSize)

			const {
				size,
				position: { x, y },
			} = props.slider
			const { width, height } = areaSize

			switch (props.axis) {
				case Axis.X:
					coordinates.x = x * width - size / 2
					coordinates.y = (height - size) / 2
					break
				case Axis.Y:
					coordinates.x = (width - size) / 2
					coordinates.y = y * height - size / 2
					break
				default:
					coordinates.x = x * width - size / 2
					coordinates.y = y * height - size / 2
			}
		})

		const mouseDown = throttle((): void => {
			switch (props.axis) {
				case Axis.X:
					document.documentElement.addEventListener('mousemove', mouseMoveX, true)
					document.documentElement.addEventListener('mouseup', mouseUp, true)
					break
				case Axis.Y:
					document.documentElement.addEventListener('mousemove', mouseMoveY, true)
					document.documentElement.addEventListener('mouseup', mouseUp, true)
					break
				default:
					document.documentElement.addEventListener('mousemove', mouseMoveXY, true)
					document.documentElement.addEventListener('mouseup', mouseUp, true)
			}
		}, 5)

		const mouseUp = throttle((): void => {
			switch (props.axis) {
				case Axis.X:
					document.documentElement.removeEventListener('mousemove', mouseMoveX, true)
					document.documentElement.removeEventListener('mouseup', mouseUp, true)
					break
				case Axis.Y:
					document.documentElement.removeEventListener('mousemove', mouseMoveY, true)
					document.documentElement.removeEventListener('mouseup', mouseUp, true)
					break
				default:
					document.documentElement.removeEventListener('mousemove', mouseMoveXY, true)
					document.documentElement.removeEventListener('mouseup', mouseUp, true)
			}
		}, 5)

		const mouseMoveX = throttle((e: MouseEvent): void => {
			const { clientX } = e
			const { x, width } = areaSize
			const {
				slider: { size },
			} = props

			const dx = clientX - x - size / 2

			coordinates.x = clamp(dx, 0 - size / 2, width - size / 2)

			console.log(`x:${coordinates.x};y:${coordinates.y}`)
		}, 5)

		const mouseMoveY = throttle((e: MouseEvent): void => {
			const { clientY } = e
			const { y, height } = areaSize
			const {
				slider: { size },
			} = props

			const dy = height - (clientY - y + size / 2)

			coordinates.y = clamp(dy, 0 - size / 2, height - size / 2)

			console.log(`x:${coordinates.x};y:${coordinates.y}`)
		}, 5)

		const mouseMoveXY = throttle((e: MouseEvent): void => {
			const { clientX, clientY } = e
			const { x, y, width, height } = areaSize
			const {
				slider: { size },
			} = props

			const dx = clientX - x - size / 2
			const dy = height - (clientY - y + size / 2)

			coordinates.y = clamp(dy, 0 - size / 2, height - size / 2)
			coordinates.x = clamp(dx, 0 - size / 2, width - size / 2)

			console.log(`x:${coordinates.x};y:${coordinates.y}`)
		}, 5)

		const mouseClick = throttle((e: MouseEvent): void => {
			const { offsetX, offsetY } = e
			const { width, height } = areaSize
			const {
				slider: { size },
			} = props

			const dx = offsetX - size / 2
			const dy = height - offsetY - size / 2

			switch (props.axis) {
				case Axis.X:
					coordinates.x = clamp(dx, 0 - size / 2, width - size / 2)
					break
				case Axis.Y:
					coordinates.y = clamp(dy, 0 - size / 2, height - size / 2)
					break
				default:
					coordinates.y = clamp(dy, 0 - size / 2, height - size / 2)
					coordinates.x = clamp(dx, 0 - size / 2, width - size / 2)
			}
			console.log(`x:${coordinates.x};y:${coordinates.y}`)
		}, 5)

		const sliderComputed = computed((): CSSProperties => {
			const { size } = props.slider
			return {
				left: coordinates.x + 'px',
				bottom: coordinates.y + 'px',
				width: size + 'px',
				height: size + 'px',
			}
		})

		return { areaRef, ...toRefs(coordinates), sliderComputed, mouseDown, mouseClick }
	},
})
</script>
<style lang="scss">
.area {
	position: relative;
	user-select: none;
	width: inherit;
	height: inherit;
}
.slider {
	position: absolute;
	box-sizing: border-box;
	border-radius: 50%;
	border: 2px solid gray;
}
</style>
