describe('HashUpgrader', function() {
	var idRemapper = new Beetny.EQ2AA.BackwardsCompatibility.HashIdRemapper();
	var sut = new Beetny.EQ2AA.BackwardsCompatibility.HashUpgrader(idRemapper);

	when('hash is GU68', function() {
		when('one point spent in first tree', function() {
			var hash = "GU68;ot01";
			var expectedHash = "GU101;ot0!1";

			it('changes tree hash to include suffix', function() {
				var upgradedHash = sut.upgradeHash(hash);
				upgradedHash.should.equal(expectedHash);
			});
		});

		when('one point spent in several trees', function() {
			var hash = 'GU68;ot01t11t21t401t51t61tf1tp1';
			var expectedHash = 'GU101;ot0!1t1!1t2!1t4!01t5!1t6!1tf!1tp!1';

			it('changes tree hash to include suffix', function() {
				var upgradedHash = sut.upgradeHash(hash);
				upgradedHash.should.equal(expectedHash);
			});
		});
	});
});
