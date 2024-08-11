<template>
	<div :class="`mv2-tag-box mv2-effect__${effect} 
	mv2-effect__${type}-${effect} mv2-border_${type}`"><slot></slot></div>
</template>
<script>
export default {
	name: "Mv2Tag",
	props: {
		type: {
			type: String,
			default: "info" // info success danger warning
		},
		effect:{
			type: String,
			default: "light"
		}
	}
}
</script>
<style lang="scss" scoped>
.mv2-tag-box {
	position: relative;
	padding: 4px 10px;
	margin-right: 10px;
	margin-bottom: 5px;
	font-size: 12px;
	display: inline-block;
	vertical-align: middle;
}
</style>