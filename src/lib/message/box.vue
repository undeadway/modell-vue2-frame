<template>
	<div v-show="visible" class="mdl-message-list-box">
		<div v-for="(item, index) in list" :class="`mdl-message-box mdl-message-box__${item.round} mdl-message-box__${item.type}`">
			<div class="mdl-message-value-box"> {{ item.message }}</div>
			<div v-if="item.closeable" class="mdl-message-close-box" @click="onClose(index)">
				<close-box @close="onClose(index)" />
			</div>
		</div>
	</div>
</template>
<script>
import CloseBox from "../../components/close-box";

export default {
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
.mdl-message-list-box {
	position: absolute;
	color: #FFFFFF;
	top: 20px;
	min-width: 800px;
	z-index: 2000;
	margin-left: calc(50% - 400px);

	.mdl-message-box {
		padding: 0px 10px;
		margin-top: 16px;
	}

	.mdl-message-box__round {
		border-radius: 8px;
	}

	.mdl-message-box>div {
		display: inline-block;
		vertical-align: middle;
	}

	.mdl-message-value-box {
		width: calc(100% - 30px);
	}

	.mdl-message-close-box {
		width: 30px;
		text-align: right;
	}

	.mdl-message-box__warning {
		background: $c_earth_yellow;
	}
	.mdl-message-box__danger {
		background: $c_danger;
	}
	.mdl-message-box__info {
		background: $c_info;
	}
	.mdl-message-box__success {
		background: $c_success;
	}
}
</style>