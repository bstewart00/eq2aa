namespace("Beetny.EQ2AA.BackwardsCompatibility");
Beetny.EQ2AA.BackwardsCompatibility.HashIdRemapper = Class.extend({
		remapHashIds : function (hash, version) {
			var remaps = this._getRemapsForVersion(version);
			if (!remaps)
				return hash;
			var remappedHash = "";
			var treeHashStartIndexes = [];
			var treeHashStartIndex = hash.indexOf(Beetny.EQ2AA.Model.Tree.TreeHashToken);
			while (treeHashStartIndex > -1) {
				treeHashStartIndexes.push(treeHashStartIndex);
				treeHashStartIndex = hash.indexOf(Beetny.EQ2AA.Model.Tree.TreeHashToken, treeHashStartIndex + 1)
			}
			if (treeHashStartIndexes.length > 0)
				remappedHash =
					hash.slice(0, treeHashStartIndexes[0]);
			remappedHash += getReorderedTreeHashes().join("");
			return remappedHash;
			function getReorderedTreeHashes() {
				var result = [];
				for (var i = 0; i < treeHashStartIndexes.length; i++) {
					var startIndex = treeHashStartIndexes[i];
					var nextIndex = treeHashStartIndexes[i + 1] || Infinity;
					var treeHash = hash.slice(startIndex, nextIndex);
					var treeId = treeHash[1];
					var pointsHash = treeHash.slice(2);
					var pointsArray = pointsHash.split("");
					pointsArray = Beetny.reorderArray(pointsArray, remaps[treeId]);
					result.push(Beetny.EQ2AA.Model.Tree.TreeHashToken +
						treeId + pointsArray.join(""))
				}
				return result
			}
		},
		_getRemapsForVersion : function (version) {
			if (version === "GU60" || version === "GU61" || version === "GU62")
				return this._preGU63AAIdRemaps;
			else if (version === "GU63")
				return this._gu63ToGu65AAIdRemaps
		},
		_preGU63AAIdRemaps : {
			"0" : {
				2 : 6,
				3 : 11,
				4 : 16,
				5 : 2,
				6 : 7,
				7 : 12,
				8 : 17,
				9 : 3,
				10 : 8,
				11 : 13,
				12 : 18,
				13 : 4,
				14 : 9,
				15 : 14,
				16 : 19,
				17 : 5,
				18 : 10,
				19 : 15
			}
		},
		_gu63ToGu65AAIdRemaps : {
			5 : {
				"0" : 1,
				1 : 2,
				2 : 0,
				4 : 5,
				5 : 6,
				6 : 4
			}
		}
	});
