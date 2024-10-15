<template>
	<button @click="onClick" :type="nativeType" :disabled="disabled" :class="`mv2-button mv2-button__${type}`" :style="style">
		<slot></slot>
	</button>
</template>
<script>
import StyleMixin from './mixins/style-mixin';

export default {
	name: "Mv2Button",
	mixins: [ StyleMixin ],
	props: {
		type: {
			type: String,
			default: ""
		},
		nativeType: {
			type: String,
			default: "button"
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
.mv2-button {
	cursor: pointer;
}
.mv2-button__text {
	border-color: transparent;
	color: $c_blue;
	background: transparent;
	padding: 0px;
	margin: 0px 4px;
	font-weight: bold;
}

.mv2-button__button {
	border: 1px solid $c_dark_blue;
	background:  $c_blue;
	color: $c_white;
	padding:8px;
	border-radius: 8px;
}
</style>
