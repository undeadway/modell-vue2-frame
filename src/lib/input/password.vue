<template>
	<div>
		<mv2-input :placeholder="placeholder" :disabled="disabled" :readonly="readonly" :type="inputType" append="after" :styles="styles">
			<template #after>
				<div :class="`mv2-input-append-btn ${mdlInputPasswordBtnEyeStatus}`" @click="changeEyeStatus"></div>
			</template>
		</mv2-input>
	</div>
</template>
<script>
export default {
	name: "Mv2InputPassword",
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
		readonly: {
			type: Boolean,
			default: false
		}
	},
	data () {
		return {
			inputType: "password",
			mdlInputPasswordBtnEyeStatus: "mv2-input-password-apend-btn-eye-on",
			eyeStatus: false,
			readonly: {
				type: Boolean,
				default: false
			}
		}
	},
	methods: {
		changeEyeStatus () {
			if (this.eyeStatus) {
				this.eyeStatus = false;
				this.inputType = "password";
				this.mdlInputPasswordBtnEyeStatus = "mv2-input-password-apend-btn-eye-on";
			} else {
				this.eyeStatus = true;
				this.inputType = "text";
				this.mdlInputPasswordBtnEyeStatus = "mv2-input-password-apend-btn-eye-hide";
			}
		}
	}
}
</script>
<style lang="scss" scoped>
.mv2-input-password-apend-btn-eye-on {
	background-image: url(../../assets/icons/eye-on.svg);
}
.mv2-input-password-apend-btn-eye-hide {
	background-image: url(../../assets/icons/eye-hide.svg);
}
</style>