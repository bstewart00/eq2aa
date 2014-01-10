Beetny.XmlBuilder = Class.extend({
   init : function() {
      this._doc = document.implementation.createDocument("", "", null);
   },

   appendComment : function(text, parent) {
      parent = parent || this._doc;

      var node = this._doc.createComment(text);
      parent.appendChild(node);
   },

   appendChild : function(tagName, attributeMap, parent) {
      parent = parent || this._doc;
      attributeMap = attributeMap || {};

      var element = this._doc.createElementNS("", tagName);

      Object.items(attributeMap).forEach(function(kvp) {
         var attr = document.createAttribute(kvp.key);
         attr.nodeValue = kvp.value;
         element.setAttributeNode(attr);
      });

      parent.appendChild(element);

      return element;
   },

   prettify : function() {
      this._prettyPrint = true;
      return this;
   },

   build : function() {
      var declaration = '<?xml version="1.0" encoding="UTF-8"?>';
      var xml = declaration + new XMLSerializer().serializeToString(this._doc);

      return this._prettyPrint ? this._formatXml(xml) : xml;
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
   }
}); 