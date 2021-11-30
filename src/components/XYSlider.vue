<template>
	<div ref="areaRef" class="area bg-white">
		<div ref="rangeRef" class="range" :style="rangeStyle" @click.self="mouseClick">
			<div
				role="button"
				tabindex="0"
				:class="['slider', sliderClass, attrs.sliderclass]"
				:style="[sliderStyle, sliderComputedStyle]"
				@mousedown="mouseDown"
				@keypress.ctrl="keyPress"
				@keydown="keyDown"
			/>
		</div>
	</div>
</template>
<script lang="ts" setup>
/* eslint-disable vue/require-default-prop */

import { defineProps, withDefaults, defineEmits, onMounted, ref, reactive } from '@vue/runtime-core'
import { computed, CSSProperties, useAttrs } from 'vue'
import type { Slider } from '@/types/slider'
import { Axis, SliderMode } from '@/types/slider'

interface XYSliderProps {
	x?: number
	y?: number
	slider: Slider
	sliderStyle?: CSSProperties
	sliderClass?: string
	axis: Axis
}

interface XYSliderEmits {
	(e: 'update:x', value: number): void
	(e: 'update:y', value: number): void
}

type Range = {
	width: number
	height: number
}

const props = withDefaults(defineProps<XYSliderProps>(), {
	x: 0.5,
	y: 0.5,
	slider: (): Slider => {
		return {
			size: 18,
			mode: SliderMode.SEMI,
		}
	},
	axis: Axis.XY,
})

const emit = defineEmits<XYSliderEmits>()

const attrs = useAttrs()

const areaRef = ref<HTMLDivElement>()
const rangeRef = ref<HTMLDivElement>()
const rangeWidth = reactive<Range>({
	width: 0,
	height: 0,
})

onMounted(() => {
	setSliderRange()
})

const setSliderRange = (): void => {
	const { width, height } = areaRef.value.getBoundingClientRect().toJSON()

	let deviationX: number
	let deviationY: number

	switch (props.slider.mode) {
		case SliderMode.INSIDE:
			deviationX = 0 - sizeWidth.value
			deviationY = 0 - sizeHeight.value
			break
		case SliderMode.OUTSIDE:
			deviationX = sizeWidth.value
			deviationY = sizeHeight.value
			break
		default:
			deviationX = 0
			deviationY = 0
	}

	switch (props.axis) {
		case Axis.X:
			rangeWidth.width = width + deviationX
			rangeWidth.height = height
			break
		case Axis.Y:
			rangeWidth.width = width
			rangeWidth.height = height + deviationY
			break
		default:
			rangeWidth.width = width + deviationX
			rangeWidth.height = height + deviationY
	}
}

const range = (value: number, min: number, max: number): number => {
	if (value > max) return max
	if (value < min) return min

	return value
}

const sizeWidth = computed((): number => {
	const { size } = props.slider

	if (typeof size === 'number') {
		return size
	} else return size.width
})
const sizeHeight = computed((): number => {
	const { size } = props.slider

	if (typeof size === 'number') {
		return size
	} else return size.height
})

const round = (value: number): number => {
	return Math.round(value * 10000) / 10000
}

const xCoord = computed({
	get: (): number => {
		return props.x * 100
	},
	set: (value: number): void => {
		console.log(value)
		emit('update:x', round(value))
	},
})

const yCoord = computed({
	get: (): number => {
		return 100 - props.y * 100
	},
	set: (value: number): void => {
		console.log(value)
		emit('update:y', round(value))
	},
})

const mouseDown = (): void => {
	document.documentElement.addEventListener('mousemove', mouseMove, true)
	document.documentElement.addEventListener('mouseup', mouseUp, true)
}

const mouseUp = (): void => {
	document.documentElement.removeEventListener('mousemove', mouseMove, true)
	document.documentElement.removeEventListener('mouseup', mouseUp, true)
}

const mouseMove = (e: MouseEvent) => {
	const { clientX, clientY } = e
	const { x, y, width, height } = rangeRef.value.getBoundingClientRect().toJSON()

	switch (props.axis) {
		case Axis.X:
			xCoord.value = range(clientX - x, 0, width) / width
			break
		case Axis.Y:
			yCoord.value = range(height - (clientY - y), 0, height) / height
			break
		default:
			xCoord.value = range(clientX - x, 0, width) / width
			yCoord.value = range(height - (clientY - y), 0, height) / height
	}
}

const mouseClick = (e: MouseEvent) => {
	const { offsetX, offsetY } = e
	const { width, height } = rangeRef.value.getBoundingClientRect().toJSON()

	switch (props.axis) {
		case Axis.X:
			xCoord.value = range(offsetX, 0, width) / width
			break
		case Axis.Y:
			yCoord.value = range(height - offsetY, 0, height) / height
			break
		default:
			xCoord.value = range(offsetX, 0, width) / width
			yCoord.value = range(height - offsetY, 0, height) / height
	}
}

const keyDown = (e: KeyboardEvent) => {
	const { code } = e
	const { axis } = props

	switch (code) {
		case 'ArrowLeft':
			console.log('ArrowLeft')
			xCoord.value = range(xCoord.value / 100 - 0.01, 0, 1)
			break
		case 'ArrowRight':
			console.log('ArrowRight')
			xCoord.value = range(xCoord.value / 100 + 0.01, 0, 1)
			break
		case 'ArrowUp':
			console.log('ArrowUp')
			if (axis === Axis.X) return

			yCoord.value = range((100 - yCoord.value) / 100 + 0.01, 0, 1)
			break
		case 'ArrowDown':
			console.log('ArrowDown')
			if (axis === Axis.X) return

			yCoord.value = range((100 - yCoord.value) / 100 - 0.01, 0, 1)
			break
		default:
			console.log('Another')
	}
}

const keyPress = (e: Event) => {
	console.log(e)
}

const rangeStyle = computed((): CSSProperties => {
	const { width, height } = rangeWidth

	return {
		width: width ? width + 'px' : 'inherit',
		height: height ? height + 'px' : 'inherit',
	}
})

const sliderComputedStyle = computed((): CSSProperties => {
	const { size } = props.slider

	if (typeof size === 'number')
		return {
			left: xCoord.value + '%',
			top: yCoord.value + '%',
			width: size + 'px',
			height: size + 'px',
		}
	else
		return {
			left: xCoord.value + '%',
			top: yCoord.value + '%',
			width: size.width + 'px',
			height: size.height + 'px',
		}
})
</script>
<style lang="scss">
.area {
	display: flex;
	justify-content: center;
	align-items: center;
	align-content: center;

	position: relative;
	user-select: none;
	width: inherit;
	height: inherit;
}

.range {
	position: absolute;
}

.slider {
	cursor: pointer;
	position: absolute;
	box-sizing: border-box;
	border-radius: 50%;
	border: 2px solid gray;
	transform: translate(-50%, -50%);

	outline: none;

	&:hover,
	&:active,
	&:focus {
		transform: translate(-50%, -50%) scale(1.2);
	}
}
</style>
