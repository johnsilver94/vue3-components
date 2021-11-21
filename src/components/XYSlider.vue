<template>
	<div ref="areaRef" :class="['area bg-white', slider.areaClass]" :style="[slider.areaStyle]" @click.self="mouseClick">
		<div
			:class="['slider', slider.class]"
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
import { clamp } from 'lodash'
import { computed, ComputedRef, CSSProperties, toRefs } from 'vue'
import type { XYCoordinates, Slider } from '@/types/slider'
import { Axis, SliderMode } from '@/types/slider'

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
				mode: SliderMode.SEMI,
			},
		},
		axis: {
			type: String as PropType<Axis>,
			required: false,
			default: Axis.XY,
		},
	},
	emits: ['update:values'],
	setup(props, { emit }): Res {
		const coordinates = reactive<XYCoordinates>({
			x: 0,
			y: 0,
		})
		const baseSliderPosition = reactive<{ min: number; max: number }>({
			min: 0,
			max: 0,
		})
		let moveRange: { min: number; max: number; total: number } = { min: 0, max: 100, total: 100 }
		let areaSize: DOMRect = null
		const areaRef = ref<HTMLDivElement>()

		onMounted(() => {
			// console.log(props.slider.position, props.axis, props.slider.mode)
			areaSize = { ...areaRef.value.getBoundingClientRect().toJSON() }
			// console.log('area', areaSize)

			const {
				size,
				position: { x, y },
			} = props.slider
			const { width, height } = areaSize

			switch (props.slider.mode) {
				case SliderMode.INSIDE:
					baseSliderPosition.min = 0
					baseSliderPosition.max = size
					moveRange = { min: 0, max: width - size, total: props.axis === Axis.Y ? height - size : width - size }
					// console.log('SliderMode.INSIDE', baseSliderPosition)
					break
				case SliderMode.OUTSIDE:
					// console.log('SliderMode.OUTSIDE', baseSliderPosition)
					baseSliderPosition.min = size
					baseSliderPosition.max = 0
					moveRange = { min: 0 - size, max: width, total: props.axis === Axis.Y ? height + size : width + size }
					break
				default:
					baseSliderPosition.min = size / 2
					baseSliderPosition.max = size / 2
					moveRange = { min: 0 - size / 2, max: width - size / 2, total: props.axis === Axis.Y ? height : width }
				// console.log('SliderMode.SEMI', baseSliderPosition)
			}

			switch (props.axis) {
				case Axis.X:
					// console.log(height, size)
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
			// console.log('mouseMoveX')
			const { clientX } = e
			const { x } = areaSize
			const {
				slider: { size },
			} = props

			// get center of slider
			const dx = clientX - x - size / 2

			console.log(`clientX: ${clientX}; x: ${x}`, e, areaSize)

			coordinates.x = clamp(dx, moveRange.min, moveRange.max)

			console.log(`x:${coordinates.x};y:${coordinates.y}`, coordinates.x + moveRange.min)

			emit('update:values', { x: (coordinates.x - moveRange.min) / moveRange.total, y: coordinates.y })
		}

		const mouseMoveY = (e: MouseEvent): void => {
			// console.log('mouseMoveY')
			const { clientY } = e
			const { y, height } = areaSize
			const {
				slider: { size },
			} = props

			const dy = height - (clientY - y + size / 2)

			console.log(`clientY: ${clientY}; y: ${y}`, e, areaSize)

			coordinates.y = clamp(dy, moveRange.min, height - baseSliderPosition.max)

			console.log(`x:${coordinates.x};y:${coordinates.y}`, moveRange)
			emit('update:values', { x: coordinates.x, y: (coordinates.y - moveRange.min) / moveRange.total })
		}

		const mouseMoveXY = (e: MouseEvent): void => {
			// console.log('mouseMoveXY', baseSliderPosition)
			const { clientX, clientY } = e
			const { x, y, width, height } = areaSize
			const {
				slider: { size },
			} = props

			const dx = clientX - x - size / 2
			const dy = height - (clientY - y + size / 2)

			coordinates.y = clamp(dy, 0 - baseSliderPosition.min, height - baseSliderPosition.max)
			coordinates.x = clamp(dx, 0 - baseSliderPosition.min, width - baseSliderPosition.max)

			// console.log(`x:${coordinates.x};y:${coordinates.y}`)
			emit('update:values', { ...coordinates })
		}

		const mouseClick = (e: MouseEvent) => {
			// console.log('mouseClick')
			const { offsetX, offsetY } = e
			const { width, height } = areaSize
			const {
				slider: { size },
			} = props

			const dx = offsetX - size / 2
			const dy = height - offsetY - size / 2

			switch (props.axis) {
				case Axis.X:
					coordinates.x = clamp(dx, moveRange.min, moveRange.max)
					break
				case Axis.Y:
					coordinates.y = clamp(dy, 0 - size / 2, height - size / 2)
					break
				default:
					coordinates.y = clamp(dy, 0 - size / 2, height - size / 2)
					coordinates.x = clamp(dx, 0 - size / 2, width - size / 2)
			}
			//console.log(`x:${coordinates.x};y:${coordinates.y}`)

			emit('update:values', {
				x: (coordinates.x - moveRange.min) / moveRange.total,
				y: (coordinates.y - moveRange.min) / moveRange.total,
			})
		}

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

	&:active {
		transform: scale(1.2);
	}
}
</style>
