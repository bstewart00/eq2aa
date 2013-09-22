import unittest
from definitions.model.spell_effect_formatter import SpellEffectFormatter
from definitions.tests.data_helper import SpellBuilder

class TestSpellFormatter(unittest.TestCase):
    def setUp(self):
        self.sut = SpellEffectFormatter()
        
    def test_format_single_effect_wraps_in_html(self):
        spell = SpellBuilder().add_effect("A", 0).build()
        
        result = self.sut.format(spell["effect_list"])
        
        self.assertEqual(result, "<ul><li>A</li></ul>")
        
    def test_format_multiple_indents(self):
        spell = SpellBuilder().add_effect("A", 0).add_effect("A1", 0)\
        .add_effect("B", 1).add_effect("C", 2).add_effect("B1", 1).build()
        
        result = self.sut.format(spell["effect_list"])
        
        self.assertEqual(result, 
                         "<ul>"
                            "<li>A</li>"
                            "<li>A1</li>"
                            "<ul>"
                                "<li>B</li>"
                                "<ul>"
                                    "<li>C</li>"
                                "</ul>"
                                "<li>B1</li>"
                            "</ul>"
                        "</ul>")