<template>
	<div>
		<div class="mv2-mask-layer-box" :style="`z-index: ${zIndex};`" @click="cancelEvent"></div><!-- 遮罩层 -->
		<!-- 主体 -->
		<dialog-body :title="title" :styles="styles" :title-style="titleStyle" @close="cancelEvent">
			<div>{{ text }}</div>
			<dialog-foot-two-btns :style="footStyle" :ok-text="okText" :ok-event="okEvent"
				:cancel-text="cancelText" :cancel-event="cancelEvent"
			></dialog-foot-two-btns>
		</dialog-body>
	</div>
</template>
<script>
import DialogFootTwoBtns from './../../components/dialog-foot-two-btns';
import MsgDialogMixin from './msg-dialog-mixin';

export default {
	name: "Mv2Confirm",
	mixins: [ MsgDialogMixin ],
	components: {
		DialogFootTwoBtns
	}
}
</script>