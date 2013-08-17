import unittest
from eq2aa_definitions.model.eq2class_factory import EQ2ClassFactory
from eq2aa_definitions.tests.data_helper import DataHelper
from unittest.mock import MagicMock, patch, call

class TestEQ2ClassFactory(unittest.TestCase):
    def setUp(self):
        self._data_provider = MagicMock()
        self._tree_factory = MagicMock()
        self.sut = EQ2ClassFactory(self._data_provider, self._tree_factory)
        
    @patch('eq2aa_definitions.model.eq2class_factory.EQ2Class')
    def test_create_constructs_class(self, mock_class):
        def return_class_name(id_,name,lineage,trees):
            return name
        mock_class.side_effect = return_class_name
        
        class1 = DataHelper.make_class(3, "Class1", True, [])
        self._data_provider.classes.return_value = [class1]

        result = list(self.sut.create_classes())

        self.assertEquals(result, ["Class1"])
        

    @patch('eq2aa_definitions.model.eq2class_factory.EQ2Class')
    def test_create_populates_lineage(self, mock_class):
        def return_class_name(id_,name,lineage,trees):
            return name
        mock_class.side_effect = return_class_name
        
        family1 = DataHelper.make_class(1, "Family", False, [])
        arch1 = DataHelper.make_class(2, "Archetype", False, [])
        class1 = DataHelper.make_class(3, "Class1", True, [])
        class2 = DataHelper.make_class(4, "Class2", True, [])

        arch2 = DataHelper.make_class(5, "Archetype2", False, [])
        class3 = DataHelper.make_class(6, "Class3", True, [])

        family2 = DataHelper.make_class(7, "Family2", False, [])
        arch3 = DataHelper.make_class(8, "Archetype3", False, [])
        class4 = DataHelper.make_class(9, "Class4", True, [])


        self._data_provider.classes.return_value = [family1, arch1,
                                                    class1, class2,
                                                    arch2, class3,
                                                    family2, arch3, class4]

        list(self.sut.create_classes())

        mock_class.assert_has_calls([call(3, 'Class1', ['Family', 'Archetype'], []),
                               call(4, 'Class2', ['Family', 'Archetype'], []),
                               call(6, 'Class3', ['Family', 'Archetype2'], []),
                               call(9, 'Class4', ['Family2', 'Archetype3'], [])])
        
    @patch('eq2aa_definitions.model.eq2class_factory.EQ2Class')
    def test_create_populates_trees(self, mock_class):
        def return_class_name(id_,name,lineage,trees):
            return name
        mock_class.side_effect = return_class_name
        
        tree_id = 0
        some_tree = DataHelper.make_tree(tree_id, "Tree")
        some_class = DataHelper.make_class(0, "Class", True, [tree_id])
        
        def return_tree(id_):
            return some_tree if id_["id"] == tree_id else None
        self._tree_factory.create.side_effect = return_tree
        self._data_provider.classes.return_value = [some_class]
        
        list(self.sut.create_classes())
        
        mock_class.assert_has_calls([call(0, 'Class', [], [some_tree])]),