import unittest
from definitions.model.point_pool_factory import PointPoolFactory
from unittest.mock import MagicMock

class TestPointPoolFactory(unittest.TestCase):
    def setUp(self):
        self.sut = PointPoolFactory()
        
    def test_ordered_point_pools(self):
        trees = list(self._create_trees_of_type(["Archetype", "Tradeskill", "Prestige", "TradeskillPrestige", "Warder"]))
        
        points, ordered_point_pools = self.sut.create(trees)
        
        self.assertEqual(ordered_point_pools, ["AA", "Prestige", "Tradeskill", "TradeskillPrestige", "Warder"])
        
    def test_points_has_name_and_max_points(self):
        trees = list(self._create_trees([("Archetype", 20), ("Prestige", 30), ("Tradeskill", 40), ("TradeskillPrestige", 50)]))
        
        points, ordered_point_pools = self.sut.create(trees)
        
        self.assertEqual(points["AA"], { "name": "AA", "max": 320 })
        self.assertEqual(points["Prestige"], { "name": "Prestige", "max": 30 })
        self.assertEqual(points["Tradeskill"], { "name": "Tradeskill", "max": 40 })
        self.assertEqual(points["TradeskillPrestige"], { "name": "Tradeskill Prestige", "max": 50 })
        
    def test_points_warder_has_child_pools(self):
        trees = list(self._create_warder_trees([("Mystical", 20), ("Avian", 30), ("Aquatic", 40)]))
        
        points, ordered_point_pools = self.sut.create(trees)
        
        expected_child_pools = {'Aquatic': {'max': 40, 'name': 'Aquatic'},
                                'Avian': {'max': 30, 'name': 'Avian'},
                                'Mystical': {'max': 20, 'name': 'Mystical'}}
        
        self.assertEqual(points["Warder"], { "name": "Warder", "child_pools": expected_child_pools })
        
        
    def _create_trees_of_type(self, types):
        for t in types:
            obj = MagicMock()
            obj.type = t
            yield obj
            
    def _create_trees(self, tuples):
        for t in tuples:
            obj = MagicMock()
            obj.name = t[0]
            obj.type = t[0]
            obj.max_points = t[1]
            
            yield obj
            
    def _create_warder_trees(self, tuples):
        for t in tuples:
            obj = MagicMock()
            obj.name = t[0]
            obj.type = "Warder"
            obj.max_points = t[1]
            
            yield obj