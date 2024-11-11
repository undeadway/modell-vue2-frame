<template>
	<div :style="style">
		<!--
		 * 循环的时候，把所有项目全部循环到
		 * 但只展示 [first, first + 3) 之间的内容
		-->
		<div class="mv2-album-big-box" v-if="total > 0">
			<div class="mv2-album-btn-box">
				<div :class="'btn-box ' + (leftDisabled ? 'disaebld-btn-box' : 'active-btn-box')" @click="onPrev(true)">《&nbsp;&nbsp;</div>
			</div>
			<div class="mv2-album-data-box">
				<div>
					<slot></slot>
				</div>
			</div>
			<div class="mv2-album-btn-box right-btn">
				<div :class="'btn-box ' + (rightDisabled ? 'disaebld-btn-box' : 'active-btn-box')" @click="onNext(true)">&nbsp;&nbsp;》</div>
			</div>
		</div>
		<div class="mv2-album-big-box" v-else>
			<mv2-empty class="mv2-album-empty-box" :size="emptySize" />
		</div>
	</div>
</template>
<script>
import StyleMixin from './../../mixins/style-mixin';

export default {
	name: "Mv2Album",
	mixins: [ StyleMixin ],
	provide () {
		return {
			mv2Album: this
		}
	},
	props: {
		autoPlay: Boolean,
		duration: {
			type: Boolean,
			default: 1500
		},
		autoDirect: {
			type: String,
			default: "right"
		},
		total: {
			type: Number,
			default: 0
		}
	},
	data () {
		return {
			loading: false,
			leftDisabled: true,
			rightDisabled: false,
			first: 0,
			position: 0,
			now: 0,
			itemList: [],
			emptySize: undefined
		}
	},
	watch: {
		"now": function () {
			this.onChangeItems();
		},
		"first": function () {
			this.onChangeItems();
		}
	},
	created () {
		if (this.autoPlay) {
			this.onAutoPlay();
		}

		if (this.styles.height) {
			this.emptySize = parseInt(this.styles.height) - 50;
		}

		this.$on("album-item-created", this.appendAlbumList);
	},
	methods: {
		onChangeItems () {
			for (const item of this.itemList) {
				item.setValues(this.first, this.now);
			}
		},
		appendAlbumList (item) {
			item.setIndex(this.itemList.length);
			item.setValues(this.first, this.now);
			this.itemList.push(item);
		},
		onAutoPlay () {
			let method = null;
			if (this.autoDirect === "right") {
				method = this.onNext;
			}
			if (this.autoDirect === "left") {
				this.leftDisabled = false;
				method = this.onPrev;
			}
			setInterval(method, this.duration);
		},
		/*
		 * 按下一步的时候，向右前进一格，[ ○ □ □ ] □ □ □ => [ □ ○ □ ] □ □ □
		 * 如果已经到最右，则把看不见的向左推一格 [ □ □ ○ ] □ □ □  => □ [ □ □ ○ ] □ □
		 * 如果已经到最后，则什么都不做 □ □ □ [ □ □ ○ ]
		 *
		 * 按上一步的时候，向左前进一格，  □ □ □ [ □ ○ □ ] <= □ □ □ [ □ □ ○ ]
		 * 如果已经到最左，则把看不见的向右推一格 □ □ [ ○ □ □ ] □ <= □ □ □ [ ○ □ □ ] 
		 * 如果已经到最前，则什么都不做 [ ○ □ □ ] □ □ □
		 *
		 * 初始值（first）= 0
		 * 显示范围：[first, first + 3)
		 * 现在位置（ position ） = 0
		 */
		onChangeShow (index) {
			this.now = index;
			this.position = index - this.first;
			this.leftDisabled = this.now === 0;
			this.rightDisabled = this.now === this.total - 1;
		},
		/*
		 * 点击下一步：
		 * now++
		 * position++
		 * 如果 position > 2 （超出显示）
		 * first ++
		 * position = 2
		 * 否则 first = 0
		 */
		onNext (clickFlg) {
			if (this.rightDisabled) return;

			this.leftDisabled = false;
			if (this.total === 0) return;

			this.now++;
			if (this.now === this.total) {
				this.now =  this.total - 1;
				if (this.autoPlay && !clickFlg) {
					this.first = 0;
					this.position = 0;
					console.log(1);
					this.onChangeShow(0);
				} else {
					this.$message({
						message: "后面没有了",
						type: "info"
					});
					this.rightDisabled = true;
				}
				return;
			}

			this.position++;
			if (this.position > 2) {
				this.position = 2;
				this.first++;
				if (this.first > this.total - 3) {
					if (this.autoPlay && !clickFlg) {
						this.first = 0;
						this.position = 0;
						console.log(2);
						this.onChangeShow(0);
					} else {
						this.first = this.total - 3;
						this.rightDisabled = true;
						this.$message({
							message: "后面没有了",
							type: "info"
						});
					}
					return;
				}
			}
		},
		/*
		 * 点击上一步
		 * now--
		 * poition--
		 * 如果 position < 0 （超出显示）
		 * position = 0
		 * first --
		 * 如果 fisrt < 0 => first - 0
		 * 否则
		 * first = 0
		 */
		onPrev (clickFlg) {
			if (this.leftDisabled) return;

			this.rightDisabled = false;
			if (this.total === 0) return;

			this.now--;
			if (this.now < 0) {
				this.now = 0;
				if (this.autoPlay && !clickFlg) {
					this.first = this.total - 3;
					this.position = 3;
					this.onChangeShow(this.total - 1);
				} else {
					this.$message({
						message: "前面没有了",
						type: "info"
					});
					this.leftDisabled = true;
				}
				return;
			}

			this.position--;
			if (this.position < 0) {
				// □ □ □ [ ○ □ □ ]
				this.position = 0;
				// 向左移动的时候，一般情况下只要 first-- 即可，直到 first 为 0
				this.first--;
				if (this.first < 0) {
					this.first = 0;
					if (this.autoPlay && !clickFlg) {
						this.first = this.total - 3;
						this.position = 3;
						this.onChangeShow(this.total - 1);
					} else {
						this.$message({
							message: "前面没有了",
							type: "info"
						});
						this.leftDisabled = true;
						return;
					}
				}
			}
		}
	}
}
</script>
<style lang="scss" scoped>
.mv2-album-big-box {
	height: 100%;
	width: 100%;
		>div {
			display: inline-block;
			vertical-align: middle;
		}
		.mv2-album-btn-box {
			width: 40px;
			text-align: center;
			.btn-box {
				display: block;
				height: 40px;
				line-height: 40px;
				background: rgba($color: #CCCCCC, $alpha: 0.5);
				border-radius: 50%;
			}
			.active-btn-box {
				cursor: pointer;
			}
			.active-btn-box:hover {
				background: rgba($color: #CCCCCC, $alpha: 0.3);
			}
			.active-btn-box:active {
				background: rgba($color: #fdff98, $alpha: 0.5);
			}
			.disaebld-btn-box {
				cursor: not-allowed;
			}
		}

		.mv2-album-data-box {
			width: calc(100% - 80px);
			height: 100%;
			.mv2-album-slot-box {
				display: none;
			}
			>div {
				height: 100%;
			}
		}
	.mv2-album-empty-box {
		display: block;
	}
}
</style>
