<template>
	<div class="components bg-gray-800 w-full h-full">
		<p class="text-blue-600 text-4xl p-4">Components</p>
		<div class="components-grid py-10 px-20">
			<div class="inline-grid">
				<p class="justify-self-start items-start text-3xl title capitalize">Buttons</p>
				<p class="justify-self-start items-start text-lg subtitle uppercase pt-6">Filled</p>
				<div class="states-grid py-4">
					<div class="inline-grid">
						<p class="justify-self-start items-start text-md btn-title py-4">primary</p>
						<Btn class="text-sm">Primary</Btn>
					</div>
					<div class="inline-grid">
						<p class="justify-self-start items-start text-md btn-title py-4">secondary</p>
						<Btn color="secondary">Secondary</Btn>
					</div>
					<div class="inline-grid">
						<p class="justify-self-start items-start text-md btn-title py-4">tertiary</p>
						<Btn color="tertiary">Tertiary</Btn>
					</div>
					<div class="inline-grid">
						<p class="justify-self-start items-start text-md btn-title py-4">loading</p>
						<Btn :loading="true" class="text-2xl">Button</Btn>
					</div>
					<div class="inline-grid">
						<p class="justify-self-start items-start text-md btn-title py-4">icon slot</p>
						<Btn>
							<template #icon>
								<span class="mr-2">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										class="h-5 w-5"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
									>
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											stroke-width="2"
											d="M15 13l-3 3m0 0l-3-3m3 3V8m0 13a9 9 0 110-18 9 9 0 010 18z"
										/>
									</svg>
								</span>
							</template>
							Button
						</Btn>
					</div>
					<div class="inline-grid">
						<p class="justify-self-start items-start text-md btn-title py-4">icon before after</p>
						<Btn>
							<template #iconAfter>
								<span class="ml-2">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										class="h-5 w-5"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
									>
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											stroke-width="2"
											d="M15 13l-3 3m0 0l-3-3m3 3V8m0 13a9 9 0 110-18 9 9 0 010 18z"
										/>
									</svg>
								</span>
							</template>
							Button
						</Btn>
					</div>
					<div class="inline-grid">
						<p class="justify-self-start items-start text-md btn-title py-4">disabled</p>
						<Btn disabled>Button</Btn>
					</div>
					<div class="inline-grid">
						<p class="justify-self-start items-start text-md btn-title py-4">overwrite class</p>
						<Btn class="w-60 h-14 text-2xl" icon="icon-cs-badge">Button</Btn>
					</div>
					<div class="inline-grid">
						<p class="justify-self-start items-start text-md btn-title py-4">without radius</p>
						<Btn class="rounded-none">Button</Btn>
					</div>
				</div>
				<p class="justify-self-start items-start text-lg subtitle uppercase pt-6">Flat</p>
				<div class="states-grid py-4">
					<div class="inline-grid">
						<p class="justify-self-start items-start text-md btn-title py-4">primary</p>
						<Btn type="flat">Primary</Btn>
					</div>
					<div class="inline-grid">
						<p class="justify-self-start items-start text-md btn-title py-4">secondary</p>
						<Btn color="secondary" type="flat">Secondary</Btn>
					</div>
					<div class="inline-grid">
						<p class="justify-self-start items-start text-md btn-title py-4">tertiary</p>
						<Btn color="tertiary" type="flat">Tertiary</Btn>
					</div>
					<div class="inline-grid">
						<p class="justify-self-start items-start text-md btn-title py-4">icon props</p>
						<Btn icon="icon-cs-badge" type="flat">Button</Btn>
					</div>
					<div class="inline-grid">
						<p class="justify-self-start items-start text-md btn-title py-4">icon slot</p>
						<Btn type="flat">
							<template #icon>
								<span class="mr-2">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										class="h-5 w-5"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
									>
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											stroke-width="2"
											d="M15 13l-3 3m0 0l-3-3m3 3V8m0 13a9 9 0 110-18 9 9 0 010 18z"
										/>
									</svg>
								</span>
							</template>
							Button
						</Btn>
					</div>
					<div class="inline-grid">
						<p class="justify-self-start items-start text-md btn-title py-4">icon before after</p>
						<Btn type="flat">
							<template #iconAfter>
								<span class="ml-2">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										class="h-5 w-5"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
									>
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											stroke-width="2"
											d="M15 13l-3 3m0 0l-3-3m3 3V8m0 13a9 9 0 110-18 9 9 0 010 18z"
										/>
									</svg>
								</span>
							</template>
							Button
						</Btn>
					</div>
					<div class="inline-grid">
						<p class="justify-self-start items-start text-md btn-title py-4">disabled</p>
						<Btn type="flat" disabled>Button</Btn>
					</div>
					<div class="inline-grid">
						<p class="justify-self-start items-start text-md btn-title py-4">overwrite class</p>
						<Btn type="flat" class="w-60 h-14 text-2xl" icon="icon-cs-badge">Button</Btn>
					</div>
					<div class="inline-grid">
						<p class="justify-self-start items-start text-md btn-title py-4">without radius</p>
						<Btn type="flat" class="rounded-none">Button</Btn>
					</div>
				</div>
				<p class="justify-self-start items-start text-lg subtitle uppercase pt-6">Ghost</p>
				<div class="states-grid py-4">
					<div class="inline-grid">
						<p class="justify-self-start items-start text-md btn-title py-4">primary</p>
						<Btn type="ghost">Primary</Btn>
					</div>
					<div class="inline-grid">
						<p class="justify-self-start items-start text-md btn-title py-4">secondary</p>
						<Btn color="tertiary" type="ghost">Secondary</Btn>
					</div>
					<div class="inline-grid">
						<p class="justify-self-start items-start text-md btn-title py-4">tertiary</p>
						<Btn color="tertiary" type="ghost">Tertiary</Btn>
					</div>
					<div class="inline-grid">
						<p class="justify-self-start items-start text-md btn-title py-4">icon props</p>
						<Btn type="ghost" icon="icon-cs-badge">Button</Btn>
					</div>
					<div class="inline-grid">
						<p class="justify-self-start items-start text-md btn-title py-4">icon slot</p>
						<Btn type="ghost">
							<template #icon>
								<span class="mr-2">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										class="h-5 w-5"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
									>
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											stroke-width="2"
											d="M15 13l-3 3m0 0l-3-3m3 3V8m0 13a9 9 0 110-18 9 9 0 010 18z"
										/>
									</svg>
								</span>
							</template>
							Button
						</Btn>
					</div>
					<div class="inline-grid">
						<p class="justify-self-start items-start text-md btn-title py-4">icon before after</p>
						<Btn type="ghost">
							<template #iconAfter>
								<span class="ml-2">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										class="h-5 w-5"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
									>
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											stroke-width="2"
											d="M15 13l-3 3m0 0l-3-3m3 3V8m0 13a9 9 0 110-18 9 9 0 010 18z"
										/>
									</svg>
								</span>
							</template>
							Button
						</Btn>
					</div>
					<div class="inline-grid">
						<p class="justify-self-start items-start text-md btn-title py-4">disabled</p>
						<Btn type="ghost" disabled>Button</Btn>
					</div>
					<div class="inline-grid">
						<p class="justify-self-start items-start text-md btn-title py-4">overwrite class</p>
						<Btn type="ghost" class="w-60 h-14 text-2xl" icon="icon-cs-badge">Button</Btn>
					</div>
					<div class="inline-grid">
						<p class="justify-self-start items-start text-md btn-title py-4">without radius</p>
						<Btn type="ghost" class="rounded-none">Button</Btn>
					</div>
				</div>
			</div>
			<div class="inline-grid"></div>
		</div>
	</div>
</template>
<script lang="ts">
import Btn from '@components/core/Btn.vue'
import { defineComponent } from '@vue/runtime-core'

export default defineComponent({
	name: 'Components',
	components: { Btn },
	setup() {
		const croco = 'sadsa'

		return { croco }
	},
})
</script>
<style lang="scss">
.components {
	background-color: #27272f;
}
.components-grid {
	display: grid;
	// align-content: center;
	// justify-content: center;
	// align-items: center;
	// justify-items: center;
	grid-template-columns: repeat(2, 1fr);
}
.states-grid {
	display: grid;
	grid-auto-flow: row;
	row-gap: 20px;
	grid-template-columns: repeat(3, 1fr);
	grid-template-rows: auto auto;
	justify-items: flex-start;
}

.title {
	color: #fb34ff;
	// font-size: 30px;
	// line-height: 36px;
	// font-weight: 700;
}

.subtitle {
	text-transform: uppercase;
	color: #e5079a;
	// font-size: 14px;
	// line-height: 16px;
	// font-weight: 700;
}
.btn-title {
	color: #fb34ff;
}
</style>
