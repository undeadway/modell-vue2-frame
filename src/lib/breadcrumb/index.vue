<template>
	<div>
		<div class="mv2-breadcrumb-item-box" v-for="(item, index) in list">
			<div v-if="item.type === 'value'" class="mv2-breadcrumb-value-box" :style="item.style">
				<span :id="`mv2-breadcrumb__${index}`" :class="`mv2-breadcrumb__${item.event? 'event' : ''}`">{{ item.text }}</span>
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
	watch: {
		data: function () {
			this.getDatas();
			this.$nextTick(this.bindEvent); // 在数据更新后重新绑定一次 event
		}
	},
	created () {
		this.getDatas();
	},
	mounted () {
		this.bindEvent();
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
							const data = Object.assign({}, item);
							delete data.event;
							item.event.call(this.$parent, data);
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
	font-weight: bold;
	padding: 2px 4px;
	.mv2-breadcrumb-value-box {
		text-align: left;
		&:hover {
			color: $CTC_HeatEnd_facui;
		}
	}
	.mv2-breadcrumb__event {
		cursor: pointer;
	}
	.mv2-breadcrumb-separator-box {
		text-align: center;
	}
}
</style>
