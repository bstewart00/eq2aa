namespace("Beetny.EQ2AA.Rendering");
Beetny.EQ2AA.Rendering.RaphaelRenderer = Class.extend({
   createCanvas: function(containerElement, width, height) {
      return Raphael(containerElement, width, height)
   },
   updateAAColor: function(aa, components) {
      var strokeColor;
      var fillColor;
      switch (aa.level) {
         case 0:
            strokeColor = "#FFFFFF";
            fillColor = "none";
            break;
         case aa.max_level:
            strokeColor = "#339933";
            fillColor = "#336600";
            break;
         default:
            strokeColor = "#ffff00";
            fillColor = "#999900";
            break
      }
      components.aaCircle.attr("stroke", strokeColor);
      components.levelCircle.attr({
         "stroke": strokeColor,
         "fill": fillColor
      });
      if (aa.hasParents()) {
         components.parentLines.forEach(function(line) {
            line.attr("stroke", aa.level > 0 ? "#339933" : "#666666");
         });
      }
   },
   updateAAVisibility: function(aa, components) {
      var visible = aa.satisfiesPrerequisites();
      if (visible) {
         components.levelCircle.show();
         components.levelNumber.show()
      } else {
         components.levelCircle.hide();
         components.levelNumber.hide()
      }
   },
   renderAAComponents: function(canvas, aa) {
      var iconSize = Beetny.EQ2AA.Rendering.ICON_SIZE;
      var tree = aa.tree;
      return {
         aaCircle: aaCircle(),
         levelCircle: levelCircle(),
         parentLines: linesToParent()
      };
      function aaCircle() {
         var aaRadius = iconSize / 2;
         return canvas.circle(aa.coords[0] + aaRadius, aa.coords[1] + aaRadius, aaRadius).attr("stroke-width", 4).toFront()
      }

      function levelCircle() {
         var levelCircleRadius = 11;
         var levelCircleOffsets = {
            x: 5,
            y: 4
         };
         return canvas.circle(aa.coords[0] + iconSize + levelCircleOffsets.x, aa.coords[1] + iconSize + levelCircleOffsets.y, levelCircleRadius).attr("stroke-width", 2).hide().toBack()
      }

      function linesToParent() {
         return aa.parents().map(function(parent) {
            var x1 = aa.coords[0] + iconSize / 2;
            var y1 = aa.coords[1] + iconSize / 2;
            var x2 = parent.coords[0] + iconSize / 2;
            var y2 = parent.coords[1] + iconSize / 2;
            return canvas.path("M" + x1 + " " + y1 + "L" + x2 + " " + y2).attr("stroke-width", 3).toBack();
         });
      }

   }

});
