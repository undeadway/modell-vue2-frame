<template>
	<div>
		<div class="mv2-datetime-picker-box mv2-month-select-box">
			<div v-for="index in 12" @click="onSelect(index)">{{ monthList[index - 1] }}</div>
		</div>
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
		}
	}
}
</script>
<style lang="scss" scoped>
.mv2-month-select-box {
	width: 240px;
    padding: 10px;
	>div {
		width: 60px;
		padding: 6px 0px;
		text-align: center;
		margin: 4px;
		background: #CCCCCC;
	}
}
</style>