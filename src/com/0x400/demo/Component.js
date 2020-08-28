sap.ui.define([
    "sap/ui/core/UIComponent",
    "sap/ui/model/json/JSONModel",
    "./controller/HelloDialog.controller"
], function (UIComponent, JSONModel, HelloDialog) {
    return UIComponent.extend("com.0x400.demo.Component", {
        metadata: {
            manifest: "json"
        },
        init: function () {
            UIComponent.prototype.init.apply(this);
            var oModel = new JSONModel({
                recipient: { firstName: "Pylon", lastName: "Syncher"}
            });
            this.setModel(oModel);
            // set common dialog
            this._helloDialog = new HelloDialog(this.getRootControl());

            // Create view based on url/hash
            this.getRouter().initialize();
        },
        exit: function () {
            this._helloDialog.destroy();
            delete this._helloDialog;
        },
        openHelloDialog: function () {
            this._helloDialog.open();
        }
    });
});
