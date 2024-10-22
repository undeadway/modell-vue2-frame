import Mv2Loading from "./lib/loading";
import Mv2Table from "./lib/table";
import Mv2Paging from "./lib/paging";
import Mv2Tree from "./lib/tree";
import Mv2Modal from "./lib/modal";
import Mv2Form from "./lib/form/index";
import Mv2FormItem from "./lib/form/item";
import Mv2Input from "./lib/input/index";
import Mv2Search from "./lib/input/search";
import Mv2Password from "./lib/input/password";
import Mv2Button from "./lib/button";
import Mv2Notice from "./lib/notice";
import Mv2Tag from "./lib/tag";
import Mv2TabGroup from "./lib/tabs/group";
import Mv2TabItem from "./lib/tabs/item";
import Mv2Percent from "./lib/percent";
import Mv2Album from "./lib/album";
import Mv2Select from "./lib/select";
import Mv2Empty from "./lib/empty";
import Mv2Breadcrumb from "./lib/breadcrumb";
import Mv2DatetimePicker from "./lib/datetime-picker";
import Mv2Drawer from "./lib/drawer";
import Mv2Dropdown from "./lib/dropdown";

import messages from "./lib/messages";

const PAGE_COMPONENTS = [
	Mv2Form,
	Mv2FormItem,
	Mv2Input,
	Mv2Password,
	Mv2Search,
	Mv2Notice,
	Mv2Button,
	Mv2Modal,
	Mv2Loading,
	Mv2Paging,
	Mv2Percent,
	Mv2Table,
	Mv2Tag,
	Mv2Tree,
	Mv2TabGroup,
	Mv2TabItem,
	Mv2Album,
	Mv2Select,
	Mv2Empty,
	Mv2Breadcrumb,
	Mv2DatetimePicker,
	Mv2Drawer,
	Mv2Dropdown
];
const PROTOTYPE_COMPONENTS = [
	messages.$message,
	messages.$confirm,
	messages.$alert,
	messages.$prompt
];

const install =  (Vue) => {
	PAGE_COMPONENTS.forEach(component => {
		Vue.component(component.name, component);
	});

	PROTOTYPE_COMPONENTS.forEach(component => {
		const name = component.name.toLowerCase();
		Vue.prototype[name] = component;
	})
	
}

if (typeof window !== 'undefined' && window.Vue) {
	install(window.Vue);
}

export default {
	install,
	Mv2Form,
	Mv2FormItem,
	Mv2Input,
	Mv2Password,
	Mv2Search,
	Mv2Notice,
	Mv2Button,
	Mv2Modal,
	Mv2Loading,
	Mv2Paging,
	Mv2Percent,
	Mv2Table,
	Mv2Tag,
	Mv2Tree,
	Mv2TabGroup,
	Mv2TabItem,
	Mv2Album,
	Mv2Select,
	Mv2Empty,
	Mv2Breadcrumb,
	Mv2DatetimePicker,
	Mv2Drawer,
	Mv2Dropdown,
	Mv2Message: messages.$message,
	Mv2Confirm: messages.$confirm,
	Mv2Alert: messages.$alert,
	Mv2Prompt: messages.$prompt
}
