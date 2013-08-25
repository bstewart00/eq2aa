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
   init : function() {
      this._xmlBuilder = new Beetny.XmlBuilder();
   },

   exportClass : function(classModel) {
      var introComment = '\nExported by Beetny EQ2 Calculator\nView this build at ' + window.location + '\n' +
      'Save this file to the EverQuest2 directory and Load via the AA window.\n';
      
      this._xmlBuilder.appendComment(introComment);
      var aaElem = this._xmlBuilder.appendChild('aa', { 'game': 'eq2' });
      
      classModel.trees.filter(function(tree) {
         return tree.getTotalPointsSpent() > 0;
      }).forEach(function(tree) {
         this._exportTree(tree, aaElem);
      }, this);
      
      return this._xmlBuilder.prettify().build();
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
   }
});
