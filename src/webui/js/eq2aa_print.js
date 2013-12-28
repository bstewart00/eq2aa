if (!Object.keys)
	Object.keys = function () {
		var hasOwnProperty = Object.prototype.hasOwnProperty,
		hasDontEnumBug = !{
			toString : null
		}
		.propertyIsEnumerable("toString"),
		dontEnums = ["toString", "toLocaleString", "valueOf", "hasOwnProperty", "isPrototypeOf", "propertyIsEnumerable", "constructor"],
		dontEnumsLength = dontEnums.length;
		return function (obj) {
			if (typeof obj !== "object" && typeof obj !== "function" || obj === null)
				throw new TypeError("Object.keys called on non-object");
			var result = [];
			for (var prop in obj)
				if (hasOwnProperty.call(obj,
						prop))
					result.push(prop);
			if (hasDontEnumBug)
				for (var i = 0; i < dontEnumsLength; i++)
					if (hasOwnProperty.call(obj, dontEnums[i]))
						result.push(dontEnums[i]);
			return result
		}
	}
();
if (!Array.prototype.forEach)
	Array.prototype.forEach = function forEach(callback, thisArg) {
		var T,
		k;
		if (this == null)
			throw new TypeError("this is null or not defined");
		var O = Object(this);
		var len = O.length >>> 0;
		if ({}

			.toString.call(callback) !== "[object Function]")
			throw new TypeError(callback + " is not a function");
		if (thisArg)
			T = thisArg;
		k = 0;
		while (k < len) {
			var kValue;
			if (Object.prototype.hasOwnProperty.call(O, k)) {
				kValue = O[k];
				callback.call(T, kValue, k, O)
			}
			k++
		}
	};
if (!Array.prototype.map)
	Array.prototype.map = function (callback, thisArg) {
		var T,
		A,
		k;
		if (this == null)
			throw new TypeError(" this is null or not defined");
		var O = Object(this);
		var len = O.length >>> 0;
		if (typeof callback !== "function")
			throw new TypeError(callback + " is not a function");
		if (thisArg)
			T = thisArg;
		A = new Array(len);
		k = 0;
		while (k < len) {
			var kValue,
			mappedValue;
			if (k in O) {
				kValue = O[k];
				mappedValue = callback.call(T, kValue, k, O);
				A[k] = mappedValue
			}
			k++
		}
		return A
	};
if (!Array.prototype.reduce)
	Array.prototype.reduce = function reduce(accumulator) {
		if (this === null || this === undefined)
			throw new TypeError("Object is null or undefined");
		var i = 0,
		l = this.length >> 0,
		curr;
		if (typeof accumulator !== "function")
			throw new TypeError("First argument is not callable");
		if (arguments.length < 2) {
			if (l === 0)
				throw new TypeError("Array length is 0 and no second argument");
			curr = this[0];
			i = 1
		} else
			curr = arguments[1];
		while (i < l) {
			if (i in this)
				curr = accumulator.call(undefined, curr, this[i], i, this);
			++i
		}
		return curr
	};
