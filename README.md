SAPUI5 开发环境：

三种环境： SAP Web IDE / OpenUI5 / Node.js



OpenUI5 https://github.com/SAP/openui5-sample-app



1. 引入 UI5
2. 配置启动
3. Hello world



### manifest.json 配置

创建项目，

```shell
$ mkdir -p sapui5/walkthrough
$ cd sapui5/walkthrough
$ yarn init -y
yarn init v1.22.4
warning The yes flag has been set. This will automatically answer yes to all questions, which may have security implications.
success Saved package.json
Done in 0.05s.

$ mkdir -p src/com/0x400/demo
```



在项目入口路径 `src/com/0x400/demo` 下创建 `manifest.json` 配置文件，

*manifest.json*

```json
{
  "_version": "1.0.0",
  "sap.app": {
    "id": "com.0x400.demo",
    "type": "application"
  }
}
```

 

其中 id 表示【？？待补充】



### 创建启动文件 - index.html

在项目入口路径 `src/com/0x400/hello` 下创建 `index.html` 文件，

*index.html*

```html
<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<title>Quickstart Tutorial</title>
	<script id="sap-ui-bootstrap"
		src="resources/sap-ui-core.js"
		data-sap-ui-theme="sap_belize"
		data-sap-ui-libs="sap.m"
		data-sap-ui-resourceroots='{"com.0x400.demo": "./"}'
		data-sap-ui-onInit="module:com/0x400/demo/hello"
		data-sap-ui-compatVersion="edge"
		data-sap-ui-async="true">
	</script>
</head>
<body class="sapUiBody" id="content"></body>
</html>
```

`src="resources/sap-ui-core.js"` 使用相对路径引入 `sap-ui-core.js`，也就说项目启动后会在 http://\<host>:\<port>/resources/ 下找到 `sap-ui-core.js`，这是由 `ui5`  完成的。

`data-sap-ui-resourceroots='{"com.0x400.demo": "./"}'`  是将命名空间 `com.0x400.demo` 和当前的相对路径 `./` 进行映射。 【？？？ 待补充】

`data-sap-ui-onInit="module:com/0x400/demo/hello"` 指定启动文件是当前目录下的 `hello.js`。`com/0x400/demo` 是命名空间 `com.0x400.demo` 的路径表示，最终指向的是 `./` 路径。



创建 `hello.js` 文件，

*hello.js*

```js
sap.ui.define([
    "sap/m/Button",
    "sap/m/MessageToast"
], function(Button, MessageToast) {
    new Button({
        text: "Ready...",
        press: function () {
            MessageToast.show("Hello World");
        }
    }).placeAt("content");
});

```



### 使用 ui5 加载依赖

```shell
$ npm install --global @ui5/cli
```

创建 `ui5.yaml` 文件用于配置项目启动选项，

```shell
$ ui5 init
```

编辑 `ui5.yaml` ，确认项目类型为 `application`， 使用 `resources` 配置项目的启动路径，

*ui5.yaml*

```yaml
...
type: application
resources:
  configuration:
    paths:
      webapp: src/com/0x400/demo
...
```

使用 `ui5` 加载 SAPUI5 的核心文件和 `index.html` 中用到主题和 libs 

```shell
$ ui5 use sapui5@latest
$ ui5 add sap.ui.core sap.m themelib_sap_belize
```

在官网 https://sapui5.hana.ondemand.com/ 可以查阅 SAPUI5 的版本列表，选择其中一个版本安装。



### 启动

在 `scripts` 中添加启动脚本 `start: ui5 server`。

*package.json*

```json
{
  "name": "sapui5-walkthrough",
  "version": "1.0.0",
  "main": "index.js",
  "license": "MIT",
  "scripts": {
    "start": "ui5 serve"
  }
}

```

运行 `npm start` 启动项目。



### Git 提交

```shell
$ git init
```

创建 `.gitignore` 文件并添加如下内容，

*.gitignore*

```shell
# Logs
logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Dependency directories
node_modules/

dist/
.idea/

```

创建提交记录：

```shell
$ git add .
$ git commit -m "feat: ramp up sapui5"
```





## 笔记

使用 ui5 安装 libs

```shell
$ ui5 add sap.ui.layout sap.tnt
```



`sap.core.mvc.View`

`sap.m.App`

`sap.m.Page`

`sap.m.layout`





XML Views

- View 的名字大写开头
- 所有 View 都放在 view 目录下
- XML View 以 `.view.xml` 结尾
- View 的默认命名空间为 `sap.m`
- 其他命名空间一般以最后一部分作为别名，如 mvc => sap.ui.core.mvc



【sap.ui.define ？？】

sap.ui.define 用于定义 JS 模块，所定义的模块遵循 AMD 模块化标准。 



