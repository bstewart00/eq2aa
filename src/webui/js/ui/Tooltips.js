namespace("Beetny.EQ2AA.Tooltips");
Beetny.EQ2AA.Tooltips = {
   showTooltip: function(x, y, content, parent) {
      parent = parent || "body";
      var containerTemplate = '<div id="tooltip-container"></div>';
      var container = $("#tooltip-container");
      if (container.length === 0)
         container = $(containerTemplate).appendTo(parent);
      container.empty().append(content).css({
         "left": x,
         "top": y
      }).show()
   },
   hideTooltip: function() {
      $("#tooltip-container").empty().hide()
   },
   createOrUpdateAATooltips: function(aa, tooltips) {
      tooltips = tooltips || $(".aa-tooltip", "#tooltip-container");
      if (tooltips.length === 0)
         tooltips = tooltips.add(createTooltip()).appendTo("#tooltip-container");
      if (tooltips.length === 1 && aa.level > 0 && aa.remainingLevels() > 0)
         tooltips = tooltips.add(createTooltip()).appendTo("#tooltip-container");
      if (tooltips.length === 2 && (aa.level === 0 || aa.remainingLevels() === 0)) {
         tooltips.eq(1).remove();
         tooltips = tooltips.eq(0)
      }
      fillTooltipData(tooltips.eq(0), aa.level);
      fillTooltipData(tooltips.eq(1), aa.level + 1);
      return tooltips;
      function createTooltip() {
         var template = '<div class="aa-tooltip">' + '<div class="header">' + '<span class="name"></span>' + '<span class="rank"></span>' + "<br>" + '<span class="subclass"></span>' + '<span class="cost"></span>' + "<br>" + '<span class="prereqs"></span>' + "</div>" + '<div class="description"></div>' + '<div class="effects">' + "<span></span>" + "<div></div>" + "</div>" + "</div>";
         return $(template)
      }

      function fillTooltipData(jTooltip, level) {
         if (jTooltip.length === 0)
            return;
         var effectsLabel = "";
         var effects = "";
         if (aa.effects.length > 0) {
            effectsLabel = "Effects:";
            effects = aa.getEffectForLevel(level === 0 ? level + 1 : level)
         }
         var costText = "";
         var aaCost = aa.actualCost();
         if (level < aa.max_level)
            costText = aaCost + " " + (aaCost > 1 ? "points" : "point");
            
         $(".header .name", jTooltip).text(aa.name);
         $(".header .rank", jTooltip).text("Rank (" + level + "/" + aa.max_level + ")");
         $(".header .subclass", jTooltip).text(aa.subclass);
         $(".header .cost", jTooltip).text(costText).toggleClass("spent", aa.level > 0);
         $(".header .prereqs", jTooltip).html(buildPrereqsList(aaCost));
         $(".description", jTooltip).text(aa.description);
         $(".effects > span", jTooltip).text(effectsLabel);
         $(".effects > div", jTooltip).html(effects);
         
         function buildPrereqsList(aaCost) {
            var list = "<ul>";
            if (!aa.satisfiesPrerequisites()) {
               list += makePrereqItem("parent");
               list += makePrereqItem("subtree");
               list += makePrereqItem("parent_subtree");
               list += makeTreeRatioItem();
               list += makePrereqItem("tree");
               list += makePrereqItem("global")
            }
            if (aa.level === 0)
               list += makeTitleItem(aaCost);
            list += "</ul>";
            return list;
            function makeTreeRatioItem() {
               if (aa.tree.x_y_ratio > 0) {
                  var text = "Every {Ratio} points in {x} unlocks 1 point in {y}".replace("{Ratio}", aa.tree.x_y_ratio).replace("{x}", aa.tree.x_subclass).replace("{y}", aa.tree.y_subclass);
                  return listItem(text)
               }
               return ""
            }

            function makePrereqItem(prereqName) {
               var prereqText = {
                  global: "Requires {0} points spent globally.",
                  tree: "Requires {0} points spent in the {1} tree.",
                  subtree: "Requires {0} points spent in {1}",
                  parent_subtree: "Requires {0} points spent in {1}",
                  parent: "Requires {0} (Rank {1})"
               };
               var result = "";
               if (aa.prereqs[prereqName] > 0) {
                  var text = getPrereqText(prereqName);
                  result = listItem(text)
               }
               return result
            }

            function getPrereqText(prereqName) {
               var prereqText = {
                  global: "Requires {0} points spent globally.",
                  tree: "Requires {0} points spent in the {1} tree.",
                  subtree: "Requires {0} points spent in {1}",
                  parent_subtree: "Requires {0} points spent in {1}",
                  parent: "Requires {0} (Rank {1})",
                  second_parent: "{0} (Rank {1})"
               };

               var pointsNeeded = aa.prereqs[prereqName];

               switch (prereqName) {
                  case "global":
                     return prereqText.global.replace("{0}", pointsNeeded);
                  case "tree":
                     return prereqText.tree.replace("{0}", pointsNeeded).replace("{1}", aa.tree.name);
                  case "subtree":
                     return prereqText.subtree.replace("{0}", pointsNeeded).replace("{1}", aa.subclass);
                  case "parent_subtree":
                     return prereqText.subtree.replace("{0}", pointsNeeded).replace("{1}", aa.parentSubtreeName());
                  case "parent":
                     var parents = aa.parents();
                     var result = prereqText.parent.replace("{0}", parents[0].name).replace("{1}", pointsNeeded);
                     
                     if (parents.length == 2) {
                        result += " or " +  prereqText.second_parent.replace("{0}", parents[1].name).replace("{1}", pointsNeeded);
                     }
                     
                     return result;
               }
               return "";
            }

            function makeTitleItem(aaCost) {
               if (aa.title.length > 0) {
                  var titleText = 'Grants the prefix title "{Title}" with {Cost} {Points} spent'.replace("{Title}", aa.title).replace("{Cost}", aaCost).replace("{Points}", aaCost > 1 ? "points" : "point");
                  return listItem(titleText)
               }
               return ""
            }

            function listItem(text) {
               return "<li>" + text + "</li>"
            }

         }

      }

   }

};
