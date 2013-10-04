import unittest
from definitions.model.tree_factory import TreeFactory
from definitions.tests.data_helper import AABuilder, TreeBuilder
from unittest.mock import MagicMock

class TestTreeFactory(unittest.TestCase):
    def setUp(self):
        self._data_provider = MagicMock()
        self._aa_factory = MagicMock()
        self._some_lineage = { "family": "", "archetype": "" }
        self._some_class_name = "SomeClass"
        self._tree_id = 55
        
        self._aa_factory.create.side_effect = lambda node, lineage, class_name: self._create_aa(node)
        self.sut = TreeFactory(self._data_provider, self._aa_factory)
        
    def _create_aa(self, aa_node):        
        result = {}
        result["soe_id"] = aa_node["nodeid"]
        result["parent_id"] = aa_node.get("firstparentid", -1)
        result["subclass"] = aa_node["classification"]
        result["coords"] = [aa_node["xcoord"], aa_node["ycoord"]]
               
        return result

    def test_create_maps_basic_properties(self):
        tree_soe_id = 1
        tree = TreeBuilder()\
            .with_id(tree_soe_id)\
            .is_warder_tree()\
            .build()

        self._data_provider.tree.return_value = tree

        result = self.sut.create(self._tree_id, tree_soe_id, self._some_lineage, self._some_class_name)

        self.assertEqual(result.id, self._tree_id)
        self.assertEqual(result.soe_id, tree_soe_id)
        self.assertEqual(result.name, tree["name"])
        self.assertEqual(result.is_warder_tree, "true")

    def test_create_populates_aa(self):
        aa_node = AABuilder().with_id(1).name("SomeAA").build()
        expected_aa = self._create_aa(aa_node)
        self._aa_factory.create.side_effect = None
        self._aa_factory.create.return_value = expected_aa 

        tree = TreeBuilder()\
            .with_aa([aa_node])\
            .build()

        self._data_provider.tree.return_value = tree
        result = self.sut.create(self._tree_id, 0, self._some_lineage, self._some_class_name)

        self.assertEqual(result.aa,  [expected_aa])
        
    def test_create_sets_subtrees_to_distinct_aa_subclasses(self):
        aa_nodes = [AABuilder().subclass("Subclass1").build(),
                    AABuilder().subclass("Subclass1").build(),
                    AABuilder().subclass("Subclass2").build()] 

        tree = TreeBuilder()\
            .with_aa(aa_nodes)\
            .build()

        self._data_provider.tree.return_value = tree
        result = self.sut.create(self._tree_id, 0, self._some_lineage, self._some_class_name)

        self.assertEqual(result.subtrees,  ['Subclass1', 'Subclass2'])

    def test_create_populates_max_points(self):
        tree = TreeBuilder()\
            .max_points(150)\
            .build()

        self._data_provider.tree.return_value = tree
        result = self.sut.create(self._tree_id, 0, self._some_lineage, self._some_class_name)

        self.assertEqual(result.max_points, 150)

    def test_create_populates_x_y_ratio_and_subclasses(self):
        tree = TreeBuilder()\
            .x_subclass("XSubclass")\
            .y_subclass("YSubclass")\
            .x_y_ratio(20, 2)\
            .build()

        self._data_provider.tree.return_value = tree
        result = self.sut.create(self._tree_id, 0, self._some_lineage, self._some_class_name)

        self.assertEqual(result.x_y_ratio, 10)
        self.assertEqual(result.x_subclass, "XSubclass")
        self.assertEqual(result.y_subclass, "YSubclass")

    def test_create_name_equal_to_archetype_sets_type(self):
        tree = TreeBuilder().name(self._some_lineage["archetype"]).build()

        self._data_provider.tree.return_value = tree
        result = self.sut.create(self._tree_id, 0, self._some_lineage, self._some_class_name)
        
        self.assertEqual(result.type, "Archetype")
        
    def test_create_name_equal_to_class_name_sets_type(self):
        tree = TreeBuilder().name(self._some_class_name).build()

        self._data_provider.tree.return_value = tree
        result = self.sut.create(self._tree_id, 0, self._some_lineage, self._some_class_name)
        
        self.assertEqual(result.type, "Class")

    def test_create_is_warder_tree_sets_warder_type(self):
        tree = TreeBuilder().is_warder_tree().build()

        self._data_provider.tree.return_value = tree
        result = self.sut.create(self._tree_id, 0, self._some_lineage, self._some_class_name)
        
        self.assertEqual(result.type, "Warder")
        
    def test_create_sets_type_to_tree_name_without_spaces(self):
        tree = TreeBuilder().name("Tradeskill Prestige").build()

        self._data_provider.tree.return_value = tree
        result = self.sut.create(self._tree_id, 0, self._some_lineage, self._some_class_name)
        
        self.assertEqual(result.type, "TradeskillPrestige")
