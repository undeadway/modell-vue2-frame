<template>
	<div>
		<tree-node v-for="(item, index) in data":key="index" :index="index"
			:data="item" :children="item.children" :depth="0" @click="data => onClickVal(data)" />
	</div>
</template>
<script>
import TreeNode from "./node";
export default {
	name: "Mv2Tree",
	components: {
		TreeNode
	},
	props: {
		data: {
			type: Array,
			default: []
		}
	},
	methods: {
		onClickVal (data) {
			this.$emit("node-click", data);
		}
	}
}
</script>
