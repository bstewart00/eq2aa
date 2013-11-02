import unittest
from definitions.model.aa_coord_mapper import AACoordMapper
from unittest.mock import MagicMock

class TestAACoordMapper(unittest.TestCase):
    def setUp(self):
        self.sut = AACoordMapper()
        
    def test_archetype_coords(self):
        self.assert_archetype_coord_maps_to([1, 0], [63, 15])
        self.assert_archetype_coord_maps_to([4, 1], [183, 92])
        self.assert_archetype_coord_maps_to([7, 2], [303, 157])
        self.assert_archetype_coord_maps_to([10, 3], [423, 222])
        self.assert_archetype_coord_maps_to([13, 4], [543, 287])
        self.assert_archetype_coord_maps_to([13, 5], [543, 352])
        self.assert_archetype_coord_maps_to([13, 6], [543, 417])
        
    def test_regular_coords(self):
        expected_x = {  0: 13, 
                       1: 29, 
                       2: 42, 
                       3: 55, 
                       5: 81, 
                       6: 94, 
                       7: 107, 
                       8: 120, 
                       9: 133, 
                       11: 159, 
                       12: 172, 
                       13: 185, 
                       14: 198, 
                       15: 211, 
                       17: 237, 
                       18: 250, 
                       19: 263, 
                       21: 289, 
                       22: 302, 
                       24: 328, 
                       25: 341, 
                       26: 354, 
                       28: 380, 
                       29: 393, 
                       30: 406, 
                       31: 419, 
                       33: 445, 
                       34: 458, 
                       35: 471, 
                       37: 497, 
                       38: 510, 
                       41: 549, 
                       42: 562}
        
        expected_y = {   0: 15,
                       1: 40, 
                       3: 82, 
                       4: 103, 
                       5: 124, 
                       6: 145, 
                       7: 166, 
                       8: 187, 
                       9: 208, 
                       11: 250, 
                       13: 292, 
                       14: 313, 
                       15: 334, 
                       16: 355, 
                       17: 376, 
                       19: 418}
        
        all_coords = [[x, y] for x in expected_x.keys() for y in expected_y.keys()]
        
        for x, y in iter(all_coords):
            aa = MagicMock()
            aa.coords = [x, y]
            self.sut.map_coords(aa, "AnyOtherTree")
            self.assertEqual(aa.coords[0], expected_x[x])
            self.assertEqual(aa.coords[1], expected_y[y])
        
    def assert_archetype_coord_maps_to(self, coords, expected_coords):
        aa = MagicMock()
        aa.coords = coords
        
        self.sut.map_coords(aa, "Archetype")
        
        self.assertEqual(aa.coords, expected_coords)
