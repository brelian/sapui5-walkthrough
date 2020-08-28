sap.ui.define([
    "../localService/mockserver"
], function (mockserver) {
    mockserver.init();

    // initialize the embedded component on the HTML pag
    sap.ui.require(["sap/ui/core/ComponentSupport"]);
});
