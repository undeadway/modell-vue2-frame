<template>
	<div :style="style" class="mv2-select-box" @click="hideOptionList">
		<div @click.stop="">
			<div class="mv2-select-value-box mv2-input-object" @click="showOptionList">
				<div>{{ label }}</div>
			</div>
			<div class="mv2-select-options-box" v-show="visible" :style="`width:calc(${width} - 2px);`">
				<div v-for="(option, index) in options" :key="index" @click="onClick(index)">
					<div>{{ option.label }}</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import StyleMixin from "./../mixins/style-mixin";
import FormMixin from "../mixins/form-mixin";

export default {
	mixins: [ StyleMixin, FormMixin ],
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
		value: async function (v1) {
			this.$emit("change", v1);
			this.formItemsetValue(v1);
			this.formItemValidte();
		}
	},
	data () {
		return {
			value: "",
			label: "",
			width: "",
			visible: false
		}
	},
	created () {
		this.init();
	},
	mounted() {
		// 监听点击事件，用于关闭下拉框
		window.addEventListener('click', this.hideOptionList);
	},
	beforeUnmount() {
		// 移除点击事件监听器
		window.removeEventListener('click', this.hideOptionList);
	},
	methods: {
		init () {
			if (this.styles && this.styles.width) {
				this.width = this.styles.width;
			}
		},
		onClick (index) {
			const option = this.options[index];
			this.value = option.value;
			this.label = option.label;
			this.hideOptionList();
		},
		hideOptionList () {
			this.visible = false;
		},
		showOptionList () {
			this.visible = true;
		}
	}
}
</script>
<style lang="scss" scoped>
.mv2-select-box {
	position: relative;
	.mv2-select-value-box {
		cursor: pointer;
		>div {
			overflow-x: hidden;
			white-space:nowrap;
		}
	}
	.mv2-select-options-box {
		position: absolute;
		margin-top: 0px;
		border: 1px solid #CCCCCC;
		max-height: 156px;
		border-radius: 6px;
		overflow: auto;
		width: 100%;
		>div {
			padding: 6px 8px;
			cursor: pointer;
			background: #FFFFFF;
			&:hover {
				background: #DDDDDD;
			}
			>div {
				overflow-x: hidden;
				white-space:nowrap;
			}
		}
	}
}
</style>