import { ArgumentParser } from "argparse";
import fs from "fs";
import Jimp from "jimp";

interface Arguments {
	image_filepath: string,
	text_file_name: string 
}

const ASCII_CHARACTERS = " .:-=+*#%@";

const parser = new ArgumentParser({
	description: "A Javascript program written in Typescript that converts images into ASCII art"
});

parser.add_argument('image_filepath');
parser.add_argument('text_file_name');

const args: Arguments = parser.parse_args();

function choose_character(pixel_brightness: number): string {
	return ASCII_CHARACTERS.charAt(
		Math.round(
			(pixel_brightness / 255) * ASCII_CHARACTERS.length
		) - 1
	)
}

function get_list_of_pixels(image: Jimp): number[][] {
	const grayscale_array: number[] = [];
	const height = image.bitmap.height;
	const width = image.bitmap.width;

	image.scan(0, 0, image.bitmap.width, image.bitmap.height, (_x, _y, idx) => {
		const red = image.bitmap.data[idx + 0];
		const green = image.bitmap.data[idx + 1];
		const blue = image.bitmap.data[idx + 2];
		
		// The next line of code uses the ITU-R 601-2 luma transformation method to turn the image into greyscale
		const gray = Math.round(0.299 * red + 0.587 * green + 0.114 * blue - 0.0001);

		grayscale_array.push(gray);
	})

	return Array.from({length: height}, (_, i) => grayscale_array.slice(i * width, (i + 1) * width));
}

function convert_list_of_greyscale_pixels_to_text(greyscale_pixels: number[][]): string {
	let image_as_ascii_text = "";
	for (let pixel_row of greyscale_pixels) {
		let displayed_pixel_row = "";
		for (let pixel of pixel_row) {
			displayed_pixel_row += choose_character(pixel);
		}
		image_as_ascii_text += displayed_pixel_row + "\n";
	}

	return image_as_ascii_text;
}

function write_to_file(output_filepath: string, image_as_ascii_text: string) {
	fs.writeFile(output_filepath, image_as_ascii_text, (err) => {if (err) throw err;});
}

Jimp.read(args.image_filepath)
.then((image) => {
	const list_of_pixels = get_list_of_pixels(image);
	const image_as_ascii_text = convert_list_of_greyscale_pixels_to_text(list_of_pixels);
	write_to_file(args.text_file_name, image_as_ascii_text);
})