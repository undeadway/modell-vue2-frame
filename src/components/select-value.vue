<template>
	<div class="mv2-select-value-box" @click="onClick" :style="style">
		<mv2-input v-model="value" :placeholder="placeholder" :readonly="true" :clearable="clearable" :disabled="disabled"></mv2-input>
	</div>
</template>
<script>
import { initStyles } from "./../utils/utils";
import Mv2Input from "./../lib/input";

export default {
	components: {
		Mv2Input
	},
	props: {
		value: {
			type: String,
			default: ""
		},
		placeholder: undefined,
		styles: {
			type: Object,
			default: {}
		},
		disabled: {
			type: Boolean,
			default: false
		},
		clearable: Boolean
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
	::v-deep .mv2-input-val-box>input {
		cursor: pointer;
	}
	>div {
		overflow-x: hidden;
		white-space:nowrap;
	}
}
</style>
