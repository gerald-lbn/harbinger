<script lang="ts">
	type Props = {
		heading: string
		subheading: string
	}

	const { heading, subheading }: Props = $props()
</script>

<div class="flex flex-col items-center gap-6 text-center">
	<div class="size-12 rounded border shadow-2xs"></div>
	<div class="flex flex-col gap-2">
		<h1 class="text-2xl font-semibold text-primary">{heading}</h1>
		<p class="text-muted-foreground">{subheading}</p>
	</div>
</div>
