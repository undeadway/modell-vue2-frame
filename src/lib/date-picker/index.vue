<template>
	<div>
		<div v-if="type === 'time'">
			<mv2-time />
		</div>
	</div>
</template>
<script>
import Mv2Time from "./time";
export default {
	name: "Mv2DatePicker",
	components: {
		Mv2Time
	},
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