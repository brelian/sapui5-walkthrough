sap.ui.define([
    "sap/ui/core/mvc/XMLView"
], function(XMLView) {
    XMLView.create({
        viewName: "com.0x400.demo.App"
    }).then(function(oView) {
        oView.placeAt("content");
    });
});
