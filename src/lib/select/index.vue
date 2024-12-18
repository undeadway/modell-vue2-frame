<template>
	<div :style="style" class="mv2-select-box" @click="hideOptionList">
		<div @click.stop="">
			<select-value v-model="label" :placeholder="placeholder" :disabled="disabled" :clearable="clearable" @clear="onClearData" @click="showOptionList" />
			<div ref="selectMenu" class="mv2-menu-box mv2-select-options-box" v-if="visible" :style="selectMenuStyle">
				<div v-for="(option, index) in options" :key="index" @click="onClick(option)">
					<div v-if="index > 1 && option.divider" class="mv2-divider"></div>
					<div class="mv2-menu-item-box" :class="{ 'mv2-menu-item-active-box' :!option.disabled, 'is-disabled' : option.disabled }">{{ option.label }}</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import StyleMixin from "./../../mixins/style-mixin";
import FormItemMixin from "./../../mixins/form-item-mixin";
import SelectValue from "./../../components/select-value";
import ZindexMixin from './../../mixins/zindex-mixin';
import utils from "./../../utils/utils";

const SELECT_LIST = [];

export default {
	name: "Mv2Select",
	mixins: [ StyleMixin, FormItemMixin, ZindexMixin ],
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
			default: "请选择"
		},
		clearable: Boolean
	},
	watch: {
		options: function (v1) {
			this.init();
		},
		value: async function (v1) {
			if (!v1) {
				this.label = "";
			} else {
				this.initOptions();
			}
			this.formItemSetValue(v1);
			this.formItemValidte();
			this.$emit("input", v1);
		},
		width: function () {
			this.selectMenuStyle = utils.initStyles({
				width: `calc(${this.width} - 10px);`,
				"z-index": this.getZindexLayer()
			});
		}
	},
	data () {
		return {
			label: "",
			width: "",
			visible: false,
			selectMenuStyle: ""
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
			} else {
				this.width = "100%";
			}

			this.initOptions();
		},
		initOptions () {
			for (const option of this.options) {
				if (this.value === option.value) {
					this.label = option.label;
				}
			}
		},
		onClick (option) {
			if (option.disabled) return;
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
		},
		onClearData () {
			this.label = "";
			this.value = "";
			this.$emit("change", "");
		}
	}
}
</script>
<style lang="scss" scoped>
.mv2-select-box {
	display: inline-block;
	position: relative;
	.mv2-select-options-box {
		margin-top: 0px;
		width: 100px;
		max-height: 156px;
		overflow: auto;
	}
}
</style>