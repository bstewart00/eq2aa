class EQ2Class(object):
    def __init__(self, id_, soe_id, name, lineage, trees):
        self.id = id_
        self.soe_id = soe_id
        self.name = name
        self.lineage = lineage
        self.trees = trees
        
    def to_dict(self):
        return {
                "id": self.id,
                "soe_id": self.soe_id,
                "name": self.name,
                "lineage": self.lineage,
                "trees": self.trees
                }