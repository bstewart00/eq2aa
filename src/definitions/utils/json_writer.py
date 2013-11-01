import json
import os

class JsonFileWriter:
    def __init__(self, base_dir_path, logger):
        self._base_dir_path = os.path.abspath(base_dir_path)
        self._logger = logger
        self._ensure_dir_exists(base_dir_path)
        
    def _ensure_dir_exists(self, path):
        if not os.path.exists(path):
            os.makedirs(path)
        
    def write(self, obj, filename):
        fullpath = os.path.join(self._base_dir_path, filename + '.json')
        
        self._logger.log('Writing to {0}'.format(fullpath))
        with open(fullpath, mode='w', encoding='utf8') as file:
            json.dump(obj, file, sort_keys=True, indent=3)