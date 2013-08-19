namespace("Beetny.EQ2AA");
Beetny.EQ2AA.Importer = Class.extend({
		init : function (classLoader) {
			this._classLoader = classLoader
		},
		importClassFromHash : function (hash) {
			var result = new Beetny.EQ2AA.ImportResult(null, "");
			if (!hash)
				return result;
			try {
				var idRemapper = new Beetny.EQ2AA.BackwardsCompatibility.HashIdRemapper;
				var upgrader = new Beetny.EQ2AA.BackwardsCompatibility.HashUpgrader(idRemapper);
				var upgradedHash = upgrader.upgradeHash(hash);
				var hashInfo = Beetny.EQ2AA.HashInfo.parseHash(upgradedHash);
				var classObj = this._classLoader.loadClass(hashInfo.classId);
				classObj.loadHash(hashInfo.treeHashes);
				result.classObj = classObj
			} catch (e) {
				if (console && console.log)
					console.log("Import error: exception message = " + e.message);
				result.errorMessage = "An error occurred during import."
			}
			return result
		}
	});
Beetny.EQ2AA.ImportResult = Class.extend({
		init : function (classObj, errorMessage) {
			this.classObj = classObj || null;
			this.errorMessage = errorMessage || ""
		}
	});
