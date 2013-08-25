namespace("Beetny.EQ2AA");
Beetny.EQ2AA.Command = Class.extend({
   init : function (id, name, description) {
      this.id = id;
      this.name = name;
      this.description = description;
   },
   _template: '<li class="command {commandId}" title="{Title}"><a href="javascript:;">{Name}</a></li>',
   render: function () {
      var html = this._template.replace("{commandId}", this.id).replace("{Title}", this.description).replace("{Name}", this.name);
      return this._element = $(html);
   },
   execute: function () {}
});

Beetny.EQ2AA.AATreeViewerCommand = Beetny.EQ2AA.Command.extend({
      _template: '<li class="command {commandId}" title="{Title}"><a href="javascript:;">{Name}</a></li>',
		execute: function (aaTreeViewer) {}

	});
Beetny.EQ2AA.ResetAllCommand = Beetny.EQ2AA.AATreeViewerCommand.extend({
		init : function () {
			this._super("resetAll", "Reset All", "Resets all trees in the current class.");
		},
		execute : function (aaTreeViewer) {
			aaTreeViewer.resetClass();
		}
	});
Beetny.EQ2AA.ResetTreeCommand = Beetny.EQ2AA.AATreeViewerCommand.extend({
		init : function () {
			this._super("resetTree", "Reset Tree", "Resets the currently selected tree.")
		},
		execute : function (aaTreeViewer) {
			aaTreeViewer.resetActiveTree();
		}
	});
Beetny.EQ2AA.ExportCommand = Beetny.EQ2AA.AATreeViewerCommand.extend({
		init : function () {
			this._super("export", "Export", "Creates a link to the current build.")
		},
		render : function () {
			var element = this._super();
			$("a", element).attr("target", "_blank");
			return element;
		}
	});
	
Beetny.EQ2AA.ExportXmlCommand = Beetny.EQ2AA.Command.extend({
      init : function () {
         this._super("export-xml", "Export to File", "Creates .aa file that can be imported directly into EQ2.")
      },
      render : function () {
         var element = this._super();
         var form = 
         '<form method="POST" action="Export.php">' +
            '<input type="hidden" name="export-xml-data">' +
         '</form>';
         $(form).appendTo(element);
         
         return element;
      },
      execute : function () {
         var data = 'someData';
         var form = $('form', this._element);
         $('input[name=export-xml-data]').val(data);
         
         form.submit();
      }
   });
Beetny.EQ2AA.PrintCommand = Beetny.EQ2AA.AATreeViewerCommand.extend({
		init : function () {
			this._super("print", "Print", "Creates a text summary suitable for printing.")
		},
		render : function () {
			var element = this._super();
			$("a", element).attr("target", "_blank");
			return element;
		},
		execute : function (aaTreeViewer) {
			aaTreeViewer.printClass();
		}
	});
Beetny.EQ2AA.Commands = [new Beetny.EQ2AA.ResetAllCommand, new Beetny.EQ2AA.ResetTreeCommand, new Beetny.EQ2AA.ExportCommand,  new Beetny.EQ2AA.ExportXmlCommand, new Beetny.EQ2AA.PrintCommand];