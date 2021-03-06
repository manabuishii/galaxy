/* global define */
define(["qunit/test-app", "mvc/history/hda-model", "jquery", "sinon"], function(testApp, HDA_MODEL, $, sinon) {
    HDA_MODEL = HDA_MODEL.default;
    QUnit.module("History Contents Model QUnit.Tests");

    QUnit.test("HDA Constructions with Default Attributes", function(assert) {
        var hda = new HDA_MODEL.HistoryDatasetAssociation({});
        assert.equal(hda.get("name"), "(unnamed dataset)");
        assert.equal(hda.get("state"), "new");
    });

    QUnit.test("HDA Construction with Supplied Attributes", function(assert) {
        var hda = new HDA_MODEL.HistoryDatasetAssociation({
            history_content_type: "dataset",
            name: "my dataset",
            state: "ok"
        });
        assert.equal(hda.get("name"), "my dataset");
        assert.equal(hda.get("state"), "ok");
    });

    QUnit.test("HDA Deletion", function(assert) {
        var hda = new HDA_MODEL.HistoryDatasetAssociation({
            history_content_type: "dataset",
            id: "hda1",
            history_id: "h1",
            deleted: false
        });
        assert.equal(hda.get("deleted"), false);

        sinon.stub($, "ajax").yieldsTo("success", { deleted: true });
        hda["delete"]();
        // to get the url sinon used:
        //console.debug( $.ajax.lastCall.args[0].url )
        assert.ok($.ajax.calledWithMatch({ url: "/api/histories/h1/contents/datasets/hda1" }));
        assert.equal(hda.get("deleted"), true);
    });
});
