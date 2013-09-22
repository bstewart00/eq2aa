class Tree(object):
    def __init__(self, id_, soe_id, name, tree_type, max_points, is_warder_tree, aa, subtrees, orphans, x_y_ratio=0, x_subclass="", y_subclass=""):
        self.id = id_
        self.soe_id = soe_id
        self.name = name
        self.type = tree_type
        self.max_points = max_points
        self.is_warder_tree = is_warder_tree
        self.aa = aa
        self.x_y_ratio = x_y_ratio
        self.x_subclass = x_subclass
        self.y_subclass = y_subclass
        self.subtrees = subtrees
        self.orphans = orphans