sap.ui.define([
    "sap/ui/core/ComponentContainer"
], function (ComponentContainer) {
    "use strict";

    new ComponentContainer({
        name: "com.0x400.demo",
        manifest: true,
        async: true
    }).placeAt("content");
});
