<template>
	<div :class="`mv2-tabs-group mv2-tabs-group-positon-${tabPosition}`">
		<div class="mv2-tab-label-list" :style="groupStyle">
			<div :class="activeName === tab.name ? 'active-name-box' : ''"
				v-for="(tab,index) in tabs" :key="index" @click="onTabClick(tab.name)">{{ tab.label }}
			</div>
		</div>
		<div>
			<slot></slot>
		</div>
	</div>
</template>
<script>
import StyleMixin from "./../../mixins/style-mixin";
import utils from "./../../utils/utils"

export default {
	name: "Mv2TabsGroup",
	mixins: [ StyleMixin ],
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
		activeName: String
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
			tabs: [],
			groupStyle: ""
		}
	},
	created () {
		this.$on("tabs-item-created", this.appendTabList);
		// TODO 不知道为什么，group 和 item 的 style 会打架，所以这里把 group 的 style 单独拎出来
		const tmp = Object.assign({}, this.styles);
		if (this.tabPosition === "top") {
			tmp.height = tmp.height || "31px;"
		}
		this.groupStyle = utils.initStyles(tmp);
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
.mv2-tabs-group {
	.mv2-tab-label-list {
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
.mv2-tabs-group-positon-left {
	>div {
		height: 100%;
		display: inline-block;
		vertical-align: top;
	}
}
.mv2-tabs-group-positon-top {
	.mv2-tab-label-list {
		>div {
			display: inline-block;
			vertical-align: top;
		}
	}
}
</style>
