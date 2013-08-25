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

   _formatXml : function(xml) {
      var formatted = '';
      var reg = /(>)(<)(\/*)/g;
      xml = xml.replace(reg, '$1\r\n$2$3');
      var pad = 0;
      jQuery.each(xml.split('\r\n'), function(index, node) {
         var indent = 0;
         if (node.match(/.+<\/\w[^>]*>$/)) {
            indent = 0;
         } else if (node.match(/^<\/\w/)) {
            if (pad != 0) {
               pad -= 1;
            }
         } else if (node.match(/^<\w[^>]*[^\/]>.*$/)) {
            indent = 1;
         } else {
            indent = 0;
         }

         var padding = '';
         for (var i = 0; i < pad; i++) {
            padding += '  ';
         }

         formatted += padding + node + '\r\n';
         pad += indent;
      });

      return formatted;
   },

   exportClass : function(classModel) {
      // creates a Document object with root "<report>"
      var doc = document.implementation.createDocument("", "", null);
      this._appendExportComment(doc);

      var aaElem = doc.createElementNS("", "aa");

      var a = document.createAttribute("game");
      a.nodeValue = "eq2";
      aaElem.setAttributeNode(a);
      doc.appendChild(aaElem);

      classModel.trees.filter(function(tree) {
         return tree.getTotalPointsSpent() > 0;
      }).forEach(function(tree) {
         this._exportTree(tree, aaElem);
      }, this);

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

      var declaration = '<?xml version="1.0" encoding="UTF-8"?>';
      var xml = declaration + new XMLSerializer().serializeToString(doc);
      return this._formatXml(xml);
   },

   _appendExportComment : function(parentElement) {
      var comment = 'Exported by http://www.beetny.com/eq2aa'
      var a = document.createComment();
      a.nodeValue = comment;
      parentElement.appendChild(a);
   },

   _exportTree : function(tree, parentElement) {
      var element = document.createElementNS("", "alternateadvancements");
      var a = document.createAttribute("typenum");
      a.nodeValue = tree.typeNum();
      element.setAttributeNode(a);

      parentElement.appendChild(element);
   }
});
