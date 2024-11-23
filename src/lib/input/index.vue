<template>
	<div class="mv2-input-box" :style="style">
		<div v-if="append === 'before'" class="slot-box" :style="beforeStyles">
			<slot name="before"></slot>
		</div>
		<div style="width: 1px" />
		<div class="mv2-input-val-box" :style="inputBoxStyles">
			<input class="mv2-input-input-box" :class="{ 'is-disabled' : this.disabled }" autocomplete="off" v-model="value"
				:disabled="disabled" :readonly="readonly" :style="inputStyles" :type="type" :placeholder="placeHolder" 
				@focus="onFocus" @blur="onBlur" />
				<div class="mv2-input-clear-box" v-if="clearable" @click="">
					<close-box @close="onClear"></close-box>
				</div>
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
import CloseBox from "./../../components/close-box";

import { initStyles } from '../../utils/utils';

export default {
	name: "Mv2Input",
	mixins: [ StyleMixin, FormItemMixin ],
	components: {
		CloseBox
	},
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
		},
		clearable: Boolean
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
		const inputStyles = {};
		if (append.indexOf("before") >= 0) {
			inputStyles["border-top-left-radius"] = inputStyles["border-bottom-left-radius"] = "0px";
		}
		if (append.indexOf("after") >= 0) {
			inputStyles["border-top-right-radius"] = inputStyles["border-bottom-right-radius"] = "0px";
		}

		let width = 23;
		let length = append.length;

		if (length > 0) {
			width = 20;
		}

		if (length === 0) {
			length = 1;
		}

		let widthStyle = width * length;

		if (this.clearable) {
			widthStyle += 20;
			inputStyles["padding-right"] = "30px";
		}

		inputStyles.width = `calc(100% - ${widthStyle}px)`;
		this.inputStyles = initStyles(inputStyles);
	},
	methods: {
		onFocus () {
			// this.placeHolder = "";
			this.$emit("focus");
		},
		async onBlur () {
			this.placeHolder = this.placeholder;
			this.formItemValidte();
			this.$emit("blur");
			this.$emit("input", this.value);
		},
		getValue () {
			return this.value;
		},
		onClear () {
			this.value = "";
			// this.placeHolder = this.placeholder;
			this.$forceUpdate();
			this.$emit("input", "");
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
	.mv2-input-val-box {
		width: 100%;
		position: relative;
		.mv2-input-clear-box {
			position: absolute;
			right: 8px;
			top: 10px;
		}
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

.is-disabled {
	background: #f0f0f0;
}
</style>
