/* eslint-disable no-magic-numbers */
const ALPHABET = '0ABCD2EFGH4IJKLMN6OPQRST8UVWXYZ-1abcd3efgh5ijklmn7opqrst9uvwxyz.';
const FIVE_CHARS = (1+2) << 4;
const THREE_CHARS = 1 << 5;

function parseNumber(arr: Array<string>, count: number): number {
	let result = 0;
	let countdown = count;

	while (countdown) {
		if (!arr.length) {
			throw new Error('No data!');
		}

		const ch = arr.pop() || ' ';
		const index = ALPHABET.indexOf(ch);

		if (index === -1) {
			continue;
		}

		result <<= 6;
		result += index;
		countdown--;
	}

	return result;
}

export function stringToCoords(str: string): Array<[number, number]> {
	const results: Array<[number, number]> = [];
	const coords: [number, number] = [0, 0];
	const arr: Array<string> = str.trim().split('').reverse();
	let coordIndex = 0;

	while (arr.length) {
		// podle prvnich dvou bitu poznam, o co jde
		let num = parseNumber(arr, 1);

		// cela souradnice
		if ((num & FIVE_CHARS) === FIVE_CHARS) {
			num -= FIVE_CHARS;
			num = ((num & 0xF) << 24) + parseNumber(arr, 4);
			coords[coordIndex] = num;
		// velky posun - 16 bitu
		} else if ((num & THREE_CHARS) === THREE_CHARS) {
			num = ((num & 0xF) << 12) + parseNumber(arr, 2);
			num -= 1 << 15;
			coords[coordIndex] += num;
		// maly posun - 11 bitu
		} else {
			num = ((num & 0x1F) << 6) + parseNumber(arr, 1);
			num -= 1 << 10;
			coords[coordIndex] += num;
		}

		// mame dvojici souradnic - sup s nima do floatu
		if (coordIndex) {
			const longitude = (coords[0] * 360 / (1 << 28)) - 180;
			const latitude = (coords[1] * 180 / (1 << 28)) - 90;

			results.push([longitude, latitude]);
		}

		coordIndex = (coordIndex + 1) % 2;
	}

	return results;
}

function _serializeNumber(delta: number, orig: number): string {
	let code = '';

	if (delta >= -1024 && delta < 1024) {
		code += ALPHABET.charAt((delta + 1024) >> 6);
		code += ALPHABET.charAt((delta + 1024) & 63);
	} else if (delta >= -32768 && delta < 32768) {
		const value = 0x20000 | (delta + 32768);

		code += ALPHABET.charAt((value >> 12) & 63);
		code += ALPHABET.charAt((value >> 6) & 63);
		code += ALPHABET.charAt(value & 63);
	} else {
		const value = 0x30000000 | (orig & 0xFFFFFFF);

		code += ALPHABET.charAt((value >> 24) & 63);
		code += ALPHABET.charAt((value >> 18) & 63);
		code += ALPHABET.charAt((value >> 12) & 63);
		code += ALPHABET.charAt((value >> 6) & 63);
		code += ALPHABET.charAt(value & 63);
	}

	return code;
}

export function coordsToString(arr: Array<[number, number]>): string {
	let ox = 0;
	let oy = 0;
	let result = '';

	for (let index = 0; index < arr.length; index++) {
		const coords = arr[index];
		const longitude = Math.round((coords[0] + 180) * (1 << 28) / 360);
		const latitude = Math.round((coords[1] + 90) * (1 << 28) / 180);
		const dx = longitude - ox;
		const dy = latitude - oy;

		result += _serializeNumber(dx, longitude);
		result += _serializeNumber(dy, latitude);

		ox = longitude;
		oy = latitude;
	}

	return result;
}
