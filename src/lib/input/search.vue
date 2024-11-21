<template>
	<div>
		<mv2-input v-model="value" :clearable="clearable" :placeholder="placeholder" type="text" append="after" :styles="styles">
			<template #after>
				<div class="mv2-input-append-btn mv2-input-append-btn-search-bg" @click="onSearch"></div>
			</template>
		</mv2-input>
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
		},
		clearable: {
			type: Boolean,
			default: false
		}
	},
	watch: {
		value: function (v1, v2) {
			this.$emit("input", this.value);
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
