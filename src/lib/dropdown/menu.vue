<template>
	<div :style="style" class="mv2-menu-box">
		<div v-for="(data, index) in dataList">
			<div v-if="index > 1 && data.divider" class="mv2-divider"></div>
			<div :class="{ 'mv2-menu-item-active-box' :!data.disabled, 'is-disabled' : data.disabled }"
				class="mv2-menu-item-box" @click.stop="onClickItem1(data)">{{ data.label }}
			</div>
		</div>
	</div>
</template>
<script>
import StyleMixin from './../../mixins/style-mixin';

export default {
	name: "Mv2DropdownMenu",
	mixins: [ StyleMixin ],
	props: {
		dataList: {
			type: Array,
			default: []
		}
	},
	methods: {
		onClickItem1 (data) {
			if (data.disabled) return;
			this.onClickItem(data.command);
		}
	}
}
</script>