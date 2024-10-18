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

			if (!this.styles.width) {
				this.styles.width = "100%";
			}

			this.style = utils.initStyles(this.styles);
		},
		getOffsetPositon () {
			const { offsetLeft, offsetTop, offsetHeight, offsetWidth } = this.$el;
			const { scrollWidth, scrollHeight } = document.body;

			const offsetPosition = {
				left: offsetLeft,
				top: offsetTop,
				right: scrollWidth - offsetLeft - offsetWidth,
				bottom: scrollHeight - offsetTop - offsetHeight,
			};

			return offsetPosition;
		}
	}
}
