<template>
	<div>
		<tree-node v-for="(item, index) in data" :value="item.value" :key="index" :index="index" :children="item.children" :depth="0" />
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
}
</script>