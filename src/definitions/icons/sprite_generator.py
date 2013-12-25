import os
import shutil

class SpriteGenerator(object):
    def __init__(self, image_manipulator, icon_path, output_path, logger):
        self._image_manipulator = image_manipulator
        self._icon_path = icon_path
        self._output_path = output_path
        self._logger = logger
        
    def generate(self, class_):
        class_dir_path = os.path.join(self._output_path, class_.name)
        os.makedirs(class_dir_path, exist_ok=True)
        
        for tree in class_.trees:
            tree_dir_path = os.path.join(class_dir_path, tree.type)
            os.makedirs(tree_dir_path, exist_ok=True)
            
            for aa in tree.aa:
                icon_path = os.path.join(self._icon_path, "{0}.png".format(aa.icon["icon"]))
                output_path = os.path.join(tree_dir_path, "{0}.png".format(aa.id))
                self._create_icon_with_backdrop(aa.icon["backdrop"], icon_path, output_path)
                
    def _create_icon_with_backdrop(self, backdrop_id, icon_path, output_path):
        if backdrop_id > -1:
            backdrop_path = os.path.join(self._icon_path, "{0}.png".format(backdrop_id))
            self._image_manipulator.compose_atop(backdrop_path, icon_path, output_path)
        else:
            shutil.copy(icon_path, output_path)
