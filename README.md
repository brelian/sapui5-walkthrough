## 项目启动

```shell
git clone https://github.com/brelian/sapui5-walkthrough.git
cd sapui5-walkthrough
npm run proxy & # 启动代理，处理 CORS 问题
npm start
```



查阅 Git 提交记录 https://github.com/brelian/sapui5-walkthrough/commits/master 没次提交对应 Walkthrough 的一个步骤。



## 学习笔记

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



Step 13: 自定义 CSS

*manifest.json*

```shell
  "sap.ui5": {
	...
    "models": {
		...
    },
    "resources": {
      "css": [
        {
          "uri": "css/style.css"
        }
      ]
    }
  },
...
```

使用 resources 指定自定义 css 的路径，自定义的 css 可以有很多个，所以 css 是一个数组。



Step 15: 嵌套的 Views

将 Panel 拆分成一个 View，并在 App.view.xml 中引入

```js
<mvc:XMLView viewName="sap.ui.demo.walkthrough.view.HelloPanel"/>
```



Step 16: Dialogs and Fragments

Fragments 是一些可复用的组件，这些组件没有 Controller。

使用`sap.ui.core.FragmentDefinition` 定义 Fragment，如

```xml
<core:FragmentDefinition
   xmlns="sap.m"
   xmlns:core="sap.ui.core" >
   <Dialog
      id="helloDialog"
      title="Hello {/recipient/name}">
   </Dialog>
</core:FragmentDefinition>
```

在 HelloPanel.view.xml 中有个 Button，点击时会弹出对话框，

```xml
<Button
        id="helloDialogButton"
        text="{i18n>openDialogButtonText}"
        press=".onOpenDialog"
        class="sapUiSmallMarginEnd"/>
```

在 HelloPanel.controller.js 中定义 onOpenDialog 方法用于打开对话框，

```js
...
		onOpenDialog: function () {
            var oView = this.getView();

            if(!this.byId("helloDialog")) {
                Fragment.load({
                    id: oView.getId(),
                    name: "com.0x400.demo.view.HelloDialog"
                }).then(function (oDialog) {
                    oView.addDependent(oDialog);
                    oDialog.open();
                });
            } else {
                this.byId("helloDialog").open();
            }
        }
...
```

该方法中使用 sap.ui.core.Fragment 加载相应的 fragments。通过 `oView.addDependent(oDialog)` 将 Dialog 和 View 进行连接，从而使得定义 Dialog 的 Fragments 中可以读到 oView 上的 Model 完成数据绑定。



Step 17: Fragments callbacks

```js
Fragment.load({
    id: oView.getId(),
    name: "com.0x400.demo.view.HelloDialog",
    controller: this
});
```

加载 fragments 时，使用 controller 参数传递 fragments 的 controller。（因为 fragments 没有特定的 controller）。

Steps 18: Icons

