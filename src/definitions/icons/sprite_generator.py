import os
import shutil
import io
from threading import enumerate

class SpriteImageGenerator(object):
    def __init__(self, image_manipulator, icon_path, output_path, logger):
        self._image_manipulator = image_manipulator
        self._icon_path = icon_path
        self._output_path = output_path
        self._logger = logger
        
    def generate(self, class_, icon_size, icon_padding):
        class_dir_path = os.path.join(self._output_path, class_.name)
        os.makedirs(class_dir_path, exist_ok=True)
        
        widest_tree_width = 0
        
        for tree in class_.trees:
            widest_tree_width = max(widest_tree_width, len(tree.aa))
            
            tree_dir_path = os.path.join(class_dir_path, tree.name)
            os.makedirs(tree_dir_path, exist_ok=True)
            
            def get_aa_sprite_path(aa):
                return os.path.join(tree_dir_path, "{0}.png".format(aa.id))
            
            for aa in tree.aa:
                icon_path = os.path.join(self._icon_path, "{0}.png".format(aa.icon["icon"]))
                output_path = get_aa_sprite_path(aa)
                self._create_icon_with_backdrop(aa.icon["backdrop"], icon_path, output_path)
            
            aa_paths = [get_aa_sprite_path(aa) for aa in tree.aa]
            tree_sprite_path = os.path.join(tree_dir_path, "{0}.png".format(tree.name))
            self._image_manipulator.tile_horizontally(aa_paths, icon_size, icon_size, icon_padding, tree_sprite_path)
        
        def get_tree_sprite_path(tree):
            return os.path.join(class_dir_path, tree.name, "{0}.png".format(tree.name))
        
        class_sprite_path = os.path.join(self._output_path, "{0}.png".format(class_.name))
        tree_paths = list([get_tree_sprite_path(tree) for tree in class_.trees])
        
        sprite_width = widest_tree_width * icon_size + 2 * icon_padding * widest_tree_width
        self._image_manipulator.tile_vertically(tree_paths, sprite_width, icon_size, icon_padding, class_sprite_path)

                
    def _create_icon_with_backdrop(self, backdrop_id, icon_path, output_path):
        if backdrop_id > -1:
            backdrop_path = os.path.join(self._icon_path, "{0}.png".format(backdrop_id))
            self._image_manipulator.compose_atop(backdrop_path, icon_path, output_path)
        else:
            shutil.copy(icon_path, output_path)

class SpriteCssGenerator(object):
    def __init__(self):
        pass
    
    def generate_css(self, trees, icon_size, icon_padding, selector_prefix=''):
        output = []
        
        y_offset = -icon_padding
        
        highest_aa_id = 0
        for tree in trees:
            highest_aa_id = max(len(tree.aa) - 1, highest_aa_id)
            
            tree_selector = '.{0}'.format(tree.type)
            if tree.type == 'Warder':
                tree_selector += '.{0}'.format(tree.name)
            
            selector = "{0}{1} .aa .icon".format(selector_prefix, tree_selector)
            css = "{{ background-position-y: {0}px; }}".format(y_offset)
            output.append(selector + " " + css)

            y_offset -= icon_size + 2 * icon_padding
            
            
        x_offset = -icon_padding
        for id_ in range(highest_aa_id):
            selector = ".aa.id{0} .icon".format(id_)
            css = "{{ background-position-x: {0}px; }}".format(x_offset)
            output.append(selector + " " + css)
            x_offset -= icon_size + 2 * icon_padding
    
        return os.linesep.join(output)