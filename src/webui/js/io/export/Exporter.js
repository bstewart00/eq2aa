namespace("Beetny.EQ2AA");
Beetny.EQ2AA.Exporter = Class.extend({
   init : function(version) {
      this._version = version;
   },
   exportClass : function(classModel) {
      return this._version + ";" + classModel.createHash();
   }
});

Beetny.EQ2AA.XmlExporter = Class.extend({
   init : function(xmlBuilder) {
      this._xmlBuilder = xmlBuilder;
   },

   exportClass : function(classModel) {
      var introComment = '\nExported by Beetny EQ2 Calculator\nView this build at ' + window.location + '\n' +
      'Save this file to the EverQuest2 directory and Load via the AA window.\n';
      
      this._xmlBuilder.appendComment(introComment);
      var aaElem = this._xmlBuilder.appendChild('aa', { 'game': 'eq2' });
      
      /*
       * typenum per AA window SECTION
       * 0 = Arch, Class, Shadows, Heroic, Dragon. Order# SHARED
       * 1 = Warder, Order# resets per tree
       * 2 = Prestige
       * 3 = Tradeskill
       * 4 = Tradeskill Prestige
       */
      
      var treesWithPoints = classModel.trees.filter(function(tree) {
         return tree.getTotalPointsSpent() > 0;
      });
      
      var groups = treesWithPoints.map(function (tree) { 
		return { 
			"tree": tree, 
			"serializationInfo": this._treeSerializationInfo(tree) 
		};      	
  	  }, this).groupBy(function (obj) {
  		 return obj.serializationInfo.typenum;
      });
      
      Object.items(groups).forEach(function (group) {
		 this._processGroup(group, aaElem);
      }, this);
      
      // Group by typenum
      // Build container element per typenum
      // For each tree
      //   dump points
      //   if typenum does not share points, reset order
      
      return this._xmlBuilder.prettify().build();
   },
   
   _processGroup: function (group, aaElem) {
  		var typenum = group.key;
  		var treesInGroup = getOrderedTreesForExport(group.value);
  		
  		var groupContainer = this._xmlBuilder.appendChild('alternateadvancements', { 'typenum': typenum }, aaElem)
  		
  		var i = 0;
  		this._aaOrder = 1;
  		treesInGroup.forEach(function (treeInfo) {
  			var tree = treeInfo.tree;
  			var serializationInfo = treeInfo.serializationInfo;
  			
  			if (i > 0 && serializationInfo.orderResetPerTree) {
  				this._aaOrder = 1;
  			}
  			
  			this._processTree(tree, groupContainer);
						
			++i;			
		}, this);
		
		function getOrderedTreesForExport(treeInfos) {
			return treeInfos.slice(0).sort(function (treeinfoA, treeinfoB) {
				var orderA = Beetny.EQ2AA.Constants.TreeExportOrder.indexOf(treeinfoA.tree.type);
				orderA = orderA == -1 ? 0 : orderA;
				var orderB = Beetny.EQ2AA.Constants.CategoryOrder.indexOf(treeinfoB.tree.type);
				orderB = orderB == -1 ? 0 : orderB;
									
				return orderA - orderB;
			});
		}
   },
   
   _processTree: function (tree, parentElem) {
		tree.aa.filter(function (aa) {
		   return aa.level > 0;
		}).forEach(function (aa) {
			this._processAA(aa, tree, parentElem);
		}, this);
   },
   
   _processAA: function (aa, tree, parentElem) {
	   for (var i = 1; i <= aa.level; i++) {
	      this._xmlBuilder.appendChild('alternateadvancement', { 'order': this._aaOrder++, 'treeID': tree.soe_id, 'id':aa.soe_id }, parentElem);
	   }
   },
   
   _treeSerializationInfo: function (tree) {
      switch(tree.category.id) {
         case 'AA':
            return new Beetny.EQ2AA.TreeXmlSerializationInfo(tree.category.typenum, false);
         case 'Warder':
            return new Beetny.EQ2AA.TreeXmlSerializationInfo(tree.category.typenum, true);
         case 'Prestige':
            return new Beetny.EQ2AA.TreeXmlSerializationInfo(tree.category.typenum, true);
         case 'Tradeskill':
            return new Beetny.EQ2AA.TreeXmlSerializationInfo(tree.category.typenum, true);
         case 'TradeskillPrestige':
            return new Beetny.EQ2AA.TreeXmlSerializationInfo(tree.category.typenum, true);
         default:
            return new Beetny.EQ2AA.TreeXmlSerializationInfo(tree.category.typenum, false);
      }
      return null;
   }
});


Beetny.EQ2AA.TreeXmlSerializationInfo = Class.extend({
	init: function (typenum, orderResetPerTree) {
		this.typenum = typenum;
		this.orderResetPerTree = orderResetPerTree;
	}
});
