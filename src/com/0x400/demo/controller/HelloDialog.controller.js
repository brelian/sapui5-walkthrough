sap.ui.define([
    "sap/ui/base/ManagedObject",
    "sap/ui/core/Fragment"
], function (ManagedObject, Fragment) {
    return ManagedObject.extend("com.0x400.demo.controller.HelloDialog",{
        constructor: function (oView) {
            this._oView = oView;
        },

        exit: function () {
            delete this._oView;
        },

        open: function () {
            var oView = this._oView;

            if(!oView.byId("helloDialog")) {
                Fragment.load({
                    id: oView.getId(),
                    name: "com.0x400.demo.view.HelloDialog",
                    controller: this
                }).then(function (oDialog) {
                    oView.addDependent(oDialog);
                    oDialog.open();
                });
            } else {
                oView.byId("helloDialog").open();
            }
        },
        onCloseDialog : function () {
            this._oView.byId("helloDialog").close();
        }
    });
});