Beetny = {};
Beetny.emptyFunc = function () {};
Beetny.reorderArray = function (array, orderedIndexes) {
	if (!orderedIndexes)
		return array;
	var newArray = [];
	for (var i = 0; i < array.length; i++) {
		var orderedIndex = orderedIndexes[i];
		if (orderedIndex == null)
			orderedIndex = i;
		newArray[orderedIndex] = array[i]
	}
	return newArray
};
Beetny.getUrlParameterByName = function (name) {
	name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
	var regexS = "[\\?&]" + name + "=([^&#]*)";
	var regex = new RegExp(regexS);
	var results = regex.exec(window.location.search);
	if (results == null)
		return "";
	else
		return decodeURIComponent(results[1].replace(/\+/g, " "))
};
Beetny.repeatChar = function (str, n) {
	var result = "";
	for (var i = 0; i < n; i++)
		result += str;
	return result
};
Object.size = function (obj) {
	var size = 0,
	key;
	for (key in obj)
		if (obj.hasOwnProperty(key))
			size++;
	return size
};
Object.values = function (obj) {
	return Object.keys(obj).map(function (key) {
		return obj[key]
	}, this)
};
Object.items = function (obj) {
	return Object.keys(obj).map(function (key) {
		return {
			key : key,
			value : obj[key]
		}
	}, this)
};
Object.iterItems = function (obj, callback, thisValue) {
	Object.items(obj).forEach(function (item) {
		callback.apply(thisValue || obj, [item.key, item.value])
	})
};
Array.prototype.trueForAll = function () {
	if (this.length === 0)
		return false;
	for (var i = 0; i < this.length; ++i)
		if (!this[i])
			return false;
	return true
};
Array.prototype.sum = function () {
	for (var i = 0, sum = 0; i < this.length; sum += this[i++]);
	return sum
};
Array.prototype.collateAdjacentDuplicates = function () {
	for (var i = 0; i < this.length; ++i) {
		var current = this[i];
		var adjacentDuplicateCount = 0;
		for (var j = 1; i + j < this.length && this[i + j] === current; ++j)
			++adjacentDuplicateCount;
		for (var dupe = 0; dupe < adjacentDuplicateCount; ++dupe)
			this[i] += current;
		this.splice(i + 1, adjacentDuplicateCount)
	}
	return this
};
window.namespace = function () {
	var a = arguments,
	o = window,
	i = 0,
	j = 0,
	tok = null,
	name = null;
	for (i = 0; i < a.length; i = i + 1) {
		tok = a[i].split(".");
		for (j = 0; j < tok.length; j = j + 1) {
			name = tok[j];
			o[name] = o[name] || {};
			o = o[name]
		}
	}
	return o
};
(function ($) {
	$.fn.disableSelection = function () {
		return this.each(function () {
			$(this).attr("unselectable", "on").css({
				"-moz-user-select" : "none",
				"-webkit-user-select" : "none",
				"user-select" : "none",
				"-ms-user-select" : "none"
			}).each(function () {
				this.onselectstart = function () {
					return false
				}
			})
		})
	}
})(jQuery);
(function () {
	var initializing = false,
	fnTest = /xyz/.test(function () {
			xyz
		}) ? /\b_super\b/ : /.*/;
	this.Class = function () {};
	Class.extend = function (prop) {
		var _super = this.prototype;
		initializing = true;
		var prototype = new this;
		initializing = false;
		for (var name in prop)
			prototype[name] = typeof prop[name] == "function" && typeof _super[name] == "function" && fnTest.test(prop[name]) ? function (name, fn) {
				return function () {
					var tmp = this._super;
					this._super = _super[name];
					var ret = fn.apply(this, arguments);
					this._super = tmp;
					return ret
				}
			}
		(name, prop[name]) :
		prop[name];
		function Class() {
			if (!initializing && this.init)
				this.init.apply(this, arguments)
		}
		Class.prototype = prototype;
		Class.prototype.constructor = Class;
		Class.extend = arguments.callee;
		return Class
	}
})();
namespace("Beetny.EQ2AA");
Beetny.EQ2AA.GameVersions = {
	LatestUpdate : "GU65"
};
namespace("Beetny.EQ2AA");
Beetny.EQ2AA.Constants = {};
Beetny.EQ2AA.Constants.TreeTabOrder = [4, 0, 1, 2, 3, 5, 6];
Beetny.EQ2AA.Constants.ClassNames = {
	"0" : "Assassin",
	1 : "Berserker",
	2 : "Brigand",
	3 : "Bruiser",
	4 : "Coercer",
	5 : "Conjuror",
	6 : "Defiler",
	7 : "Dirge",
	8 : "Fury",
	9 : "Guardian",
	10 : "Illusionist",
	11 : "Inquisitor",
	12 : "Monk",
	13 : "Mystic",
	14 : "Necromancer",
	15 : "Paladin",
	16 : "Ranger",
	17 : "Shadowknight",
	18 : "Swashbuckler",
	19 : "Templar",
	20 : "Troubador",
	21 : "Warden",
	22 : "Warlock",
	23 : "Wizard",
	24 : "Beastlord"
};
Beetny.EQ2AA.Constants.TreeTypes = {
	"0" : "Archetype",
	1 : "Class",
	2 : "Shadows",
	3 : "Heroic",
	4 : "Tradeskill",
	5 : "Prestige",
	6 : "TradeskillPrestige"
};
Beetny.EQ2AA.Constants.TreeIds = {
	"Archetype" : 0,
	"Class" : 1,
	"Shadows" : 2,
	"Heroic" : 3,
	"Tradeskill" : 4,
	"Prestige" : 5,
	"TradeskillPrestige" : 6
};
namespace("Beetny.EQ2AA.Model");
Beetny.EQ2AA.Model.AA = Class.extend({
		init : function (aaJson, parentTree) {
			$.extend(this, aaJson);
			this.tree = parentTree
		},
		getEffectForLevel : function (level) {
			if (level < 1 || level > this.max_level)
				return null;
			return this.effects[level - 1]
		},
		remainingLevels : function () {
			return this.max_level - this.level
		},
		hasBackdrop : function () {
			return this.icon.backdrop > -1
		},
		hasParents : function () {
			return this.parent_id > -1
		},
		parent : function () {
			if (this.parent_id > -1)
				return this.tree.aa[this.parent_id];
			return null
		},
		parentSubtreeName : function () {
			return this.tree.getParentSubtreeName(this.subclass)
		},
		prerequisiteHandlers : {
			"global" : function (required_points) {
				var globalPoints = this.tree.getGlobalPointsSpent();
				globalPoints -= this.level * this.cost;
				return globalPoints >= required_points
			},
			"tree" : function (required_points) {
				var treePoints = this.tree.getTotalPointsSpent();
				treePoints -= this.level * this.cost;
				return treePoints >= required_points
			},
			"parent_subtree" : function (required_points) {
				return this.tree.subtrees[this.tree.getParentSubtreeName(this.subclass)] >= required_points
			},
			"subtree" : function (required_points) {
				var subtreePoints =
					this.tree.subtrees[this.subclass];
				subtreePoints -= this.level * this.cost;
				if (this.subclass === this.tree.y_subclass)
					return this.tree.calculateDerivedPoints() - subtreePoints >= required_points;
				else
					return subtreePoints >= required_points
			},
			"parent" : function (required_level) {
				return this.parent().level >= required_level
			}
		},
		satisfiesPrerequisites : function () {
			var result = true;
			if (this.level === 0 && this.tree.getAvailablePoints() < this.cost)
				return false;
			Object.iterItems(this.prereqs, function (prereq, required_points) {
				if (required_points ===
					0)
					return true;
				return result = this.prerequisiteHandlers[prereq].call(this, required_points)
			}, this);
			return result
		},
		spendPoints : function (numPoints) {
			if (numPoints === 0)
				return 0;
			var currentLevel = this.level;
			var futureLevel = this.level + numPoints;
			futureLevel = Math.max(0, Math.min(futureLevel, this.max_level));
			this.level = futureLevel;
			var pointsUsed = (futureLevel - currentLevel) * this.cost;
			this.tree.notifyPointsSpentInSubtree(this.subclass, pointsUsed);
			return pointsUsed
		}
	});
