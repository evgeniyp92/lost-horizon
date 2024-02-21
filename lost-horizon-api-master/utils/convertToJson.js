/* eslint-disable no-param-reassign */
const fs = require('fs');
const excelToJson = require('convert-excel-to-json');
const convertJulianToDate = require('./convertJulianToDate');

const convertToJson = async () => {
	const readDataPro = () =>
		new Promise((resolve, reject) => {
			fs.readFile('./fullInventory.xlsx', (err, data) => {
				if (err) {
					reject(err);
				}
				resolve(data);
			});
		});

	const bufferedExcel = await readDataPro();

	const result = excelToJson({
		source: bufferedExcel,
		header: {
			rows: 1,
		},
		columnToKey: {
			A: 'location',
			B: 'name',
			C: 'partNumber',
			D: 'cost',
			E: 'quantity',
			F: 'printed1574',
			G: 'printedBinLabel',
			H: 'lastInventoryDate',
		},
	});

	// without accessing the subobject, it will return a named object
	let newResult = [];
	const selectSheets = Object.keys(result).filter(el => el !== 'TOOL PROGRAM');
	// eslint-disable-next-line no-restricted-syntax
	for (const element of selectSheets) {
		newResult = [...newResult, ...result[element]];
	}

	newResult.forEach((item, index) => {
		// if it's a shell entry or a dead entry delete it and proceed to next loops
		if (!item.name || item.name.startsWith('EMPTY')) {
			delete newResult[index];
		} else {
			// Converting Y/N strings to boolean for form 1574s and bin labels. Some
			// fields in the source document are empty so I'm just going to assume
			// that an empty field means no bin label...
			if (item.printed1574 === 'Y') {
				item.printed1574 = true;
			} else {
				item.printed1574 = false;
			}
			// for bin labels
			if (item.printedBinLabel === 'Y') {
				item.printedBinLabel = true;
			} else {
				item.printedBinLabel = false;
			}
			// converting the date of last inventory to a date
			if (item.lastInventoryDate) {
				item.lastInventoryDate = convertJulianToDate(item.lastInventoryDate);
			}

			// Convert the location from a string to an set of string fields
			item.warehouse = item.location.substring(0, 2);
			item.stockroom = item.location.substring(2, 3);
			item.shelf = item.location.substring(3, 6);
			item.level = item.location.substring(6, 7);
			item.bin = item.location.substring(7, 10);
			item.layer = item.location.substring(10, 11) || undefined;

			if (item.location.startsWith('RFPU')) {
				item.warehouse = '19';
				item.stockroom = 'C';
				item.shelf = '999';
				item.level = 'Z';
				item.bin = '999';
			}
		}
	});

	// filter the newResult array to remove any undefined entries
	const filtered = newResult.filter(
		el => el !== null && typeof el !== 'undefined'
	);
	return filtered;
};

module.exports = convertToJson;
