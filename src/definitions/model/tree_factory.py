from definitions.model.tree import Tree
from definitions.utils.ordered_set import OrderedSet

class TreeFactory(object):
    def __init__(self, data_provider, aa_factory):
        self._data_provider = data_provider
        self._aa_factory = aa_factory
    
    def create(self, soe_id, lineage, class_name):
        tree = self._data_provider.tree(soe_id)
        
        id_ = self._get_id()
        name = tree["name"]
        is_warder_tree = tree["iswardertree"]
        
        tree_type = self._determine_type(name, lineage, class_name, is_warder_tree)
        
        max_points = tree["maxpointsperlevelnode_list"][-1]["maxpoints"]
        x_y_ratio = tree.get("foreveryxpoints", 0) // tree.get("unlocksypoints", 1)
        x_subclass = tree.get("ofxclassification")
        y_subclass = tree.get("ofyclassification")
        
        aa = list([self._aa_factory.create(aa_node, lineage, class_name) for aa_node in tree["alternateadvancementnode_list"]])
        
        subtrees = OrderedSet([i.subclass for i in aa])
        orphans = list([i.id for i in aa if i.parent_id == -1])
        
        return Tree(id_, tree["id"], name, tree_type, max_points, is_warder_tree, aa, subtrees, orphans, x_y_ratio, x_subclass, y_subclass)
    
    def _get_id(self):
        return 0
    
    def _determine_type(self, tree_name, lineage, class_name, is_warder_tree):
        if tree_name == lineage["archetype"]:
            return "Archetype"
        elif tree_name == class_name:
            return "Class"
        elif is_warder_tree == "true":
            return "Warder"
        return tree_name.replace(" ", "")