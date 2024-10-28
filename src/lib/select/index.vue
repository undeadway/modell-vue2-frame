<template>
	<div :style="style" class="mv2-select-box" @click="hideOptionList">
		<div @click.stop="">
			<select-value v-model="label" :placeholder="placeholder" :disabled="disabled" @click="showOptionList" />
			<div ref="selectMenu" class="mv2-select-options-box" v-if="visible" :style="`width:calc(${width} - 10px);`">
				<div v-for="(option, index) in options" :key="index" @click="onClick(index)">
					<div>{{ option.label }}</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import StyleMixin from "./../../mixins/style-mixin";
import FormItemMixin from "./../../mixins/form-item-mixin";
import SelectValue from "./../../components/select-value";

const SELECT_LIST = [];

export default {
	name: "Mv2Select",
	mixins: [ StyleMixin, FormItemMixin ],
	components: {
		SelectValue
	},
	props: {
		options: {
			type: Array,
			default: []
		},
		value: {
			type: String,
			default: ""
		},
		disabled: {
			type: Boolean,
			default: false
		},
		placeholder: {
			type: String,
			default: ""
		}
	},
	watch: {
		options: function (v1) {
			this.init();
		},
		value: async function (v1) {
			this.formItemSetValue(v1);
			this.formItemValidte();
		}
	},
	data () {
		return {
			label: "",
			width: "",
			visible: false
		}
	},
	created () {
		console.log(this.value);
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

			for (const option of this.options) {
				if (this.value === option.value) {
					this.label = option.label;
				}
			}
		},
		onClick (index) {
			const option = this.options[index];
			this.label = option.label;
			this.hideOptionList();
			this.$emit("change", option.value);
		},
		hideOptionList () {
			this.visible = false;
		},
		showOptionList () {
			if (this.disabled) return;
			this.delMenuList();

			this.visible = true;
			this.$forceUpdate();

			this.$nextTick(() => {
				SELECT_LIST.push(this);
			});
		},
		delMenuList () {
			let selectNode = null;
			while (!!(selectNode = SELECT_LIST.shift())) {
				selectNode.hideOptionList();
			}
		}
	}
}
</script>
<style lang="scss" scoped>
.mv2-select-box {
	display: inline-block;
	position: relative;
	.mv2-select-options-box {
		position: absolute;
		margin-top: 0px;
		border: 1px solid #CCCCCC;
		max-height: 156px;
		border-radius: 6px;
		overflow: auto;
		width: 100px;
		padding: 5px;
		background: #FFFFFF;
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