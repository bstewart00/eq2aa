describe('Class', function() {
	var sut = new Beetny.TestClassBuilder().addTree(0, 'Archetype').addTree(1, 'Class').build();

	describe('loadHash', function() {
		when('two trees with one aa each', function() {
			sut.loadHash('GU68;ot05t14');

			it('loads AA in each tree', function() {
				sut.points.AA.spent.should.equal(9);
				sut.trees[0].aa[0].level.should.equal(5);
				sut.trees[1].aa[0].level.should.equal(4);
			});
		});
	});
});
