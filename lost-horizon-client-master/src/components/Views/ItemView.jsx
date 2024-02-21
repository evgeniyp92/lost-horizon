import { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import ContentPane from "../ContentPane/ContentPane";
import { Form, Field } from "react-final-form";
import flattenObj from "../../utils/flattenObject";

import lostHorizon from "../../api/lostHorizon";

const __STANDARD_CSS_DECORATOR = `rounded-md bg-cyan-900/25 w-full h-12 mb-4 text-white`;
const __STANDARD_LABEL_DECORATOR = `text-sm text-gray-600 self-start pl-2`;
const __STANDARD_SELECT_DECORATOR = `rounded-md w-full h-12 mb-4 bg-cyan-900/25 text-white`;

const ItemView = () => {
  const { id } = useParams();

  const [disabled, setDisabled] = useState(true);
  const [error, setError] = useState(null);
  const [itemInfo, setItemInfo] = useState(null);

  const handleFetchingData = useCallback(async () => {
    try {
      const response = await lostHorizon.get(`/items/${id}`);
      response.data.data.isTrackable = [response.data.data.isTrackable];
      setItemInfo(response.data.data);
    } catch (err) {
      console.log(err.response);
    }
  }, [id]);

  const postForm = useCallback(async values => {
    window.alert(JSON.stringify(values, undefined, 2));
  }, []);

  useEffect(() => {
    handleFetchingData();
  }, [handleFetchingData]);

  console.log(itemInfo);

  return (
    <ContentPane>
      {itemInfo && (
        <>
          {/* <span>{`${disabled}`}</span>
          <pre>{JSON.stringify(id, undefined, 2)}</pre>
          <pre>{JSON.stringify(itemInfo, undefined, 2)}</pre> */}
          {/*  */}
          <div className='h-full flex flex-col items-center justify-center'>
            <Form onSubmit={postForm} initialValues={itemInfo || undefined}>
              {({ handleSubmit, form, submitting, pristine, values }) => {
                const handleReset = () => {
                  form.reset();
                  setError([]);
                };
                return (
                  <form
                    onSubmit={handleSubmit}
                    className='h-full w-1/2 flex flex-col items-center justify-center min-w-[23rem]'
                  >
                    <div className='font-bold justify-self-end text-3xl'>
                      {`${itemInfo.name} - ${itemInfo.partNumber}`}
                    </div>
                    <div className='flex flex-col justify-center'>
                      <div className='flex flex-row justify-center'>
                        <div className='mr-4' style={{ width: "51.5%" }}>
                          <label
                            className={__STANDARD_LABEL_DECORATOR}
                            htmlFor='name'
                          >
                            Name
                          </label>
                          <Field name='name'>
                            {({ input, meta }) => (
                              <input
                                {...input}
                                type='text'
                                name='name'
                                id='name'
                                className={`${__STANDARD_CSS_DECORATOR}`}
                                disabled
                              ></input>
                            )}
                          </Field>
                        </div>
                        <div className='w-1/3'>
                          <label
                            className={__STANDARD_LABEL_DECORATOR}
                            htmlFor='partNumber'
                          >
                            Part Number
                          </label>
                          <Field name='partNumber'>
                            {({ input, meta }) => (
                              <input
                                {...input}
                                type='text'
                                name='partNumber'
                                id='partNumber'
                                className={`${__STANDARD_CSS_DECORATOR}`}
                                disabled
                              ></input>
                            )}
                          </Field>
                        </div>
                      </div>
                      <div className='flex flex-row justify-center'>
                        <div className='mr-4'>
                          <div className='flex flex-col whitespace-nowrap'>
                            <label
                              htmlFor='isTrackable'
                              className={`${__STANDARD_LABEL_DECORATOR} pt-1`}
                            >
                              Trackable
                            </label>
                            <Field
                              id='isTrackable'
                              name='isTrackable'
                              component='input'
                              type='checkbox'
                              className='rounded mt-4 mx-auto'
                              style={{ transform: "scale(2)" }}
                              disabled
                            />
                          </div>
                        </div>
                        <div className='w-30' style={{ width: "42.7%" }}>
                          {values.isTrackable?.length > 0 && (
                            <div className='mr-4'>
                              <label
                                className={__STANDARD_LABEL_DECORATOR}
                                htmlFor='serialNumber'
                              >
                                Serial Number
                              </label>
                              <Field name='serialNumber'>
                                {({ input, meta }) => (
                                  <input
                                    {...input}
                                    type='text'
                                    name='partNumber'
                                    id='partNumber'
                                    className={__STANDARD_CSS_DECORATOR}
                                    disabled
                                  ></input>
                                )}
                              </Field>
                            </div>
                          )}

                          {(values.isTrackable?.length === 0 ||
                            !values.isTrackable) && (
                            <div className='mr-4'>
                              <label
                                className={__STANDARD_LABEL_DECORATOR}
                                htmlFor='quantity'
                              >
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
                                    className={`${__STANDARD_CSS_DECORATOR}`}
                                    disabled
                                  ></input>
                                )}
                              </Field>
                            </div>
                          )}
                        </div>
                        <div className='basis-1/3'>
                          <label
                            className={__STANDARD_LABEL_DECORATOR}
                            htmlFor='cost'
                          >
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
                                className={`${__STANDARD_CSS_DECORATOR}`}
                                disabled
                              ></input>
                            )}
                          </Field>
                        </div>
                      </div>
                      <div className='flex flex-row justify-center'>
                        {/* building */}
                        <div className='mr-4' style={{ width: "20%" }}>
                          <label
                            className={__STANDARD_LABEL_DECORATOR}
                            htmlFor='building'
                          >
                            Building
                          </label>
                          <Field name='location.warehouseLocation.building'>
                            {({ input, meta }) => (
                              <input
                                {...input}
                                type='text'
                                id='location.warehouseLocation.building'
                                className={`${__STANDARD_CSS_DECORATOR}`}
                                // disabled={disabled}
                              ></input>
                            )}
                          </Field>
                        </div>
                        {/* stockroom */}
                        <div className='mr-4' style={{ width: "20%" }}>
                          <label
                            className={__STANDARD_LABEL_DECORATOR}
                            htmlFor='stockroom'
                          >
                            Stockroom
                          </label>
                          <Field name='location.warehouseLocation.stockroom'>
                            {({ input, meta }) => (
                              // TODO: Possible dropdown list needed
                              <input
                                {...input}
                                type='text'
                                id='location.warehouseLocation.stockroom'
                                className={`${__STANDARD_CSS_DECORATOR}`}
                                // disabled={disabled}
                              ></input>
                            )}
                          </Field>
                        </div>
                        {/* shelf */}
                        <div className='mr-4' style={{ width: "20%" }}>
                          <label
                            className={__STANDARD_LABEL_DECORATOR}
                            htmlFor='shelf'
                          >
                            Shelf
                          </label>
                          <Field name='location.warehouseLocation.shelf'>
                            {({ input, meta }) => (
                              <input
                                {...input}
                                type='text'
                                id='location.warehouseLocation.shelf'
                                className={`${__STANDARD_CSS_DECORATOR}`}
                                // disabled={disabled}
                              ></input>
                            )}
                          </Field>
                        </div>
                        {/* level */}
                        <div className='' style={{ width: "20%" }}>
                          <label
                            className={__STANDARD_LABEL_DECORATOR}
                            htmlFor='level'
                          >
                            Level
                          </label>
                          <Field name='location.warehouseLocation.level'>
                            {({ input, meta }) => (
                              <input
                                {...input}
                                type='text'
                                id='location.warehouseLocation.level'
                                className={`${__STANDARD_CSS_DECORATOR}`}
                                // disabled={disabled}
                              ></input>
                            )}
                          </Field>
                        </div>
                      </div>
                    </div>
                    <div className='flex items-center flex-col'>
                      {/* <button
                        disabled={!submitting || !pristine}
                        className={`w-60 h-12 border-2 rounded-md my-1 shadow-md hover:shadow-lg cursor-pointer transition font-semibold uppercase text-sm mx-2 ${
                          !pristine
                            ? `border-neutral-600 text-neutral-600 cursor-default`
                            : `border-cyan-300 hover:bg-cyan-400  text-cyan-300 hover:text-black`
                        }`}
                        onClick={() => setDisabled(false)}
                      >
                        Edit
                      </button> */}
                      <button
                        disabled={submitting || pristine}
                        className={`w-60 h-12 border-2 rounded-md my-1 shadow-md hover:shadow-lg cursor-pointer transition font-semibold uppercase text-sm mx-2 ${
                          pristine
                            ? `border-neutral-600 text-neutral-600 cursor-default`
                            : `border-cyan-300 hover:bg-cyan-400  text-cyan-300 hover:text-black`
                        }`}
                      >
                        Save
                      </button>
                      <button
                        type='button'
                        onClick={handleReset}
                        className={`w-60 h-12 border-2 rounded-md my-1 shadow-md hover:shadow-lg cursor-pointer transition font-semibold uppercase text-sm mx-2 ${
                          pristine
                            ? `border-neutral-600 text-neutral-600 cursor-default`
                            : `border-cyan-300 hover:bg-cyan-400  text-cyan-300 hover:text-black`
                        }`}
                      >
                        Reset
                      </button>
                      {/* <button
                    type='button'
                    onClick={() => navigate("/", { replace: true })}
                    className='w-60 h-12 border-2 rounded-md my-1 hover:shadow-lg cursor-pointer transition font-sembiold uppercase text-sm mx-2 border-cyan-300 hover:bg-cyan-400 text-cyan-300 hover:text-black'
                  >
                    Back
                  </button> */}
                    </div>
                    {/* <pre>{JSON.stringify(values, undefined, 2)}</pre> */}
                  </form>
                );
              }}
            </Form>
          </div>
        </>
      )}
    </ContentPane>
  );
};

export default ItemView;
