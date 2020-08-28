sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "../formatter/InvoiceFormatter"
], function (Controller, JSONModel, InvoiceFormatter) {
    return Controller.extend("com.0x400.demo.controller.InvoiceList", {
        formatter: InvoiceFormatter,
        onInit: function () {
            var oModel = new JSONModel({
                currency: "ERU"
            });
            this.getView().setModel(oModel, "root");
        }
    });
});
