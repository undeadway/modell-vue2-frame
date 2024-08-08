<template>
	<div class="mdl-paging-box">
		<!--
			如果不到 10 页，则全部显示出来
			[1,2,3,4,5,6,7,8,9,10]
		-->
		<div v-if="pageData.total <= 10">
			<div>
				<div v-for="n in pageData.total" :class="checkIsNow(n) ? 'mdl-is-now' : ''" :key="n">{{ n }}</div>
			</div>
		</div>
		<div v-else>
			<!--
				如果超过 10 页，且页码数 < 6
				[1,2,3,4,5, >> , 最后页 ]
			-->
			<div v-if="pageData.page < 6">
				<div :class="checkIsNow(n) ? 'mdl-is-now' : ''" @click="onChangePage(n)" v-for="n in 5" :key="n">{{ n }}</div>
				<div @click="onNext()">&gt;&gt;</div>
				<div @click="onChangePage(pageData.total)">{{ pageData.total }}</div>
			</div>
			<!--
				如果超过10页，且页码数 > 最后页 - 5
				[1, << , 最后 - 4, 最后 - 3, 最后 - 2, 最后 - 1, 最后 ]
			-->
			<div v-else-if="pageData.page > pageData.total - 5">
				<div @click="onChangePage(1)">1</div>
				<div @click="onPrev()">&lt;&lt;</div>
				<div :class="checkIsNow(pageData.total - 4) ? 'mdl-is-now' : ''" @click="onChangePage(pageData.total - 4)">{{ pageData.total - 4 }}</div>
				<div :class="checkIsNow(pageData.total - 3) ? 'mdl-is-now' : ''" @click="onChangePage(pageData.total - 3)">{{ pageData.total - 3 }}</div>
				<div :class="checkIsNow(pageData.total - 2) ? 'mdl-is-now' : ''" @click="onChangePage(pageData.total - 2)">{{ pageData.total - 2 }}</div>
				<div :class="checkIsNow(pageData.total - 1) ? 'mdl-is-now' : ''" @click="onChangePage(pageData.total - 1)">{{ pageData.total - 1 }}</div>
				<div :class="checkIsNow(pageData.total) ? 'mdl-is-now' : ''">{{ pageData.total }}</div>
			</div>
			<!--
				超过 10 页，且页码数 > 5 ，页码数 < 最后页 - 4
				[1, <<, 当前页 - 2, 当前页 -1 , 当前页 , 当前页 + 1, 当前页 + 2, >>, 最后页]
			-->
			<div v-else>
				<div  @click="onChangePage(1)">1</div>
				<div @click="onPrev()">&lt;&lt;</div>
				<div @click="onChangePage(pageData.page - 2)">{{ pageData.page - 2}}</div>
				<div @click="onChangePage(pageData.page - 1)">{{ pageData.page - 1}}</div>
				<div class="mdl-is-now" @click="onChangePage(pageData.page)">{{ pageData.page }}</div>
				<div @click="onChangePage(pageData.page + 1)">{{ pageData.page + 1}}</div>
				<div @click="onChangePage(pageData.page + 2)">{{ pageData.page + 2}}</div>
				<div @click="onNext()">&gt;&gt;</div>
				<div :class="checkIsNow(pageData.total) ? 'mdl-is-now' : ''" @click="onChangePage(pageData.total)">{{ pageData.total }}</div>
			</div>
		</div>
	</div>
</template>
<script>
export default {
	name: "MdlPaging",
	props: {
		data: {
			type: Object,
			default: null
		}
	},
	data () {
		return {
			pageData: null
		}
	},
	watch: {
		"data.total": function(v1, v2) {
			this.pageData.total = v1;
		}
	},
	created () {
		if (this.data) {
			this.pageData = this.data;
		}
	},
	methods: {
		onChangePage (pageNo) {
			if (this.pageData.page === pageNo) return; // 如果是当前页，不做任何处理
			this.$emit("change", pageNo);
		},
		onPrev () {
			this.$emit("change", this.pageData.page - 1);
		},
		onNext () {
			this.$emit("change", this.pageData.page + 1);
		},
		checkIsNow (pageNo) {
			return this.pageData.page === pageNo;
		}
	}
}
</script>
<style lang="scss" scoped>
.mdl-paging-box {
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
			.mdl-is-now {
				background: $c_list_hover;
			}
		}
	}

}
</style>