import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import lostHorizonLogo from "../../assets/Logo.png";
import Cookies from "js-cookie";
// import { useSnackbar } from "notistack";
import lostHorizon from "../../api/lostHorizon";

const LoginView = () => {
  // const { enqueueSnackbar } = useSnackbar();
  const [error, setError] = useState([]);
  const handleSubmit = async function (event) {
    event.preventDefault();
    // console.log(`Submit hit`);
    // console.log({
    //   email: event.target.email.value,
    //   pw: event.target.password.value,
    // });
    try {
      const res = await lostHorizon.post("/auth/login", {
        email: event.target.email.value,
        password: event.target.password.value,
      });
      // console.log(res);
      Cookies.set("jwt", res.data.token, {
        expires: new Date(Date.now() + 15 * 60 * 1000),
      });
      window.location.href = "/";
    } catch (err) {
      // enqueueSnackbar(`Failed to login ${err ? " - " + err.message : ""}`, {
      //   variant: "error",
      // });
      setError(err.response.data.message);
    }
  };

  return (
    <div className='w-full h-full flex flex-col items-center justify-center'>
      <form
        className='flex flex-col items-center justify-center'
        onSubmit={handleSubmit}
      >
        <img
          src={lostHorizonLogo}
          alt='lost horizon logo'
          className='w-2/4 mb-8'
        ></img>
        <input
          type='text'
          name='email'
          className='rounded-md bg-cyan-900/25 w-96 h-12 mb-4 '
          placeholder='E-Mail'
          autoComplete='username'
        ></input>
        <input
          type='password'
          name='password'
          className='rounded-md bg-cyan-900/25 w-96 h-12 mb-4 '
          placeholder='Password'
          autoComplete='current-password'
        ></input>
        <div>
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
                className='w-8 mr-2 fill-current'
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
        </div>
        <div>
          <button
            type='submit'
            className='w-40 h-12 border-2 rounded-md my-1 border-cyan-300
						  hover:bg-cyan-400 shadow-md hover:shadow-lg cursor-pointer
							transition font-semibold uppercase text-sm text-cyan-300
							 hover:text-black mx-2'
          >
            Log In
          </button>
          <Link to='/signup'>
            <div
              className='w-40 h-12 border-2 rounded-md my-1 border-cyan-300
						 hover:bg-cyan-400 shadow-md hover:shadow-lg cursor-pointer
						  transition font-semibold uppercase text-sm text-cyan-300
							 hover:text-black mx-2 flex items-center justify-center'
            >
              Sign Up
            </div>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default LoginView;
