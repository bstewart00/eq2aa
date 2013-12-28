from definitions.model.tree import Tree

class TreeFactory(object):
    def __init__(self, data_provider, aa_factory, logger):
        self._data_provider = data_provider
        self._aa_factory = aa_factory
        self._logger = logger
        
    def create_all(self, lineage_dict, tree_nodes, class_name):
        trees = [self.create(t["id"], lineage_dict, class_name) for t in tree_nodes]
        trees = self._sort_trees(trees)
        trees = self._set_ordered_tree_ids(trees)
        return trees
    
    def _sort_trees(self, trees):
        def _get_tree_sort_order(tree):
            # TODO: Remove dependence on tree ordering. What is important is the IDs not changing
            type_ordering = ["Archetype", "Class", "Shadows", "Heroic", "Tradeskill", "Prestige", "TradeskillPrestige", "Warder", "Dragon"]
            
            type_index = len(type_ordering)
            if tree.type in type_ordering:
                type_index = type_ordering.index(tree.type)
            
            return (type_index, tree.name)
        
        return sorted(trees, key=_get_tree_sort_order)
    
    def _set_ordered_tree_ids(self, trees):
        next_tree_id = 0
        for tree in trees:
            tree.id = next_tree_id
            next_tree_id += 1
        return trees
    
    def create(self, soe_id, lineage, class_name):
        self._logger.log('Processing Tree {0} [{1}]...'.format(soe_id, class_name))
        
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
        
        aa, orphans, subtrees = self._aa_factory.create_all(tree["alternateadvancementnode_list"], lineage, class_name, name, tree_type, y_subclass)
        
        return Tree(-1, tree["id"], name, tree_type, max_points, is_warder_tree, aa, subtrees, orphans, x_y_ratio, x_subclass, y_subclass)
    
    def _determine_type(self, tree_name, lineage, class_name, is_warder_tree):
        if tree_name == lineage["archetype"]:
            return "Archetype"
        elif tree_name == class_name:
            return "Class"
        elif is_warder_tree == "true":
            return "Warder"
        return tree_name.replace(" ", "")