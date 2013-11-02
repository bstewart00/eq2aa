import unittest
from definitions.model.point_pool_factory import PointPoolFactory
from unittest.mock import MagicMock

class TestPointPoolFactory(unittest.TestCase):
    def setUp(self):
        self.sut = PointPoolFactory()
        
    def test_One(self):
        trees = self._create_trees_of_type(["Archetype", "Tradeskill", "Prestige", "TradeskillPrestige", "Warder"])
        
        points, ordered_point_pools = self.sut.create(trees)
        
        self.assertEqual(ordered_point_pools, ["AA", "Prestige", "Tradeskill", "TradeskillPrestige", "Warder"])
        
    def _create_trees_of_type(self, types):
        for t in types:
            obj = MagicMock()
            obj.type = t
            yield obj