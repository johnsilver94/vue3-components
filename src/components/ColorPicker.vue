<template>
	<div class="inline-grid border-1/2 border-gray-500 bg-gray-200">
		<div class="inline-grid grid-flow-col gap-3 m-2">
			<XYSlider
				v-model="pickerSlider"
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
				v-model="hueSliderV"
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
					v-model="alphaSliderV"
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
					v-model="hueSliderH"
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
						v-model="alphaSliderH"
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
<script lang="ts">
import tinycolor, { ColorFormats } from 'tinycolor2'
import { defineComponent, onMounted, reactive } from '@vue/runtime-core'
import XYSlider from '@components/XYSlider.vue'
import { Axis, SliderMode } from '@/types/slider'
import type { XYCoordinates } from '@/types/slider'
import { computed, toRefs } from 'vue'

export default defineComponent({
	name: 'ColorPicker',
	components: {
		XYSlider,
	},
	props: {
		color: {
			type: String,
			// default: 'rgb(172 213 73 / 55%);',
			// default: 'rgba(124, 51, 52, 0.62)',
			// default: 'rgba(130, 65, 65, 0.82)',
			default: 'rgba(255, 0, 132, 0.8)',
			// default: 'rgba(65, 118, 130, 1)',
			// default: '#3A8C63',
		},
	},
	emits: [],
	setup(props) {
		const decomposedColor = reactive<ColorFormats.HSVA>({
			h: 0,
			s: 0,
			v: 0,
			a: 0,
		})

		onMounted(() => {
			console.log(props.color)
			decomposedColor.h = tinycolor(props.color).toHsv().h / 360
			decomposedColor.s = tinycolor(props.color).toHsv().s
			decomposedColor.v = tinycolor(props.color).toHsv().v
			decomposedColor.a = tinycolor(props.color).toHsv().a

			console.log(decomposedColor)
		})

		const alphaSliderH = computed({
			get: (): XYCoordinates => {
				return { x: decomposedColor.a }
			},
			set: (coord): void => {
				decomposedColor.a = coord.x
			},
		})

		const alphaSliderV = computed({
			get: (): XYCoordinates => {
				return { y: decomposedColor.a }
			},
			set: (coord): void => {
				decomposedColor.a = coord.y
			},
		})

		const hueSliderH = computed({
			get: (): XYCoordinates => {
				return { x: decomposedColor.h }
			},
			set: (coord): void => {
				decomposedColor.h = coord.x
			},
		})

		const hueSliderV = computed({
			get: (): XYCoordinates => {
				return { y: decomposedColor.h }
			},
			set: (coord): void => {
				decomposedColor.h = coord.y
			},
		})

		const pickerSlider = computed({
			get: (): XYCoordinates => {
				return { x: decomposedColor.s, y: decomposedColor.v }
			},
			set: (coord): void => {
				decomposedColor.s = coord.x
				decomposedColor.v = coord.y
			},
		})

		const pickerColor = computed((): string => {
			return tinycolor({
				h: decomposedColor.h * 360,
				s: 1,
				v: 1,
				a: decomposedColor.a,
			}).toRgbString()
		})

		const previewColor = computed((): string => {
			return tinycolor({
				h: decomposedColor.h * 360,
				s: decomposedColor.s,
				v: decomposedColor.v,
				a: decomposedColor.a,
			}).toRgbString()
		})

		const alphaColorFrom = computed((): string => {
			return tinycolor({
				h: decomposedColor.h * 360,
				s: decomposedColor.s,
				v: decomposedColor.v,
				a: 0,
			}).toRgbString()
		})

		const alphaColorTo = computed((): string => {
			return tinycolor({
				h: decomposedColor.h * 360,
				s: decomposedColor.s,
				v: decomposedColor.v,
				a: 1,
			}).toRgbString()
		})

		return {
			Axis,
			SliderMode,
			...toRefs(decomposedColor),
			alphaSliderH,
			alphaSliderV,
			hueSliderH,
			hueSliderV,
			pickerSlider,
			previewColor,
			pickerColor,
			alphaColorFrom,
			alphaColorTo,
		}
	},
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
