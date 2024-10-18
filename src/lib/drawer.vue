<template>
    <div v-if="drawerVisible">
		<div v-if="maskLayer" class="mv2-mask-layer-box" :style="`z-index: ${zIndex};`" @click="onClose"></div><!-- 遮罩层 -->
		<dialog-body :title="title" :style="style" @close="onClose">
			<slot></slot>
		</dialog-body>
	</div>
</template>
<script>
import StyleMixin from './../mixins/style-mixin';
import DialogBody from './../components/dialog-body';

export default {
	name: "Mv2Drawer",
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
		position: {
			type: String,
			default: "left"
		},
		maskLayer: Boolean
	},
	data () {
		return {
			drawerVisible: false,
			zIndex: 1000
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

			const styles = Object.assign({}, this.styles);

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

			styles["z-index"] = this.zIndex + 1;

			this.styles = styles;

			this.initStyle();
		},
		onClose () {
			this.drawerVisible = false;
			this.$emit("close");
		}
	}
}
</script>
