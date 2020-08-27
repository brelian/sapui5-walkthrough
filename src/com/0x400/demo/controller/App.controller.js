sap.ui.define([
    "sap/ui/core/mvc/Controller"
], function (Controller) {
    return Controller.extend("com.0x400.demo.controller.App", {
        onOpenDialog: function () {
            this.getOwnerComponent().openHelloDialog();
        }
    })
});
