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
			const {  clientWidth, clientHeight } = this.$refs[name];

			return {
				width: clientWidth,
				height: clientHeight
			}
		},
		getAbsolutePositon (name) {
			const { offsetLeft, offsetTop, clientWidth, clientHeight } = this.$refs[name];
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
