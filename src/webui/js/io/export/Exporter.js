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
   },
   
   exportClass : function(classModel) {
      this._stringBuilder = new Beetny.StringBuilder();      
      this._appendExportComment();
      this._stringBuilder.appendLine('<?xml version="1.0" encoding="UTF-8"?>');
      this._stringBuilder.appendLine('<aa game="eq2">');

      classModel.trees.filter(function(tree) {
         return tree.getTotalPointsSpent() > 0;
      }).forEach(this._exportTree, this);

      this._stringBuilder.appendLine('</aa>');

      /*
       * 0 - Subclass, Class, Shadows, Heroic
1 - Beastlord Pet Specialization
2 - Prestige
3 - Tradeskill
4 - Prestige Tradeskill

       * 
       *
       * Add "Exported by Beetny comment, including URL link to build"
       * <aa game="eq2">
       * For each tree in [valid tree order]
       *    <alternateadvancements typenum="{TYPENUM}">
       *    set order = 1
       *    For each spent AA, sorted by
       *          - number of prerequisites and/or x, y location ascending
       *          <alternateadvancement order="{i}" treeID="{TreeSoeID}" id="{AASoeId}"/>
       *          order++
       * </alternateadvancements>
       * </aa>
       *
       * Send file as download somehow. Make POST with XML string to server, to send back as binary data?
       *
       * Tradeskill, then Subclass, then Class, then Shadows, then Heroic, then Prestige, I think your export should always be valid. That's my theory at least. ;)
       *
       */

      return this._version + ";" + classModel.createHash();
   },

   _appendExportComment : function() {
      var comment = '<!-- Exported by http://www.beetny.com/eq2aa !-->'
      this._stringBuilder.appendLine(comment);
   },

   _exportTree : function(tree) {
      this._stringBuilder.appendLine('<alternateadvancements typenum="{0}">'.replace(/{0}/, tree.typeNum()));
      this._stringBuilder.appendLine('<!--' + tree.name + '!-->');
      this._stringBuilder.appendLine('</alternateadvancements>');
   }
});