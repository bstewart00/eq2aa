namespace("Beetny.EQ2AA.Rendering");
Beetny.EQ2AA.Rendering.Renderer = Class.extend({
		init : function (graphicsRenderer, elementBuilder) {
			this._graphicsRenderer = graphicsRenderer;
			this._elementBuilder = elementBuilder;
			this._renderCache = {}

		},
		renderTreeTab : function (tabClass, tabLabel, onClickData) {
			return this._renderTab(tabClass, tabLabel, onTabClick);
			function onTabClick() {
				$(this).trigger("TreeTabClick", [onClickData])
			}
		},
		_renderTab : function (tabClass, tabLabel, onClick) {
			var tab = this._elementBuilder.buildTab(tabClass, tabLabel);
			tab.on("click", onClick);
			return tab
		},
		_getCachedComponents : function (id) {
			if (!this._renderCache[id])
				this._renderCache[id] = {};
			return this._renderCache[id]
		},
		renderCompositeTree : function (trees, selectedChildIndex, classes) {
			var treeElement = $(this._treeTemplate.replace("{Classes}", classes.join(" ")));
			var selectDropdown = $('<select class="tree-dropdown"></select>').appendTo(treeElement);
			trees.forEach(function (tree, i) {
				var option = $('<option value="{TreeName}">{TreeName}</option>'.replace(/{TreeName}/g, tree.name));
				if (i === selectedChildIndex)
					option.prop("selected",
						"true");
				option.appendTo(selectDropdown)
			});
			selectDropdown.on("change", function () {
				var selectedOption = $("option:selected", this);
				var treeIndex = selectedOption.index();
				var tree = trees[treeIndex];
				$(this).trigger("ChildTreeSelected", [tree, treeIndex])
			});
			return treeElement
		},
		_treeTemplate : '<div class="tree {Classes}"></div>',
		renderTree : function (tree, classes, classDef) {
			classes = classes || [];
			var cachedTree = this._getCachedComponents(classDef.id.toString() + tree.soe_id);
			if (cachedTree.element)
				return cachedTree.element;
			var self = this;
			var html = this._treeTemplate.replace("{Classes}",
					classes.join(" "));
			var treeElement = $(html);
			if ($.browser.msie && $.browser.version == 8)
				treeElement.append('<img width="660" height="500" src="css/images/tree-background.gif"/>');
			var canvas = this._graphicsRenderer.createCanvas(treeElement[0], 640, 480);
			var treeSpecificElements = createTreeSpecificElements().appendTo(treeElement);
			var footer = this._elementBuilder.buildTreeFooter().appendTo(treeElement);
			var components = {
				canvas : canvas,
				element : treeElement,
				footer : footer,
				aa : {},
				treeSpecificElements : treeSpecificElements
			};
			$.extend(cachedTree, components);
			tree.aa.forEach(function (aa) {
				var aaElements = self.renderAA(aa, canvas);
				treeElement.append(aaElements.container)
			});
			$(".no-select", treeElement).disableSelection();
			return treeElement;
			function createTreeSpecificElements() {
				var elements = $();
				switch (tree.type) {
				case "Shadows":
					elements = elements.add(self._elementBuilder.buildShadowsArrowsAndRequirements()).add(self._elementBuilder.buildShadowsSubtreeLabels(tree.parentClass));
					break;
				default:
					break
				}
				return elements
			}
		},
		renderAA : function (aa,
			canvas) {
			var aaCache = this._getCachedComponents(aa.soe_id);
			var icon = this._elementBuilder.buildAAIcon(aa);
			var levelNumber = this._elementBuilder.buildLevelNumber(aa);
			var components = this._graphicsRenderer.renderAAComponents(canvas, aa);
			bindEvents();
			var result = {
				container : buildContainer(),
				levelNumber : levelNumber
			};
			$.extend(result, components);
			$.extend(aaCache, result);
			return result;
			function bindEvents() {
				$(icon).on({
					"click" : function (e) {
						$(this).trigger("AAClick", [aa, e.shiftKey || e.ctrlKey || e.altKey]);
						return false
					},
					"contextmenu" : function (e) {
						$(this).trigger("AARightClick", [aa, e.shiftKey || e.ctrlKey || e.altKey]);
						return false
					},
					"mouseenter" : function (e) {
						$(this).trigger("AAMouseEnter", [aa]);
						return false
					},
					"mouseleave" : function (e) {
						$(this).trigger("AAMouseLeave", [aa]);
						return false
					}
				})
			}
			function buildContainer() {
				var template = '<span class="aa id{Id}"></span>';
				var container = $(template.replace("{Id}", aa.id));
				container.append(icon, levelNumber);
				return container
			}
		},
		refreshAA : function (aa) {
			var cachedElements = this._getCachedComponents(aa.soe_id);
			updateLevelNumber();
			this._graphicsRenderer.updateAAColor(aa, cachedElements);
			this._graphicsRenderer.updateAAVisibility(aa, cachedElements);
			function updateLevelNumber() {
				var element = cachedElements.levelNumber;
				var leftOffset = aa.level >= 10 ? 38 : 42;
				var topOffset = 38;
				element.text(aa.level).css({
					"left" : aa.coords[0] + leftOffset,
					"top" : aa.coords[1] + topOffset
				})
			}
		},
		replacePointTotals : function (classObj) {
			$("#points-spent .totals").remove();
			$("#points-spent").append(this._elementBuilder.buildPointTotals(classObj))
		},
		updatePointTotals : function (classObj) {
			Object.iterItems(classObj.points,
				function (type, pool) {
				if (pool instanceof Beetny.EQ2AA.Model.CompositePointPool)
					Object.iterItems(pool.child_pools, updatePointPool);
				else
					updatePointPool(type, pool)
			});
			function updatePointPool(type, pool) {
				$("#points-spent .{Type} .spent".replace("{Type}", pool.type())).text(pool.spent)
			}
		},
		refreshTree : function (tree, classDef) {
			var treeElements = this._getCachedComponents(classDef.id.toString() + tree.soe_id);
			updateTreeSpecificElements();
			updateFooter();
			tree.aa.forEach(function (aa) {
				this.refreshAA(aa)
			}, this);
			function updateTreeSpecificElements() {
				switch (tree.type) {
				case "Shadows":
					var req60 =
						$(".shadows-labels.req60", treeElements.element).hide();
					var req120 = $(".shadows-labels.req120", treeElements.element).hide();
					var req170 = $(".shadows-labels.req170", treeElements.element).hide();
					var globalPoints = tree.getGlobalPointsSpent();
					if (globalPoints < 60) {
						req60.show();
						req120.show();
						req170.show()
					} else if (globalPoints < 120) {
						req120.show();
						req170.show()
					} else if (globalPoints < 170)
						req170.show();
					break;
				default:
					break
				}
			}
			function updateFooter() {
				var text = "Points spent in {Name} Advancements: {Points}/{Max}";
				treeElements.footer.text(text.replace("{Name}",
						tree.name).replace("{Points}", tree.getTotalPointsSpent()).replace("{Max}", tree.max_points))
			}
		}
	});
