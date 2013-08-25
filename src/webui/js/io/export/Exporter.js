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
      
      var order = 1;
      tree.aa.filter(function (aa) {
         return aa.level > 0;
      }).forEach(function (aa) {
         this._exportAA(aa, order++, tree.soe_id, element);
      }, this);
   },
   
   _exportAA: function (aa, order, treeId, parentElement) {
      var element = document.createElementNS("", "alternateadvancement");
      var orderAttr = document.createAttribute("order");
      orderAttr.nodeValue = order;
      element.setAttributeNode(orderAttr);
      
      var treeIdAttr = document.createAttribute("treeID");
      treeIdAttr.nodeValue = treeId;
      element.setAttributeNode(treeIdAttr);
         
      var aaIdAttr = document.createAttribute("id");
      aaIdAttr.nodeValue = aa.soe_id;
      element.setAttributeNode(aaIdAttr);
      
      parentElement.appendChild(element);
   }
});
