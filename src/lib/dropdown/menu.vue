<template>
	<div :style="style" class="mv2-dropdown-menu">
		<div v-for="_d in data">
			<div v-if="_d.divider" class="mv2-divider"></div>
			<div class="mv2-dropdown-item" @click.stop="onClickItem(_d.command)">{{ _d.label }}</div>
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
}
</style>