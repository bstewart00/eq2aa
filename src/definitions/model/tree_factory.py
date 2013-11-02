from definitions.model.tree import Tree

class TreeFactory(object):
    def __init__(self, data_provider, aa_factory, logger):
        self._data_provider = data_provider
        self._aa_factory = aa_factory
        self._logger = logger
        
    def create_all(self, lineage_dict, class_node):
        tree_nodes = class_node["alternateadvancementtree_list"]
        
        next_tree_id = 0
        def _get_next_tree_id():
            nonlocal next_tree_id
            next_id = next_tree_id
            next_tree_id += 1
            return next_id
        
        def _get_tree_sort_order(tree):
            type_ordering = ["Archetype", "Class", "Shadows", "Heroic", "Tradeskill", "Prestige", "TradeskillPrestige"]
            if tree.type in type_ordering:
                return type_ordering.index(tree.type)
            return len(type_ordering)
        
        result = [self._tree_factory.create(_get_next_tree_id(), t["id"], lineage_dict, class_node["name"])
                 for t in tree_nodes]
        
        return sorted(result, key=_get_tree_sort_order)
    
    def create(self, tree_id, soe_id, lineage, class_name):
        self._logger.log('Processing Tree {0}...'.format(tree_id))
        
        tree_result = self._data_provider.tree(soe_id)
        tree = tree_result["alternateadvancement_list"][0]
        self._logger.log('Tree Name: ' + tree["name"])
        
        name = tree["name"]
        is_warder_tree = tree["iswardertree"]
        
        tree_type = self._determine_type(name, lineage, class_name, is_warder_tree)
        
        max_points = tree["maxpointsperlevelnode_list"][-1]["maxpoints"]
        x_y_ratio = tree.get("foreveryxpoints", 0) // tree.get("unlocksypoints", 1)
        x_subclass = tree.get("ofxclassification")
        y_subclass = tree.get("ofyclassification")
        
        aa, orphans, subtrees = self._aa_factory.create_all(tree["alternateadvancementnode_list"], lineage, class_name, name)
        
        return Tree(tree_id, tree["id"], name, tree_type, max_points, is_warder_tree, aa, subtrees, orphans, x_y_ratio, x_subclass, y_subclass)
    
    def _determine_type(self, tree_name, lineage, class_name, is_warder_tree):
        if tree_name == lineage["archetype"]:
            return "Archetype"
        elif tree_name == class_name:
            return "Class"
        elif is_warder_tree == "true":
            return "Warder"
        return tree_name.replace(" ", "")