import unittest
import os
from definitions.soe.data_provider import SonyDataProvider, CachedDataProvider, FileDataCache
from definitions.utils.url_reader import UrlReader

class TestSonyDataProvider(unittest.TestCase):
    def setUp(self):
        self._url_reader = UrlReader()
        self.sut = SonyDataProvider(self._url_reader)
        
    def test(self):
        self.assertEqual(self.sut.tree(70), "")
        
class TestCachedDataProvider(unittest.TestCase):
    def setUp(self):
        self._url_reader = UrlReader()
        
        self._data_provider = SonyDataProvider(self._url_reader)
        self._cache = FileDataCache(os.path.abspath('../soe/cached_data'))
        self.sut = CachedDataProvider(self._data_provider, self._cache)
        
    def test2(self):
        someicon = self.sut.icon(150)
        self.assertEqual(self.sut.tree(70), "")
        

        self.assertEqual(someicon, "")