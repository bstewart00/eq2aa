from definitions.model.aa_factory import AAFactory
from definitions.model.eq2class_factory import EQ2ClassFactory
from definitions.model.tree_factory import TreeFactory
from definitions.model.spell_effect_formatter import SpellEffectFormatter
from definitions.model.point_pool_factory import PointPoolFactory
from definitions.model.aa_coord_mapper import AACoordMapper
from definitions.soe.data_provider import CachedDataProvider, FileDataCache, SonyDataProvider
from definitions.utils.url_reader import UrlReader
from definitions.utils.logger import ConsoleLogger
from definitions.utils.json_writer import JsonFileWriter
from definitions.icons.icon_downloader import IconDownloader
from definitions.icons.sprite_generator import SpriteGenerator
from definitions.icons.image_manipulator import ImageManipulator
import os
import datetime

class AADefinitionApplication:
    def run(self):
        start_time = datetime.datetime.now() 
        
        logger = ConsoleLogger()
        logger.log('Started')
        
        cache_dir_path = os.path.abspath('./soe/cached_data')
        logger.log('Cache path: ' + cache_dir_path)
        
        data_provider = CachedDataProvider(SonyDataProvider(UrlReader(logger)), FileDataCache(cache_dir_path))
        spell_effect_formatter = SpellEffectFormatter()  
        coord_mapper = AACoordMapper()
        
        aa_factory = AAFactory(data_provider, spell_effect_formatter, coord_mapper, logger)
        tree_factory = TreeFactory(data_provider, aa_factory, logger)
        point_pool_factory = PointPoolFactory()
        class_factory = EQ2ClassFactory(data_provider, tree_factory, point_pool_factory, logger)
        
        json_writer = JsonFileWriter(logger)
        
        icon_output_path = os.path.abspath('./output/icons')
        self._ensure_dir_exists(icon_output_path)
        icon_downloader = IconDownloader(data_provider, icon_output_path, logger)
        
        image_manipulator = ImageManipulator()
        
        sprite_output_path = os.path.abspath('./output/sprites')
        self._ensure_dir_exists(sprite_output_path)
        sprite_generator = SpriteGenerator(image_manipulator, icon_output_path, sprite_output_path, logger)
        
        classes = list(class_factory.create_classes())
        
        for c in classes:
            icon_downloader.download_all(c)
            sprite_generator.generate(c)
            
            json_writer.write(c.to_dict(), './output/' + c.name + '.json', indent=3)
            json_writer.write(c.to_dict(), './output_min/' + c.name + '.json')
        
        end_time = datetime.datetime.now()
        logger.log('Done in {0}'.format(end_time - start_time))
        
    def _ensure_dir_exists(self, path):
        if not os.path.exists(path):
            os.makedirs(path)

if __name__ == "__main__":
    app = AADefinitionApplication()
    app.run()