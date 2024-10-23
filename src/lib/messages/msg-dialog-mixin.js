import DialogBody from './../../components/dialog-body';

export default {
	components: {
		DialogBody,
	},
	data () {
		return {
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
				default: {}
			},
			onClose: {
				type: Function,
				default: null
			}
		}
	},
	data () {
		return {
			zIndex: 1010,
			titleStyle: "text-align: center;",
			footStyle: "text-align: right;"
		}
	}
}