import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Layout from "./assets/common/Layout";
import Dashboard from "./pages/Dashboard";
import CreateBudget from "./pages/CreateBudget";
import Buget from "./pages/Buget";
import Signin from "./pages/auth/Signin";
import Signup from "./pages/auth/Signup";
import Signout from "./pages/auth/Signout";
import ProtectedRoute from "./utils/ProtectedRoute";
import BudgetDetails from "./pages/BudgetDetails";

const App = () => {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [

        {
          path: "/budget",
          element: <Buget />
        },

        {
          path: "/signin",
          element: <Signin />
        },

        {
          path: "/signup",
          element: <Signup />
        },

        {
          path: "/sign-out",
          element: <Signout />
        },

        {
          element: <ProtectedRoute />,
          children: [

            {
              path: "/",
              element: <Dashboard />
            },

            {
              path: "/createbudget",
              element: <CreateBudget />
            },

            {
              path: "/budget/:budgetId",
              element: <BudgetDetails />
            },

            {
              path: "/purchase/create",
              element: <BudgetDetails />
            },

            {
              path: "/purchase/get/:budgetId",
              element: <BudgetDetails />
            },

            {
              path: "/purchase/delete/:id",
              element: <BudgetDetails />
            }

          ]
        }

      ]
    }
  ]);

  return <RouterProvider router={router} />;
};

export default App;