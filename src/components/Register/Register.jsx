import { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { AuthContext } from "../AuthProvider/AuthProvider";
import Swal from "sweetalert2";

const Register = () => {
  const { handleRegister, handleGoogleLogin, manageProfile } = useContext(AuthContext);
  const [error, setError] = useState(null);
  const [exist, setExist] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleRegisterSubmit = async (data) => {
    const { name, photo, email, password } = data;

    setError(null);
    setExist(false);

    try {
      const res = await handleRegister(email, password);
      await manageProfile(name, photo);
      Swal.fire({
        title: "Registration Successfull !",
        icon: "success"
      });
      setTimeout(() => {
        navigate("/");
        // window.location.reload();
      }, 2000);
    } catch (err) {
      const errMsg = err.message.slice(22, 42);
      setExist(errMsg);
    }
  };

  const handleGoogleLoginSubmit = async () => {
    try {
      await handleGoogleLogin();
      navigate("/");
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (err) {
      setError("Google Login Failed");
    }
  };

  return (
    <div className="card bg-base-100 mx-auto w-full max-w-sm shrink-0 shadow-2xl">
      <p className="text-4xl font-bold text-blue-600 text-center mt-4">Register Now</p>
      <form onSubmit={handleSubmit(handleRegisterSubmit)} className="card-body">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Name</span>
          </label>
          <input
            type="text"
            {...register("name", { required: "Name is required" })}
            placeholder="Name"
            className="input input-bordered"
          />
          {errors.name && <p className="text-red-600">{errors.name.message}</p>}
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input
            type="email"
            {...register("email", { required: "Email is required" })}
            placeholder="Email"
            className="input input-bordered"
          />
          {errors.email && <p className="text-red-600">{errors.email.message}</p>}
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Photo URL</span>
          </label>
          <input
            type="text"
            {...register("photo")}
            placeholder="Photo URL"
            className="input input-bordered"
          />
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input
            type="password"
            {...register("password", {
              required: "Password is required",
              pattern: {
                value: /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/,
                message:
                  "Password must contain at least one uppercase letter, one lowercase letter, and be at least 6 characters long.",
              },
            })}
            placeholder="Password"
            className="input input-bordered"
          />
          {errors.password && <p className="text-red-600">{errors.password.message}</p>}
        </div>

        {error && <p className="text-red-600">{error}</p>}
        {exist && <p className="text-red-600">{exist}</p>}
        {/* {success && <p className="text-green-600">User Registration Successful.</p>} */}

        <div className="form-control mt-2">
          <button className="btn btn-primary">Register</button>
        </div>
        <p className="text-center">OR</p>
      </form>
      <div className="mx-auto">
        <button onClick={handleGoogleLoginSubmit} className="btn bg-green-500 -mt-6 text-lg my-4">
          Continue With Google
        </button>
      </div>
      <p className="text-center mb-4">
        If you have an account Please{" "}
        <NavLink to={"/login"}>
          <span className="text-blue-600">Login</span>
        </NavLink>
      </p>
    </div>
  );
};

export default Register;
