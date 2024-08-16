<template>
	<div>
		<div class="mv2-breadcrumb-item-box" v-for="(item, index) in list">
			<div v-if="item.type === 'value'" class="mv2-breadcrumb-value-box" :style="item.style">
				<span :id="`mv2-breadcrumb__${index}`">{{ item.text }}</span>
			</div>
			<div v-if="item.type === 'separator'" class="mv2-breadcrumb-separator-box">{{ item.text }}</div>
		</div>
	</div>
</template>
<script>
export default {
	name: "Mv2Breadcrumb",
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
		this.$nextTick(() => {
			this.bindEvent();
		});
	},
	methods: {
		getDatas () {
			const list = [];
			for (const item of this.data) {
				list.push({ text: item.text, event: item.event, style: item.style, type: "value" });
				list.push({ text: this.separator, type: "separator" });
			}
			this.list = list.slice(0, list.length - 1);
		},
		bindEvent () {
			for (let i = 0, len = this.list.length; i < len; i++) {
				const item = this.list[i];
				if (item.type === "value") {
					if (item.event) {
						const node = document.getElementById(`mv2-breadcrumb__${i}`);
						node.onclick = () => {
							item.event(this.$parent, item);
						}
					}
				}
			}
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
		cursor: pointer;
		&:hover {
			color: $CTC_SpringEquinox_qilin;
		}
	}
	.mv2-breadcrumb-separator-box {
		text-align: center;
		font-weight: bold;
	}
}
</style>