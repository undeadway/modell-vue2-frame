<template>
	<div></div>
</template>
<script>
import StyleMixin from "./../mixins/style-mixin";

export default {
	mixins: [ StyleMixin ],
	name: "Mv2Select",
	props: {
		options: {
			type: Array,
			default: []
		},
	},
	watch: {
		options: function (v1) {
			this.init();
		}
	},
	created () {
		this.init();
	},
	methods: {
		init () {

		},
		change () {
			tshi.$emit("change");
		}
	}
}
</script>