<template>
	<div class="mv2-time-picker-box">
		<div>
			<div>
				<div class="arrow-icon-box">
					<div class="arrow-up-icon" @click="onSubHour">&lt;</div>
				</div>
				<div>{{ ((hour - 1) === (-1)) ? 23 : hour - 1 }}</div>
				<div class="selected-time-box">{{ hour }}</div>
				<div>{{ ((hour + 1) === 24) ? 0: hour + 1 }}</div>
				<div class="arrow-icon-box">
					<div class="arrow-down-icon" @click="onAddHour">&lt;</div>
				</div>
			</div>
			<div>
				<div class="arrow-icon-box">
					<div class="arrow-up-icon" @click="onSubMinuter">&lt;</div>
				</div>
				<div>{{ ((minuter - 1) === (-1)) ? 59 : minuter - 1 }}</div>
				<div class="selected-time-box">{{ minuter }}</div>
				<div>{{ ((minuter + 1) === 60) ? 0: minuter + 1 }}</div>
				<div class="arrow-icon-box">
					<div class="arrow-down-icon" @click="onAddMinuter">&lt;</div>
				</div>
			</div>
			<div>
				<div class="arrow-icon-box">
					<div class="arrow-up-icon" @click="onSubSecond">&lt;</div>
				</div>
				<div>{{ ((second - 1) === (-1)) ? 59 : second - 1 }}</div>
				<div class="selected-time-box">{{ second }}</div>
				<div>{{ ((second + 1) === 60) ? 0: second + 1 }}</div>
				<div class="arrow-icon-box">
					<div class="arrow-down-icon" @click="onAddSecond">&lt;</div>
				</div>
			</div>
		</div>
		<mv2-button type="button" @click="onClose">确定</mv2-button>
	</div>

</template>
<script>
export default {
	props: {
		start: {
			type: String,
			default: ""
		},
		end: {
			type: String,
			default: ""
		}
	},
	watch: {
		second: function(v1, v2) {
			// 向后
			if (v1 === 0 && v2 === 59) {
				this.minuter++;
			}
			// 向前
			if (v1 === 59 && v2 === 0) {
				this.minuter--;
			}
			this.onChange();
		},
		minuter: function (v1, v2) {
			// 向后
			if (v1 === 0 && v2 === 59) {
				this.hour++;
			}
			// 向前
			if (v1 === 59 && v2 === 0) {
				this.hour--;
			}
			this.onChange();
		},
		hour: function () {
			this.onChange();
		}
	},
	data () {
		return {
			hour: 0,
			minuter: 0,
			second: 0
		}
	},
	created () {
		const dt = new Date();
		this.hour = dt.getHours();
		this.minuter = dt.getMinutes();
		this.second = dt.getSeconds();
	},
	methods: {
		onSubHour () {
			this.hour--;
			if (this.hour < 0) {
				this.hour = 23;
			}
		},
		onAddHour () {
			this.hour++;
			if (this.hour > 23) {
				this.hour = 0;
			}
		},
		onSubMinuter () {
			this.minuter--;
			if (this.minuter < 0) {
				this.minuter = 59;
			}
		},
		onAddMinuter () {
			this.minuter++;
			if (this.minuter > 59) {
				this.minuter = 0;
			}
		},
		onSubSecond () {
			this.second--;
			if (this.second < 0) {
				this.second = 59;
			}
		},
		onAddSecond () {
			this.second++;
			if (this.second > 59) {
				this.second = 0;
			}
		},
		onSubmit () {
			this.emit();
			this.close();
		},
		onClose () {
			this.$emit("close");
		},
		onChange () {
			this.$emit("change", this.hour, this.minuter, this.second);
		}
	}
}
</script>
<style lang="scss" scoped>
.mv2-time-picker-box {
	padding: 10px;
	width: 167px;
	border: 1px solid #CCCCCC;
	border-radius: 6px;
	background: #F7F7F7;
	>div {
		>div {
			display: inline-block;
			font-size: 10px;
			text-align: center;
			margin-right: 1px;
			&:last-child {
				margin-right: 0px;
			}
			>div {
				width: 25px;
				height: 20px;
				padding: 9px 15px 5px 15px;
				background: #F7F7F7;
				margin-bottom: 1px;
			}
		}
	}

	.arrow-icon-box {
		cursor: pointer;
		font-weight: bold;
		.arrow-up-icon {
			transform: rotate(90deg);
			margin-left: 2px;
		}
		.arrow-down-icon {
			transform: rotate(270deg);
			margin-left: -3.4px;
		}
		&:hover {
			color: #3271AE;
		}
	}
	.selected-time-box {
		background: #EEEEEE;
	}
}

</style>