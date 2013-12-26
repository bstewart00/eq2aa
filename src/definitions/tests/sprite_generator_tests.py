import unittest
import os
from definitions.icons.sprite_generator import SpriteCssGenerator
from unittest.mock import MagicMock

class TestSpriteCssgenerator(unittest.TestCase):
    def setUp(self):
        self._icon_size = 10
        self._padding = 1
        self.sut = SpriteCssGenerator()
        
    def test_generate_css_single_tree(self):
        tree1 = MagicMock()
        tree1.aa = [self._create_aa(0), self._create_aa(1), self._create_aa(2)]
        tree1.type = "Archetype"
        
        result = self.sut.generate_css([tree1], self._icon_size, self._padding)
        
        lines = result.split(os.linesep)

        self.assertEqual(lines[0], ".Archetype .aa.id0 .icon { background-position: -1px -1px; }")
        self.assertEqual(lines[1], ".Archetype .aa.id1 .icon { background-position: -13px -1px; }")
        self.assertEqual(lines[2], ".Archetype .aa.id2 .icon { background-position: -25px -1px; }")
        
    def test_generate_css_two_trees(self):
        tree1 = MagicMock()
        tree1.aa = [self._create_aa(0), self._create_aa(1), self._create_aa(2)]
        tree1.type = "Archetype"
        
        tree2 = MagicMock()
        tree2.aa = [self._create_aa(0), self._create_aa(1), self._create_aa(2)]
        tree2.type = "Shadows"
        
        result = self.sut.generate_css([tree1, tree2], self._icon_size, self._padding)
        
        lines = result.split(os.linesep)

        self.assertEqual(lines[0], ".Archetype .aa.id0 .icon { background-position: -1px -1px; }")
        self.assertEqual(lines[1], ".Archetype .aa.id1 .icon { background-position: -13px -1px; }")
        self.assertEqual(lines[2], ".Archetype .aa.id2 .icon { background-position: -25px -1px; }")
        
        self.assertEqual(lines[3], ".Shadows .aa.id0 .icon { background-position: -1px -13px; }")
        self.assertEqual(lines[4], ".Shadows .aa.id1 .icon { background-position: -13px -13px; }")
        self.assertEqual(lines[5], ".Shadows .aa.id2 .icon { background-position: -25px -13px; }")
        
    def _create_aa(self, id_):
        result = MagicMock()
        result.id = id_
        return result
        