class AAFactory(object):
    def __init__(self, aa_node, data_provider):
        self._aa_node = aa_node
        self._data_provider = data_provider
    
    def create(self):
        result = {};
        
        result["name"] = self._aa_node["name"]
        
        return result