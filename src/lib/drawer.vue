<template>
    <div v-if="drawerVisible">
		<dialog-body :title="title" :style="style" @close="onClose">
			<slot></slot>
		</dialog-body>
	</div>
</template>
<script>
import StyleMixin from '../mixins/style-mixin';
import DialogBody from '../components/dialog-body';

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
		}
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
		}
	},
	destroyed() {
		if (this.appendToBody && this.$el && this.$el.parentNode) {
			this.$el.parentNode.removeChild(this.$el);
		}
	},
	created () {
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

		this.styles = styles;

		this.initStyle();
	},
	methods: {
		onClose () {
			this.drawerVisible = false;
			this.$emit("close");
		}
	}
}
</script>