使用 sap.ui.core.Icon  引入 SAPUI5 内置的 icon, 通过设置 src 属性为 `sap-icon://<iconname>` 选择要引入的 Icon。请查阅 [Icon Explore](https://sapui5.hana.ondemand.com/test-resources/sap/m/demokit/iconExplorer/webapp/index.html) 找到你想要的 Icon。



Step 19: Reuse Dialogs

目前我们将 Dialog 抽离出来了，Dialog 的用户交互事件仍然在 App.controller 中处理。如果想要在别的地方复用这个 Dialog 那么就必须再次将用户交互逻辑拷贝到相应的 Controller 中，这导致了大量的代码冗余。为了更好的复用 Dialog，我们可以将这部分公共的用户交互逻辑提升到 Component 一级。



Step 20: Aggregation bindings

 在 manifest.json 中添加一个 JSONModel invoice，

*manifest.json*

```json
 "invoice": {
		"type": "sap.ui.model.json.JSONModel",
		"uri": "model/Invoices.json"
	}
```

其中 uri 指向的是相对于 Component 的资源路径。

创建一个 InvoiceList.view.xml，

*view/InvoiceList.view.xml*

```xml
<mvc:View
   xmlns="sap.m"
   xmlns:mvc="sap.ui.core.mvc">
   <List
      headerText="{i18n>invoiceListTitle}"
      class="sapUiResponsiveMargin"
      width="auto"
      items="{invoice>/Invoices}" >
      <items>
         <ObjectListItem
            title="{invoice>Quantity} x {invoice>ProductName}"/>
      </items>
   </List>
</mvc:View>
```

items aggregation 和 invoice model 通过 `items="{invoice>/Invoices}"`的 Invoices 资源进行了绑定，这种绑定叫做 Aggregation Binding。`ObjectListItem` 定义了每个 item 的渲染模板，使用绑定的 model 名字 + `>` 取数据，如 `invoice>Quantity` 表示 invoice model 中的 Invoices 数组下每个元素中的 Quantity 属性。



Step 21: Data Types

sap.ui.model.type 下有支持的数据类型，使用 format 属性可以自定义 format 函数用于格式化显示输入数据。

Step 22: Express Binding

`${model>pattern}` 使用 `$` + model pattern 可以以此作为表达式运算的单元，因此可以对属性绑定的数据进行表达式运算，这种绑定叫做 Expression Binding。

```
propertyName="{= ${model>pattern} }"
```



Step 23: Custom Formatters

属性绑定的数据可以使用 format 进行格式化，自定义的格式化函数一般放在 model/formatter.js 下。



Step 24: Filtering

List 有一个0..1 的 headerToolbar aggregation，里面允许装填一个 Toolbar，Toolbar 里面使用 SearchField 可以构造搜索输入框。

使用 `oEvent.getParameter("query")` 获取搜索框的用户输入，使用 sap.ui.model.Filter 构造过滤器，并使用 `Binding.filter()` 方法应用它。

```js
onFilterInvoices: function (oEvent) {
    var aFilter = [];
    var sQuery = oEvent.getParameter("query");

    if (sQuery) {
        aFilter.push(new Filter("ProductName", FilterOperator.Contains, sQuery));
    }

    var oList = this.byId("invoiceList");
    var oBinding = oList.getBinding("items");
    oBinding.filter(aFilter);
}
```



Step 25: Sorting and Grouping

使用 Aggregation  Binding 时，可以通过 `sorter` 属性指定排序规则，如

```js
items="{
	path: 'invoice>/Invoices',
    sorter: {
        path: 'ShipperName',
        group: true
    }
}"
```

sorter 是一个对象，可以用 `descending` 降序排列，使用 `group` 将相同数据分组。



Step 26: Remote OData Service

在 *manifest.json* 文件的 `sap.app` 中，可以通过 `dataSources` 属性配置远程数据源，并在 `sap.ui5` 的 models 中通过指定的 key 使用配置好的数据源。如下配置一个 invoiceRemote 的 OData 类型的数据源，

*manifest.json*

```json
...
  "sap.app": {
    ...
    "dataSources": {
      "invoiceRemote": {
        "uri": "https://services.odata.org/V2/Northwind/Northwind.svc/",
        "type": "OData",
        "settings": {
          "odataVersion": "2.0"
        }
      }
    }
    ...
  }
...
```

*Component.js* 初始化项目时会根据以上配置自动创建一个 sap.ui.model.odata.v2.ODataModel，并以 `invoice` 作为 model 名字注册到全局。

遇到跨域问题请参考 https://sapui5.hana.ondemand.com/#/topic/5bb388fc289d44dca886c8fa25da466e.html#loio5bb388fc289d44dca886c8fa25da466e/CORSAnywhere



Step 27: Mock Server Configuration

创建 *test/mockServer.html* 文件，内容与 *index.html* 近乎相同，用于启动 MockServer，不同的是 `data-sap-ui-oninit` 指向的是 MockerServer

创建 localService 目录，包含如下文件，

```shell
localService
├── metadata.xml // http://services.odata.org/V2/Northwind/Northwind.svc/$metadata
├── mockServer.js
└── mockdata
    └── Invoices.json
```

使用 sap.ui.core.util.MockServer 创建 MockServer



Step 28: Unit Test with QUnit

*InvoiceFormatter.js* 中引用了 this 对象，this 对象实际上是一个 Controller，因此我们需要构造一个 controller

```js
// Arrange
var oControllerStub = {
    getView: this.stub().returns({
        getModel: this.stub().withArgs("i18n").returns(this._oResourceModel)
    })
};
var fnIsolatedFormatter = InvoiceFormatter.statusText.bind(oControllerStub);
```



在 *test/unit/unitTests.qunit.html* 中配置 QUnit 等测试框架的版本，在 *test/unit/unitTests.qunit.js* 中加载单元测试的类。



Step 29: Integration Test with OPA

在 test 目录下新建目录 integration，

```
├── navigationJourney.js
├── opaTests.qunit.html
├── opaTests.qunit.js
└── pages
    └── App.js
```

使用 Given - When - Then 的模式创建 OPA 测试。*pages/App.js* 中使用 `Opa5.createPageObjects()` 创建一个 Page 对象， actions 中定义的方法使用 When 调用，assertions 中定义的方法使用 Then 调用。



Step 30: Debugging Tools

 CTRL + ALT + SHIFT + S: 打开 Debug 窗口



Step 31: Routing and Navigation

使用 sap.m.routing.Router 自动管理路由，在 *manifest.json* 中添加三个属性 `config` 、`routes`  和 `targets`。

- `config`

  全局路由信息配置，包括 View 的类型，View 的路径，是否同步加载 View 等配置。

- `routes`

  每个路由都都名字，模式和一个或多个 targets 组成，当 URL 匹配到模式时，自动加载 target 指向的 view.

- `targets`

  定义 view 的 ID 和 Name。



在 Component.js 中使用 `this.getRouter()` 获取全局注册的路由，在 Controller 中使用 `sap.ui.core.UIComponent.getRouterFor(this)` 获取路由，使用 `Router.navTo()` 导航到新的页面。



Step 32: Routing with Parameters

oEvent.getSource(): 返回被点击的 ObjectListItem 控件。

sap.ui.model.Context:  绑定上下文



Step 33: Routing back and History

使用  sap.ui.core.routing.History 接管页面的浏览历史记录。

