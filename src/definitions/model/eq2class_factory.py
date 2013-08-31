from .eq2class import EQ2Class

'''
api wrapper class
icon storage class


foreach class
http://data.soe.com/xml/get/eq2/constants/?c:show=adventureclass_list
fill lineage

    foreach tree in class
        foreach aa in tree
            http://data.soe.com/xml/get/eq2/alternateadvancement/76
            
            http://data.soe.com/xml/get/eq2/spell/?c:limit=10&crc=3302918945
            prereq, rank, location, icon info
            
            http://data.soe.com/img/eq2/icons/166/achievement
            
            foreach rank in aa
                fill effect description and indentation
'''
        

        
class EQ2ClassFactory(object):
    def __init__(self, data_provider, tree_factory):
        self._data_provider = data_provider
        self._tree_factory = tree_factory
        
    def create_classes(self, class_name_filter=[]):
        previous_lineage = []
        new_lineage = []
        
        for class_node in self._data_provider.classes():
            if class_node["issubclass"] == "false":
                new_lineage.append(class_node["name"])
            else:
                tree_nodes = class_node["alternateadvancementtree_list"]
                trees = [self._tree_factory.create(tree_nodes[t["id"]])
                         for t in tree_nodes]
                
                final_lineage = self._determine_lineage(previous_lineage, new_lineage)

                result = EQ2Class(class_node["id"], class_node["name"],
                            final_lineage, 
                            trees)
                
                previous_lineage = list(final_lineage)
                new_lineage = []
                
                yield result
                
    def _determine_lineage(self, previous_lineage, new_lineage):
        if len(previous_lineage) == 0 or len(new_lineage) == 2:
            return new_lineage
        elif len(new_lineage) == 1:
            return [previous_lineage[0], new_lineage[0]]
        else:
            return previous_lineage
        
                