<template>
	<div v-if="dialogVisible">
		<div class="mdl-mask-layer-box" :style="`z-index: ${zIndex};`" @click="onClose"></div><!-- 遮罩层 -->
		<!-- 主体 -->
		<div class="mdl-dialog-box" :style="`z-index: ${zIndex + 1}; left: ${dialogLeft}; top: ${dialogTop}; width: ${dialogWidth}; height:${dialogHeight};`">
			<div class="mdl-dialog-title-box">{{title}}</div>
			<div class="mdl-close-box mdl-dialog-close-box" @click="onClose">
				<close-box />
			</div>
			<div class="mdl-dialog-content-box">
				<slot></slot>
			</div>
		</div>
	</div>
</template>
<script>
import CloseBox from "../components/close-box";
export default {
	name: "MdlDialog",
	components: {
		CloseBox
	},
	props: {
		title: {
			type: String,
			default: ""
		},
		visible: {
			type: Boolean,
			default: false
		},
		width: {
			type: String,
			default: "800px",
		},
		height: {
			type: String,
			default: ""
		},
		appendToBody: {
			type: Boolean,
			default: false
		}
	},
	data () {
		return {
			zIndex: 100,
			dialogVisible: false,
			dialogLeft: "0px",
			dialogTop: "0px",
			dialogWidth: "0px",
			dialogHeight: "0px"
		}
	},
	watch: {
		"visible": function(v1, v2) {
			this.dialogVisible = v1;

			if (this.appendToBody) {
				document.body.appendChild(this.$el);
			}
		}
	},
	created () {
		this.dialogVisible = this.visible;
		this.dialogWidth = parseInt(this.width);

		if (this.height) {
			this.dialogHeight = parseInt(this.height);
			this.dialogTop = (document.body.scrollHeight - this.dialogHeight ) / 2;
		} else {
			this.dialogTop = document.body.scrollHeight / 3;
		}

		this.dialogLeft = (document.body.scrollWidth - this.dialogWidth )/ 2;

		if (this.dialogHeight > document.body.scrollHeight * 0.9) {
			this.dialogHeight = document.body.scrollHeight * 0.9;
			this.dialogTop = (document.body.scrollHeight - this.dialogHeight ) / 2;
		}

		if (this.dialogWidth > document.body.scrollWidth * 0.9) {
			this.dialogLeft = (document.body.scrollWidth - this.dialogWidth )/ 2;
			this.dialogWidth = document.body.scrollWidth * 0.9;
		}

		this.dialogWidth = `${this.dialogWidth}px`;
		this.dialogHeight = `${this.dialogHeight}px`;
		this.dialogLeft = `${this.dialogLeft}px`;
		this.dialogTop = `${this.dialogTop}px`;

		if (this.appendToBody) {
			this.zIndex += 2;
		}
	},
	methods: {
		onClose () {
			this.dialogVisible = false;
			this.$emit("close-dialog");
		}
	}
}
</script>
<style lang="scss" scoped>
.mdl-mask-layer-box {
	position: absolute;
	left: 0px;
	top: 0px;
	width: 100vw;
	height: 100vh;
	background: rgba($color: $c_pure_black, $alpha: $v_golden_ratio);
}

.mdl-dialog-box {
	position: absolute;
	background: $c_bgcolor;
	border: 1px solid $c_border;
	padding-bottom: 20px;

	.mdl-dialog-title-box {
		margin: 20px;
		font-size: 20px;
		font-weight: bold;
	}

	.mdl-dialog-content-box {
		margin: 10px 20px;
	}

	.mdl-dialog-close-box {
		position: absolute;
		right: 10px;
		top: 0px;
	}
}
</style>