<template>
	<div class="mv2-dialog-box" :style="`${style}`">
		<div class="mv2-dialog-title-box" :style="titleStyle">{{title}}</div>
		<div class="mv2-dialog-close-box">
			<close-box @close="onClose" />
		</div>
		<div class="mv2-dialog-content-box">
			<slot></slot>
		</div>
	</div>
</template>
<script>
import StyleMixin from './../mixins/style-mixin';
import CloseBox from "./close-box";

export default {
	components: {
		CloseBox
	},
	mixins: [ StyleMixin ],
	props: {
		style: {
			type: String,
			default: ""
		},
		title: {
			type: String,
			default: ""
		},
		titleStyle: {
			type: String,
			default: ""
		},
		initFlag: {
			type: Boolean,
			default: true
		}
	},
	mounted () {
		this.$nextTick(() => {
			if (this.initFlag) {
				this.init();
			}
		});
	},
	methods: {
		init () {
			const tmp = Object.assign({}, this.styles);

			const dialogWidth = (tmp.width) ? parseInt(tmp.width) : 800;
			let dialogHeight = (tmp.height) ? parseInt(tmp.height) : undefined;

			let dialogTop = dialogHeight ? ((document.body.scrollHeight - dialogHeight ) / 2) : (document.body.scrollHeight / 3);
			let dialogLeft = (document.body.scrollWidth - dialogWidth ) / 2;

			if (dialogHeight > document.body.scrollHeight * 0.9) {
				dialogHeight = document.body.scrollHeight * 0.9;
				dialogTop = (document.body.scrollHeight - this.dialogHeight ) / 2;
			}

			if (dialogWidth > document.body.scrollWidth * 0.9) {
				dialogLeft = (document.body.scrollWidth - dialogWidth )/ 2;
				dialogWidth = document.body.scrollWidth * 0.9;
			}

			dialogLeft = `${dialogLeft}px`;
			dialogTop = `${dialogTop}px`;

			const tmpStyle = Object.assign({}, tmp);
			if (dialogWidth) {
				tmpStyle.width =  `${dialogWidth}px`;
			}
			if (dialogHeight) {
				tmpStyle.height =  `${dialogHeight}px`;
			}

			tmpStyle.left = dialogLeft;
			tmpStyle.top = dialogTop;

			this.styles = tmpStyle;

			this.initStyle();
		},
		onClose () {
			this.$emit("close");
		}
	}
}
</script>
<style lang="scss" scoped>
.mv2-dialog-box {
	position: absolute;
	background: $c_bgcolor;
	border: 1px solid $c_border;
	.mv2-dialog-title-box {
		margin: 20px;
		font-size: 20px;
		font-weight: bold;
	}
	.mv2-dialog-content-box {
		margin: 10px 20px;
	}
	.mv2-dialog-close-box {
		position: absolute;
		right: 10px;
		top: 0px;
	}
}
</style>
