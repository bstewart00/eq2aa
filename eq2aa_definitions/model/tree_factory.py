from eq2aa_definitions.model.tree import Tree

class TreeFactory(object):
    def __init__(self, data_provider, aa_factory):
        self._data_provider = data_provider
        self._aa_factory = aa_factory
    
    def create(self, id_):
        tree = self._data_provider.tree(id_)
        aa = self._aa_factory.create(tree["alternateadvancementnode_list"])
        
        return Tree(tree["id"], tree["name"], 0, tree["iswardertree"], aa)