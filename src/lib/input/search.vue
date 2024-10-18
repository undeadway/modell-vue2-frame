<template>
	<div>
		<mv2input v-model="value" :placeholder="placeholder" type="text" append="after" :styles="styles">
			<template #after>
				<div class="mv2-input-append-btn mv2-input-append-btn-search-bg" @click="onSearch"></div>
			</template>
		</mv2input>
	</div>
</template>
<script>
import mv2input from "./index";
export default {
	name: "Mv2Search",
	components: {
		mv2input
	},
	props: {
		placeholder: {
			type: String,
			default: "请输入搜索内容"
		},
		styles: undefined,
		value: {
			type: String,
			default: ""
		}
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
	background-image: url(./../../assets/icons/search.svg);
}
</style>
