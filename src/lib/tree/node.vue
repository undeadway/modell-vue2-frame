<template>
	<div>
		<div @click="onClick" class="mv2-tree-value-box" :style="`padding-left:${20 + 15 * depth}px;`">
			<div v-if="children.length === 0"><div>&#8203;</div></div>
			<div v-else><div :class="`mv2-tree-value-icon ${visible ? 'mv2-tree-value-is-open' : 'mv2-tree-value-is-closed'}`">▶</div></div>
			<div>{{ value }}</div>
		</div>
		<div class="mv2-tree-children-box" v-show="visible">
			<mv2-tree-node v-for="(item, index) in children" :value="item.value" :key="index" :index="index" :children="item.children" :depth="depth + 1" />
		</div>
	</div>
</template>
<script>
export default {
	name: "Mv2TreeNode",
	componentName: "Mv2TreeNode",
	props: {
		value: {
			type: String,
			default: ""
		},
		index: {
			type: Number,
			default: 0
		},
		children: {
			type: Array,
			default: []
		},
		depth: {
			type: Number,
			default: 0
		}
	},
	data () {
		return {
			visible: false
		}
	},
	methods: {
		onClick () {
			if (this.children.length > 0) {
				this.visible = !this.visible;
			}
		}
	}
}
</script>
<style lang="scss" scoped>
.mv2-tree-value-box {
	cursor: pointer;
	padding: 4px;
	&:hover {
		background-color: #f0f0f0;
	}
	>div {
		display: inline-block;
		vertical-align: middle;
		&:first-child {
			font-size: 12px;
			width: 20px;
			>div {
				padding: 4px;
			}
			.mv2-tree-value-icon {
				transition: transform .3s ease-in-out;
			}
		}
	}
}
.mv2-tree-value-is-open {
	transform: rotate(90deg);
}

.mv2-tree-value-is-closed {
	transform: rotate(0deg);
}
</style>