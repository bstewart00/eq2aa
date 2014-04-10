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
       * 1 = Warder, Order# resets per t ree
       * 2 = Prestige
       * 3 = Tradeskill
       * 4 = Tradeskill Prestige
       */
      
      var groups = classModel.trees.filter(function(tree) {
         return tree.getTotalPointsSpent() > 0;
      }).map(function (tree) { 
		return { 
			"tree": tree, 
			"serializationInfo": this._treeSerializationInfo(tree) 
		};      	
  	  }, this).groupBy(function (obj) {
  		 return obj.serializationInfo.typenum;
      });
      
      Object.items(groups).forEach(function (typenum, treeInfo) {
			
      });
      
      groups.forEach(function(group) {
         this._exportTreeGroup(group, aaElem);
      }, this);
      
      // Group by typenum
      // Build container element per typenum
      // For each tree
      //   dump points
      //   if typenum does not share points, reset order
      
      return this._xmlBuilder.prettify().build();
   },
   
   _exportTreeGroup: function (group, parentElement) {
      var elem = this._xmlBuilder.appendChild('alternateadvancements', { 'typenum': group.serializationInfo.typenum }, parentElement)
      
      var order = 1;
      tree.aa.filter(function (aa) {
         return aa.level > 0;
      }).forEach(function (aa) {
         for (var i = 1; i <= aa.level; i++) {
            this._xmlBuilder.appendChild('alternateadvancement', { 'order': order++, 'treeID': tree.soe_id, 'id':aa.soe_id }, treeElem);
         }
      }, this);
   },

   _exportTree : function(tree, parentElement) {
      var treeElem = this._xmlBuilder.appendChild('alternateadvancements', { 'typenum': tree.typeNum() }, parentElement)
      
      var order = 1;
      tree.aa.filter(function (aa) {
         return aa.level > 0;
      }).forEach(function (aa) {
         for (var i = 1; i <= aa.level; i++) {
            this._xmlBuilder.appendChild('alternateadvancement', { 'order': order++, 'treeID': tree.soe_id, 'id':aa.soe_id }, treeElem);
         }
      }, this);
   },
   
   _treeSerializationInfo: function (tree) {
      switch(this.type) {
         case 'Archetype':
         case 'Class':
         case 'Shadows':
         case 'Heroic':
         case 'Dragon':
            return new Beetny.EQ2AA.TreeXmlSerializationInfo(0, false);
         case 'Warder':
            return new Beetny.EQ2AA.TreeXmlSerializationInfo(1, true);
         case 'Prestige':
            return new Beetny.EQ2AA.TreeXmlSerializationInfo(2, true);
         case 'Tradeskill':
            return new Beetny.EQ2AA.TreeXmlSerializationInfo(3, true);
         case 'TradeskillPrestige':
            return new Beetny.EQ2AA.TreeXmlSerializationInfo(4, true);
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
