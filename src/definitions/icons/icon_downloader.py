import os

class IconDownloader(object):
    def __init__(self, data_provider, output_path, logger):
        self._data_provider = data_provider
        self._output_path = output_path
        self._logger = logger
    
    def download_all(self, class_):
        for tree in class_.trees:
            self._logger.log("Downloading icons for Tree {0}[{1}]".format(tree.name, tree.soe_id))
            for aa in tree.aa:
                self.download(aa.icon["icon"])
                self.download(aa.icon["backdrop"])
    
    def download(self, icon_id):
        if icon_id == -1:
            return
        
        icon = self._data_provider.icon(icon_id)
        self._save_icon(icon, "{0}.png".format(icon_id))
        
    def _save_icon(self, data, icon_filename):
        icon_path = os.path.join(self._output_path, icon_filename)
        if os.path.exists(icon_path):
            return
        
        with open(icon_path, 'wb') as f:
            f.write(data)