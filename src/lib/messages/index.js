import Vue from "vue";
import messageList from "./message-list";
import confirmVue from "./confirm";
import alertVue from "./alert";
import promptVue from "./prompt";

import { initStyles } from "./../../utils/utils";

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
export const $confirm = function (params) {

	const instance = new ConfirmConstructor();
	instance.title = params.title;
	instance.text = params.text;
	instance.styles = Object.assign({
		"min-width": "200px"
	}, params.styles);
	instance.okTxt = params.okTxt;
	instance.cancelTxt = params.cancelText;
	instance.okText = params.okText;
	instance.styles = params.styles;
	instance.titleStyle = initStyles(params.style.title);
	instance.footStyle = params.style.foot;

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

export const $alert = function (params) {

	const instance = new AlertConstructor();

	instance.title = params.title;
	instance.text = params.text;
	instance.okTxt = params.okTxt;
	instance.cancelTxt = params.cancelText;
	instance.styles = params.styles;
	instance.titleStyle = initStyles(params.style.title);
	instance.footStyle = params.style.foot;

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

	instance.title = params.title;
	instance.text = params.text;
	instance.okTxt = params.okTxt;
	instance.cancelTxt = params.cancelText;
	instance.styles = params.styles;
	instance.titleStyle = initStyles(params.style.title);
	instance.footStyle = params.style.foot;

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

export default {
	$message,
	$confirm,
	$alert,
	$prompt
};