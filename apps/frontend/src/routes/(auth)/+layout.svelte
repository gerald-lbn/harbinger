<script lang="ts">
	const { children } = $props()
</script>

<main class="min-h-screen overflow-hidden px-4 py-12 md:px-8 md:pt-24">
	<div class="mx-auto flex w-full flex-col gap-8 sm:max-w-90">
		{@render children?.()}
	</div>
</main>
