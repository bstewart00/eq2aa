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
      this._xmlBuilder.appendComment('Exported by http://www.beetny.com/eq2aa');
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
         this._xmlBuilder.appendChild('alternateadvancement', { 'order': order++, 'treeID': tree.soe_id, 'id':aa.soe_id }, treeElem);
      }, this);
   }
});
