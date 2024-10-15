<template>
	<div class="mv2-date-picker-box" @click.stop="">
		<select-value :label="value" @click="onClick" :styles="styles" />
		<div v-show="visible" class="mv2-date-picker-select-box">
			<div v-if="type === 'time'">
				<mv2-time @change="onChangeTime" @close="hidePickBox" />
			</div>
			<div v-if="type === 'month'">
				<mv2-month @change="onChangeMonth" @close="hidePickBox" />
			</div>
		</div>
	</div>
</template>
<script>
import Mv2Time from "./time";
import Mv2Month from "./month";

import SelectValue from ".././components/select-value";
export default {
	name: "Mv2DatetimePicker",
	components: {
		Mv2Time,
		Mv2Month,
		SelectValue
	},
	props: {
		type: String,
		default: "date" // date、datetime、time、
	},
	data () {
		return {
			value: "",
			visible: false,
			styles: {
				width: "200px"
			}
		}
	},
	mounted() {
		// 监听点击事件，用于关闭下拉框
		window.addEventListener('click', this.hidePickBox);
	},
	beforeUnmount() {
		// 移除点击事件监听器
		window.removeEventListener('click', this.hidePickBox);
	},
	methods: {
		onClick () {
			this.hidePickBox();
			this.visible = !this.visible;
		},
		hidePickBox () {
			this.visible = false;
		},
		onChangeTime (hour, minuter, second) {
			if (hour < 10) {
				hour = `0${hour}`;
			}
			if (minuter < 10) {
				minuter = `0${minuter}`;
			}
			if (second < 10) {
				second = `0${second}`;
			}
			this.value = `${hour}:${minuter}:${second}`;
		},
		onChangeMonth (value) {
			this.value = value;
		}
	}
}
</script>
<style lang="scss" scoped>
.mv2-date-picker-box {
	position: relative;
	.mv2-date-picker-select-box {
		position: absolute;
		z-index: 11111;
		margin-top: 2px;
		border: 1px solid #CCCCCC;
		border-radius: 6px;
		background: #F7F7F7;
	}
}
</style>
