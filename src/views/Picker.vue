<template>
	<div>Picker page: {{ name }}</div>
	<ColorPicker v-model:color="color" />
</template>
<script lang="ts">
import ColorPicker from '@components/ColorPicker.vue'
import { defineComponent, reactive } from '@vue/runtime-core'
import { computed, ComputedRef, toRefs } from 'vue'
import { useStore } from 'vuex'
import { key } from '@/store'

export default defineComponent({
	name: 'Picker',
	components: { ColorPicker },
	setup() {
		const store = useStore(key)
		const values = reactive<{ color: string }>({
			color: 'rgba(255, 128, 0, 1)',
		})

		const name: ComputedRef<string> = computed(() => {
			return store.state.user.name
		})

		return { name, ...toRefs(values) }
	},
})
</script>
<style lang="scss">
//
</style>
