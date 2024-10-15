<template>
	<div v-show="visible" class="mv2-message-list-box">
		<div v-for="(item, index) in list" :class="`mv2-message-box mv2-message-box__${item.round} mv2-message-box__${item.type}`">
			<div class="mv2-message-value-box"> {{ item.message }}</div>
			<div v-if="item.closeable" class="mv2-message-close-box" @click="onClose(index)">
				<close-box @close="onClose(index)" />
			</div>
		</div>
	</div>
</template>
<script>
import CloseBox from "./../components/close-box";

export default {
	name: "Mv2Message",
	components: {
		CloseBox
	},
	data () {
		return {
			visible: false,
			list: []
		}
	},
	methods: {
		onClose (index) {
			for (let i = 0; i < this.list.length; i++) {
				const item = this.list[i];
				if (item.index === index) {
					this.list.splice(i, 1);
					if (this.length === 0) {
						this.visible = false;
					}
					break;
				}
			}
		},
		add (options) {
			this.visible = true;
			const index = this.list.length;
			options.index = index;
			this.list.push(options);
			setTimeout(() => {
				this.onClose(index);
			}, options.duration);
		}
	}
}
</script>
<style lang="scss" scoped>
.mv2-message-list-box {
	position: absolute;
	color: #FFFFFF;
	top: 20px;
	min-width: 800px;
	z-index: 2000;
	margin-left: calc(50% - 400px);

	.mv2-message-box {
		padding: 0px 10px;
		margin-top: 16px;
	}

	.mv2-message-box__round {
		border-radius: 8px;
	}

	.mv2-message-box>div {
		display: inline-block;
		vertical-align: middle;
	}

	.mv2-message-value-box {
		width: calc(100% - 30px);
	}

	.mv2-message-close-box {
		width: 30px;
		text-align: right;
	}

	.mv2-message-box__warning {
		background: $c_warning;
	}
	.mv2-message-box__danger {
		background: $c_danger;
	}
	.mv2-message-box__info {
		background: $c_info;
	}
	.mv2-message-box__text {
		background: $c_text;
	}
	.mv2-message-box__success {
		background: $c_success;
	}
}
</style>