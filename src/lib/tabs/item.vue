<template>
	<div class="mdl-tabs-item" v-if="activeName === name">
		<slot></slot>
	</div>
</template>
<script>
export default {
	name: "MdlTabsItem",
	inject: [ "tabsGroup" ],
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
.mdl-tabs-item {
	height: 100%;
	width: 100%;
};
</style>