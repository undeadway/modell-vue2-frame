<template>
	<mv2-modal ref="modal" :visible="visible" :title="title" :styles="styles" @close-modal="onCancelEvent">
		<confirm :message="message" :length="length" @cancel="onCancelEvent" @ok="onOkEvent" />
	</mv2-modal>
</template>
<script>
import Mv2Modal from "./../index";
import confirm from "./confirm";

export default {
	name: "Mv2DangerEventConfirm",
	components: {
		Mv2Modal,
		confirm
	},
	props: {
		title: {
			type: String,
			default: "危险操作确认"
		},
		visible: {
			type: Boolean,
			default: false
		},
		styles: {
			type: Object,
			default: {}
		},
		message: {
			type: String,
			default: "继续当前操作"
		},
		length: {
			type: Number,
			default: 10
		}
	},
	watch: {
		visible: function (v1) {
			if (!this.visible) {
				delete this.$refs.modal;
			}
		}
	},
	methods: {
		onCancelEvent () {
			this.visible = false;
			this.$emit("cancel");
		},
		onOkEvent () {
			this.$emit("ok");
		}
	}
}
</script>