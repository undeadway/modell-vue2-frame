<template>
	<div>
		<div class="mv2-mask-layer-box" :style="`z-index: ${zIndex};`" @click="okEvent"></div><!-- 遮罩层 -->
		<!-- 主体 -->
		<dialog-body :title="title" :styles="styles" :title-style="titleStyle" @close="okEvent">
			<div>{{ text }}</div>
			<div class="mv2-dialog-foot-box">
				<mv2-ok-cancel-buttons :styles="footStyle" :ok-text="okText" :ok-event="okEvent" :cancel-text="cancelText" :cancel-event="cancelEvent" />
			</div>
		</dialog-body>
	</div>
</template>
<script>
import Mv2OkCancelButtons from './../buttons/ok-cancel';
import MsgDialogMixin from './msg-dialog-mixin';

export default {
	name: "Mv2Confirm",
	mixins: [ MsgDialogMixin ],
	components: {
		Mv2OkCancelButtons
	},
	created () {
		console.log(this.styles);
	}
}
</script>