import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import googleLogo from "../../assets/icons/google.png";
import useAuth from "../../hooks/useAuth";
import { useState } from "react";

import useAlert from "../../hooks/useAlert";

const JoinUs = () => {
  const { userLogin, googleLogin } = useAuth();
  const alert = useAlert();
  const [error, setError] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const from = location?.state || "/";

  const {
    register,
    handleSubmit,
    // watch,
    formState: { errors },
    // reset,
  } = useForm();
  // console.log(errors);
  const onSubmit = (data) => {
    // console.log(data);
    const { email, password } = data;

    userLogin(email, password)
      .then((result) => {
        console.log(result);
        if (result.user) {
          alert("Login Successfully", "success");
        }
        //todo: private route redirect navigate
        navigate(from);
      })
      .catch((error) => {
        if (error.message.includes("invalid")) {
          alert("Invalid Email or Password", "error");
        } else {
          setError(error.message);
        }
      });
  };
  // handle Google login
  const handleGoogleLogin = () => {
    googleLogin()
      .then((result) => {
        if (result.user) {
          alert("Login Successfully", "success");
          navigate(from);
        }
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  return (
    <div>
      <div className=" w-full flex justify-center items-center">
        <div className="hero-content mx-10 md:mx-0 w-full md:w-1/2 lg:w-1/3">
          <div className="card border rounded-md w-full shadow-2xl bg-base-100 p-6 text-center">
            <h1 className="text-3xl font-bold">Join Us</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="w-full">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  {...register("email", { required: true })}
                  name="email"
                  placeholder="email"
                  className="input input-bordered rounded-sm"
                />
                {errors.email && (
                  <span className="text-red-500 mt-1 text-start">
                    Please fill up email field
                  </span>
                )}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  {...register("password", {
                    required: true,
                    // minLength: 6,
                    // maxLength: 16,
                    // pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/,
                  })}
                  name="password"
                  placeholder="password"
                  className={`input input-bordered rounded-sm`}
                />
                {(errors.password?.type === "required" && (
                  <span className="text-red-500 mt-1 text-start ">
                    Please give a password
                  </span>
                )) ||
                  (errors.password?.type === "minLength" && (
                    <span className="text-red-500 mt-1 text-start">
                      Password at least 6 character
                    </span>
                  ))}
                {errors.password?.type === "maxLength" && (
                  <span className="text-red-500 mt-1 text-start">
                    Password maximum 16 character
                  </span>
                )}
                {errors.password?.type === "pattern" && (
                  <span className="text-red-500 mt-1 text-start">
                    Password have one uppercase, lowercase & special character
                  </span>
                )}

                <label className="label">
                  <a href="#" className="label-text-alt link link-hover">
                    Forgot password?
                  </a>
                </label>
              </div>

              <div className="form-control mt-6">
                <input
                  type="submit"
                  value="Join Us"
                  className="btn text-[#ffffff] bg-gradient-to-br from-[#0066b2] to-[#003d6b] rounded-sm"
                />
              </div>
            </form>
            <p className="py-3">
              <small>
                Don&apos;t have any account. Please{" "}
                <Link to="/register" className="link ">
                  Register
                </Link>
              </small>
            </p>
            <div className="divider mt-3">OR</div>
            <div className="form-control mt-3">
              <button
                onClick={handleGoogleLogin}
                type="submit "
                className="btn text-[#000] font-medium  rounded-sm"
              >
                <img src={googleLogo} alt="" className="w-[30px]" />
                <span>Join us with Google</span>
              </button>
            </div>
            <div className="mb-6 mx-8 mt-4">
              <p className="text-red-600 font-semibold text-center">{error}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JoinUs;
