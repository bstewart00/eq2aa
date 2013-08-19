namespace("Beetny.EQ2AA");
Beetny.EQ2AA.HashInfo = Class.extend({
		init : function (version, classId, treeHashes) {
			this.version = version;
			this.classId = classId;
			this.treeHashes = treeHashes
		},
		toHash : function () {
			return this.version + ";" + this.classId.toString(36) + this.treeHashes
		}
	});
Beetny.EQ2AA.HashInfo.parseHash = function (hash) {
	var version = stripVersionFromHash();
	var classId = parseInt(hash.charAt(0), 36);
	var treeHashes = hash.slice(1);
	return new Beetny.EQ2AA.HashInfo(version, classId, treeHashes);
	function stripVersionFromHash() {
		var matchIndex = hash.search(/(GU\d+);/);
		var version;
		if (matchIndex === 0) {
			version = hash.substr(0, 4);
			hash = hash.slice(5)
		} else
			version = "GU60";
		return version
	}
};
