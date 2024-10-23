<template>
	<div>
		<div class="mv2-mask-layer-box" :style="`z-index: ${zIndex};`" @click="onClose"></div><!-- 遮罩层 -->
		<!-- 主体 -->
		<dialog-body :title="title" :styles="styles" :title-style="titleStyle" @close="onClose">
			<div>{{ text }}</div>
			<div :style="footStyle" class="mv2-dialog-foot-box">
				<mv2-button @click="okEvent" >{{ okText }}</mv2-button>
			</div>
		</dialog-body>
	</div>
</template>
<script>
import MsgDialogMixin from './msg-dialog-mixin';
import Mv2Button from "./../button/index";

export default {
	name: "Mv2MConfirm",
	mixins: [ MsgDialogMixin ],
	components: {
		Mv2Button
	}
}
</script>