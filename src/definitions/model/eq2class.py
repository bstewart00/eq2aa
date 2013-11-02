class EQ2Class(object):
    def __init__(self, id_, soe_id, name, lineage, trees, points, ordered_point_pools):
        self.id = id_
        self.soe_id = soe_id
        self.name = name
        self.lineage = lineage
        self.trees = trees
        self.points = points
        self.ordered_point_pools = ordered_point_pools
        
    def to_dict(self):
        return {
                "id": self.id,
                "soe_id": self.soe_id,
                "name": self.name,
                "lineage": self.lineage,
                "points": self.points,
                "ordered_point_pools": self.ordered_point_pools,
                "trees": [tree.to_dict() for tree in self.trees]
                }