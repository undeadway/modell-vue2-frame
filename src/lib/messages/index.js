import Vue from "vue";
import messageList from "./message-list";
import confirmVue from "./confirm";
import alertVue from "./alert";
import promptVue from "./prompt";

const MessageConstructor = Vue.extend(messageList);
const ConfirmConstructor = Vue.extend(confirmVue);
const AlertConstructor = Vue.extend(alertVue);
const PromptConstructor = Vue.extend(promptVue);

// 消息提示框
const instance = new MessageConstructor();
instance.$mount();
document.body.appendChild(instance.$el);

export const $message = function (params) {
	const options = typeof params === "string" ? {
		message: params
	} :  params;

	options.type = options.type || "info";
	options.duration = options.duration || 5000;
	options.closeable = options.closeable === undefined ?  true : options.closeable;

	instance.add(options);
}

// 下面三个是模拟 html原生的三个组件
export const $alert = function (params) {

	const instance = new AlertConstructor();
	instance.title = params.title || "示警提示";
	instance.text = params.text;
	instance.styles = Object.assign(instance.styles, params.styles);
	instance.okText = params.buttonText || "确定";

	instance.onClose = instance.$destory = () => {
		document.body.removeChild(instance.$el);
	}

	const promise = new Promise((resolve, reject) => {
		instance.okEvent = () => {
			instance.onClose();
			resolve();
		};
		instance.cancelEvent = () => {
			instance.onClose();
			reject();
		};
	});
	
	instance.$mount();
	document.body.appendChild(instance.$el);

	return promise;
}

export const $confirm = function (params) {

	const instance = new ConfirmConstructor();
	instance.title = params.title || "确认提示";
	instance.text = params.text;
	instance.styles = Object.assign(instance.styles, params.styles);
	instance.okText = params.okText;
	instance.cancelText = params.cancelText;

	instance.onClose = instance.$destory = () => {
		document.body.removeChild(instance.$el);
	}

	const promise = new Promise((resolve, reject) => {
		instance.okEvent = () => {
			instance.onClose();
			resolve();
		};
		instance.cancelEvent = () => {
			instance.onClose();
			reject();
		};
	});
	
	instance.$mount();
	document.body.appendChild(instance.$el);

	return promise;
}

export const $prompt = function (params) {

	const instance = new PromptConstructor();
	instance.title = params.title || "输入提示";
	instance.text = params.text;
	instance.styles = Object.assign(instance.styles, params.styles);
	instance.okText = params.okText;
	instance.cancelText = params.cancelText;
	instance.defaultValue = params.defaultValue;

	instance.onClose = instance.$destory = () => {
		document.body.removeChild(instance.$el);
	}

	const promise = new Promise((resolve, reject) => {
		instance.okEvent = (message) => {
			instance.onClose();
			resolve(message);
		};
		instance.cancelEvent = () => {
			instance.onClose();
			reject();
		};
	});
	
	instance.$mount();
	document.body.appendChild(instance.$el);

	return promise;
}

export default {
	$message,
	$confirm,
	$alert,
	$prompt
};