<template>
	<div style="height: calc(100% - 20px);">
		<div v-show="!loading" style="height: 100%;">
			<div v-show="success">
				<slot></slot>
			</div>
			<div v-show="!success">
				<div class="mv2-error-box">
					<div>数据读取失败</div>
					<div class="mv2-btn-box">
						<button class="mv2-btn" @click="getDatas">再次尝试</button>
					</div>
				</div>
			</div>
		</div>
		<div v-show="loading" style="height: 100%;">
			<div class="mv2-loading-box">
				<div>
					<div class="mv2-loading"></div>
					<div>数据加载中</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
export default {
	name: "Mv2Loading",
	data () {
		return {
			loading: false,
			success: false
		}
	},
	mounted () {
		this.getDatas();
	},
	methods: {
		async getDatas () {
			this.loading = true;
			this.$emit("load", {
				start: () => {
					this.loading = true;
				},
				err: () => {
					this.success = false;
				},
				end: () => {
					this.success = true;
					this.loading = false;
				}
			});
		}
	}
}
</script>

<style lang="scss" scoped>
.mv2-loading-box {
	width: calc(100% - 25px);
	height: 100%;
	padding-top: 20px;
	>div {
		width: 150px;
		height: 200px;
		text-align: center;
		margin: auto;
		>div:last-child {
			margin-top: 2vh;
		}
	}
}

.mv2-loading {
	position: relative;
	width: 150px;
	height: 150px;
	border: 4px solid var(--c_black);
	border-top-color: rgba(0, 0, 0, 0.2);
	border-right-color: rgba(0, 0, 0, 0.2);
	border-bottom-color: rgba(0, 0, 0, 0.2);
	border-radius: 100%;

	animation: mv2-circle infinite 0.75s linear;
}

@keyframes mv2-circle {
	0% {
		transform: rotate(0);
	}
	100% {
		transform: rotate(360deg);
	}
}

.mv2-error-box {
	width: 200px;
	margin: auto;
	margin-top: 5vh;
	text-align: center;
	.mv2-btn-box {
		margin-top: 1vh;
		.mv2-btn {
			cursor: pointer;
			border: none;
			background:var(--c_blue);
			border-radius: 10px;
			padding:5px 15px;
			color: var(--c_white);
		}
	}
}
</style>
