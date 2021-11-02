<template>
	<div class="picker-box inline-grid border-1/2 border-gray-500 bg-gray-200 w-52">
		<div class="picking-area">
			<CursorArea :position="{ x: 100, y: 100 }" />
		</div>
		<div>Setting</div>
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

		return { croco }
	},
})
</script>
<style lang="scss">
.picker-box {
}
.picking-area {
	width: 200px;
	height: 200px;
}
</style>
