sap.ui.define([], function () {
    return {
        statusText: function (sStutus) {
            var oBundle = this.getView().getModel("i18n").getResourceBundle();
            switch (sStutus) {
                case "A":
                    return oBundle.getText("invoiceStatusA");
                case "B":
                    return oBundle.getText("invoiceStatusB");
                case "C":
                    return oBundle.getText("invoiceStatusC");
                default:
                    return sStutus;
            }
        }
    }
});
