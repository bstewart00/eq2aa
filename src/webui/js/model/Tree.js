namespace("Beetny.EQ2AA.Model");
Beetny.EQ2AA.Model.Tree = Class.extend({
	init : function(treeJson, parentClass) {
		$.extend(this, treeJson);
		this.parentClass = parentClass;
		this.aa.forEach(function(aaJson, i) {
			this.aa[i] = new Beetny.EQ2AA.Model.AA(aaJson, this)
		}, this)
	},
	getGlobalPointsSpent : function() {
		return this.parentClass.points.AA.spent
	},
	getParentSubtreeName : function(subtree) {
		switch (subtree) {
			case this.parentClass.name:
				return this.parentClass.lineage.archetype;
			case this.parentClass.lineage.archetype:
				return this.parentClass.lineage.family;
			case this.parentClass.lineage.family:
				return "General"
		}
		return null
	},
	getTotalPointsSpent : function() {
		return Object.values(this.subtrees).reduce(function(previousValue, pointsSpent) {
			return previousValue + pointsSpent
		}, 0)
	},
	getAvailablePoints : function() {
		var availablePointsInClass = this.parentClass.getAvailablePoints(this);
		var availablePointsInTree = this.max_points - this.getTotalPointsSpent();
		return Math.min(availablePointsInTree, availablePointsInClass)
	},
	spendPoints : function(aa, numPoints) {
		var pointsConsumed = 0;
		if (numPoints > 0) {
			numPoints = Math.min(numPoints, Math.floor(this.getAvailablePoints() / aa.actualCost()));
			pointsConsumed = aa.spendPoints(numPoints)
		} else if (numPoints < 0) {
			pointsConsumed = aa.spendPoints(numPoints);
			this.reclaimIllegalPoints()
		}
		return pointsConsumed
	},
	notifyPointsSpentInSubtree : function(subclass, points) {
		this.subtrees[subclass] += points;
		this.parentClass.notifyPointsSpentInTree(this, points)
	},
	reclaimIllegalPoints : function() {
		var deferred = [];
		this.aa.forEach(function(aa) {
			aa.parents().forEach(function(parent) {
				reclaimAAIfIllegal.call(this, parent);
			}, this);

			if (aa.subclass === this.y_subclass) {
				deferred.push(aa);
				return true
			}
			reclaimAAIfIllegal.call(this, aa)
		}, this);
		deferred.map(reclaimAAIfIllegal, this);

		function reclaimAAIfIllegal(aa) {
			if (aa.level > 0 && !aa.satisfiesPrerequisites()) {
				var pointsReclaimed = -aa.level * aa.actualCost();
				aa.level = 0;
				this.notifyPointsSpentInSubtree(aa.subclass, pointsReclaimed)
			}
		}

	},
	calculateDerivedPoints : function() {
		var pointsDerived = 0;
		if (this.x_y_ratio > 0)
			pointsDerived = Math.floor(this.subtrees[this.x_subclass] / this.x_y_ratio);
		return pointsDerived
	},
	reset : function() {
		this.aa.forEach(function(aa) {
			aa.level = 0
		});
		var totalPoints = this.getTotalPointsSpent();
		Object.keys(this.subtrees).forEach(function(key) {
			this.subtrees[key] = 0
		}, this);
		this.parentClass.notifyPointsSpentInTree(this, -totalPoints)
	},
	createHash : function() {
		var hash = "";
		if (this.aa.length === 0 || this.getTotalPointsSpent() === 0)
			return hash;
		hash += Beetny.EQ2AA.Model.Tree.TreeHashToken + this.id.toString(36) + Beetny.EQ2AA.Model.Tree.TreePointsStartHashToken;
		var aaHash = this.aa.map(function(aa) {
			return aa.level.toString(36)
		}).collateAdjacentDuplicates();
		if (aaHash[aaHash.length - 1].indexOf("0") > -1)
			aaHash.pop();
		for (var i = 0; i < aaHash.length; ++i) {
			var repeatedChar = aaHash[i].charAt(0);
			if (aaHash[i].length >= 3)
				aaHash[i] = repeatedChar + Beetny.EQ2AA.Model.Tree.RepeatHashToken + aaHash[i].length.toString(36)
		}
		hash += aaHash.join("");
		return hash
	},
	loadHash : function(hash) {
		var aaId = 0;
		while (hash.length > 0 && hash.charAt(0) !== Beetny.EQ2AA.Model.Tree.TreeHashToken) {
			var nextLevel = parseInt(hash.charAt(0), 36);
			var nextChar = hash.charAt(1);
			var numAA = 0;
			var sliceIndex;
			if (nextChar === Beetny.EQ2AA.Model.Tree.RepeatHashToken) {
				numAA = parseInt(hash.charAt(2), 36);
				sliceIndex = 3
			} else {
				sliceIndex = 1;
				numAA = 1
			}
			for (var i = 0; i < numAA; ++i, ++aaId) {
				var aa = this.aa[aaId];
				if (aa) {
					aa.level = nextLevel;
					this.notifyPointsSpentInSubtree(aa.subclass, aa.level * aa.actualCost())
				}
			}
			hash = hash.slice(sliceIndex)
		}
	},

	typeNum : function() {
		return this.category.typenum;
	}
});
Beetny.EQ2AA.Model.Tree.ParseTreeHash = function(hash) {
	var treeHashIndex = hash.indexOf(Beetny.EQ2AA.Model.Tree.TreeHashToken);
	if (treeHashIndex !== -1) {
		var treeHash = hash.slice(treeHashIndex); 		//tID!
		var treePointsHashIndex = treeHash.indexOf(Beetny.EQ2AA.Model.Tree.TreePointsStartHashToken)
		var treeIdStr = treeHash.slice(1, treePointsHashIndex);
		return {
			idStartIndex: treeHashIndex,
			idEndIndex: treePointsHashIndex,
			treeId: parseInt(treeIdStr, 36),
			treeHash: hash.slice(treeHashIndex),
			pointsHash: hash.slice(treePointsHashIndex + 1)
		};
	}
	
	return null;
};

Beetny.EQ2AA.Model.Tree.TreeHashToken = "t";
Beetny.EQ2AA.Model.Tree.TreePointsStartHashToken = "!";
Beetny.EQ2AA.Model.Tree.RepeatHashToken = "@";
