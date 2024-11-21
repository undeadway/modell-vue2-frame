<template>
	<div>
		<mv2-input ref="password" v-model="value" :clearable="clearable" :placeholder="placeholder" :disabled="disabled"
			:readonly="readonly" :type="inputType" append="after" :styles="styles" @clear="onClearData"
		>
			<template #after>
				<div :class="`mv2-input-append-btn ${mv2InputPasswordBtnEyeStatus}`" @click="changeEyeStatus"></div>
			</template>
		</mv2-input>
	</div>
</template>
<script>
export default {
	name: "Mv2Password",
	props: {
		placeholder: {
			type: String,
			default: "请输入"
		},
		styles: undefined,
		disabled: {
			type: Boolean,
			default: false
		},
		clearable: {
			type: Boolean,
			default: false
		},
		readonly: {
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
			inputType: "password",
			mv2InputPasswordBtnEyeStatus: "mv2-input-password-apend-btn-eye-on",
			eyeStatus: false,
			readonly: {
				type: Boolean,
				default: false
			}
		}
	},
	watch: {
		value: function (v1, v2) {
			this.$emit("input", this.value);
		}
	},
	methods: {
		changeEyeStatus () {
			if (this.eyeStatus) {
				this.eyeStatus = false;
				this.inputType = "password";
				this.mv2InputPasswordBtnEyeStatus = "mv2-input-password-apend-btn-eye-on";
			} else {
				this.eyeStatus = true;
				this.inputType = "text";
				this.mv2InputPasswordBtnEyeStatus = "mv2-input-password-apend-btn-eye-hide";
			}
		}
	}
}
</script>
<style lang="scss" scoped>
.mv2-input-password-apend-btn-eye-on {
	background-image: url(./../../assets/icons/eye-on.svg);
}
.mv2-input-password-apend-btn-eye-hide {
	background-image: url(./../../assets/icons/eye-hide.svg);
}
</style>
