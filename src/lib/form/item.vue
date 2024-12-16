<template>
	<div>
		<div class="mv2-form-item-box">
			<div>
				<div v-if="required" class="mv2-form-item-required-mark">*</div>
			</div>
			<div :style="`width: ${mv2Form.labelWidth}px;`" :class="`mv2-form-item-label mv2-text-align__${mv2Form.labelAlign}`">
				{{ label }}
			</div>
			<div :style="`width: calc(100% - ${Number(mv2Form.labelWidth) + 30}px); ${style}`">
				<slot ref="field"></slot>
			</div>
		</div>
		<div class="mv2-form-item-check-result-box" :style="`margin-left:${Number(mv2Form.labelWidth) + 5}px;`">{{ errorMessage }}</div>
	</div>
</template>
<script>
export default {
	name: "Mv2FormItem",
	inject: [ "mv2Form" ],
	provide: function () {
		return {
			"mv2FormItem": this
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
		if (this.mv2Form && this.mv2Form.rules) {
			const item = this.mv2Form.rules[this.field];
			this.required = !!item ? (item.required || false) : false;
			this.mv2Form.setField(this.field, this);
		}
	},
	methods: {
		setField (field) {
			this.itemField = field;
			this.mv2Form.setField(this.field, field);
		},
		getRule () {
			if (this.mv2Form && this.mv2Form.rules) {
				const rule = this.rule || this.mv2Form.rules[this.field];
				if (!this.rule) {
					this.rule = rule;
				}
				return rule;
			} else {
				return null;
			}
		},
		validate() {
			const that = this;
			return new Promise((resolve, reject) => {
				const rule = this.getRule();
				// TODO 这里的处理有问题，还要再研究
				// let value = that.itemField !== null ? that.itemField.value : null;
				// if (!value) {
				// 	
				// }
				const value = that.mv2Form.form[that.field];
				let errMsg = null;
				if (rule) {
					if (rule.required && !value) {
						const message = rule.message || `${that.label}是必填字段`;
						that.setMessage(message);
						resolve(message);
						return;
					}
					if (rule.validate) {
						rule.validate.call(that.mv2Form.$parent, value, (message) => {
							errMsg = message;
						});
					}
				}

				if (errMsg) {
					that.setMessage(errMsg);
					resolve(errMsg);
				} else {
					that.setMessage("");
					resolve(null);
				}
			});
		},
		setValue (value) {
			this.mv2Form.form[this.field] = value;
		},
		setMessage (message) {
			this.errorMessage = "";
			this.errorMessage = message;
		}
	}
}
</script>
<style lang="scss" scoped>
.mv2-form-item-box {
	>div {
		display: inline-table;
		vertical-align: top;
		padding-top: 4px;
		&:first-child {
			width: 12px;
		}
	}
	.mv2-form-item-required-mark {
		color: $c_red;
		font-weight: bold;
		margin-right: 5px;
	}
	.mv2-form-item-label {
		margin-right: 10px;
		user-select:none;
		margin-bottom: 4px;
	}
	.mv2-text-align_left {
		text-align: left;
	}

	.mv2-form-item-required-mark, .mv2-form-item-label {
		padding-top: 12px;
	}
}
.mv2-form-item-check-result-box {
	height: 20px;
	color: $c_danger;
	padding: 2px 0px 4px 0px;
}
</style>
