class Tree(object):
    '''
    classdocs
    
    
    sort_aa_by_location
    to_dict
    '''


    def __init__(self, id_, name, max_points, is_warder_tree, aa, x_y_ratio=0, x_subclass="", y_subclass=""):
        self.id = id_
        self.name = name
        self.max_points = max_points
        self.is_warder_tree = is_warder_tree
        self.aa = aa
        self.x_y_ratio = x_y_ratio
        self.x_subclass = x_subclass
        self.y_subclass = y_subclass