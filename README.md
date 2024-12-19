# 概况

**modell-vue2-frame** 是自我学习用的一个 **`Vue`** 前端框架，暂时只实现 vue2 。  
目前只支持 web 端，不支持移动端。
所以也没有任何国际化的考虑。

只实现每种组件最核心的功能，所以不会太复杂。
至于各种功能，则是我想到什么了加什么，我有什么新需求了加什么。

因为是自我学习的框架，所以没有任何质保。  
不爽你顺着网线过来咬我啊！

>(一句话：)
> You can you up, No can no BB!

## 实现组件

* 表格
* 输入框
  * 密码输入
  * 搜索框
* 文本框
* 选择器
* 下拉菜单
* 按钮
* 按钮组
* 加载提示
* 标签
* 标签页
* 百分比
* 消息提示
* 告示
* 对话框
* 危险操作确认
* 抽屉
* 分页
* 相册
* 表单
* 树
* 空状态
* 面包屑
* 时间选择器（未完成）
* 回到顶部

所有组件分为 `基础组件` 和 `组合组件` 两种。

基础组件可以独立运行。  
目的是提供最基础的功能。

组合组件是通过若干个独立组件或组合组件组合而成的组件。  
目的是提供一些快捷或者实用的功能。

## 参照对象

* [ElementUI](https://element.eleme.cn/#/zh-CN)
* [Ant Design Vue](https://www.antdv.com/docs/vue/introduce-cn)
* [Vant](https://youzan.github.io/vant/v2/)

## 项目地址

* [https://github.com/undeadway/modell-vue2-frame](https://github.com/undeadway/modell-vue2-frame)
* [https://gitee.com/undeadway/modell-vue2-frame](https://gitee.com/undeadway/modell-vue2-frame)

## 实例

* [http://blog.waygc.net](http://blog.waygc.net)
* [http://trails.waygc.net](http://trails.waygc.net)

# 安装

1\. 加载依赖包

暂时不提供 DSN 安装，请使用 NPM/YARN 等，通过 git 安装。

```JSON
{
  "dependencies": {
    "modell-vue2-frame": "git+https://gitee.com/undeadway/modell-vue2-frame#dev"
  }
}
```

2\. 导入相关文件和初始化

在 `main.js` 中导入 modell-vue2-frame 。

```JavaScript
import ModellVue2Frame from "modell-vue2-frame";
Vue.use(ModellVue2Frame);
```

然后在 vue.config.js 中引入 `modell.scss`。

```JavaScript
	css: {
		loaderOptions: {
			scss: {
				prependData: `@import "modell-vue2-frame/src/assets/styles/modell.scss";`
			}
		}
	}
```

这样就完了对 modell-vue2-frame 的引入，然后就可以可以开始编写代码了。  
各个组件具体的使用方法，请参考各组件的详细说明。

每个组件都给出了实现的代码和基本的说明。  
如果看不懂文档，那我也没办法，语文太差，写不好文档。

# 其他

本 Demo 所有 Markdown 均采用自造的轮子 [HitOn](https://github.com/undeadway/hiton) 进行解析。
