namespace("Beetny.EQ2AA.BackwardsCompatibility");
Beetny.EQ2AA.BackwardsCompatibility.HashUpgrader = Class.extend({
	init : function(idRemapper) {
		this._idRemapper = idRemapper
	},
	upgradeHash : function(hash) {
		var hashInfo = Beetny.EQ2AA.HashInfo.parseHash(hash);
		var version = hashInfo.version;
		if (version === "GU60" || version === "GU61" || version === "GU62") {
			hash = this._preGU63toGU63HashFormat(hash, version);
			hash = this._idRemapper.remapHashIds(hash, version);
			version = "GU63"
		}
		if (version === "GU63") {
			hash = this._idRemapper.remapHashIds(hash, version);
			version = "GU68";
			hash = this._changeHashVersion(hash, version);
		}

		if (version === "GU68") {	
			hash = this._convertToGU101NewTreeHashFormat(hash);
			hash = this._idRemapper.remapHashTreeIdsGU101Format(hash, version, hashInfo.classId);
			version = "GU101";
			hash = this._changeHashVersion(hash, version);
		}

		version = Beetny.EQ2AA.GameVersions.LatestUpdate;
		hash = this._changeHashVersion(hash, version);

		return hash
	},
	
	_convertToGU101NewTreeHashFormat : function(hash) {
		return hash.replace(/t(\w)/gi, 't$1!')
	},

	_changeHashVersion : function(hash, newVersion) {
		var hashInfo = Beetny.EQ2AA.HashInfo.parseHash(hash);
		hashInfo.version = newVersion;
		return hashInfo.toHash()
	},
	_preGU63toGU63HashFormat : function(hash, version) {
		var newHash = "";
		if (hash.length > 0) {
			var hashInfo = Beetny.EQ2AA.HashInfo.parseHash(hash);
			var classId = hashInfo.classId;
			newHash += "GU63;" + classId.toString(36);
			var treeHashes = hashInfo.treeHashes;
			var hashIndex = 0;
			while (hashIndex < treeHashes.length) {
				var treeHash = treeHashes.slice(hashIndex);
				var treeInfo = parseTreeHash(treeHash);
				var lengthOfTreeHashHeader = 3;
				hashIndex += lengthOfTreeHashHeader;
				newHash += Beetny.EQ2AA.Model.Tree.TreeHashToken + treeInfo.treeId.toString(36);
				var pointsConsumed = 0;
				var pointHashIndex = 0;
				var nextAAId = 0;
				while (pointsConsumed < treeInfo.totalPoints && pointHashIndex < treeInfo.pointsHash.length) {
					var nextChar = treeInfo.pointsHash[pointHashIndex];
					if (nextChar === Beetny.EQ2AA.Model.Tree.RepeatHashToken) {
						var repeatedAA = treeInfo.pointsHash[pointHashIndex + 1];
						var numberOfRepeatedAA = parseInt(repeatedAA, 36);
						nextAAId += numberOfRepeatedAA;
						pointHashIndex += 2;
						newHash += Beetny.repeatChar("0", numberOfRepeatedAA)
					} else {
						var numPointsSpent = parseInt(nextChar, 36);
						var pointCost = Beetny.EQ2AA.BackwardsCompatibility.LegacyTreeInfo.getPointCost(version, classId, treeInfo.treeId, nextAAId);
						pointsConsumed += numPointsSpent * pointCost; ++pointHashIndex; ++nextAAId;
						newHash += nextChar
					}
				}
				hashIndex += pointHashIndex
			}
		}
		return newHash;
		function parseTreeHash(hash) {
			return {
				treeId : parseInt(hash.charAt(0), 36),
				totalPoints : parseInt(hash.slice(1, 3), 36),
				pointsHash : hash.slice(3)
			}
		}

	}
});
