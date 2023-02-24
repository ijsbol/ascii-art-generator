from typing import (
    Final,
    List,
)
from PIL import (
    Image,
)


ASCII_CHARACTERS: Final[str] = " .:-=+*#%@"

image_filepath = "test-image.png"
text_file_name = "output.txt"

def choose_character(pixel_brightness: int) -> str:
    return ASCII_CHARACTERS[
        round(
            (pixel_brightness / 255) * len(ASCII_CHARACTERS)
        ) - 1
    ]

def turn_image_into_greyscale(image_filepath: str) -> Image:
    return Image.open(image_filepath).convert('L')

def get_list_of_pixels(image: Image) -> List[int]:
    pixels_list = list(image.getdata())
    width, height = image.size
    return [pixels_list[i * width:(i + 1) * width] for i in range(height)]

def convert_list_of_greyscale_pixels_to_text(grey_scale_pixels: List[List[int]]) -> str:
    image_as_ascii_text = ""
    for pixel_row in list_of_pixels:
        displayed_pixel_row = ""
        for pixel in pixel_row:
            displayed_pixel_row += choose_character(pixel)
        image_as_ascii_text += displayed_pixel_row + "\n"
    return image_as_ascii_text

def write_to_file(output_filepath: str, image_as_ascii_text: str) -> None:
    with open(output_filepath, "w+") as text_file:
        text_file.write(image_as_ascii_text)

grey_scale_image = turn_image_into_greyscale(image_filepath)
list_of_pixels = get_list_of_pixels(grey_scale_image)
image_as_ascii_text = convert_list_of_greyscale_pixels_to_text(list_of_pixels)
write_to_file(text_file_name, image_as_ascii_text)