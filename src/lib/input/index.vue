<template>
	<div class="mv2-input-box" :style="style">
		<div v-if="append === 'before'" class="slot-box" :style="beforeStyles">
			<slot name="before"></slot>
		</div>
		<div style="width: 1px" />
		<div class="mv2-input-obj" :style="inputBoxStyles">
			<input class="mv2-input-object" autocomplete="off" v-model="value"
				:disabled="disabled" :readonly="readonly" :style="inputStyles" :type="type" :placeholder="placeHolder" 
				@focus="onFocus" @blur="onBlur" />
		</div>
		<div style="width: 1px" />
		<div v-if="append === 'after'" class="mv2-slot-box" :style="afterStyles">
			<slot name="after"></slot>
		</div>
	</div>
</template>
<script>
import StyleMixin from './../../mixins/style-mixin';
import FormItemMixin from "./../../mixins/form-item-mixin";

export default {
	mixins: [ StyleMixin, FormItemMixin ],
	name: "Mv2Input",
	props: {
		placeholder: {
			type: String,
			default: "请输入"
		},
		type: {
			type: String,
			default: "text"
		},
		append: {
			type: String,
			default: ""
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
		}
	},
	data () {
		return {
			placeHolder: "",
			beforeStyles: "",
			inputStyles : "",
			inputBoxStyles: "",
			afterStyles: ""
		}
	},
	watch: {
		"value": function(v1, v2) {
			this.formItemSetValue(v1);
		}
	},
	created () {
		this.placeHolder = this.placeholder;

		const append = this.append === "" ? [] : this.append.split(",");
		let inputStyles = "";
		if (append.indexOf("before") >= 0) {
			inputStyles += `border-top-left-radius: 0px; border-bottom-left-radius: 0px;`;
		}
		if (append.indexOf("after") >= 0) {
			inputStyles += `border-top-right-radius: 0px; border-bottom-right-radius: 0px;`;
		}

		let width = 23;
		let length = append.length;

		if (length > 0) {
			width = 20;
		}

		if (length === 0) {
			length = 1;
		}

		const widthStyle = `width: calc(100% - ${width * length}px);`;
		inputStyles += widthStyle;
		this.inputStyles = inputStyles;
	},
	methods: {
		onFocus () {
			this.placeHolder = "";
		},
		async onBlur () {
			this.placeHolder = this.placeholder;
			this.formItemValidte();
		},
		getValue () {
			return this.value;
		}
	}
}
</script>
<style lang="scss" scoped>
.mv2-input-box {
	>div {
		display: table-cell;
		vertical-align: middle;
	}
	.mv2-input-obj {
		width: 100%;
	}
	.mv2-slot-box {
		.mv2-input-append-btn {
			background-position-x: 0px;
			background-position-y: 0px;
			background-repeat: no-repeat;
			background-size: 20px;
			width: 18px;
			height: 20px;
		}
		width: 1px;
		background: $c_gray;
		white-space: nowrap;
		height: 20px;
		line-height: 20px;
		text-align: center;
		padding: 8px 16px;
		border: 1px solid $c_dark_gray;
		border-left: 0px;
		border-top-right-radius: 6px;
		border-bottom-right-radius: 6px;
		cursor: pointer;
	}
}
</style>
