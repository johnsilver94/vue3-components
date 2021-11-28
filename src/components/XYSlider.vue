<template>
	<div ref="areaRef" :class="['area bg-white', slider.areaClass]" :style="[slider.areaStyle]">
		<div ref="rangeRef" class="range" :style="rangeStyle" @click.self="mouseClick">
			<div :class="['slider', slider.class]" :style="[slider.style, sliderComputedStyle]" @mousedown="mouseDown" />
		</div>
	</div>
</template>
<script lang="ts" setup>
import { defineProps, withDefaults, defineEmits, onMounted, ref, reactive } from '@vue/runtime-core'
import { clamp } from 'lodash'
import { computed, CSSProperties } from 'vue'
import type { Slider } from '@/types/slider'
import { Axis, SliderMode } from '@/types/slider'

interface XYSliderProps {
	x?: number
	y?: number
	slider: Slider
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

const areaRef = ref<HTMLDivElement>()
const rangeRef = ref<HTMLDivElement>()
const rangeWidth = reactive<Range>({
	width: 0,
	height: 0,
})

onMounted(() => {
	const { size } = props.slider
	const { width, height } = areaRef.value.getBoundingClientRect().toJSON()

	let deviation: number

	switch (props.slider.mode) {
		case SliderMode.INSIDE:
			deviation = 0 - size
			break
		case SliderMode.OUTSIDE:
			deviation = size
			break
		default:
			deviation = 0
	}

	switch (props.axis) {
		case Axis.X:
			rangeWidth.width = width + deviation
			rangeWidth.height = height
			break
		case Axis.Y:
			rangeWidth.width = width
			rangeWidth.height = height + deviation
			break
		default:
			rangeWidth.width = width + deviation
			rangeWidth.height = height + deviation
	}
})

const xCoord = computed({
	get: (): number => {
		return props.x * 100
	},
	set: (value: number): void => {
		emit('update:x', value)
	},
})

const yCoord = computed({
	get: (): number => {
		return 100 - props.y * 100
	},
	set: (value: number): void => {
		emit('update:y', value)
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
			xCoord.value = clamp(clientX - x, 0, width) / width
			break
		case Axis.Y:
			yCoord.value = clamp(height - (clientY - y), 0, height) / height
			break
		default:
			xCoord.value = clamp(clientX - x, 0, width) / width
			yCoord.value = clamp(height - (clientY - y), 0, height) / height
	}
}

const mouseClick = (e: MouseEvent) => {
	const { offsetX, offsetY } = e
	const { width, height } = rangeRef.value.getBoundingClientRect().toJSON()

	switch (props.axis) {
		case Axis.X:
			xCoord.value = clamp(offsetX, 0, width) / width
			break
		case Axis.Y:
			yCoord.value = clamp(height - offsetY, 0, height) / height
			break
		default:
			xCoord.value = clamp(offsetX, 0, width) / width
			yCoord.value = clamp(height - offsetY, 0, height) / height
	}
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

	return {
		left: xCoord.value + '%',
		top: yCoord.value + '%',
		width: size + 'px',
		height: size + 'px',
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

	&:hover {
		transform: translate(-50%, -50%) scale(1.2);
	}
}
</style>
