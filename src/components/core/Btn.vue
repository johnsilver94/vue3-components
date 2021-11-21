<template>
	<button :class="['btn', `btn-color-${color}`, `btn-${type}`]" v-bind="$attrs">
		<span v-if="loading" class="loading"></span>
		<slot v-else name="icon"></slot>
		<slot />
		<slot name="iconAfter"></slot>
	</button>
</template>
<script lang="ts">
import { defineComponent } from '@vue/runtime-core'
import { PropType } from 'vue'

type BtnType = 'filled' | 'flat' | 'ghost'

type BtnColor = 'primary' | 'secondary' | 'tertiary'

export default defineComponent({
	name: 'Btn',
	props: {
		type: {
			type: String as PropType<BtnType>,
			default: 'filled',
		},
		color: {
			type: String as PropType<BtnColor>,
			default: 'primary',
		},
		loading: {
			type: Boolean,
			default: false,
		},
	},
})
</script>
<style lang="scss">
.btn {
	width: fit-content;
	height: fit-content;
	padding-top: 10px;
	padding-bottom: 10px;
	padding-left: 35px;
	padding-right: 35px;
	border-radius: 5px;

	display: inline-flex;
	flex-direction: row;
	align-content: center;
	justify-content: center;
	align-items: center;

	--color: #c4c4c4;
	--bgColor: #4b4b4b;

	--hoverColor: white;
	--hoverBgColor: #228bde;

	--activeColor: white;
	--activeBgColor: #0066ff;

	&-color {
		&-primary {
			--color: #c4c4c4;
			--bgColor: #4b4b4b;

			--hoverColor: white;
			--hoverBgColor: #228bde;

			--activeColor: white;
			--activeBgColor: #0066ff;
		}
		&-secondary {
			--color: #c4c4c4;
			--bgColor: #403c46;

			--hoverColor: white;
			--hoverBgColor: #3d2960;

			--activeColor: white;
			--activeBgColor: #411b83;
		}
		&-tertiary {
			--color: #c4c4c4;
			--bgColor: #4b4b4b;

			--hoverColor: white;
			--hoverBgColor: #6f42c1;

			--activeColor: white;
			--activeBgColor: #771ad3;
		}
	}

	&:focus {
		outline: none;
	}

	// with background
	&-filled {
		background-color: var(--bgColor);
		color: var(--color);

		&:hover {
			background-color: var(--hoverBgColor);
			color: var(--hoverColor);
		}

		&:active {
			background-color: var(--activeBgColor);
			color: var(--activeColor);
		}

		&:disabled {
			opacity: 0.33;
			cursor: not-allowed;
		}
	}

	// without background
	&-flat {
		color: var(--color);

		&:hover {
			color: var(--hoverColor);
		}

		&:active {
			color: var(--activeColor);
		}

		&:disabled {
			opacity: 0.33;
			cursor: not-allowed;
		}
	}

	// background only on hover
	&-ghost {
		color: var(--color);

		&:hover {
			background-color: var(--hoverBgColor);
			color: var(--hoverColor);
		}

		&:active {
			background-color: var(--activeBgColor);
			color: var(--activeColor);
		}

		&:disabled {
			opacity: 0.33;
			cursor: not-allowed;
		}
	}
}

.loading {
	// display: inline-block;
	// width: 20px;
	// height: 20px;
	margin-right: 8px;

	&:after {
		content: ' ';
		display: block;
		width: 16px;
		height: 16px;
		margin: 1px;
		border-radius: 50%;
		border: 1px solid #fff;
		border-color: #fff transparent #fff transparent;
		animation: loading-animation 1.2s linear infinite;
	}
	@keyframes loading-animation {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}
}
</style>
