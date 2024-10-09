<template>
	<div v-if="modalVisible">
		<div class="mv2-mask-layer-box" :style="`z-index: ${zIndex};`" @click="onClose"></div><!-- 遮罩层 -->
		<!-- 主体 -->
		<dialog-body :title="title" :style="style" :z-index="zIndex" :position="position" @close="onClose">
			<slot></slot>
		</dialog-body>
	</div>
</template>
<script>
import StyleMixin from '../mixins/style-mixin';
import DialogBody from '../components/dialog-body';

export default {
	name: "Mv2Modal",
	mixins: [ StyleMixin ],
	components: {
		DialogBody
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
			modalVisible: false
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
	destroyed() {
		// if appendToBody is true, remove DOM node after destroy
		if (this.appendToBody && this.$el && this.$el.parentNode) {
			this.$el.parentNode.removeChild(this.$el);
		}
	},
	created () {
		this.modalVisible = this.visible;

		const tmp = this.styles;
		
		const modalWidth = (tmp.width) ? parseInt(tmp.width) : 800;
		let modalHeight = (tmp.height) ? parseInt(tmp.height) : undefined;

		let modalTop = modalHeight ? ((document.body.scrollHeight - modalHeight ) / 2) : (document.body.scrollHeight / 3);
		let modalLeft = (document.body.scrollWidth - modalWidth ) / 2;
		let zIndex = 1000;

		if (modalHeight > document.body.scrollHeight * 0.9) {
			modalHeight = document.body.scrollHeight * 0.9;
			modalTop = (document.body.scrollHeight - this.modalHeight ) / 2;
		}

		if (modalWidth > document.body.scrollWidth * 0.9) {
			modalLeft = (document.body.scrollWidth - modalWidth )/ 2;
			modalWidth = document.body.scrollWidth * 0.9;
		}

		modalLeft = `${modalLeft}px`;
		modalTop = `${modalTop}px`;

		const tmpStyle = {};
		if (modalWidth) {
			tmpStyle.width =  `${modalWidth}px`;
		}
		if (modalHeight) {
			tmpStyle.height =  `${modalHeight}px`;
		}

		tmpStyle.left = modalLeft;
		tmpStyle.top = modalTop;

		if (this.appendToBody) {
			zIndex += 2;
		}

		tmpStyle["z-index"] = zIndex;

		this.styles = tmpStyle;

		this.initStyle();
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
.mv2-mask-layer-box {
	position: absolute;
	left: 0px;
	top: 0px;
	width: 100vw;
	height: 100vh;
	background: rgba($color: $c_pure_black, $alpha: $v_golden_ratio);
}
</style>