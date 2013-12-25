import subprocess

class ImageManipulator(object):
    def __init__(self):
        self._imagemagick_path = 'C:\\Program Files\\ImageMagick-6.8.7-Q16\\'
        self._composite_path = self._imagemagick_path + 'composite'
        self._montage_path = self._imagemagick_path + 'montage'
    
    def compose_atop(self, bottom_image_path, top_image_path, output_path):
        subprocess.check_call([self._composite_path, '-compose', 'atop', top_image_path, bottom_image_path, output_path], shell=True)
    
    def tile_horizontally(self, image_paths, icon_size, padding, output_path):
        subprocess.check_call([self._montage_path, '-tile', '{0}x1'.format(len(image_paths)), '-geometry', '{0}x{0}+{1}+0'.format(icon_size, padding), " ".join(image_paths), output_path], shell=True)

    def tile_vertically(self, image_paths, icon_size, padding, output_path):
        subprocess.check_call([self._montage_path, '-tile', '{0}x1'.format(len(image_paths)), '-geometry', '{0}x{0}+{1}+0'.format(icon_size, padding), " ".join(image_paths), output_path], shell=True)