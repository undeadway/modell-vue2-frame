<template>
    <transition>
		<dialog-body :title="title" :style="style" :z-index="zIndex" :left="modalLeft" :top="modalTop" @close="onClose">
			<slot></slot>
		</dialog-body>
	</transition>
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
			left: undefined,
			top: undefined
		}
	},
	watch: {
		"visible": function(v1, v2) {
			this.modalVisible = v1;
		}
	},
	created () {
		this.modalVisible = this.visible;
		switch (this.position) {
			case "left":
				this.styles.height = "100%";
				break;
			case "right":
				this.left = document.body.scrollWidth - parseInt(this.styles.width);
				this.left = `${this.left}px`;
				this.styles.height = "100%";
				break;
			case "top":
				this.styles.width = "100%";
				break;
			case "bottom":
				this.left = document.body.scrollWidth - parseInt(this.styles.width);
				this.top = `${this.left}px`;
				this.styles.width = "100%";
				break;
		}
	},
	methods: {
		onClose () {
			this.modalVisible = false;
			this.$emit("close");
		}
	}
}
</script>