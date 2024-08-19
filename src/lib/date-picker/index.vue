<template>
	<div>
		<div v-if="type === 'time'"></div>
	</div>
</template>
<script>
export default {
	props: {
		type: String,
		default: "date" // date、datetime、time、
	},
	data () {
		return {
			value: ""
		}
	}
}
</script>