namespace("Beetny.EQ2AA");
Beetny.EQ2AA.ClassLoader = Class.extend({
		init : function (treeDir) {
			this._treeDir = treeDir;
			if (this._treeDir.charAt(this._treeDir.length - 1) !== "/")
				this._treeDir += "/";
			this._classObjCache = {}

		},
		loadClass : function (classId) {
			if (classId == undefined)
				return null;
			var self = this;
			var className = Beetny.EQ2AA.Constants.ClassNames[classId];
			var classObj = this._classObjCache[classId];
			if (!classObj)
				$.ajax({
					url : this._treeDir + className + ".json",
					dataType : "json",
					async : false,
					success : function (json) {
						self._classObjCache[classId] = classObj =
							new Beetny.EQ2AA.Model.Class(json)
					}
				});
			return classObj
		}
	})