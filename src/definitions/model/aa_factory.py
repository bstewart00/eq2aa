from definitions.model.aa import AA
from definitions.utils.ordered_set import OrderedSet

class AAFactory(object):
    def __init__(self, data_provider, spell_effect_formatter):
        self._data_provider = data_provider
        self._spell_effect_formatter = spell_effect_formatter
        
    def create_all(self, aa_nodes, lineage, class_name, tree_name):
        aa = list([self.create(aa_node, lineage, class_name, tree_name) for aa_node in aa_nodes])
        aa = self._sort_aa_by_coords(aa)
        aa = self._reorder_ids(aa)
        aa = self._remap_parent_ids(aa)
        aa = self._populate_aa_children(aa)
        
        orphans = self._find_orphans(aa)
        subtrees = OrderedSet([i.subclass for i in aa])
        
        return aa, orphans, subtrees
    
    def _sort_aa_by_coords(self, aa):
        return sorted(aa, key=lambda n: (n.coords[1], n.coords[0]))
    
    def _reorder_ids(self, aa):
        next_id = 0
        for i in aa:
            i.id = next_id
            next_id += 1
        return aa
    
    def _remap_parent_ids(self, aa):        
        parent_id_map = { soe_id: new_id for soe_id, new_id in map(lambda a: [a.soe_id, a.id], aa)}
        
        for i in aa:
            if i.parent_id != -1:
                i.parent_id = parent_id_map[i.parent_id]
        return aa
    
    def _populate_aa_children(self, aa):
        for i in aa:
            i.children = [child.id for child in aa if child.parent_id == i.id]
        return aa
    
    def _find_orphans(self, aa):
        return list([i.id for i in aa if i.parent_id == -1])

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

        spells_result = self._data_provider.spells(aa_node["spellcrc"])
        spells = spells_result["spell_list"]
        icon = { "icon": spells[0]["icon"]["id"], "backdrop": spells[0]["icon"]["backdrop"] }
        effects = list(self._get_effects(spells))
                   
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
        
    def _get_effects(self, spells):
        for spell in spells:
            if 'effect_list' in spell:
                yield self._spell_effect_formatter.format(spell["effect_list"])

    def _calculate_parent_subtree_prereq(self, subclass, max_level, lineage, class_name, tree_name):
        if tree_name == "Shadows" and max_level > 1\
        and subclass == lineage["family"]\
        or subclass == lineage["archetype"]\
        or subclass == class_name:
            return 10
        return 0
