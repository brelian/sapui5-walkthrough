sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
], function (Controller, MessageToast) {
    return Controller.extend("com.0x400.demo.controller.App", {
        onSayHello: function () {
            var oBundle = this.getView().getModel("i18n").getResourceBundle();
            var oModel = this.getView().getModel();
            var lastName = oModel.getProperty("/recipient/lastName");
            var firstName = oModel.getProperty("/recipient/firstName");
            var sMsg = oBundle.getText("helloMsg", [firstName, lastName]);
            MessageToast.show(sMsg);
        },
        onOpenDialog: function () {
            this.getOwnerComponent().openHelloDialog();
        },
    })
});
