import Vue from "vue";
import messageList from "./box";

const MessageConstructor = Vue.extend(messageList);

const instance = new MessageConstructor();
instance.$mount();
document.body.appendChild(instance.$el);

const Message = function (params) {
	const options = typeof params === "string" ? {
		message: params
	} :  params;

	options.type = options.type || "info";
	options.duration = options.duration || 5000;
	options.closeable = options.closeable === undefined ?  true : options.closeable;


	instance.add(options);
}

export default Message;