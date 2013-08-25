namespace("Beetny.EQ2AA");
Beetny.EQ2AA.AATreeViewer = Class.extend({
		init : function (classDef, renderer, urlUpdater) {
			this.class_ = classDef;
			this._renderer = renderer;
			this.activeTree = null;
			this._compositeTreesSelectedIndex = {}
			this._urlUpdater = urlUpdater;

		},
		_template : '<div class="tree-viewer {ClassName}">' + '<ul class="tabs"></ul>' + '<div class="trees"></div>' + "</div>",
		getElement : function () {
			return this._element;
		},
		
		getClassDef: function () {
		   return this.class_;
		},
		
		render : function (parentElement) {
			var self = this;
			var baseHtml = this._template.replace("{ClassName}", this.class_.name);
			var jElement = $(baseHtml).on({
					"TreeTabClick" : onTreeTabClick,
					"ChildTreeSelected" : onChildTreeSelected,
					"AAClick" : onAAClick,
					"AARightClick" : onAARightClick,
					"AAMouseEnter" : onAAMouseEnter,
					"AAMouseLeave" : onAAMouseLeave
				}).data("viewer", this);
			addTabs();
			this._renderer.replacePointTotals(this.class_);
			jElement.appendTo(parentElement);
			this._element = jElement;
			this.updateHash();
			
			return this._element;
			function addTabs() {
				var tabs = $(".tabs", jElement);
				var numStandardTabs = Beetny.EQ2AA.Constants.TreeIdTabOrder.length;
				for (var i = 0; i < numStandardTabs; i++) {
					var orderedId = Beetny.EQ2AA.Constants.TreeIdTabOrder[i];
					var tree = self.class_.trees[orderedId];
					tabs.append(self._renderer.renderTreeTab(tree.type, tree.name, tree))
				}
				if (self.class_.name === "Beastlord") {
					var warderTrees = self.class_.trees.slice(numStandardTabs);
					tabs.append(self._renderer.renderTreeTab("Warder", "Warder", warderTrees))
				}
			}
			function onTreeTabClick(e, tree) {
				if (tree.length)
					self.selectCompositeTree(tree);
				else
					self.selectTree(tree);
				return false
			}
			function onChildTreeSelected(e, tree, treeIndex) {
				self.selectCompositeTreeChild(tree, treeIndex);
				return false
			}
			function onAAClick(e,
				aa, modKey) {
				self.spendPoints(aa, modKey ? Infinity : 1);
				return false
			}
			function onAARightClick(e, aa, modKey) {
				self.spendPoints(aa, modKey ? -Infinity : -1);
				return false
			}
			function onAAMouseEnter(e, aa) {
				self.showTooltip(aa);
				return false
			}
			function onAAMouseLeave(e, aa) {
				self.hideTooltip();
				return false
			}
		},
		selectTree : function (tree) {
			var treeElement = this._getTreeElement(tree.type);
			if (treeElement.length === 0) {
				treeElement = this._renderer.renderTree(tree, [tree.type], this.class_);
				$(".trees", this._element).append(treeElement)
			}
			this._setActiveTab(tree.type);
			this._setActiveTree(tree, treeElement);
			this._renderer.refreshTree(tree, this.class_)
		},
		selectCompositeTree : function (trees) {
			var treeType = trees[0].type;
			var selectedChildIndex = this._getSelectedCompositeChildIndex(trees, treeType);
			var treeElement = this._getTreeElement(treeType);
			if (treeElement.length === 0) {
				treeElement = this._renderer.renderCompositeTree(trees, selectedChildIndex, [treeType]);
				$(".trees", this._element).append(treeElement)
			}
			this._setActiveTab(treeType);
			this.selectCompositeTreeChild(trees[selectedChildIndex], selectedChildIndex)
		},
		_getSelectedCompositeChildIndex : function (trees, treeType) {
			var currentlySelectedIndex = this._compositeTreesSelectedIndex[treeType];
			if (currentlySelectedIndex == null)
				trees.forEach(function (tree, i) {
					if (tree.getTotalPointsSpent() > 0) {
						currentlySelectedIndex = i;
						return false
					}
				});
			return currentlySelectedIndex || 0
		},
		selectCompositeTreeChild : function (tree, treeIndex) {
			var treeType = tree.type;
			var childTreeClassName = tree.name.replace(" ", "");
			var compositeTreeContainer = this._getTreeElement(treeType);
			var childTreeElement = $(".tree." +
					treeType + "." + childTreeClassName, compositeTreeContainer);
			if (childTreeElement.length === 0) {
				childTreeElement = this._renderer.renderTree(tree, [treeType, childTreeClassName], this.class_);
				compositeTreeContainer.append(childTreeElement)
			}
			this._removeActiveTrees(compositeTreeContainer);
			this._setActiveChildTree(tree, childTreeElement);
			this._renderer.refreshTree(tree, this.class_);
			this._compositeTreesSelectedIndex[treeType] = treeIndex
		},
		_setActiveChildTree : function (tree, childTreeElement) {
			this._setActiveTree(tree, childTreeElement);
			childTreeElement.parent().addClass("active")
		},
		_setActiveTree : function (tree, treeElement) {
			this.activeTree = tree;
			treeElement.addClass("active")
		},
		_setActiveTab : function (treeType) {
			$(".tab.active", this._element).removeClass("active");
			$(".tab." + treeType, this._element).addClass("active");
			this._removeActiveTrees()
		},
		_removeActiveTrees : function (container) {
			container = container || this._element;
			$(".tree.active", container).removeClass("active")
		},
		_changeActiveTab : function (tree, treeElement) {
			this._setActiveTab(tree.type);
			treeElement.addClass("active");
			this.activeTree =
				tree
		},
		_getTreeElement : function (treeClass) {
			return $(".trees > .tree." + treeClass, this._element)
		},
		spendPoints : function (aa, numPoints) {
			aa.tree.spendPoints(aa, numPoints);
			this._renderer.refreshTree(aa.tree, this.class_);
			this._renderer.updatePointTotals(this.class_);
			this.updateHash();
			Beetny.EQ2AA.Tooltips.createOrUpdateAATooltips(aa)
		},
		updateHash : function () {
		   this._urlUpdater.updateUrlHash(this.class_);
		},
		_getFullHash : function () {
			return Beetny.EQ2AA.GameVersions.LatestUpdate + ";" + this.class_.createHash()
		},
		showTooltip : function (aa) {
			var tooltips = Beetny.EQ2AA.Tooltips.createOrUpdateAATooltips(aa);
			var tooltipHeight = $(tooltips[0]).height();
			var x = aa.coords[0] + Beetny.EQ2AA.Rendering.ICON_SIZE + 10 - window.scrollX;
			var y = aa.coords[1] - tooltipHeight - window.scrollY;
			var currentTreeViewerOffset = $(".tree.active", this._element).closest(".tree-viewer").offset();
			Beetny.EQ2AA.Tooltips.showTooltip(currentTreeViewerOffset.left + x, currentTreeViewerOffset.top + y, tooltips)
		},
		hideTooltip : function () {
			Beetny.EQ2AA.Tooltips.hideTooltip()
		},
		refresh : function () {
			this._renderer.refreshTree(this.activeTree, this.class_);
			this._renderer.updatePointTotals(this.class_);
		},
		fullRefresh : function () {
			this._renderer.refreshTree(this.activeTree, this.class_);
			this._renderer.replacePointTotals(this.class_);
	      this.updateHash();
		},
		resetClass : function () {
			this.class_.reset();
			this.refresh()
		},
		resetActiveTree : function () {
			this.activeTree.reset();
			this.refresh()
		},
		printClass : function () {
			var newWindow = window.open("print.php?build={Hash}".replace("{Hash}", this._getFullHash()), "newWindow", "height=800,width=600");
			if (newWindow.focus)
				newWindow.focus()
		}
	});