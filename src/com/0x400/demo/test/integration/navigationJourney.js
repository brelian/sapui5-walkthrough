/*global QUnit, opaTest*/

sap.ui.define([
    "com/0x400/demo/localService/mockServer",
    "sap/ui/test/opaQunit",
    "./pages/App"
], function (mockServer) {
    "use strict";

    QUnit.module("Navigation", {
        before: function () {
            // initialize the mock server
            mockServer.init();
        }
    });

    opaTest("Should open the Hello dialog", function (Given, When, Then) {

        // Arrangements
        Given.iStartMyUIComponent({
            componentConfig: {
                name: "com.0x400.demo"
            }
        });

        //Actions
        When.onTheAppPage.iPressTheSayHelloWithDialogButton();

        // Assertions
        Then.onTheAppPage.iShouldSeeTheHelloDialog();

        // Cleanup
        Then.iTeardownMyApp();
    });
});
