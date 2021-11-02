<template>
	<div>Picker page: {{ name }}</div>
	<ColorPicker />
</template>
<script lang="ts">
import ColorPicker from '@components/ColorPicker.vue'
import { defineComponent } from '@vue/runtime-core'
import { computed, ComputedRef } from 'vue'
import { useStore } from 'vuex'
import { key } from '@/store'

export default defineComponent({
	name: 'Picker',
	components: { ColorPicker },
	setup() {
		const store = useStore(key)

		const name: ComputedRef<string> = computed(() => {
			return store.state.user.name
		})

		return { name }
	},
})
</script>
<style lang="scss">
//
</style>
