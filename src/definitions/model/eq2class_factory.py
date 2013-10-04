from definitions.model.eq2class import EQ2Class

class EQ2ClassFactory(object):
    def __init__(self, data_provider, tree_factory):
        self._data_provider = data_provider
        self._tree_factory = tree_factory

    def create_classes(self, class_name_filter=[]):
        def _matches_filter(class_name):
            return len(class_name_filter) == 0 or class_name in class_name_filter
        
        previous_lineage = []
        new_lineage = []

        for class_node in self._data_provider.classes():
            if class_node["issubclass"] == "false":
                new_lineage.append(class_node["name"])
            else:
                name = class_node["name"]
                lineage = self._determine_lineage(previous_lineage, new_lineage)
                lineage_dict = self._create_lineage_dict(lineage)
                previous_lineage = list(lineage)
                new_lineage = []
                
                if _matches_filter(name):
                    trees = self._create_trees(lineage_dict, class_node)
                    yield EQ2Class(class_node["id"], name, lineage_dict, trees)
                
    def _create_trees(self, lineage_dict, class_node):
        tree_nodes = class_node["alternateadvancementtree_list"]
        
        next_tree_id = 0
        def _get_next_tree_id():
            nonlocal next_tree_id
            next_id = next_tree_id
            next_tree_id += 1
            return next_id
        
        return [self._tree_factory.create(_get_next_tree_id(), t["id"], lineage_dict, class_node["name"])
                 for t in tree_nodes]
        
    def _create_lineage_dict(self, lineage):
        if len(lineage) == 0: return {}
        return { "family": lineage[0], "archetype": lineage[1]}    

    def _determine_lineage(self, previous_lineage, new_lineage):
        if len(previous_lineage) == 0 or len(new_lineage) == 2:
            return new_lineage
        elif len(new_lineage) == 1:
            return [previous_lineage[0], new_lineage[0]]
        else:
            return previous_lineage
        
    def _get_ordered_point_pools(self):
        pass
    
    def _get_point_pools(self):
        pass

