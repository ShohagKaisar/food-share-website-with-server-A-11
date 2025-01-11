import { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthProvider/AuthProvider";
import logo from "../assets/images/FoodLogo.png";
import Swal from "sweetalert2";

const Navbar = () => {
  const { handleLogout } = useContext(AuthContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handlrSignout = () => {
    handleLogout();
              Swal.fire({
                title: "Loogout Successfully 👌",
                icon: "success"
              })
    setTimeout(() => {
      navigate("/");
    }, 1000);
  };

  const links = (
    <>
      <li>
        <NavLink to={"/"} className="hover:text-yellow-400 transition duration-300">
          Home
        </NavLink>
      </li>
      <li>
        <NavLink to={"/availablefoods"} className="hover:text-yellow-400 transition duration-300">
          Available Foods
        </NavLink>
      </li>
      <li>
        <NavLink to={"/addfood"} className="hover:text-yellow-400 transition duration-300">
          Add Food
        </NavLink>
      </li>
      <li>
        <NavLink to={"/managefood"} className="hover:text-yellow-400 transition duration-300">
          Manage My Food
        </NavLink>
      </li>
      <li>
        <NavLink to={"/myfoodrequest"} className="hover:text-yellow-400 transition duration-300">
          My Food Request
        </NavLink>
      </li>
    </>
  );

  return (
    <div>
      <div className="navbar bg-gradient-to-r from-purple-600 via-red-500 to-yellow-400 text-white shadow-lg py-4">
        {/* Navbar Start */}
        <div className="navbar-start">
          <div className="dropdown">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost lg:hidden text-white hover:text-yellow-400"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-white rounded-lg z-[100] mt-3 w-52 p-4 shadow-lg text-purple-800"
            >
              {links}
            </ul>
          </div>
          <img src={logo} alt="Food Logo" className="h-16 mx-4" />
        </div>

        {/* Navbar Center */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 space-x-1 text-sm">{links}</ul>
        </div>

        {/* Navbar End */}
        <div className="navbar-end flex items-center space-x-4">
          {user && (
            <abbr title={user.displayName}>
              <img
                className="rounded-full my-2 mx-2 w-8 h-8 border-2 border-white"
                src={user.photoURL}
                alt="User"
              />
            </abbr>
          )}
          {user ? (
            <NavLink to={"/"}>
              <button
                onClick={handlrSignout}
                className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white text-sm rounded-xl transition duration-300"
              >
                Log Out
              </button>
            </NavLink>
          ) : (
            <div className="flex flex-col items-center gap-2 lg:flex-row">
              <NavLink to={"/register"}>
                <button className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white text-sm rounded-xl mx-2 transition duration-300">
                  Register
                </button>
              </NavLink>
              <NavLink to={"/login"}>
                <button className="px-4 py-2 bg-blue-500 hover:bg-blue-700 text-white text-sm rounded-xl transition duration-300">
                  Login
                </button>
              </NavLink>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
