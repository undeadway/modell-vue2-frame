<template>
	<div>
		<div class="mdl-album-detail-big-box" :style="styles">
			<!--
				循环的时候，把所有内容全部循环到
				但只展示 [first, first + 3) 之间的内容
			-->
			<div class="mdl-album-detail-btn-box">
				<div :class="'btn-box ' + (leftDisabled ? 'disaebld-btn-box' : 'active-btn-box')" @click="onPrev">《&nbsp;&nbsp;</div>
			</div>
			<div class="mdl-album-detail-data-box" v-loading="loading">
				<div v-if="itemsCount > 0">
					<div v-for="index in itemsCount" :key="index"	v-if="index >= first && index < first + 3">
						<div :class="(now === index) ? 'is-active' : 'not-active'" @click="onChangeShow(index)">
							<slot :index="index"></slot>
						</div>
					</div>
				</div>
				<div v-else>
					<div class="empty-data-box">
						
					</div>
				</div>
			</div>
			<div class="mdl-album-detail-btn-box">
				<div :class="'btn-box ' + (rightDisabled ? 'disaebld-btn-box' : 'active-btn-box')" @click="onNext">&nbsp;&nbsp;》</div>
			</div>
		</div>
	</div>
</template>
<script>
import mixin from '../utils/mixin';

export default {
	name: "MdlAlbum",
	mixins: [ mixin ],
	props: {
		itemsCount: {
			type: Number,
			default: 0
		},
	},
	data () {
		return {
			loading: false,
			leftDisabled: true,
			rightDisabled: false,
			first: 0,
			position: 0,
			now: 0
		}
	},
	methods: {
		/*
		 * 按下一步的时候，向右前进一格，[ ○ □ □ ] □ □ □ => [ □ ○ □ ] □ □ □
		 *如果已经到最右，则把看不见的向左推一格 [ □ □ ○ ] □ □ □	=> □ [ □ □ ○ ] □ □
		 * 如果已经到最后，则什么都不做 □ □ □ [ □ □ ○ ]
	
		 * 按上一步的时候，向左前进一格，	□ □ □ [ □ ○ □ ] <= □ □ □ [ □ □ ○ ]
		 * 如果已经到最左，则把看不见的向右推一格 □ □ [ ○ □ □ ] □ <= □ □ □ [ ○ □ □ ] 
		 * 如果已经到最前，则什么都不做 [ ○ □ □ ] □ □ □
	
		 * 初始值（first）= 0
		 * 显示范围：[first, first + 3)
		 * 现在位置（ position ） = 0
		 */
		onChangeShow (index) {
			this.now = index;
			this.position = index - this.first;
			if (this.first >= 0) {
				this.leftDisabled = false;
			} else {
				this.leftDisabled = true;
			}
			if (this.first < this.itemsCount - 1) {
				this.rightDisabled = false;
			} else {
				this.rightDisabled = true;
			}
		},
		onNext () {
	
			if (this.rightDisabled) return;
		
			/*
			* 点击下一步：
			* now++
			* position++
			* 如果 position > 2 （超出显示）
			* first ++
			* position = 2
			* 否则 first = 0
			*/
			this.leftDisabled = false;
			if (this.itemsCount === 0)	return;
			this.now++;
			if (this.now === this.itemsCount - 1) {
				this.rightDisabled = true;
			}
			if (this.now === this.itemsCount) {
				this.now = this.itemsCount - 1;
				this.rightDisabled = true;
				this.$Message({
					message: "后面没有了",
					type: "danger"
				});
				return;
			}
			this.position++;
			if (this.position > 2) {
				this.position = 2;
				this.first++;
				if (this.first > this.itemsCount - 3) {
					this.first = this.itemsCount - 3;
					this.rightDisabled = true;
					this.$Message({
						message: "后面没有了",
						type: "danger"
					});
				}
			}
		},
		onPrev () {
	
			if (this.leftDisabled) return;
		
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
			this.rightDisabled = false;
			if (this.itemsCount === 0)	return;
			this.now--;
			if (this.now === 0) {
				this.leftDisabled = true;
			}
			if (this.now < 0) {
				this.now = 0;
				this.leftDisabled = true;
				this.$Message({
					message: "前面没有了",
					type: "danger"
				});
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
					this.leftDisabled = true;
					this.$Message({
						message: "前面没有了",
						type: "danger"
					});
				}
			}
		}
	}
	}
</script>
<style lang="scss" scoped>
.mdl-album-detail-big-box {
	>div {
		display: inline-block;
		vertical-align: middle;
		// height: 450px;
	}
	
	.mdl-album-detail-btn-box {
		width: 40px;
		text-align: center;
	
		.btn-box {
			// margin-top: calc((78vh - 170px) / 2);
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
	
	.mdl-album-detail-data-box {
		width: calc(100% - 80px);
		>div {
			height: 100%;
			>div {
				width: 33.33%;
				height: 100%;
				display: inline-block;
				margin-top: 40px;
				vertical-align: top;
				>div {
					margin: 0px 10px;
					height: calc(100% - 50px);
					cursor: pointer;
					>div {
						height: 100%;
					}
				}
			}
	
			.empty-data-box {
				>div {
					cursor: default !important;
				}
				width: 100% !important;
			}
		}
	}
	
	.is-active {
		background: rgba($color: #17579e, $alpha: 0.4);
	}
	
	.hidden-master-box {
		display: none;
	}
}
</style>