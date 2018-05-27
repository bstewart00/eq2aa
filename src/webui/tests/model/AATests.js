describe('AA', function() {
	var aa = {
		id : 0,
		soe_id : 0,
		name : "SomeAA",
		level : 0,
		cost: 1,
		max : 5,
        prereqs: {
          global: 0, 
          parent: 0, 
          parent_subtree: 0, 
          subtree: 0, 
          tree: 0
       }
	};
	
	var tree = {
		getGlobalPointsSpent: sinon.stub(),
		getTotalPointsSpent: sinon.stub(),
		getParentSubtreeName: sinon.stub(),
		calculateDerivedPoints: sinon.stub(),
		getAvailablePoints: sinon.stub(),
		notifyPointsSpentInSubtree: sinon.stub(),
		subtrees: {
			
		}
	};
	
	var sut = new Beetny.EQ2AA.Model.AA(aa, tree);

	describe('satisfiesPrerequisites', function() {
		when('aa level is zero', function() {
			sut.level = 0;
			sut.cost = 2;
			
			when('tree does not have enough available points to cover aa cost', function () {
				tree.getAvailablePoints.returns(1);
				
				it('is false', function() {
					sut.satisfiesPrerequisites().should.be.false;
				});
			});
			
			when('tree has enough available points to cover aa cost', function () {
				tree.getAvailablePoints.returns(2);
				
				it('is true', function() {
					sut.satisfiesPrerequisites().should.be.true;
				});
			});
		});
		
		when('aa level is > 0 and tree has available points to spend', function () {
			sut.level = 1;
			sut.cost = 2;
			tree.getAvailablePoints.returns(10);
			
			when('aa has a global point prerequisite', function () {
				sut.prereqs.global = 10;
					
				when("global points is less than the prereq", function () {
					tree.getGlobalPointsSpent.returns(5);
					
					it('is false', function () {
						sut.satisfiesPrerequisites().should.be.false;	
					});
				});
				
				when("global points excluding the aa's spent points is less than the prereq", function () {
					tree.getGlobalPointsSpent.returns(10);
					
					it('is false', function () {
						sut.satisfiesPrerequisites().should.be.false;	
					});
				});
				
				when("global points excluding the aa's spent points is equal to the prereq", function () {
					tree.getGlobalPointsSpent.returns(12);
					
					it('is true', function () {
						sut.satisfiesPrerequisites().should.be.true;	
					});
				});
			});
			
			when('aa has a tree prerequisite', function () {
				sut.prereqs.tree = 10;

				when("tree points is less than the prereq", function () {
					tree.getTotalPointsSpent.returns(5);
					
					it('is false', function () {
						sut.satisfiesPrerequisites().should.be.false;	
					});
				});
				
				when("tree points excluding the aa's spent points is less than the prereq", function () {
					tree.getTotalPointsSpent.returns(10);
					
					it('is false', function () {
						sut.satisfiesPrerequisites().should.be.false;	
					});
				});
				
				when("tree points excluding the aa's spent points is equal to the prereq", function () {
					tree.getTotalPointsSpent.returns(12);
					
					it('is true', function () {
						sut.satisfiesPrerequisites().should.be.true;	
					});
				});
			});
			
			when('aa has multiple prerequisites', function () {
				sut.prereqs.tree = 10;
				sut.prereqs.global = 10;
				
				when('aa satisfies one prereq', function () {
					tree.getTotalPointsSpent.returns(50);
					
					it('is false', function () {
						sut.satisfiesPrerequisites().should.be.false;
					});
				});
				
				when('aa satisfies both prereqs', function () {
					tree.getTotalPointsSpent.returns(50);
					tree.getGlobalPointsSpent.returns(50);
					
					it('is true', function () {
						sut.satisfiesPrerequisites().should.be.true;
					});
				});
			});
		});
	});
	
	describe('spendPoints', function () {
		sut.level = 3;
		sut.cost = 2;
		sut.max_level = 5;
		sut.subclass = 'subclass';
		
		when('spending zero points', function () {
			sut.spendPoints(0);
			
			it('does nothing', function () {
				sut.level.should.equal(3);
				tree.notifyPointsSpentInSubtree.should.not.have.been.called;				
			});
		});
		
		when('spending one point', function () {
			sut.spendPoints(1);
			
			it('adds one level to aa', function () {
				sut.level.should.equal(4);
			});
			
			it('notifies tree of new points spent in subtree', function () {
				tree.notifyPointsSpentInSubtree.should.have.been.calledWith(sut.subclass, 2);
			});
		});
		
		when('aa is already at max level', function () {
			sut.level = 5;	
			
			when('spending one point', function () {
				sut.spendPoints(1);
				
				it('adds no levels', function () {
					sut.level.should.equal(5);
				});
			});			
		});
	});
});
