<template>
    <div v-if="drawerVisible">
		<div v-if="maskLayer" class="mv2-mask-layer-box" :style="`z-index: ${zIndex};`" @click="onClose"></div><!-- 遮罩层 -->
		<dialog-body :init-flag="false" :title="title" :style="style" @close="onClose">
			<slot></slot>
		</dialog-body>
	</div>
</template>
<script>
import DialogBody from './../../components/dialog-body';
import StyleMixin from './../../mixins/style-mixin';
import ZindexMixin from './../../mixins/zindex-mixin';

export default {
	name: "Mv2Drawer",
	mixins: [ StyleMixin, ZindexMixin ],
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
		position: {
			type: String,
			default: "left"
		},
		maskLayer: Boolean
	},
	data () {
		return {
			drawerVisible: false
		}
	},
	watch: {
		"visible": function(v1, v2) {
			this.drawerVisible = v1;

			if (this.appendToBody) {
				document.body.appendChild(this.$el);
			}
		},
		"position": function () {
			this.init();
		}
	},
	destroyed() {
		if (this.appendToBody && this.$el && this.$el.parentNode) {
			this.$el.parentNode.removeChild(this.$el);
		}
	},
	created () {
		this.init();
	},
	methods: {
		init () {
			this.drawerVisible = this.visible;

			const styles = Object.assign({
				"z-index": this.getZindexLayer()
			}, this.styles);

			styles[this.position] = "0px";
			switch (this.position) {
				case "left":
				case "right":
					styles.top = "0px";
					styles.height = "100%";
					break;
				case "top":
				case "bottom":
					styles.left = "0px";
					styles.width = "100%";
					break;
			}

			this.styles = styles

			this.initStyle();
		},
		onClose () {
			this.drawerVisible = false;
			this.$emit("close");
		}
	}
}
</script>
