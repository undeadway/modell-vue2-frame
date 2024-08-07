<template>
	<div>
		<mdl-input :placeholder="placeholder" :disabled="disabled" :readonly="readonly" :type="inputType" append="after" :style="style">
			<template #after>
				<div :class="`mdl-input-append-btn ${mdlInputPasswordBtnEyeStatus}`" @click="changeEyeStatus"></div>
			</template>
		</mdl-input>
	</div>
</template>
<script>
export default {
	name: "MdlInputPassword",
	props: {
		placeholder: {
			type: String,
			default: "请输入"
		},
		style: {
			type: String,
			default: ""
		},
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
			mdlInputPasswordBtnEyeStatus: "mdl-input-password-apend-btn-eye-on",
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
				this.mdlInputPasswordBtnEyeStatus = "mdl-input-password-apend-btn-eye-on";
			} else {
				this.eyeStatus = true;
				this.inputType = "text";
				this.mdlInputPasswordBtnEyeStatus = "mdl-input-password-apend-btn-eye-hide";
			}
		}
	}
}
</script>
<style lang="scss" scoped>
.mdl-input-password-apend-btn-eye-on {
	background-image: url(../../../assets/icons/eye-on.svg);
}
.mdl-input-password-apend-btn-eye-hide {
	background-image: url(../../../assets/icons/eye-hide.svg);
}
</style>