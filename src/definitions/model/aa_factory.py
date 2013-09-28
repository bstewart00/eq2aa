from definitions.model.aa import AA

class AAFactory(object):
    def __init__(self, data_provider, spell_effect_formatter):
        self._data_provider = data_provider
        self._spell_effect_formatter = spell_effect_formatter

    def create(self, aa_node, lineage, class_name, tree_name):
        id_ = 0
        coords = [aa_node["xcoord"], aa_node["ycoord"]]
        subclass = aa_node["classification"]
        max_level = aa_node["maxtier"]

        prereqs = { "parent_subtree": self._calculate_parent_subtree_prereq(subclass, max_level, lineage, class_name, tree_name),
                            "global": aa_node["pointsspentgloballytounlock"],
                            "tree": aa_node["pointsspentintreetounlock"],
                            "subtree": aa_node["classificationpointsrequired"],
                            "parent": aa_node.get("firstparentrequiredtier", 0)
                            }

        spells = self._data_provider.spells(aa_node["spellcrc"])
        icon = { "icon": spells[0]["icon"]["id"], "backdrop": spells[0]["icon"]["backdrop"] }
        effects = [self._spell_effect_formatter.format(spell["effect_list"]) for spell in spells]

        return AA(id_,
                  aa_node["nodeid"],
                  aa_node.get("firstparentid", -1),
                  aa_node["name"],
                  aa_node["description"],
                  aa_node["pointspertier"],
                  max_level,
                  subclass,
                  coords,
                  effects,
                  icon,
                  prereqs,
                  title=aa_node["title"])

    def _calculate_parent_subtree_prereq(self, subclass, max_level, lineage, class_name, tree_name):
        if tree_name == "Shadows" and max_level > 1\
        and subclass == lineage["family"]\
        or subclass == lineage["archetype"]\
        or subclass == class_name:
            return 10
        return 0
