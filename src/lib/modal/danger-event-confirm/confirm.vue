<template>
	<div>
		<h2 class="mv2-danger-event-confirm-title">
			<div></div>
			<div>这是一个危险的操作！</div>
		</h2>
		<div style="margin:10px 0px;">您真的要{{ message }}么？</div>
		<mv2-form  ref="form" :form="form" :rules="rules">
			<mv2-form-item :label="`请输入随机码 ${ randCode } 进行危险操作确认`" field="inputRandCode">
				<mv2-input v-model="form.inputRandCode" size="mini" placeholder="请输入随机码" />
			</mv2-form-item>
		</mv2-form>
		<mv2-ok-cancel-buttons :ok-event="onOkEvent" :cancel-event="onCancelEvent"></mv2-ok-cancel-buttons>
	</div>
</template>
<script>
const BASE_STR = "23456789_!ABCDEFGH-JKLMNPQ?RSTUVWXYZ@#$%&abcdefghijk+mnopq=rstuvwxyz";

import Mv2Modal from "./index";

export default {
	name: "Mv2DangerEventConfirm",
	components: {
		Mv2Modal
	},
	props: {
		message: undefined,
		length: undefined
	},
	data () {
		return {
			randCode: "",
			form: {
				inputRandCode: ""
			},
			rules: {
				inputRandCode: {
					required: true,
					message: "请输入随机码！",
					trigger: "blur",
					validate: function (value, callback) {
						if (this.form.inputRandCode !== this.randCode) {
							callback("输入的随机码错误");
						} else {
							callback();
						}
					}
				}
			}
		}
	},
	created () {
		this.createRandCode();
	},
	methods: {
		createRandCode () {
			let code = [];
			for (let i = 0; i < this.length; i++) {
				let index = Math.trunc(Math.random() * BASE_STR.length);
				if (index >= BASE_STR.length) {
				index = BASE_STR.length - 2;
				}
				code[i] = BASE_STR[index];
			}
			this.randCode = code.join("");
		},
		async onOkEvent () {
			const validResult = await this.$refs.form.validate();
			if (validResult.length === 0) {
				this.$emit("ok");
			}
		},
		onCancelEvent () {
			this.$emit("cancel");
		}
	}
}
</script>
<style lang="scss" scoped>
.mv2-danger-event-confirm-title {
	color:$c_danger;
	font-weight: bold;
	div {
		display: inline-block;
		vertical-align:middle;
	}
	div:first-child {
		background-image: url(./../../../assets/icons/warning.svg);
		background-repeat: no-repeat;
		background-position: center;
		background-size: 100%;
		width: 36px;
		height: 36px;
		margin-right: 10px;
	}
}
</style>