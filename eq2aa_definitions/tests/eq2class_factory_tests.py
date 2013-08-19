import unittest
from eq2aa_definitions.model.eq2class_factory import EQ2ClassFactory
from eq2aa_definitions.tests.data_helper import EQ2ClassBuilder, TreeBuilder
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
        
        class1 = EQ2ClassBuilder().with_id(3).name("Class1").is_subclass().build()
        self._data_provider.classes.return_value = [class1]

        result = list(self.sut.create_classes())

        self.assertEquals(result, ["Class1"])
        

    @patch('eq2aa_definitions.model.eq2class_factory.EQ2Class')
    def test_create_populates_lineage(self, mock_class):
        def return_class_name(id_,name,lineage,trees):
            return name
        mock_class.side_effect = return_class_name
        family1 = EQ2ClassBuilder().with_id(1).name("Family").build()
        arch1 = EQ2ClassBuilder().with_id(2).name("Archetype").build()
        class1 = EQ2ClassBuilder().with_id(3).name("Class1").is_subclass().build()
        class2 = EQ2ClassBuilder().with_id(4).name("Class2").is_subclass().build()

        arch2 = EQ2ClassBuilder().with_id(5).name("Archetype2").build()
        class3 = EQ2ClassBuilder().with_id(6).name("Class3").is_subclass().build()

        family2 = EQ2ClassBuilder().with_id(7).name("Family2").build()
        arch3 = EQ2ClassBuilder().with_id(8).name("Archetype3").build()
        class4 = EQ2ClassBuilder().with_id(9).name("Class4").is_subclass().build()

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
        some_tree = TreeBuilder().build()
        some_class = EQ2ClassBuilder().is_subclass().with_tree_ids([tree_id]).build()
        
        def return_tree(id_):
            return some_tree if id_["id"] == tree_id else None
        self._tree_factory.create.side_effect = return_tree
        self._data_provider.classes.return_value = [some_class]
        
        list(self.sut.create_classes())
        
        mock_class.assert_has_calls([call(some_class["id"], some_class["name"], [], [some_tree])]),