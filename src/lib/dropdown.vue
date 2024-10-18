<template>
	<div :style="style" class="mv2-dropdown-box" @click="hideOptionList">
		<div  @click.stop="">
			<div @click.stop="showOptionList">
				<slot></slot>
			</div>
			<div v-if="visible" :class="`mv2-dropdown-menu mv2-dropdown-align__${align}`">
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

const DROPDOWN_LIST = [];

export default {
	name: "Mv2Dropdown",
	mixins: [ StyleMixin ],
	props: {
		data: {
			type: Array,
			default: []
		},
		align: {
			type: String,
			default: "left"
		}
	},
	data () {
		return {
			visible: false
		}
	},
	created () {
		this.hideOthersList();
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
	position: relative;
	display: inline-block;
	.mv2-dropdown-menu {
		position: absolute;
		padding: 5px;
		top: 36px;
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

	.mv2-dropdown-align__right {
		right: 0px;
	}
	.mv2-dropdown-align__left {
		left: 0px;
	}
}
</style>