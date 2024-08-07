<template>
	<div>
		<mdlinput :placeholder="placeholder" type="text" append="after">
			<template #after>
				<div class="mdl-input-append-btn mdl-input-append-btn-search-bg" @click="onSearch"></div>
			</template>
		</mdlinput>
	</div>
</template>
<script>
import mdlinput from "./index";
export default {
	name: "MdlSearch",
	components: {
		mdlinput
	},
	props: {
		placeholder: {
			type: String,
			default: "请输入搜索内容"
		},
	},
	methods: {
		onSearch() {
			this.$emit("search");
		}
	}
}
</script>
<style lang="scss" scoped>
.mdl-input-append-btn-search-bg {
	background-image: url(../../assets/icons/search.svg);
}
</style>