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
from definitions.icons.sprite_generator import SpriteImageGenerator
from definitions.icons.sprite_generator import SpriteCssGenerator
from definitions.icons.image_manipulator import ImageManipulator
import os
import datetime
import io

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
        
        build_dir = os.path.abspath('../../build')
        
        icon_output_path = os.path.join(build_dir, 'icons')
        self._ensure_dir_exists(icon_output_path)
        icon_downloader = IconDownloader(data_provider, icon_output_path, logger)
        
        image_manipulator = ImageManipulator()
        
        sprite_output_path = os.path.join(build_dir, 'sprites')
        self._ensure_dir_exists(sprite_output_path)
        sprite_image_generator = SpriteImageGenerator(image_manipulator, icon_output_path, sprite_output_path, logger)
        
        classes = list(class_factory.create_classes())
        
        tree_output_dir = os.path.join('.', 'output')
        tree_minified_output_dir = os.path.join('.', 'output_min')
        
        icon_size = 42
        icon_padding = 1
        sprite_css_generator = SpriteCssGenerator()
        
        for c in classes:
            icon_downloader.download_all(c)
            sprite_image_generator.generate(c, icon_size, icon_padding)
            
            filename = c.name + '.json'
            json_writer.write(c.to_dict(), os.path.join(tree_output_dir, filename), indent=3)
            json_writer.write(c.to_dict(), os.path.join(tree_minified_output_dir, filename))
        
            if c.name == 'Beastlord':
                beastlord_css = sprite_css_generator.generate_css(c.trees, icon_size, icon_padding, '.Beastlord ')
                self._write_to_text_file(os.path.join(sprite_output_path, "sprites-beastlord.css"), beastlord_css)        

        css = sprite_css_generator.generate_css(classes[0].trees, icon_size, icon_padding)
        self._write_to_text_file(os.path.join(sprite_output_path, "sprites.css"), css)
        
        end_time = datetime.datetime.now()
        logger.log('Done in {0}'.format(end_time - start_time))
        
    def _write_to_text_file(self, path, contents):
        with open(path, "w", encoding="utf-8") as file:
            file.write(contents)
        
    def _ensure_dir_exists(self, path):
        if not os.path.exists(path):
            os.makedirs(path)

if __name__ == "__main__":
    app = AADefinitionApplication()
    app.run()