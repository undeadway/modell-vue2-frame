<template>
	<div class="mv2-paging-box">
		<!--
			如果不到 10 页，则全部显示出来
			[1,2,3,4,5,6,7,8,9,10]
		-->
		<div v-if="total <= 10">
			<div>
				<div v-for="n in total" :class="checkIsNow(n) ? 'mv2-is-now' : ''" :key="n">{{ n }}</div>
			</div>
		</div>
		<div v-else>
			<!--
				如果超过 10 页，且页码数 < 6
				[1,2,3,4,5, >> , 最后页 ]
			-->
			<div v-if="page < 6">
				<div :class="checkIsNow(n) ? 'mv2-is-now' : ''" @click="onChangePage(n)" v-for="n in 5" :key="n">{{ n }}</div>
				<div @click="onNext()">&gt;&gt;</div>
				<div @click="onChangePage(total)">{{ total }}</div>
			</div>
			<!--
				如果超过10页，且页码数 > 最后页 - 5
				[1, << , 最后 - 4, 最后 - 3, 最后 - 2, 最后 - 1, 最后 ]
			-->
			<div v-else-if="page > total - 5">
				<div @click="onChangePage(1)">1</div>
				<div @click="onPrev()">&lt;&lt;</div>
				<div :class="checkIsNow(total - 4) ? 'mv2-is-now' : ''" @click="onChangePage(total - 4)">{{ total - 4 }}</div>
				<div :class="checkIsNow(total - 3) ? 'mv2-is-now' : ''" @click="onChangePage(total - 3)">{{ total - 3 }}</div>
				<div :class="checkIsNow(total - 2) ? 'mv2-is-now' : ''" @click="onChangePage(total - 2)">{{ total - 2 }}</div>
				<div :class="checkIsNow(total - 1) ? 'mv2-is-now' : ''" @click="onChangePage(total - 1)">{{ total - 1 }}</div>
				<div :class="checkIsNow(total) ? 'mv2-is-now' : ''">{{ total }}</div>
			</div>
			<!--
				超过 10 页，且页码数 > 5 ，页码数 < 最后页 - 4
				[1, <<, 当前页 - 2, 当前页 -1 , 当前页 , 当前页 + 1, 当前页 + 2, >>, 最后页]
			-->
			<div v-else>
				<div  @click="onChangePage(1)">1</div>
				<div @click="onPrev()">&lt;&lt;</div>
				<div @click="onChangePage(page - 2)">{{ page - 2}}</div>
				<div @click="onChangePage(page - 1)">{{ page - 1}}</div>
				<div class="mv2-is-now" @click="onChangePage(page)">{{ page }}</div>
				<div @click="onChangePage(page + 1)">{{ page + 1}}</div>
				<div @click="onChangePage(page + 2)">{{ page + 2}}</div>
				<div @click="onNext()">&gt;&gt;</div>
				<div :class="checkIsNow(total) ? 'mv2-is-now' : ''" @click="onChangePage(total)">{{ total }}</div>
			</div>
		</div>
	</div>
</template>
<script>
export default {
	name: "Mv2Paging",
	props: {
		total: {
			type: Number,
			default: 1
		},
		size: {
			type: Number,
			default: 1
		},
		current: {
			type: Number,
			default: 1
		}
	},
	watch: {
		current: function () {
			this.init();
		}
	},
	data () {
		return {
			page: 0
		}
	},
	created () {
		this.init();
	},
	methods: {
		init () {
			this.page = this.current;
		},
		onChangePage (pageNo) {
			if (this.page === pageNo) return; // 如果是当前页，不做任何处理
			this.$emit("change", pageNo);
		},
		onPrev () {
			this.$emit("change", this.page - 1);
		},
		onNext () {
			this.$emit("change", this.page + 1);
		},
		checkIsNow (pageNo) {
			return this.page === pageNo;
		}
	}
}
</script>
<style lang="scss" scoped>
.mv2-paging-box {
	margin-top: 10px;
	>div {
		>div {
			>div {
				cursor: pointer;
				display: inline-block;
				height: 40px;
				line-height: 40px;
				width: 40px;
				text-align: center;
				margin-right: 10px;
				background: $c_list_even;
			}
			>div:hover {
				background: $c_list_odd;
			}
			.mv2-is-now {
				background: $c_list_hover;
			}
		}
	}
}
</style>