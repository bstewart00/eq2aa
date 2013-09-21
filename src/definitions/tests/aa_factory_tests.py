import unittest
from definitions.model.aa_factory import AAFactory
from definitions.tests.data_helper import AABuilder
from unittest.mock import MagicMock

class TestAAFactory(unittest.TestCase):
    def setUp(self):
        self._data_provider = MagicMock()
        self.sut = AAFactory(self._data_provider)

    def test_create_maps_basic_properties(self):
        aa_node = AABuilder().build()
        
        result = self.sut.create(aa_node)
        
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
        
        expected_prereqs = { "parent_subtree": 0,
                            "global": 0,
                            "tree": 0,
                            "subtree": 0,
                            "parent": 0}
        self.assertDictEqual(result["prereqs"], expected_prereqs)
        
    def test_create_sets_parent(self):
        aa_node = AABuilder().parent_id(5).build()
        
        result = self.sut.create(aa_node)
        
        self.assertEqual(result["parent_id"], aa_node["firstparentid"])
        