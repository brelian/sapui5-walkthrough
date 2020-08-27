sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast"
], function(Controller, MessageToast) {
    return Controller.extend("com.0x400.demo.App", {
        onPress: function () {
            MessageToast.show("Hello App!");
        }
    });
});
