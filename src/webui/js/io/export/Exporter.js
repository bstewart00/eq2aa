namespace("Beetny.EQ2AA");
Beetny.EQ2AA.Exporter = Class.extend({
		init : function (version) {
			this._version = version || Beetny.EQ2AA.GameVersions.LatestUpdate
		},
		exportClass : function (classModel) {
			return this._version + ";" + classModel.createHash()
		}
	});

Beetny.EQ2AA.UrlHashExporter = {}; 
Beetny.EQ2AA.XmlExporter = Class.extend({
      init : function (version) {
         this._version = version || Beetny.EQ2AA.GameVersions.LatestUpdate
      },
      exportClass : function (classModel) {
         /*
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
          */
         
         return this._version + ";" + classModel.createHash()
      }
   });