import os
import json
import sys

class SonyDataProvider:
    def __init__(self, url_reader):
        self._url_reader = url_reader

    def classes(self):
        return self._json('http://data.soe.com/json/get/eq2/constants/?c:show=adventureclass_list')

    def tree(self, tree_id):
        return self._json('http://data.soe.com/json/get/eq2/alternateadvancement/' + str(tree_id))

    def spells(self, spell_crc):
        return self._json('http://data.soe.com/json/get/eq2/spell/?c:limit=10&crc=' + str(spell_crc))

    def icon(self, icon_id):
        return self._url_reader.get("http://data.soe.com/img/eq2/icons/{0}/achievement".format(icon_id))

    def _json(self, url):
        response_data = self._url_reader.get(url)
        if response_data is None:
            return None
        return json.loads(response_data.decode('utf-8'))

class CachedDataProvider:
    def __init__(self, decorated, cache):
        self._decorated = decorated
        self._cache = cache

    def classes(self):
        return self._cache.get_or_add('classes.json', lambda: self._decorated.classes()) 

    def tree(self, tree_id):
        return self._cache.get_or_add('tree_{0}.json'.format(tree_id), lambda: self._decorated.tree(tree_id))

    def spells(self, spell_crc):
        return self._cache.get_or_add('spell_{0}.json'.format(spell_crc), lambda: self._decorated.spells(spell_crc)) 

    def icon(self, icon_id):
        return self._cache.get_or_add_icon('{0}.png'.format(icon_id), lambda: self._decorated.icon(icon_id))
    
class FileDataCache:
    def __init__(self, cache_dir_path):
        self._cache_dir_path = cache_dir_path
        self._icons_dir_path = os.path.join(self._cache_dir_path, 'icons')
        self._init_cache_dir()
        
    def _init_cache_dir(self):
        if not os.path.exists(self._cache_dir_path):
            os.makedirs(self._icons_dir_path)
    
    def get_or_add(self, filename, get_value):
        cached = self._get_from_cache(filename)
        if cached is not None:
            return cached
        
        return self._put_in_cache(filename, get_value()) 
    
    def get_or_add_icon(self, filename, get_image):
        icon_path = os.path.join(self._icons_dir_path, filename)
        if os.path.exists(icon_path):
            with open(icon_path, 'rb') as f:
                return f.read()
            
        with open(icon_path, 'wb') as f:
            image = get_image() 
            f.write(image)
            return image 
    
    def _get_from_cache(self, filename):
        path = os.path.join(self._cache_dir_path,  filename)
        try:
            with open(path, 'r') as f:
                return json.load(f)
        except IOError:
            return None
    
    def _put_in_cache(self, filename, result):
        path = os.path.join(self._cache_dir_path,  filename)
        try:
            with open(path, 'w') as f:
                json.dump(result, f, sort_keys=True, indent=4, separators=(',', ': '))
                return result
        except IOError as err:
            sys.stderr.write("IOError:" + str(err))
            return None