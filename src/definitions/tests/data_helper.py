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
        self._x_points = 0
        self._y_points = 1
        self._x_subclass = ""
        self._y_subclass = ""

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

    def x_subclass(self, name):
        self._x_subclass = name
        return self

    def y_subclass(self, name):
        self._y_subclass = name
        return self

    def x_y_ratio(self, x, y):
        self._x_points = x
        self._y_points = y
        return self

    def build(self):
        return {"id": self._id,
                "name": self._name,
                "alternateadvancementnode_list": self._aa,
                "maxpointsperlevelnode_list": [{"level":-1, "maxpoints":-1}, {"level": 90, "maxpoints": self._max_points }],
                "foreveryxpoints": self._x_points,
                "unlocksypoints": self._y_points,
                "ofxclassification": self._x_subclass,
                "ofyclassification": self._y_subclass,
                "iswardertree": "true" if self._is_warder_tree else "false"
                }

class AABuilder(object):
    def __init__(self):
        self._id = 0
        self._name = "SomeAA"
        self._description = "SomeDescription"
        self._title = "SomeTitle"
        self._max_level = 2
        self._subclass = "Subclass"
        self._parent_id = -1
        self._parent_subtree_prereqs = 0
        self._global_prereqs = 0
        self._tree_prereqs = 0
        self._subtree_prereqs = 0
        self._parent_prereqs = 0
        self._coords = [1, 2]
        self._effects = ["Effect1", "Effect2"]
        self._level = 0
        self._cost = 1
        self._spellcrc = 1
        self._icon_id = 1
        self._icon_backdrop = 2

    def with_id(self, id_):
        self._id = id_
        return self

    def name(self, name_):
        self._name = name_
        return self

    def description(self, description):
        self._description = description
        return self

    def title(self, title):
        self._title = title
        return self

    def max_level(self, level):
        self._max_level = level
        return self

    def subclass(self, name):
        self._subclass = name
        return self

    def parent_id(self, id_):
        self._parent_id = id_
        return self

    def requires_parent_points(self, n):
        self._parent_prereqs = n
        return self

    def requires_parent_subtree_points(self, n):
        self._parent_subtree_prereqs = n
        return self

    def requires_global_points(self, n):
        self._global_prereqs = n
        return self

    def requires_tree_points(self, n):
        self._tree_prereqs = n
        return self

    def requires_subtree_points(self, n):
        self._subtree_prereqs = n
        return self

    def coords(self, x, y):
        self._coords = [x, y]
        return self

    def level(self, n):
        self._level = n
        return self

    def cost(self, n):
        self._cost = n
        return self
    
    def spellcrc(self, spellcrc):
        self._spellcrc = spellcrc
        return self
    
    def icon(self, icon_id, backdrop):
        self._icon_id = icon_id
        self._icon_backdrop = backdrop
        return self

    def build(self):
        return {"name": self._name,
                "classification": self._subclass,
                "classificationpointsrequired": self._subtree_prereqs,
                "description": self._description,
                "firstparentid": self._parent_id,
                "maxtier": self._max_level,
                "nodeid": self._id,
                "pointspertier": self._cost,
                "pointsspentgloballytounlock": self._global_prereqs,
                "pointsspentintreetounlock": self._tree_prereqs,
                "spellsrc": self._spellcrc,
                "title": self._title,
                "xcoord": self._coords[0],
                "ycoord": self._coords[1],
                "icon": {"backdrop": self._icon_backdrop, "id": self._icon_id }
                }
