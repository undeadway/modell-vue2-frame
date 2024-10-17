<template>
	<div :style="style" class="mv2-dropdown-box" @click="hideOptionList">
		<div  @click.stop="">
			<div @click.stop="showOptionList">
				<slot></slot>
			</div>
			<ul v-if="visible" :class="`mv2-dropdown-menu mv2-dropdown-align__${align}`">
				<li v-for="d in data" @click.stop="onClickItem(d.command)"  :divided="d.divided">{{ d.label }}</li>
			</ul>
		</div>
	</div>
</template>
<script>
import StyleMixin from './mixins/style-mixin';

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
			this.visible = true;
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
		top: 20px;
	}

	.mv2-dropdown-align__right {
		right: 0px;
	}
	.mv2-dropdown-align__left {
		left: 0px;
	}
}
</style>