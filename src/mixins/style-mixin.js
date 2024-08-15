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
		this.styles = this.styles || {};
		this.initStyle();
	},
	methods: {
		initStyle () {
			this.style = utils.initStyls(this.styles);
		}
	}
}