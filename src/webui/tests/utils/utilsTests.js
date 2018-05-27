describe('collateAdjacentDuplicates', function() {	
	when('array is empty', function () {
		var array = [];
		
		it('returns an empty array', function () {
			array.collateAdjacentDuplicates().should.be.empty;
		});
	});
	
	when('array contains no duplicates', function () {
		var array = ['0', '1', '2', '3'];
		
		it('leaves array unchanged', function () {
			array.collateAdjacentDuplicates().should.deep.equal(['0', '1', '2', '3']);
		});
	});
	
	when('array contains duplicates', function () {
		var array = ['0', '0', '0', '0', '1', '1', '1', '5', '1', '2', '2', '2'];
		
		it('combines elements with the same value together as a concatenated string', function () {
			array.collateAdjacentDuplicates().should.deep.equal(['0000', '111', '5', '1', '222']);
		});
	});
});
