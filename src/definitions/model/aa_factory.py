class AAFactory(object):
    def __init__(self, data_provider, spell_effect_formatter):
        self._data_provider = data_provider
        self._spell_effect_formatter = spell_effect_formatter
    
    def create(self, aa_node, lineage, class_name, tree_name):
        result = {}
        
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
        
        result["prereqs"] = { "parent_subtree": self._calculate_parent_subtree_prereq(result["subclass"], result["max_level"], lineage, class_name, tree_name),
                            "global": aa_node["pointsspentgloballytounlock"],
                            "tree": aa_node["pointsspentintreetounlock"],
                            "subtree": aa_node["classificationpointsrequired"],
                            "parent": aa_node.get("firstparentrequiredtier", 0)
                            }
        
        spells = self._data_provider.spells(aa_node["spellcrc"])
        result["icon"] = { "icon": spells[0]["icon"]["id"], "backdrop": spells[0]["icon"]["backdrop"] }
        result["effects"] = [self._spell_effect_formatter.format(spell["effect_list"]) for spell in spells]
        
        return result
    
    def _calculate_parent_subtree_prereq(self, subclass, max_level, lineage, class_name, tree_name):
        if tree_name == "Shadows" and max_level > 1\
        and subclass == lineage["family"]\
        or subclass == lineage["archetype"]\
        or subclass == class_name:            
            return 10
        return 0