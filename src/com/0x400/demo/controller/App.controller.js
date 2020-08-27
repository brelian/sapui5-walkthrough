sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/ui/model/json/JSONModel"
], function (Controller, MessageToast, JSONModel) {
    return Controller.extend("com.0x400.demo.controller.App", {
        onInit: function() {
            var oModel = new JSONModel({
                recipient: { firstName: "Pylon", lastName: "Syncher"}
            });
            this.getView().setModel(oModel);
        },
        onSayHello: function () {
            MessageToast.show("Hello");
        }
    })
});
