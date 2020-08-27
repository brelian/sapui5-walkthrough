sap.ui.define([
    "sap/ui/core/UIComponent",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/resource/ResourceModel"
], function (UIComponent, JSONModel, ResourceModel) {
    return UIComponent.extend("com.0x400.demo.Component", {
        init: function () {
            UIComponent.prototype.init.apply(this);
            var oModel = new JSONModel({
                recipient: { firstName: "Pylon", lastName: "Syncher"}
            });
            this.setModel(oModel);

            var i18nModel = new ResourceModel({
                bundleName: "com.0x400.demo.i18n.i18n",
                supportedLocales: [""],
                fallbackLocale: ""
            });
            this.setModel(i18nModel, "i18n");
        }
    });
});
