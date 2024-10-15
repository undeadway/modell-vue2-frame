<template>
	<div>
		<form :style="style">
			<slot></slot>
		</form>
	</div>
</template>
<script>
import StyleMixin from './../mixins/style-mixin';

export default {
	name: "Mv2Form",
	mixins: [ StyleMixin ],
	provide : function() {
		return {
			mv2Form: this
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
			fields: {},
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
				const ref = this.fields[field];
				const valid = ref.validate();
				arr.push(valid);
			}

			const reses = await Promise.all(arr);

			const output = reses.filter(obj => {
				return obj !== null;
			});

			return output;
		},
		setField (key, value) {
			if (this.keys.indexOf(key) < 0) {
				this.keys.push(key);
				this.fields[key] = value;
			}
		}
	}
}
</script>
