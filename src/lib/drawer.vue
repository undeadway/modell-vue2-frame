<template>
    <div v-if="drawerVisible">
		<dialog-body :title="title" :style="style" :z-index="zIndex" :left="modalLeft" :top="modalTop" @close="onClose">
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
			drawerVisible: false,
			left: undefined,
			top: undefined
		}
	},
	watch: {
		"visible": function(v1, v2) {
			this.drawerVisible = v1;
		}
	},
	created () {
		this.drawerVisible = this.visible;
		this.styles[this.position] = "0px";
		switch (this.position) {
			case "left":
			case "right":
				this.styles.top = "0px";
				this.styles.height = "100%";
				break;
			case "top":
			case "bottom":
				this.styles.left = "0px";
				this.styles.width = "100%";
				break;
		}

		console.log(this.styles);
	},
	methods: {
		onClose () {
			this.drawerVisible = false;
			this.$emit("close");
		}
	}
}
</script>