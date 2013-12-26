import subprocess

class ImageManipulator(object):
    def __init__(self):
        self._imagemagick_path = 'C:\\Program Files\\ImageMagick-6.8.7-Q16\\'
        self._composite_path = self._imagemagick_path + 'composite'
        self._montage_path = self._imagemagick_path + 'montage'
    
    def compose_atop(self, bottom_image_path, top_image_path, output_path):
        subprocess.check_call([self._composite_path, '-background', 'transparent', '-compose', 'atop', top_image_path, bottom_image_path, output_path], shell=True)
    
    def tile_horizontally(self, image_paths, image_width, image_height, padding, output_path):
        args = [self._montage_path, '-background', 'transparent', '-tile', '{0}x1'.format(len(image_paths)), '-geometry', '{0}x{1}+{2}+0'.format(image_width, image_height, padding)] + image_paths + [output_path]
        subprocess.check_call(args, shell=True)

    def tile_vertically(self, image_paths, image_width, image_height, padding, output_path):
        args = [self._montage_path, '-background', 'transparent', '-gravity', 'west', '-tile', '1x{0}'.format(len(image_paths)), '-geometry', '{0}x{1}+0+{2}'.format(image_width, image_height, padding)] + image_paths + [output_path]
        subprocess.check_call(args, shell=True)