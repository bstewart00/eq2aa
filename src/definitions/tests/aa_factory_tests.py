import unittest
from definitions.model.aa_factory import AAFactory
from unittest.mock import MagicMock

class TestAAFactory(unittest.TestCase):
    def setUp(self):
        self._data_provider = MagicMock()
        self._aa_node = {}
        self.sut = AAFactory(self._aa_node, self._data_provider)

    def test_create_maps_data_properties(self):
        pass