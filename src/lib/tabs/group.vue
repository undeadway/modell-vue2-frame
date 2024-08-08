<template>
	<div :class="`mdl-tabs-group mdl-tabs-group-positon-${tabPosition}`">
		<div class="mdl-tab-label-list" :style="`width:${width}px`">
			<div :class="activeName === tab.name ? 'active-name-box' : ''" v-for="tab in tabs" @click="onTabClick(tab.name)">{{ tab.label }}</div>
		</div>
		<div>
			<slot></slot>
		</div>
	</div>
</template>
<script>
export default {
	name: "MdlTabsGroup",
	provide() {
		return {
			tabsGroup: this
		};
    },
	props: {
		tabPosition: {
			type: String,
			default: "left"
		},
		activeName: String,
		value: String,
		width: {
			type: String,
			default: ""
		}
	},
	watch: {
		activeName: function (v1) {
			for (const tab of this.tabs) {
				tab.updateActiveName(v1);
			}
		}
	},
	data () {
		return {
			tabs: []
		}
	},
	created () {
		this.$on("tabs-item-created", this.appendTabList);
	},
	methods: {
		appendTabList (tab) {
			this.tabs.push(tab);
			this.$forceUpdate();
		},
		onTabClick (name) {
			this.$emit("tab-click", name);
		}
	}
}
</script>
<style lang="scss" scoped>
.mdl-tabs-group {
	.mdl-tab-label-list {
		>div {
			&:hover {
				background: #5dbeec;
			}
			cursor: pointer;
			padding: 5px 20px;
		}

		.active-name-box {
			background: #00acfe;
		}

		background: #D5EBE1;
	}
}

.mdl-tabs-group-positon-left {
	>div {
		height: 100%;
		display: inline-block;
		vertical-align: top;
	}
}

</style>