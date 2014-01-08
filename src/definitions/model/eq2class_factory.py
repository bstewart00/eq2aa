from definitions.model.eq2class import EQ2Class

class EQ2ClassFactory(object):
    def __init__(self, data_provider, tree_factory, point_pool_factory, logger):
        self._data_provider = data_provider
        self._tree_factory = tree_factory
        self._point_pool_factory = point_pool_factory
        self._logger = logger

    def create_classes(self, class_name_filter=[]):
        def _matches_filter(class_name):
            return len(class_name_filter) == 0 or class_name in class_name_filter
        
        previous_lineage = []
        new_lineage = []
        
        classes_list = self._data_provider.classes()
        all_classes = classes_list["constants_list"][0]["adventureclass_list"]

        for class_node in all_classes:
            self._logger.log('Processing class {0}...'.format(class_node["name"]))
            
            capitalized_name = class_node["name"].capitalize()
            
            if class_node["issubclass"] == "false":
                new_lineage.append(capitalized_name)
            else:
                name = capitalized_name
                class_id = self._get_id(name)
                
                lineage = self._determine_lineage(previous_lineage, new_lineage)
                lineage_dict = self._create_lineage_dict(lineage, name)
                previous_lineage = list(lineage)
                new_lineage = []
                
                if _matches_filter(name):
                    trees = self._tree_factory.create_all(lineage_dict, class_node["alternateadvancementtree_list"], name)
                    point_pools, ordered_point_pools = self._point_pool_factory.create(trees)
                    
                    result = EQ2Class(class_id, class_node["id"], name, lineage_dict, trees, point_pools, ordered_point_pools)
                    yield result
                    
    def _get_id(self, name):
        class_ids = {
            "Assassin": 0,
            "Beastlord": 24,
            "Berserker": 1,
            "Brigand": 2,
            "Bruiser": 3,
            "Channeler": 25,
            "Coercer": 4,
            "Conjuror": 5,
            "Defiler": 6,
            "Dirge": 7,
            "Fury": 8,
            "Guardian": 9,
            "Illusionist": 10,
            "Inquisitor": 11,
            "Monk": 12,
            "Mystic": 13,
            "Necromancer": 14,
            "Paladin": 15,
            "Ranger": 16,
            "Shadowknight": 17,
            "Swashbuckler": 18,
            "Templar": 19,
            "Troubador": 20,
            "Warden": 21,
            "Warlock": 22,
            "Wizard": 23
        }
        return class_ids[name]
        
    def _create_lineage_dict(self, lineage, class_name):
        if len(lineage) == 0: return {}
        family = "Priest" if class_name == "Channeler" else lineage[0]
        
        return { "family": family, "archetype": lineage[1]}    

    def _determine_lineage(self, previous_lineage, new_lineage):
        if len(previous_lineage) == 0 or len(new_lineage) == 2:
            return new_lineage
        elif len(new_lineage) == 1:
            return [previous_lineage[0], new_lineage[0]]
        else:
            return previous_lineage

