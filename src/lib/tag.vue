<template>
	<div :class="`mdl-tag-box mdl-effect__${effect} 
	mdl-effect__${type}-${effect} mdl_border_${type}`"><slot></slot></div>
</template>
<script>
export default {
	name: "MdlTag",
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
.mdl-tag-box {
	position: relative;
	padding: 4px 10px;
	margin-right: 10px;
	margin-bottom: 5px;
	font-size: 12px;
	display: inline-block;
	vertical-align: middle;
}
</style>