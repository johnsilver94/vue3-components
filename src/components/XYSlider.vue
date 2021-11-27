<template>
	<div ref="areaRef" :class="['area bg-white', slider.areaClass]" :style="[slider.areaStyle]" @click.self="mouseClick">
		<div :class="['slider', slider.class]" :style="[slider.style, sliderComputedStyle]" @mousedown="mouseDown" />
	</div>
</template>
<script lang="ts" setup>
import { defineProps, withDefaults, defineEmits, onMounted, ref, reactive, onUpdated } from '@vue/runtime-core'
import { clamp } from 'lodash'
import { computed, CSSProperties } from 'vue'
import type { XYCoordinates, Slider, Range } from '@/types/slider'
import { Axis, SliderMode } from '@/types/slider'

interface XYSliderProps {
	modelValue: XYCoordinates
	slider: Slider
	axis: Axis
}

interface XYSliderEmits {
	(e: 'update:modelValue', value: XYCoordinates): void
}

const props = withDefaults(defineProps<XYSliderProps>(), {
	modelValue: (): XYCoordinates => {
		return { x: 0, y: 0 }
	},
	slider: (): Slider => {
		return {
			size: 18,
			mode: SliderMode.SEMI,
		}
	},
	axis: Axis.XY,
})

const emit = defineEmits<XYSliderEmits>()

const coordinates = reactive<XYCoordinates>({
	x: 0,
	y: 0,
})

const moveRangeDeviation = reactive<Range>({ min: 0, max: 0, total: 0 })
const areaRef = ref<HTMLDivElement>()
let areaSize: DOMRect
let translateSlider: string

onMounted(() => {
	console.log('onMounted')
	areaSize = { ...areaRef.value.getBoundingClientRect().toJSON() }

	setCoordinates()
})

onUpdated(() => {
	console.log('onUpdated')

	setCoordinates()
})

const setCoordinates = (): void => {
	const { size } = props.slider
	const { x, y } = props.modelValue
	const { width, height } = areaSize

	switch (props.slider.mode) {
		case SliderMode.INSIDE:
			moveRangeDeviation.min = size / 2
			moveRangeDeviation.max = 0 - size / 2
			moveRangeDeviation.total = 0 - size
			break
		case SliderMode.OUTSIDE:
			moveRangeDeviation.min = 0 - size / 2
			moveRangeDeviation.max = size / 2
			moveRangeDeviation.total = size
			break
		default:
			moveRangeDeviation.min = 0
			moveRangeDeviation.max = 0
			moveRangeDeviation.total = 0
	}

	// console.log(moveRangeDeviation)

	switch (props.axis) {
		case Axis.X:
			coordinates.x = x * (width + moveRangeDeviation.total) + moveRangeDeviation.min
			coordinates.y = (height - size) / 2
			translateSlider = `translateX(-${size / 2}px)`
			break
		case Axis.Y:
			coordinates.x = (width - size) / 2
			coordinates.y = y * (height + moveRangeDeviation.total) + moveRangeDeviation.min
			translateSlider = `translateY(${size / 2}px)`
			break
		default:
			coordinates.x = x * (width + moveRangeDeviation.total) + moveRangeDeviation.min
			coordinates.y = y * (height + moveRangeDeviation.total) + moveRangeDeviation.min
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

	emit('update:modelValue', coordinatesRes)
}

const mouseClickY = (e: MouseEvent): void => {
	const { offsetY } = e
	const { height } = areaSize

	const dy = height - offsetY

	let coordinatesRes: XYCoordinates

	coordinates.y = clamp(dy, 0 + moveRangeDeviation.min, height + moveRangeDeviation.max)
	coordinatesRes = { y: (coordinates.y - moveRangeDeviation.min) / (height + moveRangeDeviation.total) }

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

// 	return { areaRef, ...toRefs(coordinates), sliderComputedStyle, mouseDown, mouseClick }
// },
// })
</script>
<style lang="scss">
.area {
	position: relative;
	user-select: none;
	width: inherit;
	height: inherit;
}

.slider {
	cursor: pointer;
	position: absolute;
	box-sizing: border-box;
	border-radius: 50%;
	border: 2px solid gray;
	// transform: translate(-50%, -50%);

	// &:hover {
	// 	transform: scale(1.2);
	// }
}
</style>
