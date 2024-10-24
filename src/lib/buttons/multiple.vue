
<template>
	<div class="mv2-buttons-box">
		<div class="mv2-buttons">
			<mv2-button v-for="(btn, index) in list" :style="style" class="multiple-btn" :ref="`multipleBtn${index}`" :key="index"
				@click="onClick(btn.event)">{{ btn.text || `按钮${index + 1}` }}</mv2-button>
		</div>
	</div>
</template>
<script>
import Mv2Button from "./../button/index";

import StyleMixin from "./../../mixins/style-mixin";

export default {
	name: "Mv2MultipleButtons",
	mixins: [ StyleMixin ],
	inject: [ "modalParent" ],
	components: {
		Mv2Button
	},
	props: {
		list: {
			type: Array,
			default: []
		}
	},
	created () {
		this.styles.width = `calc(100% / ${this.list.length} - 10px);`;
	},
	methods: {
		onClick(event) {
			// TODO 这里的 parent 调用我目前能想到的只有在 modal 中加底部按钮，如果之后有其他形式，那到时候再加
			let that = this.modalParent;
			if (!that) {
				that = this.$parent;
			}
			
			event.call(that);
		}
	}
}
</script>
<style lang="scss" scoped>
.mv2-buttons {
	>button {
		display: inline-block;
	}
}
</style>