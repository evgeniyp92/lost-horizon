import React, { useState } from "react";
import { Form, Field } from "react-final-form";
// import createDecorator from "final-form-focus";
import { useNavigate } from "react-router-dom";

import lostHorizon from "../../api/lostHorizon";

const __STANDARD_CSS_DECORATOR = `rounded-md bg-cyan-900/25 w-full h-12 mb-4 text-white`;
const __STANDARD_LABEL_DECORATOR = `text-sm text-gray-600 self-start pl-2`;
const __STANDARD_SELECT_DECORATOR = `rounded-md w-full h-12 mb-4 bg-cyan-900/25 text-white`;

const Signup = () => {
  const navigate = useNavigate();
  const [error, setError] = useState([]);

  const postForm = async values => {
    // if values havent been provided assume theyre set to the defaults
    if (!values.rank) {
      values.rank = "AB";
    }

    if (!values.squadron) {
      values.squadron = "693 ISS";
    }

    if (!values.flight) {
      values.flight = "SCP";
    }

    try {
      // try to create the user
      const res = await lostHorizon.post("/auth/signup", values);
      console.log(res);
      // if successful, redirect to the login page
      res.data.status === "success" && navigate("/?signup=success");
    } catch (error) {
      // log an error to the console
      console.log(error.response.data.message);
      setError(error.response.data.message);
    }
  };

  return (
    <div className='w-screen h-screen flex flex-col items-center'>
      <Form onSubmit={postForm}>
        {({ handleSubmit, form, submitting, pristine, values }) => {
          const handleReset = () => {
            form.reset();
            setError([]);
          };
          return (
            <form
              onSubmit={handleSubmit}
              className='h-full w-1/3 flex flex-col items-center justify-center min-w-[23rem]'
            >
              <div className='font-bold justify-self-end text-5xl'>Sign Up</div>
              <label
                htmlFor='email'
                className={`${__STANDARD_LABEL_DECORATOR}`}
              >
                E-Mail
              </label>
              <Field name='email'>
                {props => (
                  <input
                    {...props.input}
                    type='text'
                    name='email'
                    className={`${__STANDARD_CSS_DECORATOR}`}
                  />
                )}
              </Field>
              <div className='flex w-full'>
                <div className='w-1/2 pr-2'>
                  <label
                    htmlFor='password'
                    className={`${__STANDARD_LABEL_DECORATOR}`}
                  >
                    Password
                  </label>
                  <Field name='password'>
                    {props => (
                      <input
                        {...props.input}
                        type='password'
                        name='password'
                        className={`${__STANDARD_CSS_DECORATOR}`}
                      />
                    )}
                  </Field>
                </div>
                <div className='w-1/2 pl-2'>
                  <label
                    htmlFor='passwordConfirm'
                    className={`${__STANDARD_LABEL_DECORATOR}`}
                  >
                    Confirm password
                  </label>
                  <Field name='passwordConfirm'>
                    {props => (
                      <input
                        {...props.input}
                        type='password'
                        name='passwordConfirm'
                        className={`${__STANDARD_CSS_DECORATOR}`}
                      />
                    )}
                  </Field>
                </div>
              </div>
              <div className='flex w-full'>
                <Field name='firstName'>
                  {props => (
                    <div className='w-1/2 pr-2'>
                      <label
                        htmlFor='firstName'
                        className={`${__STANDARD_LABEL_DECORATOR}`}
                      >
                        First Name
                      </label>
                      <input
                        {...props.input}
                        type='text'
                        name='firstName'
                        className={`${__STANDARD_CSS_DECORATOR}`}
                      />
                    </div>
                  )}
                </Field>
                <Field name='lastName'>
                  {props => (
                    <div className='w-1/2 pl-2'>
                      <label
                        htmlFor='lastName'
                        className={`${__STANDARD_LABEL_DECORATOR}`}
                      >
                        Last Name
                      </label>
                      <input
                        {...props.input}
                        type='text'
                        name='lastName'
                        className={`${__STANDARD_CSS_DECORATOR}`}
                      />
                    </div>
                  )}
                </Field>
              </div>
              <div className='flex w-full'>
                <Field name='rank'>
                  {props => (
                    <div className='w-1/3 px-2 pl-0'>
                      <label
                        htmlFor='rank'
                        className={`${__STANDARD_LABEL_DECORATOR}`}
                      >
                        Rank
                      </label>
                      <select
                        {...props.input}
                        type='text'
                        name='rank'
                        className={`form-select ${__STANDARD_SELECT_DECORATOR}`}
                      >
                        <option value='AB' className='text-black'>
                          AB/E1
                        </option>
                        <option value='AMN' className='text-black'>
                          AMN/E2
                        </option>
                        <option value='A1C' className='text-black'>
                          A1C/E3
                        </option>
                        <option value='SRA' className='text-black'>
                          SRA/E4
                        </option>
                        <option value='SSGT' className='text-black'>
                          SSGT/E5
                        </option>
                        <option value='TSGT' className='text-black'>
                          TSGT/E6
                        </option>
                        <option value='MSGT' className='text-black'>
                          MSGT/E7
                        </option>
                        <option value='SMSGT' className='text-black'>
                          SMSGT/E8
                        </option>
                        <option value='CMSGT' className='text-black'>
                          CMSGT/E9
                        </option>
                        <option value='2LT' className='text-black'>
                          2LT/O1
                        </option>
                        <option value='1LT' className='text-black'>
                          1LT/O2
                        </option>
                        <option value='CAPT' className='text-black'>
                          CAPT/O3
                        </option>
                        <option value='MAJ' className='text-black'>
                          MAJ/O4
                        </option>
                        <option value='LTCOL' className='text-black'>
                          LTCOL/O5
                        </option>
                        <option value='COL' className='text-black'>
                          COL/O6
                        </option>
                        <option value='BGEN' className='text-black'>
                          BRIGGEN/O7
                        </option>
                        <option value='MGEN' className='text-black'>
                          MAJGEN/O8
                        </option>
                        <option value='LGEN' className='text-black'>
                          LTGEN/O9
                        </option>
                        <option value='GEN' className='text-black'>
                          GEN/O10
                        </option>
                      </select>
                    </div>
                  )}
                </Field>
                <Field name='squadron'>
                  {props => (
                    <div className='w-1/3 px-2'>
                      <label
                        htmlFor='squadron'
                        className={`${__STANDARD_LABEL_DECORATOR}`}
                      >
                        Squadron
                      </label>
                      <select
                        {...props.input}
                        type='text'
                        name='squadron'
                        className={`${__STANDARD_SELECT_DECORATOR}`}
                      >
                        <option value='693 ISS' className='text-black'>
                          693 ISS
                        </option>
                        <option value='693 ISRG' className='text-black'>
                          693 ISRG
                        </option>
                        <option value='450 IS' className='text-black'>
                          450 IS
                        </option>
                        <option value='24 IS' className='text-black'>
                          24 IS
                        </option>
                      </select>
                    </div>
                  )}
                </Field>
                <Field name='flight'>
                  {props => (
                    <div className='w-1/3 px-2 pr-0'>
                      <label
                        htmlFor='flight'
                        className={`${__STANDARD_LABEL_DECORATOR}`}
                      >
                        Flight
                      </label>
                      <select
                        {...props.input}
                        type='text'
                        name='flight'
                        className={`${__STANDARD_SELECT_DECORATOR}`}
                      >
                        <option value='SCP' className='text-black'>
                          SCP
                        </option>
                        <option value='SCX' className='text-black'>
                          SCX
                        </option>
                        <option value='SCO' className='text-black'>
                          SCO
                        </option>
                      </select>
                    </div>
                  )}
                </Field>
              </div>
              {/* <pre>{JSON.stringify(values)}</pre> */}
              {error.length > 0 && (
                <div
                  className='bg-red-100 rounded-lg py-5 px-6 mb-3 text-base text-red-700 inline-flex items-center w-full'
                  role='alert'
                >
                  <svg
                    aria-hidden='true'
                    focusable='false'
                    data-prefix='fas'
                    data-icon='times-circle'
                    className='w-16 mr-2 fill-current'
                    role='img'
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 512 512'
                  >
                    <path
                      fill='currentColor'
                      d='M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm121.6 313.1c4.7 4.7 4.7 12.3 0 17L338 377.6c-4.7 4.7-12.3 4.7-17 0L256 312l-65.1 65.6c-4.7 4.7-12.3 4.7-17 0L134.4 338c-4.7-4.7-4.7-12.3 0-17l65.6-65-65.6-65.1c-4.7-4.7-4.7-12.3 0-17l39.6-39.6c4.7-4.7 12.3-4.7 17 0l65 65.7 65.1-65.6c4.7-4.7 12.3-4.7 17 0l39.6 39.6c4.7 4.7 4.7 12.3 0 17L312 256l65.6 65.1z'
                    ></path>
                  </svg>
                  {error}
                </div>
              )}
              <div className='flex items-center flex-col'>
                <button
                  disabled={submitting || pristine}
                  className={`w-60 h-12 border-2 rounded-md my-1 shadow-md hover:shadow-lg cursor-pointer transition font-semibold uppercase text-sm mx-2 ${
                    pristine
                      ? `border-neutral-600 text-neutral-600 cursor-default`
                      : `border-cyan-300 hover:bg-cyan-400  text-cyan-300 hover:text-black`
                  }`}
                >
                  Submit
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
                <button
                  type='button'
                  onClick={() => navigate("/", { replace: true })}
                  className='w-60 h-12 border-2 rounded-md my-1 hover:shadow-lg cursor-pointer transition font-sembiold uppercase text-sm mx-2 border-cyan-300 hover:bg-cyan-400 text-cyan-300 hover:text-black'
                >
                  Back
                </button>
              </div>
            </form>
          );
        }}
      </Form>
    </div>
  );
};

export default Signup;
