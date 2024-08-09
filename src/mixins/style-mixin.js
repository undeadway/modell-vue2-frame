export default {
	props: {
		styles: {
			type: Object,
			default: null
		}
	},
	data () {
		return {
			style: ""
		}
	},
	created () {
		this.styles = this.styles || {};
		this.initStyle();
	},
	methods: {
		initStyle () {
			const style = Object.assign({}, this.styles);
			if (!style.width) {
				style.width = "100%";
			}
	
			const arr = [];
			for (const key in style) {
				arr.push(`${key}: ${style[key]};`);
			}
	
			this.style = arr.join(" ");
		}
	}
}