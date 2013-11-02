from definitions.model.eq2class_factory import EQ2ClassFactory
from definitions.model.tree import Tree
from definitions.tests.data_helper import EQ2ClassBuilder, TreeBuilder
import unittest
from unittest.mock import MagicMock, patch, call

class TestEQ2ClassFactory(unittest.TestCase):
    def setUp(self):
        self._data_provider = MagicMock()
        self._tree_factory = MagicMock()
        self._point_pool_factory = MagicMock()
        self._logger = MagicMock()
        self.sut = EQ2ClassFactory(self._data_provider, self._tree_factory, self._point_pool_factory, self._logger)
        
        self._trees = [1,2,3]
        self._points = ["point pool"]
        self._ordered_point_pools = ["ordered points"]
        self._point_pool_factory.create.side_effect = lambda trees: (self._points, self._ordered_point_pools) if trees == self._trees else ([], [])
        self._tree_factory.create_all.return_value = self._trees
        
    def _setup_returned_classes(self, class_nodes):
        self._data_provider.classes.return_value = { 
            "constants_list": [{
                                "adventureclass_list": class_nodes
                                }]
                                                    }
        
    def _return_class_name(self, id_, soe_id, name, lineage, trees, points, ordered_point_pools):
        return name
    
    def _return_class_lineage(self, id_, soe_id, name, lineage, trees, points, ordered_point_pools):
        return name + ',' + lineage["family"] + ',' + lineage["archetype"]

    def test_create_constructs_class(self):
        class1 = EQ2ClassBuilder().with_id(3).name("Class1").is_subclass().build()
        self._setup_returned_classes([class1])

        result = list(self.sut.create_classes())

        self.assertEquals(result[0].name, "Class1")
        
    def test_create_name_is_capitalized(self):
        family1 = EQ2ClassBuilder().with_id(1).name("family").build()
        arch1 = EQ2ClassBuilder().with_id(2).name("archetype").build()
        class1 = EQ2ClassBuilder().with_id(3).name("class1").is_subclass().build()
        self._setup_returned_classes([family1, arch1, class1])

        result = list(self.sut.create_classes())

        self.assertEquals(result[0].lineage["family"], "Family")
        self.assertEquals(result[0].lineage["archetype"], "Archetype")
        self.assertEquals(result[0].name, "Class1")
        


    @patch('definitions.model.eq2class_factory.EQ2Class')
    def test_create_populates_lineage(self, mock_class):
        mock_class.side_effect = self._return_class_name
        
        family1 = EQ2ClassBuilder().with_id(1).name("Family").build()
        arch1 = EQ2ClassBuilder().with_id(2).name("Archetype").build()
        class1 = EQ2ClassBuilder().with_id(3).name("Class1").is_subclass().build()
        class2 = EQ2ClassBuilder().with_id(4).name("Class2").is_subclass().build()

        arch2 = EQ2ClassBuilder().with_id(5).name("Archetype2").build()
        class3 = EQ2ClassBuilder().with_id(6).name("Class3").is_subclass().build()

        family2 = EQ2ClassBuilder().with_id(7).name("Family2").build()
        arch3 = EQ2ClassBuilder().with_id(8).name("Archetype3").build()
        class4 = EQ2ClassBuilder().with_id(9).name("Class4").is_subclass().build()

        self._setup_returned_classes([family1, arch1,
                                                    class1, class2,
                                                    arch2, class3,
                                                    family2, arch3, class4])

        result = list(self.sut.create_classes())

        mock_class.assert_has_calls([call(0, 3, 'Class1', { 'family': 'Family', 'archetype': 'Archetype' }, self._trees, self._points, self._ordered_point_pools),
                               call(1, 4, 'Class2', { 'family': 'Family', 'archetype': 'Archetype' }, self._trees, self._points, self._ordered_point_pools),
                               call(2, 6, 'Class3', { 'family': 'Family', 'archetype': 'Archetype2' }, self._trees, self._points, self._ordered_point_pools),
                               call(3, 9, 'Class4', { 'family': 'Family2', 'archetype': 'Archetype3' }, self._trees, self._points, self._ordered_point_pools)])

    @patch('definitions.model.eq2class_factory.EQ2Class')
    def test_create_only_creates_classes_matching_filter(self, mock_class):
        mock_class.side_effect = self._return_class_lineage
        
        family1 = EQ2ClassBuilder().with_id(1).name("Family").build()
        arch1 = EQ2ClassBuilder().with_id(2).name("Archetype").build()
        class1 = EQ2ClassBuilder().with_id(3).name("Class1").is_subclass().build()
        class2 = EQ2ClassBuilder().with_id(4).name("Class2").is_subclass().build()

        arch2 = EQ2ClassBuilder().with_id(5).name("Archetype2").build()
        class3 = EQ2ClassBuilder().with_id(6).name("Class3").is_subclass().build()

        family2 = EQ2ClassBuilder().with_id(7).name("Family2").build()
        arch3 = EQ2ClassBuilder().with_id(8).name("Archetype3").build()
        class4 = EQ2ClassBuilder().with_id(9).name("Class4").is_subclass().build()

        self._setup_returned_classes([family1, arch1,
                                                    class1, class2,
                                                    arch2, class3,
                                                    family2, arch3, class4])
        
        result = list(self.sut.create_classes(['Class1', 'Class4']))
        
        self.assertEqual(['Class1,Family,Archetype', 'Class4,Family2,Archetype3'], result) 