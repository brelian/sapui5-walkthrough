sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/ui/core/Fragment"
], function (Controller, MessageToast, Fragment) {
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
            var oView = this.getView();

            if(!this.byId("helloDialog")) {
                Fragment.load({
                    id: oView.getId(),
                    name: "com.0x400.demo.view.HelloDialog",
                    controller: this
                }).then(function (oDialog) {
                    oView.addDependent(oDialog);
                    oDialog.open();
                });
            } else {
                this.byId("helloDialog").open();
            }
        },
        onCloseDialog: function () {
            this.byId("helloDialog").close();
        }
    })
});
