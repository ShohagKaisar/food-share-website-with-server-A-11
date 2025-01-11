import { createBrowserRouter } from "react-router-dom";
import Layout from "../Layout/Layout";
import Home from "../components/Home";
import Details from "../components/Details/Details";
import Login from './../components/Login/Login';
import Register from './../components/Register/Register';
import PrivateRoute from "../components/PrivateRoute/PrivateRoute";
import NotFoundPage from "../components/ErrorPage/NotFoundPage";
import AvailableFoods from "../components/AvailableFooda/AvailableFoods";
import AddFood from "../components/AddFood/AddFood";
import ManageFood from "../components/ManageFood/ManageFood";
import MyFoodRequest from "../components/MyFoodRequest/MyFoodRequest";
import UpdateFood from "../components/UpdateFood/UpdateFood";


const Router = createBrowserRouter([
  {
    path: "/",
    element: <Layout></Layout>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
        loader: () => fetch("https://food-share-point.vercel.app/foods")
      },
      // Available Food Route
      {
        path: "/availablefoods",
        element: <AvailableFoods></AvailableFoods>,
        loader: () => fetch("https://food-share-point.vercel.app/foods")
      },
      // Add Food Route
      {
        path: "/addfood",
        element: <PrivateRoute>
          <AddFood></AddFood>
        </PrivateRoute>
      },
      // Manage Food Route
      {
        path: "/managefood",
        element: <PrivateRoute>
          <ManageFood></ManageFood>
        </PrivateRoute>,
        loader: () => fetch("https://food-share-point.vercel.app/foods")
      },
      // My Food Request Route
      {
        path: "/myfoodrequest",
        element: <PrivateRoute>
          <MyFoodRequest></MyFoodRequest>
        </PrivateRoute>,
        loader: () => fetch("https://food-share-point.vercel.app/foods")
      },
      {
        path: "/details/:_id",
        element: <PrivateRoute>
          <Details></Details>
        </PrivateRoute>,
        loader: () => fetch("https://food-share-point.vercel.app/foods")
      },
      // Update Food Route
      {
        path: "/update/:_id",
        element: <PrivateRoute>
          <UpdateFood></UpdateFood>
        </PrivateRoute>,
        loader: () => fetch("https://food-share-point.vercel.app/foods")
      },
      // Login Route
      {
        path: "/login",
        element: <Login></Login>
      },
      // Register Route
      {
        path: "/register",
        element: <Register></Register>
      },
    ]
  },
  {
    path: "*",
    element: <NotFoundPage></NotFoundPage>
  }

])

export default Router;
