import unittest
from definitions.model.tree_factory import TreeFactory
from definitions.tests.data_helper import TreeBuilder
from unittest.mock import MagicMock

class TestTreeFactory(unittest.TestCase):
    def setUp(self):
        self._data_provider = MagicMock()
        self._aa_factory = MagicMock()
        self._some_lineage = { "family": "", "archetype": "" }
        self._some_class_name = "SomeClass"
        
        self._aa_factory.create.side_effect = lambda nodes: nodes
        self.sut = TreeFactory(self._data_provider, self._aa_factory)

    def test_create_maps_data_properties(self):
        tree_id = 1
        tree = TreeBuilder()\
            .with_id(tree_id)\
            .is_warder_tree()\
            .build()

        self._data_provider.tree.return_value = tree

        result = self.sut.create(tree_id, self._some_lineage, self._some_class_name)

        self.assertEqual(result.soe_id, tree_id)
        self.assertEqual(result.name, tree["name"])
        self.assertEqual(result.is_warder_tree, "true")

    def test_create_populates_aa(self):
        aa_nodes = [1, 2, 3]

        tree = TreeBuilder()\
            .with_aa(aa_nodes)\
            .build()

        self._data_provider.tree.return_value = tree
        self._aa_factory.create.side_effect = lambda aa: aa
        result = self.sut.create(0, self._some_lineage, self._some_class_name)

        self.assertEqual(result.aa, aa_nodes)

    def test_create_populates_max_points(self):
        tree = TreeBuilder()\
            .max_points(150)\
            .build()

        self._data_provider.tree.return_value = tree
        result = self.sut.create(0, self._some_lineage, self._some_class_name)

        self.assertEqual(result.max_points, 150)

    def test_create_populates_x_y_ratio_and_subclasses(self):
        tree = TreeBuilder()\
            .x_subclass("XSubclass")\
            .y_subclass("YSubclass")\
            .x_y_ratio(20, 2)\
            .build()

        self._data_provider.tree.return_value = tree
        result = self.sut.create(0, self._some_lineage, self._some_class_name)

        self.assertEqual(result.x_y_ratio, 10)
        self.assertEqual(result.x_subclass, "XSubclass")
        self.assertEqual(result.y_subclass, "YSubclass")

    def test_create_name_equal_to_archetype_sets_type(self):
        tree = TreeBuilder().name(self._some_lineage["archetype"]).build()

        self._data_provider.tree.return_value = tree
        result = self.sut.create(0, self._some_lineage, self._some_class_name)
        
        self.assertEqual(result.type, "Archetype")
        
    def test_create_name_equal_to_class_name_sets_type(self):
        tree = TreeBuilder().name(self._some_class_name).build()

        self._data_provider.tree.return_value = tree
        result = self.sut.create(0, self._some_lineage, self._some_class_name)
        
        self.assertEqual(result.type, "Class")

    def test_create_is_warder_tree_sets_warder_type(self):
        tree = TreeBuilder().is_warder_tree().build()

        self._data_provider.tree.return_value = tree
        result = self.sut.create(0, self._some_lineage, self._some_class_name)
        
        self.assertEqual(result.type, "Warder")
        
    def test_create_sets_type_to_tree_name_without_spaces(self):
        tree = TreeBuilder().name("Tradeskill Prestige").build()

        self._data_provider.tree.return_value = tree
        result = self.sut.create(0, self._some_lineage, self._some_class_name)
        
        self.assertEqual(result.type, "TradeskillPrestige")
