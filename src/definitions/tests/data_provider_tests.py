import unittest
from unittest.mock import MagicMock, call
from definitions.soe.data_provider import SonyDataProvider, CachedDataProvider

class TestSonyDataProvider(unittest.TestCase):
    def setUp(self):
        self._url_reader = MagicMock()
        self._expected_json = '{ "a": 5 }'
        self._expected_result = {'a': 5}
        self.sut = SonyDataProvider(self._url_reader)
        
    def _setup_url_json_response(self, expected_url):
        def get_response(url):
            if url == expected_url:
                response_mock = MagicMock()
                response_mock.decode = lambda encoding: self._expected_json if encoding =='utf-8' else None 
                return response_mock
            return None
        self._url_reader.get.side_effect = get_response 
        
    def _setup_url_binary_response(self, expected_url, expected_data):
        def get_response(url):
            if url == expected_url:
                return expected_data
            return None
        self._url_reader.get.side_effect = get_response 
        

    def test_url_returns_none(self):
        self._url_reader.get.return_value = None
        
        self.assertIsNone(self.sut.classes())
        self.assertIsNone(self.sut.tree(1))
        self.assertIsNone(self.sut.spells(1))
        self.assertIsNone(self.sut.icon(1))
        
    def test_classes_url(self):
        self._setup_url_json_response('http://census.daybreakgames.com/s:eq2aa/json/get/eq2/constants/?c:show=adventureclass_list')
        self.assertEqual(self.sut.classes(), self._expected_result)
        
    def test_tree_url(self):
        self._setup_url_json_response('http://census.daybreakgames.com/s:eq2aa/json/get/eq2/alternateadvancement/5')
        self.assertEqual(self.sut.tree(5), self._expected_result)
        
    def test_spells_url(self):
        self._setup_url_json_response('http://census.daybreakgames.com/s:eq2aa/json/get/eq2/spell/?c:limit=10&given_by=alternateadvancement&level=110&crc=5')
        self.assertEqual(self.sut.spells(5), self._expected_result)
        
    def test_icon_url(self):
        self._setup_url_binary_response('http://census.daybreakgames.com/s:eq2aa/img/eq2/icons/5/achievement', 55)
        self.assertEqual(self.sut.icon(5), 55)
        
class TestCachedDataProvider(unittest.TestCase):
    def setUp(self):
        self._data_provider = MagicMock()
        self._cache = MagicMock()
        self._cache_result = 'someCacheResult'
        self.sut = CachedDataProvider(self._data_provider, self._cache)
        
    def _setup_cache(self, expected_filename):
        def _get_or_add(filename, func):
            self.assertEqual(filename, expected_filename)
            func()
            return self._cache_result
        
        self._cache.get_or_add.side_effect = _get_or_add
        
    def _setup_cache_icon(self, expected_filename):
        def _get_or_add_icon(filename, func):
            self.assertEqual(filename, expected_filename)
            func()
            return self._cache_result
        
        self._cache.get_or_add_icon.side_effect = _get_or_add_icon
        
    def test_classes_uses_cache(self):
        self._setup_cache('classes.json')
        result = self.sut.classes()
        
        self.assertEqual(result, self._cache_result)
        self._data_provider.classes.assert_any_call()
        
    def test_tree_uses_cache(self):
        self._setup_cache('trees/tree_5.json')
        result = self.sut.tree(5)
        
        self.assertEqual(result, self._cache_result)
        self._data_provider.tree.assert_called_once_with(5)
        
    def test_spells_uses_cache(self):
        self._setup_cache('spells/spell_5.json')
        result = self.sut.spells(5)
        
        self.assertEqual(result, self._cache_result)
        self._data_provider.spells.assert_called_once_with(5)
        
    def test_icon_uses_cache(self):
        self._setup_cache_icon('icons/5.png')
        result = self.sut.icon(5)
        
        self.assertEqual(result, self._cache_result)
        self._data_provider.icon.assert_called_once_with(5)