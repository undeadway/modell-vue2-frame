<template>
	<div>
		<div class="mdl-form-item-box">
			<div v-if="required" class="mdl-form-item-required-mark">*</div>
			<div :style="`width: ${mdlForm.labelWidth}px;`" :class="`mdl-form-item-label mdl-text-align__${mdlForm.labelAlign}`">
				{{ label }}
			</div>
			<div :style="`width: calc(100% - ${Number(mdlForm.labelWidth) + 30}px); ${style}`">
				<slot ref="field"></slot>
			</div>
		</div>
		<div class="mdl-form-item-check-result-box" :style="`margin-left:${Number(mdlForm.labelWidth) + 30}px;`">{{ errorMessage }}</div>
	</div>
</template>
<script>
export default {
	name: "MdlFormItem",
	inject: [ "mdlForm" ],
	provide: function () {
		return {
			"mdlFormItem": this
		}
	},
	props: {
		width: {
			type: String,
			default: ""
		},
		label: {
			type: String,
			default: ""
		},
		field: {
			type: String,
			default: ""
		},
		style: {
			type: String,
			default: ""
		}
	},
	data () {
		return {
			required: false,
			errorMessage: "",
			itemField: null
		}
	},
	created () {
		const item = this.mdlForm.rules[this.field];
		this.required = !!item ? (item.required || false) : false;
		this.mdlForm.setItem(this.field, this);
	},
	methods: {
		setField (field) {
			this.itemField = field;
		},
		validate() {
			return this.itemField.validate();
		},
		setValue (value) {
			this.mdlForm.form[this.field] = value;
		},
		setMessage (message) {
			this.errorMessage = "";
			this.errorMessage = message;
		}
	}
}
</script>
<style lang="scss" scoped>
.mdl-form-item-box {
	>div {
		display: inline-table;
		vertical-align: middle;
	}

	.mdl-form-item-required-mark {
		color: var(--c_red);
		font-weight: bold;
		margin-right: 5px;
	}

	.mdl-form-item-label {
		margin-right: 10px;
	}

	.mdl-text-align_left {
		text-align: left;
	}
}

.mdl-form-item-check-result-box {
	height: 20px;
	color: var(--c_danger);
	padding: 2px 0px 4px 0px;
}

</style>