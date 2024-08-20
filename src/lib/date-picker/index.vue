<template>
	<div class="mv2-date-picker-box" @click.stop="">
		<select-value :label="value" @click="onClick" :styles="styles" />
		<div v-show="visible" class="mv2-date-picker-select-box">
			<div v-if="type === 'time'">
				<mv2-time @change="onChangeTime" />
			</div>
		</div>
	</div>
</template>
<script>
import Mv2Time from "./time";
import SelectValue from "../../components/select-value";
export default {
	name: "Mv2DatePicker",
	components: {
		Mv2Time,
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
	}
}

</style>