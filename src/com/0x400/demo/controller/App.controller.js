sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/resource/ResourceModel"
], function (Controller, MessageToast, JSONModel, ResourceModel) {
    return Controller.extend("com.0x400.demo.controller.App", {
        onInit: function() {
            var oModel = new JSONModel({
                recipient: { firstName: "Pylon", lastName: "Syncher"}
            });
            this.getView().setModel(oModel);

            var i18nModel = new ResourceModel({
                bundleName: "com.0x400.demo.i18n.i18n",
                supportedLocales: [""],
                fallbackLocale: ""
            });
            this.getView().setModel(i18nModel, "i18n");
        },
        onSayHello: function () {
            var oBundle = this.getView().getModel("i18n").getResourceBundle();
            var oModel = this.getView().getModel();
            var lastName = oModel.getProperty("/recipient/lastName");
            var firstName = oModel.getProperty("/recipient/firstName");
            var sMsg = oBundle.getText("helloMsg", [firstName, lastName]);
            MessageToast.show(sMsg);
        }
    })
});
