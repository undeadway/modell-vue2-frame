<template>
	<div>
		<form :style="style">
			<slot></slot>
		</form>
	</div>
</template>
<script>
import StyleMixin from '../../mixins/style-mixin';

export default {
	name: "MdlForm",
	mixins: [ StyleMixin ],
	provide : function() {
		return {
			mdlForm: this
		};
	},
	props: {
		labelWidth: {
			type: String,
			default: ""
		},
		labelAlign: {
			type: String,
			default: "left"
		},
		form: {
			type: Object,
			default: {}
		},
		rules: {
			type: Object,
			default: {}
		},
	},
	data () {
		return {
			items: {},
			keys: []
		}
	},
	methods: {
		validate () {
			const result = this.validateFields(this.keys);
			return result;
		},
		async validateFields (fieldArr) {
			const arr = [];
			for (const field of fieldArr) {
				const ref = this.items[field];
				const valid = ref.validate();
				arr.push(valid);
			}

			const reses = await Promise.all(arr);

			return reses.indexOf(false) < 0;
		},
		setItem (key, value) {
			this.keys.push(key);
			this.items[key] = value;
		}
	}
}
</script>
