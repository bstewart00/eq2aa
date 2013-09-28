import sys
import urllib.request
from urllib.error import URLError

class UrlReader:
    def get(self, url):
        try:
            response = urllib.request.urlopen(url)
            return response.read()
        except URLError as err:
            sys.stderr.write("URLError: {0}", err.strerror)
            return None
        