namespace("Beetny.EQ2AA.Model");
Beetny.EQ2AA.Model.Tree = Class.extend({
		init : function (treeJson, parentClass) {
			$.extend(this, treeJson);
			this.parentClass = parentClass;
			this.aa.forEach(function (aaJson, i) {
				this.aa[i] = new Beetny.EQ2AA.Model.AA(aaJson, this)
			}, this)
		},
		getGlobalPointsSpent : function () {
			return this.parentClass.points.AA.spent
		},
		getParentSubtreeName : function (subtree) {
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
		getTotalPointsSpent : function () {
			return Object.values(this.subtrees).reduce(function (previousValue, pointsSpent) {
				return previousValue + pointsSpent
			}, 0)
		},
		getAvailablePoints : function () {
			var availablePointsInClass = this.parentClass.getAvailablePoints(this);
			var availablePointsInTree = this.max_points - this.getTotalPointsSpent();
			return Math.min(availablePointsInTree, availablePointsInClass)
		},
		spendPoints : function (aa, numPoints) {
			var pointsConsumed = 0;
			if (numPoints > 0) {
				numPoints = Math.min(numPoints, Math.floor(this.getAvailablePoints() /
							aa.cost));
				pointsConsumed = aa.spendPoints(numPoints)
			} else if (numPoints < 0) {
				pointsConsumed = aa.spendPoints(numPoints);
				this.reclaimIllegalPoints()
			}
			return pointsConsumed
		},
		notifyPointsSpentInSubtree : function (subclass, points) {
			this.subtrees[subclass] += points;
			this.parentClass.notifyPointsSpentInTree(this, points)
		},
		reclaimIllegalPoints : function () {
			var deferred = [];
			this.aa.forEach(function (aa) {
				var parent = this.aa[aa.parent_id];
				if (parent)
					reclaimAAIfIllegal.call(this, parent);
				if (aa.subclass === this.y_subclass) {
					deferred.push(aa);
					return true
				}
				reclaimAAIfIllegal.call(this, aa)
			}, this);
			deferred.map(reclaimAAIfIllegal, this);
			function reclaimAAIfIllegal(aa) {
				if (aa.level > 0 && !aa.satisfiesPrerequisites()) {
					var pointsReclaimed = -aa.level * aa.cost;
					aa.level = 0;
					this.notifyPointsSpentInSubtree(aa.subclass, pointsReclaimed)
				}
			}
		},
		calculateDerivedPoints : function () {
			var pointsDerived = 0;
			if (this.x_y_ratio > 0)
				pointsDerived = Math.floor(this.subtrees[this.x_subclass] / this.x_y_ratio);
			return pointsDerived
		},
		reset : function () {
			this.aa.forEach(function (aa) {
				aa.level =
					0
			});
			var totalPoints = this.getTotalPointsSpent();
			Object.keys(this.subtrees).forEach(function (key) {
				this.subtrees[key] = 0
			}, this);
			this.parentClass.notifyPointsSpentInTree(this, -totalPoints)
		},
		createHash : function () {
			var hash = "";
			if (this.aa.length === 0 || this.getTotalPointsSpent() === 0)
				return hash;
			hash += Beetny.EQ2AA.Model.Tree.TreeHashToken + this.id.toString(36);
			var aaHash = this.aa.map(function (aa) {
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
		loadHash : function (hash) {
			var aaId = 0;
			while (hash.length > 0 && hash.charAt(0) !== Beetny.EQ2AA.Model.Tree.TreeHashToken) {
				var nextLevel = parseInt(hash.charAt(0), 36);
				var nextChar = hash.charAt(1);
				var numAA = 0;
				var sliceIndex;
				if (nextChar === Beetny.EQ2AA.Model.Tree.RepeatHashToken) {
					numAA = parseInt(hash.charAt(2),
							36);
					sliceIndex = 3
				} else {
					sliceIndex = 1;
					numAA = 1
				}
				for (var i = 0; i < numAA; ++i, ++aaId) {
					var aa = this.aa[aaId];
					if (aa) {
						aa.level = nextLevel;
						this.notifyPointsSpentInSubtree(aa.subclass, aa.level * aa.cost)
					}
				}
				hash = hash.slice(sliceIndex)
			}
		}
	});
Beetny.EQ2AA.Model.Tree.TreeHashToken = "t";
Beetny.EQ2AA.Model.Tree.RepeatHashToken = "@";
namespace("Beetny.EQ2AA.Model");
Beetny.EQ2AA.Model.Class = Class.extend({
		init : function (classJson) {
			$.extend(true, this, classJson);
			this.trees.forEach(function (tree, i) {
				this.trees[i] = new Beetny.EQ2AA.Model.Tree(tree, this)
			}, this);
			Object.iterItems(this.points, function (type, pointPool) {
				if (pointPool.child_pools)
					this.points[type] = new Beetny.EQ2AA.Model.CompositePointPool(pointPool);
				else
					this.points[type] = new Beetny.EQ2AA.Model.PointPool(pointPool)
			}, this)
		},
		getOrderedPointPools : function () {
			return this.ordered_point_pools.map(function (type) {
				return this.points[type]
			},
				this)
		},
		getTreePointPool : function (tree) {
			return tree.type === "Warder" ? this.points[tree.type].child_pools[tree.name.replace(" ", "")] : this.points[tree.type] || this.points.AA
		},
		notifyPointsSpentInTree : function (tree, amount) {
			this.getTreePointPool(tree).spent += amount
		},
		getAvailablePoints : function (tree) {
			var points = this.getTreePointPool(tree);
			return points.max - points.spent
		},
		reset : function () {
			this.trees.forEach(function (tree) {
				tree.reset()
			})
		},
		loadHash : function (hash) {
			var treeHashIndex = hash.indexOf(Beetny.EQ2AA.Model.Tree.TreeHashToken);
			while (treeHashIndex !== -1) {
				var treeHash = hash.slice(treeHashIndex);
				var treeId = parseInt(treeHash.charAt(1), 36);
				var tree = this.trees[treeId];
				if (tree)
					tree.loadHash(treeHash.slice(2));
				treeHashIndex = hash.indexOf(Beetny.EQ2AA.Model.Tree.TreeHashToken, treeHashIndex + 1)
			}
			return result(true);
			function result(success, errorMessage) {
				return {
					success : success,
					errorMessage : errorMessage || ""
				}
			}
		},
		createHash : function () {
			var hash = "";
			if (Object.size(this.trees) === 0)
				return hash;
			hash += this.id.toString(36);
			hash += this.trees.reduce(function (previousValue,
					tree) {
				return previousValue + tree.createHash()
			}, "");
			return hash
		}
	});
namespace("Beetny.EQ2AA.Model");
Beetny.EQ2AA.Model.PointPool = Class.extend({
		init : function (poolJson) {
			$.extend(this, poolJson);
			this.spent = 0
		},
		type : function () {
			return this.name.replace(" ", "")
		},
		html : function () {
			return '<li><label class="{Type}">{Label}:<span class="spent">{NumSpent}</span>/<span class="max">{Max}</span></label></li>'.replace("{Type}", this.type()).replace("{Label}", this.name).replace("{NumSpent}", this.spent).replace("{Max}", this.max)
		}
	});
Beetny.EQ2AA.Model.CompositePointPool = Class.extend({
		init : function (childPoolsJson) {
			$.extend(this, childPoolsJson);
			Object.iterItems(this.child_pools, function (type, pool) {
				this.child_pools[type] = new Beetny.EQ2AA.Model.PointPool(pool)
			}, this)
		},
		type : function () {
			return this.name.replace(" ", "")
		},
		orderedChildPools : function () {
			var orderedTypes = Object.keys(this.child_pools).sort();
			return orderedTypes.map(function (t) {
				return this.child_pools[t]
			}, this)
		},
		html : function () {
			var html = "<li><ul><label>{Name}:</label>".replace("{Name}",
					this.name);
			html += this.orderedChildPools().reduce(function (previousValue, childPool) {
				return previousValue + childPool.html()
			}, "");
			html += "</ul></li>";
			return html
		}
	});
namespace("Beetny.EQ2AA.BackwardsCompatibility");
Beetny.EQ2AA.BackwardsCompatibility.LegacyTreeInfo = {
	"GU60" : {
		"0" : {
			"Name" : "Assassin",
			"CostsGreaterThanOne" : [{
					4 : 2,
					8 : 2,
					12 : 2,
					16 : 2,
					20 : 2,
					26 : 2
				}, {
					31 : 2
				}, {
					28 : 2,
					29 : 2
				}
			]
		},
		1 : {
			"Name" : "Berserker",
			"CostsGreaterThanOne" : [{
					4 : 2,
					8 : 2,
					12 : 2,
					16 : 2,
					20 : 2,
					26 : 2
				}, {
					32 : 2,
					4 : 5
				}, {
					28 : 2,
					29 : 2
				}
			]
		},
		2 : {
			"Name" : "Brigand",
			"CostsGreaterThanOne" : [{
					4 : 2,
					8 : 2,
					12 : 2,
					16 : 2,
					20 : 2,
					26 : 2
				}, {
					18 : 3,
					30 : 2
				}, {
					28 : 2,
					29 : 2
				}
			]
		},
		3 : {
			"Name" : "Bruiser",
			"CostsGreaterThanOne" : [{
					4 : 2,
					8 : 2,
					12 : 2,
					16 : 2,
					20 : 2,
					25 : 4,
					26 : 2
				}, {
					8 : 3,
					13 : 2,
					30 : 2,
					7 : 3
				}, {
					28 : 2,
					29 : 2
				}
			]
		},
		4 : {
			"Name" : "Coercer",
			"CostsGreaterThanOne" : [{
					4 : 2,
					8 : 2,
					12 : 2,
					16 : 2,
					20 : 2,
					26 : 2
				}, {
					2 : 2,
					17 : 3,
					18 : 3,
					20 : 3,
					25 : 5,
					31 : 2
				}, {
					28 : 2,
					29 : 2
				}
			]
		},
		5 : {
			"Name" : "Conjuror",
			"CostsGreaterThanOne" : [{
					4 : 2,
					8 : 2,
					12 : 2,
					16 : 2,
					20 : 2,
					26 : 2
				}, {
					8 : 2,
					9 : 2,
					35 : 2,
					14 : 3,
					31 : 5
				}, {
					17 : 5,
					19 : 5,
					28 : 2,
					29 : 2
				}
			]
		},
		6 : {
			"Name" : "Defiler",
			"CostsGreaterThanOne" : [{
					4 : 2,
					8 : 2,
					12 : 2,
					16 : 2,
					20 : 2,
					26 : 2
				}, {
					31 : 2
				}, {
					28 : 2,
					29 : 2
				}
			]
		},
		7 : {
			"Name" : "Dirge",
			"CostsGreaterThanOne" : [{
					4 : 2,
					8 : 2,
					12 : 2,
					16 : 2,
					20 : 2,
					26 : 2
				}, {
					31 : 2
				}, {
					28 : 2,
					29 : 2
				}
			]
		},
		8 : {
			"Name" : "Fury",
			"CostsGreaterThanOne" : [{
					4 : 2,
					8 : 2,
					12 : 2,
					16 : 2,
					20 : 2,
					26 : 2
				}, {
					32 : 2,
					11 : 5
				}, {
					28 : 2,
					29 : 2
				}
			]
		},
		9 : {
			"Name" : "Guardian",
			"CostsGreaterThanOne" : [{
					4 : 2,
					8 : 2,
					12 : 2,
					16 : 2,
					20 : 2,
					26 : 2
				}, {
					33 : 2
				}, {
					28 : 2,
					29 : 2
				}
			]
		},
		10 : {
			"Name" : "Illusionist",
			"CostsGreaterThanOne" : [{
					4 : 2,
					8 : 2,
					12 : 2,
					16 : 2,
					20 : 2,
					26 : 2
				}, {
					13 : 3,
					31 : 2
				}, {
					28 : 2,
					29 : 2
				}
			]
		},
		11 : {
			"Name" : "Inquisitor",
			"CostsGreaterThanOne" : [{
					4 : 2,
					8 : 2,
					12 : 2,
					16 : 2,
					20 : 2,
					26 : 2
				}, {
					16 : 2,
					33 : 2,
					21 : 2,
					22 : 5
				}, {
					28 : 2,
					29 : 2
				}
			]
		},
		12 : {
			"Name" : "Monk",
			"CostsGreaterThanOne" : [{
					4 : 2,
					8 : 2,
					12 : 2,
					16 : 2,
					20 : 2,
					25 : 4,
					26 : 2
				}, {
					8 : 3,
					32 : 2
				}, {
					28 : 2,
					29 : 2
				}
			]
		},
		13 : {
			"Name" : "Mystic",
			"CostsGreaterThanOne" : [{
					4 : 2,
					8 : 2,
					12 : 2,
					16 : 2,
					20 : 2,
					26 : 2
				}, {
					33 : 2
				}, {
					28 : 2,
					29 : 2
				}
			]
		},
		14 : {
			"Name" : "Necromancer",
			"CostsGreaterThanOne" : [{
					4 : 2,
					8 : 2,
					12 : 2,
					16 : 2,
					20 : 2,
					26 : 2
				}, {
					32 : 5,
					33 : 2,
					11 : 2,
					29 : 5,
					22 : 3
				}, {
					17 : 5,
					19 : 5,
					28 : 2,
					29 : 2
				}
			]
		},
		15 : {
			"Name" : "Paladin",
			"CostsGreaterThanOne" : [{
					4 : 2,
					8 : 2,
					12 : 2,
					16 : 2,
					20 : 2,
					26 : 2
				}, {
					31 : 2
				}, {
					28 : 2,
					29 : 2
				}
			]
		},
		16 : {
			"Name" : "Ranger",
			"CostsGreaterThanOne" : [{
					4 : 2,
					8 : 2,
					12 : 2,
					16 : 2,
					20 : 2,
					26 : 2
				}, {
					32 : 2
				}, {
					28 : 2,
					29 : 2
				}
			]
		},
		17 : {
			"Name" : "Shadowknight",
			"CostsGreaterThanOne" : [{
					4 : 2,
					8 : 2,
					12 : 2,
					16 : 2,
					20 : 2,
					26 : 2
				}, {
					4 : 2,
					29 : 2
				}, {
					28 : 2,
					29 : 2
				}
			]
		},
		18 : {
			"Name" : "Swashbuckler",
			"CostsGreaterThanOne" : [{
					4 : 2,
					8 : 2,
					12 : 2,
					16 : 2,
					20 : 2,
					26 : 2
				}, {
					31 : 2
				}, {
					28 : 2,
					29 : 2
				}
			]
		},
		19 : {
			"Name" : "Templar",
			"CostsGreaterThanOne" : [{
					4 : 2,
					8 : 2,
					12 : 2,
					16 : 2,
					20 : 2,
					26 : 2
				}, {
					32 : 2,
					4 : 3,
					6 : 2
				}, {
					28 : 2,
					29 : 2
				}
			]
		},
		20 : {
			"Name" : "Troubador",
			"CostsGreaterThanOne" : [{
					4 : 2,
					8 : 2,
					12 : 2,
					16 : 2,
					20 : 2,
					26 : 2
				}, {
					31 : 2
				}, {
					28 : 2,
					29 : 2
				}
			]
		},
		21 : {
			"Name" : "Warden",
			"CostsGreaterThanOne" : [{
					4 : 2,
					8 : 2,
					12 : 2,
					16 : 2,
					20 : 2,
					26 : 2
				}, {
					31 : 2
				}, {
					28 : 2,
					29 : 2
				}
			]
		},
		22 : {
			"Name" : "Warlock",
			"CostsGreaterThanOne" : [{
					4 : 2,
					8 : 2,
					12 : 2,
					16 : 2,
					20 : 2,
					26 : 2
				}, {
					17 : 2,
					35 : 2
				}, {
					28 : 2,
					29 : 2
				}
			]
		},
		23 : {
			"Name" : "Wizard",
			"CostsGreaterThanOne" : [{
					4 : 2,
					8 : 2,
					12 : 2,
					16 : 2,
					20 : 2,
					26 : 2
				}, {
					33 : 2
				}, {
					28 : 2,
					29 : 2
				}
			]
		}
	},
	"GU61" : {
		"0" : {
			"Name" : "Assassin",
			"CostsGreaterThanOne" : [{
					4 : 2,
					8 : 2,
					12 : 2,
					16 : 2,
					20 : 2,
					26 : 2
				}, {
					31 : 2
				}, {
					26 : 2,
					27 : 2
				}
			]
		},
		1 : {
			"Name" : "Berserker",
			"CostsGreaterThanOne" : [{
					4 : 2,
					8 : 2,
					12 : 2,
					16 : 2,
					20 : 2,
					26 : 2
				}, {
					17 : 5,
					31 : 2
				}, {
					26 : 2,
					27 : 2
				}
			]
		},
		2 : {
			"Name" : "Brigand",
			"CostsGreaterThanOne" : [{
					4 : 2,
					8 : 2,
					12 : 2,
					16 : 2,
					20 : 2,
					26 : 2
				}, {
					8 : 3,
					31 : 2
				}, {
					26 : 2,
					27 : 2
				}
			]
		},
		3 : {
			"Name" : "Bruiser",
			"CostsGreaterThanOne" : [{
					4 : 2,
					8 : 2,
					12 : 2,
					16 : 2,
					20 : 2,
					25 : 4,
					26 : 2
				}, {
					10 : 3,
					18 : 3,
					6 : 2,
					31 : 2
				}, {
					26 : 2,
					27 : 2
				}
			]
		},
		4 : {
			"Name" : "Coercer",
			"CostsGreaterThanOne" : [{
					4 : 2,
					8 : 2,
					12 : 2,
					16 : 2,
					20 : 2,
					26 : 2
				}, {
					4 : 2,
					14 : 3,
					19 : 3,
					20 : 3,
					25 : 5,
					31 : 2
				}, {
					26 : 2,
					27 : 2
				}
			]
		},
		5 : {
			"Name" : "Conjuror",
			"CostsGreaterThanOne" : [{
					4 : 2,
					8 : 2,
					12 : 2,
					16 : 2,
					20 : 2,
					26 : 2
				}, {
					9 : 2,
					18 : 3,
					27 : 5,
					5 : 2,
					31 : 2
				}, {
					17 : 5,
					26 : 2,
					27 : 2,
					15 : 5
				}
			]
		},
		6 : {
			"Name" : "Defiler",
			"CostsGreaterThanOne" : [{
					4 : 2,
					8 : 2,
					12 : 2,
					16 : 2,
					20 : 2,
					26 : 2
				}, {
					31 : 2
				}, {
					26 : 2,
					27 : 2
				}
			]
		},
		7 : {
			"Name" : "Dirge",
			"CostsGreaterThanOne" : [{
					4 : 2,
					8 : 2,
					12 : 2,
					16 : 2,
					20 : 2,
					26 : 2
				}, {
					31 : 2
				}, {
					26 : 2,
					27 : 2
				}
			]
		},
		8 : {
			"Name" : "Fury",
			"CostsGreaterThanOne" : [{
					4 : 2,
					8 : 2,
					12 : 2,
					16 : 2,
					20 : 2,
					26 : 2
				}, {
					16 : 5,
					31 : 2
				}, {
					26 : 2,
					27 : 2
				}
			]
		},
		9 : {
			"Name" : "Guardian",
			"CostsGreaterThanOne" : [{
					4 : 2,
					8 : 2,
					12 : 2,
					16 : 2,
					20 : 2,
					26 : 2
				}, {
					31 : 2
				}, {
					26 : 2,
					27 : 2
				}
			]
		},
		10 : {
			"Name" : "Illusionist",
			"CostsGreaterThanOne" : [{
					4 : 2,
					8 : 2,
					12 : 2,
					16 : 2,
					20 : 2,
					26 : 2
				}, {
					18 : 3,
					31 : 2
				}, {
					26 : 2,
					27 : 2
				}
			]
		},
		11 : {
			"Name" : "Inquisitor",
			"CostsGreaterThanOne" : [{
					4 : 2,
					8 : 2,
					12 : 2,
					16 : 2,
					20 : 2,
					26 : 2
				}, {
					18 : 2,
					19 : 5,
					14 : 2,
					31 : 2
				}, {
					26 : 2,
					27 : 2
				}
			]
		},
		12 : {
			"Name" : "Monk",
			"CostsGreaterThanOne" : [{
					4 : 2,
					8 : 2,
					12 : 2,
					16 : 2,
					20 : 2,
					25 : 4,
					26 : 2
				}, {
					31 : 2
				}, {
					26 : 2,
					27 : 2
				}
			]
		},
		13 : {
			"Name" : "Mystic",
			"CostsGreaterThanOne" : [{
					4 : 2,
					8 : 2,
					12 : 2,
					16 : 2,
					20 : 2,
					26 : 2
				}, {
					31 : 2
				}, {
					26 : 2,
					27 : 2
				}
			]
		},
		14 : {
			"Name" : "Necromancer",
			"CostsGreaterThanOne" : [{
					4 : 2,
					8 : 2,
					12 : 2,
					16 : 2,
					20 : 2,
					26 : 2
				}, {
					31 : 2,
					27 : 5,
					30 : 5,
					6 : 2,
					15 : 3
				}, {
					17 : 5,
					26 : 2,
					27 : 2,
					15 : 5
				}
			]
		},
		15 : {
			"Name" : "Paladin",
			"CostsGreaterThanOne" : [{
					4 : 2,
					8 : 2,
					12 : 2,
					16 : 2,
					20 : 2,
					26 : 2
				}, {
					31 : 2
				}, {
					26 : 2,
					27 : 2
				}
			]
		},
		16 : {
			"Name" : "Ranger",
			"CostsGreaterThanOne" : [{
					4 : 2,
					8 : 2,
					12 : 2,
					16 : 2,
					20 : 2,
					26 : 2
				}, {
					31 : 2
				}, {
					26 : 2,
					27 : 2
				}
			]
		},
		17 : {
			"Name" : "Shadowknight",
			"CostsGreaterThanOne" : [{
					4 : 2,
					8 : 2,
					12 : 2,
					16 : 2,
					20 : 2,
					26 : 2
				}, {
					14 : 2,
					31 : 2
				}, {
					26 : 2,
					27 : 2
				}
			]
		},
		18 : {
			"Name" : "Swashbuckler",
			"CostsGreaterThanOne" : [{
					4 : 2,
					8 : 2,
					12 : 2,
					16 : 2,
					20 : 2,
					26 : 2
				}, {
					31 : 2
				}, {
					26 : 2,
					27 : 2
				}
			]
		},
		19 : {
			"Name" : "Templar",
			"CostsGreaterThanOne" : [{
					4 : 2,
					8 : 2,
					12 : 2,
					16 : 2,
					20 : 2,
					26 : 2
				}, {
					16 : 3,
					18 : 2,
					31 : 2
				}, {
					26 : 2,
					27 : 2
				}
			]
		},
		20 : {
			"Name" : "Troubador",
			"CostsGreaterThanOne" : [{
					4 : 2,
					8 : 2,
					12 : 2,
					16 : 2,
					20 : 2,
					26 : 2
				}, {
					31 : 2
				}, {
					26 : 2,
					27 : 2
				}
			]
		},
		21 : {
			"Name" : "Warden",
			"CostsGreaterThanOne" : [{
					4 : 2,
					8 : 2,
					12 : 2,
					16 : 2,
					20 : 2,
					26 : 2
				}, {
					31 : 2
				}, {
					26 : 2,
					27 : 2
				}
			]
		},
		22 : {
			"Name" : "Warlock",
			"CostsGreaterThanOne" : [{
					4 : 2,
					8 : 2,
					12 : 2,
					16 : 2,
					20 : 2,
					26 : 2
				}, {
					6 : 2,
					31 : 2
				}, {
					26 : 2,
					27 : 2
				}
			]
		},
		23 : {
			"Name" : "Wizard",
			"CostsGreaterThanOne" : [{
					4 : 2,
					8 : 2,
					12 : 2,
					16 : 2,
					20 : 2,
					26 : 2
				}, {
					31 : 2
				}, {
					26 : 2,
					27 : 2
				}
			]
		}
	},
	"GU62" : {
		"0" : {
			"Name" : "Assassin",
			"CostsGreaterThanOne" : [{
					4 : 2,
					8 : 2,
					12 : 2,
					16 : 2,
					20 : 2,
					26 : 2
				}, {
					31 : 2
				}, {
					26 : 2,
					27 : 2
				}
			]
		},
		1 : {
			"Name" : "Berserker",
			"CostsGreaterThanOne" : [{
					4 : 2,
					8 : 2,
					12 : 2,
					16 : 2,
					20 : 2,
					26 : 2
				}, {
					17 : 5,
					31 : 2
				}, {
					26 : 2,
					27 : 2
				}
			]
		},
		2 : {
			"Name" : "Brigand",
			"CostsGreaterThanOne" : [{
					4 : 2,
					8 : 2,
					12 : 2,
					16 : 2,
					20 : 2,
					26 : 2
				}, {
					8 : 3,
					31 : 2
				}, {
					26 : 2,
					27 : 2
				}
			]
		},
		3 : {
			"Name" : "Bruiser",
			"CostsGreaterThanOne" : [{
					4 : 2,
					8 : 2,
					12 : 2,
					16 : 2,
					20 : 2,
					25 : 4,
					26 : 2
				}, {
					10 : 3,
					18 : 3,
					6 : 2,
					31 : 2
				}, {
					26 : 2,
					27 : 2
				}
			]
		},
		4 : {
			"Name" : "Coercer",
			"CostsGreaterThanOne" : [{
					4 : 2,
					8 : 2,
					12 : 2,
					16 : 2,
					20 : 2,
					26 : 2
				}, {
					4 : 2,
					14 : 3,
					19 : 3,
					20 : 3,
					25 : 5,
					31 : 2
				}, {
					26 : 2,
					27 : 2
				}
			]
		},
		5 : {
			"Name" : "Conjuror",
			"CostsGreaterThanOne" : [{
					4 : 2,
					8 : 2,
					12 : 2,
					16 : 2,
					20 : 2,
					26 : 2
				}, {
					9 : 2,
					18 : 3,
					27 : 5,
					5 : 2,
					31 : 2
				}, {
					17 : 5,
					26 : 2,
					27 : 2,
					15 : 5
				}
			]
		},
		6 : {
			"Name" : "Defiler",
			"CostsGreaterThanOne" : [{
					4 : 2,
					8 : 2,
					12 : 2,
					16 : 2,
					20 : 2,
					26 : 2
				}, {
					31 : 2
				}, {
					26 : 2,
					27 : 2
				}
			]
		},
		7 : {
			"Name" : "Dirge",
			"CostsGreaterThanOne" : [{
					4 : 2,
					8 : 2,
					12 : 2,
					16 : 2,
					20 : 2,
					26 : 2
				}, {
					31 : 2
				}, {
					26 : 2,
					27 : 2
				}
			]
		},
		8 : {
			"Name" : "Fury",
			"CostsGreaterThanOne" : [{
					4 : 2,
					8 : 2,
					12 : 2,
					16 : 2,
					20 : 2,
					26 : 2
				}, {
					16 : 5,
					31 : 2
				}, {
					26 : 2,
					27 : 2
				}
			]
		},
		9 : {
			"Name" : "Guardian",
			"CostsGreaterThanOne" : [{
					4 : 2,
					8 : 2,
					12 : 2,
					16 : 2,
					20 : 2,
					26 : 2
				}, {
					31 : 2
				}, {
					26 : 2,
					27 : 2
				}
			]
		},
		10 : {
			"Name" : "Illusionist",
			"CostsGreaterThanOne" : [{
					4 : 2,
					8 : 2,
					12 : 2,
					16 : 2,
					20 : 2,
					26 : 2
				}, {
					18 : 3,
					31 : 2
				}, {
					26 : 2,
					27 : 2
				}
			]
		},
		11 : {
			"Name" : "Inquisitor",
			"CostsGreaterThanOne" : [{
					4 : 2,
					8 : 2,
					12 : 2,
					16 : 2,
					20 : 2,
					26 : 2
				}, {
					18 : 2,
					19 : 5,
					14 : 2,
					31 : 2
				}, {
					26 : 2,
					27 : 2
				}
			]
		},
		12 : {
			"Name" : "Monk",
			"CostsGreaterThanOne" : [{
					4 : 2,
					8 : 2,
					12 : 2,
					16 : 2,
					20 : 2,
					25 : 4,
					26 : 2
				}, {
					31 : 2
				}, {
					26 : 2,
					27 : 2
				}
			]
		},
		13 : {
			"Name" : "Mystic",
			"CostsGreaterThanOne" : [{
					4 : 2,
					8 : 2,
					12 : 2,
					16 : 2,
					20 : 2,
					26 : 2
				}, {
					31 : 2
				}, {
					26 : 2,
					27 : 2
				}
			]
		},
		14 : {
			"Name" : "Necromancer",
			"CostsGreaterThanOne" : [{
					4 : 2,
					8 : 2,
					12 : 2,
					16 : 2,
					20 : 2,
					26 : 2
				}, {
					31 : 2,
					27 : 5,
					30 : 5,
					6 : 2,
					15 : 3
				}, {
					17 : 5,
					26 : 2,
					27 : 2,
					15 : 5
				}
			]
		},
		15 : {
			"Name" : "Paladin",
			"CostsGreaterThanOne" : [{
					4 : 2,
					8 : 2,
					12 : 2,
					16 : 2,
					20 : 2,
					26 : 2
				}, {
					31 : 2
				}, {
					26 : 2,
					27 : 2
				}
			]
		},
		16 : {
			"Name" : "Ranger",
			"CostsGreaterThanOne" : [{
					4 : 2,
					8 : 2,
					12 : 2,
					16 : 2,
					20 : 2,
					26 : 2
				}, {
					31 : 2
				}, {
					26 : 2,
					27 : 2
				}
			]
		},
		17 : {
			"Name" : "Shadowknight",
			"CostsGreaterThanOne" : [{
					4 : 2,
					8 : 2,
					12 : 2,
					16 : 2,
					20 : 2,
					26 : 2
				}, {
					14 : 2,
					31 : 2
				}, {
					26 : 2,
					27 : 2
				}
			]
		},
		18 : {
			"Name" : "Swashbuckler",
			"CostsGreaterThanOne" : [{
					4 : 2,
					8 : 2,
					12 : 2,
					16 : 2,
					20 : 2,
					26 : 2
				}, {
					31 : 2
				}, {
					26 : 2,
					27 : 2
				}
			]
		},
		19 : {
			"Name" : "Templar",
			"CostsGreaterThanOne" : [{
					4 : 2,
					8 : 2,
					12 : 2,
					16 : 2,
					20 : 2,
					26 : 2
				}, {
					16 : 3,
					18 : 2,
					31 : 2
				}, {
					26 : 2,
					27 : 2
				}
			]
		},
		20 : {
			"Name" : "Troubador",
			"CostsGreaterThanOne" : [{
					4 : 2,
					8 : 2,
					12 : 2,
					16 : 2,
					20 : 2,
					26 : 2
				}, {
					31 : 2
				}, {
					26 : 2,
					27 : 2
				}
			]
		},
		21 : {
			"Name" : "Warden",
			"CostsGreaterThanOne" : [{
					4 : 2,
					8 : 2,
					12 : 2,
					16 : 2,
					20 : 2,
					26 : 2
				}, {
					31 : 2
				}, {
					26 : 2,
					27 : 2
				}
			]
		},
		22 : {
			"Name" : "Warlock",
			"CostsGreaterThanOne" : [{
					4 : 2,
					8 : 2,
					12 : 2,
					16 : 2,
					20 : 2,
					26 : 2
				}, {
					6 : 2,
					31 : 2
				}, {
					26 : 2,
					27 : 2
				}
			]
		},
		23 : {
			"Name" : "Wizard",
			"CostsGreaterThanOne" : [{
					4 : 2,
					8 : 2,
					12 : 2,
					16 : 2,
					20 : 2,
					26 : 2
				}, {
					31 : 2
				}, {
					26 : 2,
					27 : 2
				}
			]
		},
		24 : {
			"Name" : "Beastlord",
			"CostsGreaterThanOne" : [{
					4 : 2,
					8 : 2,
					12 : 2,
					16 : 2,
					20 : 2,
					26 : 2
				}, {
					31 : 2
				}, {
					26 : 2,
					27 : 2
				}
			]
		}
	}
};
Beetny.EQ2AA.BackwardsCompatibility.LegacyTreeInfo.getPointCost = function (version, classId, treeId, aaId) {
	var cost = 1;
	var versionMap = Beetny.EQ2AA.BackwardsCompatibility.LegacyTreeInfo[version];
	if (versionMap) {
		var classMap = versionMap[classId];
		if (classMap) {
			var costsGreaterThanOneInTree = classMap.CostsGreaterThanOne[treeId];
			if (costsGreaterThanOneInTree) {
				var aaCost = costsGreaterThanOneInTree[aaId];
				if (aaCost != null)
					cost = aaCost
			}
		}
	}
	return cost
};
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
namespace("Beetny.EQ2AA.BackwardsCompatibility");
Beetny.EQ2AA.BackwardsCompatibility.HashUpgrader = Class.extend({
		init : function (idRemapper) {
			this._idRemapper = idRemapper
		},
		upgradeHash : function (hash) {
			var hashInfo = Beetny.EQ2AA.HashInfo.parseHash(hash);
			var version = hashInfo.version;
			if (version === "GU60" || version === "GU61" || version === "GU62") {
				hash = this._preGU63toGU63HashFormat(hash, version);
				hash = this._idRemapper.remapHashIds(hash, version);
				version = "GU63"
			}
			if (version === "GU63") {
				hash = this._idRemapper.remapHashIds(hash, version);
				version = "GU65";
				hash = this._changeHashVersion(hash,
						version)
			}
			return hash
		},
		_changeHashVersion : function (hash, newVersion) {
			var hashInfo = Beetny.EQ2AA.HashInfo.parseHash(hash);
			hashInfo.version = newVersion;
			return hashInfo.toHash()
		},
		_preGU63toGU63HashFormat : function (hash, version) {
			var newHash = "";
			if (hash.length > 0) {
				var hashInfo = Beetny.EQ2AA.HashInfo.parseHash(hash);
				var classId = hashInfo.classId;
				newHash += "GU63;" + classId.toString(36);
				var treeHashes = hashInfo.treeHashes;
				var hashIndex = 0;
				while (hashIndex < treeHashes.length) {
					var treeHash = treeHashes.slice(hashIndex);
					var treeInfo =
						parseTreeHash(treeHash);
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
							var numberOfRepeatedAA = parseInt(repeatedAA,
									36);
							nextAAId += numberOfRepeatedAA;
							pointHashIndex += 2;
							newHash += Beetny.repeatChar("0", numberOfRepeatedAA)
						} else {
							var numPointsSpent = parseInt(nextChar, 36);
							var pointCost = Beetny.EQ2AA.BackwardsCompatibility.LegacyTreeInfo.getPointCost(version, classId, treeInfo.treeId, nextAAId);
							pointsConsumed += numPointsSpent * pointCost;
							++pointHashIndex;
							++nextAAId;
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
					totalPoints : parseInt(hash.slice(1,
							3), 36),
					pointsHash : hash.slice(3)
				}
			}
		}
	});
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
namespace("Beetny.EQ2AA");
Beetny.EQ2AA.ClassLoader = Class.extend({
		init : function (treeDir) {
			this._treeDir = treeDir;
			if (this._treeDir.charAt(this._treeDir.length - 1) !== "/")
				this._treeDir += "/";
			this._classObjCache = {}

		},
		loadClass : function (classId) {
			if (classId == undefined)
				return null;
			var self = this;
			var className = Beetny.EQ2AA.Constants.ClassNames[classId];
			var classObj = this._classObjCache[classId];
			if (!classObj)
				$.ajax({
					url : this._treeDir + className + ".json",
					dataType : "json",
					async : false,
					success : function (json) {
						self._classObjCache[classId] = classObj =
							new Beetny.EQ2AA.Model.Class(json)
					}
				});
			return classObj
		}
	});
namespace("Beetny.EQ2AA");
Beetny.EQ2AA.ClassPrinter = Class.extend({
		print : function (classObj, jContainer) {
			var html = "";
			var titleText = $("title").text();
			$("title").text(titleText.replace("{ClassName}", classObj.name));
			html += "<h2>{ClassName}</h2>".replace("{ClassName}", classObj.name);
			for (var i = 0; i < classObj.trees.length; i++)
				html += printTree(classObj.trees[i]);
			jContainer.html(html);
			function printTree(tree) {
				html = "";
				if (tree) {
					var pointsSpent = tree.getTotalPointsSpent();
					html += "<h3>{TreeName} ({Points} {PointsWord})</h3>".replace("{TreeName}",
						tree.name).replace("{Points}", pointsSpent).replace("{PointsWord}", pointsSpent === 1 ? "point" : "points");
					tree.aa.forEach(function (aa) {
						if (aa.level === 0)
							return true;
						html += '<blockquote><strong class="aa-name">{AAName}</strong><span class="aa-rank"> - Rank {Current}/{Max}</span><div class="aa-description">{Description}</div>{Effects}</blockquote>'.replace("{AAName}", aa.name).replace("{Current}", aa.level).replace("{Max}", aa.max_level).replace("{Description}", aa.description).replace("{Effects}", aa.getEffectForLevel(aa.level))
					})
				}
				return html
			}
		}
	});
$(function () {
	var printBuild = Beetny.getUrlParameterByName("build");
	if (printBuild.length > 0) {
		var classLoader = new Beetny.EQ2AA.ClassLoader("js/trees/");
		var importer = new Beetny.EQ2AA.Importer(classLoader);
		var importResult = importer.importClassFromHash(printBuild);
		if (importResult.classObj) {
			var printer = new Beetny.EQ2AA.ClassPrinter;
			printer.print(importResult.classObj, $("body"))
		}
	}
});
