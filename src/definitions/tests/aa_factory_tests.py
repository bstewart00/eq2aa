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
        self._spell_effect_formatter = MagicMock()
        self._coord_mapper = MagicMock()
        self._logger = MagicMock()
        self.sut = AAFactory(self._data_provider, self._spell_effect_formatter, self._coord_mapper, self._logger)
        
        self._coord_mapper.map_coords.side_effect = lambda x: x
        
    def _setup_spells(self, expected_crc, returned_spells):
        def _mock_spells(crc):
            if crc == expected_crc:
                return { "spell_list": returned_spells }
        self._data_provider.spells.side_effect = _mock_spells
        
    def test_create_maps_basic_properties(self):
        aa_node = AABuilder().build()
        
        result = self.sut.create(aa_node, self._lineage, self._class_name, self._tree_name)
        
        self.assertEqual(result.id, 0)
        self.assertEqual(result.soe_id, aa_node["nodeid"])
        self.assertEqual(result.parent_id, -1)
        self.assertEqual(result.name, aa_node["name"])
        self.assertEqual(result.description, aa_node["description"])
        self.assertEqual(result.title, aa_node["title"])
        self.assertEqual(result.subclass, aa_node["classification"])
        self.assertEqual(result.max_level, aa_node["maxtier"])
        self.assertEqual(result.coords, [aa_node["xcoord"], aa_node["ycoord"]])
        self.assertEqual(result.level, 0)
        self.assertEqual(result.cost, aa_node["pointspertier"])
        self.assertEqual(result.children, [])
        
    def test_create_fetches_effects_in_order(self):
        aa_node = AABuilder().spellcrc(123).build()
        spell_rank5 = SpellBuilder().with_crc(123).rank(5).add_effect('Rank5', 1).build()
        spell_rank1 = SpellBuilder().with_crc(123).rank(1).add_effect('Rank1', 1).build()
        self._setup_spells(123, [spell_rank5, spell_rank1])
        
        self._spell_effect_formatter.format.side_effect = lambda effects: effects[0]["description"] + "Formatted" 
        
        result = self.sut.create(aa_node, self._lineage, self._class_name, self._tree_name)
        
        self.assertEqual(result.effects, ["Rank1Formatted", "Rank5Formatted"])
        
    def test_create_sets_icon_ids(self):
        aa_node = AABuilder().spellcrc(123).build()
        spell = SpellBuilder().with_crc(123).backdrop(50).icon(100).build()
        self._setup_spells(123, [spell])
        
        result = self.sut.create(aa_node, self._lineage, self._class_name, self._tree_name)
        
        self.assertDictEqual(result.icon, { "icon": 100, "backdrop": 50 })
        
    def test_create_sets_parent(self):
        aa_node = AABuilder().parent_id(5).build()
        
        result = self.sut.create(aa_node, self._lineage, self._class_name, self._tree_name)
        
        self.assertEqual(result.parent_id, aa_node["firstparentid"])
        
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
        self.assertDictEqual(result.prereqs, expected_prereqs)
        
    def test_create_shadows_subclass_matches_lineage_archetype_sets_parent_subtree_prereq(self):
        self._tree_name = "Shadows"
        
        aa_node = AABuilder().subclass(self._lineage["archetype"]).build()

        result = self.sut.create(aa_node, self._lineage, self._class_name, self._tree_name)

        self.assertEqual(result.prereqs["parent_subtree"], 10)
        
    def test_create_shadows_subclass_matches_lineage_family_sets_parent_subtree_prereq(self):
        self._tree_name = "Shadows"
        
        aa_node = AABuilder().subclass(self._lineage["family"]).build()

        result = self.sut.create(aa_node, self._lineage, self._class_name, self._tree_name)

        self.assertEqual(result.prereqs["parent_subtree"], 10)
        
    def test_create_shadows_subclass_matches_class_name_sets_parent_subtree_prereq(self):
        self._tree_name = "Shadows"
        
        aa_node = AABuilder().subclass(self._class_name).build()

        result = self.sut.create(aa_node, self._lineage, self._class_name, self._tree_name)

        self.assertEqual(result.prereqs["parent_subtree"], 10)
        
    def test_create_parent_subtree_prereqs_ignored_if_not_shadows_tree(self):
        self._tree_name = "NonShadowsTree"
        
        aa_node = AABuilder().subclass(self._lineage["family"]).build()

        result = self.sut.create(aa_node, self._lineage, self._class_name, self._tree_name)

        self.assertEqual(result.prereqs["parent_subtree"], 0)
        
    def test_create_parent_subtree_prereqs_ignored_if_single_level_aa(self):
        self._tree_name = "Shadows"
        
        aa_node = AABuilder().subclass(self._lineage["family"]).max_level(1).build()

        result = self.sut.create(aa_node, self._lineage, self._class_name, self._tree_name)

        self.assertEqual(result.prereqs["parent_subtree"], 0)
        
    def test_create_all_replaces_parent_soe_ids(self):
        aa_nodes = [AABuilder().with_id(50).parent_id(-1).build(),
                    AABuilder().with_id(60).parent_id(50).build(),
                    AABuilder().with_id(70).parent_id(60).build(),
                    AABuilder().with_id(80).parent_id(-1).build()]

        aa, orphans, subtrees = self.sut.create_all(aa_nodes, self._lineage, self._class_name, self._tree_name)
        
        self.assertEqual(list(map(lambda n: n.parent_id, aa)), [-1, 0, 1, -1])
        
    def test_create_populates_children(self):
        aa_nodes = [AABuilder().with_id(50).parent_id(-1).build(),
                    AABuilder().with_id(60).parent_id(50).build(),
                    AABuilder().with_id(70).parent_id(50).build(),
                    AABuilder().with_id(80).parent_id(60).build(),
                    AABuilder().with_id(90).parent_id(60).build(),
                    AABuilder().with_id(100).parent_id(-1).build()]

        aa, orphans, subtrees = self.sut.create_all(aa_nodes, self._lineage, self._class_name, self._tree_name)
        
        self.assertEqual(list(map(lambda n: n.children, aa)), [[1, 2], [3, 4], [], [], [], []])
        
    def test_create_sorts_aa_top_to_bottom_left_to_right(self):
        aa_nodes = [AABuilder().with_id(50).coords(1, 1).build(),
                    AABuilder().with_id(60).coords(0, 0).build(),
                    AABuilder().with_id(70).coords(1, 0).build(),
                    AABuilder().with_id(80).coords(0, 1).build()]

        aa, orphans, subtrees = self.sut.create_all(aa_nodes, self._lineage, self._class_name, self._tree_name)
        
        self.assertEquals(list(map(lambda a: a.coords, aa)), [[0, 0], [1, 0], [0, 1], [1, 1]])
        
    def test_create_reorders_aa_by_sorted_order(self):
        aa_nodes = [AABuilder().with_id(50).coords(1, 1).build(),
                    AABuilder().with_id(60).coords(0, 0).build(),
                    AABuilder().with_id(70).coords(1, 0).build(),
                    AABuilder().with_id(80).coords(0, 1).build()]

        aa, orphans, subtrees = self.sut.create_all(aa_nodes, self._lineage, self._class_name, self._tree_name)
        
        self.assertEquals(list(map(lambda a: a.id, aa)), [0, 1, 2, 3])
        
    def test_create_sets_orphans_to_aa_with_no_parents(self):
        aa_nodes = [AABuilder().with_id(5).parent_id(-1).build(),
                    AABuilder().with_id(6).parent_id(-1).build(),
                    AABuilder().with_id(7).parent_id(5).build()] 

        aa, orphans, subtrees = self.sut.create_all(aa_nodes, self._lineage, self._class_name, self._tree_name)

        self.assertEqual(orphans, [0, 1])
        
    def test_create_sets_subtrees_to_distinct_aa_subclasses(self):
        aa_nodes = [AABuilder().subclass("Subclass1").build(),
                    AABuilder().subclass("Subclass1").build(),
                    AABuilder().subclass("Subclass2").build()] 

        aa, orphans, subtrees = self.sut.create_all(aa_nodes, self._lineage, self._class_name, self._tree_name)

        self.assertEqual(subtrees,  { 'Subclass1': 0, 'Subclass2': 0 })
        
        