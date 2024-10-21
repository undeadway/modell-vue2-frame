import utils from "./../utils/utils";

export default {
	props: {
		styles: {
			type: Object,
			default: {}
		}
	},
	data () {
		return {
			style: ""
		}
	},
	created () {
		this.initStyle();
	},
	methods: {
		initStyle () {
			const tmp = Object.assign({}, this.styles);
			tmp.width = tmp.width || "100%";
			this.style = utils.initStyles(tmp);
		},
		getElementtSize (name) {
			const {  clientWidth, clientHeight } = name ? this.$refs[name] : this.$el;

			return {
				width: clientWidth,
				height: clientHeight
			}
		},
		getAbsolutePositon (name) {
			let el = this.$refs[name], parentElement = null;
			let { offsetLeft, offsetTop, clientWidth, clientHeight } = el;

			while ((parentElement = el.parentElement) !== null) {
				offsetLeft += parentElement.offsetLeft;
				offsetTop += parentElement.offsetTop;
				el = parentElement;
			}

			const { scrollWidth, scrollHeight } = document.body;

			const offsetPosition = {
				left: offsetLeft,
				top: offsetTop,
				right: scrollWidth - offsetLeft - clientWidth,
				bottom: scrollHeight - offsetTop - clientHeight,
			};

			return offsetPosition;
		}
	}
}
