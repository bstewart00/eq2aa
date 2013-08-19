namespace("Beetny.EQ2AA");
Beetny.EQ2AA.Exporter = Class.extend({
		init : function (version) {
			this._version = version || Beetny.EQ2AA.GameVersions.LatestUpdate
		},
		exportClass : function (classModel) {
			return this._version + ";" + classModel.createHash()
		}
	});
