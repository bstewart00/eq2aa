Beetny.TestClassBuilder = Class.extend({
	init : function() {
		this._trees = [];
	},

	addTree : function(id, treeType) {
		this._trees.push({
			id : id,
			soe_id : id,
			name : 'SomeTree' + treeType,
			type : treeType,
			aa : [this._createAA(0)],
			subtrees : {
				'Subtree' : 1
			}
		});

		return this;
	},

	build : function() {
		return new Beetny.EQ2AA.Model.Class({
			id : 0,
			name : 'SomeClass',
			trees : this._trees,
			points : {
				"AA" : {
					"max" : 350,
					"name" : "AA"
				}
			}
		});
	},

	_createAA : function(id) {
		var aa = {
			id : id,
			soe_id : id,
			name : "SomeAA" + id,
			level : 1,
			cost: 1,
			max : 5
		};
		return aa;
	}
});

