import Vue from "vue";
import messageList from "./message-list";
import _confirm from "./confirm";
import _alert from "./alert";
import _prompt from "./prompt";

const ConfirmConstructor = Vue.extend(_confirm);
const AlertConstructor = Vue.extend(_alert);
const PromptConstructor = Vue.extend(_prompt);
const MessageConstructor = Vue.extend(messageList);

// 消息提示框
const instance = new MessageConstructor();
instance.$mount();
document.body.appendChild(instance.$el);

const $message = function (params) {
	const options = typeof params === "string" ? {
		message: params
	} :  params;

	options.type = options.type || "info";
	options.duration = options.duration || 5000;
	options.closeable = options.closeable === undefined ?  true : options.closeable;


	instance.add(options);
}

// 下面三个是模拟 html原生的三个组件
const $confirm = function (params) {

	const instance = new ConfirmConstructor();
	instance.$mount();
	document.body.appendChild(instance.$el);
	instance.$destory = () => {
		document.body.removeChild(instance.$el);
	}
}

const $alert = function (params) {

	const instance = new AlertConstructor();
	instance.$mount();
	document.body.appendChild(instance.$el);
	instance.$destory = () => {
		document.body.removeChild(instance.$el);
	}
}

const $prompt = function (params) {

	const instance = new PromptConstructor();
	instance.$mount();
	document.body.appendChild(instance.$el);
	instance.$destory = () => {
		document.body.removeChild(instance.$el);
	}
}

export default {
	$message,
	$confirm,
	$alert,
	$prompt
};