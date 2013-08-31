class EQ2ClassBuilder(object):
    def __init__(self):
        self._id = 0
        self._name = "SomeClass"
        self._is_subclass = False 
        self._tree_ids = []
    
    def with_id(self, id_):
        self._id = id_
        return self
        
    def name(self, name_):
        self._name = name_
        return self
    
    def is_subclass(self):
        self._is_subclass = True
        return self
        
    def with_tree_ids(self, tree_ids):
        self._tree_ids = tree_ids
        return self
        
    def build(self):
        return {"id": self._id,
                "name": self._name,
                "issubclass": "true" if self._is_subclass else "false",
                "alternateadvancementtree_list": [{ "id": i } for i in self._tree_ids]
                }
        
class TreeBuilder(object):
    def __init__(self):
        self._id = 0
        self._name = "SomeTree"
        self._is_warder_tree = False
        self._aa = []
        self._max_points = 0
    
    def with_id(self, id_):
        self._id = id_
        return self
        
    def name(self, name_):
        self._name = name_
        return self
    
    def is_warder_tree(self):
        self._is_warder_tree = True
        return self
        
    def with_aa(self, aa):
        self._aa = aa
        return self
    
    def max_points(self, num_points):
        self._max_points = num_points
        return self
        
    def build(self):
        return {"id": self._id,
                "name": self._name,
                "alternateadvancementnode_list": self._aa,
                "maxpointsperlevelnode_list": [{"level": -1, "maxpoints": -1}, {"level": 90, "maxpoints": self._max_points }],
                "iswardertree": "true" if self._is_warder_tree else "false"
                }