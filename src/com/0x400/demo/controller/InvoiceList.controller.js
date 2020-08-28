sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
], function (Controller, JSONModel) {
    return Controller.extend("com.0x400.demo.controller.InvoiceList", {
        onInit: function () {
            var oModel = new JSONModel({
                currency: "ERU"
            });
            this.getView().setModel(oModel, "root");
        }
    });
});
