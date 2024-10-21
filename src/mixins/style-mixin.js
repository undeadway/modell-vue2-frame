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
	mounted () {
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
				// 这里这么做的原因是 如果不是 absolute 的形式，offsetLeft 都会指向最浏览器的侧边
				// 导致数据会累加，所以只计算 absolute 类型的数据
				const elStyle = window.getComputedStyle(el);
				el = parentElement;
				if (elStyle.position !== "absolute") continue;

				offsetLeft += parentElement.offsetLeft;
				offsetTop += parentElement.offsetTop;
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
