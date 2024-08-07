import loading from "./loading";
import table from "./table";
import paging from "./paging";
import tree from "./tree";
import dialog from "./dialog";
import form from "./form/index";
import formItem from "./form/item";
import input from "./input/index";
import search from "./input/search";
import password from "./input/password";
import button from "./button";
import alert from "./alert";
import tag from "./tag";
import percent from "./percent";


import $message from "./message";

components = [
	form,
	formItem,
	input,
	password,
	search,
	alert,
	button,
	dialog,
	loading,
	paging,
	percent,
	table,
	tag,
	tree
];

export default {
	mount: (Vue) => {
		components.forEach(component => {
			Vue.component(component.name, component);
		});

		Vue.prototype.$message = $message;
	}
}