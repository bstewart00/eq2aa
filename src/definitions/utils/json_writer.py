import json
import os

class JsonFileWriter:
    def __init__(self, logger):
        self._logger = logger
        
    def _ensure_dir_exists(self, path):
        if not os.path.exists(path):
            os.makedirs(path)
        
    def write(self, obj, fullpath, indent=None):
        fullpath = os.path.abspath(fullpath)
        self._ensure_dir_exists(os.path.dirname(fullpath))
        
        self._logger.log('Writing to {0}'.format(fullpath))
        with open(fullpath, mode='w', encoding='utf8') as file:
            json.dump(obj, file, sort_keys=True, indent=indent)