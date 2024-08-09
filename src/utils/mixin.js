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
		this.tmpStyle = this.style || {};
		this.init();
	},
	methods: {
		init () {
			const style = this.tmpStyle;
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