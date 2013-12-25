import subprocess

class ImageManipulator(object):
    def compose_atop(self, bottom_image_path, top_image_path, output_path):
        subprocess.call("C:\\Program Files\\ImageMagick-6.8.7-Q16\\composite -compose atop {0} {1} {2}".format(top_image_path, bottom_image_path, output_path))
    
    def tile_horizontally(self, image_paths, icon_size, padding, output_path):
        subprocess.call("montage -tile {0}x1 -geometry{1}x{1}+{2}+0 {3} {4}".format(len(image_paths), icon_size, padding, " ".join(image_paths), output_path))

    def tile_vertically(self, image_paths, icon_size, padding, output_path):
        subprocess.call("montage -tile {0}x1 -geometry{1}x{1}+{2}+0 {3} {4}".format(len(image_paths), icon_size, padding, " ".join(image_paths), output_path))