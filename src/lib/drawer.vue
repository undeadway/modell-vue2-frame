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
		this.styles[this.position] = "0px";
		switch (this.position) {
			case "left":
			case "right":
				this.styles.height = "100%";
				break;
			case "top":
			case "bottom":
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