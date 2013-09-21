class AAFactory(object):
    def __init__(self, data_provider):
        self._data_provider = data_provider
    
    def create(self, aa_node):
        result = {};
        
        result["id"] = 0
        result["level"] = 0
        result["parent_id"] = aa_node.get("firstparentid", -1)
        result["soe_id"] = aa_node["nodeid"]
        result["name"] = aa_node["name"]
        result["description"] = aa_node["description"]
        result["subclass"] = aa_node["classification"]
        result["max_level"] = aa_node["maxtier"]
        result["cost"] = aa_node["pointspertier"]
        result["title"] = aa_node["title"]
        result["coords"] = [aa_node["xcoord"], aa_node["ycoord"]]
        result["children"] = []
        
        result["prereqs"] = { "parent_subtree": 0,
                            "global": 0,
                            "tree": 0,
                            "subtree": 0,
                            "parent": 0}
        
        return result