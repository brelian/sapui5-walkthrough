sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/ui/model/json/JSONModel"
], function(Controller, MessageToast, JSONModel) {
    return Controller.extend("com.0x400.demo.App", {
        onPress: function () {
            MessageToast.show("Hello App!");
            this.byId("app").to(this.byId("intro"));
        },
        onInit: function () {
            var oModel = new JSONModel({
                features: [
                    "Enterprise-Ready Web Toolkit",
                    "Powerful Development Concepts",
                    "Feature-Rich UI Controls",
                    "Consistent User Experience",
                    "Free and Open Source",
                    "Responsive Across Browsers and Devices"
                ]
            });
            this.getView().setModel(oModel);
        },
        onChange: function (oEvent) {
            var bState = oEvent.getParameter("state");
            this.byId("ready").setVisiable(bState);
        }
    });
});
