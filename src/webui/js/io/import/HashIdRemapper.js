namespace("Beetny.EQ2AA.BackwardsCompatibility");
Beetny.EQ2AA.BackwardsCompatibility.HashIdRemapper = Class.extend({
	remapHashIds : function(hash, version) {
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
			remappedHash = hash.slice(0, treeHashStartIndexes[0]);
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
				result.push(Beetny.EQ2AA.Model.Tree.TreeHashToken + treeId + pointsArray.join(""))
			}
			return result
		}

	},
	_getRemapsForVersion : function(version) {
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
	},

	_gu101IdToSoeIdRemaps : {
		"0" : {
			"0" : 7,
			"1" : 19,
			"2" : 37,
			"3" : 67,
			"4" : 73,
			"5" : 115,
			"6" : 121,
			"7" : 130
		},
		"1" : {
			"0" : 12,
			"1" : 14,
			"2" : 44,
			"3" : 72,
			"4" : 73,
			"5" : 103,
			"6" : 121,
			"7" : 127
		},
		"2" : {
			"0" : 8,
			"1" : 21,
			"2" : 39,
			"3" : 68,
			"4" : 73,
			"5" : 117,
			"6" : 121,
			"7" : 130
		},
		"3" : {
			"0" : 2,
			"1" : 18,
			"2" : 48,
			"3" : 62,
			"4" : 73,
			"5" : 107,
			"6" : 121,
			"7" : 127
		},
		"4" : {
			"0" : 6,
			"1" : 35,
			"2" : 59,
			"3" : 66,
			"4" : 73,
			"5" : 111,
			"6" : 121,
			"7" : 129
		},
		"5" : {
			"0" : 11,
			"1" : 33,
			"2" : 57,
			"3" : 71,
			"4" : 73,
			"5" : 112,
			"6" : 121,
			"7" : 129
		},
		"6" : {
			"0" : 9,
			"1" : 30,
			"2" : 53,
			"3" : 69,
			"4" : 73,
			"5" : 101,
			"6" : 121,
			"7" : 128
		},
		"7" : {
			"0" : 1,
			"1" : 23,
			"2" : 41,
			"3" : 61,
			"4" : 73,
			"5" : 119,
			"6" : 121,
			"7" : 130
		},
		"8" : {
			"0" : 5,
			"1" : 28,
			"2" : 52,
			"3" : 65,
			"4" : 73,
			"5" : 98,
			"6" : 121,
			"7" : 128
		},
		"9" : {
			"0" : 12,
			"1" : 13,
			"2" : 43,
			"3" : 72,
			"4" : 73,
			"5" : 102,
			"6" : 121,
			"7" : 127
		},
		"10" : {
			"0" : 6,
			"1" : 36,
			"2" : 60,
			"3" : 66,
			"4" : 73,
			"5" : 110,
			"6" : 121,
			"7" : 129
		},
		"11" : {
			"0" : 3,
			"1" : 26,
			"2" : 50,
			"3" : 63,
			"4" : 73,
			"5" : 97,
			"6" : 121,
			"7" : 128
		},
		"12" : {
			"0" : 2,
			"1" : 17,
			"2" : 47,
			"3" : 62,
			"4" : 73,
			"5" : 106,
			"6" : 121,
			"7" : 127
		},
		"13" : {
			"0" : 9,
			"1" : 29,
			"2" : 54,
			"3" : 69,
			"4" : 73,
			"5" : 100,
			"6" : 121,
			"7" : 128
		},
		"14" : {
			"0" : 11,
			"1" : 34,
			"2" : 58,
			"3" : 71,
			"4" : 73,
			"5" : 113,
			"6" : 121,
			"7" : 129
		},
		"15" : {
			"0" : 4,
			"1" : 15,
			"2" : 45,
			"3" : 64,
			"4" : 73,
			"5" : 104,
			"6" : 121,
			"7" : 127
		},
		"16" : {
			"0" : 7,
			"1" : 20,
			"2" : 38,
			"3" : 67,
			"4" : 73,
			"5" : 114,
			"6" : 121,
			"7" : 130
		},
		"17" : {
			"0" : 4,
			"1" : 16,
			"2" : 46,
			"3" : 64,
			"4" : 73,
			"5" : 105,
			"6" : 121,
			"7" : 127
		},
		"18" : {
			"0" : 8,
			"1" : 22,
			"2" : 40,
			"3" : 68,
			"4" : 73,
			"5" : 116,
			"6" : 121,
			"7" : 130
		},
		"19" : {
			"0" : 3,
			"1" : 25,
			"2" : 49,
			"3" : 63,
			"4" : 73,
			"5" : 96,
			"6" : 121,
			"7" : 128
		},
		"20" : {
			"0" : 1,
			"1" : 24,
			"2" : 42,
			"3" : 61,
			"4" : 73,
			"5" : 118,
			"6" : 121,
			"7" : 130
		},
		"21" : {
			"0" : 5,
			"1" : 27,
			"2" : 51,
			"3" : 65,
			"4" : 73,
			"5" : 99,
			"6" : 121,
			"7" : 128
		},
		"22" : {
			"0" : 10,
			"1" : 32,
			"2" : 56,
			"3" : 70,
			"4" : 73,
			"5" : 109,
			"6" : 121,
			"7" : 129
		},
		"23" : {
			"0" : 10,
			"1" : 31,
			"2" : 55,
			"3" : 70,
			"4" : 73,
			"5" : 108,
			"6" : 121,
			"7" : 129
		},
		"24" : {
			"0" : 74,
			"1" : 75,
			"2" : 76,
			"3" : 77,
			"4" : 73,
			"5" : 120,
			"6" : 121,
			"7" : 90,
			"8" : 78,
			"9" : 81,
			"10" : 82,
			"11" : 84,
			"12" : 85,
			"13" : 86,
			"14" : 79,
			"15" : 91,
			"16" : 92,
			"17" : 93,
			"18" : 80,
			"19" : 95,
			"20" : 88,
			"21" : 83,
			"22" : 94,
			"23" : 89,
			"24" : 87,
			"25" : 130
		},
		"25" : {
			"0" : 122,
			"1" : 123,
			"2" : 124,
			"3" : 125,
			"4" : 73,
			"5" : 126,
			"6" : 121,
			"7" : 128
		}
	}
});
