<template>
	<div>
		<div class="mv2-mask-layer-box" :style="`z-index: ${zIndex};`" @click="onClose"></div><!-- 遮罩层 -->
		<!-- 主体 -->
		<dialog-body :title="title" :styles="styles" :title-style="titleStyle" @close="onClose">
			<div>{{ text }}</div>
			<dialog-foot-two-btns :style="footStyles" :ok-text="okText" :ok-event="okEvent"
				:cancel-text="cancelText" :cancel-event="cancelEvent"
			></dialog-foot-two-btns>
		</dialog-body>
	</div>
</template>
<script>
import DialogBody from './../../components/dialog-body';
import DialogFootTwoBtns from './../../components/dialog-foot-two-btns';
import { initStyles } from "./../../utils/utils";

export default {
	name: "Mv2MConfirm",
	components: {
		DialogBody,
		DialogFootTwoBtns
	},
	data () {
		return {
			title: {
				type: String,
				default: ""
			},
			text: {
				type: String,
				default: ""
			},
			cancelText: {
				type: String,
				default: ""
			},
			cancelEvent: {
				type: Function,
				default: null
			},
			okText: {
				type: String,
				default: ""
			},
			okEvent: {
				type: Function,
				default: null
			},
			titleStyle: {
				type: String,
				default: ""
			},
			styles: {
				type: Object,
				default: {}
			},
			footStyle: {
				type: Object,
				default: {}
			},
			onClose: {
				type: Function,
				default: null
			}
		}
	},
	data () {
		return {
			zIndex: 1010,
			footStyles: ""
		}
	},
	mounted () {
		this.initStyle();
	},
	methods: {
		initStyle () {
			const footStyles = Object.assign({

			}, this.footStyle);
			this.footStyles = initStyles(footStyles);
		}
	}
}
</script>