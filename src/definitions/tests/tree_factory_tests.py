import unittest
from definitions.model.tree_factory import TreeFactory
from definitions.tests.data_helper import TreeBuilder
from unittest.mock import MagicMock, patch, call

class TestTreeFactory(unittest.TestCase):
    def setUp(self):
        self._data_provider = MagicMock()
        self._aa_factory = MagicMock()
        self._aa_factory.create.side_effect = lambda nodes: nodes
        self.sut = TreeFactory(self._data_provider, self._aa_factory)

    def test_create_maps_data_properties(self):
        tree_id = 1
        tree = TreeBuilder()\
            .with_id(tree_id)\
            .is_warder_tree()\
            .build()
            
        self._data_provider.tree.return_value = tree
         
        result = self.sut.create(tree_id)
        
        self.assertEqual(result.id, tree_id)
        self.assertEqual(result.name, tree["name"])
        self.assertEqual(result.is_warder_tree, "true")
        
    def test_create_populates_aa(self):
        aa_nodes = [1,2,3]
        
        tree = TreeBuilder()\
            .with_aa(aa_nodes)\
            .build()
        
        self._data_provider.tree.return_value = tree
        self._aa_factory.create.side_effect = lambda aa: aa
        result = self.sut.create(0)
        
        self.assertEqual(result.aa, aa_nodes)
        
    def test_create_populates_max_points(self):
        tree = TreeBuilder()\
            .max_points(150)\
            .build()
         
        self._data_provider.tree.return_value = tree
        result = self.sut.create(0)
     
        self.assertEqual(result.max_points, 150)
        
    def test_create_populates_x_y_ratio_and_subclasses(self):
        tree = TreeBuilder()\
            .x_subclass("XSubclass")\
            .y_subclass("YSubclass")\
            .x_y_ratio(20, 2)\
            .build()
        
        self._data_provider.tree.return_value = tree
        result = self.sut.create(0)
        
        self.assertEqual(result.x_y_ratio, 10)
        self.assertEqual(result.x_subclass, "XSubclass")
        self.assertEqual(result.y_subclass, "YSubclass")