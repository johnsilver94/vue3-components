<script setup lang="ts">
import { ref, computed } from 'vue'
import { useStore } from 'vuex'
import { key } from '@/store'

const store = useStore(key)

const name = computed(() => {
	return store.state.user.name
})
const count = ref(0)
</script>

<template>
	<img class="rounded-sm" alt="Vue logo" src="@assets/logo.png" />
	<h1 class="text-yellow-500 hover:text-gray-400">Hello Vue 3 + TypeScript + Vite</h1>

	<p>
		Recommended IDE setup:
		<a href="https://code.visualstudio.com/" target="_blank">VSCode</a>
		+
		<a href="https://github.com/johnsoncodehk/volar" target="_blank">Volar</a>
	</p>

	<p>
		See
		<code>README.md</code>
		for more information.
	</p>

	<p>
		<a href="https://vitejs.dev/guide/features.html" target="_blank">Vite Docs</a>
		|
		<a href="https://v3.vuejs.org/" target="_blank">Vue 3 Docs</a>
	</p>

	<button type="button" @click="count++">count is: {{ count }}</button>
	<p>
		Edit
		<code>components/HelloWorld.vue</code>
		to test hot module replacement.
	</p>
	<p>Name in store is: {{ name }}</p>
</template>
