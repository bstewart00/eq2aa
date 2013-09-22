import unittest
from definitions.soe.data_provider import SonyDataProvider
import urllib.request

class TestSonyDataProvider(unittest.TestCase):
    def setUp(self):
        self.sut = SonyDataProvider(None)
        
    def test(self):
        url = urllib.request.urlopen('http://www.python.org/')
        data = url.read()
        self.assertEqual(data, "")