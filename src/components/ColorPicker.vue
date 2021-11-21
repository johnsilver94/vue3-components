<template>
	<div class="picker-box inline-grid border-1/2 border-gray-500 bg-gray-200 w-80">
		<XYSlider
			class="picking-area"
			:slider="{
				size: 18,
				position: { x: 0.5, y: 0.5 },
				style: { borderRadius: '50%', borderColor: 'black' },
			}"
			:axis="Axis.XY"
		/>

		<XYSlider
			class="settings my-2 mx-auto"
			:slider="{
				size: 18,
				position: { x: 0.5 },
				areaStyle: {
					borderRadius: '15px',
					background: `linear-gradient(90deg,red,#ff2b00,#f50,#ff8000,#fa0,
								#ffd500,#ff0,#d4ff00,#af0,#80ff00,#5f0,#2bff00,#0f0,#00ff2b,#0f5,#00ff80,#0fa,#00ffd5,#0ff,#00d4ff,
								#0af,#007fff,#05f,#002bff,#00f,#2a00ff,#50f,#7f00ff,#a0f,#d400ff,#f0f,#ff00d4,#f0a,#ff0080,#f05,#ff002b)`,
				},
			}"
			:axis="Axis.X"
		/>

		<XYSlider
			class="settings my-2 mx-auto"
			:slider="{
				size: 18,
				position: { x: 0.5 },
				areaStyle: {
					borderRadius: '15px',
					background: 'url(https://mdn.mozillademos.org/files/6089/alpha_mask.png)',
					backgroundSize: 'cover',
					backgroundColor: 'blue',
				},
			}"
			:axis="Axis.X"
		/>

		<XYSlider
			class="settings2 my-2"
			:slider="{
				size: 12,
				position: { y: 0.5 },
			}"
			:axis="Axis.Y"
		/>
		<div>Colors</div>
	</div>
</template>
<script lang="ts">
import { defineComponent } from '@vue/runtime-core'
import XYSlider from '@components/XYSlider.vue'

export default defineComponent({
	name: 'ColorPicker',
	components: {
		XYSlider,
	},
	// props: {},
	emits: [],
	setup() {
		const croco = 'sadsa'
		enum Axis {
			X = 'x',
			Y = 'y',
			XY = 'xy',
		}

		return { croco, Axis }
	},
})
</script>
<style lang="scss">
.picker-box {
	box-sizing: content-box;
}
.picking-area {
	width: 320px;
	height: 320px;
}
.settings {
	width: 300px;
	height: 18px;
}
.settings2 {
	width: 20px;
	height: 120px;
}
</style>
