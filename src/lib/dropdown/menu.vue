<template>
	<div :style="style" class="mv2-dropdown-menu">
		<div v-for="d in data">
			<div v-if="d.divider" class="mv2-dropdown-menu-divider"></div>
			<div class="mv2-dropdown-item" @click.stop="onClickItem(d.command)">{{ d.label }}</div>
		</div>
	</div>
</template>
<script>
import StyleMixin from './../../mixins/style-mixin';
export default {
	name: "Mv2DropdownMenu",
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
	}
}
</script>
<style lang="scss" scoped>
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
</style>