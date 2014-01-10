namespace("Beetny.EQ2AA.Model");
Beetny.EQ2AA.Model.AA = Class.extend({
   init: function(aaJson, parentTree) {
      $.extend(this, aaJson);
      this.tree = parentTree;
   },

   getEffectForLevel: function(level) {
      if (level < 1 || level > this.max_level)
         return null;
      return this.effects[level - 1];
   },

   remainingLevels: function() {
      return this.max_level - this.level;
   },

   hasBackdrop: function() {
      return this.icon.backdrop > -1;
   },

   hasParents: function() {
      return this.parent_ids.length > 0;
   },

   parent: function() {
      return this.hasParents() ? this.tree.aa[this.parent_ids[0]] : null;
   },

   parents: function() {
      return this.parent_ids.map(function(id) {
         return this.tree.aa[id];
      }, this);
   },

   parentSubtreeName: function() {
      return this.tree.getParentSubtreeName(this.subclass);
   },
   
   actualCost: function () {   	
   		if (this._isHeroicExpertise()) {
   			var spentExpertiseAASiblings = this.tree.aa.filter(function (aa) {
   				return aa.id !== this.id && aa._isHeroicExpertise() && aa.level > 0;
   			}, this);
   			
			if (spentExpertiseAASiblings.length === 1)
   				return 20;
			if (spentExpertiseAASiblings.length === 2)
   				return 30;
		}
   	
   		return this.cost;
   },
   
   _isHeroicExpertise: function () {
   		return this.tree.type === 'Heroic' && this.prereqs.subtree === 48;
   },

   prerequisiteHandlers: {
      "global": function(required_points) {
         var globalPoints = this.tree.getGlobalPointsSpent();
         globalPoints -= this.level * this.actualCost();
         return globalPoints >= required_points;
      },

      "tree": function(required_points) {
         var treePoints = this.tree.getTotalPointsSpent();
         treePoints -= this.level * this.actualCost();
         return treePoints >= required_points;
      },

      "parent_subtree": function(required_points) {
         return this.tree.subtrees[this.tree.getParentSubtreeName(this.subclass)] >= required_points;
      },

      "subtree": function(required_points) {
         var subtreePoints = this.tree.subtrees[this.subclass];
         subtreePoints -= this.level * this.actualCost();

         if (this.subclass === this.tree.y_subclass)
            return this.tree.calculateDerivedPoints() - subtreePoints >= required_points;
         else
            return subtreePoints >= required_points;
      },

      "parent": function(required_level) {
         return this.parents().some(function(parent) {
            return parent.level >= required_level;
         });
      }

   },

   satisfiesPrerequisites: function() {
      var result = true;
      if (this.level === 0 && this.tree.getAvailablePoints() < this.actualCost())
         return false;

      Object.iterItems(this.prereqs, function(prereq, required_points) {
         if (required_points === 0)
            return true;
         return result = this.prerequisiteHandlers[prereq].call(this, required_points);
      }, this);
      return result;
   },

   spendPoints: function(numPoints) {
      if (numPoints === 0 || !this.satisfiesPrerequisites())
         return 0;

      var currentLevel = this.level;
      var futureLevel = this.level + numPoints;
      futureLevel = Math.max(0, Math.min(futureLevel, this.max_level));
      this.level = futureLevel;
      var pointsUsed = (futureLevel - currentLevel) * this.actualCost();
      this.tree.notifyPointsSpentInSubtree(this.subclass, pointsUsed);

      return pointsUsed;
   }

});
