<template>
	<div :style="style" class="mv2-select-box">
		<div class="mv2-select-value-box" @click="showOptionList">
			{{ value }}
		</div>
		<div class="mv2-select-options-box" :style="`display:${display}`">
			<div v-for="(option, index) in options" :key="index" @click="onClick(index)">{{ option.label }}</div>
		</div>
	</div>
</template>
<script>
import StyleMixin from "./../mixins/style-mixin";

export default {
	mixins: [ StyleMixin ],
	name: "Mv2Select",
	props: {
		options: {
			type: Array,
			default: []
		},
	},
	watch: {
		options: function (v1) {
			this.init();
		},
		value: function (v1) {
			this.$emit("change", v1);
		}
	},
	data () {
		return {
			value: "",
			label: "",
			display: "none"
		}
	},
	created () {
		this.init();
	},
	methods: {
		init () {
			console.log(this.options);
		},
		onClick (index) {
			const option = this.options[index];
			this.value = option.value;
			this.label = option.label;
			this.display = "none";
		},
		showOptionList () {
			this.display = "block";
		}
	}
}
</script>
<style lang="scss" scoped>
.mv2-select-box {
	position: relative;

	.mv2-select-value-box {
		border: 1px solid #CCCCCC;
		height: 30px;
		line-height: 30px;
		background: #FFFFFF;
		padding: 0px 6px;
		cursor: pointer;
	}

	.mv2-select-options-box {
		position: absolute;
		margin-top: -1px;
		border: 1px solid #CCCCCC;
		>div {
			padding: 5px 10px;
			cursor: pointer;
			background: #FFFFFF;
			&:hover {
				background: #DDDDDD;
			}
		}
	}
}
</style>