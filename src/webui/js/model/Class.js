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
		getTreeByType: function (treeType) {
		   return this.trees.filter(function (tree) {
		      return tree.type === treeType;
		   })[0]
		},
		
		getTreeById: function (id) {
		   return this.trees.filter(function (tree) {
		      return tree.id === id;
		   })[0];
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
				var hashSegment = hash.slice(treeHashIndex);
				var treeInfo = Beetny.EQ2AA.Model.Tree.ParseTreeHash(hashSegment);
				var tree = this.getTreeById(treeInfo.treeId);
				if (tree) {
					var pointsHash = treeInfo.pointsHash;
					tree.loadHash(pointsHash);
				}
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

