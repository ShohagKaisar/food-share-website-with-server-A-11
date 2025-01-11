
import { useContext, useRef, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../AuthProvider/AuthProvider';
import Swal from 'sweetalert2';

const Login = () => {
  const emailRef = useRef();
  const navigate = useNavigate();
  const { handleLogin, handleGoogleLogin } = useContext(AuthContext);
  const [loginError, SetLoginError] = useState(null);

  const handleLoginSubmit = (e) => {
    SetLoginError(null);
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    handleLogin(email, password).then(() => {
      Swal.fire({
        title: "Login Successfull !",
        icon: "success"
      });
      navigate("/");
    })
      .catch((error) => {
        const err = error.message.slice(22, 40);
        SetLoginError(err);
      })
  }

  // Handle Login Function
  const handleGoogleLoginSubmit = () => {
    handleGoogleLogin().then(() => {
      Swal.fire({
        title: "Login Successfully 👌",
        icon: "success"
      })
      navigate("/")
    })
  }

  return (
    <div className="card bg-base-100 mx-auto w-full max-w-sm shrink-0 shadow-2xl">
      <p className="text-4xl font-bold text-blue-600 text-center mt-4">Login Now</p>
      <form onSubmit={handleLoginSubmit} className="card-body">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input type="email" name='email' ref={emailRef} placeholder="email" className="input input-bordered" required />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input type="password" name='password' placeholder="password" className="input input-bordered" required />
        </div>
        {
          loginError && <p className='text-red-600'>{loginError}</p>
        }
        <div className="form-control">
          <button className="btn btn-primary">Login</button>
        </div>
        <p className='text-center'>OR</p>
      </form>
      <div className='mx-auto'>
        <button onClick={handleGoogleLoginSubmit} className="btn bg-green-500 -mt-6 text-lg">Continue With Google</button>
      </div>
      <div className='my-4'>
        <p className="text-center mb-2">If you don't have an account. Please <NavLink to={"/register"}><span className="text-blue-600">Register</span></NavLink></p>
      </div>
    </div>
  );
};

export default Login;