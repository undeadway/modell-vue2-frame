import Loading from "./lib/loading";
import Table from "./lib/table";
import Paging from "./lib/paging";
import Tree from "./lib/tree";
import Dialog from "./lib/dialog";
import Form from "./lib/form/index";
import FormItem from "./lib/form/item";
import Input from "./lib/input/index";
import Search from "./lib/input/search";
import Password from "./lib/input/password";
import Button from "./lib/button";
import Alert from "./lib/alert";
import Tag from "./lib/tag";
import Percent from "./lib/percent";

import $message from "./lib/message";

const PAGE_COMPONENTS = [
	Form,
	FormItem,
	Input,
	Password,
	Search,
	Alert,
	Button,
	Dialog,
	Loading,
	Paging,
	Percent,
	Table,
	Tag,
	Tree
];
const PROTOTYPE_COMPONENTS = [
    $message
];

const mount =  (Vue) => {
	PAGE_COMPONENTS.forEach(component => {
		Vue.component(component.name, component);
	});

    PROTOTYPE_COMPONENTS.forEach(component => {
        Vue.prototype[`${component.name}`] = component;
    })
	
}

export default {
	mount,
	Form,
	FormItem,
	Input,
	Password,
	Search,
	Alert,
	Button,
	Dialog,
	Loading,
	Paging,
	Percent,
	Table,
	Tag,
	Tree
}