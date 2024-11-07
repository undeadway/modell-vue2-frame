<template>
	<div class="mv2-empty-box" :style="style">
		<div class="mv2-empty-img-box" :style="imageStyle"></div>
		<div class="mv2-empty-text-box">{{ text }}</div>
	</div>
</template>
<script>
import utils from "./../../utils/utils";
import defaultImage from "./../../assets/icons/empty-box.svg";

export default {
	name: "Mv2Empty",
	props: {
		text: {
			type: String,
			default: "暂无数据"
		},
		image: {
			type: String,
			default: defaultImage
		},
		size: {
			type: Number,
			default: 400
		},
		styles: {
			type: Object,
			default: {}
		}
	},
	data () {
		return {
			style: "",
			imageStyle: ""
		}
	},
	created () {
		this.setImageStyles()
		this.setGlobalStyles();
	},
	methods: {
		setGlobalStyles () {
			const styles = Object.assign(this.styles, {
				width: `${this.size + 20}px`,
				height: `${this.size + 50}px`,
			});
			this.style = utils.initStyles(styles);
		},
		setImageStyles () {
			const imageStyle = {
				"background-image": `url(${this.image});`
			};

			this.imageStyle = utils.initStyles(imageStyle);
			}
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
	}
	.mv2-empty-text-box {
		margin-top: 10px;
		font-weight: bold;
	}
}
</style>
