from definitions.model.eq2class import EQ2Class

class EQ2ClassFactory(object):
    def __init__(self, data_provider, tree_factory, point_pool_factory, logger):
        self._data_provider = data_provider
        self._tree_factory = tree_factory
        self._point_pool_factory = point_pool_factory
        self._logger = logger

    def create_classes(self, class_name_filter=[]):
        def _matches_filter(class_name):
            return len(class_name_filter) == 0 or class_name in class_name_filter
        
        previous_lineage = []
        new_lineage = []
        
        classes_list = self._data_provider.classes()
        all_classes = classes_list["constants_list"][0]["adventureclass_list"]

        next_id = 0
        for class_node in all_classes:
            self._logger.log('Processing class {0}...'.format(class_node["name"]))
            
            capitalized_name = class_node["name"].capitalize()
            
            if class_node["issubclass"] == "false":
                new_lineage.append(capitalized_name)
            else:
                name = capitalized_name
                
                lineage = self._determine_lineage(previous_lineage, new_lineage)
                lineage_dict = self._create_lineage_dict(lineage)
                previous_lineage = list(lineage)
                new_lineage = []
                
                if _matches_filter(name):
                    trees = self._create_trees(lineage_dict, class_node)
                    point_pools, ordered_point_pools = self._point_pool_factory.create(trees)
                    
                    result = EQ2Class(next_id, class_node["id"], name, lineage_dict, trees, point_pools, ordered_point_pools)
                    next_id = next_id + 1
                    yield result
                
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

