<template>
	<div class="mv2-buttons-box">
		<div :style="style" class="mv2-buttons">
			<mv2-button ref="cancelBtn" class="mv2-buttons-cancel-btn" @click="cancelEvent">{{ cancelText }}</mv2-button>
			<mv2-button ref="okBtn" class="mv2-buttons-ok-btn" @click="okEvent">{{ okText }}</mv2-button>
		</div>
	</div>
</template>
<script>
import Mv2Button from "./../button/index";

import StyleMixin from "./../../mixins/style-mixin";

export default {
	name: "Mv2OkCancelButtons",
	mixins: [ StyleMixin ],
	components: {
		Mv2Button
	},
	props: {
		cancelText: {
			type: String,
			default: "放弃"
		},
		okText: {
			type: String,
			default: "确定"
		},
		okEvent: {
			type: Function,
			default: null
		},
		cancelEvent: {
			type: Function,
			default: null
		}
	}
}
</script>
<style lang="scss" scoped>
.mv2-buttons-ok-btn, .mv2-buttons-cancel-btn {
	max-width: 30%;
	min-width: 50px;
	margin: auto 5px;
}

.mv2-buttons-cancel-btn {
	color: #003D74 !important;
	background: #CCCCCC !important;
	border: 1px solid #666666 !important;
}
</style>