class PointPoolFactory:
    def __init__(self):
        self._pool_order = { "AA": 0, "Prestige": 1, "Tradeskill": 2, "TradeskillPrestige": 3, "Warder": 4 }
    
    def create(self, trees):
        points = []
        
        unordered = list(set([self._map_tree_to_pool_name(t) for t in trees]))
        ordered_point_pools = sorted(unordered, key=lambda t: self._pool_order[t])
        
        return points, ordered_point_pools
    
    def _map_tree_to_pool_name(self, tree):
        valid_tree_types = ["Warder", "Prestige", "TradeskillPrestige", "Tradeskill"]
        
        if tree.type in valid_tree_types:
            return tree.type
        else:
            return "AA"