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
        
    @patch('definitions.model.tree_factory.Tree')
    def test_create_constructs_tree(self, mock_tree):
        def return_name(id_, name, max_points, is_warder_tree, aa):
            return name
        mock_tree.side_effect = return_name
        
        self._aa_factory.create.return_value = []
        
        tree_id = 1
        tree = TreeBuilder().with_id(tree_id).build()
        self._data_provider.tree.side_effect = lambda id_: tree if id_ == tree_id else None
         
        result = self.sut.create(tree_id)
        self.assertEqual(result, tree["name"])

    @patch('definitions.model.tree_factory.Tree')
    def test_create_maps_data_properties(self, mock_tree):
        tree_id = 1
        tree = TreeBuilder()\
            .with_id(tree_id)\
            .is_warder_tree()\
            .build()
            
        self._aa_factory.create.return_value = []
        self._data_provider.tree.side_effect = lambda id_: tree if id_ == tree_id else None
         
        self.sut.create(tree_id)
        mock_tree.assert_has_calls([call(tree_id, tree["name"], 0, "true", [])])
        
    @patch('definitions.model.tree_factory.Tree')
    def test_create_populates_aa(self, mock_tree):
        aa_nodes = [1,2,3]
        
        tree_id = 1
        tree = TreeBuilder()\
            .with_id(tree_id)\
            .with_aa(aa_nodes)\
            .build()
        
        self._data_provider.tree.side_effect = lambda id_: tree if id_ == tree_id else None
        self._aa_factory.create.side_effect = lambda aa: aa
        self.sut.create(tree_id)
        
        mock_tree.assert_has_calls([call(tree_id, tree["name"], 0, "false", aa_nodes)])