class AA(object):
    def __init__(self, id_, soe_id, parent_id, name, description, cost, max_level, subclass, coords, effects, icon, prereqs, children = [], title = ""):
        self.id = id_
        self.soe_id = soe_id
        self.parent_id = parent_id
        
        self.name = name
        self.description = description
        
        self.cost = cost
        self.level = 0
        self.max_level = max_level
        
        self.subclass = subclass
        self.coords = coords
        self.effects = effects
        self.children = children
        self.prereqs = prereqs
        self.title = title
        self.icon = icon
        
    def to_dict(self):
        return {
                "id": self.id,
                "soe_id": self.soe_id,
                "parent_id": self.parent_id,
                "name": self.name,
                "description": self.description,
                "cost": self.cost,
                "level": self.level,
                "max_level": self.max_level,
                "subclass": self.subclass,
                "coords": self.coords,
                "effects": self.effects,
                "children": self.children,
                "prereqs": self.prereqs,
                "title": self.title,
                "icon": self.icon
                }