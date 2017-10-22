namespace("Beetny.EQ2AA.Rendering");
Beetny.EQ2AA.Rendering.ICON_SIZE = 42;
Beetny.EQ2AA.Rendering.ElementBuilder = Class.extend({
		buildCategory : function (category) {
			var template = '<div class="category {Id}"><span class="categoryName">{Name}<span></div>';
			var html = template.replace("{Id}", category.id).replace("{Name}", category.name);
			return $(html)
		},
		
		buildTabContainer : function (categoryId) {
			var template = '<ul class="categoryTabs {CategoryId}"></ul>';
			var html = template.replace("{CategoryId}", categoryId);
			return $(html)
		},
	
		buildTab : function (cssClass, label) {
			var tabTemplate = '<li class="tab {Class}">{Label}</li>';
			var tabHtml = tabTemplate.replace("{Class}", cssClass).replace("{Label}", label);
			return $(tabHtml)
		},
		buildShadowsArrowsAndRequirements : function () {
			var self = this;
			return $(buildLabel("labels requirements", 60, "Requires 60 points spent.")).add(buildLabel("labels requirements", 120, "Requires 120 points spent.")).add(buildLabel("labels requirements", 170, "Requires 170 points spent.")).add(buildLabel("arrows",
					60)).add(buildLabel("arrows", 120)).add(buildLabel("arrows", 170));
			function buildLabel(cssClass, points, text) {
				text = text || "";
				cssClass = "no-select shadows-" + cssClass + " req" + points;
				return self._buildSpan(cssClass, text)
			}
		},
		buildShadowsSubtreeLabels : function (eq2class) {
			var general = this._buildSpan("no-select shadows-labels subtree General", "General");
			var family = this._buildSpan("no-select shadows-labels subtree Family", eq2class.lineage.family);
			var archetype = this._buildSpan("no-select shadows-labels subtree Archetype",
					eq2class.lineage.archetype);
			var class_ = this._buildSpan("no-select shadows-labels subtree Class", eq2class.name);
			return $(general).add(family).add(archetype).add(class_)
		},
		_buildSpan : function (cssClass, text) {
			var template = '<span class="{Class}">{Text}</span>';
			return template.replace("{Class}", cssClass).replace("{Text}", text)
		},
		buildLevelNumber : function () {
			return $('<span class="no-select aa-level"></span>')
		},
		buildTreeFooter : function () {
			return $('<span class="no-select footer"></span>')
		},
		buildPointTotals : function (classObj) {
			var html =
				'<fieldset class="totals">';
			html += "<legend>Points Spent</legend><ul>";
			html += classObj.getOrderedPointPools().reduce(function (previousValue, pointPool) {
				return previousValue + pointPool.html()
			}, "");
			html += "</ul></fieldset>";
			return $(html)
		},
		buildAAIcon : function (aa) {
			var iconTemplate = '<span class="no-select icon"></span>';
			return $(iconTemplate).css({
				"left" : aa.coords[0],
				"top" : aa.coords[1]
			})
		}
	});