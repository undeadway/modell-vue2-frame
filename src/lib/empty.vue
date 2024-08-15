<template>
	<div class="mv2-empty-box" :style="style">
		<div class="mv2-empty-img-box"></div>
		<div class="mv2-empty-text-box">{{ text }}</div>
	</div>
</template>
<script>
import StyleMixin from '../mixins/style-mixin';

export default {
	name: "Mv2Empty",
	mixins: [ StyleMixin ],
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
	created () {
		this.styles.width = this.styles.width || "420px";
		this.styles.height = this.styles.height || "450px";
		this.initStyle();
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