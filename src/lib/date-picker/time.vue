<template>
	<div>
		<div>
			<div class="arrow-icon-box">
				<div class="arrow-up-icon">&lt;</div>
			</div>
			<div></div>
			<div></div>
			<div></div>
			<div class="arrow-icon-box">
				<div class="arrow-down-icon">&lt;</div>
			</div>
		</div>
		<div>
			<div class="arrow-icon-box">
				<div class="arrow-up-icon">&lt;</div>
			</div>
			<div></div>
			<div></div>
			<div></div>
			<div class="arrow-icon-box">
				<div class="arrow-down-icon">&lt;</div>
			</div>
		</div>
		<div>
			<div class="arrow-icon-box">
				<div class="arrow-up-icon">&lt;</div>
			</div>
			<div></div>
			<div></div>
			<div></div>
			<div class="arrow-icon-box">
				<div class="arrow-down-icon">&lt;</div>
			</div>
		</div>
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
	data () {
		return {
			hour: 0,
			minuter: 0,
			second: 0
		}
	}
}
</script>
<style lang="scss" scoped>
.arrow-icon-box {
	width: 20px;
	height: 20px;
	padding: 5px;
	font-size: 10px;

	.arrow-up-icon {
		transform: rotate(270deg);
	}
	.arrow-down-icon {
		transform: rotate(90deg);
	}
}
</style>