export default {
	props: {
		style: undefined
	},
	data () {
		return {
			tmpStyle: null,
			styles: ""
		}
	},
	created () {
		console.log("mixin");
		this.style = this.style || {};
		this.initStyle();
	},
	methods: {
		initStyle () {
			const style = Object.assign({}, this.style);
			if (!style.width) {
				style.width = "100%";
			}
	
			const arr = [];
			for (const key in style) {
				arr.push(`${key}: ${style[key]};`);
			}
	
			this.styles = arr.join(" ");
		}
	}
}