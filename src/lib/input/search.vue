<template>
	<div>
		<mdlinput :placeholder="placeholder" type="text" append="after" :styles="styles">
			<template #after>
				<div class="mv2-input-append-btn mv2-input-append-btn-search-bg" @click="onSearch"></div>
			</template>
		</mdlinput>
	</div>
</template>
<script>
import mdlinput from "./index";
export default {
	name: "Mv2Search",
	components: {
		mdlinput
	},
	props: {
		placeholder: {
			type: String,
			default: "请输入搜索内容"
		},
		styles: undefined
	},
	methods: {
		onSearch() {
			this.$emit("search");
		}
	}
}
</script>
<style lang="scss" scoped>
.mv2-input-append-btn-search-bg {
	background-image: url(../../assets/icons/search.svg);
}
</style>