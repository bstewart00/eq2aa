from definitions.model.aa_factory import AAFactory
from definitions.model.eq2class_factory import EQ2ClassFactory
from definitions.model.tree_factory import TreeFactory
from definitions.model.spell_effect_formatter import SpellEffectFormatter
from definitions.soe.data_provider import CachedDataProvider, FileDataCache, SonyDataProvider
from definitions.utils.url_reader import UrlReader
import os

class AADefinitionApplication:
    """
            1. For all classes in filtered list
            2. ClassFactory.create_classes([filter]
            3. Write classes to disk
            4. Request and save all icons 
            4. CSS sprite processing
    """                                         
    def run(self):
        cache_dir_path = os.path.abspath('./soe/cached_data')
        print(cache_dir_path)
        data_provider = CachedDataProvider(SonyDataProvider(UrlReader()), FileDataCache(cache_dir_path))
        
        spell_effect_formatter = SpellEffectFormatter()  
        aa_factory = AAFactory(data_provider, spell_effect_formatter)
        tree_factory = TreeFactory(data_provider, aa_factory)
        class_factory = EQ2ClassFactory(data_provider, tree_factory)
        
        classes = list(class_factory.create_classes())

if __name__ == "__main__":
    app = AADefinitionApplication()
    app.run()