<template>
	<div class="inline-grid border-1/2 border-gray-500 bg-gray-200">
		<div class="inline-grid grid-flow-col gap-3 m-2">
			<XYSlider
				v-model:x="decomposedColor.s"
				v-model:y="decomposedColor.v"
				class="picking-area"
				:slider="{
					size: 18,
					mode: SliderMode.SEMI,
					class: 'slider-o',
					style: {
						backgroundColor: previewColor,
					},
					areaClass: 'picker-gradient',
					areaStyle: {
						backgroundColor: pickerColor,
					},
				}"
				:axis="Axis.XY"
			/>
			<XYSlider
				v-model:y="decomposedColor.h"
				class="h-auto w-4"
				:slider="{
					size: 16,
					mode: SliderMode.INSIDE,
					style: { borderRadius: '50%', borderColor: 'white', borderWidth: '2px' },
					areaClass: 'hue-areaV',
				}"
				:axis="Axis.Y"
			/>
			<div class="h-full w-4 opacity-area bg-white">
				<XYSlider
					v-model:y="decomposedColor.a"
					:slider="{
						size: 16,
						mode: SliderMode.INSIDE,
						style: {
							borderColor: 'black',
							borderWidth: '2px',
						},
						areaStyle: {
							borderRadius: '15px',
							background: `linear-gradient(0deg, ${alphaColorFrom}, ${alphaColorTo})`,
						},
					}"
					:axis="Axis.Y"
				/>
			</div>
		</div>
		<div class="flex m-2">
			<div class="mr-2">
				<div class="w-16 h-16 opacity-area rounded-md overflow-hidden">
					<div class="w-full h-full" :style="{ backgroundColor: previewColor }" />
				</div>
			</div>
			<div class="w-full">
				<XYSlider
					v-model:x="decomposedColor.h"
					class="w-auto h-5 my-2"
					:slider="{
						size: 20,
						mode: SliderMode.INSIDE,
						areaClass: 'hue-area',
					}"
					:axis="Axis.X"
				/>
				<div class="w-auto h-5 my-2 opacity-area bg-white">
					<XYSlider
						v-model:x="decomposedColor.a"
						:slider="{
							size: 20,
							mode: SliderMode.INSIDE,
							style: {
								borderColor: 'white',
								borderWidth: '3px',
							},
							areaStyle: {
								borderRadius: '15px',
								background: `linear-gradient(90deg, ${alphaColorFrom}, ${alphaColorTo})`,
							},
						}"
						:axis="Axis.X"
					/>
				</div>
			</div>
		</div>
		<div>Colors</div>
	</div>
</template>
<script lang="ts" setup>
import tinycolor, { ColorFormats } from 'tinycolor2'
import { defineProps, withDefaults, defineEmits, onMounted, reactive } from '@vue/runtime-core'
import XYSlider from '@components/XYSlider.vue'
import { Axis, SliderMode } from '@/types/slider'
import { computed } from 'vue'

interface ColorPickerProps {
	color: string
}

interface ColorPickerEmits {
	(e: 'update:color', value: string): void
}

const props = withDefaults(defineProps<ColorPickerProps>(), {
	color: 'rgba(142, 68, 68, 1)',
})

const emit = defineEmits<ColorPickerEmits>()

const decomposedColor = reactive<ColorFormats.HSVA>({
	h: 0,
	s: 0,
	v: 0,
	a: 0,
})

const hue = computed({
	get: (): number => {
		return decomposedColor.h * 360
	},
	set: (value: number): void => {
		console.log(value)
		decomposedColor.h = value / 360
	},
})

onMounted(() => {
	const baseColor: ColorFormats.HSVA = tinycolor(props.color).toHsv()

	hue.value = baseColor.h
	decomposedColor.s = baseColor.s
	decomposedColor.v = baseColor.v
	decomposedColor.a = baseColor.a

	console.log(decomposedColor)
})

const pickerColor = computed((): string => {
	return tinycolor({
		h: hue.value,
		s: 1,
		v: 1,
		a: 1,
	}).toRgbString()
})

const previewColor = computed((): string => {
	// emit(
	// 	'update:color',
	// 	tinycolor({
	// 		h: hue.value,
	// 		s: decomposedColor.s,
	// 		v: decomposedColor.v,
	// 		a: decomposedColor.a,
	// 	}).toRgbString()
	// )
	return tinycolor({
		h: hue.value,
		s: decomposedColor.s,
		v: decomposedColor.v,
		a: decomposedColor.a,
	}).toRgbString()
})

const alphaColorFrom = computed((): string => {
	return tinycolor({
		h: hue.value,
		s: decomposedColor.s,
		v: decomposedColor.v,
		a: 0,
	}).toRgbString()
})

const alphaColorTo = computed((): string => {
	return tinycolor({
		h: hue.value,
		s: decomposedColor.s,
		v: decomposedColor.v,
		a: 1,
	}).toRgbString()
})
</script>
<style lang="scss">
.slider-o {
	border-color: white;
	border-radius: 5px;
}
.picker-gradient {
	border-radius: 5px;
	background: linear-gradient(180deg, transparent, #000), linear-gradient(270deg, transparent, #fff);
}

.opacity-supra {
	background: linear-gradient(90deg, rgba(41, 180, 245, 0), rgb(41, 180, 245));
}

.opacity-area {
	border-radius: 15px;
	background-image: url('data:image/svg+xml;charset=utf-8,<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill-opacity=".05"><path d="M8 0h8v8H8zM0 8h8v8H0z"/></svg>');
}

.hue-area {
	border-radius: 15px;
	background: linear-gradient(
		90deg,
		red,
		#ff2b00,
		#f50,
		#ff8000,
		#fa0,
		#ffd500,
		#ff0,
		#d4ff00,
		#af0,
		#80ff00,
		#5f0,
		#2bff00,
		#0f0,
		#00ff2b,
		#0f5,
		#00ff80,
		#0fa,
		#00ffd5,
		#0ff,
		#00d4ff,
		#0af,
		#007fff,
		#05f,
		#002bff,
		#00f,
		#2a00ff,
		#50f,
		#7f00ff,
		#a0f,
		#d400ff,
		#f0f,
		#ff00d4,
		#f0a,
		#ff0080,
		#f05,
		#ff002b
	);
}

.hue-areaV {
	border-radius: 15px;
	background: linear-gradient(
		0deg,
		red,
		#ff2b00,
		#f50,
		#ff8000,
		#fa0,
		#ffd500,
		#ff0,
		#d4ff00,
		#af0,
		#80ff00,
		#5f0,
		#2bff00,
		#0f0,
		#00ff2b,
		#0f5,
		#00ff80,
		#0fa,
		#00ffd5,
		#0ff,
		#00d4ff,
		#0af,
		#007fff,
		#05f,
		#002bff,
		#00f,
		#2a00ff,
		#50f,
		#7f00ff,
		#a0f,
		#d400ff,
		#f0f,
		#ff00d4,
		#f0a,
		#ff0080,
		#f05,
		#ff002b
	);
}

.picking-area {
	width: 300px;
	height: 300px;
}
</style>
