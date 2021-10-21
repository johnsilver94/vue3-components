<template>
	<div class="jg-item" :style="{ margin: '6px', width: image.size.width + 'px', height: image.size.height + 'px' }">
		<div class="jg-item-overlay p-2 flex flex-col justify-between">
			<div>
				<button class="float-left hover:text-purple-500 hover:bg-white">
					<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="1"
							d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
						/>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="1"
							d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
						/>
					</svg>
				</button>
				<button class="float-right hover:text-purple-500 hover:bg-white">
					<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="1"
							d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
						/>
					</svg>
				</button>
			</div>
			<div>
				<p class="text-sm text-gray-500 text-center hidden">Over Image</p>
				<span class="float-right text-red-400">
					<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"
						/>
					</svg>
				</span>
				<p class="text-lg text-white">Some Title</p>
			</div>
		</div>
		<img
			:src="image.src"
			:style="{ width: image.size.width + 'px', height: image.size.height + 'px' }"
			class="rounded-md"
		/>
	</div>
	<div></div>
</template>
<script lang="ts">
import { IPhoto } from '@/types'

export default {
	props: {
		image: {
			type: Object,
			required: true,
		},
	},
	setup(props: { image: IPhoto }): any {
		console.log('setup', props.image)

		return {}
	},
}
</script>
<style lang="scss">
.sdsd {
	width: 240px;
}
</style>
