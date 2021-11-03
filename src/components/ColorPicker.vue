<template>
	<div class="picker-box inline-grid border-1/2 border-gray-500 bg-gray-200 w-52">
		<div class="picking-area">
			<CursorArea :position="{ x: 104, y: 100 }" />
		</div>
		<div class="settings my-2"><CursorArea :position="{ x: 104 }" :direction="DragDirection.X" /></div>
		<div>Colors</div>
	</div>
</template>
<script lang="ts">
import { defineComponent, PropType } from '@vue/runtime-core'
import CursorArea from '@components/CursorArea.vue'

export default defineComponent({
	name: 'ColorPicker',
	components: {
		CursorArea,
	},
	// props: {},
	emits: [],
	setup(props, { emit }) {
		const croco = 'sadsa'
		enum DragDirection {
			X = 'XAxis',
			Y = 'YAxis',
			XY = 'XYAxis',
		}

		return { croco, DragDirection }
	},
})
</script>
<style lang="scss">
.picker-box {
	box-sizing: content-box;
}
.picking-area {
	width: 208px;
	height: 200px;
}
.settings {
	width: 180px;
	height: 20px;
}
</style>
