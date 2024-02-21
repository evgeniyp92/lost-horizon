/**
 * Julian to Gregorian Date Converter v1.0 © 2021 SrA Evgeniy Pimenov and United
 * States Air Force, all rights reserved. This program is free to use for all US
 * DoD coders.
 *
 * This utility converts Julian dates to Gregorian dates. You can use this as a
 * command line tool with node.js or import it into your own project as a module
 *
 * @param {Number} input - Julian date to convert. Must be a number. Type does
 * not matter but it will throw an error if it cannot parse the input argument
 * into a number. Must be of format YYDDD.
 */

const calculateDate = (day, year) => {
	// parse the day into a number
	const calendarDay = parseInt(day, 10);

	// helper function to return a UTC date
	const renderDate = (inputYear, inputMonth, inputDay) =>
		new Date(
			Date.UTC(inputYear, inputMonth, inputDay, '00', '00', '00', '000')
		);

	// controlling for insane input
	if (calendarDay < 1 || calendarDay > 366) throw new Error('Invalid day');
	// Turns out the date object handles day arbitrary day values (e.g. up to ands
	// even higher than 366)
	return renderDate(year, 0, calendarDay);
};

const convertJulianToDate = input => {
	const year = parseInt(20 + input.toString().slice(0, 2), 10);
	const day = parseInt(input.toString().slice(2, 5), 10);
	const gregorianDate = calculateDate(day, year);
	return gregorianDate;
};

// if (process.argv[2]) convertJulianToDate();
module.exports = convertJulianToDate;
