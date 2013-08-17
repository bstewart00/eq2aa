import unittest
from eq2aa_definitions.model.tree_factory import TreeFactory
from eq2aa_definitions.tests.data_helper import DataHelper
from unittest.mock import MagicMock, patch, call

class TestTreeFactory(unittest.TestCase):
    def setUp(self):
        self._data_provider = MagicMock()
        self._aa_factory = MagicMock()
        self.sut = TreeFactory(self._data_provider, self._aa_factory)
        
    @patch('eq2aa_definitions.model.tree_factory.Tree')
    def test_create_constructs_tree(self, mock_tree):
        def return_name(id_, name, max_points, is_warder_tree, aa):
            return name
        mock_tree.side_effect = return_name
        
        self._aa_factory.create.return_value = []
        
        tree_id = 1
        self._data_provider.tree.side_effect = lambda id_: DataHelper.make_tree(tree_id, "Tree", True) if id_ == tree_id else None
         
        result = self.sut.create(tree_id)
        self.assertEqual(result, "Tree")

    @patch('eq2aa_definitions.model.tree_factory.Tree')
    def test_create_maps_data_properties(self, mock_tree):
        self._aa_factory.create.return_value = []
        
        tree_id = 1
        self._data_provider.tree.side_effect = lambda id_: DataHelper.make_tree(tree_id, "Tree", True) if id_ == tree_id else None
         
        self.sut.create(tree_id)
        
        mock_tree.assert_has_calls([call(1, "Tree", 0, True, [])])