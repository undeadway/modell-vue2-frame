<template>
	<button @click="onClick" :type="nativeType" :disabled="disabled" :class="`mdl-button mdl-button__${type}`" :style="style">
		<slot></slot>
	</button>
</template>
<script>
export default {
	props: {
		type: {
			type: String,
			default: ""
		},
		nativeType: {
			type: String,
			default: "button"
		},
		style: {
			type: {
				type: String,
				default: ""
			}
		},
		disabled: {
			type: Boolean,
			default: false
		}
	},
	methods: {
		onClick () {
			this.$emit("click");
		}
	}
}
</script>
<style lang="scss" scoped>
.mdl-button {
	cursor: pointer;
}
.mdl-button__text {
	border-color: transparent;
	color: $c_blue;
	background: transparent;
	padding: 0px;
	margin: 0px 4px;
	font-weight: bold;
}

.mdl-button__button {
	border: 1px solid $c_dark_blue;
	background:  $c_blue;
	color: $c_white;
	padding:8px;
	border-radius: 8px;
}
</style>