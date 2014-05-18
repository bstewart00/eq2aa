describe('Exporter', function () {
	
	var xmlBuilder = new Beetny.XmlBuilder();
	var sut = new Beetny.EQ2AA.XmlExporter(xmlBuilder);
	
	var classModel = new Beetny.TestClassBuilder()
		.addTree(0, 'Archetype')
		.build();		
	
   it('does stuff', function () {
   		var result = sut.exportClass(classModel)
   		console.log(result);
   		
   		result.should.equal("");
   });
});

Beetny.TestClassBuilder = Class.extend({
	init: function () {
		this._trees = [];
	},
	
	addTree: function (id, treeType) {
		this._trees.push({
			id: id,
			soe_id: id,
			name: 'SomeTree' + treeType,
			type: treeType,
			aa: [this._createAA(0)],
			subtrees: { 'Subtree' : 1 }
		});
		
		return this;
	},
	
	build: function () {
		return new Beetny.EQ2AA.Model.Class({
			id: 0,
			name: 'SomeClass',
			trees: this._trees,
			points: {}
		});
	},
	
	_createAA: function(id) {
		var aa = {
			id: id,
			soe_id: id,
			name: "SomeAA" + id,
			level: 1,
			max: 5
		};
		return aa;
	}
});

