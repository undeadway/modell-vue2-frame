<template>
	<div class="mv2-modal-box" :style="`${style}`">
		<div class="mv2-modal-title-box">{{title}}</div>
		<div class="mv2-close-box mv2-modal-close-box" @click="onClose">
			<close-box />
		</div>
		<div class="mv2-modal-content-box">
			<slot></slot>
		</div>
	</div>
</template>
<script>
import CloseBox from "./close-box";
export default {
	components: {
		CloseBox
	},
	props: {
		style: {
			type: String,
			default: ""
		}
	},
	methods: {
		onClose () {
			this.$emit("close");
		}
	}
}
</script>
<style lang="scss" scoped>
.mv2-modal-box {
	position: absolute;
	background: $c_bgcolor;
	border: 1px solid $c_border;
	padding-bottom: 20px;
	.mv2-modal-title-box {
		margin: 20px;
		font-size: 20px;
		font-weight: bold;
	}
	.mv2-modal-content-box {
		margin: 10px 20px;
	}
	.mv2-modal-close-box {
		position: absolute;
		right: 10px;
		top: 0px;
	}
}
</style>