<template>
	<div>
		<div class="mv2-breadcrumb-item-box" v-for="item in list">
			<div v-if="type === 'value'" class="mv2-breadcrumb-value-box">
				<span v-if="item.path">
					<a :href="item.path">{{ item.text }}</a>
				</span>
				<span v-else>{{ item.text }}</span>
			</div>
			<div v-if="type === 'separator'" class="mv2-breadcrumb-separator-box">{{ item.text }}</div>
		</div>
	</div>
</template>
<script>
export default {
	props: {
		separator: {
			type: String,
			default: "/"
		},
		data: {
			type: Array,
			default: []
		}
	},
	data () {
		return {
			list: []
		}
	},
	created () {
		this.getDatas();
	},
	methods: {
		getDatas () {
			const list = [];
			for (const item of this.data) {
				list.push({ text: item.label, path: item.path, type: "value" });
				list.push({ text: this.separator, type: "separator" });
			}
			this.list = list.slice(0, list.length - 1);
		}
	}
}
</script>
<style lang="scss" scoped>
.mv2-breadcrumb-item-box {
	display: inline-block;
	vertical-align: middle;
	padding: 2px 4px;

	.mv2-breadcrumb-value-box {
		text-align: left;
	}
	.mv2-breadcrumb-separator-box {
		text-align: center;
		font-weight: bold;
	}
}
</style>