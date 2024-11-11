<template>
	<div>
		<div class="mv2-mask-layer-box" :style="`z-index: ${zIndex};`" @click="onClose"></div><!-- 遮罩层 -->
		<!-- 主体 -->
		<dialog-body :title="title" :styles="styles" :title-style="titleStyle" @close="onClose">
			<mv2-input v-model="value" ref="input"></mv2-input>
			<div class="mv2-dialog-foot-box">
				<mv2-ok-cancel-buttons :styles="footStyle" :ok-text="okText" :ok-event="onOk"
										:cancel-text="cancelText" :cancel-event="cancelEvent" />
			</div>
		</dialog-body>
	</div>
</template>
<script>
import Mv2OkCancelButtons from './../buttons/ok-cancel';
import MesgDialogMixin from './msg-dialog-mixin';
import Mv2Input from "./../input/index";

export default {
	name: "Mv2Prompt",
	mixins: [ MesgDialogMixin ],
	components: {
		Mv2Input,
		Mv2OkCancelButtons
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