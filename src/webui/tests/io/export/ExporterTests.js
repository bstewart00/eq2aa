describe('Exporter', function () {
	
	var xmlBuilder = new Beetny.XmlBuilder();
	var sut = new Beetny.EQ2AA.XmlExporter(xmlBuilder);
	
	var classModel = {
		
	};
	
   it('does stuff', function () {
   		var result = sut.exportClass(classModel)
   		
   		result.should.equal("");
   });
});
