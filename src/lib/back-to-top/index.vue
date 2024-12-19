<template>
	<div class="mv2-back-to-top" @click="goBack">▲</div>
</template>
<script>
export default {
	name: "Mv2BackToTop",
	props: {
		element: undefined
	},
	data () {
		return {
			scrollTrigger: false
		}
	},
	watch: {
		element: function () {
			this.element.scroll = this.getScrollTop;
		}
	},
	methods: {
		// 返回顶部事件
		goBack() {
			const that = this.element; // 防止this指向问题
			// 防止频繁点击，故返回顶部后设置scrollTrigger为初始值
			if (that.scrollTrigger) {
				return;
			}
			// 获取当前距离顶部的距离
			let scrollTop = this.element.scrollTop;
			let steep = scrollTop / 2000;
			let timer = setInterval(() => {
				that.scrollTrigger = true;
				// 滚动的速度逐渐变快，第一次走2000/1，然后减去已走的距离，下一次用剩下的距离再减去步进值，步进值也是不断变化，这样速度会越来越快
				scrollTop -= steep;
				// 步进值不改变的话会匀速缓慢上滑，不断增加步进值上滑的距离增加，视觉效果速度变快
				steep += 20;
				if (scrollTop <= 0) {
					clearInterval(timer);
					that.scrollTrigger = false;
				}
				that.scrollTop = scrollTop;
			}, 30);
		},
		// 监听滚动条
		getScrollTop(e) {
			let scrollTop = e.srcElement.scrollTop;
			this.element.scrollTop = scrollTop;
		}
	}
}
</script>
<style lang="scss" scoped>
.mv2-back-to-top {
	width: 40px;
	height: 40px;
	text-align: center;
	line-height: 40px;
	border-radius: 50%;
	border: 1px solid #CCCCCC;
	background: #FFFFFF;
	cursor: pointer;
}
</style>