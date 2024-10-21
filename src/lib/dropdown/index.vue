<template>
	<div :style="style" class="mv2-dropdown-box" @click="delMenuList">
		<div @click.stop="" ref="dropdown">
			<div @click.stop="addMenuList" ref="slot">
				<slot></slot>
			</div>
		</div>
	</div>
</template>
<script>
import Vue from "vue";
import StyleMixin from './../../mixins/style-mixin';
import Mv2DropdownMenu from "./menu";

const MenuConstructor = Vue.extend(Mv2DropdownMenu);
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
		this.delMenuList();
	},
	mounted() {
		// 监听点击事件，用于关闭下拉框
		window.addEventListener('click', this.delMenuList);
	},
	beforeUnmount() {
		// 移除点击事件监听器
		window.removeEventListener('click', this.delMenuList);
	},
	methods: {
		onClickItem (command) {
			this.delMenuList();
			this.$emit("command", command);
		},
		delMenuList () {
			let dropDown = null;
			while (!!(dropDown = DROPDOWN_LIST.shift())) {
				document.body.removeChild(dropDown.$el);
				dropDown.$destroy();
			}
		},
		addMenuList () {

			this.delMenuList(); // 删除其他的下拉列表

			const offsetPosition = this.getAbsolutePositon("dropdown");
			const size = this.getElementtSize("slot");

			const menuStyle = {
				display: "block",
				"text-align": this.align,
				width: "xxx", // 这里是故意写错值，避免被下面 100% 覆盖
				[this.position]: `${offsetPosition[this.position]}px`,
				top: `${offsetPosition.top + size.height + 2}px`, // 2是用来和上面的按钮空开一小段距离
			};

			const mv2DropdownMenu = new MenuConstructor();
			mv2DropdownMenu.styles = menuStyle;
			mv2DropdownMenu.data = this.data;
			mv2DropdownMenu.onClickItem = this.onClickItem;

			mv2DropdownMenu.$mount();
			document.body.appendChild(mv2DropdownMenu.$el);
			DROPDOWN_LIST.push(mv2DropdownMenu);
		}
	}
}
</script>
<style lang="scss" scoped>
.mv2-dropdown-box {
	display: inline-block;
}
</style>