/*global QUnit*/

sap.ui.define([
    "sap/ui/model/resource/ResourceModel",
    "com/0x400/demo/formatter/InvoiceFormatter"
], function (ResourceModel, InvoiceFormatter) {
    QUnit.module("Formatting functions", {
        beforeEach: function () {
            this._oResourceModel = new ResourceModel({
                bundleUrl: sap.ui.require.toUrl("com/0x400/demo") + "/i18n/i18n.properties"
            });
        },
        afterEach: function () {
            this._oResourceModel.destroy();
        }
    });

    QUnit.test("Should return the translated texts", function (assert) {
        // Arrange
        var oControllerStub = {
            getView: this.stub().returns({
                getModel: this.stub().withArgs("i18n").returns(this._oResourceModel)
            })
        };
        var fnIsolatedFormatter = InvoiceFormatter.statusText.bind(oControllerStub);

        // Assert
        assert.strictEqual(fnIsolatedFormatter("A"), "New", "The long text for status A is correct");
        assert.strictEqual(fnIsolatedFormatter("B"), "In Progress", "The long text for status B is correct");
        assert.strictEqual(fnIsolatedFormatter("C"), "Done", "The long text for status C is correct");
        assert.strictEqual(fnIsolatedFormatter("Foo"), "Foo", "The long text for status Foo is correct");
    });


});
