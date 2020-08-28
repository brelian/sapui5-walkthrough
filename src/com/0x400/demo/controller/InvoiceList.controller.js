sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "../formatter/InvoiceFormatter",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator"
], function (Controller, JSONModel, InvoiceFormatter, Filter, FilterOperator) {
    return Controller.extend("com.0x400.demo.controller.InvoiceList", {
        formatter: InvoiceFormatter,
        onInit: function () {
            var oModel = new JSONModel({
                currency: "ERU"
            });
            this.getView().setModel(oModel, "root");
        },
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
    });
});
