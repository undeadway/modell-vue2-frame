<template>
	<div class="mv2-empty-box" :style="style">
		<div class="mv2-empty-img-box"></div>
		<div class="mv2-empty-text-box">{{ text }}</div>
	</div>
</template>
<script>
import utils from "./../utils/utils";

export default {
	name: "Mv2Empty",
	props: {
		text: {
			type: String,
			default: "暂无数据"
		},
		size: {
			type: Number,
			default: 400
		}
	},
	data () {
		return {
			style: ""
		}
	},
	created () {
		const styles = {
			width: `${this.size + 20}px`,
			height: `${this.size + 50}px`,
		};

		this.style = utils.initStyles(styles);
	}
}
</script>
<style lang="scss" scoped>
.mv2-empty-box {
	margin: auto;
	padding:10px;
	text-align: center;
	.mv2-empty-img-box {
		width: 100%;
		height: calc(100% - 30px);
		background-position-x: center;
		background-position-y: center;
		background-repeat: no-repeat;
		background-size: 100%;
		background-image: url(../assets/icons/empty-box.svg);
	}

	.mv2-empty-text-box {
		margin-top: 10px;
		font-weight: bold;
	}
}

</style>