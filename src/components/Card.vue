<template>
	<div class="flex flex-col">
		<div
			class="card rounded-lg border-1/2 border-gray-200 shadow-lg hover:border-purple-600"
			:style="{ margin: margin + 'px', width: image.size.width + 'px', height: image.size.height + 'px' }"
		>
			<div class="card-front p-2 text-gray-900 hover:text-purple-800 bg-gray-800 bg-opacity-0 hover:bg-opacity-40">
				<div class="">
					<button class="float-left hover:bg-white rounded-md p-0.5">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="h-6 w-6"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
							stroke-width="1.5"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
							/>
							<path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
						</svg>
					</button>
					<button class="float-right hover:bg-white rounded-md p-0.5">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="h-6 w-6"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
							stroke-width="1.5"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
							/>
						</svg>
					</button>
				</div>
				<div>
					<span class="float-right text-white bg-red-600 p-0.5 rounded-md">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="h-6 w-6"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"
							/>
						</svg>
					</span>

					<slot name="inner-description">
						<p class="text-lg text-white">Some Title</p>
					</slot>
				</div>
			</div>
			<div class="card-back">
				<img :src="image.src" class="card-back-bg" />
				<img :src="image.src" class="card-back-img" />
			</div>
		</div>
		<!-- <div class="h-8 overflow-hidden px-2" :style="{ width: image.size.width + 'px' }">
			<p class="text-lg text-gray-900">Some Title sadsads sd as dsa ds</p>
		</div> -->
		<slot name="outer-description"></slot>
	</div>
</template>
<script lang="ts">
import { defineComponent, PropType } from '@vue/runtime-core'
import { IPhoto } from '@/types'

type CardProps = {
	croco: string
}

export default defineComponent({
	name: 'Card',
	props: {
		image: {
			type: Object as PropType<IPhoto>,
			required: true,
		},
		margin: {
			type: Number,
			required: true,
		},
	},
	setup(): CardProps {
		const croco = 'sasdsds'

		return { croco }
	},
})
</script>
<style lang="scss">
.card {
	position: relative;
	display: flex;
	overflow: hidden;

	&-front {
		position: absolute;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		z-index: 20;

		p {
			font-size: 16px;
			float: left;
		}
	}

	&-back {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
		height: 100%;

		&-bg {
			position: absolute;
			width: inherit;
			height: inherit;
			opacity: 0.5;
			transform: scale(1.5);
			filter: blur(10px);
		}

		&-img {
			max-width: 100%;
			max-height: 100%;
			object-fit: contain;
			z-index: 10;
		}
	}
}
</style>
