import unittest
from definitions.model.tree_factory import TreeFactory
from definitions.tests.data_helper import AABuilder, TreeBuilder
from unittest.mock import MagicMock

class TestTreeFactory(unittest.TestCase):
    def setUp(self):
        self._data_provider = MagicMock()
        self._aa_factory = MagicMock()
        self._logger = MagicMock()
        self._lineage = { "family": "Family", "archetype": "Archetype" }
        self._class_name = "SomeClass"
        self._aa = [1,2,3]
        self._orphans = [4,5,6]
        self._subtrees = ["Subtree1", "Subtree2"]
        self._tree_type = "TreeType"
        
        self.sut = TreeFactory(self._data_provider, self._aa_factory, self._logger)
        
        
    def _setup_tree(self, tree):
        def _create_all_aa(aa_nodes, lineage, class_name, tree_name, tree_type):
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

        result = self.sut.create(tree_soe_id, self._lineage, self._class_name)

        self.assertEqual(result.id, -1)
        self.assertEqual(result.soe_id, tree_soe_id)
        self.assertEqual(result.name, tree["name"])
        self.assertEqual(result.is_warder_tree, True)

    def test_create_populates_aa(self):
        aa_node = AABuilder().with_id(1).name("SomeAA").build()
        tree = TreeBuilder()\
            .with_aa([aa_node])\
            .build()
        
        self._setup_tree(tree)
        result = self.sut.create(0, self._lineage, self._class_name)

        self.assertEqual(result.aa,  self._aa)

    def test_create_populates_max_points(self):
        tree = TreeBuilder()\
            .max_points(150)\
            .build()

        self._setup_tree(tree)
        result = self.sut.create(0, self._lineage, self._class_name)

        self.assertEqual(result.max_points, 150)

    def test_create_populates_x_y_ratio_and_subclasses(self):
        tree = TreeBuilder()\
            .x_subclass("XSubclass")\
            .y_subclass("YSubclass")\
            .x_y_ratio(20, 2)\
            .build()

        self._setup_tree(tree)
        result = self.sut.create(0, self._lineage, self._class_name)

        self.assertEqual(result.x_y_ratio, 10)
        self.assertEqual(result.x_subclass, "XSubclass")
        self.assertEqual(result.y_subclass, "YSubclass")

    def test_create_name_equal_to_archetype_sets_type(self):
        tree = TreeBuilder().name(self._lineage["archetype"]).build()

        self._setup_tree(tree)
        result = self.sut.create(0, self._lineage, self._class_name)
        
        self.assertEqual(result.type, "Archetype")
        
    def test_create_name_equal_to_class_name_sets_type(self):
        tree = TreeBuilder().name(self._class_name).build()

        self._setup_tree(tree)
        result = self.sut.create(0, self._lineage, self._class_name)
        
        self.assertEqual(result.type, "Class")

    def test_create_is_warder_tree_sets_warder_type(self):
        tree = TreeBuilder().is_warder_tree().build()

        self._setup_tree(tree)
        result = self.sut.create(0, self._lineage, self._class_name)
        
        self.assertEqual(result.type, "Warder")
        
    def test_create_sets_type_to_tree_name_without_spaces(self):
        tree = TreeBuilder().name("Tradeskill Prestige").build()

        self._setup_tree(tree)
        result = self.sut.create(0, self._lineage, self._class_name)
        
        self.assertEqual(result.type, "TradeskillPrestige")
        
    def test_create_all_sorts_trees_and_sets_ids(self):
        archetype = TreeBuilder().with_id(0).name("Archetype").build()
        class_tree = TreeBuilder().with_id(1).name("Class").build()
        shadows = TreeBuilder().with_id(2).name("Shadows").build()
        heroic = TreeBuilder().with_id(3).name("Heroic").build()
        tradeskill = TreeBuilder().with_id(4).name("Tradeskill").build()
        prestige = TreeBuilder().with_id(5).name("Prestige").build()
        tradeskill_prestige = TreeBuilder().with_id(6).name("Tradeskill Prestige").build()
        warder1 = TreeBuilder().with_id(7).name("Aquatic").build()
        warder2 = TreeBuilder().with_id(8).name("War Boar").build()
        
        tree_nodes = [archetype, class_tree, shadows, heroic, tradeskill, prestige,
                      tradeskill_prestige, warder1, warder2]
        reversed_tree_nodes = sorted(tree_nodes, key=lambda t: -t["id"])
        
        self._data_provider.tree.side_effect = lambda tree_id: { "alternateadvancement_list": [tree_nodes[tree_id]] }
        self._aa_factory.create_all.return_value = ([], [], [])
        
        result = self.sut.create_all(self._lineage, reversed_tree_nodes, self._class_name)
        result = list(map(lambda t: [t.name, t.id], result))
        
        self.assertEqual(result[0], ["Archetype", 0])
        self.assertEqual(result[1], ["Class", 1])
        self.assertEqual(result[2], ["Shadows", 2])
        self.assertEqual(result[3], ["Heroic", 3])
        self.assertEqual(result[4], ["Tradeskill", 4])
        self.assertEqual(result[5], ["Prestige", 5])
        self.assertEqual(result[6], ["Tradeskill Prestige", 6])
        self.assertEqual(result[7], ["Aquatic", 7])
        self.assertEqual(result[8], ["War Boar", 8])        
