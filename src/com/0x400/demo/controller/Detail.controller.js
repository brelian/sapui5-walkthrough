sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/routing/History",
    "sap/m/MessageToast",
    "sap/ui/core/UIComponent"
], function (Controller, History, MessageToast, UIComponent) {
    "use strict";
    return Controller.extend("com.0x400.demo.controller.Detail", {
        onInit: function () {
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.getRoute("detail").attachPatternMatched(this._onObjectMatched, this);
        },
        _onObjectMatched: function (oEvent) {
            this.byId("rating").reset();
            this.getView().bindElement({
                path: "/" + window.decodeURIComponent(oEvent.getParameter("arguments").invoicePath),
                model: "invoice"
            });
        },

        onRatingChange: function(oEvent) {
            var fValue = oEvent.getParameter("value");
            var oBundle = this.getView().getModel("i18n").getResourceBundle();

            MessageToast.show(oBundle.getText("ratingConfirmation", [fValue]));
        },
        onNavBack: function () {
            var oHistory = History.getInstance();
            var sPreviousHash = oHistory.getPreviousHash();

            if (sPreviousHash !== undefined) {
                window.history.go(-1);
            } else {
                var oRouter = UIComponent.getRouterFor(this);
                oRouter.navTo("overview", {}, true);
            }
        }
    });
});
