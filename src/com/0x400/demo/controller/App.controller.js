sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast"
], function (Controller, MessageToast) {
    return Controller.extend("com.0x400.demo.controller.App", {
        onSayHello: function () {
            MessageToast.show("Hello");
        }
    })
});
