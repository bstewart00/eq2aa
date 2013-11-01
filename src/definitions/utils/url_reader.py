import sys
import urllib.request
from urllib.error import URLError

class UrlReader(object):
    def __init__(self, logger):
        self._logger = logger
    
    def get(self, url):
        try:
            self._logger.log('Requesting URL: ' + url)
            response = urllib.request.urlopen(url)
            return response.read()
        except URLError as err:
            sys.stderr.write("URLError: {0}", err.strerror)
            return None
        