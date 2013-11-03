from definitions.model.aa import AA
from definitions.utils.ordered_set import OrderedSet

class AAFactory(object):
    def __init__(self, data_provider, spell_effect_formatter, coord_mapper, logger):
        self._data_provider = data_provider
        self._spell_effect_formatter = spell_effect_formatter
        self._coord_mapper = coord_mapper
        self._logger = logger
        
    def create_all(self, aa_nodes, lineage, class_name, tree_name, tree_type):
        aa = list([self.create(aa_node, lineage, class_name, tree_name) for aa_node in aa_nodes])
        aa = self._sort_aa_by_coords(aa)
        aa = self._reorder_ids(aa)
        aa = self._remap_parent_ids(aa)
        aa = self._populate_aa_children(aa)
        aa = self._map_coords(aa, tree_type)
        
        orphans = self._find_orphans(aa)
        subtrees = { subclass: 0 for subclass in OrderedSet([i.subclass for i in aa]) }
        
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
        parent_ids_map = { soe_id: new_id for soe_id, new_id in map(lambda a: [a.soe_id, a.id], aa)}
        
        for i in aa:
            i.parent_ids = list(map(lambda x: parent_ids_map[x], i.parent_ids))
        return aa
    
    def _populate_aa_children(self, aa):
        for i in aa:
            i.children = [child.id for child in aa if i.id in child.parent_ids]
        return aa
    
    def _find_orphans(self, aa):
        return list([i.id for i in aa if i.parent_ids.count(-1) == len(i.parent_ids)])

    def create(self, aa_node, lineage, class_name, tree_name):
        self._logger.log('Processing AA {0}...'.format(aa_node["name"]))
        
        id_ = 0
        coords = [aa_node["xcoord"], aa_node["ycoord"]]
        subclass = aa_node["classification"]
        max_level = aa_node["maxtier"]

        prereqs = {"global": aa_node["pointsspentgloballytounlock"],
                   "tree": aa_node["pointsspentintreetounlock"],
                   "subtree": aa_node["classificationpointsrequired"],
                   "parent": aa_node.get("firstparentrequiredtier", 0) # So far, optionalfirstparentrequiredtier will always be the same as firstparentrequiredtier so we only need to store it once
                   }
        prereqs[ "parent_subtree"] = self._calculate_parent_subtree_prereq(subclass, max_level, lineage, class_name, tree_name, prereqs)

        spells = self._data_provider.spells(aa_node["spellcrc"])["spell_list"]
        
        icon = { "icon": spells[0]["icon"]["id"], "backdrop": spells[0]["icon"]["backdrop"] }
        effects = list(self._get_effects(spells))
        
        parents = []
        if "firstparentid" in aa_node:
            parents.append(aa_node["firstparentid"])
        if "optionalfirstparentid" in aa_node:
            parents.append(aa_node["optionalfirstparentid"])
                   
        return AA(id_,
                  aa_node["nodeid"],
                  parents,
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
        for spell in sorted(spells, key=lambda s: s["tier"]):
            if 'effect_list' in spell:
                yield self._spell_effect_formatter.format(spell["effect_list"])

    def _calculate_parent_subtree_prereq(self, subclass, max_level, lineage, class_name, tree_name, prereqs):
        is_above_general = subclass == lineage["family"] or subclass == lineage["archetype"] or subclass == class_name
        
        if tree_name == "Shadows" and prereqs["subtree"] == 0 and is_above_general:
            return 10
        return 0
    
    def _map_coords(self, aa, tree_type):
        return list([self._coord_mapper.map_coords(a, tree_type) for a in aa])
