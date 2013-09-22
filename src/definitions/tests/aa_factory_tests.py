import unittest
from definitions.model.aa_factory import AAFactory
from definitions.tests.data_helper import AABuilder, SpellBuilder
from unittest.mock import MagicMock

class TestAAFactory(unittest.TestCase):
    def setUp(self):
        self._data_provider = MagicMock()
        self._lineage = {"archetype": "SomeArchetype", "family": "SomeFamily"}
        self._class_name = "SomeClass"
        self._tree_name = "SomeTree"
        self._spell_formatter = MagicMock()
        self.sut = AAFactory(self._data_provider, self._spell_formatter)

    def test_create_maps_basic_properties(self):
        aa_node = AABuilder().build()
        
        result = self.sut.create(aa_node, self._lineage, self._class_name, self._tree_name)
        
        self.assertEqual(result["id"], 0)
        self.assertEqual(result["soe_id"], aa_node["nodeid"])
        self.assertEqual(result["parent_id"], -1)
        self.assertEqual(result["name"], aa_node["name"])
        self.assertEqual(result["description"], aa_node["description"])
        self.assertEqual(result["title"], aa_node["title"])
        self.assertEqual(result["subclass"], aa_node["classification"])
        self.assertEqual(result["max_level"], aa_node["maxtier"])
        self.assertEqual(result["coords"], [aa_node["xcoord"], aa_node["ycoord"]])
        self.assertEqual(result["level"], 0)
        self.assertEqual(result["cost"], aa_node["pointspertier"])
        self.assertEqual(result["children"], [])
        
    def test_create_fetches_effects(self):
        aa_node = AABuilder().spellcrc(123).build()
        
        spell = SpellBuilder().with_crc(123).build()
        self._data_provider.spells.side_effect = lambda crc: [spell] if crc == 123 else None
        
        formatted_spell = "SomeFormattedEffects"
        self._spell_formatter.format.side_effect = lambda spells: formatted_spell if spells == [spell] else None 
        
        result = self.sut.create(aa_node, self._lineage, self._class_name, self._tree_name)
        
        self.assertEqual(result["effects"], formatted_spell)
        
    def test_create_sets_parent(self):
        aa_node = AABuilder().parent_id(5).build()
        
        result = self.sut.create(aa_node, self._lineage, self._class_name, self._tree_name)
        
        self.assertEqual(result["parent_id"], aa_node["firstparentid"])
        
    def test_create_sets_prereqs(self):
        aa_node = AABuilder().requires_global_points(1)\
            .requires_parent_points(2)\
            .requires_subtree_points(3)\
            .requires_tree_points(4)\
            .build()

        result = self.sut.create(aa_node, self._lineage, self._class_name, self._tree_name)
            
        expected_prereqs = { "parent_subtree": 0,
                            "global": 1,
                            "tree": 4,
                            "subtree": 3,
                            "parent": 2}
        self.assertDictEqual(result["prereqs"], expected_prereqs)
        
    def test_create_shadows_subclass_matches_lineage_archetype_sets_parent_subtree_prereq(self):
        self._tree_name = "Shadows"
        
        aa_node = AABuilder().subclass(self._lineage["archetype"]).build()

        result = self.sut.create(aa_node, self._lineage, self._class_name, self._tree_name)

        self.assertEqual(result["prereqs"]["parent_subtree"], 10)
        
    def test_create_shadows_subclass_matches_lineage_family_sets_parent_subtree_prereq(self):
        self._tree_name = "Shadows"
        
        aa_node = AABuilder().subclass(self._lineage["family"]).build()

        result = self.sut.create(aa_node, self._lineage, self._class_name, self._tree_name)

        self.assertEqual(result["prereqs"]["parent_subtree"], 10)
        
    def test_create_shadows_subclass_matches_class_name_sets_parent_subtree_prereq(self):
        self._tree_name = "Shadows"
        
        aa_node = AABuilder().subclass(self._class_name).build()

        result = self.sut.create(aa_node, self._lineage, self._class_name, self._tree_name)

        self.assertEqual(result["prereqs"]["parent_subtree"], 10)
        
    def test_create_parent_subtree_prereqs_ignored_if_not_shadows_tree(self):
        self._tree_name = "NonShadowsTree"
        
        aa_node = AABuilder().subclass(self._lineage["family"]).build()

        result = self.sut.create(aa_node, self._lineage, self._class_name, self._tree_name)

        self.assertEqual(result["prereqs"]["parent_subtree"], 0)
        
    def test_create_parent_subtree_prereqs_ignored_if_single_level_aa(self):
        self._tree_name = "Shadows"
        
        aa_node = AABuilder().subclass(self._lineage["family"]).max_level(1).build()

        result = self.sut.create(aa_node, self._lineage, self._class_name, self._tree_name)

        self.assertEqual(result["prereqs"]["parent_subtree"], 0)
        