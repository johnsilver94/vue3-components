<template>
	<div ref="areaRef" :class="['area bg-white', slider.areaClass]" :style="[slider.areaStyle]" @click.self="mouseClick">
		<div :class="['slider', slider.class]" :style="[slider.style, sliderComputedStyle]" @mousedown="mouseDown" />
	</div>
</template>
<script lang="ts">
import { defineComponent, onMounted, PropType, ref, Ref, reactive, SetupContext, onUpdated } from '@vue/runtime-core'
import { clamp } from 'lodash'
import { computed, ComputedRef, CSSProperties, toRefs } from 'vue'
import type { XYCoordinates, Slider } from '@/types/slider'
import { Axis, SliderMode, Range } from '@/types/slider'

type Res = {
	areaRef: Ref<HTMLDivElement>
	x?: Ref<number>
	y?: Ref<number>
	sliderComputedStyle: ComputedRef<CSSProperties>
	mouseDown: (e: MouseEvent) => void
	mouseClick: (e: MouseEvent) => void
}

export default defineComponent({
	name: 'XYSlider',
	props: {
		modelValue: {
			type: Object as PropType<XYCoordinates>,
			required: true,
			default: () => {
				return { x: 0, y: 0 }
			},
		},
		slider: {
			type: Object as PropType<Slider>,
			required: true,
			// eslint-disable-next-line vue/require-valid-default-prop
			default: {
				size: 18,
				mode: SliderMode.SEMI,
			},
		},
		axis: {
			type: String as PropType<Axis>,
			required: false,
			default: Axis.XY,
		},
	},
	emits: ['update:coordinates', 'update:modelValue'],
	setup(props, { emit }: SetupContext): Res {
		const coordinates = reactive<XYCoordinates>({
			x: 0,
			y: 0,
		})
		let moveRangeDeviation: Range = { min: 0, max: 0, total: 0 }
		let areaSize: DOMRect = null
		const areaRef = ref<HTMLDivElement>()
		let translateSlider = ''

		onMounted(() => {
			areaSize = { ...areaRef.value.getBoundingClientRect().toJSON() }

			setCoordinates()
		})

		onUpdated(() => {
			console.log('onUpdated')
			setCoordinates()

			// const { size } = props.slider
			// const { x, y } = props.modelValue
			// const { width, height } = areaSize

			// switch (props.axis) {
			// 	case Axis.X:
			// 		coordinates.x = x * (width + moveRangeDeviation.total) + moveRangeDeviation.min
			// 		coordinates.y = (height - size) / 2
			// 		translateSlider = `translateX(-${size / 2}px)`
			// 		break
			// 	case Axis.Y:
			// 		coordinates.x = (width - size) / 2
			// 		coordinates.y = y * height
			// 		translateSlider = `translateY(${size / 2}px)`
			// 		break
			// 	default:
			// 		coordinates.x = x * width
			// 		coordinates.y = y * height
			// 		translateSlider = `translate(-${size / 2}px,${size / 2}px)`
			// }
		})

		const setCoordinates = (): void => {
			const { size } = props.slider
			const { x, y } = props.modelValue
			const { width, height } = areaSize

			switch (props.slider.mode) {
				case SliderMode.INSIDE:
					moveRangeDeviation = { min: size / 2, max: -size / 2, total: -size }
					break
				case SliderMode.OUTSIDE:
					moveRangeDeviation = { min: 0 - size / 2, max: size / 2, total: size }
					break
				default:
					moveRangeDeviation = { min: 0, max: 0, total: 0 }
			}

			switch (props.axis) {
				case Axis.X:
					coordinates.x = x * (width + moveRangeDeviation.total) + moveRangeDeviation.min
					coordinates.y = (height - size) / 2
					translateSlider = `translateX(-${size / 2}px)`
					break
				case Axis.Y:
					coordinates.x = (width - size) / 2
					coordinates.y = y * height
					translateSlider = `translateY(${size / 2}px)`
					break
				default:
					coordinates.x = x * width
					coordinates.y = y * height
					translateSlider = `translate(-${size / 2}px,${size / 2}px)`
			}
		}
		const mouseDown = (): void => {
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
		}

		const mouseUp = (): void => {
			// console.log('mouseUp', props.axis)
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
		}

		const mouseMoveX = (e: MouseEvent) => {
			const { clientX } = e
			const { x, width } = areaSize

			// get slider center of mass
			const dx = clientX - x

			// x coordinates must have value in range [0 + moveRangeDeviation.min, width + moveRangeDeviation.max]
			coordinates.x = clamp(dx, 0 + moveRangeDeviation.min, width + moveRangeDeviation.max)

			const coordinatesRes: XYCoordinates = {
				x: (coordinates.x - moveRangeDeviation.min) / (width + moveRangeDeviation.total),
			}
			emit('update:coordinates', coordinatesRes)
			emit('update:modelValue', coordinatesRes)
		}

		const mouseMoveY = (e: MouseEvent): void => {
			const { clientY } = e
			const { y, height } = areaSize

			// get slider center of mass
			const dy = height - (clientY - y)

			coordinates.y = clamp(dy, 0 + moveRangeDeviation.min, height + moveRangeDeviation.max)

			const coordinatesRes: XYCoordinates = {
				y: (coordinates.y - moveRangeDeviation.min) / (height + moveRangeDeviation.total),
			}

			emit('update:coordinates', coordinatesRes)
			emit('update:modelValue', coordinatesRes)
		}

		const mouseMoveXY = (e: MouseEvent): void => {
			const { clientX, clientY } = e
			const { x, y, width, height } = areaSize

			// get slider center of mass
			const dx = clientX - x
			const dy = height - (clientY - y)

			coordinates.y = clamp(dy, 0 + moveRangeDeviation.min, height + moveRangeDeviation.max)
			coordinates.x = clamp(dx, 0 + moveRangeDeviation.min, width + moveRangeDeviation.max)

			const coordinatesRes: XYCoordinates = {
				x: (coordinates.x - moveRangeDeviation.min) / (width + moveRangeDeviation.total),
				y: (coordinates.y - moveRangeDeviation.min) / (height + moveRangeDeviation.total),
			}

			emit('update:coordinates', coordinatesRes)
			emit('update:modelValue', coordinatesRes)
		}

		const mouseClickX = (e: MouseEvent): void => {
			const { offsetX } = e
			const { width } = areaSize

			const dx = offsetX
			let coordinatesRes: XYCoordinates

			coordinates.x = clamp(dx, 0 + moveRangeDeviation.min, width + moveRangeDeviation.max)
			coordinatesRes = {
				x: (coordinates.x - moveRangeDeviation.min) / (width + moveRangeDeviation.total),
			}

			emit('update:coordinates', coordinatesRes)
			emit('update:modelValue', coordinatesRes)
		}

		const mouseClickY = (e: MouseEvent): void => {
			const { offsetY } = e
			const { height } = areaSize

			const dy = height - offsetY

			let coordinatesRes: XYCoordinates

			coordinates.y = clamp(dy, 0 + moveRangeDeviation.min, height + moveRangeDeviation.max)
			coordinatesRes = { y: (coordinates.y - moveRangeDeviation.min) / (height + moveRangeDeviation.total) }

			emit('update:coordinates', coordinatesRes)
			emit('update:modelValue', coordinatesRes)
		}

		const mouseClickXY = (e: MouseEvent): void => {
			const { offsetX, offsetY } = e
			const { width, height } = areaSize

			const dx = offsetX
			const dy = height - offsetY

			let coordinatesRes: XYCoordinates

			coordinates.x = clamp(dx, 0 + moveRangeDeviation.min, width + moveRangeDeviation.max)
			coordinates.y = clamp(dy, 0 + moveRangeDeviation.min, height + moveRangeDeviation.max)

			coordinatesRes = {
				x: (coordinates.x - moveRangeDeviation.min) / (width + moveRangeDeviation.total),
				y: (coordinates.y - moveRangeDeviation.min) / (height + moveRangeDeviation.total),
			}

			emit('update:coordinates', coordinatesRes)
			emit('update:modelValue', coordinatesRes)
		}

		const mouseClick = (e: MouseEvent) => {
			switch (props.axis) {
				case Axis.X:
					return mouseClickX(e)
				case Axis.Y:
					return mouseClickY(e)
				default:
					return mouseClickXY(e)
			}
		}

		const sliderComputedStyle = computed((): CSSProperties => {
			const { size } = props.slider

			return {
				left: coordinates.x + 'px',
				bottom: coordinates.y + 'px',
				width: size + 'px',
				height: size + 'px',
				transform: translateSlider,
			}
		})

		return { areaRef, ...toRefs(coordinates), sliderComputedStyle, mouseDown, mouseClick }
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

	&:hover {
		transform: scale(1.2);
	}
}
</style>
