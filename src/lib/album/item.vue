<template>
	<div class="mv2-album-item" :style="style"  v-if="index >= first && index < first + 3">
		<div  :class="(now === index) ? 'is-active' : 'not-active'" @click="onChangeShow()">
			<slot></slot>
		</div>
	</div>
</template>
<script>
export default {
	name: "Mv2AlbumItem",
	inject: [ "mv2Album" ],
	data () {
		return {
			index: 0,
			first: 0,
			now: 0
		}
	},
	created () {
		this.$parent.$emit("album-item-created", this);
	},
	methods: {
		setIndex (index) {
			this.index = index;
		},
		setValues (first, now) {
			this.first = first;
			this.now = now;
		},
		onChangeShow () {
			this.mv2Album.onChangeShow(this.index);
		}
	}
}
</script>
<style lang="scss" scoped>
.mv2-album-item {
	width: 33.33%;
	height: 100%;
	display: inline-block;
	white-space: nowrap;
	vertical-align: top;
	>div {
		// margin: 0px 10px;
		height: 100%;
		cursor: pointer;
		>div {
			height: 100%;
		}
	}
};

.is-active {
	background: rgba($color: #17579e, $alpha: 0.4);
}
</style>