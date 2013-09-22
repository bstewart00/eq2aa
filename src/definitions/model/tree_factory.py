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
        aa = self._sort_aa_by_coords(aa)
        aa = self._reorder_ids(aa)
        aa = self._replace_parent_ids(aa)
        aa = self._populate_aa_children(aa)
        
        subtrees = OrderedSet([i["subclass"] for i in aa])
        orphans = self._find_orphans(aa)
        
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
    
    def _sort_aa_by_coords(self, aa):
        return sorted(aa, key=lambda n: (n["coords"][1], n["coords"][0]))
    
    def _reorder_ids(self, aa):
        next_id = 0
        for i in aa:
            i["id"] = next_id
            next_id += 1
        return aa
    
    def _replace_parent_ids(self, aa):        
        parent_id_map = { soe_id: new_id for soe_id, new_id in map(lambda a: [a["soe_id"], a["id"]], aa)}
        
        for i in aa:
            if i["parent_id"] != -1:
                i["parent_id"] = parent_id_map[i["soe_id"]]
        return aa
    
    def _populate_aa_children(self, aa):
        # for aa X, X.children == all aa that have parent_id == X.id
        return aa
    
    def _find_orphans(self, aa):
        return list([i["id"] for i in aa if i["parent_id"] == -1])