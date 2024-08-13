<template>
	<div class="mv2-tabs-item" v-if="activeName === name" :style="style">
		<slot></slot>
	</div>
</template>
<script>
import StyleMixin from "./../../mixins/style-mixin";

export default {
	name: "Mv2TabsItem",
	inject: [ "tabsGroup" ],
	mixins: [ StyleMixin ],
	props: {
		label: {
			type: String,
			default: ""
		},
		name: {
			type: String,
			default: ""
		},
		style: {
			type: String,
			default: ""
		}
	},
	data () {
		return {

		}
	},
	created () {
		this.activeName = this.tabsGroup.activeName;
		const object = {
			name: this.name, label: this.label,
			updateActiveName: this.updateActiveName
		};
		this.$parent.$emit("tabs-item-created", object);
	},
	methods: {
		onClick () {
			console.log(this.name);
			if (this.name) {
				this.$parent.$emit("tab-click", this.name);
			}
		},
		updateActiveName (activeName) {
			this.activeName = activeName;
		}
	}
}
</script>
<style lang="scss" scoped>
.mv2-tabs-item {
	height: 100%;
	width: 100%;
};
</style>