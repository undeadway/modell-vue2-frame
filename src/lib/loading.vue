<template>
	<div style="height: calc(100% - 20px);">
		<div v-show="!loading" style="height: 100%;">
			<div v-show="success">
				<slot></slot>
			</div>
			<div v-show="!success">
				<div class="mdl-error-box">
					<div>数据读取失败</div>
					<div class="mdl-btn-box">
						<button class="mdl-btn" @click="getDatas">再次尝试</button>
					</div>
				</div>
			</div>
		</div>
		<div v-show="loading" style="height: 100%;">
			<div class="mdl-loading-box">
				<div>
					<div class="mdl-loading"></div>
					<div>数据加载中</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
export default {
	name: "MdlLoading",
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
.mdl-loading-box {
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

.mdl-loading {
	position: relative;
	width: 150px;
	height: 150px;
	border: 4px solid var(--c_black);
	border-top-color: rgba(0, 0, 0, 0.2);
	border-right-color: rgba(0, 0, 0, 0.2);
	border-bottom-color: rgba(0, 0, 0, 0.2);
	border-radius: 100%;

	animation: mdl_circle infinite 0.75s linear;
}

@keyframes mdl_circle {
	0% {
		transform: rotate(0);
	}
	100% {
		transform: rotate(360deg);
	}
}

.mdl-error-box {
	width: 200px;
	margin: auto;
	margin-top: 5vh;
	text-align: center;

	.mdl-btn-box {
		margin-top: 1vh;

		.mdl-btn {
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