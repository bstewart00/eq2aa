namespace("Beetny.EQ2AA");
Beetny.EQ2AA.ClassPrinter = Class.extend({
	print : function(classObj, jContainer) {
		var html = "";
		var titleText = $("title").text();

		$("title").text(titleText.replace("{ClassName}", classObj.name));

		html += "<h2>{ClassName}</h2>".replace("{ClassName}", classObj.name);

		for (var i = 0; i < classObj.trees.length; i++) {
			html += printTree(classObj.trees[i]);
		}

		jContainer.html(html);
		function printTree(tree) {
			html = "";
			if (tree) {
				var pointsSpent = tree.getTotalPointsSpent();
				html += "<h3>{TreeName} ({Points} {PointsWord})</h3>"
					.replace("{TreeName}", tree.name)
					.replace("{Points}", pointsSpent)
					.replace("{PointsWord}", pointsSpent === 1 ? Beetny.EQ2AA.Text.Point : Beetny.EQ2AA.Text.Points);
					
				tree.aa.forEach(function(aa) {
					if (aa.level === 0)
						return true;
					html += '<blockquote><strong class="aa-name">{AAName}</strong><span class="aa-rank"> - Rank {Current}/{Max}</span><div class="aa-description">{Description}</div>{Effects}</blockquote>'
						.replace("{AAName}", aa.name)
						.replace("{Current}", aa.level)
						.replace("{Max}", aa.max_level)
						.replace("{Description}", aa.description)
						.replace("{Effects}", aa.getEffectForLevel(aa.level))
				});
			}
			return html;
		}

	}
}); 