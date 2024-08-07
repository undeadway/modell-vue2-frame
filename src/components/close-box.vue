<template>
	<div class="mdl-close-box" @click="onClick">×</div>
</template>
<script>
export default {
	methods: {
		onClick () {
			this.$emit("close");
		}
	}
}
</script>
<style lang="scss" scoped>
.mdl-close-box {
	font-size: 30px;
	color: $c_dark-gray;
	cursor: pointer;
}
</style>