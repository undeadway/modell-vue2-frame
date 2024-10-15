<template>
	<div :class="`mv2-alert-box mv2-text-align__${align} mv2-effect__${effect} 
	mv2-effect__${type}-${effect} mv2-border_${type}
	`"><slot></slot></div>
</template>
<script>
export default {
	name: "Mv2Alert",
	props: {
		effect: {
			type: String,
			default: "light" // light、dark
		},
		type: {
			type: String,
			default: "info" // info、success、warning、danger、text
		},
		align: {
			type: String,
			default: "left" // left、center、right、justify
		}
	}
}
</script>
<style lang="scss" scoped>
.mv2-alert-box {
	padding:5px;
	margin: 5px 10px;
	font-size: 18px;
	border-radius: 10px;
	border-width: 1px;
	border-style: solid;
}
</style>
