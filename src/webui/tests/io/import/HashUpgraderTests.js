describe('HashUpgrader', function() {
	var idRemapper = new Beetny.EQ2AA.BackwardsCompatibility.HashIdRemapper();
	var sut = new Beetny.EQ2AA.BackwardsCompatibility.HashUpgrader(idRemapper);

	when('hash is GU68 - Beastlord', function() {
		when('one point spent in first tree', function() {
			var hash = "GU68;ot01";
			var expectedHash = "GU101;ot22!1";

			it('changes tree id to soe_id with separator token', function() {
				var upgradedHash = sut.upgradeHash(hash);
				upgradedHash.should.equal(expectedHash);
			});
		});

		when('all trees', function() {
			var hash = "GU68;ot010a@300a@300a30@3110@58t1150@450@550@55t2105@30@35@30@35@4t30aa0aa00aa001t4550055t510330012010030@3330@31t6150@450@35tf1tp10a0@3a0@3a0@3a0@31";
			var expectedHash = 'GU101;ot22!10a@300a@300a30@3110@58t23!150@450@550@55t24!105@30@35@30@35@4t25!0aa0aa00aa001t21!550055t3c!10330012010030@3330@31t3d!150@450@35t2j!1t3m!10a0@3a0@3a0@3a0@31';

			it('changes tree id to soe_id with separator token', function() {
				var upgradedHash = sut.upgradeHash(hash);
				upgradedHash.should.equal(expectedHash);
			});
		});
		
		
	});
});
