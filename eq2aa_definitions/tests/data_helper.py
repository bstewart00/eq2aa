class DataHelper(object):
    @staticmethod
    def make_class(class_id, name, is_subclass, tree_ids):
        return {"issubclass": "true" if is_subclass else "false",
                "id": class_id,
                "name": name,
                "alternateadvancementtree_list": [{ "id": i } for i in tree_ids]
                }
        
    @staticmethod
    def make_tree(tree_id, name, is_warder_tree=False):
        return {"id": tree_id,
                "name": name,
                "alternateadvancementnode_list": [],
                "iswardertree": is_warder_tree
                }