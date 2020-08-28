sap.ui.define([
    "sap/ui/core/util/MockServer",
    "sap/base/util/UriParameters"
], function (MockServer, UriParameters) {

    return {
        init: function () {
            var oMockerServer = new MockServer({
                rootUri: "https://services.odata.org/V2/Northwind/Northwind.svc/"
            });

            var oUriParameters = new UriParameters(window.location.href);

            MockServer.config({
                autoRespond: true,
                autoRespondAfter: oUriParameters.get("serverDelay") || 400
            });

            var sPath = "../localService";
            oMockerServer.simulate(sPath + "/metadata.xml", sPath + "/mockdata");

            oMockerServer.start();
        }
    };
});
