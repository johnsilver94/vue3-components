<template>
	<div class="picker-container">
		<XYSlider
			v-model:x="decomposedColor.s"
			v-model:y="decomposedColor.v"
			class="area-saturation"
			:slider="{
				size: 18,
				mode: SliderMode.SEMI,
			}"
			:slider-class="'slider-saturation shadow-md'"
			:slider-style="{ backgroundColor: alphaColorTo }"
			:style="{ backgroundColor: pickerColor }"
			:axis="Axis.XY"
		/>
		<div class="controls-container">
			<div class="preview opacity-area">
				<div class="w-full h-full" :style="{ backgroundColor: previewColor }" />
			</div>

			<div class="controls">
				<XYSlider
					v-model:x="decomposedColor.h"
					class="control-slider area-hue"
					:slider="{
						size: { width: 12, height: 26 },
						mode: SliderMode.INSIDE,
					}"
					:slider-class="'slider-hue-alpha shadow-md'"
					:slider-style="{
						backgroundColor: pickerColor,
					}"
					:axis="Axis.X"
				/>
				<div class="control-slider opacity-area">
					<XYSlider
						v-model:x="decomposedColor.a"
						:slider="{
							size: { width: 12, height: 26 },
							mode: SliderMode.INSIDE,
						}"
						:slider-class="'slider-hue-alpha shadow-md'"
						:slider-style="{
							backgroundColor: previewColor,
						}"
						class="area-alpha"
						:style="{
							background: `linear-gradient(90deg, ${alphaColorFrom}, ${alphaColorTo})`,
						}"
						:axis="Axis.X"
					/>
				</div>
			</div>
		</div>
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
.picker-container {
	display: flex;
	flex-direction: column;

	width: 350px;
	margin: auto;
	gap: 8px;

	border: 0.5px solid rgb(184, 188, 199);
	background-color: #ffffff;
	padding: 8px;

	@apply border-gray-200;
}

.controls-container {
	display: flex;
	flex-direction: row;

	gap: 8px;
}

.preview {
	flex-shrink: 0;

	width: 50px;
	height: 50px;

	border-radius: 50%;
	overflow: hidden;

	@apply shadow-md;
}

.controls {
	display: flex;
	flex-direction: column;
	justify-content: space-around;

	width: 100%;
}

.control-slider {
	@apply w-auto h-5;
}

.area {
	&-saturation {
		width: auto;
		height: 300px;
		border-radius: 5px;
		background: linear-gradient(180deg, transparent, #000), linear-gradient(270deg, transparent, #fff);
	}

	&-hue {
		border-radius: 5px;
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

	&-alpha {
		border-radius: 5px;
	}
}

.slider {
	&-saturation {
		border-color: white;
		border-radius: 5px;
	}

	&-hue-alpha {
		border: 2.5px solid white;
		border-radius: 5px;
	}
}

.opacity-area {
	border-radius: 5px;
	background-image: url('data:image/svg+xml;charset=utf-8,<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill-opacity=".05"><path d="M8 0h8v8H8zM0 8h8v8H0z"/></svg>');
}
</style>
