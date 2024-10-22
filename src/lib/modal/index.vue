<template>
	<div v-if="modalVisible">
		<div class="mv2-mask-layer-box" :style="`z-index: ${zIndex};`" @click="onClose"></div><!-- 遮罩层 -->
		<!-- 主体 -->
		<dialog-body :title="title" :styles="styles" @close="onClose">
			<slot></slot>
		</dialog-body>
	</div>
</template>
<script>
import DialogBody from './../../components/dialog-body';

export default {
	name: "Mv2Modal",
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
		appendToBody: Boolean
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
	},
	methods: {
		onClose () {
			this.modalVisible = false;
			this.$emit("close-modal");
		}
	}
}
</script>
