import unittest
from definitions.model.tree_factory import TreeFactory
from definitions.tests.data_helper import AABuilder, TreeBuilder
from unittest.mock import MagicMock

class TestTreeFactory(unittest.TestCase):
    def setUp(self):
        self._data_provider = MagicMock()
        self._aa_factory = MagicMock()
        self._lineage = { "family": "", "archetype": "" }
        self._class_name = "SomeClass"
        self._tree_id = 55
        self._aa = [1,2,3]
        self._orphans = [4,5,6]
        self._subtrees = ["Subtree1", "Subtree2"]
        
        self.sut = TreeFactory(self._data_provider, self._aa_factory, MagicMock())
        
        
    def _setup_tree(self, tree):
        def _create_all_aa(aa_nodes, lineage, class_name, tree_name):
            if (aa_nodes is tree["alternateadvancementnode_list"] and lineage is self._lineage and class_name == self._class_name and tree_name == tree["name"]):
                return self._aa, self._orphans, self._subtrees
            
        self._data_provider.tree.return_value = { "alternateadvancement_list": [tree]}
        self._aa_factory.create_all.side_effect = _create_all_aa

    def test_create_maps_basic_properties(self):
        tree_soe_id = 1
        tree = TreeBuilder()\
            .with_id(tree_soe_id)\
            .is_warder_tree()\
            .build()

        self._setup_tree(tree)

        result = self.sut.create(self._tree_id, tree_soe_id, self._lineage, self._class_name)

        self.assertEqual(result.id, self._tree_id)
        self.assertEqual(result.soe_id, tree_soe_id)
        self.assertEqual(result.name, tree["name"])
        self.assertEqual(result.is_warder_tree, True)

    def test_create_populates_aa(self):
        aa_node = AABuilder().with_id(1).name("SomeAA").build()
        tree = TreeBuilder()\
            .with_aa([aa_node])\
            .build()
        
        self._setup_tree(tree)
        result = self.sut.create(self._tree_id, 0, self._lineage, self._class_name)

        self.assertEqual(result.aa,  self._aa)

    def test_create_populates_max_points(self):
        tree = TreeBuilder()\
            .max_points(150)\
            .build()

        self._setup_tree(tree)
        result = self.sut.create(self._tree_id, 0, self._lineage, self._class_name)

        self.assertEqual(result.max_points, 150)

    def test_create_populates_x_y_ratio_and_subclasses(self):
        tree = TreeBuilder()\
            .x_subclass("XSubclass")\
            .y_subclass("YSubclass")\
            .x_y_ratio(20, 2)\
            .build()

        self._setup_tree(tree)
        result = self.sut.create(self._tree_id, 0, self._lineage, self._class_name)

        self.assertEqual(result.x_y_ratio, 10)
        self.assertEqual(result.x_subclass, "XSubclass")
        self.assertEqual(result.y_subclass, "YSubclass")

    def test_create_name_equal_to_archetype_sets_type(self):
        tree = TreeBuilder().name(self._lineage["archetype"]).build()

        self._setup_tree(tree)
        result = self.sut.create(self._tree_id, 0, self._lineage, self._class_name)
        
        self.assertEqual(result.type, "Archetype")
        
    def test_create_name_equal_to_class_name_sets_type(self):
        tree = TreeBuilder().name(self._class_name).build()

        self._setup_tree(tree)
        result = self.sut.create(self._tree_id, 0, self._lineage, self._class_name)
        
        self.assertEqual(result.type, "Class")

    def test_create_is_warder_tree_sets_warder_type(self):
        tree = TreeBuilder().is_warder_tree().build()

        self._setup_tree(tree)
        result = self.sut.create(self._tree_id, 0, self._lineage, self._class_name)
        
        self.assertEqual(result.type, "Warder")
        
    def test_create_sets_type_to_tree_name_without_spaces(self):
        tree = TreeBuilder().name("Tradeskill Prestige").build()

        self._setup_tree(tree)
        result = self.sut.create(self._tree_id, 0, self._lineage, self._class_name)
        
        self.assertEqual(result.type, "TradeskillPrestige")
