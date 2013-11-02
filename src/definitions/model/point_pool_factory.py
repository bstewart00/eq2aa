import re

class PointPoolFactory:
    def __init__(self):
        self._pool_order = { "AA": 0, "Prestige": 1, "Tradeskill": 2, "TradeskillPrestige": 3, "Warder": 4 }
        self._global_aa_max = 320
    
    def create(self, trees):
        points = self._get_point_pools(trees)
        
        unordered = list(set([self._map_tree_to_pool_name(t) for t in trees]))
        ordered_point_pools = sorted(unordered, key=lambda t: self._pool_order[t])
        
        return points, ordered_point_pools
    
    def _make_pool(self, name, max_points):
        spaced_name = "Tradeskill Prestige" if name == "TradeskillPrestige" else name
        
        return { "name": spaced_name, "max": max_points }
    
    def _get_point_pools(self, trees):
        pools = {}
        
        warder_trees = list(self._filter_warder_trees(trees))
        
        for t in trees:
            if t.type in ["Prestige", "Tradeskill", "TradeskillPrestige"]:
                pools[t.type.replace(' ', '')] = self._make_pool(t.type, t.max_points)
            elif t.type == "Warder":
                continue
            else:
                pools["AA"] = self._make_pool("AA", self._global_aa_max)
                
        if len(warder_trees) > 0:
            pools["Warder"] = { "name": "Warder", "child_pools": self._get_child_pools(warder_trees) }
                
        return pools
    
    def _filter_warder_trees(self, trees):
        for t in trees:
            if t.is_warder_tree:
                yield t
    
    def _map_tree_to_pool_name(self, tree):
        valid_tree_types = ["Warder", "Prestige", "TradeskillPrestige", "Tradeskill"]
        
        if tree.type in valid_tree_types:
            return tree.type
        else:
            return "AA"
        
    def _get_child_pools(self, warder_trees):
        pools = {}
        for warder_tree in warder_trees:
            pools[warder_tree.name.replace(' ', '')] = self._make_pool(warder_tree.name, warder_tree.max_points)
        return pools
        