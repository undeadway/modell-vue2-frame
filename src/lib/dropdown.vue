<template>
	<div :style="style" class="mv2-dropdown-box" @click="hideOptionList">
		<div @click.stop="" ref="dropdown">
			<div @click.stop="showOptionList">
				<slot></slot>
			</div>
			<div v-if="visible" :style="menuStyle" class="mv2-dropdown-menu">
				<div v-for="d in data">
					<div v-if="d.divider" class="mv2-dropdown-menu-divider"></div>
					<div class="mv2-dropdown-item" @click.stop="onClickItem(d.command)">{{ d.label }}</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import StyleMixin from './../mixins/style-mixin';
import utils from "./../utils/utils";

const DROPDOWN_LIST = [];

export default {
	name: "Mv2Dropdown",
	mixins: [ StyleMixin ],
	props: {
		data: {
			type: Array,
			default: []
		},
		position: { // 位置，下拉列表的对齐方式
			type: String,
			default: "left"
		},
		align: { // 列表中文字的对齐方式
			type: String,
			default: "left"
		}
	},
	data () {
		return {
			visible: false,
			menuStyle: ""
		}
	},
	created () {
		this.hideOthersList();
	},
	mounted() {
		// 监听点击事件，用于关闭下拉框
		window.addEventListener('click', this.hideOptionList);

		const offsetPosition = this.getAbsolutePositon("dropdown");
		const size = this.getElementtSize("dropdown");

		const menuStyle = {
			"text-align": this.align,
			[this.position]: `${offsetPosition[this.position]}px`,
			top: `${offsetPosition.top + size.height + 2}px` // 2是用来和上面的按钮空开一小段距离
		};

		this.menuStyle = utils.initStyles(menuStyle);
	},
	beforeUnmount() {
		// 移除点击事件监听器
		window.removeEventListener('click', this.hideOptionList);
	},
	methods: {
		onClickItem (command) {
			this.hideOptionList();
			this.$emit("command", command);
		},
		hideOptionList () {
			this.visible = false;
		},
		showOptionList () {
			this.hideOthersList();
			this.visible = true;
		},
		hideOthersList () {
			for (const dropDown of DROPDOWN_LIST) {
				dropDown.hideOptionList();
			}
			DROPDOWN_LIST.push(this);
		}
	}
}
</script>
<style lang="scss" scoped>
.mv2-dropdown-box {
	display: inline-block;
	.mv2-dropdown-menu {
		position: absolute; // 绑定到 body
		padding: 5px;
		border: 1px solid #CCCCCC;
		border-radius: 6px;
		background: #FFFFFF;
		>div {
			.mv2-dropdown-item {
				padding: 6px 8px;
				border-radius: 6px;
				cursor: pointer;
				white-space:nowrap;
				&:hover {
					background: #DDDDDD;
				}
			}
		}
		.mv2-dropdown-menu-divider {
			border-bottom: 1px solid #CCCCCC;
			margin: 4px;
		}
	}
}
</style>