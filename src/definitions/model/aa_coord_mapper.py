class AACoordMapper:
    def map_coords(self, aa, tree_type):
        if tree_type == 'Archetype':
            return self._archetype_coords(aa)
        else:
            return self._regular_coords(aa)
        
    def _archetype_coords(self, aa):
        x_map = { 1: 63, 
                 4: 183, 
                 7: 303, 
                 10: 423, 
                 13: 543}
        
        y_map = { 0: 15,
                 1: 92,
                 2: 157,
                 3: 222,
                 4: 287,
                 5: 352,
                 6: 417 }
        
        aa.coords[0] = x_map[aa.coords[0]]
        aa.coords[1] = y_map[aa.coords[1]]
        
        return aa
    
    def _regular_coords(self, aa):
        def _calc_x(i):
            if i == 0:
                return 13
            elif i == 1:
                return 29 
            else:
                return 29 + 13 * (i - 1)
            
        def _calc_y(i):
            if i == 0:
                return 15
            elif i == 1:
                return 40 
            else:
                return 40 + 21 * (i - 1)
        
        aa.coords[0] = _calc_x(aa.coords[0])
        aa.coords[1] = _calc_y(aa.coords[1])
        
        return aa
