<template>
	<div class="mv2-month-select-box">
		<div v-for="index in 12" :key="index" @click="onSelect(index)">{{ monthList[index - 1] }}</div>
	</div>
</template>
<script>
export default {
	data () {
		return {
			monthList: [ "一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月" ]
		}
	},
	methods: {
		onSelect (month) {
			if (month < 10) {
				month = `0${month}`;
			}
			const dt = new Date();
			const year = dt.getFullYear();
			this.$emit("change", `${year}-${month}`);
			this.$emit("close");
		}
	}
}
</script>
<style lang="scss" scoped>
.mv2-month-select-box {
	width: 276px;
    padding: 5px;
	>div {
		width: 60px;
		padding: 6px 0px;
		text-align: center;
		margin: 4px;
		// background: #CCCCCC;
		display: inline-block;
		&:hover {
			color: #3271AE;
			font-weight: bold;
			cursor: pointer;
		}
	}
}
</style>