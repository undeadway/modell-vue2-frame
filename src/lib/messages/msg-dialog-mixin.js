import DialogBody from './../../components/dialog-body';
import ZindexMixin from '../../mixins/zindex-mixin';

export default {
	mixins: [ ZindexMixin ],
	components: {
		DialogBody,
	},
	props: {
		title: {
			type: String,
			default: ""
		},
		text: {
			type: String,
			default: ""
		},
		cancelText: {
			type: String,
			default: ""
		},
		cancelEvent: {
			type: Function,
			default: null
		},
		okText: {
			type: String,
			default: ""
		},
		okEvent: {
			type: Function,
			default: null
		},
		styles: {
			type: Object,
			default: {
				"min-width": "200px"
			}
		},
		onClose: {
			type: Function,
			default: null
		}
	},
	data () {
		return {
			titleStyle: "text-align: center;",
			footStyle: "text-align: right;"
		}
	},
	created () {
		this.styles["z-index"] = this.getLayer();
	}
}