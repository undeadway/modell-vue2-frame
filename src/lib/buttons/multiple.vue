
<template>
	<div class="mv2-buttons-box">
		<div class="mv2-buttons">
			<mv2-button v-for="(btn, index) in list" :style="style" class="multiple-btn" :ref="`multipleBtn${index}`" :key="index"
				@click="btn.event()">{{ btn.text || `按钮${index}` }}</mv2-button>
		</div>
	</div>
</template>
<script>
import Mv2Button from "./../button/index";

import StyleMixin from "./../../mixins/style-mixin";

export default {
	name: "Mv2MultipleButtons",
	mixins: [ StyleMixin ],
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