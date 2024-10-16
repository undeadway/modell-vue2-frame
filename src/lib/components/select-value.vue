<template>
	<div class="mv2-select-value-box mv2-input-object" @click="onClick" :style="style">
		<div>{{ label }}</div>
	</div>
</template>
<script>
import { initStyles } from "./../../utils/utils";

export default {
	props: {
		label: {
			type: String,
			default: ""
		},
		styles: {
			type: Object,
			default: {}
		}
	},
	data () {
		return {
			style: ""
		}
	},
	created () {
		this.style = initStyles(this.styles);
		console.log(this.style);
	},
	methods: {
		onClick () {
			this.$emit("click");
		}
	}
}
</script>
<style lang="scss" scoped>
.mv2-select-value-box {
	cursor: pointer;
	>div {
		overflow-x: hidden;
		white-space:nowrap;
	}
}
</style>
