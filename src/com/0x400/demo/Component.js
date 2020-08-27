sap.ui.define([
    "sap/ui/core/UIComponent",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/resource/ResourceModel"
], function (UIComponent, JSONModel, ResourceModel) {
    return UIComponent.extend("com.0x400.demo.Component", {
        metadata: {
            manifest: "json"
        },
        init: function () {
            UIComponent.prototype.init.apply(this);
            var oModel = new JSONModel({
                recipient: { firstName: "Pylon", lastName: "Syncher"}
            });
            this.setModel(oModel);
        }
    });
});
