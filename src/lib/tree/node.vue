<template>
	<div>
		<div>{{ value }}</div>
		<node-tree v-for="(item, index) in children" :value="item.value" :key="index" :index="index" :children="item.children" />
	</div>
</template>
<script>
export default {
	name: "Mv2TreeNode",
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
		}
	}
}
</script>