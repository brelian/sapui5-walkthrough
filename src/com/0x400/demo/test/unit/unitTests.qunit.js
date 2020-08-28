/* global QUnit */

QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
    "use strict";

    sap.ui.require([
        "com/0x400/demo/test/unit/formatter/InvoiceFormatter"
    ], function () {
        QUnit.start();
    });
});
