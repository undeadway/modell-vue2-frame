<template>
	<div>
		<div class="mv2-tree-value-box" :style="`padding-left:${20 + 15 * depth}px;`">
			<div v-if="children.length === 0"><div></div></div>
			<div v-else @click="onClickIcon" ><div :class="`mv2-tree-value-icon ${visible ? 'mv2-tree-value-is-open' : 'mv2-tree-value-is-closed'}`">&gt;</div></div>
			<div @click="onClickVal(data)">{{ data.value }}</div>
		</div>
		<div class="mv2-tree-children-box" v-show="visible">
			<mv2-tree-node v-for="(item, index) in children" :data="data" :key="index" :index="index" :children="item.children" :depth="depth + 1" @click="data => onClickVal(data)" />
		</div>
	</div>
</template>
<script>
export default {
	name: "Mv2TreeNode",
	componentName: "Mv2TreeNode",
	props: {
		data: {
			type: Object,
			default: {}
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
		onClickIcon () {
			if (this.children.length > 0) {
				this.visible = !this.visible;
			}
		},
		onClickVal (data) {
			this.$emit("click", data);
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
			font-size: 10px;
			width: 20px;
			>div {
				padding: 5px;
			}
			.mv2-tree-value-icon {
				font-weight: bold;
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