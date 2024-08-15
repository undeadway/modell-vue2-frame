import Loading from "./lib/loading";
import Table from "./lib/table";
import Paging from "./lib/paging";
import Tree from "./lib/tree";
import Modal from "./lib/modal";
import Form from "./lib/form/index";
import FormItem from "./lib/form/item";
import Input from "./lib/input/index";
import Search from "./lib/input/search";
import Password from "./lib/input/password";
import Button from "./lib/button";
import Alert from "./lib/alert";
import Tag from "./lib/tag";
import TabGroup from "./lib/tabs/group";
import TabItem from "./lib/tabs/item";
import Percent from "./lib/percent";
import Album from "./lib/album";
import Select from "./lib/select";
import Empty from "./lib/empty";

import $message from "./lib/message";

const PAGE_COMPONENTS = [
	Form,
	FormItem,
	Input,
	Password,
	Search,
	Alert,
	Button,
	Modal,
	Loading,
	Paging,
	Percent,
	Table,
	Tag,
	Tree,
	TabGroup,
	TabItem,
	Album,
	Select,
	Empty
];
const PROTOTYPE_COMPONENTS = [
    $message
];

const install =  (Vue) => {
	PAGE_COMPONENTS.forEach(component => {
		Vue.component(component.name, component);
	});

    PROTOTYPE_COMPONENTS.forEach(component => {
        Vue.prototype[`$${component.name}`] = component;
    })
	
}

if (typeof window !== 'undefined' && window.Vue) {
	install(window.Vue);
}

export default {
	install,
	Form,
	FormItem,
	Input,
	Password,
	Search,
	Alert,
	Button,
	Modal,
	Loading,
	Paging,
	Percent,
	Table,
	Tag,
	Tree,
	TabGroup,
	TabItem,
	Select,
	Empty
}