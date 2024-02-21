import React from "react";
import { connect } from "react-redux";
import ContentPane from "../ContentPane/ContentPane";
import { Form, Field } from "react-final-form";
import lostHorizon from "../../api/lostHorizon";

const __STANDARD_CSS_DECORATOR = `rounded-md bg-cyan-900/25 w-full h-12 mb-4 text-white`;
const __STANDARD_LABEL_DECORATOR = `text-sm text-gray-600 self-start`;

// TODO: Write all of this
export const ImportView = (props) => {
	const postForm = async (values) => {
		// alert(JSON.stringify(values, null, 2));
		const location = {
			building: values.building,
			stockroom: values.stockroom,
			shelf: values.shelf,
		};

		if (values.level) location.level = values.level;

		let response;

		try {
			response = await lostHorizon.post("/locations/findOrCreate", location);
			console.log(response.data.result);
		} catch (error) {
			console.log(error.response);
		}

		let itemQuantity;

		if (values.quantity) {
		}

		let item = {
			name: values.name,
			partNumber: values.partNumber,
			isTrackable: values.isTrackable[0] === "true",
			cost: values.cost,
			location: response.data.result,
		};

		if (item.isTrackable) {
			// item.serialNumber = values.serialNumber;
			// item.quantity = 1;
			item = { ...item, serialNumber: values.serialNumber, quantity: 1 };
		}

		if (!item.isTrackable) {
			// item.quantity = values.quantity;
			// delete item.serialNumber;
			item = { ...item, quantity: values.quantity || 1 };
		}

		console.log(item);

		try {
			const result = await lostHorizon.post("/items", item);
			console.log(result);
		} catch (error) {
			console.log(error.response);
		}
	};

	return (
		<ContentPane>
			<div className='w-1/2 h-full'>
				<div className='text-center text-2xl'>Add Inventory</div>
				<Form onSubmit={postForm}>
					{({ handleSubmit, form, submitting, pristine, values }) => {
						return (
							<form
								onSubmit={handleSubmit}
								className='flex justify-center mb-4'>
								<div className='flex flex-col justify-center text-center'>
									<div className='flex flex-row justify-center'>
										<div className='mr-4' style={{ width: "51.5%" }}>
											<label
												className={__STANDARD_LABEL_DECORATOR}
												htmlFor='name'>
												Name
											</label>
											<Field name='name'>
												{({ input, meta }) => (
													<input
														{...input}
														type='text'
														name='name'
														id='name'
														className={`${__STANDARD_CSS_DECORATOR}`}></input>
												)}
											</Field>
										</div>
										<div className='w-1/3'>
											<label
												className={__STANDARD_LABEL_DECORATOR}
												htmlFor='partNumber'>
												Part Number
											</label>
											<Field name='partNumber'>
												{({ input, meta }) => (
													<input
														{...input}
														type='text'
														name='partNumber'
														id='partNumber'
														className={`${__STANDARD_CSS_DECORATOR}`}></input>
												)}
											</Field>
										</div>
									</div>
									<div className='flex flex-row justify-center'>
										<div className='mr-4'>
											<div className='flex flex-col whitespace-nowrap'>
												<label
													htmlFor='isTrackable'
													className={`${__STANDARD_LABEL_DECORATOR} pt-1`}>
													Trackable
												</label>
												<Field
													id='isTrackable'
													name='isTrackable'
													component='input'
													type='checkbox'
													value='true'
													className='rounded mt-4 mx-auto'
													style={{ transform: "scale(2)" }}
												/>
											</div>
										</div>
										<div className='w-30' style={{ width: "42.7%" }}>
											{values.isTrackable?.length > 0 && (
												<div className='mr-4'>
													<label
														className={__STANDARD_LABEL_DECORATOR}
														htmlFor='serialNumber'>
														Serial Number
													</label>
													<Field name='serialNumber'>
														{({ input, meta }) => (
															<input
																{...input}
																type='text'
																name='partNumber'
																id='partNumber'
																className={__STANDARD_CSS_DECORATOR}></input>
														)}
													</Field>
												</div>
											)}

											{(values.isTrackable?.length === 0 ||
												!values.isTrackable) && (
												<div className='mr-4'>
													<label
														className={__STANDARD_LABEL_DECORATOR}
														htmlFor='quantity'>
														Quantity
													</label>
													<Field name='quantity'>
														{({ input, meta }) => (
															<input
																{...input}
																type='number'
																name='quantity'
																id='quantity'
																// On submit default value is 1
																className={`${__STANDARD_CSS_DECORATOR}`}></input>
														)}
													</Field>
												</div>
											)}
										</div>
										<div className='basis-1/3'>
											<label
												className={__STANDARD_LABEL_DECORATOR}
												htmlFor='cost'>
												Cost
											</label>
											<Field name='cost'>
												{({ input, meta }) => (
													<input
														{...input}
														type='number'
														min='0.00'
														step='0.01'
														name='cost'
														id='cost'
														// On submit default value is 1
														// TODO: Check quantity is 1 is item isTrackable and no serial number if item !isTrackable
														className={`${__STANDARD_CSS_DECORATOR}`}></input>
												)}
											</Field>
										</div>
									</div>
									<div className='flex flex-row justify-center'>
										{/* building */}
										<div className='mr-4' style={{ width: "20%" }}>
											<label
												className={__STANDARD_LABEL_DECORATOR}
												htmlFor='building'>
												Building
											</label>
											<Field name='building'>
												{({ input, meta }) => (
													<input
														{...input}
														type='text'
														name='building'
														id='building'
														className={`${__STANDARD_CSS_DECORATOR}`}></input>
												)}
											</Field>
										</div>
										{/* stockroom */}
										<div className='mr-4' style={{ width: "20%" }}>
											<label
												className={__STANDARD_LABEL_DECORATOR}
												htmlFor='stockroom'>
												Stockroom
											</label>
											<Field name='stockroom'>
												{({ input, meta }) => (
													// TODO: Possible dropdown list needed
													<input
														{...input}
														type='text'
														name='stockroom'
														id='stockroom'
														className={`${__STANDARD_CSS_DECORATOR}`}></input>
												)}
											</Field>
										</div>
										{/* shelf */}
										<div className='mr-4' style={{ width: "20%" }}>
											<label
												className={__STANDARD_LABEL_DECORATOR}
												htmlFor='shelf'>
												Shelf
											</label>
											<Field name='shelf'>
												{({ input, meta }) => (
													<input
														{...input}
														type='text'
														name='shelf'
														id='shelf'
														className={`${__STANDARD_CSS_DECORATOR}`}></input>
												)}
											</Field>
										</div>
										{/* level */}
										<div className='' style={{ width: "20%" }}>
											<label
												className={__STANDARD_LABEL_DECORATOR}
												htmlFor='level'>
												Level
											</label>
											<Field name='level'>
												{({ input, meta }) => (
													<input
														{...input}
														type='text'
														name='level'
														id='level'
														className={`${__STANDARD_CSS_DECORATOR}`}></input>
												)}
											</Field>
										</div>
									</div>
									<div className='flex flex-row w-full justify-center'>
										<button
											type='submit'
											disabled={submitting || pristine}
											className={`w-40 h-12 border-2 rounded-md my-1 
                        shadow-md hover:shadow-lg cursor-pointer
                        transition font-semibold uppercase text-sm mx-2 ${
													submitting || pristine
														? "border-neutral-600 text-neutral-600 cursor-not-allowed"
														: "border-cyan-300 hover:bg-cyan-400 text-cyan-300 hover:text-black"
												}`}>
											Submit
										</button>
										<button
											type='button'
											onClick={form.reset}
											className='w-40 h-12 border-2 rounded-md my-1 border-cyan-300
                        hover:bg-cyan-400 shadow-md hover:shadow-lg cursor-pointer
                        transition font-semibold uppercase text-sm text-cyan-300
                        hover:text-black mx-2'>
											Reset
										</button>
									</div>
								</div>
								{/* <pre>{JSON.stringify(values, undefined, 2)}</pre> */}
							</form>
						);
					}}
				</Form>
			</div>
		</ContentPane>
	);
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ImportView);
