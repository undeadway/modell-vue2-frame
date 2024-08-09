<template>
	<div v-if="modalVisible">
		<div class="mdl-mask-layer-box" :style="`z-index: ${zIndex};`" @click="onClose"></div><!-- 遮罩层 -->
		<!-- 主体 -->
		<div class="mdl-modal-box" :style="`${styles} z-index: ${zIndex + 1}; left: ${modalLeft} top: ${modalTop}`">
			<div class="mdl-modal-title-box">{{title}}</div>
			<div class="mdl-close-box mdl-modal-close-box" @click="onClose">
				<close-box />
			</div>
			<div class="mdl-modal-content-box">
				<slot></slot>
			</div>
		</div>
	</div>
</template>
<script>
import mixin from '../utils/mixin';
import CloseBox from "../components/close-box";

export default {
	mixins: [ mixin ],
	name: "MdlModal",
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
		appendToBody: {
			type: Boolean,
			default: false
		}
	},
	data () {
		return {
			zIndex: 100,
			modalVisible: false,
			modalLeft: "0px",
			modalTop: "0px"
		}
	},
	watch: {
		"visible": function(v1, v2) {
			this.modalVisible = v1;

			if (this.appendToBody) {
				document.body.appendChild(this.$el);
			}
		}
	},
	created () {
		this.modalVisible = this.visible;

		const tmp = this.style || {};
		
		const modalWidth = (tmp.width) ? parseInt(tmp.width) : 800;
		let modalHeight = (tmp.height) ? parseInt(tmpheight) : undefined;

		if (modalHeight) {
			this.modalTop = (document.body.scrollHeight - modalHeight ) / 2;
		} else {
			this.modalTop = document.body.scrollHeight / 3;
		}

		this.modalLeft = (document.body.scrollWidth - modalWidth ) / 2;

		if (modalHeight > document.body.scrollHeight * 0.9) {
			modalHeight = document.body.scrollHeight * 0.9;
			this.modalTop = (document.body.scrollHeight - this.modalHeight ) / 2;
		}

		if (modalWidth > document.body.scrollWidth * 0.9) {
			this.modalLeft = (document.body.scrollWidth - modalWidth )/ 2;
			modalWidth = document.body.scrollWidth * 0.9;
		}

		this.modalLeft = `${this.modalLeft}px;`;
		this.modalTop = `${this.modalTop}px;`;

		const newStyle = {};
		if (modalWidth) {
			newStyle.width =  `${modalWidth}px;`;
		}
		if (modalHeight) {
			newStyle.height =  `${modalHeight}px;`;
		}

		this.tmpStyle = newStyle;

		this.init();

		if (this.appendToBody) {
			this.zIndex += 2;
		}
	},
	methods: {
		onClose () {
			this.modalVisible = false;
			this.$emit("close-modal");
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

.mdl-modal-box {
	position: absolute;
	background: $c_bgcolor;
	border: 1px solid $c_border;
	padding-bottom: 20px;

	.mdl-modal-title-box {
		margin: 20px;
		font-size: 20px;
		font-weight: bold;
	}

	.mdl-modal-content-box {
		margin: 10px 20px;
	}

	.mdl-modal-close-box {
		position: absolute;
		right: 10px;
		top: 0px;
	}
}
</style>