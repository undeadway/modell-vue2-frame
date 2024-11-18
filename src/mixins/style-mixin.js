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
				/**
				 * 这里这么做的原因是遇到了多重 absolute 定位造成的定位偏差问题
				 * 如果不是 absolute 的形式（relative、static）【fixed、sticky 未测试】，
				 * offsetLeft 都会指向上一层 absolute 或者到浏览器的边框
				 * 如果每次都加算，数据则会被累加，而造成错误
				 *
				 * 基于上面所说， offsetLeft 遇到 absolute 则会停止，也就是说
				 * offsetLet 是从 absolute 定位开始算的，所以这里留下的 absolute 定位
				 */
				el = parentElement;
				const elStyle = window.getComputedStyle(el);
				if (elStyle.position === "absolute") {
					offsetLeft += el.offsetLeft;
				} else {
					offsetTop -= el.scrollTop;
				}
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
