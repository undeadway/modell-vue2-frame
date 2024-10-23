<template>
	<div>
		<div class="mv2-mask-layer-box" :style="`z-index: ${zIndex};`" @click="onClose"></div><!-- 遮罩层 -->
		<!-- 主体 -->
		<dialog-body :title="title" :styles="styles" :title-style="titleStyle" @close="onClose">
			<mv2-input v-model="value" ref="input"></mv2-input>
			<dialog-foot-two-btns :style="footStyle" :ok-text="okText" :ok-event="onOk"
				:cancel-text="cancelText" :cancel-event="cancelEvent"
			></dialog-foot-two-btns>
		</dialog-body>
	</div>
</template>
<script>
import DialogFootTwoBtns from './../../components/dialog-foot-two-btns';
import MesgDialogMixin from './msg-dialog-mixin';
import Mv2Input from "./../input/index";

export default {
	name: "Mv2Prompt",
	mixins: [ MesgDialogMixin ],
	components: {
		Mv2Input,
		DialogFootTwoBtns
	},
	props: {
		defaultValue: {
			type: String,
			default: ""
		}
	},
	data () {
		return {
			value: ""
		}
	},
	mounted () {
		this.value = this.defaultValue;
	},
	methods: {
		onOk () {
			this.value = this.$refs.input.getValue();
			this.okEvent(this.value);
		}
	}
}
</script>