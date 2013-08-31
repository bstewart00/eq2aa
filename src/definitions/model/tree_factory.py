from definitions.model.tree import Tree

class TreeFactory(object):
    def __init__(self, data_provider, aa_factory):
        self._data_provider = data_provider
        self._aa_factory = aa_factory
    
    def create(self, id_):
        tree = self._data_provider.tree(id_)
        aa = list([self._aa_factory.create(aa_node) for aa_node in tree["alternateadvancementnode_list"]])
        
        max_points = tree["maxpointsperlevelnode_list"][-1]["maxpoints"]
        x_y_ratio = tree.get("foreveryxpoints", 0) // tree.get("unlocksypoints", 1)
        x_subclass = tree.get("ofxclassification")
        y_subclass = tree.get("ofyclassification")
        
        return Tree(tree["id"], tree["name"], max_points, tree["iswardertree"], aa, x_y_ratio, x_subclass, y_subclass)