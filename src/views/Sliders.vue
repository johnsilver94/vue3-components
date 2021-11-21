<template>
	<div class="min-h-screen min-w-full bg-gray-200">
		<h1 class="text-4xl text-purple-600 py-10">Sliders</h1>
		<div class="grid grid-flow-row grid-cols-3 gap-4">
			<div class="inline-flex flex-col items-center">
				<h2 class="text-purple-600 my-2">H - Inside</h2>
				<XYSlider
					class="w-80 h-4 m-2 rounded-sm"
					:slider="{
						size: 20,
						position: { x: h },
						mode: SliderMode.INSIDE,
						class: 'slider-ex',
					}"
					:axis="Axis.X"
					@update:values="changeHandler($event)"
				/>
			</div>
			<div class="inline-flex flex-col items-center">
				<h2 class="text-purple-600 my-2">H - Semi</h2>
				<XYSlider
					class="w-80 h-4 m-2 rounded-sm"
					:slider="{
						size: 20,
						position: { x: h },
						mode: SliderMode.SEMI,
						class: 'slider-ex',
					}"
					:axis="Axis.X"
				/>
			</div>
			<div class="inline-flex flex-col items-center">
				<h2 class="text-purple-600 my-2">H - Outside</h2>
				<XYSlider
					class="w-80 h-4 m-2 rounded-sm"
					:slider="{
						size: 20,
						position: { x: h },
						mode: SliderMode.OUTSIDE,
						class: 'slider-ex',
					}"
					:axis="Axis.X"
				/>
			</div>
			<div class="inline-flex flex-col items-center">
				<h2 class="text-purple-600 my-2">V - Inside</h2>
				<XYSlider
					class="h-60 w-4 m-2 rounded-sm"
					:slider="{
						size: 20,
						position: { y: 0.5 },
						mode: SliderMode.INSIDE,
						class: 'slider-ex',
					}"
					:axis="Axis.Y"
				/>
			</div>
			<div class="inline-flex flex-col items-center">
				<h2 class="text-purple-600 my-2">V - Semi</h2>
				<XYSlider
					class="h-60 w-4 m-2 rounded-sm"
					:slider="{
						size: 20,
						position: { y: 0.5 },
						mode: SliderMode.SEMI,
						class: 'slider-ex',
					}"
					:axis="Axis.Y"
				/>
			</div>
			<div class="inline-flex flex-col items-center">
				<h2 class="text-purple-600 my-2">V - Outside</h2>
				<XYSlider
					class="h-60 w-4 m-2 rounded-sm"
					:slider="{
						size: 20,
						position: { y: 0.5 },
						mode: SliderMode.OUTSIDE,
						class: 'slider-ex',
					}"
					:axis="Axis.Y"
				/>
			</div>
			<div class="inline-flex flex-col items-center">
				<h2 class="text-purple-600 my-2">V - Inside</h2>
				<XYSlider
					class="w-80 h-80 rounded-sm"
					:slider="{
						size: 16,
						position: { x: 0.5, y: 0.5 },
						mode: SliderMode.INSIDE,
						class: 'picker',
					}"
					:axis="Axis.XY"
				/>
			</div>
			<div class="inline-flex flex-col items-center">
				<h2 class="text-purple-600 my-2">V - Semi</h2>
				<XYSlider
					class="w-80 h-80 rounded-sm"
					:slider="{
						size: 16,
						position: { x: 0.5, y: 0.5 },
						mode: SliderMode.SEMI,
						class: 'picker',
					}"
					:axis="Axis.XY"
				/>
			</div>
			<div class="inline-flex flex-col items-center">
				<h2 class="text-purple-600 my-2">V - Outside</h2>
				<XYSlider
					class="w-80 h-80 rounded-sm"
					:slider="{
						size: 16,
						position: { x: 0.5, y: 0.5 },
						mode: SliderMode.OUTSIDE,
						class: 'picker',
					}"
					:axis="Axis.XY"
				/>
			</div>
		</div>
	</div>
</template>
<script lang="ts">
import { defineComponent, reactive } from '@vue/runtime-core'
import { toRefs } from 'vue'
import XYSlider from '@components/XYSlider.vue'

export default defineComponent({
	name: 'Sliders',
	components: {
		XYSlider,
	},
	setup() {
		enum Axis {
			X = 'x',
			Y = 'y',
			XY = 'xy',
		}

		enum SliderMode {
			INSIDE = 'i',
			OUTSIDE = 'o',
			SEMI = 's',
		}

		const values = reactive({ h: 0.5 })

		const changeHandler = (values: { x: number; y: number }): void => {
			console.log(values)
		}

		return { Axis, SliderMode, ...toRefs(values), changeHandler }
	},
})
</script>
<style lang="scss">
.slider-ex {
	border-color: 'gray';
	border-width: '3px';
	border-radius: 5px;
}
.picker {
	border-color: 'gray';
	border-width: '3px';
}
</style>
