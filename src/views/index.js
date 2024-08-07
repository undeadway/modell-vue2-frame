import loading from "./loading";
import ListTable from "./table";
import paging from "./paging";
import tree from "./tree";
import dialog from "./dialog";
import form from "./form/index";
import formItem from "./form/item";
import input from "./input/index";
import search from "./input/search";
import password from "./input/password";
import button from "./button";
import progress from "./progress";
import $message from "./message";
import alert from "./alert";
import tag from "./tag";

export default {
	mount: (Vue) => {
		Vue.component("MdlLoading", loading);
		Vue.component("MdlTable", ListTable);
		Vue.component("MdlPaging", paging);
		Vue.component("MdlTree", tree);
		Vue.component("MdlDialog", dialog);
		Vue.component("MdlForm", form);
		Vue.component("MdlFormItem", formItem);
		Vue.component("MdlInput", input);
		Vue.component("MdlSearch", search);
		Vue.component("MdlInputPassword", password);
		Vue.component("MdlButton", button);
		Vue.component("MdlProgress", progress);
		Vue.component("MdlAlert", alert);
		Vue.component("MdlTag", tag);

		Vue.prototype.$message = $message;
	}
}