<template>
	<div>
		<textarea :style="style" class="mv2-input-text-box" @blur="onBlur" v-model="value" 
			:placeholder="placeholder" :readonly="readonly" :disabled="disabled" :rows="rows"></textarea>
	</div>
</template>
<script>
import StyleMixin from './../../mixins/style-mixin';
import FormItemMixin from "./../../mixins/form-item-mixin";

export default {
	name: "Mv2Text",
	mixins: [ StyleMixin, FormItemMixin ],
	props: {
		placeholder: {
			type: String,
			default: "请输入"
		},
		readonly: {
			type: Boolean,
			default: false
		},
		disabled: {
			type: Boolean,
			default: false
		},
		value: {
			type: String,
			default: ""
		},
		rows: {
			type: Number,
			default: 5
		}
	},
	watch: {
		"value": function(v1, v2) {
			console.log(v1);
			this.formItemSetValue(v1);
		}
	},
	created () {
		console.log(this.value);
		this.placeHolder = this.placeholder;
	},
	methods: {
		onBlur () {
			this.$emit("input", this.value);
		}
	}
}
</script>
<style lang="scss" scoped>
.mv2-input-text-box {
	color: $c_primary;
	font-size: 14px;
}
</style>