Step 7:

使用 `"{/recipient/name}"` 绑定根 Model 的数据。`{...}` 表示渲染的数据来自 Model 中，这也叫做数据绑定。

```shell
<Input
    value="{/recipient/lastName}"
    description="Hello {/recipient/lastName}"
    valueLiveUpdate="true"
    width="30%" />
```

普通的数据绑定属性的值只能包含绑定模式 (binding pattern) ，如果想要除了绑定模式之外还支持其他内容填充，则需要开启兼容模式。即在 `index.html` 中添加 `data-sap-ui-compatVersion="edge"`



Step 8:

所有的 Model 都由 getProperty 方法，用于取对应路径的值。通过调用 ResourceModel 的 `getResourceBundle` 方法取得 resouce bundle。 resouce bundle 提供 getText 方法，其中第二个参数是一个字符串类型的数组，用于替换资源文件中的 `{0} {1} {2} ...` 。

如 

```js
onSayHello: function () {
    var oBundle = this.getView().getModel("i18n").getResourceBundle();
    var oModel = this.getView().getModel();
    var lastName = oModel.getProperty("/recipient/lastName");
    var firstName = oModel.getProperty("/recipient/firstName");
    var sMsg = oBundle.getText("helloMsg", [firstName, lastName]);
    MessageToast.show(sMsg);
}
```



Step 9: Component Configuration

- ComponentContainer

- UIComponent

  UIComponent 通过 metedata.rootView 指定 rootView，也可以在 `manifest.json` 配置 rootView ，然后创建 Component 时开启 `manifest: true` 选项。

  *manifest.json*

  ```json
  ... 
    "sap.ui5": {
      "_version": "1.0.1",
      "rootView": {
        "viewName": "com.0x400.demo.view.App",
        "type": "XML",
        "async": true,
        "id": "app"
      }
    }
  ...
  ```

   *index.js*

  ```js
  sap.ui.define([
      "sap/ui/core/ComponentContainer"
  ], function (ComponentContainer) {
      "use strict";
  
      new ComponentContainer({
          name: "com.0x400.demo",
          manifest: true,
          async: true
      }).placeAt("content");
  });
  ```

  



Step 10: Descriptor for Applications

将应用的配置统一放入 `manifest.json` 文件中，配置和业务代码分离，使得应用更加灵活。`manifest.json` 分为如下几个部分：

**sap.app**

- `id` (mandatory): 应用的**命名空间**， 和 `index.html` 中的 resourceroots` 一致。
- `type`: 应用的类型，可以是 libary, application 等。
- `i18n`:  resource bundle 的路径， 我理解是 default??? 【待确认？？】
- `title`:  应用名字，使用 `{{your-title-key}}` 从 resource bundle 中引入
- `description`: 应用描述
- `applicationVersion`:  应用版本



**sap.ui**

- `technology`: ？？【待确认】
- `deviceTypes`: 适配的设备类型，一般而言 desktop, tablet, phone 都默认适配。

**sap.ui5**

- `rootView`:  配置 rootView， Component 会默认加载该配置所指向的 view。
- `dependencies`:  项目依赖，【待确认 libs】
- `models`: 该属性可以定义全局的默认加载的 model，一般用于自动加载 i18n model。 key 为 model 的名字，使用命名空间定义 model 的加载路径。如  `"bundleName": "com.0x400.demo.i18n.i18n"` 表示在 `com/0x400/demo/i18n/` 下查找 `i18n.properties` 文件作为 resource model 加载的文件资源。





使用 `sap.ui.core.ComponentSupport` 



Step 11:  Pages and Panels

```xml
<App>
    <pages>
        <Page title="{i18n>pageTitle}">
            <content>
                <Panel headerText="{i18n>helloPanelTitle}">
                    <content>
                        <Button text="{i18n>showHelloButtonText}" />
                    </content>
                </Panel>
            </content>
        </Page>
    </pages>
</App>
```

 

小写为 aggregations，大写为组件。如 pages 是 sap.m.App 的一个 0...n 的 aggregation。 sap.m.Page 和 sap.m.Panel 都由一个 0...n 的 aggregation， 0...n 表示可以聚合多个控件。`displayBlock` 用于矫正全屏时候的高度。



Step 12: Shell

使用 Shell 作为最外层容器，宽屏显示时 Shell 会自动缩放成一个“信封”样式。



Step 12: Margins and Paddings

使用 SAPUI5 提供的默认 CSS 标准类，`sapUiResponsiveMargin`，`sapUiSmallMarginEnd`， `sapUiSmallMargin` 自动调节 Margins 和 Paddings。

`sapUiResponsiveMargin`  会随着窗口大小的改变而自适应调整 Margin。